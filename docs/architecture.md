# 系统架构文档 (`ham-weblog`)

## 1. 架构概览

`ham-weblog` 采用单体 SSR（服务端渲染 HTML）+ REST API 架构，基于 **Hono** 与 **Node.js** 运行。数据库层通过 `D1Adapter`（`src/lib/d1-adapter.ts`）将 Node 内置 `node:sqlite` 包装为异步接口；管理端鉴权统一委托外部 [`BH2XOL/auth-service`](https://github.com/BH2XOL/auth-service)；电台实时状态徽章通过后台配置的外部 [`BH2XOL/ham-badge`](https://github.com/BH2XOL/ham-badge) 链接直接渲染。

```text
+-------------------+        HTTP         +------------------------+
|  Browser / Client | <-----------------> |  ham-weblog (Hono)     |
+-------------------+                     |  Port: 3000 (PORT)     |
        |                                 +-----------+------------+
        |                                             |
        | (外部状态徽章加载)              +-----------+-----------+
        v                                 |                       |
+-----------------------+                 v                       v
| ham-badge             |     +-----------------------+  +-----------------------+
| status.bh2xol.com     |     | SQLite (node:sqlite)  |  | auth-service (:3002)  |
+-----------------------+     | via D1Adapter         |  | Email OTP & Passkey   |
                              +-----------------------+  +-----------------------+
```

## 2. 模块职责划分

### 2.1 配置与入口 (`src/config/env.ts`, `src/index.ts`, `src/types.ts`)
- `src/config/env.ts`：从 `process.env` 构造 `Bindings` 与服务端口/数据库路径。
- `src/index.ts`：初始化 `D1Adapter` 与 Schema，注入环境绑定，注册公开、认证、管理端路由并启动 `@hono/node-server`。
- `src/types.ts`：定义 `QSO`、`BestDX`、`SiteConfig`、`DBClient`、`Bindings` 等核心类型。

### 2.2 数据访问与适配器 (`src/lib/d1-adapter.ts`, `src/lib/db.ts`)
- `D1Adapter`：基于 `node:sqlite` 的 `DatabaseSync`（开启 `PRAGMA journal_mode = WAL`），提供 `prepare/bind/all/first/run` 与事务 `batch`。
- `src/lib/db.ts`：
  - `initSchema(db)`：建表与唯一索引，通过 `migrationsChecked` + `PRAGMA table_info(site_config)` 自动按需补充 `badge_url` 列。
  - 提供 QSO 分页/条件查询、批量 `INSERT OR IGNORE`、批量删除、`best_dx` / `site_config` 读写、近 30 天活跃度统计、可用月份查询与 ADIF 全量导出。

### 2.3 领域工具与服务 (`src/lib/`, `src/services/qso.ts`)
- `src/lib/adif.ts`：解析 `.adif` 文本（兼容 `<eoh>` 与首条 QSO 同块），按 `call|date|time|freq|mode` 去重。
- `src/lib/grid.ts`：Maidenhead 4/6 位网格转经纬度与 Haversine 大圆距离计算。
- `src/lib/html.ts`：HTML 实体转义 `esc()` 与 `<option>` 生成 `opt()`。
- `src/services/qso.ts`：`resolveBestDX()` 优先读取 `best_dx` 表，未设置时基于 `MY_GRIDS` 从近期含 Grid 的记录中自动计算最远距离。

### 2.4 认证模块 (`src/routes/auth.ts`)
- 对接统一认证服务 `auth-service`（`AUTH_SERVICE_URL`，默认 `http://localhost:3002`）：
  - 代理 `/admin/login`、`/admin/verify` 并下发跨子域 `admin_token` Cookie。
  - `requireAdmin` 调用 `/verify-token` 校验会话；`/admin/api/*` 返回 `401`，`/admin` 重定向至 `https://auth.bh2xol.com/login`。

### 2.5 MD3 样式、视图与路由 (`src/styles/`, `src/views/`, `src/routes/`)
- `src/styles/`：按 `tokens.ts`（Light/Dark MD3 Tonal Palettes）、`base.ts`、`components.ts`、`index.ts` 拆分，与 `BH2XOL/HAM-webpage` 色彩体系一致。
- `src/views/`：`layout.ts` 提供统一 HTML 外壳、自定义 MD3 下拉增强脚本与 View Transition 主题切换；`components.ts` 提供全内联 SVG 图标、`renderBadgeHtml`、宽幅热力图与分页器；`frontend.ts` 与 `admin.ts` 分别渲染前后台页面。
- `src/routes/`：`frontend.ts`、`admin.ts`、`api.ts` 保持轻薄，只负责参数解析、服务调用与响应返回。

## 3. 数据库 Schema（SQLite）

1. **`qsos`**：`id, call, dxcc, date, time, freq, mode, rst_rx, rst_tx, grid, lotw, note, created_at`，唯一索引 `idx_qso_unique(call, date, time, freq, mode)`。
2. **`best_dx`**：单行表（`id = 1`），存储 `call, description, distance_km`。
3. **`site_config`**：单行表（`id = 1`），存储 `last_activity, badge_url`。

## 4. 安全边界

- **XSS 防护**：服务端模板动态文本均经过 `esc()` 转义；管理端动态表格使用 `esc()` 转义；外链（`BLOG_URL`、`QRZ_URL`、`badge_url`）严格校验 `http://` / `https://` 协议。
- **响应头**：页面响应设置 `X-Content-Type-Options: nosniff`、`X-Frame-Options: DENY`、`Referrer-Policy: strict-origin-when-cross-origin`。
- **参数化查询**：全部 SQL 查询均通过 `src/lib/db.ts` 使用 `?` 占位符绑定参数。
