/**
 * POST /api/auth/register
 * Creates a new user account with role='user'.
 * Password is hashed with bcrypt (cost 12) before storage.
 */

import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

interface ExistingUser extends RowDataPacket {
  id: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      fullName?: string;
      email?: string;
      password?: string;
    };

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    // ── Input validation ──────────────────────────────────────────────────────
    if (!fullName) {
      return Response.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return Response.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // ── Duplicate email check ─────────────────────────────────────────────────
    const existing = await query<ExistingUser[]>(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      return Response.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // ── Hash password ─────────────────────────────────────────────────────────
    const passwordHash = await bcrypt.hash(password, 12);

    // ── Insert user ───────────────────────────────────────────────────────────
    await query(
      `INSERT INTO users (full_name, email, password_hash, role, status, is_verified, created_at)
       VALUES (?, ?, ?, 'user', 'active', 0, NOW())`,
      [fullName, email, passwordHash]
    );

    return Response.json(
      {
        success: true,
        message: "Account created successfully! You can now sign in.",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[/api/auth/register] Error:", err);
    return Response.json(
      {
        success: false,
        message: "A server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
