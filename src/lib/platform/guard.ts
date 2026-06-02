import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { isPlatformAuthenticated } from './auth';

/** For server components: redirect to login if not authed. Call before any Supabase read. */
export async function requirePlatformPage(): Promise<void> {
  if (!(await isPlatformAuthenticated())) redirect('/app/login');
}

/** For route handlers: return a 401 response if not authed, else null. */
export async function requirePlatformApi(): Promise<NextResponse | null> {
  if (!(await isPlatformAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
