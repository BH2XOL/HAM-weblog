import type { Bindings } from "../types";
import { getBestDX, getSiteConfig, initSchema } from "../lib/db";
import { renderAdminPage } from "../views/admin";

const SECURITY_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

export async function adminHandler(_request: Request, env: Bindings): Promise<Response> {
  await initSchema(env.DB);
  const [siteConfig, bestDx] = await Promise.all([
    getSiteConfig(env.DB),
    getBestDX(env.DB),
  ]);
  return new Response(
    renderAdminPage({
      callsign: env.CALLSIGN,
      badgeUrl: siteConfig.badge_url,
      lastActivity: siteConfig.last_activity,
      bestDx: bestDx ?? null,
    }),
    { headers: SECURITY_HEADERS }
  );
}
