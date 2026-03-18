'use client';

import Link from 'next/link';
import { ServiceData } from '@/data/servicePages';
import FAQAccordion from '@/components/ui/FAQAccordion';

/* ─── Per-service testimonial data ─── */
interface ServiceTestimonial {
    name: string;
    role: string;
    avatar: string;
    quote: string;
}

const serviceTestimonials: Record<string, ServiceTestimonial> = {
    // Real clients
    'book-marketing': {
        name: 'Nidhi Upadhyay',
        role: 'Author, That Night (80,000+ copies sold)',
        avatar: '/testimonials/Nidhi.avif',
        quote: 'When I was about to publish my novel, I reached out to Aurelius Media and instantly knew I was in the right hands. Their creative team is hands down one of the best, spreading a huge buzz around my book. They go beyond marketing — they make your story impossible to ignore.',
    },
    'education-marketing': {
        name: 'Karan Bajaj',
        role: 'CEO, Whitehat Jr. (exited $300M)',
        avatar: '/testimonials/Karan.avif',
        quote: 'Aurelius Media transformed our digital strategy in just 90 days. They didn\'t just deliver clicks — they delivered customers who were ready to buy. Their data-driven approach eliminated the guesswork from our marketing spend.',
    },
    'google-ads': {
        name: 'Cameron Hildreth',
        role: 'Brand Manager, Aden + Anais',
        avatar: '/testimonials/Cameron Hildreth.avif',
        quote: 'What impressed me most was their process. Aurelius didn\'t apply a cookie-cutter approach — they took the time to understand our unique challenges and built a custom strategy that delivered results within weeks.',
    },
    'meta-ads': {
        name: 'Cameron Hildreth',
        role: 'Brand Manager, Aden + Anais',
        avatar: '/testimonials/Cameron Hildreth.avif',
        quote: 'What sets Aurelius apart is that they think like growth partners, not just vendors. Every decision was tied to a business outcome. We saw qualified pipeline grow month over month from the very start.',
    },
    'marketing-strategy-audit': {
        name: 'Tom Chalmers',
        role: 'CEO, New Generation Publishing',
        avatar: '/testimonials/Tom.avif',
        quote: 'Working with the Aurelius team gave us the clarity we needed. They cut through the digital marketing noise and built us a system that consistently generates qualified leads. Our sales team can\'t thank them enough.',
    },
    'creative-design': {
        name: 'Ira Trivedi',
        role: 'Author & Wellness Expert, TEDx Speaker',
        avatar: '/testimonials/Ira Trivedi.avif',
        quote: 'Aurelius Media understood exactly what my brand needed. They combined creative storytelling with performance-driven campaigns in a way I\'d never seen before. The results were beyond what I expected.',
    },
    // Fictional clients with generated avatars
    'ai-creative-design': {
        name: 'Arjun Mehra',
        role: 'Founder, D2C Brand',
        avatar: '/testimonials/arjun-mehra.png',
        quote: 'The AI creative workflow Aurelius built for us cut our production time by 80%. We went from testing 3 ad variants a month to 30. The speed and quality are unmatched — it completely changed how we think about creative.',
    },
    'reels-editing': {
        name: 'Priya Nair',
        role: 'CMO, Lifestyle Brand',
        avatar: '/testimonials/priya-nair.png',
        quote: 'Our Reels went from getting a few hundred views to consistently hitting 50K+. The Aurelius team understands what stops the scroll. Their hook-first editing approach transformed our short-form content strategy.',
    },
    'ai-automation': {
        name: 'Arjun Mehra',
        role: 'Founder, D2C Brand',
        avatar: '/testimonials/arjun-mehra.png',
        quote: 'The automation workflows Aurelius built saved our team 20+ hours every week. Leads are scored, routed, and followed up automatically. It\'s like having an extra team member who never sleeps.',
    },
    'no-code-development': {
        name: 'James Hartley',
        role: 'Director, Digital Products',
        avatar: '/testimonials/james-hartley.png',
        quote: 'We needed a working MVP in two weeks and Aurelius delivered. The tool they built handles our entire lead qualification process and it was live before our funding round closed. Incredible speed.',
    },
    'ai-workshops': {
        name: 'Priya Nair',
        role: 'CMO, Lifestyle Brand',
        avatar: '/testimonials/priya-nair.png',
        quote: 'The AI workshop completely changed how our marketing team operates. Within a week of the training, our content output doubled and the quality actually improved. Practical, hands-on, and immediately actionable.',
    },
    'real-estate-marketing': {
        name: 'Sara Khan',
        role: 'Head of Marketing, Real Estate Group',
        avatar: '/testimonials/sara-khan.png',
        quote: 'Aurelius built a lead engine that delivers 40+ qualified buyer inquiries every week. The geo-targeting and lead scoring are incredibly precise. Our sales team finally has a predictable pipeline they can count on.',
    },
    '_default': {
        name: 'Tom Chalmers',
        role: 'CEO, New Generation Publishing',
        avatar: '/testimonials/Tom.avif',
        quote: 'Working with the Aurelius team gave us the clarity we needed. They cut through the digital marketing noise and built us a system that consistently generates qualified leads.',
    },
};

interface Props {
    service: ServiceData;
    relatedServices: ServiceData[];
}

export default function ServicePageClient({ service, relatedServices }: Props) {

function getDeliverableIcon(text: string) {
    const t = text.toLowerCase();
    
    // Reports, Strategy, Audits
    if (t.match(/audit|report|strategy matrix|benchmarking|research|intelligence|reporting|analytics/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    );
    // Budgets, Bids, Finance
    if (t.match(/budget|bid strategy/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    );
    // Roadmaps, Architecture, Plans
    if (t.match(/roadmap|architecture|calendar/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
    );
    // Tracking, Pixels, KPIs, Measurement
    if (t.match(/measurement|pixel|tracking|kpi|conversion api/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    );
    // Funnels, Drop-offs
    if (t.match(/funnel|drop-off/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
    );
    // Testing (A/B)
    if (t.match(/test/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    );
    // Creatives, Design, Video, Copy, Visuals
    if (t.match(/creative|design|video|copy|asset|aesthetic|graphics|reels|shorts|tiktok|ui\/ux|photo|visual/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    );
    // Ads, Campaigns, Search, Targets
    if (t.match(/ad |ads|campaign|keyword|targeting|search/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
    );
    // Workflow, Automation, Tools, Integrations, CRM, Tech
    if (t.match(/automation|workflow|crm|tool|database|api|integration|zapier/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    );
    // Websites, Web apps, Landing Pages, Development, MVP
    if (t.match(/website|landing page|mvp|development|app |application/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
    );
    // Content strategy, Books, Marketing, Email sequences
    if (t.match(/content|book|marketing|email|sequence/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
    );
    // Meetings, Presentations, Talks, Workshops
    if (t.match(/presentation|workshop|session|training|guide|support/)) return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
    );

    // Default general check format
    return (
        <svg className="w-5 h-5 text-brand-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    );
}

    return (
        <main className="bg-brand-dark text-brand-white">

            {/* ─── 1. HERO SECTION ─── */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow opacity-60" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-brand-gold/8 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content Area */}
                        <div>
                            {/* Breadcrumbs */}
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

                            <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-8">
                                {service.description}
                            </p>

                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <a
                                    href="https://cal.com/aureliusmedia/15min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-7 py-3.5 cta-primary text-white font-semibold rounded-lg text-sm"
                                >
                                    Book a Strategy Call
                                </a>
                            </div>
                        </div>

                        {/* Right Image/Banner Area */}
                        {service.heroImage && (
                            <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square flex items-center justify-center">
                                <div className="absolute inset-0 bg-brand-card rounded-2xl border border-brand-border-subtle overflow-hidden shadow-2xl">
                                    <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay z-10 rounded-2xl" />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={service.heroImage}
                                        alt={`${service.title} Visualization`}
                                        className="w-full h-full object-cover relative z-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 to-transparent z-10 pointer-events-none" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── 2. THE PROBLEM ─── */}
            <section className="py-16 sm:py-20 bg-brand-darker">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">The Problem</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-10">
                        Sound <span className="font-display italic font-normal">familiar?</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.problems.map((problem, i) => (
                            <div
                                key={i}
                                className="p-5 sm:p-6 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-200"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 w-6 h-6 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0">
                                        <span className="text-brand-accent text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-brand-white mb-1.5">{problem.title}</h3>
                                        <p className="text-xs text-brand-gray leading-relaxed">{problem.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3. OUR APPROACH ─── */}
            <section className="py-16 sm:py-20 bg-brand-dark">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Our Approach</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                                How we <span className="font-display italic font-normal">deliver.</span>
                            </h2>
                            <p className="text-base text-brand-gray leading-relaxed">
                                {service.approach}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {service.approachPoints.map((point, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-brand-card/50 transition-colors duration-200">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-accent/15 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-brand-gray leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 4. WHAT'S INCLUDED ─── */}
            <section className="py-16 sm:py-20 bg-brand-darker">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Deliverables</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-10">
                        What&apos;s <span className="font-display italic font-normal">included.</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {service.deliverables.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-4 rounded-xl bg-brand-card/50 border border-brand-border-subtle items-center"
                            >
                                {getDeliverableIcon(item)}
                                <p className="text-xs text-brand-gray-light leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 cta-primary text-white font-semibold rounded-lg text-sm"
                        >
                            Get a Custom Proposal
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── 5. RESULTS & CASE STUDIES (placeholder) ─── */}
            <section className="py-16 sm:py-20 bg-brand-dark">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Results</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                        Proven <span className="font-display italic font-normal">results.</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-lg mx-auto leading-relaxed">
                        We have driven measurable growth for startups and brands across industries. Case study deep-dives coming soon.
                    </p>
                </div>
            </section>

            {/* ─── 6. CLIENT TESTIMONIAL ─── */}
            <section className="py-16 sm:py-20 bg-brand-darker">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-6">Client Testimonial</p>
                    {(() => {
                        const t = serviceTestimonials[service.slug] || serviceTestimonials['_default'];
                        return (
                            <div className="p-6 sm:p-8 rounded-2xl bg-brand-card border border-brand-border-subtle">
                                <svg className="w-8 h-8 text-brand-accent/30 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <blockquote className="text-sm sm:text-base text-brand-gray-light leading-relaxed mb-5 italic">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <div className="flex items-center justify-center gap-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-10 h-10 rounded-full object-cover object-top border border-brand-border-subtle"
                                    />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-brand-white">{t.name}</p>
                                        <p className="text-xs text-brand-gray">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* ─── 7. FAQ SECTION ─── */}
            <section className="py-16 sm:py-24 bg-brand-dark">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <FAQAccordion items={service.faqs} />
                </div>
            </section>

            {/* ─── 8. RELATED SERVICES ─── */}
            {relatedServices.length > 0 && (
                <section className="py-16 sm:py-20 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Explore More</p>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8">
                            Related <span className="font-display italic font-normal">services.</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedServices.map((rel) => (
                                <Link
                                    key={rel.slug}
                                    href={`/services/${rel.slug}`}
                                    className="group p-5 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-200"
                                >
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
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 9. FINAL CTA ─── */}
            <section className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/8 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Ready to <span className="font-display italic font-normal">scale?</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-lg mx-auto mb-8 leading-relaxed">
                        Book a 15-minute strategy call to discuss how we can help grow your business.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://cal.com/aureliusmedia/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3.5 cta-primary text-white font-semibold rounded-lg text-sm"
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
        </main>
    );
}
