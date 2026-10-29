/**
 * GET /api/diagnostics
 * Safe server-side environment diagnostic — shows which vars are SET vs MISSING,
 * never reveals actual values. Use to debug production connection issues.
 */

import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

function mask(value: string | undefined): string {
  if (!value) return "❌ NOT SET";
  if (value.length <= 6) return "✅ SET (****)";
  return `✅ SET (${value.slice(0, 3)}${"*".repeat(value.length - 6)}${value.slice(-3)})`;
}

export async function GET() {
  // ── Environment variable check (values masked) ──────────────────────────
  const envReport = {
    NODE_ENV:                   process.env.NODE_ENV ?? "❌ NOT SET",
    DATABASE_URL:               mask(process.env.DATABASE_URL),
    DB_HOST:                    mask(process.env.DB_HOST),
    DB_PORT:                    process.env.DB_PORT ?? "❌ NOT SET",
    DB_NAME:                    mask(process.env.DB_NAME),
    DB_USER:                    mask(process.env.DB_USER),
    DB_PASSWORD:                mask(process.env.DB_PASSWORD),
    DB_SSL:                     process.env.DB_SSL ?? "❌ NOT SET (defaults to true in prod)",
    SCAMLENS_ENCRYPTION_SECRET: mask(process.env.SCAMLENS_ENCRYPTION_SECRET),
  };

  // ── Database connectivity test ───────────────────────────────────────────
  let dbStatus: "connected" | "failed" = "failed";
  let dbError: string | null = null;
  let dbLatencyMs: number | null = null;
  let dbServerTime: string | null = null;

  try {
    const start = Date.now();
    const pool = getPool();
    const conn = await pool.getConnection();
    const [rows] = await conn.execute<({ now: string } & import('mysql2').RowDataPacket)[]>("SELECT NOW() AS now");
    conn.release();
    dbStatus = "connected";
    dbLatencyMs = Date.now() - start;
    dbServerTime = rows[0]?.now ?? null;
  } catch (err: unknown) {
    dbError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: envReport,
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
      serverTime: dbServerTime,
      error: dbError,
    },
  });
}
