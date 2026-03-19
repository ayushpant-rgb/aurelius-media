create table leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  industry text,
  budget text,
  service_interest text,
  message text,
  notes text,
  source text not null check (source in ('service_hero', 'service_cta', 'contact')),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index leads_created_at_idx on leads (created_at desc);
create index leads_status_idx on leads (status);

-- Auto-update updated_at on row modification
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger leads_updated_at
  before update on leads
  for each row execute function update_updated_at();
