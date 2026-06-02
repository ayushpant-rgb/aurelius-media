# Client Platform (v1) — Design Spec

**Date:** 2026-06-02
**Status:** Approved design, pending implementation plan
**Owner:** Ayush Pant

## 1. Purpose

A platform for Aurelius Media to track tasks, deadlines, and notes/files for each
client in one place. Built inside the existing aurelius-media Next.js app rather than
as a local or standalone tool, so that client-facing logins can be added later without
a rewrite.

**Primary user (v1):** Ayush, internally. The tool must earn its keep as an internal
workspace first.

**Near-term goal (Phase 2):** a read-only, branded client portal where a client logs in
and sees the progress of their own work. The v1 data model is shaped to welcome this
without rework.

## 2. Scope

### In scope (v1)
- Signed-in internal workspace (single user: Ayush).
- Manage clients (create, edit, archive).
- Per-client tasks with status, due date, and a per-task "client-visible" toggle.
- Per-client freeform notes (timestamped).
- Per-client file references stored as links (label + URL). No uploads.
- A cross-client dashboard surfacing due-soon and overdue work plus active clients.

### Explicitly out of scope (v1, deferred)
- Client logins and the read-only client portal (Phase 2).
- Real file uploads / storage (Phase 3).
- Client approvals or comments / two-way feedback (Phase 3).
- Projects or retainers as a grouping layer above tasks (Phase 3).
- Full calendar UI and kanban drag-and-drop (Phase 3).

The data model anticipates these so they can be added without restructuring.

## 3. Architecture and placement

The platform is a new, isolated section of the existing aurelius-media app. It is not a
separate project or repository.

- **Route group:** new route group at `/app` (e.g. `src/app/(platform)/app/...`) with its
  **own layout**, so it does not inherit the marketing site's header, footer, or SEO.
- **Indexing:** the section is `noindex` (robots index:false, follow:false), matching the
  existing `/admin` convention. The lead-capture popup is suppressed here, as it already is
  on `/admin`.
- **Separation:** kept distinct from `/admin` (which stays leads-only). `/admin` is a poor
  name for URLs a client will eventually touch; `/app` lines up with a future
  `app.aureliusmedia.co`.
- **Future subdomain:** moving from `aureliusmedia.co/app` to `app.aureliusmedia.co` is a
  Vercel rewrite later, not a rebuild. We design for it but do not build it now.
- **Code organization:** routes under the `(platform)` route group; shared logic under
  `src/lib/platform/`. Platform code stays separate from marketing components so the two do
  not entangle and a deploy of one cannot break the other.

### Reuse of existing patterns (important)
The codebase already contains the patterns this needs. v1 is largely assembling them.

- **Auth (v1):** reuse the existing signed-cookie login in `src/lib/admin-auth.ts` — an
  HMAC token cookie, one password, 24h expiry. This is the same mechanism guarding `/admin`
  today. No new auth dependency is introduced.
  - Note: the platform may use a separate cookie name / password from the leads admin so the
    two areas can have independent access, to be decided in the plan. Default assumption:
    reuse the same admin login for v1 simplicity.
- **Database access (v1):** add new tables to the **existing Supabase project**, accessed
  server-side through the existing `src/lib/supabase.ts` service-role client, with scoping
  enforced in app code. This is identical to how `/api/leads` and the leads dashboard work
  today. No row-level security is required for v1 because all access is server-side and
  single-user.

### Client logins (Phase 2 decision, not now)
When client logins are built, there are two viable paths, chosen at that time:
1. Adopt full Supabase Auth + row-level security (the textbook approach for real client
   accounts and multi-tenant data isolation).
2. Issue per-client magic-link tokens reusing the existing HMAC pattern, with scoping in app
   code.

The v1 schema (notably `tasks.client_visible` and the `client_id` foreign keys) supports
either path.

## 4. Data model

Four tables in the existing Supabase (Postgres) project. Field lists are the intended shape;
exact column types and constraints are finalized in the implementation plan.

### `clients`
- `id` (uuid, pk)
- `name` (text) — contact or account name
- `company` (text, nullable)
- `status` (enum-like text: `active` | `paused` | `archived`), default `active`
- `created_at` (timestamptz)

### `tasks`
- `id` (uuid, pk)
- `client_id` (uuid, fk -> clients.id)
- `title` (text)
- `description` (text, nullable)
- `status` (enum-like text: `todo` | `in_progress` | `done`), default `todo`
- `due_date` (date, nullable)
- `client_visible` (boolean, default false) — controls whether this task would appear in the
  future client portal
- `sort_order` (int, nullable) — for manual ordering within a status
- `created_at` (timestamptz)
- `completed_at` (timestamptz, nullable)

### `notes`
- `id` (uuid, pk)
- `client_id` (uuid, fk -> clients.id)
- `body` (text) — freeform, may contain light markdown
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### `files`
- `id` (uuid, pk)
- `client_id` (uuid, fk -> clients.id)
- `label` (text) — human-friendly name
- `url` (text) — link to Drive / Figma / Dropbox / etc.
- `created_at` (timestamptz)

**Future tables (not built in v1):** `projects` (grouping layer above tasks), `client_users`
(maps a portal login to a `client_id`).

## 5. Screens

All under the `/app` route group, behind the signed-cookie login.

### Login
Reuses the existing admin login flow/UI pattern. On success, sets the signed cookie and
redirects into the dashboard.

### Dashboard (`/app`)
The daily driver. Two regions:
- **Due soon / overdue:** tasks across all clients ordered by due date, with overdue clearly
  flagged. Answers "what needs attention today?"
- **Active clients:** a compact list of active clients with their open-task counts, linking
  into each client's detail page.

### Clients list (`/app/clients`)
Every client with status and open-task count. Create a new client. Filter or separate
archived clients from active.

### Client detail (`/app/clients/[id]`)
The workhorse, one client on one page, with three areas:
- **Tasks:** listed grouped by status (`todo` / `in_progress` / `done`). Each task shows
  title, due date, and the `client_visible` toggle. Inline create/edit/complete. v1 uses
  status-grouped lists, not drag-and-drop kanban.
- **Notes:** chronological notes, add/edit.
- **Files:** list of links (label + URL), add/remove.

## 6. Design system

Reuses the existing dark luxury system defined in `globals.css` so the platform feels native
to Aurelius Media, not a generic admin panel:
- Background `--color-brand-dark` (#0B0B0D); surfaces `--color-brand-card` (#131316); nested
  `--color-brand-nested`.
- Orange accent `--color-brand-accent` (#E8550F) / accent-text (#FF7A3D).
- Headers Plus Jakarta Sans 800; body/UI Inter; mono accents JetBrains Mono.
- Card radius `rounded-[20px]`, subtle borders `rgba(255,255,255,0.08)`, existing button
  classes (`.cta-primary`, `.btn-ghost`).

## 7. Error handling and edge cases
- All data writes go through server-side handlers using the service-role client; failures
  surface as explicit user-visible errors, never silent.
- Deleting a client should handle dependent tasks/notes/files (cascade or block with a clear
  message, decided in the plan). Default lean: archive over hard-delete for clients.
- Unauthenticated access to any `/app` route redirects to the login.
- Due-date logic (overdue vs due-soon) uses the app's timezone consistently.

## 8. Testing
- Auth gate: unauthenticated requests to `/app/*` redirect to login; valid cookie passes.
- CRUD round-trips for clients, tasks, notes, files against the Supabase project.
- Dashboard correctly classifies overdue vs due-soon and counts open tasks per client.
- `client_visible` defaults to false and persists correctly (it gates Phase 2, so correctness
  matters early).

## 9. Phasing

- **Phase 1 (build now):** schema + login + clients + client-detail (tasks, notes, file links)
  + cross-client dashboard. A working internal tool.
- **Phase 2 (designed for, built when ready):** client logins + read-only progress portal
  (auth approach decided then; scoping by `client_id`, only `client_visible` tasks shown).
- **Phase 3 (later):** real file uploads, approvals/comments, projects/retainers, full
  calendar, kanban.

## 10. Guiding principle

Build the smallest thing that genuinely helps run client work, prove it, then extend.
Deliberately do not build approvals, uploads, or multi-tenant auth in v1, even though the data
is shaped to welcome them.
