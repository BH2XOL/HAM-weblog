import { test } from "node:test";
import assert from "node:assert/strict";
import { parseADIF } from "./adif.ts";

// FT8CN 导出的真实格式：<eoh> 头部独占一行，与第一条 QSO 之间没有 <eor>，
// 因此按 <eor> 切分时头部和首条 QSO 落在同一个 chunk 里。
const FT8CN = `FT8CN ADIF Export<eoh>
<call:5>BG0KE <QSL_RCVD:1>N <gridsquare:4>NL59 <mode:3>FT8 <rst_sent:2>-5 <rst_rcvd:3>-19 <qso_date:8>20261003 <time_on:6>074445 <freq:9>21.074000 <comment:31>Distance: 3139 km, QSO by FT8CN <eor>
<call:6>BA7SAY <QSL_RCVD:1>N <gridsquare:4>OL53 <mode:3>FT8 <rst_sent:2>-9 <rst_rcvd:3>-14 <qso_date:8>20261003 <time_on:6>074645 <freq:9>21.074000 <comment:31>Distance: 2198 km, QSO by FT8CN <eor>
`;

test("FT8CN 导出：头部与首条 QSO 同处一个 chunk，不能整块丢弃", () => {
  const qsos = parseADIF(FT8CN);
  assert.deepEqual(
    qsos.map((q) => q.call),
    ["BG0KE", "BA7SAY"]
  );
});

test("纯头部 chunk（<eoh> 后紧跟 <eor>）应被跳过，不产生记录", () => {
  const text =
    "Header only<eoh><eor>\n" +
    "<call:5>BG0KE <mode:3>FT8 <qso_date:8>20261003 <time_on:6>074445 <freq:9>21.074000 <eor>";
  const qsos = parseADIF(text);
  assert.deepEqual(
    qsos.map((q) => q.call),
    ["BG0KE"]
  );
});

test("没有 <eoh> 的普通 ADIF 正常解析", () => {
  const text =
    "<call:5>BG0KE <mode:3>FT8 <qso_date:8>20261003 <time_on:6>074445 <freq:9>21.074000 <eor>" +
    "<call:6>BA7SAY <mode:3>FT8 <qso_date:8>20261003 <time_on:6>074645 <freq:9>21.074000 <eor>";
  assert.equal(parseADIF(text).length, 2);
});

test("末条无 <eor> 结尾也不丢", () => {
  const text =
    "<call:5>BG0KE <mode:3>FT8 <qso_date:8>20261003 <time_on:6>074445 <freq:9>21.074000 <eor>\n" +
    "<call:6>BA7SAY <mode:3>FT8 <qso_date:8>20261003 <time_on:6>074645 <freq:9>21.074000";
  assert.deepEqual(
    parseADIF(text).map((q) => q.call),
    ["BG0KE", "BA7SAY"]
  );
});
