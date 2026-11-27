import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { Bindings } from "./types";
import { getDbPath, getServerPort, loadEnv } from "./config/env";
import { D1Adapter } from "./lib/d1-adapter";
import { initSchema } from "./lib/db";
import { authClientApp, handleLogin, handleVerify, requireAdmin } from "./routes/auth";
import { frontendHandler } from "./routes/frontend";
import { adminHandler } from "./routes/admin";
import {
  apiActivityHandler,
  apiAddHandler,
  apiBadgeUrlHandler,
  apiBestDXHandler,
  apiDeleteHandler,
  apiExportHandler,
  apiLastActHandler,
  apiListHandler,
  apiSearchHandler,
  apiUploadHandler,
} from "./routes/api";

const db = new D1Adapter(getDbPath());
initSchema(db).then(() => console.log("DB schema ready"));

const env = loadEnv(db);
const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  (c as unknown as { env: Bindings }).env = env;
  await next();
});

// ---- public API ----
app.get("/api/qsos", (c) => apiSearchHandler(c.req.raw, c.env));
app.get("/api/activity", (c) => apiActivityHandler(c.req.raw, c.env));

// ---- public frontend ----
app.get("/", (c) => frontendHandler(c.req.raw, c.env));

// ---- admin auth (email OTP & Passkey via auth-service) ----
app.get("/admin/login", (c) => authClientApp.fetch(c.req.raw));
app.post("/admin/login", (c) => handleLogin(c));
app.post("/admin/verify", (c) => handleVerify(c));

// ---- 全局 admin 保护（/admin 下所有路径，除登录两步）----
app.use("/admin/*", async (c, next) => {
  const p = c.req.path;
  if (p === "/admin/login" || p === "/admin/verify") return next();
  return requireAdmin(c, next);
});
app.use("/admin", async (c, next) => requireAdmin(c, next));

// ---- admin ----
app.get("/admin", (c) => adminHandler(c.req.raw, c.env));
app.post("/admin/api/upload", requireAdmin, (c) => apiUploadHandler(c.req.raw, c.env));
app.post("/admin/api/add", requireAdmin, (c) => apiAddHandler(c.req.raw, c.env));
app.post("/admin/api/delete", requireAdmin, (c) => apiDeleteHandler(c.req.raw, c.env));
app.get("/admin/api/list", requireAdmin, (c) => apiListHandler(c.req.raw, c.env));
app.post("/admin/api/bestdx", requireAdmin, (c) => apiBestDXHandler(c.req.raw, c.env));
app.post("/admin/api/lastact", requireAdmin, (c) => apiLastActHandler(c.req.raw, c.env));
app.post("/admin/api/badge", requireAdmin, (c) => apiBadgeUrlHandler(c.req.raw, c.env));
app.get("/admin/api/export", requireAdmin, (c) => apiExportHandler(c.req.raw, c.env));

const port = getServerPort();
serve({ fetch: app.fetch, port });
console.log(`ham-weblog listening on :${port}`);
