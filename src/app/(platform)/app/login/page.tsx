'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlatformLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/platform/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/app');
      router.refresh();
    } else {
      setError('Invalid password');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-brand-card border border-brand-border-subtle rounded-[20px] p-8"
      >
        <h1 className="font-display text-2xl font-extrabold mb-6">Aurelius Platform</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full bg-brand-input border border-brand-border rounded-[12px] px-4 py-3 text-white mb-3 outline-none focus:border-brand-accent"
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <button type="submit" disabled={loading} className="cta-primary w-full">
          {loading ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
