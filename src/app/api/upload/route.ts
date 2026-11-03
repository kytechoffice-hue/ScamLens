/**
 * POST /api/upload
 * Handles file uploads and saves files to /public/uploads/
 */

import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // Limit to 15MB
    if (file.size > 15 * 1024 * 1024) {
      return Response.json({ success: false, message: 'File size exceeds 15MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Sanitize filename and create unique stored name
    const ext = path.extname(file.name) || '';
    const rawBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_\-\.]/g, '_');
    const storedName = `${Date.now()}_${rawBase}${ext}`;
    const filePath = path.join(uploadsDir, storedName);

    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${storedName}`;
    const fileSizeKb = Math.max(1, Math.round(file.size / 1024));

    return Response.json({
      success: true,
      url: relativeUrl,
      originalName: file.name,
      storedName,
      fileSizeKb,
      mimeType: file.type || 'application/octet-stream',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[POST /api/upload] Error:', message);
    return Response.json({ success: false, message }, { status: 500 });
  }
}

