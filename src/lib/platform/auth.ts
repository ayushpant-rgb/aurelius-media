import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'platform_token';
const MAX_AGE = 60 * 60 * 24; // 24h in seconds

function getSigningKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  return key;
}

export function generatePlatformToken(): string {
  const timestamp = Date.now().toString();
  const hmac = createHmac('sha256', getSigningKey()).update(timestamp).digest('hex');
  return `${timestamp}.${hmac}`;
}

export function verifyPlatformToken(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [timestamp, providedHmac] = parts;
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age > MAX_AGE * 1000) return false;
  const expectedHmac = createHmac('sha256', getSigningKey()).update(timestamp).digest('hex');
  return providedHmac === expectedHmac;
}

export async function setPlatformCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, generatePlatformToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });
}

export async function isPlatformAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyPlatformToken(token);
}
