import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { generatePersonSchema, generateBreadcrumbSchema } from '@/lib/schema';
import '@/app/styles/pages.css';

const SITE_URL = 'https://www.aureliusmedia.co';

export const metadata: Metadata = {
    title: 'Ayush Pant — Founder & Performance Marketing Expert | Aurelius Media',
    description:
        'Ayush Pant is the Founder of Aurelius Media. 20+ years in digital marketing. Google & Meta certified. $15M+ in ad spend managed across 150+ clients in 25+ countries.',
    openGraph: {
        title: 'Ayush Pant — Founder & CMO, Aurelius Media',
        description:
            '20+ years in digital marketing. Google & Meta certified. $15M+ in ad spend managed across 150+ clients in 25+ countries.',
        type: 'profile',
        url: `${SITE_URL}/authors/ayush-pant`,
        images: [{ url: `${SITE_URL}/images/ayush.jpeg`, alt: 'Ayush Pant' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ayush Pant — Founder & CMO, Aurelius Media',
        description: '20+ years in digital marketing. $15M+ in ad spend managed. Founder of Aurelius Media.',
        images: [`${SITE_URL}/images/ayush.jpeg`],
    },
    alternates: {
        canonical: `${SITE_URL}/authors/ayush-pant`,
    },
};

// Same six credentials as before, split into figures (stat band) and certifications (chips).
const credentialStats = [
    { value: '$15M+', label: 'Ad Spend Managed' },
    { value: '150+', label: 'Clients' },
    { value: '25+', label: 'Countries' },
    { value: '20+', label: 'Years Experience' },
];
const credentialBadges = ['Google Ads Certified', 'Meta Blueprint Certified'];

export default function AyushPantPage() {
    const allPosts = getAllPosts();

    const personSchema = generatePersonSchema({ name: 'Ayush Pant', role: 'Founder, Aurelius Media' });
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: 'Ayush Pant', url: `${SITE_URL}/authors/ayush-pant` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="pg-author">
                {/* Hero */}
                <section className="sec pg-author-hero">
                    <div className="wrap">
                        <nav className="crumb" aria-label="Breadcrumb">
                            <Link href="/">Home</Link>
                            {' / '}
                            <Link href="/blog">Blog</Link>
                            {' / '}
                            <span aria-current="page">Ayush Pant</span>
                        </nav>

                        <div className="pg-author-grid">
                            <div>
                                <span className="k">— Author —</span>
                                <h1 className="fd h-xl">
                                    Ayush Pant
                                </h1>
                                <p className="pg-author-role">
                                    Founder &amp; CMO, Aurelius Media
                                </p>

                                <div className="pg-author-bio">
                                    <p>
                                        Ayush Pant is the Founder and CMO of Aurelius Media, a performance marketing agency
                                        specialising in AI-powered advertising, edtech and education marketing, and growth strategy
                                        for ambitious brands across India and internationally.
                                    </p>
                                    <p>
                                        With 20+ years in digital marketing and certifications from Google and Meta, Ayush has
                                        managed <strong>$15M+ in ad spend</strong> across{' '}
                                        <strong>150+ clients in 25+ countries</strong> — spanning
                                        D2C ecommerce, B2B SaaS, edtech unicorns, real estate developers, and independent authors.
                                    </p>
                                    <p>
                                        He writes about performance marketing, AI search strategy, Meta and Google Ads, and the
                                        business of growing brands through paid and organic channels. His work has been cited by
                                        marketing practitioners across India, the US, and Europe.
                                    </p>
                                </div>

                                <div className="chips pg-author-links">
                                    <a
                                        href="https://www.linkedin.com/in/ayushpant/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="chip"
                                    >
                                        LinkedIn<span aria-hidden="true"> ↗</span>
                                    </a>
                                    <a
                                        href="https://x.com/FollowAurelius"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="chip"
                                    >
                                        X / Twitter<span aria-hidden="true"> ↗</span>
                                    </a>
                                </div>
                            </div>

                            <figure className="pg-author-photo rv">
                                <div className="pg-ph">
                                    <Image
                                        src="/images/ayush.jpeg"
                                        alt="Ayush Pant — Founder, Aurelius Media"
                                        width={800}
                                        height={800}
                                        sizes="(max-width: 900px) 360px, 400px"
                                        priority
                                    />
                                </div>
                                <figcaption>
                                    <b>Ayush Pant</b>
                                    <span>Founder &amp; CMO · Aurelius Media</span>
                                </figcaption>
                            </figure>
                        </div>

                        {/* Credentials */}
                        <div className="pg-author-creds rv">
                            <div className="statband">
                                {credentialStats.map((c) => (
                                    <div className="st" key={c.label}>
                                        <b>{c.value}</b>
                                        <span className="lb">{c.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="chips">
                                {credentialBadges.map((cred) => (
                                    <span key={cred} className="chip acc">
                                        {cred}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Posts */}
                <section className="sec">
                    <div className="wrap">
                        <div className="shead rv">
                            <div>
                                <span className="k">— Writing —</span>
                                <h2>Articles by Ayush</h2>
                            </div>
                            <span className="m10">{allPosts.length} articles</span>
                        </div>
                        <div className="pg-alist">
                            {allPosts.map((post, i) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="pg-arow">
                                    <span className="pg-ano">{String(i + 1).padStart(2, '0')}</span>
                                    <div>
                                        <div className="pg-ameta">
                                            <span className="pg-cat">{post.category}</span> &middot; {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })} &middot; {post.readTime}
                                        </div>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                    </div>
                                    <span className="pg-aarr" aria-hidden="true">→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
