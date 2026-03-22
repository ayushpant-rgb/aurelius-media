'use client';

import Link from 'next/link';
import { useInView } from '@/lib/hooks';
import { ebooks } from '@/data/ebooks';

function EbookCard({ ebook, index }: { ebook: typeof ebooks[number]; index: number }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`group relative bg-brand-card border border-brand-border-subtle rounded-[20px] overflow-hidden transition-all duration-300 hover:border-[rgba(232,85,15,0.30)] hover:-translate-y-1 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Cover placeholder */}
      <div
        className="relative h-56 flex items-center justify-center"
        style={{
          background: `radial-gradient(ellipse at center, ${ebook.accentColor}15 0%, transparent 70%)`,
        }}
      >
        <div className="text-7xl">{ebook.coverPlaceholder}</div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest bg-brand-accent/10 text-brand-accent-text border border-brand-accent/20 rounded-full">
            Free Ebook
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-brand-white tracking-tight leading-tight mb-2">
          {ebook.title}
        </h3>
        <p className="text-sm text-brand-accent-text font-medium mb-4">
          {ebook.subtitle}
        </p>
        <p className="text-brand-gray text-sm leading-relaxed mb-6 line-clamp-3">
          {ebook.description}
        </p>

        {/* Chapter preview */}
        <div className="space-y-2 mb-6">
          {ebook.chapters.slice(0, 3).map((ch, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-brand-accent-text text-xs mt-1 shrink-0">✦</span>
              <span className="text-xs text-brand-gray">{ch.title}</span>
            </div>
          ))}
          {ebook.chapters.length > 3 && (
            <p className="text-xs text-brand-muted ml-5">
              + {ebook.chapters.length - 3} more chapters
            </p>
          )}
        </div>

        <Link
          href={`/resources/${ebook.slug}`}
          className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 cta-primary text-white text-sm font-semibold rounded-[20px] transition-all"
        >
          Download Free Playbook
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ResourcesHubClient() {
  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div
          className={`max-w-4xl mx-auto text-center relative z-10 ${
            heroInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <span className="section-label mb-4 block">Resources</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-brand-white tracking-tight leading-[1.1] mb-6">
            Free marketing{' '}
            <span className="gradient-text">playbooks.</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Battle-tested strategies from managing 100CR+ in ad spend across 25+ countries.
            Download our playbooks and start growing today.
          </p>
        </div>
      </section>

      {/* Ebook Grid */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ebooks.map((ebook, i) => (
            <EbookCard key={ebook.slug} ebook={ebook} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1A0D05] to-brand-card border border-brand-accent/20 rounded-[24px] p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-white tracking-tight mb-4">
              Need a custom strategy?
            </h2>
            <p className="text-brand-gray mb-8 max-w-lg mx-auto">
              Our playbooks give you the frameworks. A strategy call gives you a
              personalized plan for your business.
            </p>
            <a
              href="https://cal.com/aureliusmedia/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 cta-primary text-white font-semibold rounded-[20px]"
            >
              Book a free strategy call
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
