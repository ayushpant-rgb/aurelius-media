import Link from 'next/link';
import type { CSSProperties } from 'react';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import { homepageCaseStudies } from '@/data/caseStudies';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

export default function FeaturedResults() {
    const studies = homepageCaseStudies;

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

                {/* Cards glide right to left at the live site's pace and pause on
                    hover; each one opens its case study. The second copy makes the
                    loop seamless; it is hidden from screen readers and the tab order. */}
                <div className="csmq rv">
                    <div className="cstrk" style={{ '--cs-n': studies.length } as CSSProperties}>
                        {[...studies, ...studies].map((study, i) => (
                            <CaseStudyCard key={i} study={study} clone={i >= studies.length} />
                        ))}
                    </div>
                </div>

                <div className="rv" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginTop: 34 }}>
                    <Link href="/case-studies" className="textlink">All case studies →</Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                        <span className="mininote">Want results like these?</span>
                        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn sm">
                            Book a Strategy Call →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
