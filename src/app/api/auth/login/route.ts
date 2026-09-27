import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

interface UserRow extends RowDataPacket {
  id: number;
  username: string | null;
  email: string;
  password_hash: string;
  full_name: string | null;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  is_verified: number;
}

/**
 * Verify a password against its stored hash.
 * Primary  : bcrypt ($2b$ / $2y$ PHP hashes) via bcryptjs
 * Fallback 1: SHA-256 hex (legacy seeds)
 * Fallback 2: plain-text (dev-only, remove in production)
 */
async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  // bcrypt — handles both $2b$ and $2y$ prefixes
  if (hash.startsWith('$2')) {
    return bcrypt.compare(plaintext, hash);
  }

  // SHA-256 comparison
  const sha256 = crypto.createHash('sha256').update(plaintext).digest('hex');
  if (sha256 === hash) return true;

  // Plain-text last resort (dev seeds only)
  if (plaintext === hash) return true;

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usernameOrEmail, password } = body as {
      usernameOrEmail?: string;
      password?: string;
    };

    // ── Input validation ────────────────────────────────────────────────────
    if (!usernameOrEmail?.trim()) {
      return Response.json(
        { success: false, message: 'Please enter your username or email.' },
        { status: 400 }
      );
    }
    if (!password) {
      return Response.json(
        { success: false, message: 'Please enter your password.' },
        { status: 400 }
      );
    }

    // ── Look up user by username OR email ───────────────────────────────────
    const rows = await query<UserRow[]>(
      `SELECT id, username, email, password_hash, full_name, role, status, is_verified
       FROM users
       WHERE username = ? OR email = ?
       LIMIT 1`,
      [usernameOrEmail.trim(), usernameOrEmail.trim()]
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, message: 'No account found with that username or email.' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // ── Password verification ───────────────────────────────────────────────
    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      return Response.json(
        { success: false, message: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // ── Account status checks ───────────────────────────────────────────────
    if (user.status === 'suspended') {
      return Response.json(
        {
          success: false,
          message:
            'Your account has been suspended. Please contact support at support@scamlens.com.',
        },
        { status: 403 }
      );
    }

    if (user.status === 'inactive') {
      return Response.json(
        {
          success: false,
          message: 'Your account is inactive. Please contact support to reactivate it.',
        },
        { status: 403 }
      );
    }

    // ── Success ─────────────────────────────────────────────────────────────
    return Response.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        isVerified: Boolean(user.is_verified),
      },
    });
  } catch (err) {
    console.error('[/api/auth/login] Error:', err);
    return Response.json(
      {
        success: false,
        message:
          'A server error occurred while processing your login. Please try again later.',
      },
      { status: 500 }
    );
  }
}
