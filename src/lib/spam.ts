// Server-side spam scoring for lead/newsletter submissions.
// Design: docs/superpowers/specs/2026-08-26-lead-spam-filter-design.md
// Submissions scoring >= SPAM_THRESHOLD are stored with is_spam=true and
// suppress all emails; they are never rejected, so real leads survive review.

export const SPAM_THRESHOLD = 50;

const VOWELS = 'aeiouy';

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'sharklasers.com',
  '10minutemail.com',
  'temp-mail.org',
  'tempmail.com',
  'throwawaymail.com',
  'yopmail.com',
  'trashmail.com',
  'getnada.com',
  'dispostable.com',
  'maildrop.cc',
  'fakeinbox.com',
  'mintemail.com',
  'mytemp.email',
]);

export interface SpamSignals {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot field — real users never see it, so any value means bot. */
  website?: string;
  /** Client timestamp (ms) captured when the form mounted. */
  formTs?: number;
}

export interface SpamVelocity {
  /** Leads with the same normalized email in the last 24h. */
  sameEmailRecently?: number;
  /** Leads from the same IP in the last hour. */
  sameIpRecently?: number;
}

export interface SpamAssessment {
  score: number;
  reasons: string[];
  isSpam: boolean;
}

/**
 * Lowercases and, for gmail, strips dots and +tags from the local part so
 * `g.ro.binso14.8@gmail.com` and `grobinso148@gmail.com` dedupe together.
 */
export function normalizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf('@');
  if (at === -1) return trimmed;
  let local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.split('+')[0].replace(/\./g, '');
    return `${local}@gmail.com`;
  }
  return `${local.split('+')[0]}@${domain}`;
}

function vowelRatio(letters: string): number {
  if (!letters) return 1;
  let vowels = 0;
  for (const ch of letters) if (VOWELS.includes(ch)) vowels++;
  return vowels / letters.length;
}

function longestConsonantRun(letters: string): number {
  let run = 0;
  let max = 0;
  for (const ch of letters) {
    if (VOWELS.includes(ch)) {
      run = 0;
    } else {
      run++;
      if (run > max) max = run;
    }
  }
  return max;
}

/**
 * Scores how machine-generated a name token looks. Returns the strongest
 * single signal (0–50) rather than a sum, so one unusual-but-real name
 * can't cross SPAM_THRESHOLD on its own.
 */
function nameGibberishScore(name: string): { score: number; reason: string } | null {
  let best: { score: number; reason: string } | null = null;
  const consider = (score: number, reason: string) => {
    if (!best || score > best.score) best = { score, reason };
  };

  for (const token of name.trim().split(/\s+/)) {
    const letters = token.replace(/[^a-zA-Z]/g, '');
    if (letters.length < 4) continue;
    const lower = letters.toLowerCase();

    // Random-case strings like "ubRWhYOQAKddWkIBWaONAOC"
    const interiorCaps = letters.slice(1).replace(/[^A-Z]/g, '').length;
    if (interiorCaps >= 2) consider(50, 'name_random_case');

    if (vowelRatio(lower) === 0) consider(40, 'name_no_vowels');
    if (letters.length >= 5 && longestConsonantRun(lower) >= 5) consider(40, 'name_consonant_run');
    // len >= 6 keeps common short surnames (Smith, Grant) out of range
    if (letters.length >= 6 && vowelRatio(lower) < 0.2) consider(30, 'name_low_vowels');
  }
  return best;
}

/** Heuristics that don't need the database. */
export function scoreSignals(signals: SpamSignals): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const add = (points: number, reason: string) => {
    score += points;
    reasons.push(reason);
  };

  if (signals.website?.trim()) add(100, 'honeypot');

  if (typeof signals.formTs !== 'number' || !Number.isFinite(signals.formTs)) {
    add(40, 'no_form_token');
  } else {
    const elapsed = Date.now() - signals.formTs;
    if (elapsed < 3000) add(40, 'too_fast');
  }

  if (signals.name) {
    const gibberish = nameGibberishScore(signals.name);
    if (gibberish) add(gibberish.score, gibberish.reason);
  }

  if (signals.email) {
    const email = signals.email.trim().toLowerCase();
    const at = email.lastIndexOf('@');
    if (at !== -1) {
      const local = email.slice(0, at);
      const domain = email.slice(at + 1);
      if ((domain === 'gmail.com' || domain === 'googlemail.com') && (local.match(/\./g) || []).length >= 3) {
        add(30, 'gmail_dot_alias');
      }
      if (DISPOSABLE_DOMAINS.has(domain)) add(40, 'disposable_email');
    }
  }

  if (signals.message && /https?:\/\//i.test(signals.message)) add(30, 'link_in_message');

  return { score, reasons };
}

export function assessSubmission(signals: SpamSignals, velocity: SpamVelocity = {}): SpamAssessment {
  const { score, reasons } = scoreSignals(signals);
  let total = score;
  const allReasons = [...reasons];

  if ((velocity.sameEmailRecently ?? 0) >= 3) {
    total += 40;
    allReasons.push('email_velocity');
  }
  if ((velocity.sameIpRecently ?? 0) >= 3) {
    total += 40;
    allReasons.push('ip_velocity');
  }

  return { score: total, reasons: allReasons, isSpam: total >= SPAM_THRESHOLD };
}
