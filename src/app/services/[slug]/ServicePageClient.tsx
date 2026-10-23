'use client';

import { useState, useEffect, useRef, useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceData } from '@/data/servicePages';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { LogoMarquee } from '@/components/sections/TrustStrip';
import { HoneypotField, useSpamGuard } from '@/components/SpamGuard';
import { usePostHog } from 'posthog-js/react';
import type { LucideIcon } from 'lucide-react';
import {
    Sparkles, Target, Rocket, PiggyBank, RefreshCw,
    GraduationCap, Building2, ShoppingCart, BadgeDollarSign, TrendingUp,
    FileBarChart, UserCheck, Zap, Layers, FlaskConical,
    Activity, Banknote,
    Search, Share2, ClipboardCheck, Wand2, Code2, BookOpen, Home, Video,
    Megaphone, Pencil, Bot, Brain, Globe, Shield, Clock, Eye, Users,
    MousePointerClick, Star, CheckCircle2,
    Heart, Mic, Scale, ShoppingBag, UtensilsCrossed, Briefcase, Palette,
} from 'lucide-react';
import '@/app/styles/services.css';

// Shown when the server or the network fails (a server error page is not JSON).
const SEND_FAILED = "We couldn't send that just now. Please try again, or email ayush@aureliusmedia.co.";

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

/* ─── Icon mappings ─── */

/** Persona card icons — matched by keyword in persona title */
const personaIconKeywords: [string[], LucideIcon][] = [
    [['growth', 'scale', 'scaling'],       Rocket],
    [['budget', 'cost', 'lean', 'bootstrap'], PiggyBank],
    [['agency', 'fatigued', 'switch', 'burned'], RefreshCw],
    [['first', 'new', 'beginner', 'starting', 'learn'], GraduationCap],
    [['enterprise', 'corporate', 'large'],  Building2],
    [['ecommerce', 'e-commerce', 'shop', 'store', 'retail', 'd2c'], ShoppingCart],
    [['startup', 'founder'],                Rocket],
    [['marketing', 'marketer', 'cmo'],      Megaphone],
    [['author', 'book', 'publisher'],       BookOpen],
    [['real estate', 'property', 'broker'], Home],
    [['saas', 'software', 'tech'],          Code2],
    [['education', 'school', 'university'], GraduationCap],
    [['creator', 'influencer', 'content'],  Video],
    [['brand', 'manager'],                  Star],
];

/** Map icon name strings (from data) to Lucide components */
const iconByName: Record<string, LucideIcon> = {
    Rocket, ShoppingBag, Briefcase, Building2, ShoppingCart,
    GraduationCap, Heart, BookOpen, Mic, Home, Code2,
    Star, Target, Users, Scale, UtensilsCrossed, Video,
    Sparkles, Bot, Brain, Pencil, Wand2, Megaphone, Search,
    Share2, ClipboardCheck, Zap, Eye, Shield,
};

function getPersonaIcon(title: string, iconName?: string): LucideIcon {
    if (iconName && iconByName[iconName]) return iconByName[iconName];
    const lower = title.toLowerCase();
    for (const [keywords, icon] of personaIconKeywords) {
        if (keywords.some((kw) => lower.includes(kw))) return icon;
    }
    return Users;
}

/** Benefit icons — matched by keyword in benefit title */
const benefitIconKeywords: [string[], LucideIcon][] = [
    [['cpa', 'cost per', 'acquisition cost'],  BadgeDollarSign],
    [['roas', 'return on ad', 'roi', 'return'], TrendingUp],
    [['ai', 'artificial', 'machine learning', 'smart'], Sparkles],
    [['report', 'analytics', 'dashboard', 'data', 'insight'], FileBarChart],
    [['strategist', 'dedicated', 'fractional', 'cmo', 'expert'], UserCheck],
    [['speed', 'fast', 'quick', 'rapid', 'turnaround', 'velocity'], Zap],
    [['full-funnel', 'funnel', 'full funnel', 'pipeline'],  Layers],
    [['test', 'a/b', 'experiment', 'optimization', 'creative testing'], FlaskConical],
    [['lead', 'qualified', 'generation'],      Target],
    [['scale', 'growth', 'grow'],              Rocket],
    [['automat', 'workflow', 'efficiency'],    Bot],
    [['brand', 'awareness', 'visibility'],     Eye],
    [['transparent', 'clarity', 'no hidden'],  Shield],
    [['custom', 'tailored', 'personali'],      Palette],
    [['time', 'save', 'hours'],                Clock],
    [['engage', 'click', 'ctr', 'conversion'], MousePointerClick],
    [['content', 'creative', 'design'],        Pencil],
    [['team', 'train', 'upskill', 'workshop'], GraduationCap],
    [['integration', 'connect', 'api'],        Globe],
    [['revenue', 'profit', 'sales', 'money'],  Banknote],
    [['produc', 'mvp', 'launch', 'ship'],      Rocket],
    [['always-on', 'pipeline', '24/7'],        Activity],
];

function getBenefitIcon(title: string): LucideIcon {
    const lower = title.toLowerCase();
    for (const [keywords, icon] of benefitIconKeywords) {
        if (keywords.some((kw) => lower.includes(kw))) return icon;
    }
    return CheckCircle2;
}

/**
 * Split the hero headline so one phrase can be set in the accent colour (the design
 * highlights "Google Ads" in "…Certified Google Ads Experts."). The text itself is
 * never changed: before + accent + after === headline.
 *  1. Two or more sentences → the last sentence.
 *  2. Otherwise the longest leading run of the service title found as whole words.
 *  3. Otherwise the last word.
 */
function splitHeadline(headline: string, title: string): [string, string, string] {
    const boundary = Math.max(headline.lastIndexOf('. '), headline.lastIndexOf('! '), headline.lastIndexOf('? '));
    if (boundary > 0) {
        return [headline.slice(0, boundary + 2), headline.slice(boundary + 2), ''];
    }

    const words = title.split(/\s+/);
    for (let n = words.length; n >= 1; n--) {
        const last = words[n - 1];
        if (last === '&' || last === '—' || last === '-') continue;
        const phrase = words.slice(0, n).join(' ');
        const esc = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const match = new RegExp(`(^|[^\\w-])(${esc})(?![\\w-])`, 'i').exec(headline);
        if (match) {
            const start = match.index + match[1].length;
            const end = start + match[2].length;
            return [headline.slice(0, start), headline.slice(start, end), headline.slice(end)];
        }
    }

    const space = headline.lastIndexOf(' ');
    return space > 0 ? [headline.slice(0, space + 1), headline.slice(space + 1), ''] : ['', headline, ''];
}

/* ─── Per-service testimonial data ─── */
interface ServiceTestimonial {
    name: string;
    role: string;
    avatar: string;
    quote: string;
}

const allTestimonials: Record<string, ServiceTestimonial> = {
    nidhi: {
        name: 'Nidhi Upadhyay',
        role: 'Author, That Night (80,000+ copies sold)',
        avatar: '/testimonials/Nidhi.avif',
        quote: 'When I was about to publish my novel, I reached out to Aurelius Media and instantly knew I was in the right hands. Their creative team is hands down one of the best, spreading a huge buzz around my book. They go beyond marketing — they make your story impossible to ignore.',
    },
    karan: {
        name: 'Karan Bajaj',
        role: 'CEO, Whitehat Jr. (exited $300M)',
        avatar: '/testimonials/Karan.avif',
        quote: 'Aurelius Media transformed our digital strategy in just 90 days. They didn\'t just deliver clicks — they delivered customers who were ready to buy. Their data-driven approach eliminated the guesswork from our marketing spend.',
    },
    cameron: {
        name: 'Cameron Hildreth',
        role: 'Brand Manager, Aden + Anais',
        avatar: '/testimonials/Cameron Hildreth.avif',
        quote: 'What impressed me most was their process. Aurelius didn\'t apply a cookie-cutter approach — they took the time to understand our unique challenges and built a custom strategy that delivered results within weeks.',
    },
    tom: {
        name: 'Tom Chalmers',
        role: 'CEO, New Generation Publishing',
        avatar: '/testimonials/Tom.avif',
        quote: 'Working with the Aurelius team gave us the clarity we needed. They cut through the digital marketing noise and built us a system that consistently generates qualified leads. Our sales team can\'t thank them enough.',
    },
    ira: {
        name: 'Ira Trivedi',
        role: 'Author & Wellness Expert, TEDx Speaker',
        avatar: '/testimonials/Ira Trivedi.avif',
        quote: 'Aurelius Media understood exactly what my brand needed. They combined creative storytelling with performance-driven campaigns in a way I\'d never seen before. The results were beyond what I expected.',
    },
    arjun: {
        name: 'Arjun Mehra',
        role: 'Founder, D2C Brand',
        avatar: '/testimonials/arjun-mehra.png',
        quote: 'The AI creative workflow Aurelius built for us cut our production time by 80%. We went from testing 3 ad variants a month to 30. The speed and quality are unmatched.',
    },
    priya: {
        name: 'Priya Nair',
        role: 'CMO, Lifestyle Brand',
        avatar: '/testimonials/priya-nair.png',
        quote: 'Our Reels went from getting a few hundred views to consistently hitting 50K+. The Aurelius team understands what stops the scroll. Their hook-first editing approach transformed our short-form content strategy.',
    },
    james: {
        name: 'James Hartley',
        role: 'Director, Digital Products',
        avatar: '/testimonials/james-hartley.png',
        quote: 'We needed a working MVP in two weeks and Aurelius delivered. The tool they built handles our entire lead qualification process and it was live before our funding round closed. Incredible speed.',
    },
    sara: {
        name: 'Sara Khan',
        role: 'Head of Marketing, Real Estate Group',
        avatar: '/testimonials/sara-khan.png',
        quote: 'Aurelius built a lead engine that delivers 40+ qualified buyer inquiries every week. The geo-targeting and lead scoring are incredibly precise. Our sales team finally has a predictable pipeline.',
    },
};

const serviceTestimonialKeys: Record<string, string[]> = {
    'book-marketing': ['nidhi', 'tom', 'ira'],
    'podcast-marketing': ['karan', 'tom', 'cameron'],
    'education-marketing': ['karan', 'cameron', 'tom'],
    'google-ads': ['cameron', 'karan', 'tom'],
    'meta-ads': ['cameron', 'arjun', 'priya'],
    'marketing-strategy-audit': ['tom', 'karan', 'cameron'],
    'creative-design': ['ira', 'arjun', 'priya'],
    'ai-creative-design': ['arjun', 'cameron', 'ira'],
    'reels-editing': ['priya', 'ira', 'arjun'],
    'ai-automation': ['arjun', 'james', 'karan'],
    'no-code-development': ['james', 'arjun', 'karan'],
    'ai-workshops': ['priya', 'karan', 'arjun'],
    'real-estate-marketing': ['sara', 'cameron', 'tom'],
    'real-estate-marketing-dubai': ['sara', 'cameron', 'tom'],
};

/* ─── Common FAQ questions (appended to each service's FAQs) ─── */
function getCommonFAQs(serviceTitle: string) {
    return [
        {
            question: `How much does ${serviceTitle.toLowerCase()} cost?`,
            answer: `Pricing depends on your scope, goals, and campaign complexity. We offer transparent pricing with no hidden fees. Book a free strategy call and we will provide a custom quote tailored to your business.`,
        },
        {
            question: 'How long until I see results?',
            answer: 'Initial improvements typically appear within 2–4 weeks. Meaningful ROI compounds over 60–90 days as our AI optimization learns and adapts. You will receive weekly performance reports from day one.',
        },
        {
            question: `What's included in the ${serviceTitle.toLowerCase()} service?`,
            answer: 'Our service includes campaign setup, strategy development, creative production, bid management, A/B testing, conversion tracking, monthly strategy calls, and transparent performance reporting.',
        },
        {
            question: 'What is the minimum commitment?',
            answer: 'We recommend a 3-month initial engagement for meaningful results. After the initial period, we move to month-to-month with 30 days notice to cancel. No long-term lock-in contracts.',
        },
        {
            question: 'Do you work with my industry?',
            answer: 'We have worked with 150+ clients across 25+ countries — eCommerce, SaaS, education, real estate, healthcare, authors, and more. We will share relevant case studies on your strategy call.',
        },
        {
            question: 'How is Aurelius Media different from other agencies?',
            answer: 'Three things set us apart: (1) Fractional CMO model — you get senior strategists, not junior account managers. (2) AI-native workflows for bid management, creative testing, and reporting. (3) Google Partner certified with 20+ years of collective experience and $50M+ in ad spend managed.',
        },
    ];
}

/* ─── Industry dropdown options ─── */
const industryOptions = [
    'eCommerce',
    'SaaS',
    'Education',
    'Real Estate',
    'Health & Wellness',
    'Authors',
    'Other',
];

const budgetOptions = [
    'Under $1,000/month',
    '$1,000 – $5,000/month',
    '$5,000 – $20,000/month',
    '$20,000+/month',
];

/* ─── WhatsApp number (update with real number) ─── */
const WHATSAPP_NUMBER = '919717755053';

const pad2 = (n: number) => String(n).padStart(2, '0');

interface Props {
    service: ServiceData;
    relatedServices: ServiceData[];
    /** "From the Blog" section, rendered on the server (see RelatedArticles.tsx) */
    relatedArticles?: ReactNode;
    /** Case studies for this service, rendered on the server (see RelatedCaseStudies.tsx) */
    relatedCaseStudies?: ReactNode;
}

export default function ServicePageClient({ service, relatedServices, relatedArticles = null, relatedCaseStudies = null }: Props) {
    const posthog = usePostHog();
    const formId = useId();

    useEffect(() => {
        posthog?.capture('service_page_viewed', { service: service.title, slug: service.slug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const finalCtaSectionRef = useRef<HTMLElement>(null);

    /* ─── Testimonials ─── */
    const testimonialKeys = serviceTestimonialKeys[service.slug] || ['tom', 'karan', 'cameron'];
    const testimonials = testimonialKeys.map((key) => allTestimonials[key]);

    /* ─── Combined FAQs (service-specific + common) ─── */
    const existingQuestions = new Set(service.faqs.map((f) => f.question.toLowerCase()));
    const commonFAQs = getCommonFAQs(service.title).filter(
        (faq) => !existingQuestions.has(faq.question.toLowerCase())
    );
    const allFaqs = [...service.faqs, ...commonFAQs];

    /* ─── AI comparison row (appended to service rows) ─── */
    const comparisonRowsWithAI = service.comparisonRows
        ? [
            ...service.comparisonRows,
            { others: 'Manual processes, basic rules-based bidding', us: 'AI-powered bid management, automated creative testing, real-time optimization' },
        ]
        : undefined;

    const [headBefore, headAccent, headAfter] = splitHeadline(service.headline, service.title);

    /* ─── Hero form state ─── */
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', industry: '', budget: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const { website, setWebsite, spamFields } = useSpamGuard();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    source: 'service_hero' as const,
                    service_interest: service.slug,
                    ...spamFields,
                }),
            });

            if (!res.ok) {
                // the server's own message when it sent one; never a raw parse error
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || SEND_FAILED);
            }

            setFormSubmitted(true);
            setTimeout(() => {
                window.open(CAL_URL, '_blank');
            }, 500);
        } catch (err) {
            setFormError(err instanceof Error && !(err instanceof TypeError) ? err.message : SEND_FAILED);
        } finally {
            setFormLoading(false);
        }
    };

    /* ─── WhatsApp floating CTA: show after 30% scroll, hide at top and when final CTA in view ─── */
    const [showWhatsApp, setShowWhatsApp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const finalCta = finalCtaSectionRef.current;
            let ctaInViewport = false;
            if (finalCta) {
                const rect = finalCta.getBoundingClientRect();
                ctaInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            }
            setShowWhatsApp(scrollPercent > 0.3 && !ctaInViewport);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const results = service.resultHighlights ?? [];
    const relatedCols = relatedServices.length === 4 ? 'sgrid two svc-fill2' : 'sgrid svc-fill3';

    return (
        <div className="svd">

            {/* ─── 1. HERO + LEAD CAPTURE FORM ─── */}
            <section className="sec svd-hero">
                <div className="wrap">
                    <nav className="crumb" aria-label="Breadcrumb">
                        <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span aria-current="page">{service.title}</span>
                    </nav>

                    <div className="svd-hgrid">
                        {/* Left: H1 + description + value props + secondary CTAs */}
                        <div>
                            <span className="k"><span aria-hidden="true">● </span>{service.categoryLabel}</span>

                            <h1 className="fd svd-h1">
                                {headBefore}<em>{headAccent}</em>{headAfter}
                            </h1>

                            <p className="lede">{service.description}</p>

                            {/* Value props — the first three benefits */}
                            {service.benefits && service.benefits.length > 0 && (
                                <div className="bullets">
                                    {service.benefits.slice(0, 3).map((benefit, i) => (
                                        <div key={i}>
                                            <span className="ck" aria-hidden="true">✓</span>
                                            <span>{benefit.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="btnrow">
                                <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn">
                                    Book a Strategy Call →
                                </a>
                                <Link href="/contact" className="btn ghost">
                                    Get a Free Proposal
                                </Link>
                            </div>
                        </div>

                        {/* Right: Lead capture form card */}
                        <div className="paper-card">
                            {formSubmitted ? (
                                <div className="svd-done" role="status">
                                    <div className="tick" aria-hidden="true">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="square" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="svd-done-h">You&apos;re all set!</p>
                                    <p>Redirecting you to book your strategy call...</p>
                                </div>
                            ) : (
                                <>
                                    <h3>
                                        We use <span style={{ color: 'var(--acc-paper)' }}>AI-Driven</span> {service.title} Strategies
                                    </h3>
                                    <p className="fnote" style={{ margin: '10px 0 22px' }}>
                                        Get your free strategy call and discover how to scale your growth.
                                    </p>

                                    <form onSubmit={handleFormSubmit} className="svd-form">
                                        <HoneypotField value={website} onChange={setWebsite} />
                                        <div className="fld">
                                            <label htmlFor={`${formId}-name`}>Your Name *</label>
                                            <input
                                                id={`${formId}-name`}
                                                type="text"
                                                required
                                                autoComplete="name"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="fld">
                                            <label htmlFor={`${formId}-email`}>Work Email *</label>
                                            <input
                                                id={`${formId}-email`}
                                                type="email"
                                                required
                                                autoComplete="email"
                                                placeholder="you@company.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="fld">
                                            <label htmlFor={`${formId}-phone`}>Phone (+91) *</label>
                                            <input
                                                id={`${formId}-phone`}
                                                type="tel"
                                                required
                                                autoComplete="tel"
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="fld">
                                            <label htmlFor={`${formId}-industry`}>Industry *</label>
                                            <select
                                                id={`${formId}-industry`}
                                                required
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            >
                                                <option value="" disabled>Select industry...</option>
                                                {industryOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="fld">
                                            <label htmlFor={`${formId}-budget`}>Budget Range (optional)</label>
                                            <select
                                                id={`${formId}-budget`}
                                                value={formData.budget}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            >
                                                <option value="">Select budget...</option>
                                                {budgetOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {formError && (
                                            <p className="formmsg err" role="alert">{formError}</p>
                                        )}
                                        <button type="submit" disabled={formLoading} className="btn">
                                            {formLoading ? 'Sending...' : 'Get My Free Audit'}
                                        </button>
                                        <span className="fnote">No commitment required · Response within 2 hours</span>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ─── 2. SOCIAL PROOF BAR ─── */}
                    <div className="svd-trust" aria-label="Clients">
                        <p className="m10">You&apos;re in good hands</p>
                        <LogoMarquee />
                    </div>
                </div>
            </section>

            {/* ─── 3. WHAT IS [SERVICE] ─── */}
            {service.whatIs && (
                <section className="sec">
                    <div className="wrap svd-over rv">
                        <span className="k">— Overview —</span>
                        <h2 className="fd">
                            What is <em>{service.title}?</em>
                        </h2>
                        <p>{service.whatIs}</p>
                    </div>
                </section>
            )}

            {/* ─── 4. WHO IS THIS FOR (2×2 grid + catch-all line) ─── */}
            {service.personas && service.personas.length > 0 && (
                <section className="sec">
                    <div className="wrap">
                        <div className="shead rv">
                            <div>
                                <span className="k">— Who This Is For —</span>
                                <h2>
                                    Built for teams that are <em className="acc-em">ready to grow.</em>
                                </h2>
                            </div>
                        </div>
                        <div className="bgrid two gs svc-fill2">
                            {service.personas.slice(0, 4).map((persona, i) => {
                                const PersonaIcon = getPersonaIcon(persona.title, persona.icon);
                                return (
                                    <div key={i} className="bcell">
                                        <div className="ic">
                                            <PersonaIcon strokeWidth={1.5} aria-hidden="true" />
                                        </div>
                                        <h3>{persona.title}</h3>
                                        <p>{persona.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                        {service.catchAllText && (
                            <p className="svd-catch rv">{service.catchAllText}</p>
                        )}
                    </div>
                </section>
            )}

            {/* ─── 5. THE PROBLEM — Removed per V2 audit (pain already established in hero subtitle) ─── */}

            {/* ─── 6. HOW WE DO IT ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="shead rv">
                        <div>
                            <span className="k">— Our Process —</span>
                            <h2>
                                How we <em className="acc-em">deliver.</em>
                            </h2>
                        </div>
                        <p>{service.approach}</p>
                    </div>
                    <div className="proc gs svc-fill3">
                        {service.approachPoints.map((point, i) => (
                            <div key={i} className="pstep">
                                <span className="pn" aria-hidden="true">{pad2(i + 1)}</span>
                                <p>{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 7. BENEFITS ─── */}
            {service.benefits && service.benefits.length > 0 && (
                <section className="sec">
                    <div className="wrap">
                        <div className="shead rv">
                            <div>
                                <span className="k">— Benefits —</span>
                                <h2>
                                    Why it <em className="acc-em">matters.</em>
                                </h2>
                            </div>
                        </div>
                        <div className="bgrid gs svc-fill3">
                            {service.benefits.map((benefit, i) => {
                                const BenefitIcon = getBenefitIcon(benefit.title);
                                return (
                                    <div key={i} className="bcell">
                                        <div className="ic">
                                            <BenefitIcon strokeWidth={1.5} aria-hidden="true" />
                                        </div>
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 8. SUB-SERVICES / WHAT'S INCLUDED ─── */}
            {service.subServices && service.subServices.length > 0 ? (
                <section className="sec">
                    <div className="wrap">
                        <div className="shead rv">
                            <div>
                                <span className="k">— Services Included —</span>
                                <h2>
                                    What&apos;s <em className="acc-em">included.</em>
                                </h2>
                            </div>
                        </div>
                        <div className="sgrid gs svc-fill3">
                            {service.subServices.map((sub, i) => (
                                <Link
                                    key={i}
                                    href={sub.slug
                                        ? `/services/${sub.slug}`
                                        : `/services/${service.slug}#${sub.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="scard"
                                >
                                    <span className="tag">{pad2(i + 1)}</span>
                                    <h3>{sub.title}</h3>
                                    <p>{sub.description}</p>
                                    <span className="go">Learn More →</span>
                                </Link>
                            ))}
                        </div>
                        <div className="svd-center">
                            <Link href="/contact" className="btn">
                                Get a Custom Proposal →
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="sec">
                    <div className="wrap">
                        <div className="shead rv">
                            <div>
                                <span className="k">— Deliverables —</span>
                                <h2>
                                    What&apos;s <em className="acc-em">included.</em>
                                </h2>
                            </div>
                        </div>
                        <div className="bgrid gs svc-fill3">
                            {service.deliverables.map((item, i) => (
                                <div key={i} className="svd-dcell">
                                    <span className="ck" aria-hidden="true">✓</span>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="svd-center">
                            <Link href="/contact" className="btn">
                                Get a Custom Proposal →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 9. COMPARISON (with AI/automation row appended) ─── */}
            {comparisonRowsWithAI && comparisonRowsWithAI.length > 0 && (
                <section className="sec">
                    <div className="wrap">
                        <div className="shead rv">
                            <div>
                                <span className="k">— Comparison —</span>
                                <h2>
                                    What sets <em className="acc-em">Aurelius Media</em> apart?
                                </h2>
                            </div>
                        </div>
                        <div className="cmp rv">
                            <div className="col">
                                <h3>Other Agencies</h3>
                                <ul>
                                    {comparisonRowsWithAI.map((row, i) => (
                                        <li key={i}>{row.others}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col us">
                                <p className="cmp-us"><span aria-hidden="true">● </span>Aurelius Media</p>
                                <ul>
                                    {comparisonRowsWithAI.map((row, i) => (
                                        <li key={i}>{row.us}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 10. RESULTS / PROVEN STATS ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="shead rv">
                        <div>
                            <span className="k">— Results —</span>
                            <h2>
                                Proven <em className="acc-em">results.</em>
                            </h2>
                        </div>
                    </div>
                    {results.length > 0 ? (
                        <div className="statband gs" style={{ '--n': Math.min(results.length, 3) } as CSSProperties}>
                            {results.map((result, i) => (
                                <div key={i} className="st">
                                    <b className={result.metric.length > 7 ? 'long' : undefined}>{result.metric}</b>
                                    <p>{result.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="svd-nores rv">
                            We have driven measurable growth for startups and brands across industries. Case study deep-dives coming soon.
                        </p>
                    )}
                </div>
            </section>

            {/* ─── CASE STUDIES (server-rendered slot) ─── */}
            {relatedCaseStudies}

            {/* ─── 11. CLIENT TESTIMONIALS ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="shead rv">
                        <div>
                            <span className="k">— Client Testimonials —</span>
                            <h2>
                                What our clients <em className="acc-em">say.</em>
                            </h2>
                        </div>
                    </div>
                    <div className="receipts gs">
                        {testimonials.map((t, i) => (
                            <figure key={i} className="r">
                                <span className="stars" aria-hidden="true">★★★★★</span>
                                <blockquote>
                                    <p>&ldquo;{t.quote}&rdquo;</p>
                                </blockquote>
                                <figcaption className="attr">
                                    <span className="av">
                                        <Image src={t.avatar} alt={t.name} width={80} height={80} sizes="40px" />
                                    </span>
                                    <div>
                                        <b>{t.name}</b>
                                        <span>{t.role}</span>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 12. FAQ SECTION (service FAQs + common FAQs, first 3 expanded) ─── */}
            <section className="sec">
                <div className="wrap">
                    <FAQAccordion items={allFaqs} defaultOpenCount={3} />
                </div>
            </section>

            {/* ─── 13. RELATED SERVICES ─── */}
            {relatedServices.length > 0 && (
                <section className="sec">
                    <div className="wrap">
                        <div className="shead rv">
                            <div>
                                <span className="k">— Explore More —</span>
                                <h2>
                                    Related <em className="acc-em">services.</em>
                                </h2>
                            </div>
                            <Link href="/services" className="textlink viewall">All services →</Link>
                        </div>
                        <div className={`${relatedCols} gs`}>
                            {relatedServices.map((rel) => (
                                <Link key={rel.slug} href={`/services/${rel.slug}`} className="scard">
                                    <span className="tag">{rel.categoryLabel}</span>
                                    <h3>{rel.title}</h3>
                                    <p>{rel.description}</p>
                                    <span className="go">Learn More →</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── RELATED ARTICLES (server-rendered slot) ─── */}
            {relatedArticles}

            {/* ─── 14. FINAL CTA (inline lead capture form) ─── */}
            <section ref={finalCtaSectionRef} className="sec">
                <div className="wrap">
                    <div className="ctabox rv">
                        <h2>
                            Ready to <em className="acc-em">scale?</em>
                        </h2>
                        <p>
                            Book a 15-minute strategy call to discuss how we can help grow your business with {service.title.toLowerCase()}.
                        </p>

                        {/* Inline form: Name, Email, Phone — horizontal on desktop */}
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                const btn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
                                btn.disabled = true;
                                btn.textContent = 'Sending...';

                                try {
                                    await fetch('/api/leads', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            name: fd.get('name'),
                                            email: fd.get('email'),
                                            phone: fd.get('phone'),
                                            source: 'service_cta',
                                            service_interest: service.slug,
                                            website: fd.get('website'),
                                            form_ts: spamFields.form_ts,
                                        }),
                                    });
                                } catch {
                                    // Best-effort — still open Cal.com
                                }

                                window.open(CAL_URL, '_blank');
                                btn.disabled = false;
                                btn.textContent = 'Get My Free Strategy Call';
                            }}
                            className="svd-ctaform"
                        >
                            <HoneypotField />
                            <div className="fld">
                                <input type="text" name="name" required placeholder="Name" aria-label="Name" autoComplete="name" />
                            </div>
                            <div className="fld">
                                <input type="email" name="email" required placeholder="Email" aria-label="Email" autoComplete="email" />
                            </div>
                            <div className="fld">
                                <input type="tel" name="phone" placeholder="Phone" aria-label="Phone" autoComplete="tel" />
                            </div>
                            <button type="submit" className="btn">
                                Get My Free Strategy Call
                            </button>
                        </form>

                        <div className="btnrow svd-ctabtns">
                            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn ghost sm">
                                Book a Strategy Call →
                            </a>
                            <Link href="/services" className="btn ghost sm">
                                Explore All Services
                            </Link>
                        </div>

                        <span className="mininote">
                            Join 150+ brands we&apos;ve helped grow · No commitment required
                        </span>
                    </div>
                </div>
            </section>

            {/* ─── WHATSAPP FLOATING CTA ─── */}
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`wa svd-wa${showWhatsApp ? '' : ' is-hidden'}`}
                aria-hidden={showWhatsApp ? undefined : true}
                tabIndex={showWhatsApp ? undefined : -1}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
            </a>
        </div>
    );
}
