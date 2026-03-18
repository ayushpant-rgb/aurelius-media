'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';
import { useState } from 'react';

const categoryColors: Record<string, string> = {
    'AI Marketing': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Industry Insights': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Case Study': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Creative Production': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'Performance Advertising': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Tutorials': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function BlogListClient({ posts }: { posts: BlogPostMeta[] }) {
    const categories = ['All', ...new Set(posts.map(p => p.category))];
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? posts
        : posts.filter(p => p.category === activeCategory);

    return (
        <main className="bg-brand-dark text-brand-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow opacity-40" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card/50 border border-brand-border-subtle text-[10px] font-medium text-brand-gray-dark mb-6">
                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                        Insights & Resources
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
                        The Aurelius{' '}
                        <span className="font-display italic font-normal">Blog.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-brand-gray max-w-xl mx-auto leading-relaxed">
                        AI marketing strategies, campaign deep-dives, and growth insights
                        from the team at Aurelius Media.
                    </p>
                </div>
            </section>

            {/* Category Filters */}
            <section className="bg-brand-dark border-b border-brand-border-subtle">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                                activeCategory === cat
                                    ? 'bg-brand-accent/15 text-brand-accent border-brand-accent/30'
                                    : 'bg-brand-card/50 text-brand-gray border-brand-border-subtle hover:border-brand-border-hover'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-12 sm:py-16 bg-brand-dark">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-brand-gray">No posts in this category yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
                                >
                                    {/* Post Thumbnail */}
                                    <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-card-hover to-brand-dark overflow-hidden">
                                        {post.ogImage ? (
                                            <Image
                                                src={post.ogImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-3xl opacity-20">📝</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${categoryColors[post.category] || 'bg-brand-card text-brand-gray border-brand-border'}`}>
                                                {post.category}
                                            </span>
                                            <span className="text-[10px] text-brand-gray-dark">{post.readTime}</span>
                                        </div>

                                        <h2 className="text-sm font-bold mb-2 group-hover:text-brand-white transition-colors leading-snug">
                                            {post.title}
                                        </h2>

                                        <p className="text-xs text-brand-gray leading-relaxed flex-1 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-[10px] text-brand-gray-dark">
                                                {formatDate(post.date)}
                                            </span>
                                            <span className="text-xs font-medium text-brand-accent group-hover:text-brand-accent-hover transition-colors">
                                                Read More →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 sm:py-20 bg-brand-darker">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3">
                        Stay <span className="font-display italic font-normal">informed.</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-md mx-auto mb-6 leading-relaxed">
                        Get the latest AI marketing insights, campaign strategies, and growth
                        playbooks delivered to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-3 rounded-lg bg-brand-card border border-brand-border-subtle text-sm text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-border-hover transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 cta-primary text-white font-semibold rounded-lg text-sm whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
