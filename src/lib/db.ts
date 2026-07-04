import { Pool } from "pg";
import { readFileSync } from "fs";
import { join } from "path";

let pool: Pool | null = null;
let schemaInitialized = false;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!pool) {
    pool = new Pool({ connectionString });
  }

  return pool;
}

export async function ensureQuizCacheSchema(): Promise<boolean> {
  const db = getPool();
  if (!db || schemaInitialized) return Boolean(db);

  const migrationPath = join(process.cwd(), "db/migrations/001_create_quiz_cache.sql");
  const sql = readFileSync(migrationPath, "utf-8");

  await db.query(sql);
  schemaInitialized = true;
  return true;
}
