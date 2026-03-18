'use client';

import Link from 'next/link';
import { BentoGrid } from '@/components/ui/bento-grid';
import type { BentoItem } from '@/components/ui/bento-grid';
import {
    Search, Share2, Linkedin, Play, Music2, RefreshCw,
    ClipboardCheck, Target, Filter, MousePointerClick, Globe, BarChart3, Mail,
    Wand2, Palette, Film, Video, Users, Layout, FileText,
    Zap, Bot, Code2, GraduationCap,
} from 'lucide-react';

/* ─── Category definitions ─── */
interface ServiceCategory {
    id: string;
    name: string;
    meta: string;
    subtitle: string;
    accentHex: string;
    items: BentoItem[];
}

const categories: ServiceCategory[] = [
    {
        id: 'paid-media',
        name: 'Paid media',
        meta: 'Ads & campaigns',
        subtitle: 'Google, Meta, LinkedIn, TikTok, YouTube ads and retargeting — managed with AI-augmented bidding.',
        accentHex: '#3B82F6',
        items: [
            {
                title: 'Google Ads', meta: 'PPC', icon: <Search className="w-5 h-5 text-brand-accent" />,
                description: 'Full campaign management with AI-powered bidding and creative testing for Search, Shopping, and Performance Max.',
                tags: ['PPC', 'Shopping', 'PMax'], cta: 'Explore →', href: '/services/google-ads',
            },
            {
                title: 'Meta Ads', meta: 'Social', icon: <Share2 className="w-5 h-5 text-brand-accent" />,
                description: 'Full-funnel campaigns across Facebook and Instagram with AI-powered audience targeting and creative testing.',
                tags: ['Social', 'Conversions'], cta: 'Explore →', href: '/services/meta-ads',
            },
            {
                title: 'LinkedIn Ads', meta: 'B2B', icon: <Linkedin className="w-5 h-5 text-brand-accent" />,
                description: 'Account-based campaigns targeting decision-makers with Sponsored Content, InMail, and lead gen forms.',
                tags: ['B2B', 'Pipeline'], cta: 'Explore →', href: '/services/linkedin-ads',
            },
            {
                title: 'YouTube Ads', meta: 'Video', icon: <Play className="w-5 h-5 text-brand-accent" />,
                description: 'TrueView and Video Action campaigns driving awareness, consideration, and conversions at scale.',
                tags: ['Video', 'Awareness'], cta: 'Explore →', href: '/services/youtube-ads',
            },
            {
                title: 'TikTok Ads', meta: 'Short-form', icon: <Music2 className="w-5 h-5 text-brand-accent" />,
                description: 'Spark Ads and Shopping campaigns for Gen Z and millennial audiences using trending content formats.',
                tags: ['GenZ', 'Short-form'], cta: 'Explore →', href: '/services/tiktok-ads',
            },
            {
                title: 'Retargeting', meta: 'Recovery', icon: <RefreshCw className="w-5 h-5 text-brand-accent" />,
                description: 'Dynamic retargeting across Meta, Google, and display networks to recover lost visitors and cart abandoners.',
                tags: ['Recovery', 'ROAS'], cta: 'Explore →', href: '/services/retargeting',
            },
        ],
    },
    {
        id: 'growth-engine',
        name: 'Growth engine',
        meta: 'Strategy & pipeline',
        subtitle: 'Strategy audits, lead gen, funnel building, CRO, programmatic SEO, analytics, and lifecycle marketing.',
        accentHex: '#10B981',
        items: [
            {
                title: 'Strategy Audit', meta: 'Assessment', icon: <ClipboardCheck className="w-5 h-5 text-brand-accent" />,
                description: 'Comprehensive audit of your marketing stack, funnel, conversion paths, and growth opportunities.',
                tags: ['Audit', 'Strategy'], cta: 'Explore →', href: '/services/marketing-strategy-audit',
            },
            {
                title: 'Lead Generation', meta: 'Pipeline', icon: <Target className="w-5 h-5 text-brand-accent" />,
                description: 'Predictable pipeline through multi-channel lead gen across paid, organic, and outbound.',
                tags: ['Leads', 'Pipeline'], cta: 'Explore →', href: '/services/lead-generation',
            },
            {
                title: 'Funnel Building', meta: 'Conversion', icon: <Filter className="w-5 h-5 text-brand-accent" />,
                description: 'Landing pages, email sequences, and conversion paths designed to move leads through your funnel.',
                tags: ['Funnels', 'Conversion'], cta: 'Explore →', href: '/services/funnel-building',
            },
            {
                title: 'CRO', meta: 'Optimization', icon: <MousePointerClick className="w-5 h-5 text-brand-accent" />,
                description: 'A/B testing, heatmap analysis, and conversion optimization to improve every step of your funnel.',
                tags: ['Testing', 'Optimization'], cta: 'Explore →', href: '/services/cro',
            },
            {
                title: 'Programmatic SEO', meta: 'Organic', icon: <Globe className="w-5 h-5 text-brand-accent" />,
                description: 'Hundreds of keyword-optimized pages at scale. AI Engine Optimization for LLM search.',
                tags: ['SEO', 'AEO'], cta: 'Explore →', href: '/services/programmatic-seo',
            },
            {
                title: 'Analytics & Reporting', meta: 'Data', icon: <BarChart3 className="w-5 h-5 text-brand-accent" />,
                description: 'Custom dashboards, attribution modeling, and data-driven insights tied to business outcomes.',
                tags: ['Data', 'Attribution'], cta: 'Explore →', href: '/services/analytics-reporting',
            },
            {
                title: 'Email & Lifecycle', meta: 'Retention', icon: <Mail className="w-5 h-5 text-brand-accent" />,
                description: 'Automated email sequences, segmentation, and lifecycle campaigns to nurture and retain customers.',
                tags: ['Email', 'Retention'], cta: 'Explore →', href: '/services/email-lifecycle',
            },
        ],
    },
    {
        id: 'creative-studio',
        name: 'Creative studio',
        meta: 'Content & assets',
        subtitle: 'Brand videos, reels, AI creatives, UGC, landing pages, content strategy, and pitch decks.',
        accentHex: '#A855F7',
        items: [
            {
                title: 'AI Creative & Design', meta: 'AI', icon: <Wand2 className="w-5 h-5 text-brand-accent" />,
                description: 'AI-generated ad creatives, brand assets, and design systems that maintain consistency at scale.',
                tags: ['AI', 'Design'], cta: 'Explore →', href: '/services/ai-creative-design',
            },
            {
                title: 'Creative Direction', meta: 'Strategy', icon: <Palette className="w-5 h-5 text-brand-accent" />,
                description: 'Strategic creative direction for campaigns across all channels and formats.',
                tags: ['Strategy', 'Brand'], cta: 'Explore →', href: '/services/creative-design',
            },
            {
                title: 'Reels & Shorts', meta: 'Short-form', icon: <Film className="w-5 h-5 text-brand-accent" />,
                description: 'Short-form video production for Instagram Reels, TikTok, and YouTube Shorts.',
                tags: ['Short-form', 'Social'], cta: 'Explore →', href: '/services/reels-editing',
            },
            {
                title: 'Brand Videos', meta: 'Production', icon: <Video className="w-5 h-5 text-brand-accent" />,
                description: 'Full-production brand videos, testimonials, product demos, and explainer content.',
                tags: ['Video', 'Production'], cta: 'Explore →', href: '/services/brand-videos',
            },
            {
                title: 'UGC Ads', meta: 'Authentic', icon: <Users className="w-5 h-5 text-brand-accent" />,
                description: 'User-generated content style ads that feel native to social feeds and drive higher engagement.',
                tags: ['UGC', 'Authentic'], cta: 'Explore →', href: '/services/ugc-ads',
            },
            {
                title: 'Landing Pages', meta: 'Conversion', icon: <Layout className="w-5 h-5 text-brand-accent" />,
                description: 'High-converting landing pages designed for specific campaigns, offers, and audiences.',
                tags: ['Landing', 'Conversion'], cta: 'Explore →', href: '/services/landing-pages',
            },
            {
                title: 'Content Strategy', meta: 'Editorial', icon: <FileText className="w-5 h-5 text-brand-accent" />,
                description: 'Editorial calendars, content pillars, and distribution strategies tied to business goals.',
                tags: ['Content', 'Editorial'], cta: 'Explore →', href: '/services/content-strategy',
            },
        ],
    },
    {
        id: 'ai-build',
        name: 'AI & build',
        meta: 'Tech & automation',
        subtitle: 'AI automation, custom agents, web apps & MVPs, and hands-on AI workshops for teams.',
        accentHex: '#0EA5E9',
        items: [
            {
                title: 'AI Automation', meta: 'Workflows', icon: <Zap className="w-5 h-5 text-brand-accent" />,
                description: 'Custom marketing automation, n8n workflows, CRM integrations, and AI-powered systems that save hours.',
                tags: ['Automation', 'n8n'], cta: 'Explore →', href: '/services/ai-automation',
            },
            {
                title: 'AI Agents', meta: 'Custom AI', icon: <Bot className="w-5 h-5 text-brand-accent" />,
                description: 'Custom-built AI agents for customer support, lead qualification, content generation, and data analysis.',
                tags: ['Agents', 'AI'], cta: 'Explore →', href: '/services/ai-agents',
            },
            {
                title: 'Web Apps & MVPs', meta: 'Development', icon: <Code2 className="w-5 h-5 text-brand-accent" />,
                description: 'From idea to working prototype in 2 weeks. Next.js, AI-native tools, and rapid deployment on Vercel.',
                tags: ['MVP', 'Next.js'], cta: 'Explore →', href: '/services/no-code-development',
            },
            {
                title: 'AI Workshops', meta: 'Training', icon: <GraduationCap className="w-5 h-5 text-brand-accent" />,
                description: 'Hands-on training for marketing teams on AI tools, prompt engineering, and AI-powered workflows.',
                tags: ['Training', 'Upskilling'], cta: 'Explore →', href: '/services/ai-workshops',
            },
        ],
    },
];

/* ─── Category Section Component ─── */
function CategorySection({ category }: { category: ServiceCategory }) {
    return (
        <section id={category.id} className="py-12 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Category header with accent bar */}
                <div className="mb-6">
                    <div className="flex items-baseline gap-2.5 mb-1">
                        <div
                            className="w-[3px] h-4 rounded-sm shrink-0 self-center"
                            style={{ background: category.accentHex }}
                        />
                        <h2 className="text-2xl font-medium text-brand-white">{category.name}</h2>
                        <span className="text-[13px] text-brand-gray-dark">{category.meta}</span>
                    </div>
                    <p className="text-sm text-brand-gray max-w-[500px] ml-[15px]">{category.subtitle}</p>
                </div>

                <BentoGrid items={category.items} />
            </div>
        </section>
    );
}

/* ─── Main Page Component ─── */
export default function ServicesHubClient() {
    return (
        <main className="bg-brand-dark text-brand-white">

            {/* ─── Hero ─── */}
            <section className="pt-32 pb-12 sm:pb-16 text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-4">
                        Our Services
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Services built for <span className="font-display italic font-normal">growth.</span>
                    </h1>
                    <p className="text-sm text-brand-gray max-w-[500px] mx-auto mb-8 leading-relaxed">
                        From performance marketing to AI automation — a full stack of services designed to scale your business.
                    </p>
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-6 py-3 cta-primary text-white font-semibold rounded-lg text-sm"
                    >
                        Book a Strategy Call
                    </a>
                </div>
            </section>

            {/* ─── Category Sections ─── */}
            {categories.map((cat, i) => (
                <div key={cat.id}>
                    {i > 0 && (
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="h-px bg-brand-border-subtle" />
                        </div>
                    )}
                    <CategorySection category={cat} />
                </div>
            ))}

            {/* ─── Final CTA ─── */}
            <section className="py-20 sm:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/8 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Not sure where to <span className="font-display italic font-normal">start?</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-lg mx-auto mb-8 leading-relaxed">
                        Book a free 15-minute strategy call. We&apos;ll review your current marketing and identify opportunities for growth.
                    </p>
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-8 py-3.5 cta-primary text-white font-semibold rounded-lg text-sm"
                    >
                        Book a Strategy Call
                    </a>
                </div>
            </section>
        </main>
    );
}
