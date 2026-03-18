'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceData } from '@/data/servicePages';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { useInView } from '@/lib/hooks';
import type { LucideIcon } from 'lucide-react';
import {
    Sparkles, Target, BarChart3, GitBranch, Rocket, PiggyBank, RefreshCw,
    GraduationCap, Building2, ShoppingCart, BadgeDollarSign, TrendingUp,
    FileBarChart, UserCheck, Zap, Layers, FlaskConical, LayoutGrid, Type,
    Palette, Gauge, Activity, ArrowDownRight, ArrowUpRight, Banknote,
    Search, Share2, ClipboardCheck, Wand2, Code2, BookOpen, Home, Video,
    Megaphone, Pencil, Bot, Brain, Globe, Shield, Clock, Eye, Users,
    MousePointerClick, LineChart, Cpu, Star, Lightbulb, CheckCircle2,
    Heart, Mic, Scale, ShoppingBag, UtensilsCrossed, Briefcase,
} from 'lucide-react';

/* ─── Icon mappings ─── */

/** Per-service hero value-prop icons (3 per service, matching benefit order) */
const heroIconMap: Record<string, LucideIcon[]> = {
    'google-ads':              [BadgeDollarSign, Target, BarChart3],
    'meta-ads':                [Sparkles, GitBranch, BarChart3],
    'marketing-strategy-audit': [ClipboardCheck, LineChart, Lightbulb],
    'creative-design':         [Palette, Pencil, Eye],
    'ai-creative-design':      [Wand2, Sparkles, Zap],
    'reels-editing':           [Video, Sparkles, TrendingUp],
    'ai-automation':           [Bot, Cpu, Zap],
    'no-code-development':     [Code2, Rocket, Globe],
    'ai-workshops':            [GraduationCap, Brain, Users],
    'real-estate-marketing':   [Home, Target, TrendingUp],
    'book-marketing':          [BookOpen, Megaphone, TrendingUp],
    'education-marketing':     [GraduationCap, Target, BarChart3],
};

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

/** Sub-service icons — cycled from this list */
const subServiceIcons: LucideIcon[] = [
    LayoutGrid, Target, Type, Palette, Gauge, Activity, FlaskConical, BarChart3,
];

/** Stats icons — based on metric content */
function getStatIcon(metric: string): { Icon: LucideIcon; color: string } {
    const lower = metric.toLowerCase();
    if (lower.includes('↓') || lower.includes('down') || lower.includes('decrease') || lower.includes('lower') || lower.includes('reduc') || lower.includes('cpa') || lower.includes('cost')) {
        return { Icon: ArrowDownRight, color: '#059669' };
    }
    if (lower.includes('↑') || lower.includes('up') || lower.includes('increase') || lower.includes('higher') || lower.includes('roas') || lower.includes('growth') || lower.includes('+') || lower.includes('%') || lower.includes('x')) {
        return { Icon: ArrowUpRight, color: '#059669' };
    }
    return { Icon: Banknote, color: '#E8550F' };
}

/** Related services master icon map — by slug */
const serviceIconMap: Record<string, LucideIcon> = {
    'google-ads':              Search,
    'meta-ads':                Share2,
    'marketing-strategy-audit': ClipboardCheck,
    'creative-design':         Pencil,
    'ai-creative-design':      Wand2,
    'reels-editing':           Video,
    'ai-automation':           Bot,
    'no-code-development':     Code2,
    'ai-workshops':            GraduationCap,
    'real-estate-marketing':   Home,
    'book-marketing':          BookOpen,
    'education-marketing':     GraduationCap,
};

/* ─── Client logos for social proof bar ─── */
const clientLogos = [
    { src: '/logos/3TIH6U8UUBCqp0JjaEjDBKV0qr0.avif', alt: 'Client' },
    { src: '/logos/A4sYu7KC74rOzwxehkShLCdL0cQ.avif', alt: 'Client' },
    { src: '/logos/RpYiFxOg6rv0PkJpWqCTpuk1M.avif', alt: 'Client' },
    { src: '/logos/r2LD1VLblZdNiidmZQ8C6D9n3Q.avif', alt: 'Client' },
    { src: '/logos/whBe115CG31bTuK1Kp6f0vYWVY.png', alt: 'Client' },
];

/* ─── Per-service testimonial data (expanded to 3+ per service for carousel) ─── */
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
const WHATSAPP_NUMBER = '919999999999';

interface RelatedArticle {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    ogImage?: string;
}

interface Props {
    service: ServiceData;
    relatedServices: ServiceData[];
    relatedArticles?: RelatedArticle[];
}

export default function ServicePageClient({ service, relatedServices, relatedArticles = [] }: Props) {
    const { ref: heroRef, inView: heroInView } = useInView();
    const { ref: socialRef, inView: socialInView } = useInView();
    const { ref: whatIsRef, inView: whatIsInView } = useInView();
    const { ref: personaRef, inView: personaInView } = useInView();
    const { ref: approachRef, inView: approachInView } = useInView();
    const { ref: benefitsRef, inView: benefitsInView } = useInView();
    const { ref: subServicesRef, inView: subServicesInView } = useInView();
    const { ref: comparisonRef, inView: comparisonInView } = useInView();
    const { ref: resultsRef, inView: resultsInView } = useInView();
    const { ref: testimonialRef, inView: testimonialInView } = useInView();
    const { ref: ctaRef, inView: ctaInView } = useInView();
    const finalCtaSectionRef = useRef<HTMLElement>(null);

    /* ─── Testimonial carousel ─── */
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

    /* ─── Pain points limited to 3 ─── */

    /* ─── Hero form state ─── */
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', industry: '', budget: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            window.open('https://cal.com/aureliusmedia/15min', '_blank');
        }, 500);
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

    return (
        <main className="bg-brand-dark text-brand-white">

            {/* ─── 1. HERO + LEAD CAPTURE FORM ─── */}
            <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow opacity-60" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-brand-gold/8 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left: H1 + description + value props + secondary CTAs */}
                        <div className={heroInView ? 'animate-fade-in-up' : 'opacity-0'}>
                            <nav className="flex items-center gap-2 text-xs text-brand-gray-dark mb-8">
                                <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/services" className="hover:text-brand-white transition-colors">Services</Link>
                                <span>/</span>
                                <span className="text-brand-gray">{service.title}</span>
                            </nav>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card/50 border border-brand-border-subtle text-[10px] font-medium text-brand-gray-dark mb-6">
                                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                                {service.categoryLabel}
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
                                {service.headline}
                            </h1>

                            <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Value props — positive outcomes with per-service icons */}
                            {service.benefits && service.benefits.length > 0 && (
                                <div className="space-y-3 mb-8">
                                    {service.benefits.slice(0, 3).map((benefit, i) => {
                                        const icons = heroIconMap[service.slug];
                                        const HeroIcon = icons ? icons[i % icons.length] : CheckCircle2;
                                        return (
                                            <div key={i} className="flex items-start gap-3">
                                                <HeroIcon className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                                                <span className="text-sm text-brand-gray-light">{benefit.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                <a
                                    href="https://cal.com/aureliusmedia/15min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 cta-primary text-white font-semibold rounded-[20px] text-sm"
                                >
                                    Book a Strategy Call
                                </a>
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover text-brand-white rounded-lg text-sm font-medium transition-all duration-200"
                                >
                                    Get a Free Proposal
                                </Link>
                            </div>
                        </div>

                        {/* Right: Lead capture form card */}
                        <div className={`${heroInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
                            <div className="bg-white rounded-[20px] p-6 sm:p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                                {formSubmitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900 mb-2">You&apos;re all set!</p>
                                        <p className="text-sm text-gray-600">Redirecting you to book your strategy call...</p>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                            We use <span className="text-[#E8550F]">AI-Driven</span> {service.title} Strategies
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-6">
                                            Get your free strategy call and discover how to scale your growth.
                                        </p>

                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Your Name *"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8550F]/30 focus:border-[#E8550F] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="Work Email *"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8550F]/30 focus:border-[#E8550F] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="Phone (+91) *"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8550F]/30 focus:border-[#E8550F] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <select
                                                    required
                                                    value={formData.industry}
                                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E8550F]/30 focus:border-[#E8550F] transition-all appearance-none bg-white"
                                                >
                                                    <option value="" disabled>Industry *</option>
                                                    {industryOptions.map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <select
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E8550F]/30 focus:border-[#E8550F] transition-all appearance-none bg-white"
                                                >
                                                    <option value="">Budget Range (optional)</option>
                                                    {budgetOptions.map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full py-3.5 bg-[#E8550F] hover:bg-[#C0420A] text-white font-semibold rounded-lg text-sm transition-colors duration-200 cursor-pointer"
                                                style={{ height: '48px' }}
                                            >
                                                Get My Free Audit
                                            </button>
                                        </form>

                                        <p className="text-xs text-gray-400 text-center mt-4">
                                            No commitment required · Response within 2 hours
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 2. SOCIAL PROOF BAR ─── */}
            <section ref={socialRef} className="py-10 sm:py-12 bg-brand-darker border-y border-brand-border-subtle overflow-hidden">
                <div className={`text-center mb-6 ${socialInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <p className="text-xs uppercase tracking-widest text-brand-gray-dark">You&apos;re in good hands</p>
                </div>
                <div className="relative overflow-hidden mx-auto max-w-3xl">
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-darker to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-darker to-transparent z-10 pointer-events-none" />
                    <div className="flex animate-logo-scroll items-center gap-10 md:gap-16 lg:gap-24">
                        {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
                            <div key={i} className="flex-shrink-0 flex items-center justify-center p-2">
                                <Image src={logo.src} alt={logo.alt} width={200} height={80} className="h-16 sm:h-20 md:h-24 w-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3. WHAT IS [SERVICE] ─── */}
            {service.whatIs && (
                <section ref={whatIsRef} className="py-16 sm:py-24 bg-brand-dark">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className={whatIsInView ? 'animate-fade-in-up' : 'opacity-0'}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Overview</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
                                What is <span className="gradient-text font-display">{service.title}?</span>
                            </h2>
                            <p className="text-sm sm:text-base text-brand-gray leading-[1.8] max-w-3xl">
                                {service.whatIs}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 4. WHO IS THIS FOR (2×2 grid + catch-all line) ─── */}
            {service.personas && service.personas.length > 0 && (
                <section ref={personaRef} className="py-16 sm:py-24 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`mb-10 ${personaInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Who This Is For</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                Built for teams that are <span className="gradient-text font-display">ready to grow.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.personas.slice(0, 4).map((persona, i) => {
                                const PersonaIcon = getPersonaIcon(persona.title, persona.icon);
                                return (
                                    <div
                                        key={i}
                                        className={`p-6 rounded-[20px] bg-white/[0.02] border border-white/10 hover:border-brand-border-hover transition-all duration-300 ${personaInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                        style={{ animationDelay: `${i * 0.08}s` }}
                                    >
                                        <div className="w-11 h-11 rounded-[10px] flex items-center justify-center mb-4" style={{ background: 'rgba(232,85,15,0.10)' }}>
                                            <PersonaIcon className="w-[22px] h-[22px] text-brand-accent" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-[15px] font-medium text-[#f1f1ef] mb-2">{persona.title}</h3>
                                        <p className="text-[13px] text-brand-gray leading-[1.55] line-clamp-2">{persona.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                        {service.catchAllText && (
                            <p className={`mt-6 text-[13px] leading-[1.6] text-center max-w-[600px] mx-auto ${personaInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.35s' }}>
                                <span className="text-brand-gray-dark">{service.catchAllText}</span>
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* ─── 5. THE PROBLEM — Removed per V2 audit (pain already established in hero subtitle) ─── */}

            {/* ─── 6. HOW WE DO IT ─── */}
            <section ref={approachRef} className="py-16 sm:py-24 bg-brand-darker">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        <div className={approachInView ? 'animate-fade-in-up' : 'opacity-0'}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Our Process</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                                How we <span className="gradient-text font-display">deliver.</span>
                            </h2>
                            <p className="text-base text-brand-gray leading-relaxed">
                                {service.approach}
                            </p>
                        </div>

                        <div className="space-y-0">
                            {service.approachPoints.map((point, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-4 ${approachInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.06}s` }}
                                >
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className="w-8 h-8 rounded-full border-2 border-brand-accent bg-brand-accent/10 flex items-center justify-center">
                                            <span className="text-xs font-bold text-brand-accent">{i + 1}</span>
                                        </div>
                                        {i < service.approachPoints.length - 1 && (
                                            <div className="w-px h-8 border-l-2 border-dashed border-brand-border-subtle" />
                                        )}
                                    </div>
                                    <div className="pt-1 pb-4">
                                        <p className="text-sm text-brand-gray leading-relaxed">{point}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 7. BENEFITS ─── */}
            {service.benefits && service.benefits.length > 0 && (
                <section ref={benefitsRef} className="py-16 sm:py-24 bg-brand-dark">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`mb-10 ${benefitsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Benefits</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                Why it <span className="gradient-text font-display">matters.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.benefits.map((benefit, i) => {
                                const BenefitIcon = getBenefitIcon(benefit.title);
                                return (
                                    <div
                                        key={i}
                                        className={`p-6 rounded-[20px] bg-brand-card/50 border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${benefitsInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                        style={{ animationDelay: `${i * 0.06}s` }}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4">
                                            <BenefitIcon className="w-6 h-6 text-brand-accent" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-sm font-semibold text-brand-white mb-2">{benefit.title}</h3>
                                        <p className="text-xs text-brand-gray leading-relaxed">{benefit.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 8. SUB-SERVICES / WHAT'S INCLUDED ─── */}
            {service.subServices && service.subServices.length > 0 ? (
                <section ref={subServicesRef} className="py-16 sm:py-24 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`mb-10 ${subServicesInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Services Included</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                What&apos;s <span className="gradient-text font-display">included.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.subServices.map((sub, i) => {
                                const SubIcon = subServiceIcons[i % subServiceIcons.length];
                                return (
                                    <div
                                        key={i}
                                        className={`group p-6 rounded-[20px] bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${subServicesInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                        style={{ animationDelay: `${i * 0.05}s` }}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                                                <SubIcon className="w-6 h-6 text-brand-accent" strokeWidth={1.5} />
                                            </div>
                                            <div className="pt-1">
                                                <h3 className="text-sm font-semibold text-brand-white group-hover:text-brand-accent transition-colors">
                                                    {sub.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-xs text-brand-gray leading-relaxed">{sub.description}</p>
                                        {sub.slug ? (
                                            <Link
                                                href={`/services/${sub.slug}`}
                                                className="inline-flex items-center gap-1 mt-3 text-[10px] font-medium text-brand-accent hover:underline"
                                            >
                                                Learn More
                                                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/services/${service.slug}#${sub.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="inline-flex items-center gap-1 mt-3 text-[10px] font-medium text-brand-accent hover:underline"
                                            >
                                                Learn More
                                                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-8 text-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 cta-primary text-white font-semibold rounded-[20px] text-sm"
                            >
                                Get a Custom Proposal
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section ref={subServicesRef} className="py-16 sm:py-24 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`mb-10 ${subServicesInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Deliverables</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                What&apos;s <span className="gradient-text font-display">included.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {service.deliverables.map((item, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 p-4 rounded-[20px] bg-brand-card/50 border border-brand-border-subtle ${subServicesInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.04}s` }}
                                >
                                    <svg className="w-4 h-4 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-xs text-brand-gray-light leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 cta-primary text-white font-semibold rounded-[20px] text-sm"
                            >
                                Get a Custom Proposal
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 9. COMPARISON (with AI/automation row appended) ─── */}
            {comparisonRowsWithAI && comparisonRowsWithAI.length > 0 && (
                <section ref={comparisonRef} className="py-20 sm:py-28 bg-brand-dark">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`text-center mb-14 sm:mb-16 ${comparisonInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-border-subtle text-xs font-medium text-brand-gray mb-6">
                                Comparison
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display leading-tight text-brand-white">
                                What sets <span className="gradient-text">Aurelius Media</span><br />apart?
                            </h2>
                        </div>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 ${comparisonInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
                            {/* Left column — Other Agencies */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-medium text-brand-gray-dark mb-4 sm:mb-5">Other Agencies</h3>
                                <div className="rounded-[20px] border border-brand-border-subtle bg-brand-card/40 p-6 sm:p-8">
                                    <div className="space-y-5 sm:space-y-6">
                                        {comparisonRowsWithAI.map((row, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-brand-gray-dark shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span className="text-sm sm:text-base text-brand-gray">{row.others}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right column — Aurelius Media */}
                            <div>
                                <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                                    <span className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(232,85,15,0.6)]" />
                                    <Image src="/logo.png" alt="Aurelius Media" width={36} height={36} className="rounded-md" />
                                    <span className="text-lg sm:text-xl font-extrabold tracking-wider uppercase text-brand-white">Aurelius Media</span>
                                </div>
                                <div className="relative rounded-[20px] border border-brand-border-subtle bg-brand-card/40 p-6 sm:p-8 overflow-hidden">
                                    <div
                                        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
                                        style={{
                                            background: 'radial-gradient(ellipse at 100% 30%, rgba(220, 70, 50, 0.15), rgba(200, 169, 81, 0.08) 50%, transparent 80%)',
                                        }}
                                    />
                                    <div className="relative z-10 space-y-5 sm:space-y-6">
                                        {comparisonRowsWithAI.map((row, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm sm:text-base text-brand-white font-medium">{row.us}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 10. RESULTS / PROVEN STATS (enhanced two-line format) ─── */}
            <section ref={resultsRef} className={`py-16 sm:py-24 ${comparisonRowsWithAI ? 'bg-brand-darker' : 'bg-brand-dark'}`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className={`text-center mb-10 ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Results</p>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                            Proven <span className="gradient-text font-display">results.</span>
                        </h2>
                    </div>
                    {service.resultHighlights && service.resultHighlights.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.resultHighlights.map((result, i) => {
                                const { Icon: StatIcon, color } = getStatIcon(result.metric);
                                return (
                                    <div
                                        key={i}
                                        className={`p-8 rounded-[20px] bg-brand-card border border-brand-border-subtle text-center ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                        style={{ animationDelay: `${i * 0.08}s` }}
                                    >
                                        <StatIcon className="w-6 h-6 mx-auto mb-3" strokeWidth={1.5} style={{ color }} />
                                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-accent mb-3">{result.metric}</p>
                                        <p className="text-sm text-brand-gray leading-relaxed">{result.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className={`text-sm text-brand-gray max-w-lg mx-auto leading-relaxed text-center ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            We have driven measurable growth for startups and brands across industries. Case study deep-dives coming soon.
                        </p>
                    )}
                </div>
            </section>

            {/* ─── 11. CLIENT TESTIMONIALS (3-card carousel) ─── */}
            <section ref={testimonialRef} className={`py-16 sm:py-24 ${comparisonRowsWithAI ? 'bg-brand-dark' : 'bg-brand-darker'}`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className={`text-center mb-10 ${testimonialInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Client Testimonials</p>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                            What our clients <span className="gradient-text font-display">say.</span>
                        </h2>
                    </div>

                    {/* Desktop: 3-card row / Mobile: horizontal scroll */}
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center p-6 sm:p-7 rounded-[20px] bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${testimonialInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <svg className="w-7 h-7 text-brand-accent/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <blockquote className="text-sm text-brand-gray-light leading-relaxed mb-5 italic line-clamp-4">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-10 h-10 rounded-full object-cover object-top border border-brand-border-subtle"
                                        loading="lazy"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-brand-white">{t.name}</p>
                                        <p className="text-xs text-brand-gray">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Task 6: "Why Aurelius Media" section REMOVED — differentiators merged into comparison rows ─── */}

            {/* ─── 12. FAQ SECTION (service FAQs + common FAQs, first 3 expanded) ─── */}
            <section className="py-16 sm:py-24 bg-brand-dark">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <FAQAccordion items={allFaqs} defaultOpenCount={3} />
                </div>
            </section>

            {/* ─── 13. RELATED SERVICES ─── */}
            {relatedServices.length > 0 && (
                <section className="py-16 sm:py-20 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Explore More</p>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8">
                            Related <span className="gradient-text font-display">services.</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedServices.map((rel) => {
                                const RelIcon = serviceIconMap[rel.slug] || Sparkles;
                                return (
                                    <Link
                                        key={rel.slug}
                                        href={`/services/${rel.slug}`}
                                        className="group p-5 rounded-[20px] bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-200"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4">
                                            <RelIcon className="w-6 h-6 text-brand-accent" strokeWidth={1.5} />
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-accent/10 text-[9px] font-medium text-brand-accent mb-3">
                                            {rel.categoryLabel}
                                        </div>
                                        <h3 className="text-sm font-semibold text-brand-white mb-2 group-hover:text-brand-accent transition-colors duration-200">
                                            {rel.title}
                                        </h3>
                                        <p className="text-xs text-brand-gray leading-relaxed line-clamp-2">
                                            {rel.description}
                                        </p>
                                        <div className="mt-3 flex items-center gap-1 text-[10px] font-medium text-brand-accent">
                                            Learn More
                                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── RELATED ARTICLES ─── */}
            {relatedArticles.length > 0 && (
                <section className="py-16 sm:py-20 bg-brand-dark">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">From the Blog</p>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8">
                            Related <span className="gradient-text font-display">articles.</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedArticles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="group rounded-[20px] bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-200 overflow-hidden"
                                >
                                    {article.ogImage && (
                                        <div className="aspect-[4/3] relative overflow-hidden">
                                            <Image
                                                src={article.ogImage}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 640px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-accent/10 text-[9px] font-medium text-brand-accent">
                                                {article.category}
                                            </span>
                                            <span className="text-[10px] text-brand-gray-dark">{article.readTime}</span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-brand-white mb-2 group-hover:text-brand-accent transition-colors duration-200 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-brand-gray leading-relaxed line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 14. FINAL CTA (inline lead capture form) ─── */}
            <section ref={(node: HTMLDivElement | null) => { (ctaRef as React.MutableRefObject<HTMLDivElement | null>).current = node; finalCtaSectionRef.current = node; }} className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/8 rounded-full blur-3xl" />
                </div>

                <div className={`relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center ${ctaInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Ready to <span className="gradient-text font-display">scale?</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-lg mx-auto mb-10 leading-relaxed">
                        Book a 15-minute strategy call to discuss how we can help grow your business with {service.title.toLowerCase()}.
                    </p>

                    {/* Inline form: Name, Email, Phone — horizontal on desktop */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            window.open('https://cal.com/aureliusmedia/15min', '_blank');
                        }}
                        className="flex flex-col sm:flex-row items-stretch gap-3 max-w-2xl mx-auto mb-5"
                    >
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            className="flex-1 px-4 py-3.5 rounded-lg bg-brand-card border border-brand-border-subtle text-sm text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent transition-colors"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            className="flex-1 px-4 py-3.5 rounded-lg bg-brand-card border border-brand-border-subtle text-sm text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent transition-colors"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="flex-1 px-4 py-3.5 rounded-lg bg-brand-card border border-brand-border-subtle text-sm text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3.5 cta-primary text-white font-semibold rounded-[20px] text-sm whitespace-nowrap cursor-pointer"
                        >
                            Get My Free Strategy Call
                        </button>
                    </form>

                    <p className="text-xs text-brand-gray-dark">
                        Join 150+ brands we&apos;ve helped grow · No commitment required
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <a
                            href="https://cal.com/aureliusmedia/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3.5 cta-primary text-white font-semibold rounded-[20px] text-sm"
                        >
                            Book a Strategy Call
                        </a>
                        <Link
                            href="/services"
                            className="w-full sm:w-auto px-8 py-3.5 bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover text-brand-white rounded-lg text-sm font-medium transition-all duration-200"
                        >
                            Explore All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── WHATSAPP FLOATING CTA ─── */}
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${showWhatsApp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                style={{ backgroundColor: '#25D366' }}
                aria-label="Chat on WhatsApp"
            >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </main>
    );
}
