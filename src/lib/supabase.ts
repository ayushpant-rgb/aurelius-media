import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error(
    'Missing Supabase environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)'
  );
}

// Fail fast when the database is slow or unreachable, so the lead routes can
// fall back to email instead of hanging until the function times out.
const DB_TIMEOUT_MS = 5000;

export const supabase = createClient(url, key, {
  global: {
    fetch: (input, init) => fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(DB_TIMEOUT_MS) }),
  },
});
