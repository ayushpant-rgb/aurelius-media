'use client';

import { useState, useEffect } from 'react';

const POPUP_DELAY = 8000; // 8 seconds
const STORAGE_KEY = 'aurelius_popup_dismissed';

export default function LeadPopup() {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Don't show if already dismissed this session
        if (sessionStorage.getItem(STORAGE_KEY)) return;

        const timer = setTimeout(() => setVisible(true), POPUP_DELAY);
        return () => clearTimeout(timer);
    }, []);

    function dismiss() {
        setVisible(false);
        sessionStorage.setItem(STORAGE_KEY, '1');
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, source: 'popup' }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Something went wrong.');
            }

            setSubmitted(true);
            sessionStorage.setItem(STORAGE_KEY, '1');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-brand-darker border border-brand-border-subtle rounded-2xl p-6 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={dismiss}
                    className="absolute top-3 right-3 text-brand-gray-dark hover:text-brand-white transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {submitted ? (
                    <div className="text-center py-4">
                        <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-brand-white mb-2">We&apos;ll be in touch!</h3>
                        <p className="text-sm text-brand-gray">Expect a call from our team shortly.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-5">
                            <p className="text-xs uppercase tracking-[0.12em] text-brand-accent font-semibold mb-2">Free Strategy Call</p>
                            <h3 className="text-xl font-bold text-brand-white leading-tight">
                                Want to 3x your leads in 90 days?
                            </h3>
                            <p className="text-sm text-brand-gray mt-2 leading-relaxed">
                                Drop your details and we&apos;ll reach out with a custom growth plan.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-brand-card border border-brand-border rounded-xl text-sm text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent/50 transition-colors"
                            />
                            <input
                                type="tel"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-brand-card border border-brand-border rounded-xl text-sm text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent/50 transition-colors"
                            />

                            {error && (
                                <p className="text-xs text-red-400">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 cta-primary text-white font-semibold rounded-xl text-sm disabled:opacity-50 transition-opacity"
                            >
                                {loading ? 'Sending...' : 'Get My Free Strategy Call'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
