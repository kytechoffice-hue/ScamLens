/**
 * GET  /api/reports/test  — DB connectivity + table existence check
 * POST /api/reports/test  — Submits a full dummy report and rolls it back
 *
 * Only available in non-production environments.
 */

import { NextRequest } from 'next/server';
import { getPool } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const IS_PROD = process.env.NODE_ENV === 'production';

// ── GET: health check ─────────────────────────────────────────────────────────

export async function GET() {
  if (IS_PROD) {
    return Response.json({ success: false, message: 'Not available in production.' }, { status: 403 });
  }

  const pool = getPool();
  const results: Record<string, unknown> = {};

  try {
    // 1. Basic connectivity
    const [[ping]] = await pool.execute<RowDataPacket[]>('SELECT 1 AS ping');
    results.connection = ping.ping === 1 ? '✅ Connected' : '❌ Failed';

    // 2. Check tables exist
    const [tables] = await pool.execute<RowDataPacket[]>(
      `SELECT TABLE_NAME
       FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME IN (
           'scam_categories',
           'scam_reports',
           'scam_report_evidence',
           'scam_report_audit_log'
         )`
    );
    const found = (tables as RowDataPacket[]).map((r) => r.TABLE_NAME as string);
    const required = ['scam_categories', 'scam_reports', 'scam_report_evidence', 'scam_report_audit_log'];
    results.tables = Object.fromEntries(
      required.map((t) => [t, found.includes(t) ? '✅ Exists' : '❌ Missing'])
    );

    // 3. Category count
    const [[catCount]] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) AS total FROM scam_categories WHERE is_active = 1'
    );
    results.categories = `${(catCount as RowDataPacket).total} active categories`;

    // 4. Report count
    const [[repCount]] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) AS total FROM scam_reports'
    );
    results.reports = `${(repCount as RowDataPacket).total} total reports`;

    return Response.json({ success: true, checks: results });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[GET /api/reports/test] Error:', message);
    return Response.json({ success: false, message, partialResults: results }, { status: 500 });
  }
}

// ── POST: dry-run insert (rolled back) ───────────────────────────────────────

export async function POST(request: NextRequest) {
  if (IS_PROD) {
    return Response.json({ success: false, message: 'Not available in production.' }, { status: 403 });
  }

  const pool = getPool();
  const conn = await pool.getConnection();
  const log: string[] = [];

  try {
    // Optionally accept custom payload, otherwise use default dummy
    let body: Record<string, unknown> = {};
    try { body = await request.json(); } catch { /* empty body is fine */ }

    await conn.beginTransaction();
    log.push('✅ Transaction started');

    // ── 1. Resolve category ──────────────────────────────────────────────────
    const slug = (body.categorySlug as string) ?? 'phishing';
    const [catRows] = await conn.execute<RowDataPacket[]>(
      'SELECT id, label FROM scam_categories WHERE slug = ? LIMIT 1',
      [slug]
    );
    if (catRows.length === 0) throw new Error(`Category slug '${slug}' not found.`);
    const categoryId = catRows[0].id;
    log.push(`✅ Category resolved: "${catRows[0].label}" (id=${categoryId})`);

    // ── 2. Insert dummy report ───────────────────────────────────────────────
    const trackingId = `TEST-LENS-${Math.floor(10000 + Math.random() * 90000)}`;
    const [ins] = await conn.execute<ResultSetHeader>(
      `INSERT INTO scam_reports (
        tracking_id, status,
        category_id, incident_date, incident_time, platform, description,
        scammer_name, scammer_phone, scammer_email, scammer_url,
        scammer_social_link, scammer_upi_or_account,
        lost_money, amount_lost_inr, payment_method, transaction_id, transaction_date,
        reporter_name, reporter_phone, reporter_email,
        reporter_state, reporter_district, reporter_city,
        reported_to_police, police_complaint_number, consent_agreed
      ) VALUES (
        ?, 'PENDING',
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?
      )`,
      [
        trackingId,
        categoryId,
        '2026-10-01',
        '14:30:00',
        'WhatsApp',
        'TEST: This is a dummy scam report submitted via the test endpoint. It will be rolled back.',

        'Test Scammer',
        '+91 99999 88888',
        'scammer@test.com',
        'https://fake-scam-site.test',
        'https://instagram.com/testscammer',
        'scammer@upi',

        1,
        9999.00,
        'UPI',
        'UTR123456TEST',
        '2026-10-01',

        'Test Reporter',
        '+91 88888 77777',
        'reporter@test.com',
        'Maharashtra',
        'Pune',
        'Pune City',

        1,
        'FIR/TEST/2026',
        1,
      ]
    );
    const reportId = ins.insertId;
    log.push(`✅ Report inserted: tracking_id=${trackingId}, report_id=${reportId}`);

    // ── 3. Insert dummy evidence rows ────────────────────────────────────────
    await conn.query(
      `INSERT INTO scam_report_evidence
         (report_id, file_type, original_name, stored_name, mime_type, file_size_kb, storage_path)
       VALUES ?`,
      [[
        [reportId, 'screenshot',       'test_screenshot.png',  'uuid-test-1.png', 'image/png',        120, 'test/uuid-test-1.png'],
        [reportId, 'payment_receipt',  'test_receipt.pdf',     'uuid-test-2.pdf', 'application/pdf',  85,  'test/uuid-test-2.pdf'],
        [reportId, 'chat_email_record','test_chat.png',        'uuid-test-3.png', 'image/png',        200, 'test/uuid-test-3.png'],
      ]]
    );
    log.push('✅ Evidence rows inserted (3 files)');

    // ── 4. Insert audit log entry ────────────────────────────────────────────
    await conn.execute(
      `INSERT INTO scam_report_audit_log (report_id, changed_by, old_status, new_status, note)
       VALUES (?, 'test-system', NULL, 'PENDING', 'Dry-run test submission')`,
      [reportId]
    );
    log.push('✅ Audit log entry inserted');

    // ── 5. Verify by reading back ────────────────────────────────────────────
    const [readback] = await conn.execute<RowDataPacket[]>(
      `SELECT r.tracking_id, r.status, c.label AS category, r.reporter_name,
              r.amount_lost_inr, r.platform, r.incident_date
       FROM scam_reports r
       JOIN scam_categories c ON c.id = r.category_id
       WHERE r.id = ?`,
      [reportId]
    );
    log.push('✅ Read-back successful');

    const [evidenceReadback] = await conn.execute<RowDataPacket[]>(
      'SELECT file_type, original_name, file_size_kb FROM scam_report_evidence WHERE report_id = ?',
      [reportId]
    );

    // ── 6. ROLLBACK — test only, never persist ───────────────────────────────
    await conn.rollback();
    log.push('🔄 Transaction rolled back — no data persisted (test mode)');

    return Response.json({
      success: true,
      message: 'Dry-run test passed. All steps succeeded; changes were rolled back.',
      log,
      insertedReport:  readback[0],
      insertedEvidence: evidenceReadback,
    });

  } catch (err) {
    await conn.rollback();
    const message = err instanceof Error ? err.message : String(err);
    log.push(`❌ Error: ${message}`);
    console.error('[POST /api/reports/test] Error:', message);
    return Response.json({ success: false, message, log }, { status: 500 });
  } finally {
    conn.release();
  }
}

