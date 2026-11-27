export interface QSO {
  id: number;
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
  created_at: string;
}

export interface BestDX {
  call: string;
  description: string;
  distance_km: number;
}

export interface SiteConfig {
  last_activity: string;
  badge_url: string;
}

export interface EnvVars {
  CALLSIGN: string;
  BLOG_URL: string;
  QRZ_URL: string;
  MY_GRIDS: string;
}

export interface DBStatement {
  bind(...params: unknown[]): DBStatement;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
}

export interface DBClient {
  prepare(sql: string): DBStatement;
  batch(stmts: DBStatement[]): Promise<unknown[]>;
}

export type Bindings = {
  DB: DBClient;
  DOMAIN: string;
} & EnvVars;
