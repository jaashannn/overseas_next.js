import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req: Request) {
  const token = req.headers.get('authorization');
  
  if (!token || token !== 'Bearer your-secret-token') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  // Updated file path to point to assets/toolkit.zip
  const filePath = path.join(process.cwd(), 'assets', 'toolkit.zip');
  console.log('Attempting to access file at:', filePath);

  try {
    await fs.access(filePath); // Check if file exists
    console.log('File found, reading...');
    const fileBuffer = await fs.readFile(filePath);
    console.log('File read successfully, size:', fileBuffer.length);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename=toolkit.zip',
        'Content-Type': 'application/zip',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error: unknown) {
    const fsError = error as NodeJS.ErrnoException;
    console.error('File error details:', {
      message: fsError.message,
      code: fsError.code,
      stack: fsError.stack,
    });

    if (fsError.code === 'ENOENT') {
      return NextResponse.json({ message: `File not found at ${filePath}` }, { status: 404 });
    }
    return NextResponse.json(
      { 
        message: 'Internal server error', 
        error: { message: fsError.message, code: fsError.code } 
      }, 
      { status: 500 }
    );
  }
}