import type { QSO, BestDX, SiteConfig, DBClient } from "../types";

function rowToQSO(row: Record<string, unknown>): QSO {
  return {
    id: row.id as number,
    call: row.call as string,
    dxcc: row.dxcc as string,
    date: row.date as string,
    time: row.time as string,
    freq: row.freq as string,
    mode: row.mode as string,
    rst_rx: row.rst_rx as string,
    rst_tx: row.rst_tx as string,
    grid: row.grid as string,
    lotw: !!row.lotw,
    note: (row.note as string) || "",
    created_at: row.created_at as string,
  };
}

// 迁移只需每进程跑一次，避免每次页面渲染都查 PRAGMA
let migrationsChecked = false;

export async function initSchema(db: DBClient) {
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS qsos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        call TEXT NOT NULL,
        dxcc TEXT DEFAULT '',
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        freq TEXT DEFAULT '',
        mode TEXT NOT NULL,
        rst_rx TEXT DEFAULT '59',
        rst_tx TEXT DEFAULT '59',
        grid TEXT DEFAULT '',
        lotw INTEGER DEFAULT 0,
        note TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS best_dx (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        call TEXT NOT NULL,
        description TEXT DEFAULT '',
        distance_km INTEGER NOT NULL DEFAULT 0
      )
    `),
    db.prepare(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_qso_unique
      ON qsos(call, date, time, freq, mode)
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS site_config (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        last_activity TEXT DEFAULT '',
        badge_url TEXT DEFAULT ''
      )
    `),
  ]);

  if (!migrationsChecked) {
    const cols = await db.prepare("PRAGMA table_info(site_config)").all<{ name: string }>();
    const have = new Set(cols.results.map((c) => c.name));
    if (!have.has("badge_url")) {
      await db.prepare("ALTER TABLE site_config ADD COLUMN badge_url TEXT DEFAULT ''").run();
    }
    migrationsChecked = true;
  }
}

export function countQsos(db: DBClient, filters?: Record<string, string | undefined>) {
  const { sql, params } = buildFilter("SELECT COUNT(*) as cnt FROM qsos", filters);
  return db.prepare(sql).bind(...params).first<{ cnt: number }>();
}

export function queryQsos(db: DBClient, filters?: Record<string, string | undefined>, limit?: number, offset?: number) {
  const { sql, params } = buildFilter("SELECT * FROM qsos", filters);
  let full = `${sql} ORDER BY date DESC, time DESC`;
  if (limit != null) full += ` LIMIT ?`;
  if (offset != null) full += ` OFFSET ?`;
  const allParams = limit != null ? (offset != null ? [...params, limit, offset] : [...params, limit]) : params;
  return db.prepare(full).bind(...allParams).all<Record<string, unknown>>().then(r => r.results.map(rowToQSO));
}

export function countDXCC(db: DBClient) {
  return db.prepare("SELECT COUNT(DISTINCT dxcc) as cnt FROM qsos WHERE dxcc != ''").first<{ cnt: number }>();
}

export function insertQSO(db: DBClient, qso: Omit<QSO, "id" | "created_at">) {
  return db.prepare(`
    INSERT OR IGNORE INTO qsos (call, dxcc, date, time, freq, mode, rst_rx, rst_tx, grid, lotw, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(qso.call, qso.dxcc, qso.date, qso.time, qso.freq, qso.mode, qso.rst_rx, qso.rst_tx, qso.grid, qso.lotw ? 1 : 0, qso.note).run();
}

export function batchInsertQSOs(db: DBClient, qsos: Omit<QSO, "id" | "created_at">[]) {
  if (qsos.length === 0) return Promise.resolve([]);
  const stmts = qsos.map(q =>
    db.prepare(`
      INSERT OR IGNORE INTO qsos (call, dxcc, date, time, freq, mode, rst_rx, rst_tx, grid, lotw, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(q.call, q.dxcc, q.date, q.time, q.freq, q.mode, q.rst_rx, q.rst_tx, q.grid, q.lotw ? 1 : 0, q.note)
  );
  return db.batch(stmts);
}

export function deleteQSOs(db: DBClient, ids: number[]) {
  const placeholders = ids.map(() => "?").join(",");
  return db.prepare(`DELETE FROM qsos WHERE id IN (${placeholders})`).bind(...ids).run();
}

export function getBestDX(db: DBClient) {
  return db.prepare("SELECT * FROM best_dx WHERE id = 1").first<BestDX>();
}

export function setBestDX(db: DBClient, dx: BestDX) {
  return db.prepare(`
    INSERT INTO best_dx (id, call, description, distance_km)
    VALUES (1, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET call = excluded.call, description = excluded.description, distance_km = excluded.distance_km
  `).bind(dx.call, dx.description, dx.distance_km).run();
}

export async function getSiteConfig(db: DBClient): Promise<SiteConfig> {
  const row = await db
    .prepare("SELECT last_activity, badge_url FROM site_config WHERE id = 1")
    .first<{ last_activity?: string; badge_url?: string }>();
  return {
    last_activity: row?.last_activity || "",
    badge_url: row?.badge_url || "",
  };
}

export function getLastActivity(db: DBClient) {
  return db.prepare("SELECT last_activity FROM site_config WHERE id = 1").first<{ last_activity: string }>();
}

export function getActivity(db: DBClient, days = 30) {
  const cutoff = new Date(Date.now() - days * 86400 * 1000).toISOString().slice(0, 10);
  return db.prepare(
    "SELECT date, COUNT(*) AS cnt FROM qsos WHERE date >= ? GROUP BY date"
  ).bind(cutoff).all<{ date: string; cnt: number }>().then(r => {
    const map: Record<string, number> = {};
    for (const row of r.results) map[row.date] = row.cnt;
    return map;
  });
}

/** 按 created_at 统计最近 N 天每天的录入数量（供 /api/activity 使用） */
export async function getActivitySeries(db: DBClient, days: number) {
  const safeDays = Math.min(Math.max(1, Math.floor(days)), 90);
  const modifier = `-${safeDays} days`;
  const rows = await db
    .prepare(
      `SELECT date(created_at) as d, COUNT(*) as cnt FROM qsos
       WHERE created_at >= datetime('now', ?)
       GROUP BY date(created_at) ORDER BY d`
    )
    .bind(modifier)
    .all<Record<string, unknown>>();
  return rows.results;
}

/** 查询已有 QSO 记录中的可用月份列表（YYYY-MM，倒序） */
export async function getAvailableMonths(db: DBClient, limit = 24): Promise<string[]> {
  const rows = await db
    .prepare(
      "SELECT DISTINCT substr(date, 1, 7) AS ym FROM qsos WHERE length(date) >= 7 ORDER BY ym DESC LIMIT ?"
    )
    .bind(limit)
    .all<{ ym: string }>();
  return rows.results.map((r) => r.ym).filter(Boolean);
}

export function setLastActivity(db: DBClient, text: string) {
  return db.prepare(`
    INSERT INTO site_config (id, last_activity) VALUES (1, ?)
    ON CONFLICT(id) DO UPDATE SET last_activity = excluded.last_activity
  `).bind(text).run();
}

export function setBadgeUrl(db: DBClient, url: string) {
  return db.prepare(`
    INSERT INTO site_config (id, badge_url) VALUES (1, ?)
    ON CONFLICT(id) DO UPDATE SET badge_url = excluded.badge_url
  `).bind(url).run();
}

export async function exportAllADIF(db: DBClient, callsign: string): Promise<string> {
  const all = await db.prepare("SELECT * FROM qsos ORDER BY date, time").all<Record<string, unknown>>();
  const lines: string[] = [
    "<ADIF_VER:5>3.1.4",
    `<PROGRAMID:${`${callsign}-LOG`.length}>${callsign}-LOG`,
    "<EOH>",
  ];
  for (const row of all.results) {
    const q = rowToQSO(row);
    lines.push(
      `<CALL:${q.call.length}>${q.call}` +
      `<FREQ:${q.freq.length}>${q.freq}` +
      `<MODE:${q.mode.length}>${q.mode}` +
      `<QSO_DATE:8>${q.date.replace(/-/g, "")}` +
      `<TIME_ON:${q.time.replace(/:/g, "").length}>${q.time.replace(/:/g, "")}` +
      `<RST_RCVD:${q.rst_rx.length}>${q.rst_rx}` +
      `<RST_SENT:${q.rst_tx.length}>${q.rst_tx}` +
      (q.grid ? `<GRIDSQUARE:${q.grid.length}>${q.grid}` : "") +
      (q.dxcc ? `<COUNTRY:${q.dxcc.length}>${q.dxcc}` : "") +
      (q.note ? `<COMMENT:${q.note.length}>${q.note}` : "") +
      `<EOR>`
    );
  }
  return lines.join("\n") + "\n";
}

function buildFilter(baseSQL: string, filters?: Record<string, string | undefined>) {
  const clauses: string[] = [];
  const params: unknown[] = [];
  if (filters?.call) { clauses.push("call LIKE ?"); params.push(`%${filters.call}%`); }
  if (filters?.mode) { clauses.push("mode = ?"); params.push(filters.mode); }
  if (filters?.date) { clauses.push("date LIKE ?"); params.push(`${filters.date}%`); }
  const sql = clauses.length > 0 ? `${baseSQL} WHERE ${clauses.join(" AND ")}` : baseSQL;
  return { sql, params };
}
