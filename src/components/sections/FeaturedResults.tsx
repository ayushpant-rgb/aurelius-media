'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useInView } from '@/lib/hooks';
import { useEffect, useRef } from 'react';

const caseStudies = [
    {
        title: 'Stealth Health Tech\nStartup',
        subtitle: 'Successful MVP Testing',
        image: '/case-studies/PCg7rQvx3EQUl4ncNISDMHw8io.avif',
        tags: ['84% Response Rate', '300+ Qualified Leads'],
        hasDot: true,
    },
    {
        title: 'Private University',
        subtitle: '250% increase in enrollments',
        image: '/case-studies/qblDLWSIdCrrJBd83Cjf6xh6HM.avif',
        tags: ['2.5x Enrollments', 'No increase in budget'],
        hasDot: false,
    },
    {
        title: 'Aden + Anais',
        subtitle: 'Multi-country campaign rollout for funded startup',
        image: '/case-studies/UYQiJm2rPfGOYdRaYtjkLWBn0s.webp',
        tags: ['2000+ Sales', '37% Reduction in CPA'],
        hasDot: false,
    },
];

function CaseStudyCard({ study }: { study: typeof caseStudies[0] }) {
    return (
        <div className="group relative rounded-[20px] overflow-hidden w-[240px] sm:w-[280px] h-[320px] sm:h-[370px] bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 shrink-0">
            <Image
                src={study.image}
                alt={study.title.replace('\n', ' ')}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end items-center text-center">
                {study.hasDot && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse shadow-[0_0_12px_rgba(232,85,15,0.8)]" />
                )}
                <h3 className="text-lg sm:text-xl font-medium text-white mb-1 leading-tight whitespace-pre-line">
                    {study.title}
                </h3>
                <p className="text-brand-gray text-xs mb-4">
                    {study.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {study.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-[10px] text-brand-gray-light whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function FeaturedResults() {
    const { ref, inView } = useInView();
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const positionRef = useRef<number>(0);
    const isPausedRef = useRef<boolean>(false);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const speed = 0.4;
        let isVisible = true;

        // Only animate when visible in viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        if (container.parentElement) {
            observer.observe(container.parentElement);
        }

        const animate = () => {
            if (!isPausedRef.current && isVisible) {
                positionRef.current -= speed;

                const quarterWidth = container.scrollWidth / 4;

                if (Math.abs(positionRef.current) >= quarterWidth * 2) {
                    positionRef.current = 0;
                }

                container.style.transform = `translateX(${positionRef.current}px)`;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={ref} className="py-16 sm:py-20 bg-brand-darker overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">Results</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
                        Results speak for <span className="gradient-text font-display">themselves.</span>
                    </h2>
                    <p className="text-brand-gray text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                        We&apos;ve worked across a number of industries and have achieved some
                        incredible results with some incredible people and brands.
                    </p>
                </div>
            </div>

            {/* Full-width Scrolling Carousel */}
            <div
                className="relative w-full"
                onMouseEnter={() => { isPausedRef.current = true; }}
                onMouseLeave={() => { isPausedRef.current = false; }}
            >
                {/* Dark shadow gradients on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-brand-darker via-brand-darker/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-brand-darker via-brand-darker/80 to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track — moves LEFT TO RIGHT */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 w-max will-change-transform"
                    style={{ transform: 'translateX(0px)' }}
                >
                    {/* We need the cards starting off-screen to the left, so we shift the initial position */}
                    {/* Render 4 sets for seamless infinite scrolling in right direction */}
                    {[0, 1, 2, 3].map((setIndex) => (
                        <div key={setIndex} className="flex gap-5">
                            {caseStudies.map((study, i) => (
                                <CaseStudyCard key={`${setIndex}-${i}`} study={study} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Inline CTA */}
            <div className={`text-center mt-12 sm:mt-16 px-4 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-3">Want results like these?</p>
                <a
                    href="https://cal.com/aureliusmedia/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 cta-primary text-white font-semibold rounded-full text-sm"
                >
                    Book a Free Strategy Call
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>

        </section>
    );
}
