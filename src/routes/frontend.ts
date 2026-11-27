import type { Bindings } from "../types";
import { countQsos, getActivity, getAvailableMonths, getSiteConfig, initSchema, queryQsos } from "../lib/db";
import { resolveBestDX } from "../services/qso";
import { renderFrontendPage } from "../views/frontend";

const SECURITY_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

export async function frontendHandler(request: Request, env: Bindings): Promise<Response> {
  await initSchema(env.DB);

  const url = new URL(request.url);
  const callF = url.searchParams.get("call") || undefined;
  const modeF = url.searchParams.get("mode") || undefined;
  const dateF = url.searchParams.get("date") || undefined;
  const filters = { call: callF, mode: modeF, date: dateF };

  const PAGE_SIZE = 50;
  const raw = parseInt(url.searchParams.get("page") || "1", 10);
  const page = Math.max(1, Number.isNaN(raw) ? 1 : raw);

  const [total, qsos, siteConfig, activity, best, availableMonths] = await Promise.all([
    countQsos(env.DB, filters),
    queryQsos(env.DB, filters, PAGE_SIZE, (page - 1) * PAGE_SIZE),
    getSiteConfig(env.DB),
    getActivity(env.DB),
    resolveBestDX(env.DB, env.MY_GRIDS),
    getAvailableMonths(env.DB),
  ]);

  const totalCnt = total?.cnt ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCnt / PAGE_SIZE));

  const html = renderFrontendPage({
    qsos,
    total: totalCnt,
    totalPages,
    page,
    best,
    callsign: env.CALLSIGN,
    blogURL: env.BLOG_URL,
    qrzURL: env.QRZ_URL,
    badgeUrl: siteConfig.badge_url,
    lastActivity: siteConfig.last_activity,
    activity,
    availableMonths,
    callF,
    modeF,
    dateF,
  });

  return new Response(html, { headers: SECURITY_HEADERS });
}
