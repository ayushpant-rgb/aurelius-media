'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { HoneypotField, useSpamGuard } from '@/components/SpamGuard';
import '@/app/styles/pages.css';

// Shown when the server or the network fails (a server error page is not JSON).
const SEND_FAILED = "We couldn't send that just now. Please try again, or email ayush@aureliusmedia.co.";

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
  const posthog = usePostHog();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
  });
  const { website, setWebsite, spamFields } = useSpamGuard();

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
    // Time delay trigger
    const timer = setTimeout(() => {
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
          ...spamFields,
        }),
      });

      if (!res.ok) {
        // the server's own message when it sent one; never a raw parse error
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || SEND_FAILED);
      }

      setSubmitted(true);
      setCookie(COOKIE_NAME, '1', COOKIE_DAYS);
      posthog?.capture('lead_form_submitted', {
        source: 'popup',
        industry: formData.industry || undefined,
      });
    } catch (err) {
      setError(err instanceof Error && !(err instanceof TypeError) ? err.message : SEND_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="pg-lp-scrim animate-fade-in" onClick={dismiss} />

      {/* Popup — center on desktop, bottom sheet on mobile */}
      <div className="pg-lp animate-fade-in-up" role="dialog" aria-modal="true" aria-labelledby="lead-popup-title">
        <div className="paper-card">
          {/* Close button */}
          <button onClick={dismiss} className="pg-lp-close" aria-label="Close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {submitted ? (
            <div className="pg-lp-done" role="status">
              <span className="pg-tick" aria-hidden="true">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h3 id="lead-popup-title">
                Application received.
              </h3>
              <p>
                We&apos;ll review your details and reach out within 24 hours if there&apos;s a fit.
              </p>
            </div>
          ) : (
            <>
              {/* Badge */}
              <span className="pg-lp-badge">
                <span className="pulse-dot" aria-hidden="true" />
                Limited availability
              </span>

              {/* Headline */}
              <h2 id="lead-popup-title">
                We take on 3 new clients per quarter.
              </h2>
              <p className="pg-lp-sub">
                See if you qualify for a partnership with our team.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <HoneypotField value={website} onChange={setWebsite} />
                <div className="fld">
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    aria-label="Your name"
                  />
                </div>
                <div className="fld">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    aria-label="Email address"
                  />
                </div>
                <div className="fld pg-select">
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    aria-label="Your industry"
                    className={!formData.industry ? 'pg-empty' : undefined}
                  >
                    <option value="">Your industry...</option>
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="formmsg err" role="alert">{error}</p>
                )}

                <button type="submit" disabled={loading} className="btn">
                  {loading ? 'Submitting...' : 'See If You Qualify'}
                </button>
              </form>

              <p className="fnote">
                No spam. We&apos;ll only reach out if there&apos;s a genuine fit.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
