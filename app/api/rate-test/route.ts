import { NextResponse } from 'next/server';

// Simple test endpoint for rate-limit/WAF testing.
// GET /api/rate-test -> { ok: true, ts: <iso> }
export async function GET() {
  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
