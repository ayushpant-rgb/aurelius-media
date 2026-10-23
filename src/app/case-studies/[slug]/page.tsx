import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
    Megaphone, Search, ShoppingCart, Youtube, Mail, LayoutTemplate, CreditCard,
    Truck, Activity, PenTool, Code2, Compass, Sparkles,
} from 'lucide-react';
import CaseStudyCard, { metricSize } from '@/components/case-studies/CaseStudyCard';
import { caseStudies, caseStudyGroups, getCaseStudy, type CaseStudy, type PlatformKind } from '@/data/caseStudies';
import { generateBreadcrumbSchema } from '@/lib/schema';
import '@/app/styles/case-studies.css';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

const platformIcon: Record<PlatformKind, LucideIcon> = {
    meta: Megaphone,
    google: Search,
    amazon: ShoppingCart,
    youtube: Youtube,
    email: Mail,
    landing: LayoutTemplate,
    payments: CreditCard,
    shipping: Truck,
    tracking: Activity,
    ux: PenTool,
    product: Code2,
    strategy: Compass,
    creative: Sparkles,
};

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) return {};

    const title = `${study.client} Case Study: ${study.title}`;
    const url = `https://www.aureliusmedia.co/case-studies/${study.slug}`;
    const image = study.visual?.src ?? '/logo.png';

    return {
        title,
        description: study.summary,
        alternates: { canonical: url },
        openGraph: {
            title: `${title} | Aurelius Media`,
            description: study.summary,
            type: 'article',
            url,
            images: [{ url: image, alt: study.visual?.alt ?? study.client }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Aurelius Media`,
            description: study.summary,
            images: [image],
        },
    };
}

/** Split the title around its accent phrase: before + accent + after === title. */
function splitTitle(title: string, accent: string): [string, string, string] {
    const at = title.indexOf(accent);
    if (at < 0) return [title, '', ''];
    return [title.slice(0, at), accent, title.slice(at + accent.length)];
}

function HeroVisual({ study }: { study: CaseStudy }) {
    const { visual } = study;

    if (!visual) {
        return (
            <div className="csd-vis type" aria-hidden="true">
                <span className="m10">{study.vertical}</span>
                <b className={metricSize(study.stats[0].metric)}>{study.stats[0].metric}</b>
                <span className="lb">{study.stats[0].label}</span>
            </div>
        );
    }

    return (
        <div
            className={`csd-vis ${visual.kind}`}
            style={visual.tone ? ({ '--tone': visual.tone } as CSSProperties) : undefined}
        >
            <Image src={visual.src} alt={visual.alt} fill priority sizes="(max-width: 1100px) 90vw, 520px" />
        </div>
    );
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) notFound();

    const [before, accent, after] = splitTitle(study.title, study.accent);
    const group = caseStudyGroups.find((g) => g.id === study.group);
    const platformCols = { 1: 'one', 2: 'two', 4: 'four' }[study.platforms.length] ?? '';

    // Same group first, then the rest, so the next read stays on topic.
    const more = [
        ...caseStudies.filter((c) => c.group === study.group && c.slug !== study.slug),
        ...caseStudies.filter((c) => c.group !== study.group),
    ].slice(0, 3);

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.aureliusmedia.co' },
        { name: 'Case Studies', url: 'https://www.aureliusmedia.co/case-studies' },
        { name: study.client, url: `https://www.aureliusmedia.co/case-studies/${study.slug}` },
    ]);

    return (
        <div className="csd">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* ─── Hero ─── */}
            <section className="sec csd-hero gridbg">
                <div className="wrap">
                    <nav className="crumb" aria-label="Breadcrumb">
                        <Link href="/">Home</Link> / <Link href="/case-studies">Case Studies</Link> /{' '}
                        <span aria-current="page">{study.client}</span>
                    </nav>

                    <div className="csd-hgrid">
                        <div>
                            <span className="k"><span aria-hidden="true">● </span>{study.client} · {study.vertical}</span>
                            <h1 className="fd csd-h1">
                                {before}<em>{accent}</em>{after}
                            </h1>
                            <p className="lede">{study.summary}</p>

                            <div className="csd-plat">
                                <span className="m10">Platforms used</span>
                                <div className="chips">
                                    {study.platforms.map((p) => (
                                        <span key={p.name} className="chip">{p.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <HeroVisual study={study} />
                    </div>
                </div>
            </section>

            {/* ─── Results ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className={`statband n${study.stats.length} gs`}>
                        {study.stats.map((s) => (
                            <div key={s.label} className="st">
                                <b className={s.metric.length > 7 ? 'long' : undefined}>{s.metric}</b>
                                <span className="lb">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Platforms used ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="shead rv">
                        <div>
                            <span className="k">— Platforms Used —</span>
                            <h2>
                                Channel by <em className="acc-em">channel.</em>
                            </h2>
                        </div>
                        <p>What each platform did for {study.confidential ? 'the client' : study.client}.</p>
                    </div>
                    <div className={`bgrid ${platformCols} gs`}>
                        {study.platforms.map((p) => {
                            const Icon = platformIcon[p.kind];
                            return (
                                <div key={p.name} className="bcell">
                                    <span className="ic" aria-hidden="true"><Icon /></span>
                                    <h3>{p.name}</h3>
                                    <p>{p.detail}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Brief + what we did ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="csd-split rv">
                        <div>
                            <span className="k">— The Brief —</span>
                        </div>
                        <div className="csd-prose">
                            {study.brief.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>

                    <div className="shead rv csd-stepshead">
                        <div>
                            <span className="k">— What We Did —</span>
                            <h2>
                                The <em className="acc-em">playbook.</em>
                            </h2>
                        </div>
                    </div>
                    <div className={`proc n${study.steps.length} gs`}>
                        {study.steps.map((step, i) => (
                            <div key={step.title} className="pstep">
                                <span className="pn" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                <h3>{step.title}</h3>
                                <p>{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Outcome + testimonial ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="csd-split rv">
                        <div>
                            <span className="k">— The Outcome —</span>
                        </div>
                        <div className="csd-outcome">
                            {study.outcome.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>

                    {study.testimonial && (
                        <figure className="csd-quote rv">
                            <blockquote>
                                <p>&ldquo;{study.testimonial.quote}&rdquo;</p>
                            </blockquote>
                            <figcaption className="attr">
                                <span className="av">
                                    {study.testimonial.avatar ? (
                                        <Image src={study.testimonial.avatar} alt={study.testimonial.name} width={104} height={104} sizes="52px" />
                                    ) : (
                                        study.testimonial.name.charAt(0)
                                    )}
                                </span>
                                <div>
                                    <b>{study.testimonial.name}</b>
                                    <span>{study.testimonial.role}</span>
                                </div>
                            </figcaption>
                        </figure>
                    )}
                </div>
            </section>

            {/* ─── More case studies ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="shead rv">
                        <div>
                            <span className="k">— {group?.label ?? 'More Work'} —</span>
                            <h2>
                                More case <em className="acc-em">studies.</em>
                            </h2>
                        </div>
                        <Link href="/case-studies" className="textlink viewall">All case studies →</Link>
                    </div>
                    <div className="csgrid gs">
                        {more.map((c) => (
                            <CaseStudyCard key={c.slug} study={c} sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 420px" />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="sec">
                <div className="wrap">
                    <div className="ctabox gridbg rv">
                        <span className="k">— Your Turn —</span>
                        <h2 style={{ marginTop: 18 }}>
                            Want results <em className="acc-em">like these?</em>
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
