import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';

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

function formatDateShort(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function BlogPreview({ posts }: { posts: BlogPostMeta[] }) {
    return (
        <section className="section-padding bg-brand-dark">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <p className="section-label">Blog</p>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Latest <span className="gradient-text font-display">Insights</span>
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
                            className="group flex flex-col rounded-[20px] bg-brand-card border border-brand-border-subtle hover:border-[rgba(232,85,15,0.3)] transition-all duration-300 overflow-hidden hover:-translate-y-[3px] animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {/* Image */}
                            <div className="relative h-[200px] bg-gradient-to-br from-brand-card-hover to-brand-dark overflow-hidden">
                                {post.ogImage ? (
                                    <Image
                                        src={post.ogImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 380px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[11px] text-brand-gray-dark">
                                        Article cover
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex flex-col flex-1">
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

                                <p className="text-[13px] text-brand-gray leading-[1.6] flex-1 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-brand-border-subtle">
                                            <Image src="/images/ayush.jpeg" alt={post.author} width={28} height={28} className="object-cover w-full h-full" />
                                        </div>
                                        <span className="text-[11px] text-brand-gray-dark">{post.author}</span>
                                    </div>
                                    <span className="text-[11px] text-brand-gray-dark font-mono">{formatDateShort(post.date)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
