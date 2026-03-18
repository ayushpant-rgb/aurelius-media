'use client';

import Link from 'next/link';
import { useInView } from '@/lib/hooks';

const services = [
    {
        title: 'Paid Media',
        subtitle: 'Ads & campaigns',
        description: 'Google, Meta, LinkedIn, TikTok, YouTube ads, and retargeting — managed with AI-augmented bidding and creative testing for maximum ROAS.',
        items: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'YouTube Ads', 'TikTok Ads', 'Retargeting'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
        ),
        href: '/services#paid-media',
        glowColor: 'rgba(220, 70, 50, 0.35)',
    },
    {
        title: 'Growth Engine',
        subtitle: 'Strategy & pipeline',
        description: 'Strategy audits, lead generation, funnel building, CRO, programmatic SEO, analytics, and lifecycle marketing.',
        items: ['Strategy Audit', 'Lead Generation', 'Funnel Building', 'CRO', 'Programmatic SEO', 'Analytics', 'Email & Lifecycle'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
        ),
        href: '/services#growth-engine',
        glowColor: 'rgba(99, 102, 241, 0.35)',
    },
    {
        title: 'Creative Studio',
        subtitle: 'Content & assets',
        description: 'Brand videos, reels & shorts, AI creatives, UGC ads, landing pages, content strategy, and pitch decks.',
        items: ['Brand Videos', 'Reels & Shorts', 'AI Creatives', 'UGC Ads', 'Landing Pages', 'Content Strategy', 'Pitch Decks'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
        ),
        href: '/services#creative-studio',
        glowColor: 'rgba(168, 85, 247, 0.35)',
    },
    {
        title: 'AI & Build',
        subtitle: 'Tech & automation',
        description: 'AI automation, custom AI agents, web apps & MVPs, and hands-on AI workshops for teams.',
        items: ['AI Automation', 'AI Agents', 'Web Apps & MVPs', 'AI Workshops'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        ),
        href: '/services#ai-build',
        glowColor: 'rgba(16, 185, 129, 0.35)',
    },
    {
        title: 'Industry Verticals',
        subtitle: 'Specialized marketing',
        description: 'Specialized marketing for books & authors, education & EdTech, and real estate verticals.',
        items: ['Book Marketing', 'Education & EdTech', 'Real Estate'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
            </svg>
        ),
        href: '/services/book-marketing',
        glowColor: 'rgba(251, 191, 36, 0.35)',
    },
    {
        title: 'Full Funnel Marketing',
        subtitle: 'End-to-end growth',
        description: 'End-to-end growth systems — from awareness to loyalty. Strategy, execution, creative, and analytics tied together.',
        items: ['Strategy', 'Execution', 'Creative', 'Analytics'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
        ),
        href: '/services/marketing-strategy-audit',
        glowColor: 'rgba(236, 72, 153, 0.35)',
    },
];

export default function ServicesOverview() {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} className="bg-brand-darker py-24 sm:py-32 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className={`text-center mb-14 md:mb-20 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        All features in{' '}
                        <span className="font-display italic font-normal">one place</span>
                    </h2>
                    <p className="text-brand-gray text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        Everything you need to scale — from paid media to product builds.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {services.map((service, i) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            className={`group relative flex flex-col rounded-2xl p-8 sm:p-10 transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                            style={{
                                animationDelay: `${i * 0.08}s`,
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                            }}
                        >
                            {/* Glowing border on hover */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    boxShadow: `inset 0 0 0 1px ${service.glowColor}, 0 0 30px ${service.glowColor.replace('0.35', '0.08')}`,
                                }}
                            />

                            {/* Top gradient shimmer on hover */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse at 50% -20%, ${service.glowColor.replace('0.35', '0.08')}, transparent 65%)`,
                                }}
                            />

                            <div className="relative z-10">
                                {/* Icon + Title row */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center text-brand-gray-dark group-hover:text-brand-gray transition-all duration-300 group-hover:scale-105 flex-shrink-0"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                        }}
                                    >
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-brand-white mb-1 group-hover:text-white transition-colors">
                                            {service.title}
                                        </h3>
                                        <span className="text-[10px] uppercase tracking-[0.12em] text-brand-gray-dark">{service.subtitle}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mb-4">
                                    {service.description}
                                </p>

                                {/* Sub-items */}
                                <div className="flex flex-wrap gap-1.5">
                                    {service.items.map((item) => (
                                        <span
                                            key={item}
                                            className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-brand-gray-dark"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Services */}
                <div className={`text-center mt-14 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-brand-white transition-all duration-300 hover:bg-white/[0.06] group"
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                    >
                        View All Services
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
