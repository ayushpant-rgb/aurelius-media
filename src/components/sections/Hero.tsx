'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const clientLogos = [
        { src: '/logos/3TIH6U8UUBCqp0JjaEjDBKV0qr0.avif', alt: 'Client Logo 1' },
        { src: '/logos/A4sYu7KC74rOzwxehkShLCdL0cQ.avif', alt: 'Client Logo 2' },
        { src: '/logos/RpYiFxOg6rv0PkJpWqCTpuk1M.avif', alt: 'Client Logo 3' },
        { src: '/logos/r2LD1VLblZdNiidmZQ8C6D9n3Q.avif', alt: 'Client Logo 4' },
        { src: '/logos/whBe115CG31bTuK1Kp6f0vYWVY.png', alt: 'Client Logo 5' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background base */}
            <div className="absolute inset-0 bg-brand-dark" />

            {/* Animated gradient background */}
            <div className="absolute inset-0 z-0 opacity-60 hero-animated-bg" />

            {/* Hero Glow */}
            <div className="absolute inset-0 hero-glow z-0" />

            {/* Subtle ambient orbs */}
            <div className="absolute inset-0 opacity-40 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl mix-blend-screen" />
            </div>

            {/* Grid Pattern overlay for texture */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center pt-28 sm:pt-32 pb-20">
                {/* Social Proof Strip */}
                <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
                    {/* Stacked avatar photos */}
                    <div className="flex items-center -space-x-2.5">
                        {[
                            { src: '/testimonials/Cameron Hildreth.avif', alt: 'Cameron Hildreth' },
                            { src: '/testimonials/Karan.avif', alt: 'Karan Bajaj' },
                            { src: '/testimonials/Tom.avif', alt: 'Tom Chalmers' },
                            { src: '/testimonials/Nidhi.avif', alt: 'Nidhi Upadhyay' },
                            { src: '/testimonials/Ira Trivedi.avif', alt: 'Ira Trivedi' },
                        ].map((p) => (
                            <Image
                                key={p.alt}
                                src={p.src}
                                alt={p.alt}
                                width={36}
                                height={36}
                                className="w-9 h-9 rounded-full border-2 border-brand-dark object-cover object-top"
                            />
                        ))}
                    </div>
                    {/* Stars + label */}
                    <div className="flex flex-col items-start leading-tight">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3.5 h-3.5 text-brand-accent" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-[11px] text-brand-gray-dark mt-0.5">84+ businesses scaled</span>
                    </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card/50 border border-brand-border-subtle text-xs font-medium text-brand-gray-dark mb-8 animate-fade-in">
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                    AI-Native Performance Marketing Agency
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6 animate-fade-in-up">
                    AI-Powered Marketing.{' '}
                    <br />
                    <span className="gradient-text font-display">Real Results.</span>
                </h1>

                {/* Sub-headline */}
                <p className="text-sm sm:text-base md:text-lg text-brand-gray max-w-lg mx-auto mb-10 leading-relaxed animate-fade-in-up px-2" style={{ animationDelay: '0.15s' }}>
                    10x Growth Marketing for VC-Backed Startups.{' '}
                    <br className="hidden sm:block" />
                    Trusted by Unicorn Founders. We engineer growth, not guesswork.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 cta-primary text-white font-semibold rounded-full text-base w-full sm:w-auto max-w-xs"
                    >
                        Join the Client Waitlist
                    </a>
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center px-8 py-4 border border-brand-border-subtle hover:border-brand-border-hover text-brand-white font-semibold rounded-full transition-all duration-200 hover:bg-brand-card-hover text-base w-full sm:w-auto max-w-xs"
                    >
                        Explore Services
                    </Link>
                </div>

                {/* Client Logo Carousel */}
                <div className="animate-fade-in" style={{ animationDelay: '0.45s' }}>
                    <p className="text-xs uppercase tracking-widest text-brand-gray-dark mb-6">
                        You&apos;re in good hands
                    </p>
                    <div className="relative overflow-hidden mx-auto max-w-3xl">
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-dark to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-dark to-transparent z-10" />
                        <div className="flex animate-logo-scroll items-center gap-10 md:gap-16 lg:gap-24">
                            {/* Duplicate the array 4 times to ensure the screen is always filled during infinite scroll */}
                            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 flex items-center justify-center p-2"
                                >
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={200}
                                        height={80}
                                        className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent" />
        </section>
    );
}
