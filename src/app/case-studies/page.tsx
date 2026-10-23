import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies, caseStudyGroups } from '@/data/caseStudies';
import '@/app/styles/case-studies.css';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

const description =
    'Case studies from Aurelius Media: book launches past 50,000 copies, a magazine’s cost per subscriber halved, a 16-country D2C launch, admissions for schools and universities, and prototypes that got funded.';

export const metadata: Metadata = {
    title: 'Case Studies',
    description,
    alternates: { canonical: 'https://www.aureliusmedia.co/case-studies' },
    openGraph: {
        title: 'Case Studies | Aurelius Media',
        description,
        type: 'website',
        url: 'https://www.aureliusmedia.co/case-studies',
        images: [{ url: '/logo.png', alt: 'Aurelius Media case studies' }],
    },
};

export default function CaseStudiesPage() {
    return (
        <div className="csi">
            <section className="sec csi-hero gridbg">
                <div className="wrap">
                    <nav className="crumb" aria-label="Breadcrumb">
                        <Link href="/">Home</Link> / <span aria-current="page">Case Studies</span>
                    </nav>
                    <span className="k csi-k"><span aria-hidden="true">● </span>Case Studies</span>
                    <h1 className="fd csi-h1">
                        The work, and <em>what it moved.</em>
                    </h1>
                    <p className="lede">
                        {caseStudies.length} engagements, each with the result, the numbers and the platforms we used
                        to get there.
                    </p>
                    <nav className="chips csi-jump" aria-label="Case study groups">
                        {caseStudyGroups.map((g) => (
                            <a key={g.id} href={`#${g.id}`} className="chip">
                                {g.label} <span aria-hidden="true">↓</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </section>

            {caseStudyGroups.map((group, gi) => {
                const studies = caseStudies.filter((c) => c.group === group.id);
                return (
                    <section key={group.id} id={group.id} className="sec csi-group">
                        <div className="wrap">
                            <div className="shead2 rv">
                                <span className="idx">{String(gi + 1).padStart(2, '0')}</span>
                                <h2>{group.label}</h2>
                                <span className="cnt">{studies.length} case studies</span>
                            </div>
                            <p className="csi-blurb rv">{group.blurb}</p>

                            <div className="ledger">
                                {studies.map((study) => {
                                    // Numbered across the whole page; the data is already in group order.
                                    const n = caseStudies.indexOf(study) + 1;
                                    return (
                                        <Link key={study.slug} href={`/case-studies/${study.slug}`} className="lrow">
                                            <span className="no">{String(n).padStart(2, '0')}</span>
                                            <div>
                                                <h3>{study.client}</h3>
                                                <div className="ind">{study.vertical}</div>
                                            </div>
                                            <div className="res">
                                                <b>{study.chips[0]}</b>
                                                {study.cardLine}
                                            </div>
                                            <span className="arr" aria-hidden="true">→</span>
                                            {study.visual && (
                                                <span
                                                    className={`thumb${study.visual.kind === 'cover' ? ' cover' : ''}`}
                                                    style={study.visual.tone ? { background: study.visual.tone } : undefined}
                                                    aria-hidden="true"
                                                >
                                                    <Image src={study.visual.src} alt="" width={440} height={300} sizes="220px" />
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                );
            })}

            <section className="sec">
                <div className="wrap">
                    <div className="ctabox gridbg rv">
                        <span className="k">— Your Turn —</span>
                        <h2 style={{ marginTop: 18 }}>
                            Want to be the <em className="acc-em">next one?</em>
                        </h2>
                        <p>
                            Book a 15-minute strategy call. We will look at where you are, pick the platforms that
                            fit, and show you what we would do first.
                        </p>
                        <div className="btnrow">
                            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn">
                                Book a Strategy Call →
                            </a>
                            <Link href="/contact" className="btn ghost">Get a Free Proposal</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
