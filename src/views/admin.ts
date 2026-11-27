import type { BestDX } from "../types";
import { esc } from "../lib/html";
import { icons } from "./components";
import { renderLayout } from "./layout";

export interface AdminViewProps {
  callsign: string;
  badgeUrl: string;
  lastActivity: string;
  bestDx: BestDX | null;
}

export function renderAdminPage(p: AdminViewProps): string {
  const today = new Date().toISOString().slice(0, 10);

  const body = `
    <div class="page-header">
      <h1 class="page-title">日志管理</h1>
      <p class="page-subtitle">状态徽章 · ADIF 导入导出 · 手动录入 · 批量管理</p>
    </div>

    <div class="card">
      <div class="card-title">
        <span style="display:inline-flex;align-items:center;gap:0.45rem;">${icons.link}<span>状态徽章</span></span>
      </div>
      <div class="form-grid" style="grid-template-columns:1fr;">
        <div class="form-field">
          <label for="badgeUrl">状态徽章地址（不填写则默认关闭）</label>
          <input type="text" id="badgeUrl" value="${esc(p.badgeUrl)}" placeholder="粘贴徽章链接或 <script> 代码，留空默认关闭" maxlength="300">
        </div>
      </div>
      <p style="font-size:0.78rem;color:var(--md-sys-color-on-surface-variant);margin-top:0.55rem;">填写后将记住并在首页右上角只读展示状态徽章（不会修改外部徽章状态）；未填写或加载失败时自动隐藏，不显示破损图标。</p>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="saveBadgeUrl()">保存</button>
        <button class="btn btn-outlined" onclick="clearBadgeUrl()">关闭显示</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span style="display:inline-flex;align-items:center;gap:0.45rem;">${icons.upload}<span>上传 ADIF</span></span>
        <a href="/admin/api/export" class="btn btn-sm btn-outlined">${icons.download}<span>导出</span></a>
      </div>
      <div class="upload-zone" id="uploadZone" onclick="document.getElementById('fileInput').click()">
        <p>拖拽 <strong>.adif</strong> / <strong>.adi</strong> 文件或<strong>点击选择</strong></p>
        <p style="font-size:0.78rem;margin-top:0.35rem;">自动去重 · 同 CALL + DATE + TIME + FREQ + MODE 不重复</p>
      </div>
      <input type="file" id="fileInput" accept=".adif,.adi" style="display:none" onchange="handleFile(this)">
      <div id="uploadResult" style="margin-top:0.75rem;font-size:0.85rem;color:var(--md-sys-color-on-surface-variant);display:none;"></div>
    </div>

    <div class="card">
      <div class="card-title">
        <span style="display:inline-flex;align-items:center;gap:0.45rem;">${icons.edit}<span>手动添加 QSO</span></span>
      </div>
      <div class="form-grid">
        <div class="form-field"><label for="addCall">呼号 *</label><input type="text" id="addCall" style="text-transform:uppercase;" maxlength="10"></div>
        <div class="form-field"><label for="addDate">日期 *</label><input type="date" id="addDate" value="${today}"></div>
        <div class="form-field"><label for="addTime">UTC 时间 *</label><input type="time" id="addTime" value="12:00"></div>
        <div class="form-field"><label for="addFreq">频率 (MHz) *</label><input type="text" id="addFreq" placeholder="14.270" maxlength="16"></div>
        <div class="form-field"><label for="addMode">模式 *</label><select id="addMode"><option>SSB</option><option selected>FT8</option><option>CW</option><option>FT4</option><option>AM</option><option>FM</option><option>RTTY</option><option>PSK31</option></select></div>
        <div class="form-field"><label for="addRstR">RST 收</label><input type="text" id="addRstR" value="59" maxlength="8"></div>
        <div class="form-field"><label for="addRstS">RST 发</label><input type="text" id="addRstS" value="59" maxlength="8"></div>
        <div class="form-field"><label for="addGrid">对方 Grid</label><input type="text" id="addGrid" maxlength="10"></div>
        <div class="form-field"><label for="addNote">备注</label><input type="text" id="addNote" maxlength="200"></div>
      </div>
      <button class="btn btn-primary" style="margin-top:1rem;" onclick="addQSO()">添加记录</button>
    </div>

    <div class="card">
      <div class="card-title">
        <span style="display:inline-flex;align-items:center;gap:0.45rem;">${icons.settings}<span>首页设置</span></span>
      </div>
      <div class="form-grid" style="grid-template-columns:1fr;">
        <div class="form-field"><label for="lastAct">最近活动（可留空）</label><input type="text" id="lastAct" value="${esc(p.lastActivity)}" placeholder="WAPC 2026（留空则显示暂无活动）" maxlength="200"></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="saveLastAct()">保存</button>
        <button class="btn btn-outlined" onclick="clearLastAct()">清空</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span style="display:inline-flex;align-items:center;gap:0.45rem;">${icons.trophy}<span>最佳 DX</span></span>
      </div>
      <p style="font-size:0.82rem;color:var(--md-sys-color-on-surface-variant);margin-bottom:0.85rem;">手动设置统计卡片显示的最佳 DX。</p>
      <div class="form-grid">
        <div class="form-field"><label for="bestCall">呼号 *</label><input type="text" id="bestCall" value="${esc(p.bestDx?.call || "")}" style="text-transform:uppercase;" maxlength="10"></div>
        <div class="form-field"><label for="bestDesc">描述</label><input type="text" id="bestDesc" value="${esc(p.bestDx?.description || "")}" maxlength="100"></div>
        <div class="form-field"><label for="bestDist">距离 (km) *</label><input type="number" id="bestDist" value="${p.bestDx ? String(p.bestDx.distance_km) : ""}" min="1" max="40000"></div>
      </div>
      <button class="btn btn-success" style="margin-top:0.85rem;" onclick="saveBest()">保存</button>
    </div>

    <div class="card">
      <div class="card-title">
        <span style="display:inline-flex;align-items:center;gap:0.45rem;">${icons.list}<span>QSO 列表</span></span>
        <button class="btn btn-sm btn-danger" onclick="batchDelete()">${icons.trash}<span>批量删除</span></button>
      </div>
      <div class="table-wrap" style="box-shadow:none;">
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr><th style="width:36px;"><input type="checkbox" class="checkbox" id="selectAll" onclick="toggleAll()"></th><th>呼号</th><th>日期</th><th>UTC</th><th>频率</th><th>模式</th><th>操作</th></tr>
            </thead>
            <tbody id="qsoTable"><tr><td colspan="7" style="text-align:center;color:var(--md-sys-color-on-surface-variant);">加载中…</td></tr></tbody>
          </table>
        </div>
      </div>
      <div id="qsoPager" class="pagination" style="border-top:none;padding-bottom:0;"></div>
    </div>
  `;

  const arrowL = icons.arrowLeft.replace(/"/g, '\\"');
  const arrowR = icons.arrowRight.replace(/"/g, '\\"');
  const trashIcon = icons.trash.replace(/"/g, '\\"');

  const scripts = `
    function toast(m, e) {
      var t = document.createElement('div');
      t.className = 'toast toast-' + (e ? 'err' : 'ok');
      t.textContent = m;
      document.body.appendChild(t);
      setTimeout(function() { t.remove(); }, 2500);
    }

    async function saveBadgeUrl() {
      var input = document.getElementById('badgeUrl');
      var raw = input.value.trim();
      var m = raw.match(/src=["']([^"']+)["']/i);
      if (m) raw = m[1].trim();
      if (!raw) {
        toast('请先输入状态徽章链接（如需关闭请点“关闭显示”）', true);
        return;
      }
      if (!/^https?:\\/\\//i.test(raw)) { toast('链接需以 http:// 或 https:// 开头', true); return; }
      var resp = await fetch('/admin/api/badge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: raw }) });
      var data = await resp.json();
      if (data.ok) {
        input.value = data.url || raw;
        toast('状态徽章已保存');
      } else {
        toast(data.error || '保存失败', true);
      }
    }
    async function clearBadgeUrl() {
      var input = document.getElementById('badgeUrl');
      input.value = '';
      var resp = await fetch('/admin/api/badge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: '' }) });
      var data = await resp.json();
      toast(data.ok ? '已关闭状态徽章显示' : (data.error || '操作失败'), !data.ok);
    }

    var uploadZone = document.getElementById('uploadZone');
    uploadZone.addEventListener('dragover', function(e) { e.preventDefault(); });
    uploadZone.addEventListener('drop', function(e) { e.preventDefault(); handleFile(e.dataTransfer.files[0]); });
    async function handleFile(f) {
      var file = f.files ? f.files[0] : f;
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { toast('文件不能超过 5MB', true); return; }
      var text = await file.text();
      var resp = await fetch('/admin/api/upload', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' }, body: text });
      var data = await resp.json();
      document.getElementById('uploadResult').style.display = 'block';
      document.getElementById('uploadResult').textContent = '新增 ' + data.inserted + ' 条 · 跳过 ' + data.skipped + ' 条重复';
      toast('上传完成 · 新增 ' + data.inserted + ' 条');
      goPage(1);
    }
    async function addQSO() {
      var call = document.getElementById('addCall').value.trim().toUpperCase();
      var date = document.getElementById('addDate').value;
      var time = document.getElementById('addTime').value;
      var freq = document.getElementById('addFreq').value.trim();
      if (!call || !date || !time || !freq) { toast('呼号、日期、时间、频率为必填项', true); return; }
      if (call.length > 10 || date.length > 10 || time.length > 5 || freq.length > 16) { toast('字段长度超出限制', true); return; }
      var body = {
        call: call, date: date, time: time, freq: freq,
        mode: document.getElementById('addMode').value,
        rst_rx: document.getElementById('addRstR').value.trim() || '59',
        rst_tx: document.getElementById('addRstS').value.trim() || '59',
        grid: document.getElementById('addGrid').value.trim(),
        note: document.getElementById('addNote').value.trim()
      };
      var resp = await fetch('/admin/api/add', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' }, body: JSON.stringify(body) });
      var data = await resp.json();
      if (data.ok) { toast('已添加 ' + call); goPage(1); }
      else toast(data.error || '添加失败', true);
    }
    async function saveLastAct() {
      var text = document.getElementById('lastAct').value.trim();
      if (text.length > 200) { toast('文本不能超过 200 字符', true); return; }
      var resp = await fetch('/admin/api/lastact', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' }, body: JSON.stringify({ text: text }) });
      var data = await resp.json();
      toast(data.ok ? (text ? '已保存' : '已清空最近活动') : (data.error || '保存失败'), !data.ok);
    }
    async function clearLastAct() {
      document.getElementById('lastAct').value = '';
      await saveLastAct();
    }
    async function saveBest() {
      var call = document.getElementById('bestCall').value.trim().toUpperCase();
      var dist = parseInt(document.getElementById('bestDist').value, 10);
      if (!call || !dist) { toast('呼号和距离必填', true); return; }
      if (dist <= 0 || dist > 40000) { toast('距离范围 1-40000 km', true); return; }
      var body = { call: call, description: document.getElementById('bestDesc').value.trim().slice(0, 100), distance_km: dist };
      var resp = await fetch('/admin/api/bestdx', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' }, body: JSON.stringify(body) });
      var data = await resp.json();
      toast(data.ok ? '最佳 DX 已更新' : (data.error || '保存失败'), !data.ok);
    }
    async function deleteOne(id) {
      if (!confirm('删除此条 QSO？不可撤销。')) return;
      await fetch('/admin/api/delete', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' }, body: JSON.stringify({ ids: [id] }) });
      toast('已删除');
      goPage(1);
    }
    async function batchDelete() {
      var checks = document.querySelectorAll('.select-row:checked');
      if (!checks.length) { toast('请勾选记录', true); return; }
      if (checks.length > 200) { toast('一次最多删除 200 条', true); return; }
      if (!confirm('删除选中的 ' + checks.length + ' 条？不可撤销。')) return;
      var ids = Array.from(checks).map(function(c) { return parseInt(c.value, 10); });
      await fetch('/admin/api/delete', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' }, body: JSON.stringify({ ids: ids }) });
      toast('已批量删除 ' + ids.length + ' 条');
      goPage(1);
    }
    function toggleAll() {
      var checked = document.getElementById('selectAll').checked;
      document.querySelectorAll('.select-row').forEach(function(c) { c.checked = checked; });
    }
    var _page = 1, _totalPages = 1;
    function renderPager() {
      var p = document.getElementById('qsoPager');
      if (!p || _totalPages <= 1) { if (p) p.innerHTML = ''; return; }
      var prev = _page > 1 ? '<button class="page-btn" style="gap:0.35rem;" onclick="goPage(' + (_page - 1) + ')">${arrowL} 上一页</button>' : '<button class="page-btn" style="gap:0.35rem;" disabled>${arrowL} 上一页</button>';
      var next = _page < _totalPages ? '<button class="page-btn" style="gap:0.35rem;" onclick="goPage(' + (_page + 1) + ')">下一页 ${arrowR}</button>' : '<button class="page-btn" style="gap:0.35rem;" disabled>下一页 ${arrowR}</button>';
      p.innerHTML = prev + '<span class="page-info">第 ' + _page + ' / ' + _totalPages + ' 页</span>' + next;
    }
    function goPage(n) { _page = n; loadList(); }
    async function loadList() {
      var resp = await fetch('/admin/api/list?page=' + _page);
      var data = await resp.json();
      _totalPages = Math.max(1, Math.ceil((data.total || 0) / (data.pageSize || 100)));
      document.getElementById('qsoTable').innerHTML = data.qsos.map(function(q) {
        return '<tr><td><input type="checkbox" class="checkbox select-row" value="' + q.id + '"></td>' +
               '<td class="callsign-cell">' + esc(q.call) + '</td>' +
               '<td>' + esc(q.date) + '</td><td>' + esc(q.time) + '</td><td>' + esc(q.freq) + '</td><td><span class="mode-badge mode-' + esc(q.mode.toLowerCase()) + '">' + esc(q.mode) + '</span></td>' +
               '<td><button class="btn btn-sm btn-danger" onclick="deleteOne(' + q.id + ')">${trashIcon}<span>删除</span></button></td></tr>';
      }).join('');
      renderPager();
    }
    function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    loadList();
  `;

  return renderLayout({
    title: `${p.callsign} · 日志管理`,
    callsign: p.callsign,
    logoHref: "/admin",
    navItems: [
      { label: "日志", href: "/" },
      { label: "管理", href: "/admin", active: true },
    ],
    body,
    footerPrefixHtml: `<a href="/">← 返回日志主页</a>`,
    scripts,
  });
}
