import type { BestDX, DBClient } from "../types";
import { getBestDX } from "../lib/db";
import { gridDistance } from "../lib/grid";

/**
 * 解析首页展示的最佳 DX：
 * 优先读取后台手动设置的 best_dx；未设置时结合 MY_GRIDS 从近期含 Grid 的记录中自动计算最远距离。
 */
export async function resolveBestDX(db: DBClient, myGridsRaw: string): Promise<BestDX | null> {
  const manual = await getBestDX(db);
  if (manual) return manual;

  const myGrids = myGridsRaw
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);
  if (myGrids.length === 0) return null;

  const qsosWithGrid = await db
    .prepare("SELECT call, dxcc, grid FROM qsos WHERE grid != '' ORDER BY date DESC LIMIT 200")
    .all<Record<string, string>>();

  let maxDist = 0;
  let maxCall = "";
  let maxDxcc = "";

  for (const row of qsosWithGrid.results) {
    for (const mg of myGrids) {
      const dist = gridDistance(mg, row.grid);
      if (dist !== null && dist > maxDist) {
        maxDist = dist;
        maxCall = row.call;
        maxDxcc = row.dxcc;
      }
    }
  }

  return maxCall ? { call: maxCall, description: maxDxcc, distance_km: maxDist } : null;
}
