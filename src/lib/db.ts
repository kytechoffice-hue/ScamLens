/**
 * @file db.ts
 * @description MySQL2 connection pool for ScamLens (server-side only).
 * Reads credentials from individual DB_* env vars, with DATABASE_URL as fallback.
 */

import mysql from 'mysql2/promise';

// ---------------------------------------------------------------------------
// Parse DATABASE_URL into individual parts (used as fallback in production)
// Format: mysql://user:password@host:port/database
//
// Uses regex instead of new URL() because passwords often contain special
// characters (+ ; . @ etc.) that break the standard URL parser.
// ---------------------------------------------------------------------------
function parseDatabaseUrl(url: string) {
  try {
    // Strip scheme — supports mysql://, mysql2://, postgresql://, postgres://
    const withoutScheme = url.replace(/^[a-z0-9+\-.]+:\/\//i, '');

    // Split credentials from host portion at the LAST @ sign
    // (passwords may contain @ themselves)
    const atIndex = withoutScheme.lastIndexOf('@');
    if (atIndex === -1) return null;

    const credentials = withoutScheme.slice(0, atIndex);       // user:password
    const hostPart    = withoutScheme.slice(atIndex + 1);      // host:port/database

    // Split user:password — only split on the FIRST colon
    const colonIdx = credentials.indexOf(':');
    const user     = colonIdx !== -1 ? credentials.slice(0, colonIdx) : credentials;
    const password = colonIdx !== -1 ? credentials.slice(colonIdx + 1) : '';

    // Split host:port/database
    const slashIdx = hostPart.indexOf('/');
    const hostPort = slashIdx !== -1 ? hostPart.slice(0, slashIdx) : hostPart;
    const database = slashIdx !== -1 ? hostPart.slice(slashIdx + 1).split('?')[0] : '';

    const lastColon = hostPort.lastIndexOf(':');
    const host = lastColon !== -1 ? hostPort.slice(0, lastColon) : hostPort;
    const port = lastColon !== -1 ? Number(hostPort.slice(lastColon + 1)) : 3306;

    return {
      host: decodeURIComponent(host),
      port: isNaN(port) ? 3306 : port,
      database: decodeURIComponent(database),
      user: decodeURIComponent(user),
      // Try decoding; if it fails (not percent-encoded), use raw value
      password: (() => { try { return decodeURIComponent(password); } catch { return password; } })(),
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
