/**
 * PATCH /api/reports/[id]  — Update status (admin only)
 * DELETE /api/reports/[id] — Delete report + evidence (admin only)
 *
 * Role is passed via X-User-Role header (set by client from localStorage).
 * In production, replace header-based role with a proper JWT/session check.
 */

import { NextRequest } from 'next/server';
import { getPool } from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

const ALLOWED_STATUSES = ['PENDING', 'UNDER_AUDIT', 'VERIFIED_SCAM', 'REJECTED'];

type Params = { params: Promise<{ id: string }> };

// ── Auth guard ────────────────────────────────────────────────────────────────
function isAdmin(request: NextRequest): boolean {
  const role = request.headers.get('X-User-Role');
  return role === 'admin';
}

// ── GET: fetch single report details + evidence (admin only) ───────────────────
export async function GET(request: NextRequest, { params }: Params) {
  if (!isAdmin(request)) {
    return Response.json({ success: false, message: 'Admin access required.' }, { status: 403 });
  }

  const { id } = await params;
  const reportId = Number(id);
  if (!reportId || isNaN(reportId)) {
    return Response.json({ success: false, message: 'Invalid report ID.' }, { status: 400 });
  }

  const pool = getPool();
  try {
    const [reportRows] = await pool.execute<import('mysql2').RowDataPacket[]>(
      `SELECT r.*, c.label AS category, c.sub_label AS category_tag
       FROM scam_reports r
       JOIN scam_categories c ON c.id = r.category_id
       WHERE r.id = ? LIMIT 1`,
      [reportId]
    );

    if (reportRows.length === 0) {
      return Response.json({ success: false, message: 'Report not found.' }, { status: 404 });
    }

    const [evidenceRows] = await pool.execute<import('mysql2').RowDataPacket[]>(
      `SELECT id, file_type, original_name, stored_name, mime_type, file_size_kb, storage_path, uploaded_at
       FROM scam_report_evidence
       WHERE report_id = ?
       ORDER BY uploaded_at ASC`,
      [reportId]
    );

    return Response.json({
      success: true,
      report: reportRows[0],
      evidence: evidenceRows,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[GET /api/reports/${id}] Error:`, message);
    return Response.json({ success: false, message }, { status: 500 });
  }
}

// ── PATCH: change status ──────────────────────────────────────────────────────
export async function PATCH(request: NextRequest, { params }: Params) {
  if (!isAdmin(request)) {
    return Response.json({ success: false, message: 'Admin access required.' }, { status: 403 });
  }

  const { id } = await params;
  const reportId = Number(id);
  if (!reportId || isNaN(reportId)) {
    return Response.json({ success: false, message: 'Invalid report ID.' }, { status: 400 });
  }

  const body = await request.json();
  const newStatus: string = body.status ?? '';

  if (!ALLOWED_STATUSES.includes(newStatus)) {
    return Response.json(
      { success: false, message: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}` },
      { status: 400 }
    );
  }

  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    // Fetch current status for audit log
    const [rows] = await conn.execute<import('mysql2').RowDataPacket[]>(
      'SELECT status, tracking_id FROM scam_reports WHERE id = ? LIMIT 1',
      [reportId]
    );

    if (rows.length === 0) {
      return Response.json({ success: false, message: 'Report not found.' }, { status: 404 });
    }

    const oldStatus = rows[0].status as string;
    const trackingId = rows[0].tracking_id as string;

    await conn.beginTransaction();

    // Update status
    await conn.execute<ResultSetHeader>(
      'UPDATE scam_reports SET status = ? WHERE id = ?',
      [newStatus, reportId]
    );

    // Audit log
    await conn.execute(
      `INSERT INTO scam_report_audit_log (report_id, changed_by, old_status, new_status, note)
       VALUES (?, 'admin', ?, ?, ?)`,
      [reportId, oldStatus, newStatus, `Status changed via admin panel`]
    );

    await conn.commit();

    return Response.json({
      success: true,
      message: `Status updated to ${newStatus}.`,
      trackingId,
      oldStatus,
      newStatus,
    });

  } catch (err) {
    await conn.rollback();
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[PATCH /api/reports/${id}] Error:`, message);
    return Response.json({ success: false, message }, { status: 500 });
  } finally {
    conn.release();
  }
}

// ── DELETE: remove report ─────────────────────────────────────────────────────
export async function DELETE(request: NextRequest, { params }: Params) {
  if (!isAdmin(request)) {
    return Response.json({ success: false, message: 'Admin access required.' }, { status: 403 });
  }

  const { id } = await params;
  const reportId = Number(id);
  if (!reportId || isNaN(reportId)) {
    return Response.json({ success: false, message: 'Invalid report ID.' }, { status: 400 });
  }

  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.execute<import('mysql2').RowDataPacket[]>(
      'SELECT tracking_id FROM scam_reports WHERE id = ? LIMIT 1',
      [reportId]
    );

    if (rows.length === 0) {
      return Response.json({ success: false, message: 'Report not found.' }, { status: 404 });
    }

    const trackingId = rows[0].tracking_id as string;

    await conn.beginTransaction();

    // Child rows deleted automatically via ON DELETE CASCADE (evidence + audit_log)
    await conn.execute<ResultSetHeader>(
      'DELETE FROM scam_reports WHERE id = ?',
      [reportId]
    );

    await conn.commit();

    return Response.json({
      success: true,
      message: `Report ${trackingId} deleted successfully.`,
      trackingId,
    });

  } catch (err) {
    await conn.rollback();
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[DELETE /api/reports/${id}] Error:`, message);
    return Response.json({ success: false, message }, { status: 500 });
  } finally {
    conn.release();
  }
}

