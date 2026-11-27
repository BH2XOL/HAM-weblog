import type { QSO } from "../types";

interface RawQSO {
  call: string;
  dxcc: string;
  date: string;
  time: string;
  freq: string;
  mode: string;
  rst_rx: string;
  rst_tx: string;
  grid: string;
  lotw: boolean;
  note: string;
}

export function parseADIF(text: string): RawQSO[] {
  const result: RawQSO[] = [];
  const records = text.split(/<eor>/i);

  for (const raw of records) {
    // <eoh> 头部可能与第一条 QSO 同处一个 chunk —— FT8CN 导出就是如此，
    // 头与首条记录之间没有 <eor>。只切掉头部本身，不能整块丢弃，
    // 否则会连带着吞掉首条 QSO。
    const record = raw.replace(/^[\s\S]*?<eoh>/i, "");
    if (!record.trim()) continue;

    const qso: RawQSO = {
      call: "", dxcc: "", date: "", time: "", freq: "", mode: "",
      rst_rx: "", rst_tx: "", grid: "", lotw: false, note: "",
    };

    // 注意：没有 ^ ！否则只匹配第一个字段
    const fieldRegex = /<([^:>]+):(\d+)(?::[^>]*)?>([^<]*)/g;
    let match: RegExpExecArray | null;
    while ((match = fieldRegex.exec(record)) !== null) {
      const key = match[1].toLowerCase();
      const value = match[3].trim();

      switch (key) {
        case "call": qso.call = value.toUpperCase(); break;
        case "country": qso.dxcc = value; break;
        case "qso_date": qso.date = fmtDate(value); break;
        case "time_on": qso.time = fmtTime(value); break;
        case "freq": qso.freq = parseFloat(value).toFixed(3); break;
        case "mode": qso.mode = value; break;
        case "rst_rcvd": qso.rst_rx = value; break;
        case "rst_sent": qso.rst_tx = value; break;
        case "gridsquare": qso.grid = value; break;
        case "comment":
        case "contest_id": qso.note = value; break;
        case "qsl_rcvd":
          qso.lotw = value.toUpperCase() === "Y";
          break;
        case "app_lotw_2xqsl":
          if (value === "Y") qso.lotw = true;
          break;
      }
    }

    if (qso.call && qso.date && qso.mode) {
      result.push(qso);
    }
  }

  return result;
}

export function mergeUnique(
  existing: Pick<QSO, "call" | "date" | "time" | "freq" | "mode">[],
  incoming: RawQSO[]
): RawQSO[] {
  const set = new Set(existing.map((q) => `${q.call}|${q.date}|${q.time}|${q.freq}|${q.mode}`));
  return incoming.filter((q) => {
    const key = `${q.call}|${q.date}|${q.time}|${q.freq}|${q.mode}`;
    return !set.has(key);
  });
}

function fmtDate(v: string): string {
  const d = v.replace(/-/g, "");
  if (d.length === 8) return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
  return v;
}

function fmtTime(v: string): string {
  const t = v.replace(/:/g, "");
  if (t.length >= 4) return `${t.slice(0, 2)}:${t.slice(2, 4)}`;
  return v;
}