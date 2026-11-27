import { Hono } from "hono";

const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:3002";

export const authClientApp = new Hono();

authClientApp.get("/admin/login", async (c) => {
  const r = await fetch(`${AUTH_SERVICE}/login`);
  return c.html(await r.text());
});

export async function requireAdmin(c: any, next: any) {
  const cookie = c.req.header("Cookie") || "";
  const m = cookie.match(/admin_token=([^;]+)/);
  const isApi = c.req.path.startsWith("/admin/api");
  const deny = () =>
    isApi
      ? c.json({ error: "unauthorized" }, 401)
      : c.redirect(`https://auth.bh2xol.com/login?return=${encodeURIComponent(`https://${c.req.header("host")}/admin`)}`);
  if (!m) return deny();
  try {
    const r = await fetch(`${AUTH_SERVICE}/verify-token?token=${encodeURIComponent(m[1])}`);
    const d = (await r.json()) as { ok?: boolean };
    if (d.ok) return next();
    return deny();
  } catch {
    return deny();
  }
}

export async function handleLogin(c: any) {
  const body = await c.req.json().catch(() => ({}));
  const r = await fetch(`${AUTH_SERVICE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return c.json(await r.json().catch(() => ({})), r.status as any);
}

export async function handleVerify(c: any) {
  const body = await c.req.json().catch(() => ({}));
  const r = await fetch(`${AUTH_SERVICE}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const d = (await r.json().catch(() => ({}))) as { token?: string };
  if (d.token) {
    c.header(
      "Set-Cookie",
      `admin_token=${d.token}; Domain=.bh2xol.com; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=604800`
    );
  }
  return c.json(d, r.status as any);
}
