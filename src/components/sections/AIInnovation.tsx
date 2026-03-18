'use client';

import { useInView } from '@/lib/hooks';

const innovations = [
    {
        title: 'VibeCon India by Emergent',
        badge: 'Conference',
        badgeColor: { bg: 'rgba(59,130,246,0.12)', text: '#3B82F6', border: 'rgba(59,130,246,0.25)' },
        description: 'Selected from 1,000+ applicants to attend India\'s premier vibe coding conference. Presented OpenRank AI and connected with industry leaders including Vijay Shekhar Sharma.',
        highlight: 'Selected from 1,000+',
        icon: '🏆',
    },
    {
        title: 'SheBuilds Hackathon',
        badge: 'Organized',
        badgeColor: { bg: 'rgba(34,197,94,0.12)', text: '#22C55E', border: 'rgba(34,197,94,0.25)' },
        description: 'Organized a Women\'s Day hackathon in partnership with Lovable, empowering women builders and developers across Delhi/Gurgaon.',
        highlight: 'IWD 2026',
        icon: '💪',
    },
    {
        title: 'Bolt Global Hackathon',
        badge: 'Participated',
        badgeColor: { bg: 'rgba(168,85,247,0.12)', text: '#A855F7', border: 'rgba(168,85,247,0.25)' },
        description: 'Competed in the world\'s largest hackathon with $1M+ in prizes, building innovative solutions with vibe coding platforms.',
        highlight: '$1M+ Prizes',
        icon: '⚡',
    },
    {
        title: 'OpenRank AI',
        badge: 'Co-Founded',
        badgeColor: { bg: 'rgba(245,158,11,0.12)', text: '#F59E0B', border: 'rgba(245,158,11,0.25)' },
        description: 'Co-founded an AI-powered SEO intelligence platform that brings advanced ranking analysis and content optimization to marketers.',
        highlight: 'AI SEO Platform',
        icon: '🧠',
    },
];

export default function AIInnovation() {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-brand-darker" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">AI & Innovation</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        We Build. We Ship. We <span className="font-display italic font-normal">Lead.</span>
                    </h2>
                    <p className="text-brand-gray text-lg max-w-2xl mx-auto leading-relaxed">
                        Aurelius Media is not just a service provider. We are active builders in the AI
                        and marketing community, participating in hackathons, organizing events, and creating tools.
                    </p>
                </div>

                {/* Innovation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {innovations.map((item, i) => (
                        <div
                            key={item.title}
                            className={`group p-6 sm:p-8 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 hover:-translate-y-0.5 ${inView ? 'animate-fade-in-up' : 'opacity-0'
                                }`}
                            style={{ animationDelay: `${i * 0.12}s` }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <h3 className="text-lg font-bold group-hover:text-brand-white transition-colors">
                                            {item.title}
                                        </h3>
                                        <span
                                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                                            style={{
                                                background: item.badgeColor.bg,
                                                color: item.badgeColor.text,
                                                border: `1px solid ${item.badgeColor.border}`,
                                                fontSize: '0.65rem',
                                                letterSpacing: '0.06em',
                                            }}
                                        >
                                            {item.badge}
                                        </span>
                                    </div>
                                    <p className="text-sm text-brand-gray leading-relaxed mb-3">
                                        {item.description}
                                    </p>
                                    <span className="inline-block px-3 py-1 rounded-md bg-brand-dark text-xs font-semibold text-brand-white border border-brand-border-subtle">
                                        {item.highlight}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
