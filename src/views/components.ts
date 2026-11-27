import { esc } from "../lib/html";

/** 统一的内联 SVG 图标库（Material / Lucide 风格，18px 基准） */
export const icons = {
  radio: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>`,
  upload: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  edit: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  trophy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  list: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  trash: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  arrowLeft: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowRight: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  link: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  sun: `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
};

/** 安全校验外部链接协议 */
export function safeURL(u: string): string {
  if (!u) return "#";
  const lower = u.trim().toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://")) return esc(u);
  return "#";
}

/**
 * 根据配置生成外部状态徽章嵌入片段：
 * - 未配置时返回空字符串（默认关闭）
 * - 加载失败时自动隐藏 <img>，绝不显示浏览器破损图片图标
 */
export function renderBadgeHtml(rawUrl: string): string {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) return "";
  const pathPart = trimmed.split("?")[0].toLowerCase();

  let svgUrl = "";
  if (pathPart.endsWith(".svg")) {
    svgUrl = trimmed;
  } else if (pathPart.endsWith("/status.js")) {
    const qIdx = trimmed.indexOf("?");
    const qs = qIdx >= 0 ? trimmed.slice(qIdx) : "";
    svgUrl = trimmed.replace(/\/status\.js(\?.*)?$/i, "/status.svg") + qs;
  } else if (!pathPart.endsWith(".js")) {
    svgUrl = `${trimmed}/status.svg?label=STATION&h=34`;
  }

  if (svgUrl) {
    return `<div class="page-badge" id="pageBadge" style="display:none;"><img id="statusBadgeImg" data-base="${esc(svgUrl)}" alt="" style="height:34px;vertical-align:middle;border:0;"></div>
<script>(function(){
  var wrap=document.getElementById('pageBadge'),img=document.getElementById('statusBadgeImg');
  if(!wrap||!img)return;
  var base=img.getAttribute('data-base');
  img.onload=function(){wrap.style.display='inline-flex';};
  img.onerror=function(){wrap.style.display='none';};
  function refresh(){img.src=base+(base.indexOf('?')>=0?'&':'?')+'t='+Date.now();}
  refresh();
  setInterval(refresh,60000);
})();</script>`;
  }

  return `<div class="page-badge" id="pageBadge"><script>(function(){var b=document.getElementById('pageBadge');if(!b)return;b.addEventListener('error',function(e){if(e.target&&e.target.tagName==='IMG'){e.target.alt='';e.target.style.display='none';}},true);b.addEventListener('load',function(e){if(e.target&&e.target.tagName==='IMG'){e.target.style.display='inline-block';}},true);})();</script><script src="${esc(trimmed)}"></script></div>`;
}

/** 渲染宽幅近 30 天通联活跃度热力图卡片 */
export function renderHeatmap(activity: Record<string, number>): string {
  const DAYS = 30;
  const nowMs = Date.now();
  let cells = "";
  for (let i = 0; i < DAYS; i++) {
    const t = nowMs - (DAYS - 1 - i) * 86400 * 1000;
    const d = new Date(t).toISOString().slice(0, 10);
    const cnt = activity[d] || 0;
    const level = cnt === 0 ? 0 : cnt === 1 ? 1 : cnt <= 4 ? 2 : 3;
    cells += `<span class="activity-day l${level}" data-tip="${d} · ${cnt} QSO" aria-label="${d}：${cnt} QSO"></span>`;
  }
  const legend = `
    <div class="activity-legend">
      <span class="legend-item"><span class="legend-swatch sw0"></span>无</span>
      <span class="legend-item"><span class="legend-swatch sw1"></span>1</span>
      <span class="legend-item"><span class="legend-swatch sw2"></span>2-4</span>
      <span class="legend-item"><span class="legend-swatch sw3"></span>5+</span>
    </div>`;
  return `
    <section class="activity-card" aria-label="近30天通联活跃度">
      <div class="activity-header">
        <span class="stat-label">近 30 天通联活跃度</span>
        ${legend}
      </div>
      <div class="activity-grid" role="img" aria-label="近30天通联活跃度热力图">${cells}</div>
    </section>`;
}

/** 渲染公开列表分页控件 */
export function renderPagination(
  total: number,
  totalPages: number,
  page: number,
  callF?: string,
  modeF?: string,
  dateF?: string
): string {
  if (totalPages <= 1) return "";
  const qs = new URLSearchParams();
  if (callF) qs.set("call", callF);
  if (modeF) qs.set("mode", modeF);
  if (dateF) qs.set("date", dateF);
  const base = qs.size > 0 ? `?${qs.toString()}&` : "?";
  const prev =
    page > 1
      ? `<a href="${base}page=${page - 1}" class="page-btn" style="gap:0.35rem;">${icons.arrowLeft} 上一页</a>`
      : `<button class="page-btn" style="gap:0.35rem;" disabled>${icons.arrowLeft} 上一页</button>`;
  const next =
    page < totalPages
      ? `<a href="${base}page=${page + 1}" class="page-btn" style="gap:0.35rem;">下一页 ${icons.arrowRight}</a>`
      : `<button class="page-btn" style="gap:0.35rem;" disabled>下一页 ${icons.arrowRight}</button>`;
  return `<div class="pagination">${prev}<span class="page-info">第 ${page} / ${totalPages} 页 · ${total} 条</span>${next}</div>`;
}
