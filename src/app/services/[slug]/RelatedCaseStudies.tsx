import Link from 'next/link';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import type { CaseStudy } from '@/data/caseStudies';

/* Case studies tagged with this service, shown under the results band. */
export default function RelatedCaseStudies({ studies }: { studies: CaseStudy[] }) {
    if (studies.length === 0) return null;

    return (
        <section className="sec">
            <div className="wrap">
                <div className="shead rv">
                    <div>
                        <span className="k">— Case Studies —</span>
                        <h2>
                            The proof, in <em className="acc-em">detail.</em>
                        </h2>
                    </div>
                    <Link href="/case-studies" className="textlink viewall">All case studies →</Link>
                </div>
                <div className="csgrid gs">
                    {studies.slice(0, 6).map((study) => (
                        <CaseStudyCard
                            key={study.slug}
                            study={study}
                            sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 420px"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
