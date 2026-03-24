'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const COOKIE_NAME = 'aurelius_popup_dismissed';
const COOKIE_DAYS = 7;
const DELAY_MS = 12000;

const INDUSTRY_OPTIONS = [
  'E-commerce / D2C',
  'Education / EdTech',
  'Real Estate',
  'SaaS / Tech',
  'Books / Publishing',
  'Professional Services',
  'Healthcare / Wellness',
  'Finance / FinTech',
  'Other',
];

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

export default function LeadPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
  });

  const dismiss = useCallback(() => {
    setVisible(false);
    setCookie(COOKIE_NAME, '1', COOKIE_DAYS);
  }, []);

  const show = useCallback(() => {
    if (pathname === '/contact' || pathname.startsWith('/admin')) return;
    if (getCookie(COOKIE_NAME)) return;
    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (getCookie(COOKIE_NAME)) return;

    let shown = false;
    let timer: ReturnType<typeof setTimeout>;

    // Time delay trigger
    timer = setTimeout(() => {
      if (!shown) {
        shown = true;
        show();
      }
    }, DELAY_MS);

    // Exit intent trigger (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        shown = true;
        show();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [show]);

  // Lock body scroll when popup is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          industry: formData.industry || undefined,
          source: 'popup' as const,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      setCookie(COOKIE_NAME, '1', COOKIE_DAYS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!visible) return null;

  const inputClass =
    'w-full px-4 py-3 bg-[#1C1C20] border border-[rgba(255,255,255,0.08)] rounded-xl text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[rgba(232,85,15,0.5)] transition-colors text-sm';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={dismiss}
      />

      {/* Popup — center on desktop, bottom sheet on mobile */}
      <div className="fixed z-[9999] inset-x-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-[440px] sm:w-full animate-fade-in-up">
        <div className="bg-[#131316] border border-[rgba(255,255,255,0.08)] sm:rounded-[24px] rounded-t-[24px] overflow-hidden relative">
          {/* Ambient glow */}
          <div className="absolute -top-[80px] left-1/2 -translate-x-1/2 w-[300px] h-[160px] bg-[radial-gradient(ellipse,rgba(232,85,15,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[rgba(255,255,255,0.4)] hover:text-white z-10"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(232,85,15,0.1)] border border-[rgba(232,85,15,0.2)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#FF6B2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2">
                  Application received.
                </h3>
                <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
                  We&apos;ll review your details and reach out within 24 hours if there&apos;s a fit.
                </p>
              </div>
            ) : (
              <>
                {/* Badge */}
                <div className="mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#FF6B2B] bg-[rgba(232,85,15,0.08)] border border-[rgba(232,85,15,0.15)] rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B] animate-pulse" />
                    Limited availability
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-[22px] sm:text-[26px] font-display font-extrabold text-white tracking-[-0.03em] leading-[1.15] mb-2">
                  We take on 3 new clients per quarter.
                </h2>
                <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-6">
                  See if you qualify for a partnership with our team.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={inputClass}
                  />
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none ${!formData.industry ? 'text-[rgba(255,255,255,0.3)]' : ''}`}
                  >
                    <option value="" className="bg-[#1C1C20]">Your industry...</option>
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#1C1C20] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>

                  {error && (
                    <p className="text-xs text-red-400 text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3.5 cta-primary text-white font-semibold text-sm rounded-[16px] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                  >
                    {loading ? 'Submitting...' : 'See If You Qualify'}
                  </button>
                </form>

                <p className="text-[11px] text-[rgba(255,255,255,0.25)] text-center mt-4">
                  No spam. We&apos;ll only reach out if there&apos;s a genuine fit.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
