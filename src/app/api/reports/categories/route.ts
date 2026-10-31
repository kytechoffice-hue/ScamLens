/**
 * GET /api/reports/categories
 * Returns all active scam categories for the report form dropdown.
 */

import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface CategoryRow extends RowDataPacket {
  id: number;
  slug: string;
  label: string;
  sub_label: string;
}

export async function GET() {
  try {
    const rows = await query<CategoryRow[]>(
      `SELECT id, slug, label, sub_label
       FROM scam_categories
       WHERE is_active = 1
       ORDER BY label ASC`
    );

    return Response.json({ success: true, categories: rows });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[GET /api/reports/categories] Error:', message);
    return Response.json({ success: false, message }, { status: 500 });
  }
}

