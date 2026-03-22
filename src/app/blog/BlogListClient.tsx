'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';
import { useState } from 'react';

const categoryTagClass: Record<string, string> = {
    'Performance Marketing': 'tag-orange',
    'Performance Advertising': 'tag-orange',
    'Paid Media': 'tag-orange',
    'Book Marketing': 'tag-orange',
    'Creative Production': 'tag-orange',
    'SEO & Content Strategy': 'tag-green',
    'Case Study': 'tag-green',
    'Industry Insights': 'tag-green',
    'Growth Engineering': 'tag-blue',
    'AI Marketing': 'tag-blue',
    'Tutorials': 'tag-blue',
};

function getTagClass(category: string): string {
    return categoryTagClass[category] || 'tag-orange';
}

function getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatDateShort(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateFull(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogListClient({ posts }: { posts: BlogPostMeta[] }) {
    const categories = ['All', ...new Set(posts.map(p => p.category))];
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

    // Only show featured card on "All" view
    const featuredPost = activeCategory === 'All' ? filtered.find(p => p.featured) : null;
    const gridPosts = featuredPost ? filtered.filter(p => p.slug !== featuredPost.slug) : filtered;

    return (
        <main className="bg-brand-dark text-brand-white">
            {/* Header + Filters */}
            <section className="pt-32 pb-4">
                <div className="max-w-[1160px] mx-auto px-5 sm:px-6 lg:px-10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-8">
                        <div>
                            <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.1] text-brand-white max-w-[600px]">
                                Latest <span className="gradient-text">insights.</span>
                            </h1>
                            <p className="text-[15px] text-brand-gray mt-2.5 max-w-[440px]">
                                Strategies, case studies, and tactical guides from 20+ years in performance marketing.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`tag cursor-pointer transition-all ${
                                        activeCategory === cat
                                            ? 'tag-orange'
                                            : 'bg-brand-card-hover text-brand-gray border border-brand-border'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured post */}
                    {featuredPost && (
                        <Link href={`/blog/${featuredPost.slug}`} className="block mb-5 group">
                            <div className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] bg-brand-card border border-brand-border-subtle overflow-hidden transition-all duration-200 group-hover:border-[rgba(232,85,15,0.3)]">
                                <div className="relative min-h-[220px] md:min-h-[300px] bg-gradient-to-br from-brand-card-hover to-brand-dark overflow-hidden">
                                    {featuredPost.ogImage ? (
                                        <Image
                                            src={featuredPost.ogImage}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 580px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[11px] text-brand-gray-dark">
                                            Featured article cover image
                                        </div>
                                    )}
                                </div>
                                <div className="p-7 sm:p-9 flex flex-col justify-center">
                                    <div className="flex gap-2 mb-3.5">
                                        <span className="tag tag-orange">Featured</span>
                                        <span className={`tag ${getTagClass(featuredPost.category)}`}>
                                            {featuredPost.category}
                                        </span>
                                    </div>
                                    <h2 className="font-display text-xl sm:text-[26px] font-extrabold tracking-[-0.03em] leading-[1.2] text-brand-white mb-3">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-[14px] text-brand-gray leading-[1.65] mb-5 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-brand-border-subtle">
                                            <Image src="/images/ayush.jpeg" alt={featuredPost.author} width={28} height={28} sizes="28px" className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="text-[12px] font-semibold text-brand-white">{featuredPost.author}</div>
                                            <div className="text-[11px] text-brand-gray-dark">
                                                {formatDateFull(featuredPost.date)} &middot; {featuredPost.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Card grid */}
                    {gridPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {gridPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col rounded-[20px] bg-brand-card border border-brand-border-subtle hover:border-[rgba(232,85,15,0.3)] transition-all duration-300 overflow-hidden hover:-translate-y-[3px]"
                                >
                                    <div className="relative h-[200px] bg-gradient-to-br from-brand-card-hover to-brand-dark overflow-hidden">
                                        {post.ogImage ? (
                                            <Image
                                                src={post.ogImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[11px] text-brand-gray-dark">
                                                Article cover
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2.5">
                                            <span
                                                className={`tag ${getTagClass(post.category)}`}
                                                style={{ fontSize: '9px', padding: '2px 8px' }}
                                            >
                                                {post.category}
                                            </span>
                                            <span className="text-[11px] text-brand-gray-dark">{post.readTime}</span>
                                        </div>
                                        <h3 className="font-display text-[18px] font-bold tracking-[-0.02em] leading-[1.3] text-brand-white mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-[13px] text-brand-gray leading-[1.6] mb-3.5 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-brand-border-subtle">
                                                    <Image src="/images/ayush.jpeg" alt={post.author} width={28} height={28} sizes="28px" className="object-cover w-full h-full" />
                                                </div>
                                                <span className="text-[11px] text-brand-gray-dark">{post.author}</span>
                                            </div>
                                            <span className="text-[11px] text-brand-gray-dark font-mono">{formatDateShort(post.date)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-brand-gray">No posts in this category yet.</p>
                        </div>
                    )}

                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-12 bg-brand-dark">
                <div className="max-w-[700px] mx-auto px-5 sm:px-6">
                    <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#1A0D05] to-brand-card border border-brand-accent-border p-10 sm:p-12 text-center">
                        <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[radial-gradient(ellipse,rgba(232,85,15,0.15)_0%,transparent_70%)] pointer-events-none" />
                        <div className="relative">
                            <h2 className="font-display text-xl sm:text-[24px] font-extrabold tracking-[-0.03em] text-brand-white mb-2">
                                Get the Aurelius newsletter
                            </h2>
                            <p className="text-[14px] text-brand-gray mb-6">
                                Weekly insights on performance marketing, AI, and growth. No spam. Unsubscribe anytime.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-2 max-w-[420px] mx-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 bg-brand-card-hover border border-brand-border rounded-xl py-[11px] px-4 text-[14px] text-brand-white placeholder:text-brand-gray-dark focus:outline-none"
                                />
                                <button type="submit" className="cta-primary text-white font-semibold rounded-xl px-5 py-[11px] text-[14px]">
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-[11px] text-brand-gray-dark mt-3">
                                Join 2,400+ marketers &middot; Free forever
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
