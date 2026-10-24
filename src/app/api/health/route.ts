/**
 * GET  /api/health       — DB connectivity check
 * POST /api/health       — Dev-only: look up a user by email (no password returned)
 */

import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  const start = Date.now();

  try {
    const pool = getPool();
    const conn = await pool.getConnection();

    // Run a lightweight ping query
    const [rows] = await conn.execute<{ now: string }[]>("SELECT NOW() AS now");
    conn.release();

    const dbTime = (rows as { now: string }[])[0]?.now ?? null;
    const latencyMs = Date.now() - start;

    return NextResponse.json({
      status: "ok",
      database: "connected",
      dbServerTime: dbTime,
      latencyMs,
      host: process.env.DB_HOST ?? "82.25.121.84",
      database_name: process.env.DB_NAME ?? "u589795535_ScamLens",
    });
  } catch (error: unknown) {
    const latencyMs = Date.now() - start;
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: message,
        latencyMs,
        host: process.env.DB_HOST ?? "82.25.121.84",
      },
      { status: 503 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/health  — Dev-only user lookup (never returns password_hash)
// ---------------------------------------------------------------------------
interface UserRow extends RowDataPacket {
  id: number;
  username: string | null;
  email: string;
  full_name: string | null;
  role: string;
  status: string;
  is_verified: number;
  created_at: string;
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production." }, { status: 403 });
  }

  try {
    const { email } = await request.json() as { email?: string };

    if (!email?.trim()) {
      return NextResponse.json({ error: "Provide an email in the request body." }, { status: 400 });
    }

    const pool = getPool();
    const [rows] = await pool.execute<UserRow[]>(
      `SELECT id, username, email, full_name, role, status, is_verified, created_at
       FROM users WHERE email = ? LIMIT 1`,
      [email.trim()]
    );

    if (rows.length === 0) {
      return NextResponse.json({ found: false, email }, { status: 404 });
    }

    const u = rows[0];
    return NextResponse.json({
      found: true,
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.full_name,
      role: u.role,
      status: u.status,
      isVerified: Boolean(u.is_verified),
      createdAt: u.created_at,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
