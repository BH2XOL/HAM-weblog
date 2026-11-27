import type { Bindings, DBClient } from "../types";

/** 从环境变量构建应用 Bindings 配置 */
export function loadEnv(db: DBClient): Bindings {
  return {
    DB: db,
    DOMAIN: process.env.DOMAIN || "log.bh2xol.com",
    CALLSIGN: process.env.CALLSIGN || "BH2XOL",
    BLOG_URL: process.env.BLOG_URL || "",
    QRZ_URL: process.env.QRZ_URL || "",
    MY_GRIDS: process.env.MY_GRIDS || "",
  };
}

/** 获取 SQLite 数据库路径 */
export function getDbPath(): string {
  return process.env.DB_PATH || "./ham-weblog.db";
}

/** 获取 HTTP 服务监听端口 */
export function getServerPort(): number {
  const parsed = Number(process.env.PORT || 3000);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000;
}
