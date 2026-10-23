import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { CaseStudy } from '@/data/caseStudies';

/** Headline numbers are sized by length so they never wrap mid-number. */
export function metricSize(metric: string) {
    if (metric.length > 7) return 'xlong';
    if (metric.length > 5) return 'long';
    return undefined;
}

interface Props {
    study: CaseStudy;
    /** Second copy in a looping marquee: hidden from screen readers and tab order. */
    clone?: boolean;
    sizes?: string;
}

/* Photo case studies fill the card; book covers sit on a panel in the book's
   own tone; studies without a picture lead with their headline number. */
export default function CaseStudyCard({ study, clone, sizes = '(max-width: 760px) 300px, 360px' }: Props) {
    const { visual } = study;
    const variant = !visual ? ' type' : visual.kind === 'cover' ? ' cover' : '';
    const style = visual?.tone ? ({ '--tone': visual.tone } as CSSProperties) : undefined;

    return (
        <Link
            href={`/case-studies/${study.slug}`}
            className={`cscard${variant}`}
            style={style}
            aria-hidden={clone || undefined}
            tabIndex={clone ? -1 : undefined}
        >
            {visual ? (
                <Image src={visual.src} alt={clone ? '' : visual.alt} fill sizes={sizes} />
            ) : (
                <div className="cs-type" aria-hidden="true">
                    <span>{study.vertical}</span>
                    <b className={metricSize(study.stats[0].metric)}>{study.stats[0].metric}</b>
                </div>
            )}
            <div className="cs-body">
                {clone ? <div className="cs-title">{study.client}</div> : <h3>{study.client}</h3>}
                <p>{study.cardLine}</p>
                <div className="cs-chips">
                    {study.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
