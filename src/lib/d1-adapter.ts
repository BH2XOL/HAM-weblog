import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import type { DBClient, DBStatement } from "../types";

/**
 * D1-compatible adapter backed by Node's built-in node:sqlite (Node >= 23.4).
 * Mimics the subset of the Cloudflare D1 API used by this app:
 *   prepare(sql).bind(...).all() / first() / run()
 *   db.batch([...])
 * node:sqlite is synchronous, so we wrap calls in promises to keep the same
 * async call surface as the original D1 code.
 */

type Row = Record<string, unknown>;

class D1Statement implements DBStatement {
  private sql: string;
  private params: SQLInputValue[];
  private db: DatabaseSync;

  constructor(db: DatabaseSync, sql: string, params: SQLInputValue[] = []) {
    this.db = db;
    this.sql = sql;
    this.params = params;
  }

  bind(...params: unknown[]): D1Statement {
    return new D1Statement(this.db, this.sql, params as SQLInputValue[]);
  }

  async all<T = Row>(): Promise<{ results: T[] }> {
    const rows = this.db.prepare(this.sql).all(...this.params) as Row[];
    return { results: rows as T[] };
  }

  async first<T = Row>(): Promise<T | null> {
    const row = this.db.prepare(this.sql).get(...this.params) as Row | undefined;
    return (row ?? null) as T | null;
  }

  async run(): Promise<{ success: boolean; meta: { changes: number } }> {
    const info = this.db.prepare(this.sql).run(...this.params);
    return { success: true, meta: { changes: Number(info.changes) } };
  }

  getSQL(): string {
    return this.sql;
  }

  getParams(): SQLInputValue[] {
    return this.params;
  }
}

export class D1Adapter implements DBClient {
  private db: DatabaseSync;

  constructor(path: string) {
    this.db = new DatabaseSync(path);
    this.db.exec("PRAGMA journal_mode = WAL");
  }

  prepare(sql: string): D1Statement {
    return new D1Statement(this.db, sql);
  }

  async batch(stmts: DBStatement[]): Promise<unknown[]> {
    const results: unknown[] = [];
    this.db.exec("BEGIN");
    try {
      for (const s of stmts as D1Statement[]) {
        results.push(this.db.prepare(s.getSQL()).run(...s.getParams()));
      }
      this.db.exec("COMMIT");
    } catch (err) {
      this.db.exec("ROLLBACK");
      throw err;
    }
    return results;
  }

  close(): void {
    this.db.close();
  }
}
