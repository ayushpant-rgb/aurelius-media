'use client';

import { useInView, useCountUp } from '@/lib/hooks';

const stats = [
    { value: 84, suffix: '+', label: 'Businesses Scaled' },
    { value: 25, suffix: '+', label: 'Countries Served' },
    { value: 100, suffix: 'CR+', label: 'Ad Spend Managed', prefix: '₹' },
    { value: 20, suffix: '+', label: 'Years Experience' },
];

function StatItem({ value, suffix, label, prefix, inView }: {
    value: number;
    suffix: string;
    label: string;
    prefix?: string;
    inView: boolean;
}) {
    const count = useCountUp(value, 2000, inView);

    return (
        <div className="text-center">
            <div className="text-2xl sm:text-4xl font-bold text-brand-white mb-1 font-mono tracking-tight">
                {prefix || ''}{inView ? count : 0}
                <span className="text-brand-gray">{suffix}</span>
            </div>
            <p className="text-xs sm:text-sm text-brand-gray-dark">{label}</p>
        </div>
    );
}

export default function SocialProofBar() {
    const { ref, inView } = useInView({ threshold: 0.3 });

    return (
        <section ref={ref} className="relative py-12 sm:py-16 bg-brand-darker border-y border-brand-border-subtle">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
                    {stats.map((stat) => (
                        <StatItem key={stat.label} {...stat} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
