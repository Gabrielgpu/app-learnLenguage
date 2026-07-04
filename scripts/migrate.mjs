import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL não configurada.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const sql = readFileSync(join(__dirname, "../db/migrations/001_create_quiz_cache.sql"), "utf-8");

try {
  await pool.query(sql);
  console.log("Migração aplicada com sucesso.");
} catch (error) {
  console.error("Erro ao aplicar migração:", error);
  process.exit(1);
} finally {
  await pool.end();
}
