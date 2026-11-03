/**
 * POST /api/reports/[id]/evidence
 * Allows Admin to upload / attach evidence to an existing report.
 */

import { NextRequest } from 'next/server';
import { getPool } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

type Params = { params: Promise<{ id: string }> };

function isAdmin(request: NextRequest): boolean {
  const role = request.headers.get('X-User-Role');
  return role === 'admin';
}

export async function POST(request: NextRequest, { params }: Params) {
  if (!isAdmin(request)) {
    return Response.json({ success: false, message: 'Admin access required.' }, { status: 403 });
  }

  const { id } = await params;
  const reportId = Number(id);
  if (!reportId || isNaN(reportId)) {
    return Response.json({ success: false, message: 'Invalid report ID.' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const fileType = (formData.get('fileType') as string) || 'screenshot';
    const replaceEvidenceId = formData.get('replaceEvidenceId') ? Number(formData.get('replaceEvidenceId')) : null;

    if (!file) {
      return Response.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to /public/uploads/
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(file.name) || '';
    const rawBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_\-\.]/g, '_');
    const storedName = `${Date.now()}_${rawBase}${ext}`;
    const filePath = path.join(uploadsDir, storedName);

    await writeFile(filePath, buffer);

    const storagePath = `/uploads/${storedName}`;
    const fileSizeKb = Math.max(1, Math.round(file.size / 1024));
    const mimeType = file.type || 'application/octet-stream';

    const pool = getPool();

    if (replaceEvidenceId && !isNaN(replaceEvidenceId)) {
      // Update existing record
      await pool.execute<ResultSetHeader>(
        `UPDATE scam_report_evidence
         SET storage_path = ?, original_name = ?, stored_name = ?, mime_type = ?, file_size_kb = ?
         WHERE id = ? AND report_id = ?`,
        [storagePath, file.name, storedName, mimeType, fileSizeKb, replaceEvidenceId, reportId]
      );
    } else {
      // Insert new evidence record
      await pool.execute<ResultSetHeader>(
        `INSERT INTO scam_report_evidence
         (report_id, file_type, original_name, stored_name, mime_type, file_size_kb, storage_path)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [reportId, fileType, file.name, storedName, mimeType, fileSizeKb, storagePath]
      );
    }

    // Return the updated list of evidence for this report
    const [evidenceRows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, file_type, original_name, stored_name, mime_type, file_size_kb, storage_path, uploaded_at
       FROM scam_report_evidence
       WHERE report_id = ?
       ORDER BY uploaded_at ASC`,
      [reportId]
    );

    return Response.json({
      success: true,
      message: 'Evidence file uploaded successfully.',
      evidence: evidenceRows,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[POST /api/reports/${id}/evidence] Error:`, message);
    return Response.json({ success: false, message }, { status: 500 });
  }
}

