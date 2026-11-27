import { esc } from "../lib/html";
import { styles } from "../styles";
import { icons } from "./components";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface PageLayoutOptions {
  title: string;
  description?: string;
  callsign: string;
  logoHref: string;
  navItems: NavItem[];
  body: string;
  footerPrefixHtml: string;
  scripts?: string;
}

const BEIAN_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAoCAYAAACWwljjAAAAUGVYSWZNTQAqAAAACAAEAQAABAAAAAEAAAAAAQEABAAAAAEAAAAAh2kABAAAAAEAAAA+ARIABAAAAAEAAAAAAAAAAAABkggABAAAAAEAAAAAAAAAALFNWc4AAAVCSURBVFjD7dZrUFR1GMfxI6kx6DhaFkakMjGJppN5QWBavETgBVFAkaVFEBUhXUmRuAyBAuLkBUFBJUtKnTGUQBQoEQQVkKsKy2WXxRXYBXZhuagYKti/fX5H3lQvmmaa1qZn5vPqvPme85z/nMNxf2MYuz+JPG7K8iVZiREV5McDYdVEW3N+G2FMbkq4f3r+9SA2ULiYyDLDU0mK39oBcsprNiN73G0gxn85nPnSBb72Fw2S+gsR6YQ9uetI/jtBjDFDkh+/nhGrNxfAUW9LKNo6F9q83wXtjllwL8cf0k4Hgs1r1nDlgDvo5lXy8gYx1m1KntwOu06c5q9iJCFMCI/CLUAy0hBqrKeCzGkG3DYYAYMp9pCalQBrrFzhV+nhS0R3MAzJyxP0lDVPJy2X/Z4SS5OVjKwX+sJQ3EyoMTOBOrNJcGemCcgcLOCO8QS4PnYMsGvesDUwBpaY20HnzbB20iWNn0b0P4g9TppPEg8GMcJxe+DcISH0rZ8Mta+MgfoPp/BMjKF67ASotTKHMs4AurymQ35uBHDcdjgUGwzPGiNnE/0N6q4uMCVDBWtukiOHIhjhRgZD9u6F0Go/GWTcaKifYgwNAjPeQl79lLfgju4eSYPtVJBWBgM3IgDCw0KB9cZeg4E+M/0Mqs4ICiADZ60ZOZMcAxwXAVnJ7vBLlCVUcaOgTDgDao8JQFnoDM1xDlD9hhF075gHVTd2wPDKkuKjgUncQKvIjNbPoKbc2BNEc3weI8Xp4cAZJsB2Hx94VmQHuSvNocT2HajzmwOyIBuQixdAw357YK0bIXSTN3BcKBTn74P+i4tAVXg4RT+DZD+I24g81oqRB+UBYGp7HEaOEsNVRwvojBJA3dIZUKF7oUmD11yQLHoPVAGWINksgDGjt4Dx7K/goTQEmpOseRm+cv0Mkqf5PCa3Q2wYYdnLYOfeRBh+xDnceHj+vhE0bPwAil3MoS5oAXRELYTnsyZCATcBOO4z8I+IA1bsCpJ9AlDm+TfrZ5AqZ3cmuZeyhJGhyk0gydsH3Ntx4MhZQ+a4cVA0yQhKpr0OlS80rpgOlbazwN/AErjxYVCeEwKDNQGgvLQGtFV7k/Q1aM8t0pSwmJHW1HXAanwh5nAyDH9KuBG+PG4DOI1zAu/Jq2Es5wkct+WFENgZFgWs0RPasnnK88uhqzS06P+gvxSkLgkfJNJT7ow0JLiC8qgAHlaIob4wBBKDRbAtdD9knfGFqjQXEHmFgJtTAAR+EQXdN3xA/Z0A5Cc/AWXGCuiVRWr1M+hpf5kHactzYaTprCPUxTvwdlnAkyJ3YHJvnnQlDBU7Q1/GUmB3PXi9Yp5ECIroOVAXbw8tl1ygs1wEg73ZtvoZNDxD/XdFRFPq2UfaC9cyUhMtgPq4j6CnajN0XRVBe6YzqK8Koa9qEzyQ+IMi2R4ajy0HTbkYVDfEWtKvTrMjf/jJ17ug3ubSxaTl4pYOorklYlC8Adpz3KCrcB2v2BM01zdAbzmvM98d7n/vAO0/C6Gn9nPoKPKFpnPCLqK9960d0f+g/vv7c8lA6y5GeqRB0JrjBarLHqDJ5ykvrgZNoRfvJxdQnPgYmnUHg7Rf8eDRenW0VX7wSLWTpzlygeh/EGuvNCKdspijRJUn7CfqK6sYeVjmBj3XVoMmcwVoddeIOn0ZDK+0p9QD1AVO0FnuA92K3S2kV306nDAWaUD0P+j3I0sOnEgqYjw8yc1I22+IItWlhMhPOtcQZZqriqizRaA492kJ6cgX55Gu6uMHiTQ9eilhkbqAyD8P+A0FTGEBtICYowAAAABJRU5ErkJggg==";

const THEME_INIT_SCRIPT = `(function(){
  var saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme:dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;

const THEME_TOGGLE_SCRIPT = `(function(){
  var html = document.documentElement, btn = document.getElementById('theme-btn');
  if (!btn) return;
  function setTheme(dark) {
    if (dark) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }
  btn.addEventListener('click', function() {
    var r = btn.getBoundingClientRect();
    html.style.setProperty('--vt-x', (r.left + r.width / 2) + 'px');
    html.style.setProperty('--vt-y', (r.top + r.height / 2) + 'px');
    var isDark = html.getAttribute('data-theme') === 'dark';
    if (document.startViewTransition) {
      document.startViewTransition(function() { setTheme(!isDark); });
    } else {
      setTheme(!isDark);
    }
  });
})();`;

const MD3_SELECT_SCRIPT = `(function(){
  var chevronSvg = '<svg class="md-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
  var checkSvg = '<svg class="md-select-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
  var allWraps = [];

  function closeAll(except) {
    allWraps.forEach(function(w) {
      if (w !== except) {
        w.classList.remove('is-open');
        var t = w.querySelector('.md-select-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('.search-field select, .form-field select').forEach(function(sel) {
    if (sel.dataset.mdEnhanced) return;
    sel.dataset.mdEnhanced = '1';

    var wrap = document.createElement('div');
    wrap.className = 'md-select';
    sel.parentNode.insertBefore(wrap, sel);
    sel.classList.add('md-select-native');
    sel.tabIndex = -1;
    wrap.appendChild(sel);

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'md-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    var labelSpan = document.createElement('span');
    labelSpan.className = 'md-select-label';
    trigger.appendChild(labelSpan);
    trigger.insertAdjacentHTML('beforeend', chevronSvg);

    var menu = document.createElement('div');
    menu.className = 'md-select-menu';
    menu.setAttribute('role', 'listbox');

    function syncUI() {
      var opt = sel.options[sel.selectedIndex];
      labelSpan.textContent = opt ? opt.textContent : '';
      menu.querySelectorAll('.md-select-option').forEach(function(btn, idx) {
        var active = idx === sel.selectedIndex;
        btn.classList.toggle('is-selected', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    Array.from(sel.options).forEach(function(opt, idx) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'md-select-option';
      item.setAttribute('role', 'option');
      var txt = document.createElement('span');
      txt.textContent = opt.textContent;
      item.appendChild(txt);
      item.insertAdjacentHTML('beforeend', checkSvg);
      item.addEventListener('click', function() {
        sel.selectedIndex = idx;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        syncUI();
        closeAll();
        trigger.focus();
      });
      menu.appendChild(item);
    });

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      var willOpen = !wrap.classList.contains('is-open');
      closeAll(willOpen ? wrap : null);
      wrap.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var next = sel.selectedIndex + (e.key === 'ArrowDown' ? 1 : -1);
        if (next >= 0 && next < sel.options.length) {
          sel.selectedIndex = next;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          syncUI();
        }
      } else if (e.key === 'Escape') {
        closeAll();
      }
    });

    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    allWraps.push(wrap);
    syncUI();
  });

  document.addEventListener('click', function() { closeAll(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeAll(); });
})();`;

/** 渲染统一的 MD3 HTML 页面外壳（含 Top App Bar、主题切换与备案 Footer） */
export function renderLayout(opts: PageLayoutOptions): string {
  const navHtml = opts.navItems
    .map(
      (item) =>
        `<a href="${item.href}"${item.active ? ' class="active"' : ""}>${esc(item.label)}</a>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(opts.title)}</title>
  ${opts.description ? `<meta name="description" content="${esc(opts.description)}">` : ""}
  <link rel="icon" href="https://blog.bh2xol.com/favicon-round.png">
  <script>${THEME_INIT_SCRIPT}</script>
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a href="${opts.logoHref}" class="logo">${icons.radio}<span>${esc(opts.callsign)}</span></a>
      <nav class="nav">
        ${navHtml}
        <button class="theme-btn" id="theme-btn" aria-label="切换主题">
          ${icons.sun}
          ${icons.moon}
        </button>
      </nav>
    </div>
  </header>

  <main class="main">
    ${opts.body}
  </main>

  <footer>
    ${opts.footerPrefixHtml}&emsp;·&emsp;<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">辽ICP备2026017709号</a>&emsp;·&emsp;<a href="https://beian.mps.gov.cn/#/query/webSearch?code=21021702000925" rel="noreferrer" target="_blank"><img src="${BEIAN_IMG}" alt="公安备案" style="width:18px;height:20px;vertical-align:middle;margin-right:4px;display:inline-block;">辽公网安备21021702000925号</a>
  </footer>

  ${opts.scripts ? `<script>${opts.scripts}</script>` : ""}
  <script>${MD3_SELECT_SCRIPT}</script>
  <script>${THEME_TOGGLE_SCRIPT}</script>
</body>
</html>`;
}
