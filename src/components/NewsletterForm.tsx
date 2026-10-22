'use client';

import { useState } from 'react';
import { HoneypotField, useSpamGuard } from '@/components/SpamGuard';

// Shown when the server or the network fails (a server error page is not JSON).
const SIGNUP_FAILED = "We couldn't sign you up just now. Please try again in a minute.";

interface NewsletterFormProps {
  source: string;
  variant?: 'inline' | 'stacked';
}

export default function NewsletterForm({ source, variant = 'stacked' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { website, setWebsite, spamFields } = useSpamGuard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, ...spamFields }),
      });

      if (!res.ok) {
        // the server's own message when it sent one; never a raw parse error
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || SIGNUP_FAILED);
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error && !(err instanceof TypeError) ? err.message : SIGNUP_FAILED);
    }
  };

  if (status === 'success') {
    return <p className="formmsg ok" role="status">You&apos;re in! Check your inbox.</p>;
  }

  return (
    <div style={variant === 'stacked' ? { maxWidth: 440, margin: '0 auto' } : undefined}>
      <form onSubmit={handleSubmit} className="sub" style={variant === 'stacked' ? { maxWidth: 'none' } : undefined}>
        <HoneypotField value={website} onChange={setWebsite} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address"
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="formmsg err" role="alert" style={{ marginTop: 10 }}>{errorMsg}</p>
      )}
    </div>
  );
}
