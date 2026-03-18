'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ServiceData } from '@/data/servicePages';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { useInView } from '@/lib/hooks';

/* ─── Client logos for social proof bar ─── */
const clientLogos = [
    { src: '/logos/3TIH6U8UUBCqp0JjaEjDBKV0qr0.avif', alt: 'Client' },
    { src: '/logos/A4sYu7KC74rOzwxehkShLCdL0cQ.avif', alt: 'Client' },
    { src: '/logos/RpYiFxOg6rv0PkJpWqCTpuk1M.avif', alt: 'Client' },
    { src: '/logos/r2LD1VLblZdNiidmZQ8C6D9n3Q.avif', alt: 'Client' },
    { src: '/logos/whBe115CG31bTuK1Kp6f0vYWVY.png', alt: 'Client' },
];

/* ─── Per-service testimonial data ─── */
interface ServiceTestimonial {
    name: string;
    role: string;
    avatar: string;
    quote: string;
}

const serviceTestimonials: Record<string, ServiceTestimonial> = {
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
    const { ref: whyUsRef, inView: whyUsInView } = useInView();
    const { ref: ctaRef, inView: ctaInView } = useInView();

    const testimonial = serviceTestimonials[service.slug] || serviceTestimonials['_default'];

    return (
        <main className="bg-brand-dark text-brand-white">

            {/* ─── 1. HERO + LEAD CAPTURE ─── */}
            <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow opacity-60" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-brand-gold/8 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className={heroInView ? 'animate-fade-in-up' : 'opacity-0'}>
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
                                <Link
                                    href="/contact"
                                    className="px-7 py-3.5 bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover text-brand-white rounded-lg text-sm font-medium transition-all duration-200"
                                >
                                    Get a Free Proposal
                                </Link>
                            </div>
                        </div>

                        {/* Right Image/Banner Area */}
                        {service.heroImage && (
                            <div className={`relative w-full aspect-square sm:aspect-video lg:aspect-square flex items-center justify-center ${heroInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
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
                                What is <span className="font-display italic font-normal">{service.title}?</span>
                            </h2>
                            <p className="text-sm sm:text-base text-brand-gray leading-[1.8] max-w-3xl">
                                {service.whatIs}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 4. WHO IS THIS FOR ─── */}
            {service.personas && service.personas.length > 0 && (
                <section ref={personaRef} className="py-16 sm:py-24 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`mb-10 ${personaInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Who This Is For</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                Built for teams that are <span className="font-display italic font-normal">ready to grow.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.personas.map((persona, i) => (
                                <div
                                    key={i}
                                    className={`p-6 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${personaInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.08}s` }}
                                >
                                    <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-4">
                                        <svg className="w-4.5 h-4.5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-semibold text-brand-white mb-2">{persona.title}</h3>
                                    <p className="text-xs text-brand-gray leading-relaxed">{persona.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 5. THE PROBLEM (Sound Familiar?) ─── */}
            <section className="py-16 sm:py-24 bg-brand-dark">
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

            {/* ─── 6. HOW WE DO IT ─── */}
            <section ref={approachRef} className="py-16 sm:py-24 bg-brand-darker">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        <div className={approachInView ? 'animate-fade-in-up' : 'opacity-0'}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Our Process</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                                How we <span className="font-display italic font-normal">deliver.</span>
                            </h2>
                            <p className="text-base text-brand-gray leading-relaxed">
                                {service.approach}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {service.approachPoints.map((point, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-3 p-3 rounded-lg hover:bg-brand-card/50 transition-colors duration-200 ${approachInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.06}s` }}
                                >
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

            {/* ─── 7. BENEFITS ─── */}
            {service.benefits && service.benefits.length > 0 && (
                <section ref={benefitsRef} className="py-16 sm:py-24 bg-brand-dark">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`mb-10 ${benefitsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Benefits</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                Why it <span className="font-display italic font-normal">matters.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.benefits.map((benefit, i) => (
                                <div
                                    key={i}
                                    className={`p-6 rounded-xl bg-brand-card/50 border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${benefitsInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.06}s` }}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-4">
                                        <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-semibold text-brand-white mb-2">{benefit.title}</h3>
                                    <p className="text-xs text-brand-gray leading-relaxed">{benefit.description}</p>
                                </div>
                            ))}
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
                                What&apos;s <span className="font-display italic font-normal">included.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.subServices.map((sub, i) => (
                                <div
                                    key={i}
                                    className={`group p-6 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${subServicesInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-md bg-brand-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-brand-accent text-[10px] font-bold">{String(i + 1).padStart(2, '0')}</span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-brand-white group-hover:text-brand-accent transition-colors">
                                            {sub.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-brand-gray leading-relaxed pl-9">{sub.description}</p>
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
            ) : (
                /* Fallback: original deliverables list */
                <section ref={subServicesRef} className="py-16 sm:py-24 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`mb-10 ${subServicesInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Deliverables</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                What&apos;s <span className="font-display italic font-normal">included.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {service.deliverables.map((item, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 p-4 rounded-xl bg-brand-card/50 border border-brand-border-subtle ${subServicesInView ? 'animate-fade-in-up' : 'opacity-0'}`}
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
            )}

            {/* ─── 9. COMPARISON ─── */}
            {service.comparisonRows && service.comparisonRows.length > 0 && (
                <section ref={comparisonRef} className="py-20 sm:py-28 bg-brand-dark">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        {/* Header */}
                        <div className={`text-center mb-14 sm:mb-16 ${comparisonInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-border-subtle text-xs font-medium text-brand-gray mb-6">
                                Comparison
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display italic font-normal leading-tight">
                                But, why would you<br />want to work <span className="font-display italic">with us?</span>
                            </h2>
                        </div>

                        {/* Two-column cards */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 ${comparisonInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
                            {/* Left column — Other Agencies */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-medium text-brand-gray-dark mb-4 sm:mb-5">Other Agencies</h3>
                                <div className="rounded-2xl border border-brand-border-subtle bg-brand-card/40 p-6 sm:p-8">
                                    <div className="space-y-5 sm:space-y-6">
                                        {service.comparisonRows.map((row, i) => (
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
                                    <span className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(220,70,50,0.6)]" />
                                    <Image src="/logo.png" alt="Aurelius Media" width={36} height={36} className="rounded-md" />
                                    <span className="text-lg sm:text-xl font-extrabold tracking-wider uppercase text-brand-white">Aurelius Media</span>
                                </div>
                                <div className="relative rounded-2xl border border-brand-border-subtle bg-brand-card/40 p-6 sm:p-8 overflow-hidden">
                                    {/* Warm gradient glow */}
                                    <div
                                        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
                                        style={{
                                            background: 'radial-gradient(ellipse at 100% 30%, rgba(220, 70, 50, 0.15), rgba(200, 169, 81, 0.08) 50%, transparent 80%)',
                                        }}
                                    />
                                    <div className="relative z-10 space-y-5 sm:space-y-6">
                                        {service.comparisonRows.map((row, i) => (
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

            {/* ─── 10. RESULTS / CASE STUDIES ─── */}
            <section ref={resultsRef} className={`py-16 sm:py-24 ${service.comparisonRows ? 'bg-brand-darker' : 'bg-brand-dark'}`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className={`text-center mb-10 ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Results</p>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                            Proven <span className="font-display italic font-normal">results.</span>
                        </h2>
                    </div>
                    {service.resultHighlights && service.resultHighlights.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.resultHighlights.map((result, i) => (
                                <div
                                    key={i}
                                    className={`p-6 rounded-xl bg-brand-card border border-brand-border-subtle text-center ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.08}s` }}
                                >
                                    <p className="text-2xl sm:text-3xl font-bold text-brand-accent mb-2">{result.metric}</p>
                                    <p className="text-xs text-brand-gray leading-relaxed">{result.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-sm text-brand-gray max-w-lg mx-auto leading-relaxed text-center ${resultsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            We have driven measurable growth for startups and brands across industries. Case study deep-dives coming soon.
                        </p>
                    )}
                </div>
            </section>

            {/* ─── 11. CLIENT TESTIMONIAL ─── */}
            <section ref={testimonialRef} className={`py-16 sm:py-24 ${service.comparisonRows ? 'bg-brand-dark' : 'bg-brand-darker'}`}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <div className={testimonialInView ? 'animate-fade-in-up' : 'opacity-0'}>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-6">Client Testimonial</p>
                        <div className="p-6 sm:p-8 rounded-2xl bg-brand-card border border-brand-border-subtle">
                            <svg className="w-8 h-8 text-brand-accent/30 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <blockquote className="text-sm sm:text-base text-brand-gray-light leading-relaxed mb-5 italic">
                                &ldquo;{testimonial.quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center justify-center gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-10 h-10 rounded-full object-cover object-top border border-brand-border-subtle"
                                />
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-brand-white">{testimonial.name}</p>
                                    <p className="text-xs text-brand-gray">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 12. WHY AURELIUS MEDIA ─── */}
            {service.differentiators && service.differentiators.length > 0 && (
                <section ref={whyUsRef} className="py-16 sm:py-24 bg-brand-darker">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className={`text-center mb-10 ${whyUsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Why Us</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                Why <span className="font-display italic font-normal">Aurelius Media?</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.differentiators.map((diff, i) => (
                                <div
                                    key={i}
                                    className={`p-6 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${whyUsInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${i * 0.06}s` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-brand-white mb-1.5">{diff.title}</h3>
                                            <p className="text-xs text-brand-gray leading-relaxed">{diff.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 13. FAQ SECTION ─── */}
            <section className="py-16 sm:py-24 bg-brand-dark">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <FAQAccordion items={service.faqs} />
                </div>
            </section>

            {/* ─── 14. RELATED SERVICES ─── */}
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

            {/* ─── 15. FINAL CTA ─── */}
            <section ref={ctaRef} className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/8 rounded-full blur-3xl" />
                </div>

                <div className={`relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center ${ctaInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Ready to <span className="font-display italic font-normal">scale?</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-lg mx-auto mb-8 leading-relaxed">
                        Book a 15-minute strategy call to discuss how we can help grow your business with {service.title.toLowerCase()}.
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
