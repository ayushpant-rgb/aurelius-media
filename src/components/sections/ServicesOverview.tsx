'use client';

import Link from 'next/link';
import { useInView } from '@/lib/hooks';
import { BentoGrid } from '@/components/ui/bento-grid';
import type { BentoItem } from '@/components/ui/bento-grid';
import {
    TrendingUp,
    Briefcase,
    Palette,
    Zap,
    Globe,
    Activity,
} from 'lucide-react';

const serviceCards: BentoItem[] = [
    {
        title: 'Performance Marketing',
        meta: '6 platforms',
        description:
            'Google, Meta, LinkedIn, TikTok, YouTube ads and retargeting — AI-augmented bidding for maximum ROAS.',
        icon: <TrendingUp className="w-5 h-5 text-brand-accent" />,
        tags: ['Google Ads', 'Meta Ads', 'LinkedIn', 'YouTube', 'TikTok', 'Retargeting'],
        cta: 'Explore →',
        href: '/services#performance-marketing',
    },
    {
        title: 'Growth Marketing',
        meta: '9 services',
        description:
            'Strategy audits, lead gen, funnel building, CRO, programmatic SEO, analytics, lifecycle marketing, content strategy, and landing pages.',
        icon: <Briefcase className="w-5 h-5 text-brand-accent" />,
        tags: ['Lead Gen', 'CRO', 'SEO', 'Analytics', 'Content', 'Landing Pages'],
        cta: 'Explore →',
        href: '/services#growth-marketing',
    },
    {
        title: 'Creative Services',
        meta: '6 services',
        description:
            'Brand videos, reels & shorts, AI creatives, UGC ads, creative design, and pitch decks.',
        icon: <Palette className="w-5 h-5 text-brand-accent" />,
        tags: ['Video', 'AI Creatives', 'UGC', 'Design'],
        cta: 'Explore →',
        href: '/services#creative-services',
    },
    {
        title: 'AI Marketing & Automation',
        meta: '5 services',
        description:
            'AI automation, custom AI agents, AI chatbots, web apps & MVPs, and hands-on AI workshops for teams.',
        icon: <Zap className="w-5 h-5 text-brand-accent" />,
        tags: ['AI Automation', 'AI Agents', 'Chatbots', 'Web Apps', 'Workshops'],
        cta: 'Explore →',
        href: '/services#ai-automation',
    },
    {
        title: 'Industry Verticals',
        meta: '3 verticals',
        description:
            'Specialized marketing for books & authors, education & EdTech, and real estate verticals.',
        icon: <Globe className="w-5 h-5 text-brand-accent" />,
        tags: ['Book Marketing', 'Education', 'Real Estate'],
        cta: 'Explore →',
        href: '/services#verticals',
    },
    {
        title: 'Full Funnel Marketing',
        meta: 'End-to-end',
        description:
            'End-to-end growth systems — from awareness to loyalty. Strategy, execution, creative, and analytics tied together.',
        icon: <Activity className="w-5 h-5 text-brand-accent" />,
        tags: ['Strategy', 'Execution', 'Creative', 'Analytics'],
        cta: 'Explore →',
        href: '/services/marketing-strategy-audit',
    },
];

export default function ServicesOverview() {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} className="bg-brand-darker py-24 sm:py-32 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className={`mb-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-brand-accent mb-3">
                        What we do
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                        Services built for <span className="gradient-text font-display">growth.</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-md leading-relaxed">
                        From performance marketing to AI automation, we offer a full stack of services designed to scale your business.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className={inView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.1s' }}>
                    <BentoGrid items={serviceCards} />
                </div>

                {/* View All Services */}
                <div className={`text-center mt-14 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
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
