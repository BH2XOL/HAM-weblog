import type { BestDX, QSO } from "../types";
import { esc, opt } from "../lib/html";
import { renderLayout } from "./layout";
import { icons, renderBadgeHtml, renderHeatmap, renderPagination, safeURL } from "./components";

export interface FrontendViewProps {
  qsos: QSO[];
  total: number;
  totalPages: number;
  page: number;
  best: BestDX | null;
  callsign: string;
  blogURL: string;
  qrzURL: string;
  badgeUrl: string;
  lastActivity: string;
  activity: Record<string, number>;
  availableMonths: string[];
  callF?: string;
  modeF?: string;
  dateF?: string;
}

export function renderFrontendPage(p: FrontendViewProps): string {
  const bestHTML = p.best
    ? `<div class="stat-value stat-value-sm">${esc(p.best.call)}</div>
       <div class="stat-sub">${esc(p.best.description)} · ${p.best.distance_km}km</div>`
    : `<div class="stat-value stat-value-sm">—</div><div class="stat-sub">暂无数据</div>`;

  const lastActHTML = p.lastActivity
    ? `<div class="stat-value stat-value-sm">${esc(p.lastActivity)}</div><div class="stat-sub">最近活动</div>`
    : `<div class="stat-value stat-value-sm">—</div><div class="stat-sub">暂无活动</div>`;

  const badgeHtml = renderBadgeHtml(p.badgeUrl);

  const monthOptions = [opt("全部月份", "", p.dateF)];
  const months = p.availableMonths.length > 0 ? p.availableMonths : ["2026-04", "2026-01", "2025-10"];
  for (const m of months) {
    monthOptions.push(opt(m, m, p.dateF));
  }
  if (p.dateF && !months.includes(p.dateF)) {
    monthOptions.push(opt(p.dateF, p.dateF, p.dateF));
  }

  const rows =
    p.qsos.length > 0
      ? p.qsos
          .map(
            (q) => `
    <tr>
      <td class="callsign"><a href="https://www.qrz.com/db/${esc(q.call)}" target="_blank" rel="noopener">${esc(q.call)}</a></td>
      <td>${esc(q.date)}</td>
      <td>${esc(q.time)}</td>
      <td>${esc(q.freq)}</td>
      <td><span class="mode-badge mode-${esc(q.mode.toLowerCase())}">${esc(q.mode)}</span></td>
      <td>${esc(q.rst_rx)} / ${esc(q.rst_tx)}</td>
    </tr>`
          )
          .join("")
      : `<tr><td colspan="6" style="text-align:center;color:var(--md-sys-color-on-surface-variant);padding:2rem;">暂无符合条件的通联记录</td></tr>`;

  const body = `
    <div class="page-header page-header-row">
      <div>
        <h1 class="page-title">通联日志</h1>
        <p class="page-subtitle">共 <strong>${p.total}</strong> 条 QSO 记录</p>
      </div>
      ${badgeHtml}
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">总记录</div>
        <div class="stat-value">${p.total}</div>
        <div class="stat-sub">全部 QSO</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">最佳 DX</div>
        ${bestHTML}
      </div>
      <div class="stat-card">
        <div class="stat-label">最近活动</div>
        ${lastActHTML}
      </div>
    </div>

    ${renderHeatmap(p.activity)}

    <div class="table-wrap">
      <div class="table-header">
        <div class="table-title-group">
          <h2>通联记录</h2>
          <span>共 ${p.total} 条</span>
        </div>
        <div class="table-toolbar">
          <div class="search-field" style="min-width:160px;">
            <input type="text" placeholder="搜索呼号…" aria-label="搜索呼号" id="callSearch" value="${esc(p.callF || "")}" maxlength="10" onkeydown="if(event.key==='Enter')search()">
          </div>
          <div class="search-field" style="min-width:110px;">
            <select id="modeFilter" aria-label="按模式筛选">${opt("全部模式", "", p.modeF)}${opt("SSB", "SSB", p.modeF)}${opt("FT8", "FT8", p.modeF)}${opt("CW", "CW", p.modeF)}${opt("FT4", "FT4", p.modeF)}</select>
          </div>
          <div class="search-field" style="min-width:120px;">
            <select id="dateFilter" aria-label="按月份筛选">${monthOptions.join("")}</select>
          </div>
          <button class="btn btn-primary" onclick="search()">${icons.search}<span>搜索</span></button>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table>
          <thead><tr><th>呼号</th><th>日期</th><th>UTC</th><th>频率</th><th>模式</th><th>RST</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${renderPagination(p.total, p.totalPages, p.page, p.callF, p.modeF, p.dateF)}
    </div>
  `;

  const scripts = `
    function search() {
      var p = new URLSearchParams();
      var c = document.getElementById('callSearch').value.trim();
      var m = document.getElementById('modeFilter').value;
      var d = document.getElementById('dateFilter').value;
      if (c) p.set('call', c);
      if (m) p.set('mode', m);
      if (d) p.set('date', d);
      window.location.search = p.toString();
    }
  `;

  return renderLayout({
    title: `${p.callsign} · 日志`,
    description: `${p.callsign} 通联日志`,
    callsign: p.callsign,
    logoHref: "/",
    navItems: [
      { label: "博客", href: safeURL(p.blogURL) },
      { label: "日志", href: "/", active: true },
      { label: "管理", href: "/admin" },
      { label: "QRZ", href: safeURL(p.qrzURL) },
    ],
    body,
    footerPrefixHtml: `${esc(p.callsign)} &copy; ${new Date().getFullYear()}`,
    scripts,
  });
}
