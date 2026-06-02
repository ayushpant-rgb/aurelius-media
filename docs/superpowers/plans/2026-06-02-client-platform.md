# Client Platform (v1) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Todoist-style internal workspace at `/app` inside the existing aurelius-media Next.js app, where Ayush tracks clients, sectioned task checklists, notes, and file links, with the data shaped so a read-only client portal can be added later.

**Architecture:** A new `(platform)` route group with its own layout (sidebar shell, `noindex`), gated by a per-page/per-route server auth guard that reuses the existing HMAC signed-cookie scheme under a distinct `platform_token` cookie. Data lives in five new tables in the existing Supabase project, read and written server-side via the existing service-role client. Mutations are Next.js route handlers under `/api/platform/...`. Pure logic (token verification, task ordering, due-date classification) is unit-tested with Vitest; UI and DB round-trips are verified by build + manual run.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind v4, Supabase (`@supabase/supabase-js`, service role), Vitest (new dev dependency), the existing dark design system in `globals.css`.

**Spec:** `docs/superpowers/specs/2026-06-02-client-platform-design.md`

## Key decisions locked for this plan
- **Auth gate = per-page + per-route server guard, NOT middleware.** Next.js middleware runs on the Edge runtime, which cannot use Node's `crypto.createHmac` (the primitive the token relies on). Each `(platform)` page server component and each `/api/platform/*` handler calls a guard that verifies the `platform_token` cookie and `redirect()`s / returns 401 before any Supabase read. This matches how `/api/admin/leads` already guards itself.
- **Auth module = new `src/lib/platform/auth.ts`**, reusing the same HMAC primitives as `src/lib/admin-auth.ts` but with `COOKIE_NAME = 'platform_token'`. `admin-auth.ts` is left untouched (lower risk). Single source of truth for both the guard and the route handlers, resolving the reviewer's "one verifier" note.
- **Password:** reuse the existing `ADMIN_PASSWORD` env var for v1 (shared password, distinct cookie). No new env var.
- **Section delete reparents tasks automatically** via `tasks.section_id ... ON DELETE SET NULL`.
- **RLS:** enable Row Level Security with no policies on all five tables. The service-role client bypasses RLS, so the app keeps working, but the public/anon API cannot read these tables. Cheap defense in depth.
- **Open small decisions (from spec §5), settled here:** priority scale = **P1–P4** (`priority` smallint, 1 highest, 4 default); new clients start with **no sections** (blank); notes and files render as **tabs** on the client view.

---

## Chunk 1: Foundations (test setup, schema, auth, login, popup suppression)

### Task 1: Add Vitest for pure-logic unit tests

**Files:**
- Modify: `package.json` (add devDeps + `test` script)
- Create: `vitest.config.ts`

- [ ] **Step 1: Install Vitest as a dev dependency**

Run:
```bash
npm install -D vitest@^2
```
Expected: `vitest` added under devDependencies, no peer-dep errors that block.

- [ ] **Step 2: Add the test script**

In `package.json` `"scripts"`, add after `"lint": "eslint"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Verify the runner works (no tests yet is fine)**

Run: `npm run test`
Expected: Vitest runs and reports "No test files found" (exit 0) or runs 0 tests. Either is acceptable.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest for platform unit tests"
```

---

### Task 2: Database schema + TypeScript types

The SQL is run by hand in the Supabase SQL editor (the repo has no migration tool). The TypeScript types are the app-side contract.

**Files:**
- Create: `docs/superpowers/plans/sql/2026-06-02-client-platform-schema.sql` (the SQL to paste into Supabase)
- Create: `src/lib/platform/types.ts`

- [ ] **Step 1: Write the schema SQL file**

Create `docs/superpowers/plans/sql/2026-06-02-client-platform-schema.sql`:
```sql
-- Client Platform v1 schema. Run in Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  status text not null default 'active' check (status in ('active','archived')),
  created_at timestamptz not null default now()
);

create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  section_id uuid references sections(id) on delete set null,
  title text not null,
  description text,
  completed_at timestamptz,
  in_progress boolean not null default false,
  priority smallint not null default 4 check (priority between 1 and 4),
  due_date date,
  client_visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  label text not null,
  url text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_sections_client on sections(client_id);
create index if not exists idx_tasks_client on tasks(client_id);
create index if not exists idx_tasks_open_due on tasks(due_date) where completed_at is null;
create index if not exists idx_notes_client on notes(client_id);
create index if not exists idx_files_client on files(client_id);

-- Lock out the public/anon API. Service role bypasses RLS, so the app is unaffected.
alter table clients  enable row level security;
alter table sections enable row level security;
alter table tasks    enable row level security;
alter table notes    enable row level security;
alter table files    enable row level security;
```

- [ ] **Step 2: Run the SQL in Supabase**

Paste the file contents into the Supabase project's SQL editor and run. Expected: five tables created, no errors. (This is a manual step; note it as done once executed.)

- [ ] **Step 3: Write the TypeScript types**

Create `src/lib/platform/types.ts`:
```ts
export type ClientStatus = 'active' | 'archived';

export interface Client {
  id: string;
  name: string;
  company: string | null;
  status: ClientStatus;
  created_at: string;
}

export interface Section {
  id: string;
  client_id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export type Priority = 1 | 2 | 3 | 4;

export interface Task {
  id: string;
  client_id: string;
  section_id: string | null;
  title: string;
  description: string | null;
  completed_at: string | null;
  in_progress: boolean;
  priority: Priority;
  due_date: string | null; // 'YYYY-MM-DD'
  client_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  client_id: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface FileLink {
  id: string;
  client_id: string;
  label: string;
  url: string;
  created_at: string;
}

/** A client plus its count of open (incomplete) tasks, for the sidebar. */
export interface ClientWithOpenCount extends Client {
  open_count: number;
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no new type errors from `types.ts`.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/plans/sql/2026-06-02-client-platform-schema.sql src/lib/platform/types.ts
git commit -m "feat(platform): add db schema sql and typescript types"
```

---

### Task 3: Platform auth module (TDD) + server guard

**Files:**
- Create: `src/lib/platform/auth.ts`
- Test: `src/lib/platform/auth.test.ts`

Mirror `src/lib/admin-auth.ts` exactly, changing only the cookie name. The signing key is `SUPABASE_SERVICE_ROLE_KEY` (same as admin-auth). Token format: `"<timestampMs>.<hmacHex>"`, 24h max age.

- [ ] **Step 1: Write the failing test**

Create `src/lib/platform/auth.test.ts`:
```ts
import { describe, it, expect, beforeAll } from 'vitest';
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
    const { createHmac } = require('crypto');
    const hmac = createHmac('sha256', 'test-signing-key').update(old).digest('hex');
    expect(verifyPlatformToken(`${old}.${hmac}`)).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

Run: `npx vitest run src/lib/platform/auth.test.ts`
Expected: FAIL (module/exports not found).

- [ ] **Step 3: Implement `src/lib/platform/auth.ts`**

```ts
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
```

- [ ] **Step 4: Run the test, verify it passes**

Run: `npx vitest run src/lib/platform/auth.test.ts`
Expected: PASS (4 tests). The `cookies()`-based functions are not exercised here (they need a request context); they are covered by manual run in Task 4.

- [ ] **Step 5: Create the server guard helper**

Create `src/lib/platform/guard.ts`:
```ts
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
```

- [ ] **Step 6: Type-check and commit**

Run: `npx tsc --noEmit` (expected: clean)
```bash
git add src/lib/platform/auth.ts src/lib/platform/auth.test.ts src/lib/platform/guard.ts
git commit -m "feat(platform): add platform auth (platform_token) with unit tests and server guard"
```

---

### Task 4: Login API route + login page

**Files:**
- Create: `src/app/api/platform/verify/route.ts`
- Create: `src/app/(platform)/app/login/page.tsx`

The login page is a small client component mirroring the password form in `src/app/admin/leads/AdminDashboard.tsx` (`handleLogin` posts the password, on success redirects). Reuses theme classes from `globals.css`.

- [ ] **Step 1: Create the verify route**

Create `src/app/api/platform/verify/route.ts` (mirrors `src/app/api/admin/verify/route.ts`):
```ts
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
```

- [ ] **Step 2: Create the login page**

Create `src/app/(platform)/app/login/page.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlatformLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/platform/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/app');
      router.refresh();
    } else {
      setError('Invalid password');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-brand-card border border-brand-border-subtle rounded-[20px] p-8"
      >
        <h1 className="font-display text-2xl font-extrabold mb-6">Aurelius Platform</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full bg-brand-input border border-brand-border rounded-[12px] px-4 py-3 text-white mb-3 outline-none focus:border-brand-accent"
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <button type="submit" disabled={loading} className="cta-primary w-full">
          {loading ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds; `/app/login` appears in the route list. (Full manual login is verified at the end of Chunk 2 once the gated `/app` page exists.)

- [ ] **Step 4: Commit**

```bash
git add src/app/api/platform/verify/route.ts "src/app/(platform)/app/login/page.tsx"
git commit -m "feat(platform): add login route and login page"
```

---

### Task 5: Suppress the lead popup on `/app`

**Files:**
- Modify: `src/components/LeadPopup.tsx:53`

- [ ] **Step 1: Add `/app` to the suppression check**

In `src/components/LeadPopup.tsx`, change the early-return guard:
```tsx
// before
if (pathname === '/contact' || pathname.startsWith('/admin')) return;
// after
if (pathname === '/contact' || pathname.startsWith('/admin') || pathname.startsWith('/app')) return;
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/LeadPopup.tsx
git commit -m "fix(platform): suppress lead popup on /app routes"
```

---

## Chunk 2: Shell, data layer, Today & Upcoming

### Task 6: Pure helpers — task ordering + due-date classification (TDD)

**Files:**
- Create: `src/lib/platform/ordering.ts`
- Test: `src/lib/platform/ordering.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/platform/ordering.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { compareTasks, classifyDue } from './ordering';
import type { Task } from './types';

function t(partial: Partial<Task>): Task {
  return {
    id: 'x', client_id: 'c', section_id: null, title: 't', description: null,
    completed_at: null, in_progress: false, priority: 4, due_date: null,
    client_visible: false, created_at: '', updated_at: '', ...partial,
  };
}

describe('compareTasks', () => {
  it('puts open tasks before done tasks', () => {
    const open = t({ completed_at: null });
    const done = t({ completed_at: '2026-06-01T00:00:00Z' });
    expect(compareTasks(open, done)).toBeLessThan(0);
  });
  it('orders by priority ascending (P1 before P4) among open tasks', () => {
    expect(compareTasks(t({ priority: 1 }), t({ priority: 4 }))).toBeLessThan(0);
  });
  it('orders by due_date ascending when priority ties, nulls last', () => {
    expect(compareTasks(t({ due_date: '2026-06-10' }), t({ due_date: '2026-06-20' }))).toBeLessThan(0);
    expect(compareTasks(t({ due_date: '2026-06-10' }), t({ due_date: null }))).toBeLessThan(0);
  });
});

describe('classifyDue', () => {
  const today = '2026-06-02';
  it('flags a past due_date as overdue', () => {
    expect(classifyDue('2026-06-01', today)).toBe('overdue');
  });
  it('flags today as today', () => {
    expect(classifyDue('2026-06-02', today)).toBe('today');
  });
  it('flags a future date as upcoming', () => {
    expect(classifyDue('2026-06-03', today)).toBe('upcoming');
  });
  it('returns none for no due date', () => {
    expect(classifyDue(null, today)).toBe('none');
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `npx vitest run src/lib/platform/ordering.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/lib/platform/ordering.ts`**

```ts
import type { Task } from './types';

export type DueClass = 'overdue' | 'today' | 'upcoming' | 'none';

/** Classify a 'YYYY-MM-DD' due date relative to a 'YYYY-MM-DD' today. */
export function classifyDue(dueDate: string | null, today: string): DueClass {
  if (!dueDate) return 'none';
  if (dueDate < today) return 'overdue';
  if (dueDate === today) return 'today';
  return 'upcoming';
}

/** Default ordering: open before done, then priority asc, then due_date asc (nulls last). */
export function compareTasks(a: Task, b: Task): number {
  const aDone = a.completed_at ? 1 : 0;
  const bDone = b.completed_at ? 1 : 0;
  if (aDone !== bDone) return aDone - bDone;
  if (a.priority !== b.priority) return a.priority - b.priority;
  if (a.due_date && b.due_date) return a.due_date < b.due_date ? -1 : a.due_date > b.due_date ? 1 : 0;
  if (a.due_date && !b.due_date) return -1;
  if (!a.due_date && b.due_date) return 1;
  return 0;
}
```

Note: lexicographic comparison of `YYYY-MM-DD` strings is chronologically correct, so no Date parsing is needed (avoids timezone bugs). "Today" must be computed once server-side as a `YYYY-MM-DD` string (see Task 7).

- [ ] **Step 4: Run, verify pass**

Run: `npx vitest run src/lib/platform/ordering.test.ts`
Expected: PASS (all cases).

- [ ] **Step 5: Commit**

```bash
git add src/lib/platform/ordering.ts src/lib/platform/ordering.test.ts
git commit -m "feat(platform): add task ordering and due-date classification with tests"
```

---

### Task 7: Data access layer

All Supabase reads live here so pages stay thin. Server-only module (uses the service-role client).

**Files:**
- Create: `src/lib/platform/data.ts`

- [ ] **Step 1: Implement the data functions**

Create `src/lib/platform/data.ts`:
```ts
import { supabase } from '@/lib/supabase';
import type { Client, ClientWithOpenCount, Section, Task, Note, FileLink } from './types';

/** Today as 'YYYY-MM-DD' in the app's timezone (Asia/Kolkata for this agency). */
export function todayStr(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
}

export async function getActiveClientsWithCounts(): Promise<ClientWithOpenCount[]> {
  const { data: clients, error } = await supabase
    .from('clients').select('*').eq('status', 'active').order('name');
  if (error) throw error;
  const { data: openTasks, error: tErr } = await supabase
    .from('tasks').select('client_id').is('completed_at', null);
  if (tErr) throw tErr;
  const counts = new Map<string, number>();
  for (const row of openTasks ?? []) counts.set(row.client_id, (counts.get(row.client_id) ?? 0) + 1);
  return (clients ?? []).map((c) => ({ ...(c as Client), open_count: counts.get(c.id) ?? 0 }));
}

export async function getArchivedClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients').select('*').eq('status', 'archived').order('name');
  if (error) throw error;
  return (data ?? []) as Client[];
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data as Client) ?? null;
}

export async function getSections(clientId: string): Promise<Section[]> {
  const { data, error } = await supabase
    .from('sections').select('*').eq('client_id', clientId).order('sort_order');
  if (error) throw error;
  return (data ?? []) as Section[];
}

export async function getTasksForClient(clientId: string): Promise<Task[]> {
  const { data, error } = await supabase.from('tasks').select('*').eq('client_id', clientId);
  if (error) throw error;
  return (data ?? []) as Task[];
}

/** Open tasks across all clients due today or earlier. */
export async function getTodayTasks(today: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks').select('*').is('completed_at', null).not('due_date', 'is', null).lte('due_date', today);
  if (error) throw error;
  return (data ?? []) as Task[];
}

/** Open tasks across all clients due after today. */
export async function getUpcomingTasks(today: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks').select('*').is('completed_at', null).gt('due_date', today).order('due_date');
  if (error) throw error;
  return (data ?? []) as Task[];
}

export async function getNotes(clientId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes').select('*').eq('client_id', clientId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Note[];
}

export async function getFiles(clientId: string): Promise<FileLink[]> {
  const { data, error } = await supabase
    .from('files').select('*').eq('client_id', clientId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as FileLink[];
}

/** A name lookup for labeling cross-client task rows in Today/Upcoming. */
export async function getClientNameMap(): Promise<Map<string, string>> {
  const { data, error } = await supabase.from('clients').select('id,name');
  if (error) throw error;
  return new Map((data ?? []).map((c) => [c.id, c.name]));
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/lib/platform/data.ts
git commit -m "feat(platform): add server-side data access layer"
```

---

### Task 8: Platform layout (shell) + sidebar

**Files:**
- Create: `src/app/(platform)/app/layout.tsx`
- Create: `src/app/(platform)/app/Sidebar.tsx`

The layout is a server component: it sets `noindex` metadata, runs the page guard for everything except `/app/login`, fetches sidebar data, and renders the two-pane shell. Because `/app/login` shares this layout, the guard must NOT redirect on the login route. Simplest robust approach: the layout does NOT guard; each *page* guards (Task 9, 10, 15). The layout only renders the shell + sidebar. The login page renders its own full-screen form and ignores the sidebar by being a sibling route — to keep the login visually clean, the login page uses its own minimal markup and the shared layout simply renders `{children}` plus the sidebar; on the login route the sidebar is harmless but undesirable. To avoid the sidebar on login, place login OUTSIDE this layout: see Step 1.

- [ ] **Step 1: Move login out of the shell**

The shell layout should wrap the app views but not the login. Restructure so the shell layout lives at `src/app/(platform)/app/(shell)/layout.tsx` and the real views (`page.tsx` for Today, `upcoming/`, `clients/[id]/`) live under `(shell)/`, while `login/page.tsx` stays directly under `app/` (no shell). Final structure:
```
src/app/(platform)/app/
  login/page.tsx              # no sidebar (already created in Task 4)
  (shell)/
    layout.tsx                # sidebar shell + noindex
    Sidebar.tsx
    page.tsx                  # Today  -> /app
    upcoming/page.tsx         # /app/upcoming
    clients/[id]/page.tsx     # /app/clients/:id
```
Note: route groups `(shell)` do not add a URL segment, so Today is still `/app`.

- [ ] **Step 2: Create the shell layout**

Create `src/app/(platform)/app/(shell)/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { requirePlatformPage } from '@/lib/platform/guard';
import { getActiveClientsWithCounts, getArchivedClients } from '@/lib/platform/data';
import Sidebar from './Sidebar';

export const metadata: Metadata = {
  title: 'Platform | Aurelius Media',
  robots: { index: false, follow: false },
};

export default async function ShellLayout({ children }: { children: React.ReactNode }) {
  await requirePlatformPage();
  const [clients, archived] = await Promise.all([
    getActiveClientsWithCounts(),
    getArchivedClients(),
  ]);
  return (
    <div className="min-h-screen flex bg-brand-dark text-white">
      <Sidebar clients={clients} archived={archived} />
      <main className="flex-1 min-w-0 px-8 py-8 max-w-4xl">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Create the sidebar**

Create `src/app/(platform)/app/(shell)/Sidebar.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Client, ClientWithOpenCount } from '@/lib/platform/types';

export default function Sidebar({
  clients, archived,
}: { clients: ClientWithOpenCount[]; archived: Client[] }) {
  const pathname = usePathname();
  const [showArchived, setShowArchived] = useState(false);
  const linkCls = (active: boolean) =>
    `block px-3 py-2 rounded-[12px] text-sm ${active ? 'bg-brand-nested text-white' : 'text-brand-gray hover:text-white hover:bg-brand-card'}`;

  return (
    <aside className="w-64 shrink-0 border-r border-brand-border-subtle bg-brand-card px-3 py-6 flex flex-col gap-6">
      <div className="px-3 font-display font-extrabold">Aurelius</div>
      <nav className="flex flex-col gap-1">
        <Link href="/app" className={linkCls(pathname === '/app')}>Today</Link>
        <Link href="/app/upcoming" className={linkCls(pathname === '/app/upcoming')}>Upcoming</Link>
      </nav>
      <div className="flex flex-col gap-1">
        <div className="px-3 text-xs uppercase tracking-wider text-brand-gray-dark mb-1">Clients</div>
        {clients.map((c) => (
          <Link key={c.id} href={`/app/clients/${c.id}`} className={linkCls(pathname === `/app/clients/${c.id}`)}>
            <span className="flex justify-between">
              <span className="truncate">{c.name}</span>
              {c.open_count > 0 && <span className="text-brand-gray-dark">{c.open_count}</span>}
            </span>
          </Link>
        ))}
        <NewClientButton />
        {archived.length > 0 && (
          <button onClick={() => setShowArchived((s) => !s)} className="px-3 py-2 text-xs text-brand-gray-dark text-left">
            {showArchived ? 'Hide' : 'Show'} archived ({archived.length})
          </button>
        )}
        {showArchived && archived.map((c) => (
          <Link key={c.id} href={`/app/clients/${c.id}`} className={linkCls(false) + ' opacity-60'}>{c.name}</Link>
        ))}
      </div>
    </aside>
  );
}

function NewClientButton() {
  // Minimal inline create: prompt for a name, POST, refresh.
  async function add() {
    const name = window.prompt('New client name');
    if (!name) return;
    const res = await fetch('/api/platform/clients', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) window.location.reload();
  }
  return (
    <button onClick={add} className="px-3 py-2 rounded-[12px] text-sm text-brand-accent-text hover:bg-brand-card text-left">
      + Add client
    </button>
  );
}
```
Note: `NewClientButton` depends on the clients POST route from Task 11; until then the button errors. That is acceptable within the chunk; it is wired and verified in Chunk 3.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: compiles. `/app`, `/app/upcoming`, `/app/clients/[id]` may not exist yet, so build only requires the layout + login to compile. If Next complains about an empty `(shell)` group with no page, proceed to Task 9 which adds `/app` `page.tsx`, then build.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(platform)/app/(shell)/layout.tsx" "src/app/(platform)/app/(shell)/Sidebar.tsx"
git commit -m "feat(platform): add shell layout and sidebar"
```

---

### Task 9: Today view

**Files:**
- Create: `src/app/(platform)/app/(shell)/page.tsx`
- Create: `src/app/(platform)/app/(shell)/TaskRow.tsx` (shared read-only row for smart views)

- [ ] **Step 1: Create a shared smart-view row**

Create `src/app/(platform)/app/(shell)/TaskRow.tsx`:
```tsx
import Link from 'next/link';
import type { Task } from '@/lib/platform/types';
import { classifyDue } from '@/lib/platform/ordering';

const P_COLORS = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-brand-gray-dark'];

export default function TaskRow({ task, clientName, today }: { task: Task; clientName: string; today: string }) {
  const due = classifyDue(task.due_date, today);
  return (
    <div className="flex items-center gap-3 py-2 border-b border-brand-border-subtle">
      <span className={`text-xs ${P_COLORS[task.priority]}`}>P{task.priority}</span>
      <span className="flex-1 min-w-0 truncate">{task.title}</span>
      {task.in_progress && <span className="text-xs text-brand-accent-text">in progress</span>}
      {task.due_date && (
        <span className={`text-xs ${due === 'overdue' ? 'text-red-400' : 'text-brand-gray-dark'}`}>{task.due_date}</span>
      )}
      <Link href={`/app/clients/${task.client_id}`} className="text-xs text-brand-gray-dark hover:text-white">
        {clientName}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Create the Today page**

Create `src/app/(platform)/app/(shell)/page.tsx`:
```tsx
import { requirePlatformPage } from '@/lib/platform/guard';
import { getTodayTasks, getClientNameMap, todayStr } from '@/lib/platform/data';
import { compareTasks } from '@/lib/platform/ordering';
import TaskRow from './TaskRow';

export default async function TodayPage() {
  await requirePlatformPage();
  const today = todayStr();
  const [tasks, names] = await Promise.all([getTodayTasks(today), getClientNameMap()]);
  const sorted = [...tasks].sort(compareTasks);
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold mb-6">Today</h1>
      {sorted.length === 0 && <p className="text-brand-gray">Nothing due today. Clear desk.</p>}
      {sorted.map((t) => (
        <TaskRow key={t.id} task={t} clientName={names.get(t.client_id) ?? ''} today={today} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds; `/app` route present.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(platform)/app/(shell)/page.tsx" "src/app/(platform)/app/(shell)/TaskRow.tsx"
git commit -m "feat(platform): add Today view"
```

---

### Task 10: Upcoming view

**Files:**
- Create: `src/app/(platform)/app/(shell)/upcoming/page.tsx`

- [ ] **Step 1: Create the Upcoming page (grouped by date)**

Create `src/app/(platform)/app/(shell)/upcoming/page.tsx`:
```tsx
import { requirePlatformPage } from '@/lib/platform/guard';
import { getUpcomingTasks, getClientNameMap, todayStr } from '@/lib/platform/data';
import { compareTasks } from '@/lib/platform/ordering';
import TaskRow from '../TaskRow';

export default async function UpcomingPage() {
  await requirePlatformPage();
  const today = todayStr();
  const [tasks, names] = await Promise.all([getUpcomingTasks(today), getClientNameMap()]);
  const byDate = new Map<string, typeof tasks>();
  for (const t of tasks) {
    const key = t.due_date as string;
    (byDate.get(key) ?? byDate.set(key, []).get(key)!).push(t);
  }
  const dates = [...byDate.keys()].sort();
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold mb-6">Upcoming</h1>
      {dates.length === 0 && <p className="text-brand-gray">Nothing scheduled ahead.</p>}
      {dates.map((d) => (
        <section key={d} className="mb-6">
          <h2 className="text-sm text-brand-gray-dark mb-2">{d}</h2>
          {byDate.get(d)!.sort(compareTasks).map((t) => (
            <TaskRow key={t.id} task={t} clientName={names.get(t.client_id) ?? ''} today={today} />
          ))}
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds; `/app/upcoming` present.

- [ ] **Step 3: Manual verification of auth + smart views**

Run: `npm run dev`, then:
1. Visit `http://localhost:3000/app` while logged out → expect redirect to `/app/login`.
2. Submit the correct `ADMIN_PASSWORD` → expect to land on Today.
3. Confirm `document.cookie` shows `platform_token` (httpOnly, so check via devtools Application tab).
4. (Optional sanity) Insert a couple of test rows via Supabase, confirm they appear in Today/Upcoming with the right client label and overdue flagging.
Expected: all pass. Note any failure as a blocker before Chunk 3.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(platform)/app/(shell)/upcoming/page.tsx"
git commit -m "feat(platform): add Upcoming view"
```

---

## Chunk 3: Client view + mutations

### Task 11: Clients API (create, rename, archive)

**Files:**
- Create: `src/app/api/platform/clients/route.ts`

- [ ] **Step 1: Implement the route**

Create `src/app/api/platform/clients/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { name, company } = await request.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('clients').insert({ name, company: company ?? null }).select().single();
    if (error) { console.error('client create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ client: data });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id, name, company, status } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (company !== undefined) updates.company = company;
    if (status !== undefined) {
      if (!['active', 'archived'].includes(status)) {
        return NextResponse.json({ error: 'bad status' }, { status: 400 });
      }
      updates.status = status;
    }
    if (Object.keys(updates).length === 0) return NextResponse.json({ error: 'nothing to update' }, { status: 400 });
    const { error } = await supabase.from('clients').update(updates).eq('id', id);
    if (error) { console.error('client update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Build, then manual check**

Run: `npm run build` (expected: succeeds).
Manual: with the dev server running and logged in, click "+ Add client" in the sidebar, enter a name → expect the client to appear in the sidebar after reload. Logged out, `curl -X POST localhost:3000/api/platform/clients` → expect 401.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/platform/clients/route.ts
git commit -m "feat(platform): clients create/rename/archive API"
```

---

### Task 12: Sections API (create, rename, reorder, delete)

**Files:**
- Create: `src/app/api/platform/sections/route.ts`

Recall: deleting a section sets dependent tasks' `section_id` to NULL automatically via the FK. The DELETE handler just deletes the section row.

- [ ] **Step 1: Implement the route**

Create `src/app/api/platform/sections/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, name, sort_order } = await request.json();
    if (!client_id || !name) return NextResponse.json({ error: 'client_id and name required' }, { status: 400 });
    const { data, error } = await supabase
      .from('sections').insert({ client_id, name, sort_order: sort_order ?? 0 }).select().single();
    if (error) { console.error('section create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ section: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id, name, sort_order } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (sort_order !== undefined) updates.sort_order = sort_order;
    if (Object.keys(updates).length === 0) return NextResponse.json({ error: 'nothing to update' }, { status: 400 });
    const { error } = await supabase.from('sections').update(updates).eq('id', id);
    if (error) { console.error('section update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('sections').delete().eq('id', id);
    if (error) { console.error('section delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
```

- [ ] **Step 2: Build + manual**

Run: `npm run build` (expected: succeeds). Manual section CRUD is verified via the client view in Task 15.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/platform/sections/route.ts
git commit -m "feat(platform): sections create/rename/reorder/delete API"
```

---

### Task 13: Tasks API (create, edit, complete, toggles)

**Files:**
- Create: `src/app/api/platform/tasks/route.ts`

- [ ] **Step 1: Implement the route**

Create `src/app/api/platform/tasks/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, title, section_id, due_date, priority } = await request.json();
    if (!client_id || !title) return NextResponse.json({ error: 'client_id and title required' }, { status: 400 });
    const { data, error } = await supabase.from('tasks').insert({
      client_id, title,
      section_id: section_id ?? null,
      due_date: due_date ?? null,
      priority: priority ?? 4,
    }).select().single();
    if (error) { console.error('task create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ task: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    // Completion via checkbox: client sends `done: true|false`.
    if (body.done !== undefined) {
      updates.completed_at = body.done ? new Date().toISOString() : null;
      if (body.done) updates.in_progress = false; // done tasks are not "in progress"
    }
    for (const f of ['title', 'description', 'section_id', 'due_date', 'priority', 'in_progress', 'client_visible'] as const) {
      if (body[f] !== undefined) updates[f] = body[f];
    }
    if (body.priority !== undefined && ![1, 2, 3, 4].includes(body.priority)) {
      return NextResponse.json({ error: 'bad priority' }, { status: 400 });
    }
    const { error } = await supabase.from('tasks').update(updates).eq('id', id);
    if (error) { console.error('task update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) { console.error('task delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/platform/tasks/route.ts
git commit -m "feat(platform): tasks create/edit/complete/toggle API"
```

---

### Task 14: Notes API + Files API

**Files:**
- Create: `src/app/api/platform/notes/route.ts`
- Create: `src/app/api/platform/files/route.ts`

- [ ] **Step 1: Implement notes route**

Create `src/app/api/platform/notes/route.ts` (POST create, PATCH edit body, DELETE):
```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, body } = await request.json();
    if (!client_id || !body) return NextResponse.json({ error: 'client_id and body required' }, { status: 400 });
    const { data, error } = await supabase.from('notes').insert({ client_id, body }).select().single();
    if (error) { console.error('note create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ note: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id, body } = await request.json();
    if (!id || body === undefined) return NextResponse.json({ error: 'id and body required' }, { status: 400 });
    const { error } = await supabase.from('notes').update({ body, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) { console.error('note update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) { console.error('note delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
```

- [ ] **Step 2: Implement files route**

Create `src/app/api/platform/files/route.ts` (POST create, DELETE). Validate `url` starts with `http`:
```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, label, url } = await request.json();
    if (!client_id || !label || !url) return NextResponse.json({ error: 'client_id, label, url required' }, { status: 400 });
    if (!/^https?:\/\//.test(url)) return NextResponse.json({ error: 'url must start with http(s)://' }, { status: 400 });
    const { data, error } = await supabase.from('files').insert({ client_id, label, url }).select().single();
    if (error) { console.error('file create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ file: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('files').delete().eq('id', id);
    if (error) { console.error('file delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
```

- [ ] **Step 3: Build + commit**

Run: `npm run build` (expected: succeeds).
```bash
git add src/app/api/platform/notes/route.ts src/app/api/platform/files/route.ts
git commit -m "feat(platform): notes and files APIs"
```

---

### Task 15: Client view (sectioned checklist + notes/files tabs)

This is the largest UI task. The page server-fetches client + sections + tasks + notes + files and renders a client component that handles all interactions (checkbox complete, quick-add, toggles, section management, tab switching). Interactions call the APIs and `router.refresh()` to re-pull server data.

**Files:**
- Create: `src/app/(platform)/app/(shell)/clients/[id]/page.tsx` (server)
- Create: `src/app/(platform)/app/(shell)/clients/[id]/ClientView.tsx` (client)

- [ ] **Step 1: Create the server page**

Create `src/app/(platform)/app/(shell)/clients/[id]/page.tsx`:
```tsx
import { notFound } from 'next/navigation';
import { requirePlatformPage } from '@/lib/platform/guard';
import { getClient, getSections, getTasksForClient, getNotes, getFiles, todayStr } from '@/lib/platform/data';
import ClientView from './ClientView';

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePlatformPage();
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  const [sections, tasks, notes, files] = await Promise.all([
    getSections(id), getTasksForClient(id), getNotes(id), getFiles(id),
  ]);
  return (
    <ClientView
      client={client} sections={sections} tasks={tasks} notes={notes} files={files} today={todayStr()}
    />
  );
}
```

- [ ] **Step 2: Create the client component**

Create `src/app/(platform)/app/(shell)/clients/[id]/ClientView.tsx`. It must:
- Group tasks: ungrouped first (`section_id === null`) under a "No section" heading, then each section in `sort_order`. Within each group, sort by `compareTasks`; collapse completed under a "show completed" toggle.
- Each task row: a checkbox that PATCHes `{ id, done }`; the title; a priority selector (P1–P4) that PATCHes `priority`; a due-date `<input type="date">` that PATCHes `due_date`; an "in progress" toggle (PATCH `in_progress`, hidden once done); a "client visible" toggle (PATCH `client_visible`).
- A quick-add row per group: title input + optional date + priority, POSTs to `/api/platform/tasks` with the group's `section_id`.
- Section management: "+ Add section" (POST), rename (PATCH), reorder via up/down buttons that swap `sort_order` (PATCH), delete (DELETE, with a confirm noting tasks become ungrouped).
- Header: client name (rename via PATCH) and an Archive button (PATCH `status:'archived'`, then `router.push('/app')`).
- Tabs: Tasks | Notes | Files. Notes tab lists notes (newest first) with add/edit/delete. Files tab lists label+url links with add/delete.
- After every successful mutation, call `router.refresh()` to re-pull server data. Use the theme classes (`bg-brand-card`, `rounded-[20px]`, `cta-primary`, `btn-ghost`, `text-brand-accent-text`).

Reference implementation (abbreviated but complete enough to follow; the engineer fills the tab bodies using the same fetch+refresh pattern):
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Client, Section, Task, Note, FileLink } from '@/lib/platform/types';
import { compareTasks } from '@/lib/platform/ordering';

type Tab = 'tasks' | 'notes' | 'files';

async function api(path: string, method: string, body: unknown) {
  const res = await fetch(path, {
    method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  return res.ok;
}

export default function ClientView(props: {
  client: Client; sections: Section[]; tasks: Task[]; notes: Note[]; files: FileLink[]; today: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('tasks');
  const refresh = () => router.refresh();

  async function toggleDone(t: Task) {
    if (await api('/api/platform/tasks', 'PATCH', { id: t.id, done: !t.completed_at })) refresh();
  }
  async function patchTask(id: string, patch: Record<string, unknown>) {
    if (await api('/api/platform/tasks', 'PATCH', { id, ...patch })) refresh();
  }
  async function addTask(sectionId: string | null, title: string) {
    if (!title.trim()) return;
    if (await api('/api/platform/tasks', 'POST', { client_id: props.client.id, section_id: sectionId, title })) refresh();
  }

  const groups: { id: string | null; name: string; tasks: Task[] }[] = [
    { id: null, name: 'No section', tasks: props.tasks.filter((t) => !t.section_id) },
    ...props.sections.map((s) => ({ id: s.id, name: s.name, tasks: props.tasks.filter((t) => t.section_id === s.id) })),
  ];

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-extrabold">{props.client.name}</h1>
        <button
          className="btn-ghost text-sm"
          onClick={async () => {
            if (confirm('Archive this client?') &&
                await api('/api/platform/clients', 'PATCH', { id: props.client.id, status: 'archived' })) {
              router.push('/app');
            }
          }}
        >Archive</button>
      </header>

      <nav className="flex gap-2 mb-6">
        {(['tasks', 'notes', 'files'] as Tab[]).map((x) => (
          <button key={x} onClick={() => setTab(x)}
            className={`px-3 py-1 rounded-[12px] text-sm ${tab === x ? 'bg-brand-nested' : 'text-brand-gray'}`}>
            {x[0].toUpperCase() + x.slice(1)}
          </button>
        ))}
      </nav>

      {tab === 'tasks' && (
        <div className="flex flex-col gap-8">
          {groups.map((g) => (
            <TaskGroup key={g.id ?? 'none'} group={g} today={props.today}
              onToggle={toggleDone} onPatch={patchTask} onAdd={(title) => addTask(g.id, title)} />
          ))}
          <AddSection clientId={props.client.id} onDone={refresh} count={props.sections.length} />
        </div>
      )}

      {tab === 'notes' && <NotesTab clientId={props.client.id} notes={props.notes} onDone={refresh} />}
      {tab === 'files' && <FilesTab clientId={props.client.id} files={props.files} onDone={refresh} />}
    </div>
  );
}

// TaskGroup, AddSection, NotesTab, FilesTab: implement with the same `api()` + `onDone/refresh`
// pattern. TaskGroup sorts open tasks with compareTasks, hides completed behind a toggle,
// renders a checkbox (onToggle), priority <select>, due <input type="date"> (onPatch),
// in-progress + client-visible checkboxes (onPatch), and a quick-add input (onAdd).
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds; `/app/clients/[id]` present. Fix any TypeScript errors in the fleshed-out sub-components.

- [ ] **Step 4: Full manual verification (the spec's §8 checklist)**

Run `npm run dev`, log in, then verify:
1. Add a client from the sidebar; it appears with a 0 count.
2. Open the client; add two sections; reorder them; rename one; delete one and confirm its tasks survive as "No section".
3. Add tasks with different priorities and due dates; confirm ordering = priority then due date within each group.
4. Check a task's checkbox; it moves to completed/hidden and the sidebar count drops; uncheck restores it.
5. Toggle "in progress" on an open task; confirm it shows on Today/Upcoming as a read-only indicator; confirm it cannot be set once done (UI hides it).
6. Toggle "client visible"; reload; confirm it persists (defaults off).
7. Set a due date of today and one in the past; confirm they show in Today with the past one flagged overdue; set one in the future; confirm it shows in Upcoming.
8. Add/edit/delete a note; add/delete a file link (reject a non-http URL).
9. Archive the client; confirm it leaves the active sidebar list and lands under "Show archived".
Expected: all pass. Record any failures as blockers.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(platform)/app/(shell)/clients"
git commit -m "feat(platform): client view with sectioned checklist, notes and files tabs"
```

---

### Task 16: Final pass — full test + build gate

**Files:** none (verification only)

- [ ] **Step 1: Run the unit tests**

Run: `npm run test`
Expected: all Vitest suites pass (auth, ordering).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: succeeds with no type errors; `/app`, `/app/login`, `/app/upcoming`, `/app/clients/[id]` all listed; all are dynamic (not statically prerendered) because they read cookies/DB.

- [ ] **Step 3: Confirm the marketing site is untouched**

Spot-check: `/`, `/blog`, `/admin/leads` still build and behave as before (the only shared-file change is the `LeadPopup.tsx` suppression line). Confirm `/admin/leads` login still works (separate `admin_token` cookie).

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "chore(platform): final test + build verification"
```

---

## Done criteria
- Logged-out access to any `/app/*` view redirects to `/app/login`; no client data is sent in that response.
- Logged in, Today and Upcoming aggregate open tasks across clients with correct ordering, overdue flagging, client labels, and in-progress indicators.
- A client view supports sectioned checklists with priority, due dates, in-progress and client-visible toggles, plus notes and file-link tabs; section delete reparents tasks.
- Sidebar counts equal per-client open-task counts; archive moves a client out of the active list.
- `npm run test` and `npm run build` both pass; the marketing site and `/admin` are unaffected.
