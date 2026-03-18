'use client';

import { useInView } from '@/lib/hooks';

const stats = [
    {
        value: '$15M+',
        label: 'Ad spend managed',
        description: 'Profitable campaigns across Google, Meta, LinkedIn, and TikTok — at every budget level.',
    },
    {
        value: '84',
        label: 'Businesses scaled',
        description: 'From Series A startups to legacy brands, across 25+ countries and every major vertical.',
    },
    {
        value: '10x',
        label: 'Faster creative output',
        description: 'AI-powered creative production delivers ad variants, videos, and assets at 10x traditional speed.',
    },
];

export default function MissionStatement() {
    const { ref, inView } = useInView();

    return (
        <section id="how-it-works" ref={ref} className="relative bg-brand-dark py-20 sm:py-28 overflow-hidden">
            {/* Subtle dot grid background like the Dovetail reference */}
            <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            {/* Horizontal grid lines */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '120px 120px',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
                {/* Eyebrow */}
                <p
                    className={`text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-gray-dark mb-8 sm:mb-10 font-mono ${inView ? 'animate-fade-in' : 'opacity-0'}`}
                >
                    How It Works
                </p>

                {/* Big Headline */}
                <h2
                    className={`text-2xl sm:text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-medium text-brand-white leading-[1.15] tracking-tight max-w-4xl mb-16 sm:mb-20 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                >
                    Aurelius Media turns your ad spend into predictable revenue through AI-powered creative, data-driven media buying, and growth engineering.
                </h2>

                {/* Stats Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border-subtle rounded-xl overflow-hidden mb-12 sm:mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-brand-dark p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-2">
                                {/* Up-trend icon */}
                                <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white tracking-tight">
                                    {stat.value}
                                </span>
                            </div>
                            <p className="text-sm sm:text-base font-semibold text-brand-white mb-2">
                                {stat.label}
                            </p>
                            <p className="text-sm text-brand-gray leading-relaxed">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
