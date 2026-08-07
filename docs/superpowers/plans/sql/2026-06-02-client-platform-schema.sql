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
