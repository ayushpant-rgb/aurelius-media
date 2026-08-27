# Lead Spam Filter — Design

**Date:** 2026-08-26
**Problem:** Bot traffic floods every lead form (popup, contact, service hero, service CTA, ebook) with junk submissions — gibberish names ("ubRWhYOQAKddWkIBWaONAOC"), gmail dot-alias emails (`g.ro.binso14.8@gmail.com`), 3–6 duplicate submissions per burst. Each one inserts into Supabase and fires two Resend emails, spamming the founder inbox and burning sender reputation on confirmation emails to fake addresses.

**Constraint:** Never lose a real lead. No CAPTCHA friction.

## Approach: score + quarantine (chosen)

Every submission is **always stored** in Supabase. A server-side scoring layer flags junk as `is_spam = true`:

- Spam leads: stored, **no emails sent**, API still returns `success: true` (silent quarantine — bots learn nothing).
- Clean leads: stored + notification/confirmation emails as before.
- Duplicates (same normalized email + same source within 24h): stored, emails suppressed — kills the "same lead 3× in one minute" noise even for clean submissions.
- Admin dashboard gets a Spam view with "Not spam" restore, so false positives are recoverable, never lost.

**Alternatives rejected:**
1. *Cloudflare Turnstile* — strongest defense but needs a Cloudflare account + keys and adds UX friction. Escalation path if scoring proves insufficient.
2. *Client-only honeypot* — trivially bypassed by bots POSTing to `/api/leads` directly.

## Scoring signals (`src/lib/spam.ts`, threshold ≥ 50)

| Signal | Points | Notes |
|---|---|---|
| Honeypot `website` field filled | 100 | Hidden off-screen input; bots auto-fill it |
| Missing `form_ts` token | 40 | All real forms send it after deploy; direct API bots don't |
| Submitted < 3s after form mount | 40 | Faster than any human incl. autofill edge cases alone stays < 50 |
| Gibberish name (interior caps ≥ 2) | 50 | `ubRWhYOQAK…` |
| Gibberish name (≥ 5 consonant run) | 40 | `Trjhta` |
| Gibberish name (zero vowels, len ≥ 4) | 40 | `Cczf`, `Qbzcgr` |
| Gibberish name (vowel ratio < 0.22, len ≥ 5) | 30 | `Jlhbe`; threshold tuned so `Krzysztof` (0.22) passes |
| Gmail local part with ≥ 3 dots | 30 | `a.pr.i.ldwol.f2.0.1.3@` |
| Disposable email domain | 40 | mailinator, yopmail, etc. |
| URL in message | 30 | Classic comment spam |
| Same normalized email ≥ 3 leads in 24h | 40 | Supabase count query |
| Same IP ≥ 3 leads in 1h | 40 | `x-forwarded-for` on Vercel |

Name signals take the **max** (not sum) so one weird-but-real name can't cross the threshold alone; email/velocity/honeypot signals stack. Gmail addresses are normalized (dots stripped, `+tag` stripped) into `email_normalized` for dedupe, defeating the dot-alias trick.

## Changes

- **DB** (`scripts/supabase-migration-spam-filter.sql`, run manually in Supabase SQL editor): add `is_spam`, `spam_score`, `spam_reasons text[]`, `ip`, `email_normalized` to `leads`; widen `source` check to include `popup` + `ebook`; indexes on `(email_normalized, created_at)` and `(ip, created_at)`. Base `supabase-schema.sql` updated to match.
- **`POST /api/leads`**: score → insert with spam fields → emails only if clean and not duplicate. Falls back to a legacy insert if spam columns don't exist yet (pre-migration deploy safety). Also fixes the bug where `source: 'ebook'` was rejected as invalid — ebook leads were being lost entirely.
- **`POST /api/newsletter`**: honeypot → silent success (not stored); suspicious email → stored but no welcome email.
- **Forms (5)**: shared `useSpamGuard()` hook + `<HoneypotField>` (`src/components/SpamGuard.tsx`) added to LeadPopup, ContactPageClient, ServicePageClient (hero + CTA), EbookLandingClient, NewsletterForm.
- **Admin**: view filter Real / Spam / All (default Real), spam score + reasons in expanded row, Mark-as-spam / Not-spam toggle; `popup` + `ebook` added to source filter.

## Rollout

1. Deploy code (safe pre-migration thanks to the legacy-insert fallback; scoring signals that need new columns simply no-op).
2. Run `scripts/supabase-migration-spam-filter.sql` in the Supabase SQL editor — full protection active from then on.
