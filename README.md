# ham-weblog

业余无线电通联日志（QSO Logbook），基于 **Node.js + Hono + SQLite (`node:sqlite`)** 构建，支持对接外部统一认证服务（[`BH2XOL/auth-service`](https://github.com/BH2XOL/auth-service)）与外部电台状态徽章服务（[`BH2XOL/ham-badge`](https://github.com/BH2XOL/ham-badge)）。

## 核心功能

- **公开通联日志（`/`）**：展示全部 QSO 记录，支持表内按呼号、模式、月份筛选与分页（50 条/页）。
- **统计面板与活跃度**：展示总记录数、最佳 DX（支持手动设定或基于 `MY_GRIDS` 与 Maidenhead Grid 自动计算最远距离）、最近活动文本（可留空），以及近 30 天宽幅通联活跃度热力图。
- **外部状态徽章**：标题行支持只读挂载外部 `ham-badge` 状态徽章（在管理后台配置后自动记住展示；未填写则默认关闭，加载失败自动隐藏不显示破损图标）。
- **管理后台（`/admin`）**：
  - 配置或关闭首页「状态徽章」，设置或清空「最近活动」。
  - 拖拽或点击上传 `.adif` / `.adi` 文件（最大 5MB，单次最多 1000 条，按 `call + date + time + freq + mode` 自动去重），支持全量导出 ADIF。
  - 手动添加 QSO、分页查看列表、单条或批量删除（单次最多 200 条）、设置「最佳 DX」。
- **Material Design 3 界面**：Light / Dark 双主题、自定义 MD3 下拉菜单、全内联 SVG 图标、View Transition 圆形扩散动画。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 运行时 | Node.js（需支持 `node:sqlite`，Node ≥ 23.4） + `tsx` |
| Web 框架 | [Hono](https://hono.dev) + `@hono/node-server` |
| 数据库 | SQLite（通过 `D1Adapter` 封装 `node:sqlite` 模拟 D1 异步 API） |
| 认证 | 外部 `auth-service`（`http://localhost:3002`）Email OTP & Passkey + `admin_token` HttpOnly Cookie |
| 状态徽章 | 外部 `ham-badge` 服务链接（数据库 `site_config.badge_url`，未填写默认关闭） |
| 语言 | TypeScript（ESM，`strict: true`） |
| 测试 | `node:test` + `node:assert/strict` |

## 目录结构

```text
src/
├── index.ts              # Hono 应用入口、路由挂载、Node HTTP 服务启动
├── types.ts              # QSO、BestDX、SiteConfig、DBClient、Bindings 等核心类型
├── config/
│   └── env.ts            # 环境变量读取与 Bindings 构造
├── lib/
│   ├── d1-adapter.ts     # node:sqlite 对 DBClient/D1 接口的异步封装
│   ├── db.ts             # 数据库 Schema 初始化、迁移与 QSO/配置 CRUD
│   ├── adif.ts           # ADIF 文本解析（兼容 FT8CN 等导出格式）与去重
│   ├── adif.test.ts      # ADIF 解析单元测试
│   ├── grid.ts           # Maidenhead 网格转经纬度与 Haversine 大圆距离计算
│   └── html.ts           # HTML 实体转义与 <option> 生成工具
├── services/
│   └── qso.ts            # 最佳 DX 计算服务
├── styles/
│   ├── index.ts          # 汇总导出全站 MD3 CSS
│   ├── tokens.ts         # Material Design 3 Light/Dark 色板、形状、阴影与动效 Token
│   ├── base.ts           # Reset、排版、环境光晕与 View Transition 动画
│   └── components.ts     # MD3 TopAppBar、Card、Button、Input、Select、Table、Tooltip、Snackbar
├── views/
│   ├── layout.ts         # 公共 MD3 HTML 布局壳（Header、自定义下拉脚本、主题切换、备案 Footer）
│   ├── components.ts     # 内联 SVG 图标库、徽章渲染、热力图、分页组件
│   ├── frontend.ts       # 公开通联日志页面视图与前端搜索脚本
│   └── admin.ts          # 管理后台页面视图与管理脚本
└── routes/
    ├── auth.ts           # 对接 auth-service 的登录、验证与 requireAdmin 中间件
    ├── frontend.ts       # 公开通联日志页面路由处理器
    ├── admin.ts          # 管理后台页面路由处理器
    └── api.ts            # 公开查询与管理端 REST API
```

## 环境变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `PORT` | `3000` | HTTP 服务监听端口 |
| `DB_PATH` | `./ham-weblog.db` | SQLite 数据库文件路径 |
| `DOMAIN` | `log.bh2xol.com` | 站点域名 |
| `CALLSIGN` | `BH2XOL` | 站长呼号 |
| `BLOG_URL` | `""` | 导航栏博客链接（需以 `http://` 或 `https://` 开头） |
| `QRZ_URL` | `""` | 导航栏 QRZ 主页链接（需以 `http://` 或 `https://` 开头） |
| `MY_GRIDS` | `""` | 本地 Maidenhead Grid，逗号分隔（如 `OM44,FJ25`），用于自动计算最佳 DX |
| `AUTH_SERVICE_URL` | `http://localhost:3002` | 外部 `auth-service` 地址 |

## 本地开发与测试

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 生产启动
npm start

# 类型检查
npx tsc --noEmit

# 运行单元测试
node --test src/lib/adif.test.ts
```

## 文档索引

- [系统架构文档](docs/architecture.md)
- [API 接口文档](docs/api.md)

## 授权

[MIT](LICENSE)
