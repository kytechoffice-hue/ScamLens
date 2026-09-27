/**
 * @file db.ts
 * @description MySQL2 connection pool for ScamLens (server-side only).
 * Reads credentials from environment variables set in .env.development / .env.production.
 */

import mysql from 'mysql2/promise';

// ---------------------------------------------------------------------------
// Pool singleton — reused across hot-reload in dev and across requests in prod
// ---------------------------------------------------------------------------
let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.DB_HOST ?? '82.25.121.84',
    port: Number(process.env.DB_PORT ?? 3306),
    database: process.env.DB_NAME ?? 'u589795535_ScamLens',
    user: process.env.DB_USER ?? 'u589795535_support',
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Hostinger requires SSL — comment out if not needed
    // ssl: { rejectUnauthorized: false },
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
