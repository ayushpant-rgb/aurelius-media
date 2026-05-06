import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { generatePersonSchema, generateBreadcrumbSchema } from '@/lib/schema';

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

            <main className="min-h-screen bg-brand-dark">
                {/* Hero */}
                <section className="max-w-[860px] mx-auto px-5 sm:px-6 pt-20 pb-12">
                    <nav className="text-[12px] text-brand-gray-dark mb-8">
                        <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/blog" className="hover:text-brand-white transition-colors">Blog</Link>
                        <span className="mx-2">/</span>
                        <span className="text-brand-white">Ayush Pant</span>
                    </nav>

                    <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-brand-border-subtle shrink-0">
                            <Image
                                src="/images/ayush.jpeg"
                                alt="Ayush Pant — Founder, Aurelius Media"
                                width={96}
                                height={96}
                                priority
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-brand-white leading-tight mb-1">
                                Ayush Pant
                            </h1>
                            <p className="text-brand-gray text-[15px] mb-3">
                                Founder &amp; CMO, Aurelius Media
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="https://www.linkedin.com/in/ayushpant/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[12px] px-3 py-1.5 rounded-full border border-brand-border-subtle text-brand-gray hover:text-brand-white hover:border-brand-accent/40 transition-colors"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://x.com/FollowAurelius"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[12px] px-3 py-1.5 rounded-full border border-brand-border-subtle text-brand-gray hover:text-brand-white hover:border-brand-accent/40 transition-colors"
                                >
                                    X / Twitter
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4 text-[15px] text-brand-gray leading-[1.7]">
                        <p>
                            Ayush Pant is the Founder and CMO of Aurelius Media, a performance marketing agency
                            specialising in AI-powered advertising, edtech and education marketing, and growth strategy
                            for ambitious brands across India and internationally.
                        </p>
                        <p>
                            With 20+ years in digital marketing and certifications from Google and Meta, Ayush has
                            managed <strong className="text-brand-white">$15M+ in ad spend</strong> across{' '}
                            <strong className="text-brand-white">150+ clients in 25+ countries</strong> — spanning
                            D2C ecommerce, B2B SaaS, edtech unicorns, real estate developers, and independent authors.
                        </p>
                        <p>
                            He writes about performance marketing, AI search strategy, Meta and Google Ads, and the
                            business of growing brands through paid and organic channels. His work has been cited by
                            marketing practitioners across India, the US, and Europe.
                        </p>
                    </div>

                    {/* Credential pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {[
                            'Google Ads Certified',
                            'Meta Blueprint Certified',
                            '$15M+ Ad Spend Managed',
                            '150+ Clients',
                            '25+ Countries',
                            '20+ Years Experience',
                        ].map((cred) => (
                            <span
                                key={cred}
                                className="text-[11px] px-3 py-1 rounded-full bg-brand-card border border-brand-border-subtle text-brand-gray"
                            >
                                {cred}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Posts */}
                <section className="max-w-[860px] mx-auto px-5 sm:px-6 pb-20">
                    <h2 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-brand-white mb-6 border-t border-brand-border-subtle pt-8">
                        Articles by Ayush
                    </h2>
                    <div className="space-y-4">
                        {allPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col sm:flex-row gap-4 p-5 rounded-[16px] bg-brand-card border border-brand-border-subtle hover:border-[rgba(232,85,15,0.3)] transition-all duration-300"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="text-[11px] text-brand-gray-dark uppercase tracking-wide mb-1.5">
                                        {post.category} &middot; {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })} &middot; {post.readTime}
                                    </div>
                                    <h3 className="font-display text-[16px] font-bold text-brand-white leading-snug group-hover:text-brand-accent-text transition-colors mb-1.5">
                                        {post.title}
                                    </h3>
                                    <p className="text-[13px] text-brand-gray leading-[1.55] line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
