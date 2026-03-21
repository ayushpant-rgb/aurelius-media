export type LeadSource = 'service_hero' | 'service_cta' | 'contact' | 'popup';
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
}
