import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import bcrypt from 'bcryptjs';

interface ExistingUserRow extends RowDataPacket {
  id: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body as {
      fullName?: string;
      email?: string;
      password?: string;
    };

    // ── Input validation ────────────────────────────────────────────────────
    if (!fullName?.trim()) {
      return Response.json(
        { success: false, message: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return Response.json(
        { success: false, message: 'Please enter your email address.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return Response.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // ── Check for duplicate email ───────────────────────────────────────────
    const existing = await query<ExistingUserRow[]>(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email.trim().toLowerCase()]
    );

    if (existing.length > 0) {
      return Response.json(
        { success: false, message: 'An account with this email already exists. Please log in.' },
        { status: 409 }
      );
    }

    // ── Hash password with bcrypt (12 rounds) ──────────────────────────────
    const passwordHash = await bcrypt.hash(password, 12);

    // ── Generate a username from the email prefix ──────────────────────────
    const baseUsername = email.trim().toLowerCase().split('@')[0].replace(/[^a-z0-9_]/g, '_');
    const username = `${baseUsername}_${Date.now().toString(36)}`;

    // ── Insert new user ────────────────────────────────────────────────────
    const result = await query<ResultSetHeader>(
      `INSERT INTO users (username, email, password_hash, full_name, role, status, is_verified, created_at)
       VALUES (?, ?, ?, ?, 'user', 'active', 0, NOW())`,
      [username, email.trim().toLowerCase(), passwordHash, fullName.trim()]
    );

    // ── Success ─────────────────────────────────────────────────────────────
    return Response.json(
      {
        success: true,
        message: 'Account created successfully! Please log in.',
        user: {
          id: result.insertId,
          username,
          email: email.trim().toLowerCase(),
          fullName: fullName.trim(),
        },
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[/api/auth/register] Error:', message);

    if (process.env.NODE_ENV !== 'production') {
      return Response.json(
        { success: false, message, debug: true },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: false,
        message: 'A server error occurred while creating your account. Please try again later.',
        errorHint: message.slice(0, 120),
      },
      { status: 500 }
    );
  }
}
