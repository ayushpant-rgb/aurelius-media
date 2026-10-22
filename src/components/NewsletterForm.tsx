'use client';

import { useState } from 'react';
import { HoneypotField, useSpamGuard } from '@/components/SpamGuard';

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
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
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
