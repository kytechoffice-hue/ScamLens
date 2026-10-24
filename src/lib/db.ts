/**
 * @file db.ts
 * @description MySQL2 connection pool for ScamLens (server-side only).
 * Reads credentials from individual DB_* env vars, with DATABASE_URL as fallback.
 */

import mysql from 'mysql2/promise';

// ---------------------------------------------------------------------------
// Parse DATABASE_URL into individual parts (used as fallback in production)
// Format: mysql://user:password@host:port/database
// ---------------------------------------------------------------------------
function parseDatabaseUrl(url: string) {
  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: parsed.port ? Number(parsed.port) : 3306,
      database: parsed.pathname.replace(/^\//, ''),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Pool singleton — reused across hot-reload in dev and across requests in prod
// ---------------------------------------------------------------------------
let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (pool) return pool;

  // Individual env vars take priority; DATABASE_URL is the production fallback
  const fromUrl = process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : null;

  const host     = process.env.DB_HOST     ?? fromUrl?.host     ?? '82.25.121.84';
  const port     = process.env.DB_PORT     ? Number(process.env.DB_PORT) : (fromUrl?.port ?? 3306);
  const database = process.env.DB_NAME     ?? fromUrl?.database ?? 'u589795535_ScamLens';
  const user     = process.env.DB_USER     ?? fromUrl?.user     ?? 'u589795535_support';
  const password = process.env.DB_PASSWORD ?? fromUrl?.password ?? undefined;

  // Enable SSL when explicitly requested or when running in production
  const useSSL = process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production';

  pool = mysql.createPool({
    host,
    port,
    database,
    user,
    password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ...(useSSL ? { ssl: { rejectUnauthorized: false } } : {}),
  });

  return pool;
}

// ---------------------------------------------------------------------------
// Convenience query helper
// ---------------------------------------------------------------------------
export async function query<T = mysql.RowDataPacket[]>(
  sql: string,
  values?: mysql.ExecuteValues
): Promise<T> {
  const [rows] = await getPool().execute(sql, values);
  return rows as T;
}

// ---------------------------------------------------------------------------
// Named export for direct pool access (e.g. transactions)
// ---------------------------------------------------------------------------
export { getPool };
export default getPool;
