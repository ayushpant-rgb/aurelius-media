-- Spam-filter migration for the leads table.
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent.
-- Design: docs/superpowers/specs/2026-08-26-lead-spam-filter-design.md

alter table leads add column if not exists is_spam boolean not null default false;
alter table leads add column if not exists spam_score integer not null default 0;
alter table leads add column if not exists spam_reasons text[];
alter table leads add column if not exists ip text;
alter table leads add column if not exists email_normalized text;

-- Widen the source constraint to include popup + ebook
-- (ebook submissions were previously rejected outright)
alter table leads drop constraint if exists leads_source_check;
alter table leads add constraint leads_source_check
  check (source in ('service_hero', 'service_cta', 'contact', 'popup', 'ebook'));

-- Velocity/dedupe lookups used by POST /api/leads
create index if not exists leads_email_normalized_idx on leads (email_normalized, created_at desc);
create index if not exists leads_ip_idx on leads (ip, created_at desc);
create index if not exists leads_is_spam_idx on leads (is_spam);

-- Backfill: quarantine the existing junk so the dashboard's default view is clean.
-- Heuristic mirror of src/lib/spam.ts (gmail locals with 3+ dots = alias abuse).
update leads
set is_spam = true,
    spam_score = greatest(spam_score, 50),
    spam_reasons = array['backfill_gmail_dot_alias']
where is_spam = false
  and split_part(email, '@', 2) in ('gmail.com', 'googlemail.com')
  and length(split_part(email, '@', 1)) - length(replace(split_part(email, '@', 1), '.', '')) >= 3;

-- Backfill normalized emails for future dedupe (gmail: strip dots and +tags)
update leads
set email_normalized = case
  when split_part(lower(email), '@', 2) in ('gmail.com', 'googlemail.com')
    then replace(split_part(split_part(lower(email), '@', 1), '+', 1), '.', '') || '@gmail.com'
  else split_part(split_part(lower(email), '@', 1), '+', 1) || '@' || split_part(lower(email), '@', 2)
end
where email_normalized is null;
