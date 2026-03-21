'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Lead, LeadStatus, LeadSource } from '@/types/lead';

const STATUS_OPTIONS: LeadStatus[] = ['new', 'contacted', 'qualified', 'closed'];
const SOURCE_OPTIONS: LeadSource[] = ['service_hero', 'service_cta', 'contact'];

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-yellow-500/20 text-yellow-400',
  qualified: 'bg-green-500/20 text-green-400',
  closed: 'bg-brand-gray-dark/20 text-brand-gray-dark',
};

const SOURCE_LABELS: Record<LeadSource, string> = {
  service_hero: 'Service Hero',
  service_cta: 'Service CTA',
  contact: 'Contact Page',
  popup: 'Popup',
  ebook: 'Ebook Download',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterSource, setFilterSource] = useState<string>('');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatus) params.set('status', filterStatus);
    if (filterSource) params.set('source', filterSource);

    const res = await fetch(`/api/admin/leads?${params}`);
    if (res.status === 401) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }, [filterStatus, filterSource]);

  // Check auth on mount
  useEffect(() => {
    fetch('/api/admin/leads')
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
          return res.json();
        }
        setLoading(false);
        return null;
      })
      .then((data) => {
        if (data) {
          setLeads(data.leads || []);
          setLoading(false);
        }
      });
  }, []);

  // Refetch when filters change
  useEffect(() => {
    if (authenticated) fetchLeads();
  }, [authenticated, fetchLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthenticated(true);
      setPassword('');
    } else {
      setAuthError('Invalid password');
    }
    setAuthLoading(false);
  };

  const updateLead = async (id: string, updates: { status?: LeadStatus; notes?: string }) => {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates, updated_at: new Date().toISOString() } : l))
    );
  };

  // ─── Login Screen ───
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-brand-white mb-6 text-center">Admin Access</h1>
          {authError && <p className="text-red-400 text-sm text-center mb-4">{authError}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-brand-card border border-brand-border-subtle rounded-xl text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent/50 transition-colors mb-4"
            autoFocus
          />
          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 cta-primary text-white font-semibold rounded-[20px] disabled:opacity-50"
          >
            {authLoading ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </main>
    );
  }

  // ─── Dashboard ───
  return (
    <main className="min-h-screen bg-brand-dark text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-sm text-brand-gray-dark">{leads.length} total</p>
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-brand-card border border-brand-border-subtle rounded-lg text-sm text-brand-white focus:outline-none"
            >
              <option value="">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-3 py-2 bg-brand-card border border-brand-border-subtle rounded-lg text-sm text-brand-white focus:outline-none"
            >
              <option value="">All sources</option>
              {SOURCE_OPTIONS.map((s) => (
                <option key={s} value={s}>{SOURCE_LABELS[s]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-brand-gray-dark text-center py-20">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="text-brand-gray-dark text-center py-20">No leads yet.</p>
        ) : (
          <div className="rounded-xl border border-brand-border-subtle overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-card border-b border-brand-border-subtle">
                  <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-brand-gray-dark">Name</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-brand-gray-dark hidden sm:table-cell">Email</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-brand-gray-dark hidden md:table-cell">Source</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-brand-gray-dark hidden md:table-cell">Service</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-brand-gray-dark">Status</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-brand-gray-dark hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="group">
                    <td colSpan={6} className="p-0">
                      {/* Summary row */}
                      <div
                        onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                        className="grid cursor-pointer hover:bg-brand-card/50 transition-colors border-b border-brand-border-subtle"
                        style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}
                      >
                        <div className="px-4 py-3 font-medium text-brand-white truncate">{lead.name}</div>
                        <div className="px-4 py-3 text-brand-gray truncate hidden sm:block">{lead.email}</div>
                        <div className="px-4 py-3 hidden md:block">
                          <span className="text-xs text-brand-gray-dark">{SOURCE_LABELS[lead.source]}</span>
                        </div>
                        <div className="px-4 py-3 text-brand-gray truncate hidden md:block">{lead.service_interest || '—'}</div>
                        <div className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUS_COLORS[lead.status]}`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="px-4 py-3 text-brand-gray-dark text-xs hidden lg:block">{formatDate(lead.created_at)}</div>
                      </div>

                      {/* Expanded details */}
                      {expandedId === lead.id && (
                        <div className="px-4 py-5 bg-brand-card border-b border-brand-border-subtle">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            {lead.phone && <Detail label="Phone" value={lead.phone} />}
                            {lead.company && <Detail label="Company" value={lead.company} />}
                            {lead.industry && <Detail label="Industry" value={lead.industry} />}
                            {lead.budget && <Detail label="Budget" value={lead.budget} />}
                            <Detail label="Email" value={lead.email} />
                            <Detail label="Source" value={SOURCE_LABELS[lead.source]} />
                          </div>
                          {lead.message && (
                            <div className="mb-4">
                              <p className="text-[10px] uppercase tracking-wider text-brand-gray-dark mb-1">Message</p>
                              <p className="text-sm text-brand-gray leading-relaxed">{lead.message}</p>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-brand-gray-dark mb-1">Status</p>
                              <select
                                value={lead.status}
                                onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
                                className="px-3 py-2 bg-brand-dark border border-brand-border-subtle rounded-lg text-sm text-brand-white focus:outline-none"
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex-1">
                              <p className="text-[10px] uppercase tracking-wider text-brand-gray-dark mb-1">Notes</p>
                              <textarea
                                defaultValue={lead.notes || ''}
                                onBlur={(e) => updateLead(lead.id, { notes: e.target.value })}
                                placeholder="Add a note..."
                                rows={2}
                                className="w-full px-3 py-2 bg-brand-dark border border-brand-border-subtle rounded-lg text-sm text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent/50 resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-brand-gray-dark mb-0.5">{label}</p>
      <p className="text-sm text-brand-white">{value}</p>
    </div>
  );
}
