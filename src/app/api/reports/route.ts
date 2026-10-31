/**
 * POST /api/reports
 * Inserts a new scam report (all 6 form sections) into the database.
 * Evidence file metadata is inserted as child rows in scam_report_evidence.
 */

import { NextRequest } from 'next/server';
import { getPool } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CategoryRow extends RowDataPacket {
  id: number;
}

interface EvidenceFile {
  fileType: 'screenshot' | 'payment_receipt' | 'chat_email_record' | 'other';
  originalName: string;
  storedName: string;
  mimeType: string;
  fileSizeKb: number;
  storagePath: string;
}

interface ReportPayload {
  // Step 1 – Scam Information
  categorySlug: string;
  incidentDate: string;
  incidentTime?: string;
  platform: string;
  description: string;

  // Step 2 – Scammer Information
  scammerName?: string;
  scammerPhone?: string;
  scammerEmail?: string;
  scammerUrl?: string;
  scammerSocialLink?: string;
  scammerUpiOrAccount?: string;

  // Step 3 – Financial Loss
  lostMoney: boolean;
  amountLostInr?: number;
  paymentMethod?: string;
  transactionId?: string;
  transactionDate?: string;

  // Step 4 – Evidence files (metadata only – actual files handled separately via upload endpoint)
  evidenceFiles?: EvidenceFile[];

  // Step 5 – Reporter Information
  reporterName: string;
  reporterPhone: string;
  reporterEmail: string;
  reporterState: string;
  reporterDistrict: string;
  reporterCity?: string;

  // Step 6 – Final Confirmation
  reportedToPolice: boolean;
  policeComplaintNumber?: string;
  consentAgreed: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateTrackingId(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `SCAM-LENS-${num}`;
}

function n(val: string | undefined | null): string | null {
  return val?.trim() || null;
}

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    const body: ReportPayload = await request.json();

    // ── Validation ───────────────────────────────────────────────────────────
    const required: [string, unknown][] = [
      ['categorySlug',   body.categorySlug],
      ['incidentDate',   body.incidentDate],
      ['platform',       body.platform],
      ['description',    body.description],
      ['reporterName',   body.reporterName],
      ['reporterPhone',  body.reporterPhone],
      ['reporterEmail',  body.reporterEmail],
      ['reporterState',  body.reporterState],
      ['reporterDistrict', body.reporterDistrict],
    ];

    for (const [field, value] of required) {
      if (!value || String(value).trim() === '') {
        return Response.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!body.consentAgreed) {
      return Response.json(
        { success: false, message: 'Consent must be agreed before submitting.' },
        { status: 400 }
      );
    }

    // ── Resolve category_id from slug ────────────────────────────────────────
    const [catRows] = await conn.execute<CategoryRow[]>(
      'SELECT id FROM scam_categories WHERE slug = ? AND is_active = 1 LIMIT 1',
      [body.categorySlug]
    );

    if (catRows.length === 0) {
      return Response.json(
        { success: false, message: `Unknown category slug: ${body.categorySlug}` },
        { status: 400 }
      );
    }

    const categoryId = catRows[0].id;
    const trackingId = generateTrackingId();

    // ── Begin transaction ────────────────────────────────────────────────────
    await conn.beginTransaction();

    // ── Insert main report ───────────────────────────────────────────────────
    const [result] = await conn.execute<ResultSetHeader>(
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
        body.incidentDate,
        n(body.incidentTime),
        body.platform,
        body.description.trim(),

        n(body.scammerName),
        n(body.scammerPhone),
        n(body.scammerEmail),
        n(body.scammerUrl),
        n(body.scammerSocialLink),
        n(body.scammerUpiOrAccount),

        body.lostMoney ? 1 : 0,
        body.lostMoney && body.amountLostInr ? body.amountLostInr : null,
        body.lostMoney ? n(body.paymentMethod) : null,
        body.lostMoney ? n(body.transactionId) : null,
        body.lostMoney && body.transactionDate ? body.transactionDate : null,

        body.reporterName.trim(),
        body.reporterPhone.trim(),
        body.reporterEmail.trim(),
        body.reporterState.trim(),
        body.reporterDistrict.trim(),
        n(body.reporterCity),

        body.reportedToPolice ? 1 : 0,
        body.reportedToPolice ? n(body.policeComplaintNumber) : null,
        1, // consentAgreed is always true at this point
      ]
    );

    const reportId = result.insertId;

    // ── Insert evidence file metadata (if any) ───────────────────────────────
    const files = body.evidenceFiles ?? [];
    if (files.length > 0) {
      const evidenceValues = files.map((f) => [
        reportId,
        f.fileType,
        f.originalName,
        f.storedName,
        f.mimeType,
        f.fileSizeKb,
        f.storagePath,
      ]);

      await conn.query(
        `INSERT INTO scam_report_evidence
           (report_id, file_type, original_name, stored_name, mime_type, file_size_kb, storage_path)
         VALUES ?`,
        [evidenceValues]
      );
    }

    // ── Initial audit log entry ──────────────────────────────────────────────
    await conn.execute(
      `INSERT INTO scam_report_audit_log (report_id, changed_by, old_status, new_status, note)
       VALUES (?, 'system', NULL, 'PENDING', 'Report submitted by reporter')`,
      [reportId]
    );

    await conn.commit();

    return Response.json(
      {
        success: true,
        message: 'Report submitted successfully.',
        trackingId,
        reportId,
      },
      { status: 201 }
    );

  } catch (err) {
    await conn.rollback();
    const message = err instanceof Error ? err.message : String(err);
    console.error('[POST /api/reports] Error:', message);

    return Response.json(
      {
        success: false,
        message: process.env.NODE_ENV !== 'production'
          ? message
          : 'Failed to submit report. Please try again later.',
      },
      { status: 500 }
    );
  } finally {
    conn.release();
  }
}

// ── GET handler — list reports (basic, for account page) ─────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email    = searchParams.get('email');
    const status   = searchParams.get('status');
    const category = searchParams.get('category');
    const from     = searchParams.get('from');
    const to       = searchParams.get('to');
    const page     = Math.max(1, Number(searchParams.get('page') ?? '1'));
    const limit    = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? '10')));
    const offset   = (page - 1) * limit;

    const conditions: string[] = ['r.consent_agreed = 1'];
    const values: mysql.ExecuteValues = [];

    if (email)    { conditions.push('r.reporter_email = ?');    values.push(email); }
    if (status)   { conditions.push('r.status = ?');            values.push(status); }
    if (category) { conditions.push('c.slug = ?');              values.push(category); }
    if (from)     { conditions.push('r.incident_date >= ?');    values.push(from); }
    if (to)       { conditions.push('r.incident_date <= ?');    values.push(to); }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const pool = getPool();

    const [rows] = await pool.execute(
      `SELECT
         r.id, r.tracking_id, r.status,
         c.label AS category, c.sub_label AS category_tag, c.slug AS category_slug,
         r.platform, r.incident_date,
         r.lost_money, r.amount_lost_inr,
         r.scammer_url, r.scammer_phone,
         r.created_at
       FROM scam_reports r
       JOIN scam_categories c ON c.id = r.category_id
       ${where}
       ORDER BY r.created_at DESC
       LIMIT ${limit} OFFSET ${offset}`,
      values
    );

    const [[countRow]] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) AS total
       FROM scam_reports r
       JOIN scam_categories c ON c.id = r.category_id
       ${where}`,
      values
    );

    return Response.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total: (countRow as RowDataPacket).total,
        totalPages: Math.ceil((countRow as RowDataPacket).total / limit),
      },
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[GET /api/reports] Error:', message);
    return Response.json({ success: false, message }, { status: 500 });
  }
}

