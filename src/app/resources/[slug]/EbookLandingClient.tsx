'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useInView } from '@/lib/hooks';
import type { Ebook } from '@/data/ebooks';

interface Props {
  ebook: Ebook;
}

export default function EbookLandingClient({ ebook }: Props) {
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: chaptersRef, inView: chaptersInView } = useInView();
  const { ref: formSectionRef, inView: formSectionInView } = useInView();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    extra: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          phone: formData.phone || undefined,
          company: formData.extra || undefined,
          service_interest: ebook.title,
          source: 'ebook' as const,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);

      // Trigger PDF download
      const link = document.createElement('a');
      link.href = ebook.pdfPath;
      link.download = ebook.pdfPath.split('/').pop() || 'ebook.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 bg-brand-input border border-brand-border-subtle rounded-xl text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent/50 transition-colors';

  return (
    <>
      {/* Hero + Form Section */}
      <section
        ref={heroRef}
        className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-20"
          style={{ backgroundColor: ebook.accentColor }}
        />

        <div
          className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10 ${
            heroInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {/* Left: Content */}
          <div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-brand-accent-text transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>

            <span className="section-label mb-4 block">Free Ebook</span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-white tracking-tight leading-[1.1] mb-4">
              {ebook.title}
            </h1>

            <p className="text-lg text-brand-accent-text font-medium mb-6">
              {ebook.subtitle}
            </p>

            <p className="text-brand-gray leading-relaxed mb-8 max-w-lg">
              {ebook.description}
            </p>

            {/* Ebook cover placeholder */}
            <div
              className="relative w-full max-w-sm aspect-[3/4] rounded-[20px] border border-brand-border-subtle overflow-hidden flex items-center justify-center mb-8"
              style={{
                background: `radial-gradient(ellipse at center, ${ebook.accentColor}20 0%, #131316 70%)`,
              }}
            >
              <div className="text-center">
                <div className="text-8xl mb-4">{ebook.coverPlaceholder}</div>
                <p className="text-sm font-display font-bold text-brand-white px-8 leading-tight">
                  {ebook.title}
                </p>
                <p className="text-xs text-brand-muted mt-2 font-mono uppercase tracking-wider">
                  Aurelius Media
                </p>
              </div>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-brand-card border border-brand-border-subtle rounded-[20px] p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-display font-extrabold text-brand-white mb-3">
                    Your download is starting!
                  </h3>
                  <p className="text-brand-gray mb-6">
                    If the download didn&apos;t start automatically, click below.
                  </p>
                  <a
                    href={ebook.pdfPath}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 cta-primary text-white font-semibold rounded-[20px]"
                  >
                    Download PDF
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                  <div className="mt-8 pt-6 border-t border-brand-border-subtle">
                    <p className="text-sm text-brand-muted mb-3">Want a custom strategy?</p>
                    <a
                      href="https://cal.com/aureliusmedia/15min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-brand-accent-text hover:text-brand-accent-hover transition-colors"
                    >
                      Book a free strategy call →
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-brand-white tracking-tight mb-2">
                    Get your free copy
                  </h2>
                  <p className="text-sm text-brand-gray mb-6">
                    Fill in your details and we&apos;ll send the playbook straight to your inbox.
                  </p>

                  {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-brand-gray mb-1.5">
                        Full Name <span className="text-brand-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm text-brand-gray mb-1.5">
                        Email Address <span className="text-brand-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm text-brand-gray mb-1.5">
                        Phone Number <span className="text-brand-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="extra" className="block text-sm text-brand-gray mb-1.5">
                        {ebook.formFields.label}
                      </label>
                      <input
                        type="text"
                        id="extra"
                        name="extra"
                        value={formData.extra}
                        onChange={handleChange}
                        placeholder={ebook.formFields.placeholder}
                        className={inputClasses}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 cta-primary text-white font-semibold rounded-[20px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Download Free Playbook
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-brand-muted text-center">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section ref={chaptersRef} className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div
          className={`max-w-4xl mx-auto ${
            chaptersInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <span className="section-label mb-4 block">What&apos;s Inside</span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-white tracking-tight mb-10">
            Chapter highlights
          </h2>

          <div className="space-y-4">
            {ebook.chapters.map((chapter, i) => (
              <div
                key={i}
                className="bg-brand-card border border-brand-border-subtle rounded-[16px] p-5 sm:p-6 transition-all hover:border-[rgba(232,85,15,0.20)]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-[12px] bg-brand-nested flex items-center justify-center">
                    <span className="text-sm font-mono font-bold text-brand-accent-text">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-brand-white mb-1">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-brand-gray leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={formSectionRef} className="pb-24 sm:pb-32 px-4 sm:px-6">
        <div
          className={`max-w-3xl mx-auto text-center ${
            formSectionInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="bg-gradient-to-br from-[#1A0D05] to-brand-card border border-brand-accent/20 rounded-[24px] p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-white tracking-tight mb-4">
              Ready to grow?
            </h2>
            <p className="text-brand-gray mb-8 max-w-lg mx-auto">
              Get the playbook now — or talk to us directly about building a
              custom growth strategy for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!submitted && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 cta-primary text-white font-semibold rounded-[20px]"
                >
                  Download the Playbook
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </a>
              )}
              <a
                href="https://cal.com/aureliusmedia/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 btn-ghost text-white font-semibold rounded-[20px]"
              >
                Book a strategy call →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
