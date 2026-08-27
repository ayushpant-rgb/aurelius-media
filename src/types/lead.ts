export type LeadSource = 'service_hero' | 'service_cta' | 'contact' | 'popup' | 'ebook';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  industry: string | null;
  budget: string | null;
  service_interest: string | null;
  message: string | null;
  notes: string | null;
  source: LeadSource;
  status: LeadStatus;
  // Spam-filter fields; optional so rows created before the spam migration still type-check
  is_spam?: boolean;
  spam_score?: number;
  spam_reasons?: string[] | null;
  ip?: string | null;
  email_normalized?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  budget?: string;
  service_interest?: string;
  message?: string;
  source: LeadSource;
  /** Honeypot — hidden from real users; any value marks the submission as a bot. */
  website?: string;
  /** Client timestamp (ms) captured when the form mounted, for time-to-fill checks. */
  form_ts?: number;
}
