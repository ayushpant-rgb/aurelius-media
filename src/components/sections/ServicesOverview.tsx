import Link from 'next/link';

const serviceCards = [
    {
        title: 'Performance Marketing',
        meta: '6 platforms',
        description:
            'Google, Meta, LinkedIn, TikTok, YouTube ads and retargeting — AI-augmented bidding for maximum ROAS.',
        href: '/services/performance-marketing',
    },
    {
        title: 'Growth Marketing',
        meta: '9 services',
        description:
            'Strategy audits, lead gen, funnel building, CRO, programmatic SEO, analytics, lifecycle marketing, content strategy, and landing pages.',
        href: '/services/growth-marketing',
    },
    {
        title: 'Creative Services',
        meta: '6 services',
        description:
            'Brand videos, reels & shorts, AI creatives, UGC ads, creative design, and pitch decks.',
        href: '/services/creative-services',
    },
    {
        title: 'AI Marketing & Automation',
        meta: '5 services',
        description:
            'AI automation, custom AI agents, AI chatbots, web apps & MVPs, and hands-on AI workshops for teams.',
        href: '/services/ai-marketing-automation',
    },
    {
        title: 'Industry Verticals',
        meta: '3 verticals',
        description:
            'Specialized marketing for books & authors, education & EdTech, and real estate verticals.',
        href: '/services/book-marketing',
    },
    {
        title: 'Full Funnel Marketing',
        meta: 'End-to-end',
        description:
            'End-to-end growth systems — from awareness to loyalty. Strategy, execution, creative, and analytics tied together.',
        href: '/categories/full-funnel-marketing',
    },
];

export default function ServicesOverview() {
    return (
        <section className="sec">
            <div className="wrap">
                <div className="shead rv">
                    <div>
                        <span className="k">— What We Do —</span>
                        <h2>Services built{' '}<br />for growth.</h2>
                    </div>
                    <p>
                        From performance marketing to AI automation, we offer a full stack of services designed to scale your business.
                    </p>
                </div>

                <div className="sindex roomy gs">
                    {serviceCards.map((card, i) => (
                        <Link href={card.href} className="srow" key={card.title}>
                            <span className="tag">0{i + 1} · {card.meta}</span>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <span className="arr" aria-hidden="true">→</span>
                        </Link>
                    ))}
                </div>

                <div className="viewall rv">
                    <Link href="/services" className="btn ghost sm">View All Services →</Link>
                </div>
            </div>
        </section>
    );
}
