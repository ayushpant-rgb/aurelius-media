import Image from 'next/image';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

// Photo case-study cards — the live homepage's layout (photo, title, subtitle,
// result chips), restyled in the new system. The last three are the live copy.
const caseStudies = [
    {
        // Meta website subscriptions on the subscriber ad sets: $2.28 per
        // subscriber in Jun–Jul 2026 (previous agency), $1.07 in our first
        // 30 days (20 Aug–19 Sep), $0.97 on 1–7 Oct. Photo: our 2I ad.
        title: 'Provoked Magazine',
        subtitle: 'Cost per subscriber halved within 30 days',
        image: '/case-studies/provoked-magazine.webp',
        tags: ['50%+ Lower Cost per Subscriber', '$2.28 → $0.97 per Subscriber'],
    },
    {
        title: 'Stealth Health Tech Startup',
        subtitle: 'Successful MVP Testing',
        image: '/case-studies/qblDLWSIdCrrJBd83Cjf6xh6HM.avif',
        tags: ['84% Response Rate', '300+ Qualified Leads'],
    },
    {
        title: 'Private University',
        subtitle: '250% increase in enrollments',
        image: '/case-studies/PCg7rQvx3EQUl4ncNISDMHw8io.avif',
        tags: ['2.5x Enrollments', 'No increase in budget'],
    },
    {
        title: 'Aden + Anais',
        subtitle: 'Multi-country campaign rollout for funded startup',
        image: '/case-studies/UYQiJm2rPfGOYdRaYtjkLWBn0s.webp',
        tags: ['2000+ Sales', '37% Reduction in CPA'],
    },
];

export default function FeaturedResults() {
    return (
        <section className="sec">
            <div className="wrap">
                <div className="shead rv">
                    <div>
                        <span className="k">— Results —</span>
                        <h2 className="h-xl">Results speak{' '}<br />for themselves.</h2>
                    </div>
                    <p>
                        We&apos;ve worked across a number of industries and have achieved some
                        incredible results with some incredible people and brands.
                    </p>
                </div>

                <div className="csgrid gs">
                    {caseStudies.map((study, i) => (
                        <article className="cscard" key={study.title}>
                            <Image
                                src={study.image}
                                alt={study.title}
                                fill
                                sizes="(max-width: 760px) 82vw, (max-width: 1100px) 45vw, 330px"
                            />
                            <span className="cs-no">CS—0{i + 1}</span>
                            <div className="cs-body">
                                <h3>{study.title}</h3>
                                <p>{study.subtitle}</p>
                                <div className="cs-chips">
                                    {study.tags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="rv" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginTop: 34 }}>
                    <span className="mininote">Want results like these?</span>
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn sm">
                        Book a Strategy Call →
                    </a>
                </div>
            </div>
        </section>
    );
}
