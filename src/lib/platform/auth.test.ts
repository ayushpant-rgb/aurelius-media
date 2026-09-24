import { describe, it, expect, beforeAll } from 'vitest';
import { createHmac } from 'crypto';
import { generatePlatformToken, verifyPlatformToken } from './auth';

beforeAll(() => {
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-signing-key';
});

describe('verifyPlatformToken', () => {
  it('accepts a freshly generated token', () => {
    expect(verifyPlatformToken(generatePlatformToken())).toBe(true);
  });

  it('rejects a tampered token', () => {
    const token = generatePlatformToken();
    const tampered = token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a');
    expect(verifyPlatformToken(tampered)).toBe(false);
  });

  it('rejects a malformed token', () => {
    expect(verifyPlatformToken('garbage')).toBe(false);
    expect(verifyPlatformToken('')).toBe(false);
  });

  it('rejects a token older than 24h', () => {
    const old = (Date.now() - 25 * 60 * 60 * 1000).toString();
    // Re-sign an old timestamp the same way auth.ts does, to prove age is checked.
    const hmac = createHmac('sha256', 'test-signing-key').update(old).digest('hex');
    expect(verifyPlatformToken(`${old}.${hmac}`)).toBe(false);
  });
});
