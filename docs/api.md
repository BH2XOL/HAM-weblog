# API 接口文档 (`ham-weblog`)

## 1. 认证说明

- **公开接口**：无需认证即可访问。
- **管理接口（`/admin` 与 `/admin/api/*`）**：受 `requireAdmin` 中间件保护，需携带有效 `admin_token` Cookie（通过 `/admin/login` 与 `/admin/verify` 对接外部 `auth-service` 获取）。
  - 未认证访问 `/admin/api/*` 返回 `401` JSON：`{"error": "unauthorized"}`。
  - 未认证访问 `/admin` 重定向至 `https://auth.bh2xol.com/login?return=...`。

---

## 2. 公开页面与接口

### `GET /`
返回公开通联日志页面（`text/html; charset=utf-8`）。

- **Query 参数**：
  - `call`（可选）：呼号模糊匹配
  - `mode`（可选）：通信模式精确匹配
  - `date`（可选）：日期前缀匹配（如 `2026-04`）
  - `page`（可选，默认 `1`）：页码，每页 `50` 条

### `GET /api/qsos`
公开 QSO JSON 搜索接口。

- **Query 参数**：`call`, `mode`, `date`, `page`（每页 `50` 条）。
- **响应示例**：
```json
{
  "qsos": [
    {
      "id": 1,
      "call": "BG0KE",
      "dxcc": "",
      "date": "2026-10-03",
      "time": "07:44",
      "freq": "21.074",
      "mode": "FT8",
      "rst_rx": "-19",
      "rst_tx": "-5",
      "grid": "NL59",
      "lotw": false,
      "note": "Distance: 3139 km, QSO by FT8CN",
      "created_at": "2026-10-03 07:45:00"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 50
}
```

### `GET /api/activity`
获取最近 N 天按创建日期聚合的通联数量。

- **Query 参数**：`days`（可选，默认 `30`，范围 `1`–`90`）。
- **响应示例**：
```json
{
  "days": 30,
  "activity": [
    { "d": "2026-10-03", "cnt": 5 }
  ]
}
```

---

## 3. 管理端认证接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/admin/login` | 代理获取 `auth-service` 登录页面 |
| `POST` | `/admin/login` | 转发登录请求至 `auth-service`（JSON Body） |
| `POST` | `/admin/verify` | 转发验证码校验，成功时设置 `admin_token` Cookie（`HttpOnly; SameSite=Lax; Secure; Max-Age=604800`） |

---

## 4. 管理端页面与 API（需 `admin_token`）

### `GET /admin`
返回管理后台页面（`text/html; charset=utf-8`）。

### `GET /admin/api/list`
分页获取全部 QSO 列表。

- **Query 参数**：`page`（可选，默认 `1`，每页 `100` 条）。
- **响应**：`{ qsos, total, page, pageSize }`。

### `POST /admin/api/badge`
设置或关闭首页展示的外部 `ham-badge` 状态徽章链接（支持直接传入 URL 或 `<script src="...">` 标签代码；传空字符串 `""` 关闭展示）。

- **Request Body**（JSON）：`{ "url": "https://status.bh2xol.com" }`（传空字符串 `""` 可清空隐藏徽章）。
- **校验**：非空时必须以 `http://` 或 `https://` 开头，最多 `300` 字符。
- **响应**：`{ "ok": true, "url": "..." }` 或 `400`。

### `POST /admin/api/upload`
上传原始 ADIF 文本并去重入库。

- **Request Body**：原始 ADIF 字符串（`text/plain`）。
- **限制**：请求体最大 `5MB`（超限返回 `413`），单次最多解析 `1000` 条 QSO（超限返回 `413`），每 `100` 条分批写入。
- **响应**：`{ "inserted": 10, "skipped": 2 }`（若无有效记录返回 `{ "inserted": 0, "skipped": 0, "error": "No valid QSO in ADIF" }`）。

### `POST /admin/api/add`
手动添加单条 QSO。

- **Request Body**（JSON）：
  - 必填：`call`, `date`, `time`, `freq`, `mode`
  - 可选：`dxcc`, `rst_rx`（默认 `"59"`）, `rst_tx`（默认 `"59"`）, `grid`, `note`
- **响应**：成功 `{ "ok": true }`；校验失败返回 `400` `{ "ok": false, "error": "..." }`。

### `POST /admin/api/delete`
批量删除 QSO。

- **Request Body**（JSON）：`{ "ids": [1, 2, 3] }`（单次最多截取前 `200` 个有效正整数 ID）。
- **响应**：`{ "ok": true }` 或 `400`。

### `GET /admin/api/export`
导出全部 QSO 为 ADIF 3.1.4 文本文件（`Content-Disposition: attachment; filename="<CALLSIGN>_logbook.adif"`）。

### `POST /admin/api/bestdx`
手动设置首页展示的最佳 DX。

- **Request Body**（JSON）：`{ "call": "K1ABC", "description": "USA", "distance_km": 11500 }`
- **校验**：`call` 与 `distance_km` 必填，`distance_km` 必须为 `1`–`40000` 之间的数值（取整存储）。

### `POST /admin/api/lastact`
设置或清空首页“最近活动”文本。

- **Request Body**（JSON）：`{ "text": "WAPC 2026" }`（可传空字符串 `""` 清空，最多截取前 `200` 字符）。

---

## 5. 输入约束汇总

| 字段 | 最大长度 / 范围 | 说明 |
| --- | --- | --- |
| `call` | `10` 字符 | 自动转大写 |
| `date` | `10` 字符 | `YYYY-MM-DD` |
| `time` | `5` 字符 | `HH:MM`（UTC） |
| `freq` | `16` 字符 | 频率（如 `14.270`） |
| `mode` | `8` 字符 | 白名单：`SSB`, `CW`, `FT8`, `FT4`, `AM`, `FM`, `RTTY`, `PSK31` |
| `rst_rx` / `rst_tx` | `8` 字符 | 默认 `"59"` |
| `grid` | `10` 字符 | 手动添加时自动转大写 |
| `dxcc` / `description` | `100` 字符 | — |
| `note` / `last_activity` | `200` 字符 | 可留空 |
| `badge_url` | `300` 字符 | 可留空；非空需 `http://` 或 `https://` |
| `distance_km` | `1` – `40000` | 整数（km） |
| `ids[]` | 最多 `200` 个 | 正整数 ID 数组 |
