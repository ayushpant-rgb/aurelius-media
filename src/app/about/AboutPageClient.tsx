'use client';

import Link from 'next/link';
import { useInView } from '@/lib/hooks';

const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '150+', label: 'Clients Served' },
    { value: '25+', label: 'Countries Reached' },
    { value: '100CR+', label: 'Ad Spend Managed' },
];

const team = [
    {
        name: 'Ayush Pant',
        role: 'Founder & CMO',
        description:
            'Digital marketing veteran with 20+ years of experience. Previously led marketing at Apeejay Education Group, achieving 300% of admissions targets. Has worked with VC-backed startups like Complement1 ($16M funded) and Aden + Anais ($100M funded). Google and Meta Certified.',
        initials: 'AP',
    },
    {
        name: 'Sharmila Senthil',
        role: 'Creative Director',
        description:
            'Leading the creative vision across campaigns, brand identity, and visual storytelling. Expertise in blending traditional design principles with AI-powered creative workflows.',
        initials: 'SS',
    },
    {
        name: 'Rohan',
        role: 'Growth Lead',
        description:
            'Driving performance campaigns across Google and Meta platforms. Specializes in data-driven optimization, attribution modeling, and scaling ad spend profitably.',
        initials: 'R',
    },
];

const verticals = [
    { name: 'Startups', icon: '🚀', description: 'VC-backed and bootstrapped startups scaling from zero to millions.' },
    { name: 'Authors & Publishers', icon: '📚', description: 'Book launches, author branding, and publishing campaigns.' },
    { name: 'Education & EdTech', icon: '🎓', description: 'School admissions, university marketing, and EdTech growth.' },
    { name: 'E-commerce', icon: '🛒', description: 'D2C brands, marketplace optimization, and shopping campaigns.' },
    { name: 'Health & Wellness', icon: '💊', description: 'Wellness brands, health tech, and lifestyle businesses.' },
    { name: 'Real Estate', icon: '🏠', description: 'Property marketing, lead generation, and builder campaigns.' },
];

export default function AboutPageClient() {
    const { ref: founderRef, inView: founderInView } = useInView();
    const { ref: teamRef, inView: teamInView } = useInView();
    const { ref: verticalsRef, inView: verticalsInView } = useInView();

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">About Us</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        We Don&apos;t Just Run Ads.{' '}
                        <br />
                        We Engineer <span className="gradient-text font-display">Growth.</span>
                    </h1>
                    <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
                        Aurelius Media is named after Marcus Aurelius, the Stoic philosopher-emperor.
                        Our approach to marketing is grounded in the same principles: disciplined execution,
                        principled strategy, and relentless focus on what we can control and measure.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 bg-brand-darker border-y border-brand-border-subtle">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-brand-white mb-1 font-mono tracking-tight">{stat.value}</div>
                                <p className="text-sm text-brand-gray-dark">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Story */}
            <section ref={founderRef} className="section-padding bg-brand-dark">
                <div className={`max-w-4xl mx-auto ${founderInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        <div className="lg:col-span-1">
                            <div className="w-32 h-32 mx-auto lg:mx-0 rounded-[20px] bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 flex items-center justify-center text-5xl font-bold text-brand-white mb-4 border border-brand-border-subtle">
                                AP
                            </div>
                            <h3 className="text-xl font-bold text-center lg:text-left">Ayush Pant</h3>
                            <p className="text-sm text-brand-accent text-center lg:text-left">Founder & CMO</p>

                            <div className="flex justify-center lg:justify-start gap-3 mt-4">
                                <span className="px-2.5 py-1 text-xs font-medium bg-brand-card border border-brand-border-subtle rounded-md text-brand-gray">
                                    Google Certified
                                </span>
                                <span className="px-2.5 py-1 text-xs font-medium bg-brand-card border border-brand-border-subtle rounded-md text-brand-gray">
                                    Meta Certified
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                The Founder <span className="gradient-text font-display">Story</span>
                            </h2>
                            <p className="text-brand-gray leading-relaxed">
                                With over two decades in digital marketing, Ayush Pant has navigated every evolution of the
                                industry, from the early days of search advertising to the current AI revolution. His career
                                spans corporate leadership at Apeejay Education Group, where he exceeded admissions targets
                                by 300%, to working with VC-backed startups like Complement1 (backed by Karan Bajaj of
                                WhiteHat Jr, $16M funded) and Aden + Anais ($100M funded D2C brand).
                            </p>
                            <p className="text-brand-gray leading-relaxed">
                                Aurelius Media was born from a conviction that marketing agencies need to evolve. Traditional
                                agencies are slow, opaque, and resistant to change. Aurelius Media operates differently: we are
                                AI-native from day one, building custom automation, using generative AI for creative production,
                                and applying data science to campaign optimization.
                            </p>
                            <p className="text-brand-gray leading-relaxed">
                                The name &ldquo;Aurelius&rdquo; comes from Marcus Aurelius, the Stoic philosopher known for
                                disciplined thinking and principled action. We bring the same ethos to every campaign: focus
                                on what you can control (strategy, execution, optimization) and measure what matters (ROAS,
                                CPA, conversions, revenue).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section ref={teamRef} className="section-padding bg-brand-darker">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">The Team</p>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            The People Behind the <span className="gradient-text font-display">Results</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {team.map((member, i) => (
                            <div
                                key={member.name}
                                className={`p-6 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${teamInView ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold mb-4 border border-brand-border-subtle"
                                    style={{ background: 'rgba(232, 85, 15, 0.10)', color: '#FF7A3D' }}
                                >
                                    {member.initials}
                                </div>
                                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                                <p className="text-sm text-brand-accent mb-3">{member.role}</p>
                                <p className="text-sm text-brand-gray leading-relaxed">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="section-padding bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 hero-glow" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">Our Philosophy</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        We don&apos;t just run ads.{' '}
                        <br />
                        We <span className="gradient-text font-display">engineer</span> growth.
                    </h2>
                    <p className="text-brand-gray text-lg leading-relaxed mb-8">
                        Every campaign starts with data. Every creative is tested systematically. Every dollar
                        of ad spend is optimized for maximum return. We combine the strategic depth of a consulting
                        firm with the execution speed of a tech startup, augmented by AI at every step.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-xl bg-brand-card border border-brand-border-subtle">
                            <span className="text-2xl mb-2 block">📊</span>
                            <h4 className="font-semibold text-sm mb-1">Data-Driven</h4>
                            <p className="text-xs text-brand-gray">Decisions backed by analytics, not opinions.</p>
                        </div>
                        <div className="p-5 rounded-xl bg-brand-card border border-brand-border-subtle">
                            <span className="text-2xl mb-2 block">🤖</span>
                            <h4 className="font-semibold text-sm mb-1">AI-Augmented</h4>
                            <p className="text-xs text-brand-gray">AI at every stage, from creative to optimization.</p>
                        </div>
                        <div className="p-5 rounded-xl bg-brand-card border border-brand-border-subtle">
                            <span className="text-2xl mb-2 block">🎯</span>
                            <h4 className="font-semibold text-sm mb-1">Results-Obsessed</h4>
                            <p className="text-xs text-brand-gray">Revenue, not vanity metrics. ROI, not impressions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Verticals */}
            <section ref={verticalsRef} className="section-padding bg-brand-darker">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">Industries</p>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Verticals We <span className="gradient-text font-display">Serve</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {verticals.map((v, i) => (
                            <div
                                key={v.name}
                                className={`p-5 rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 ${verticalsInView ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <span className="text-2xl mb-2 block">{v.icon}</span>
                                <h3 className="font-bold mb-1">{v.name}</h3>
                                <p className="text-sm text-brand-gray">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-brand-dark">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to Work <span className="gradient-text font-display">Together?</span>
                    </h2>
                    <p className="text-brand-gray text-lg mb-8 leading-relaxed">
                        Let us show you what disciplined, AI-augmented marketing can do for your business.
                    </p>
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 cta-primary text-white font-semibold rounded-[20px]"
                    >
                        Book a Strategy Call →
                    </a>
                </div>
            </section>
        </>
    );
}
