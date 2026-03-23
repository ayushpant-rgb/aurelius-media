'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  source: string;
  variant?: 'inline' | 'stacked';
}

export default function NewsletterForm({ source, variant = 'stacked' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
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
    return (
      <p className="text-sm text-green-400 font-medium py-2">
        You&apos;re in! Check your inbox.
      </p>
    );
  }

  const isInline = variant === 'inline';

  return (
    <form onSubmit={handleSubmit} className={`flex ${isInline ? 'flex-row' : 'flex-col sm:flex-row'} gap-2 ${isInline ? 'max-w-sm' : 'max-w-[420px] mx-auto'}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className={`flex-1 px-4 ${isInline ? 'py-2.5 text-sm rounded-lg' : 'py-[11px] text-[14px] rounded-xl'} bg-brand-card-hover border border-brand-border text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent/50 transition-colors`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`${isInline ? 'px-4 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold rounded-lg' : 'cta-primary text-white font-semibold rounded-xl px-5 py-[11px] text-[14px]'} transition-colors whitespace-nowrap disabled:opacity-50`}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-400 col-span-full">{errorMsg}</p>
      )}
    </form>
  );
}
