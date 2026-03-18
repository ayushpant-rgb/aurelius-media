'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useInView } from '@/lib/hooks';
import { BlogPostMeta } from '@/lib/blog';

const categoryColors: Record<string, string> = {
    'AI Marketing': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Case Study': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Creative Production': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

export default function BlogPreview({ posts }: { posts: BlogPostMeta[] }) {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} className="section-padding bg-brand-dark">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">Blog</p>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Latest <span className="font-display italic font-normal">Insights</span>
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-brand-accent hover:text-brand-accent-hover transition-colors flex items-center gap-1"
                    >
                        View All Posts
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {posts.map((post, i) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className={`group flex flex-col rounded-xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 overflow-hidden hover:-translate-y-0.5 ${inView ? 'animate-fade-in-up' : 'opacity-0'
                                }`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {/* Image Placeholder or Actual Image */}
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-card to-brand-dark overflow-hidden">
                                {post.ogImage ? (
                                    <Image
                                        src={post.ogImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-4xl opacity-30">📝</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[post.category] || 'bg-brand-card text-brand-gray border-brand-border'}`}>
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-brand-gray-dark">{post.readTime}</span>
                                </div>

                                <h3 className="text-base font-bold mb-2 group-hover:text-brand-white transition-colors leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-brand-gray leading-relaxed flex-1">
                                    {post.excerpt}
                                </p>

                                <span className="mt-4 text-sm font-medium text-brand-accent group-hover:text-brand-accent-hover transition-colors">
                                    Read More →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
