import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Primary data path (local process cwd) and fallback (/tmp for Vercel/serverless)
const PRIMARY_DATA_FILE = path.join(process.cwd(), 'data', 'store.json');
const TMP_DATA_FILE = path.join('/tmp', 'store.json');

const defaultData = {
  anamnesisRecord: null,
  moodLogs: [],
  dailyAnswers: [],
  activeUserId: 'user-marley'
};

// Cloud Upstash / Vercel KV REST helpers (zero external dependencies)
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function readFromCloudKV() {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/family_health_store`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.result) {
      return typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
    }
  } catch (err) {
    console.error('Cloud KV read error:', err);
  }
  return null;
}

async function writeToCloudKV(data: any) {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const res = await fetch(`${KV_URL}/set/family_health_store`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.stringify(data))
    });
    return res.ok;
  } catch (err) {
    console.error('Cloud KV write error:', err);
    return false;
  }
}

async function readLocalData() {
  // 1. Try Cloud KV if configured
  const cloudData = await readFromCloudKV();
  if (cloudData) return cloudData;

  // 2. Try primary local data file
  try {
    const content = await fs.readFile(PRIMARY_DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    // 3. Try fallback /tmp file
    try {
      const content = await fs.readFile(TMP_DATA_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      return defaultData;
    }
  }
}

async function writeLocalData(data: any) {
  // 1. Write to Cloud KV if configured
  await writeToCloudKV(data);

  // 2. Write to primary local file if possible
  try {
    await fs.mkdir(path.dirname(PRIMARY_DATA_FILE), { recursive: true });
    await fs.writeFile(PRIMARY_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // 3. Fallback to /tmp directory on Vercel
    try {
      await fs.mkdir(path.dirname(TMP_DATA_FILE), { recursive: true });
      await fs.writeFile(TMP_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to local /tmp:', err);
    }
  }
}

export async function GET() {
  try {
    const data = await readLocalData();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error reading server store' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existing = await readLocalData();

    const updatedData = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString()
    };

    await writeLocalData(updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error writing to server store' }, { status: 500 });
  }
}
