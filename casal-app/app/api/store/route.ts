import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

// Ensure data directory and default file exist
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const defaultData = {
      anamnesisRecord: null,
      moodLogs: [],
      dailyAnswers: [],
      activeUserId: 'user-marley'
    };
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error reading server store' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureDataFile();
    const body = await req.json();

    // Read existing file to merge or overwrite
    let existing: any = {};
    try {
      const content = await fs.readFile(DATA_FILE, 'utf-8');
      existing = JSON.parse(content);
    } catch {}

    const updatedData = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString()
    };

    await fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error writing to server store' }, { status: 500 });
  }
}
