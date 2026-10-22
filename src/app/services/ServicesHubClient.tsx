'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '@/app/styles/services.css';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

/* ─── Category definitions ─── */
interface HubService {
    title: string;
    /** short label shown in the index row's tag column */
    meta: string;
    description: string;
    href: string;
}

interface ServiceCategory {
    id: string;
    name: string;
    meta: string;
    pillarHref?: string;
    items: HubService[];
}

// Copy, tags and counts follow the "Services Page B — Light Index" frame in
// the Claude Design board (Ayush picked this format on 22 Oct).
const categories: ServiceCategory[] = [
    {
        id: 'performance-marketing',
        name: 'Performance Marketing',
        meta: '6 Platforms',
        pillarHref: '/services/performance-marketing',
        items: [
            { title: 'Google Ads', meta: 'PPC', href: '/services/google-ads',
                description: 'AI-powered bidding and creative testing for Search, Shopping, and Performance Max.' },
            { title: 'Meta Ads', meta: 'Social', href: '/services/meta-ads',
                description: 'Full-funnel Facebook and Instagram campaigns with AI-powered audience targeting.' },
            { title: 'LinkedIn Ads', meta: 'B2B', href: '/services/linkedin-ads',
                description: 'Account-based campaigns with Sponsored Content, InMail, and lead gen forms.' },
            { title: 'YouTube Ads', meta: 'Video', href: '/services/youtube-ads',
                description: 'TrueView and Video Action campaigns for awareness through conversion.' },
            { title: 'TikTok Ads', meta: 'Short-Form', href: '/services/tiktok-ads',
                description: 'Spark Ads and Shopping campaigns for Gen Z and millennial audiences.' },
            { title: 'Retargeting', meta: 'Recovery', href: '/services/retargeting',
                description: 'Dynamic retargeting across Meta, Google, and display to recover lost visitors.' },
        ],
    },
    {
        id: 'growth-marketing',
        name: 'Growth Marketing',
        meta: '9 Services',
        pillarHref: '/services/growth-marketing',
        items: [
            { title: 'Strategy Audit', meta: 'Assessment', href: '/services/marketing-strategy-audit',
                description: 'Comprehensive audit of your stack, funnel, conversion paths, and opportunities.' },
            { title: 'Lead Generation', meta: 'Pipeline', href: '/services/lead-generation',
                description: 'Predictable pipeline through multi-channel lead gen across paid, organic, and outbound.' },
            { title: 'Funnel Building', meta: 'Conversion', href: '/services/funnel-building',
                description: 'Landing pages, email sequences, and conversion paths that move leads forward.' },
            { title: 'CRO', meta: 'Optimization', href: '/services/cro',
                description: 'A/B testing, heatmap analysis, and conversion optimization across the funnel.' },
            { title: 'Programmatic SEO', meta: 'Organic', href: '/services/programmatic-seo',
                description: 'Keyword-optimized pages at scale, plus AI Engine Optimization for LLM search.' },
            { title: 'Analytics & Reporting', meta: 'Data', href: '/services/analytics-reporting',
                description: 'Custom dashboards and attribution modeling tied to business outcomes.' },
            { title: 'Email & Lifecycle', meta: 'Retention', href: '/services/email-lifecycle',
                description: 'Automated sequences, segmentation, and lifecycle campaigns that retain customers.' },
            { title: 'Content Strategy', meta: 'Editorial', href: '/services/content-strategy',
                description: 'Editorial calendars, content pillars, and distribution tied to business goals.' },
            { title: 'Landing Pages', meta: 'Conversion', href: '/services/landing-pages',
                description: 'High-converting pages for specific campaigns, offers, and audiences.' },
        ],
    },
    {
        id: 'creative-services',
        name: 'Creative Services',
        meta: '6 Services',
        pillarHref: '/services/creative-services',
        items: [
            { title: 'AI Creative & Design', meta: 'AI', href: '/services/ai-creative-design',
                description: 'AI-generated ad creatives, brand assets, and design systems consistent at scale.' },
            { title: 'Creative Direction', meta: 'Strategy', href: '/services/creative-design',
                description: 'Strategic creative direction for campaigns across all channels and formats.' },
            { title: 'Reels & Shorts', meta: 'Short-Form', href: '/services/reels-editing',
                description: 'Short-form video production for Instagram Reels, TikTok, and YouTube Shorts.' },
            { title: 'Brand Videos', meta: 'Production', href: '/services/brand-videos',
                description: 'Full-production brand videos, testimonials, product demos, and explainers.' },
            { title: 'UGC Ads', meta: 'Authentic', href: '/services/ugc-ads',
                description: 'User-generated style ads that feel native to social feeds and drive engagement.' },
            { title: 'Pitch Decks', meta: 'Presentations', href: '/services/pitch-decks',
                description: 'Investor-ready decks and sales presentations that win meetings and close deals.' },
        ],
    },
    {
        id: 'ai-automation',
        name: 'AI Marketing & Automation',
        meta: '5 Services',
        pillarHref: '/services/ai-marketing-automation',
        items: [
            { title: 'AI Automation', meta: 'Workflows', href: '/services/ai-automation',
                description: 'Marketing automation, n8n workflows, CRM integrations, and systems that save hours.' },
            { title: 'AI Agents', meta: 'Custom AI', href: '/services/ai-agents',
                description: 'Custom agents for support, lead qualification, content generation, and analysis.' },
            { title: 'AI Chatbots', meta: 'Conversational', href: '/services/ai-chatbots',
                description: 'Chatbots for support, lead qualification, and sales — trained on your data.' },
            { title: 'Web Apps & MVPs', meta: 'Development', href: '/services/no-code-development',
                description: 'Idea to working prototype in 2 weeks. Next.js, AI-native tools, Vercel.' },
            { title: 'AI Workshops', meta: 'Training', href: '/services/ai-workshops',
                description: 'Hands-on training for teams on AI tools, prompting, and AI-powered workflows.' },
        ],
    },
    {
        id: 'verticals',
        name: 'Industry Verticals',
        meta: '7 Verticals',
        items: [
            { title: 'Book & Author Marketing', meta: 'Publishing', href: '/services/book-marketing',
                description: 'Launch campaigns, Amazon optimization, and audience building for authors.' },
            { title: 'Education & EdTech', meta: 'Education', href: '/services/education-marketing',
                description: 'Student acquisition, enrollment funnels, and brand positioning for education.' },
            { title: 'Real Estate Marketing', meta: 'Property', href: '/services/real-estate-marketing',
                description: 'Lead generation, virtual tours, and digital campaigns for real estate.' },
            { title: 'D2C & E-commerce', meta: 'Commerce', href: '/services/d2c-ecommerce-marketing',
                description: 'Performance campaigns, retention strategies, and scaling for D2C brands.' },
            { title: 'EdTech Marketing', meta: 'EdTech', href: '/services/edtech-marketing',
                description: 'Growth marketing, user acquisition, and product-led strategies for EdTech.' },
            { title: 'SaaS Marketing', meta: 'SaaS', href: '/services/saas-marketing',
                description: 'Demand generation, product-led growth, and pipeline acceleration for SaaS.' },
            { title: 'Podcast Marketing', meta: 'Audio', href: '/services/podcast-marketing',
                description: 'Discoverability-first growth: episode SEO, repurposing, and guest scheduling.' },
        ],
    },
    {
        id: 'full-funnel',
        name: 'Full Funnel Marketing',
        meta: 'End-to-End',
        items: [
            { title: 'Full Funnel Marketing', meta: 'End-to-End', href: '/categories/full-funnel-marketing',
                description: 'Awareness to loyalty — strategy, execution, creative, and analytics together.' },
        ],
    },
];

const totalServices = categories.reduce((n, c) => n + c.items.length, 0);

const pad2 = (n: number) => String(n).padStart(2, '0');

/* ─── Category block: numbered head + index rows (Light Index frame) ─── */
function CategoryIndex({ category, index }: { category: ServiceCategory; index: number }) {
    return (
        <section id={category.id} className="svh-cat" aria-labelledby={`${category.id}-title`}>
            <div className="shead2">
                <span className="idx">{pad2(index + 1)}</span>
                <h2 id={`${category.id}-title`}>
                    {category.pillarHref ? <Link href={category.pillarHref}>{category.name}</Link> : category.name}
                </h2>
                <span className="cnt">{category.meta}</span>
            </div>
            <div className="sindex gs">
                {category.items.map((item) => (
                    <Link key={item.href} href={item.href} className="srow">
                        <span className="tag">{item.meta}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span className="arr" aria-hidden="true">→</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

/* ─── Main Page Component ─── */
export default function ServicesHubClient() {
    // Handle hash scroll on navigation
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, []);

    return (
        <div className="svh">

            {/* ─── Hero ─── */}
            <section className="wrap svh-hero">
                <span className="k">— What We Do —</span>
                <h1 className="fd svh-h1">
                    Services built<br /> for <em>growth.</em>
                </h1>
                <p className="lede">
                    From performance marketing to AI automation, we offer a full stack of services designed to scale your business. Every service, one index.
                </p>
            </section>

            {/* ─── Service index, one block per category ─── */}
            <div className="wrap svh-index">
                {categories.map((cat, i) => (
                    <CategoryIndex key={cat.id} category={cat} index={i} />
                ))}

                <div className="svh-foot">
                    <span className="mininote">{totalServices} services · {categories.length} categories · one team</span>
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn sm">
                        Book a Strategy Call →
                    </a>
                </div>
            </div>

            {/* ─── Final CTA ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="ctabox gridbg rv">
                        <h2>
                            Not sure where to <em className="acc-em">start?</em>
                        </h2>
                        <p>
                            Book a free 15-minute strategy call. We&apos;ll review your current marketing and identify opportunities for growth.
                        </p>
                        <div className="btnrow">
                            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn">
                                Book a Strategy Call →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
