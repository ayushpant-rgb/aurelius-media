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

### Interaction model: Todoist-like
The platform follows a Todoist-style structure: a left sidebar of smart date views plus
clients (which act like Todoist "projects"), and a main pane that is a clean checklist.
Tasks complete with a **checkbox**, not a kanban board. See section 5 for the full layout.

### In scope (v1)
- Signed-in internal workspace (single user: Ayush).
- Manage clients (create, edit, archive). Clients appear in the sidebar like Todoist projects.
- Per-client tasks that complete via **checkbox** (open / done), with:
  - an optional **"in progress"** flag (set while a task is open, to signal active work),
  - a **due date**,
  - a **priority** flag (P1-P4 style),
  - a per-task **"client-visible"** toggle.
- **Sections within a client** to group that client's tasks under headings (e.g. SEO, Ads):
  create, rename, reorder, and delete sections. Deleting a section keeps its tasks (they
  become ungrouped), it never deletes tasks.
- **Today** and **Upcoming** smart views aggregating tasks across all clients by due date.
- Per-client freeform notes (timestamped).
- Per-client file references stored as links (label + URL). No uploads.

### Explicitly out of scope (v1, deferred)
- Client logins and the read-only client portal (Phase 2).
- Sub-tasks / nested checklists (Phase 3).
- Natural-language quick-add date parsing (v1 uses a plain title + date picker) (Phase 3).
- Manual drag-to-reorder of tasks (v1 orders by priority then due date) (Phase 3).
- Labels / tags across clients (Phase 3).
- Real file uploads / storage (Phase 3).
- Client approvals or comments / two-way feedback (Phase 3).
- Projects or retainers as a grouping layer above clients (Phase 3).
- Full calendar UI and kanban drag-and-drop (Phase 3).

The data model anticipates these so they can be added without restructuring.

## 3. Architecture and placement

The platform is a new, isolated section of the existing aurelius-media app. It is not a
separate project or repository.

- **Route group:** new route group at `/app` (e.g. `src/app/(platform)/app/...`) with its
  **own layout**, so it does not inherit the marketing site's header, footer, or SEO.
- **Indexing:** the section is `noindex`. Set `robots: { index: false, follow: false }` in
  the `(platform)` **layout** metadata so every child route inherits it, rather than relying
  on a per-page export (the `/admin` pages set it per-page, which is easy to forget on new
  routes).
- **Lead popup:** `LeadPopup.tsx` suppresses on `/admin` and `/contact` via an explicit path
  check. It will fire on `/app` until `/app` is added to that suppression list. This is a
  required task in the plan, not automatic.
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

- **Auth mechanism (v1):** reuse the existing signed-cookie login in `src/lib/admin-auth.ts`
  — an HMAC token, one password, 24h expiry. This is the same token scheme guarding `/admin`
  today. No new auth dependency is introduced.
  - **Distinct cookie:** the platform uses its own cookie name, `platform_token`, not the
    leads admin's `admin_token`. The password may be shared in v1, but a separate cookie lets
    the two surfaces diverge and be revoked independently later (important once client logins
    arrive) without a cookie migration. `admin-auth.ts` is lightly parameterized to accept a
    cookie name, or a small `platform-auth.ts` wraps the same HMAC primitives.
  - **Login route:** a new route handler issues the platform cookie (e.g.
    `/api/platform/verify`), mirroring `/api/admin/verify`.
- **Auth enforcement (v1) — IMPORTANT, this is a real change, not a reuse:** the existing
  `/admin` section does **not** gate at the server. `admin/leads/page.tsx` renders
  unconditionally and protection is client-side (a password form) plus 401s from the API
  routes; the page HTML is served to anyone. That model is unsafe for the platform, because
  `/app` pages are **server-rendered and read client data from Supabase directly**, so an
  ungated page would ship that data to any visitor. Therefore the platform **must** enforce
  auth on the server **before any Supabase read**, via one of:
  1. a `middleware.ts` matching `/app/:path*` that calls `verifyAdminToken` on the
     `platform_token` cookie and redirects unauthenticated requests to the login (preferred,
     single choke point), or
  2. a per-page server guard: each `(platform)` server component calls
     `isPlatformAuthenticated()` and `redirect()`s before fetching.
  The implementation plan picks one; middleware is the default recommendation.
- **Mutations (v1):** use **route handlers** under `/api/platform/...`, reusing the existing
  pattern (`/api/admin/leads` PATCH, `/api/leads` POST). Not server actions, to stay
  consistent with the codebase and keep auth checks in one well-understood place. Every
  handler re-verifies the `platform_token` before touching Supabase.
- **Database access (v1):** add new tables to the **existing Supabase project**, accessed
  server-side through the existing `src/lib/supabase.ts` service-role client, with scoping
  enforced in app code. This is identical to how `/api/leads` and the leads dashboard work
  today. No row-level security is required for v1 because all access is server-side and
  single-user. (RLS becomes relevant only if Phase 2 adopts Supabase Auth.)

### Client logins (Phase 2 decision, not now)
When client logins are built, there are two viable paths, chosen at that time:
1. Adopt full Supabase Auth + row-level security (the textbook approach for real client
   accounts and multi-tenant data isolation).
2. Issue per-client magic-link tokens reusing the existing HMAC pattern, with scoping in app
   code.

The v1 schema (notably `tasks.client_visible` and the `client_id` foreign keys) supports
either path.

## 4. Data model

Five tables in the existing Supabase (Postgres) project. Field lists are the intended shape;
exact column types and constraints are finalized in the implementation plan.

### `clients`
- `id` (uuid, pk)
- `name` (text) — contact or account name
- `company` (text, nullable)
- `status` (enum-like text: `active` | `archived`), default `active`
- `created_at` (timestamptz)

### `sections`
Optional groupings of tasks within one client (Todoist-style sections).
- `id` (uuid, pk)
- `client_id` (uuid, fk -> clients.id)
- `name` (text) — e.g. "SEO", "Ads", "Creative"
- `sort_order` (int, default 0) — order of section headings within the client
- `created_at` (timestamptz)

### `tasks`
A task is **open or done** (checkbox model). `completed_at IS NULL` means open; a timestamp
means done. `in_progress` only carries meaning while a task is open.
- `id` (uuid, pk)
- `client_id` (uuid, fk -> clients.id)
- `section_id` (uuid, fk -> sections.id, nullable) — null = ungrouped/"no section"
- `title` (text)
- `description` (text, nullable)
- `completed_at` (timestamptz, nullable) — the checkbox: null = open, set = done
- `in_progress` (boolean, default false) — optional "actively working" flag (open tasks only)
- `priority` (smallint, default 4) — 1 = highest (P1) ... 4 = none/normal (P4), Todoist-style
- `due_date` (date, nullable)
- `client_visible` (boolean, default false) — controls whether this task would appear in the
  future client portal
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

Default task ordering within a list: open before done, then `priority` ascending (P1 first),
then `due_date` ascending (nulls last). No manual drag-reorder in v1.

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

**Future tables (not built in v1):** `subtasks` (or self-referential `parent_task_id`),
`labels` + `task_labels`, `projects` (grouping layer above clients), `client_users` (maps a
portal login to a `client_id`).

## 5. Screens

All under the `/app` route group, behind the server-side auth gate. The shell is a
**persistent two-pane Todoist layout**: a left sidebar (navigation) and a main pane (the
current view). The sidebar is part of the `(platform)` layout, so it shows on every screen.

### Login
Reuses the existing admin login flow/UI pattern. On success, sets the `platform_token` cookie
and redirects into Today.

### Sidebar (persistent)
- **Smart views (top):** **Today** and **Upcoming**.
- **Clients (below):** active clients listed like Todoist projects, each with an open-task
  count badge. A "+ Add client" action. Archived clients are tucked into a collapsed/secondary
  area, not in the main list.

### Today (`/app` — the default landing view)
Open tasks across all clients that are due today or overdue, ordered by the default ordering
(priority then due date). Overdue is clearly flagged. Each row shows a checkbox, title,
priority flag, due date, a read-only **in-progress** indicator when set, and which client it
belongs to. This is the daily driver and replaces the old "dashboard." The in-progress flag is
toggled on the client view, not here.

### Upcoming (`/app/upcoming`)
Open tasks across all clients with a future due date, grouped by date. Same row format as
Today, including the client label and the read-only in-progress indicator.

### Client view (`/app/clients/[id]`)
The workhorse, one client on one page, Todoist project style:
- **Tasks:** a checklist, optionally grouped under **sections**. Tasks not in a section appear
  ungrouped. Each row: checkbox (complete), title, priority flag, due date, an "in progress"
  toggle, and the `client_visible` toggle. Inline quick-add of a task (plain title + due date
  + priority; no natural-language parsing in v1). Add/rename/reorder/delete sections (deleting
  a section reparents its tasks to ungrouped, never deletes them). Ungrouped tasks ("No
  section") render as a leading group above the named sections, which follow `sort_order`. The
  default task ordering from section 4 applies independently within each group. Completed tasks
  collapse to the bottom of their group or hide behind a "show completed" control.
- **Notes:** chronological notes, add/edit (in a secondary tab or panel on this page).
- **Files:** list of links (label + URL), add/remove (same secondary area).

### Client management
Create / edit / archive a client is handled inline from the sidebar ("+ Add client") and the
client view header (rename, change status, archive). No separate clients-list page is needed
in v1, since the sidebar is the project list.

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
- Deleting a client should handle dependent sections/tasks/notes/files (cascade or block with
  a clear message, decided in the plan). Default lean: archive over hard-delete for clients.
- Deleting a **section** never deletes its tasks: those tasks are reparented to ungrouped
  (`section_id` set to NULL).
- Unauthenticated access to any `/app` route is blocked at the server (middleware or per-page
  guard, per section 3) and redirected to the login **before any Supabase read**. Page HTML
  for `/app` routes must never reach an unauthenticated visitor.
- Due-date logic (overdue vs due-soon) uses the app's timezone consistently.

## 8. Testing
- Auth gate: unauthenticated requests to `/app/*` are server-blocked and redirected to login
  (no client data in the response); valid `platform_token` cookie passes. Each `/api/platform`
  handler rejects unauthenticated requests with 401.
- CRUD round-trips for clients, sections, tasks, notes, files against the Supabase project,
  including section reorder and section delete reparenting tasks to ungrouped (not deleting
  them).
- Checkbox completion sets/clears `completed_at`; completed tasks leave the open lists and the
  sidebar counts. The `in_progress` flag is settable only while open and is ignored once done.
- Today shows only open, due-today-or-overdue tasks; Upcoming shows only open, future-dated
  tasks; both label the owning client. Sidebar counts equal open-task counts per client.
- Task ordering follows priority then due date as specified.
- `client_visible` defaults to false and persists correctly (it gates Phase 2, so correctness
  matters early).

## 9. Phasing

- **Phase 1 (build now):** schema + login + server auth gate + the Todoist shell (sidebar with
  Today/Upcoming and clients) + client view (sectioned checklist with priority, due dates,
  in-progress and client-visible toggles, plus notes and file links). A working internal tool.
- **Phase 2 (designed for, built when ready):** client logins + read-only progress portal
  (auth approach decided then; scoping by `client_id`, only `client_visible` tasks shown).
  The portal presents those tasks as done / in progress / coming-up (by `completed_at`,
  `in_progress`, and `due_date`), no checkboxes for the client.
- **Phase 3 (later):** real file uploads, approvals/comments, projects/retainers, full
  calendar, kanban.

## 10. Guiding principle

Build the smallest thing that genuinely helps run client work, prove it, then extend.
Deliberately do not build approvals, uploads, or multi-tenant auth in v1, even though the data
is shaped to welcome them.
