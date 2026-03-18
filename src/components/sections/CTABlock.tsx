'use client';

import Link from 'next/link';
import { useInView } from '@/lib/hooks';

export default function CTABlock() {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} className="section-padding bg-brand-darker relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/3 rounded-full blur-3xl" />

            <div className={`max-w-3xl mx-auto text-center relative z-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                {/* Card Container */}
                <div className="p-8 sm:p-12 rounded-xl bg-brand-card border border-brand-border-subtle relative overflow-hidden">
                    <div className="absolute inset-0 hero-glow" />

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Ready to scale your brand
                            <br />
                            to <span className="font-display italic font-normal">new heights?</span>
                        </h2>
                        <p className="text-brand-gray text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                            Book a free 15-minute strategy call. We will analyze your current setup, identify quick wins,
                            and show you exactly how we can accelerate your growth.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://cal.com/aureliusmedia/15min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 cta-primary text-white font-semibold rounded-lg text-base animate-pulse-glow"
                            >
                                Book a Strategy Call →
                            </a>
                        </div>

                        <p className="mt-6 text-xs text-brand-gray-dark">
                            No commitment required. 100% free consultation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
