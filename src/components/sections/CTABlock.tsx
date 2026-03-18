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
                <div className="p-8 sm:p-12 rounded-[24px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0D05 0%, #0B0B0D 60%)', border: '1px solid rgba(232, 85, 15, 0.25)' }}>
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(232, 85, 15, 0.20) 0%, transparent 70%)' }} />

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Ready to scale your brand
                            <br />
                            to <span className="gradient-text font-display">new heights?</span>
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
                                className="w-full sm:w-auto px-8 py-4 cta-primary text-white font-semibold rounded-[20px] text-base animate-pulse-glow"
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
