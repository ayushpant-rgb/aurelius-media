import { NextRequest, NextResponse } from 'next/server';
import { setPlatformCookie } from '@/lib/platform/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    await setPlatformCookie();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
