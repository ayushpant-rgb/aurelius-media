import CountUp from '@/components/ui/CountUp';

const stats = [
    {
        value: '$15M+',
        count: { to: 15, prefix: '$', suffix: 'M+' },
        label: 'Ad spend managed',
        description: 'Profitable campaigns across Google, Meta, LinkedIn, and TikTok — at every budget level.',
    },
    {
        value: '84',
        count: { to: 84 },
        label: 'Businesses scaled',
        description: 'From Series A startups to legacy brands, across 25+ countries and every major vertical.',
    },
    {
        value: '10x',
        count: { to: 10, suffix: 'x' },
        label: 'Faster creative output',
        description: 'AI-powered creative production delivers ad variants, videos, and assets at 10x traditional speed.',
    },
];

export default function MissionStatement() {
    return (
        <section id="how-it-works" className="sec" style={{ scrollMarginTop: 80 }}>
            <div className="wrap">
                <span className="k rv">— How It Works —</span>
                <h2 className="fd rv" style={{ fontSize: 'clamp(26px, 3.3vw, 46px)', lineHeight: 1.08, maxWidth: 1180, margin: '22px 0 clamp(40px, 5vw, 64px)' }}>
                    Aurelius Media turns your ad spend into <em>predictable revenue</em> through AI-powered creative, data-driven media buying, and growth engineering.
                </h2>
                <div className="statband gs">
                    {stats.map((stat) => (
                        <div className="st" key={stat.label}>
                            <b><CountUp {...stat.count} /></b>
                            <span className="lb">{stat.label}</span>
                            <p>{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
