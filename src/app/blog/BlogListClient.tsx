'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';
import { useState } from 'react';
import PostCard from '@/components/ui/PostCard';
import NewsletterBand from './NewsletterBand';
import '@/app/styles/blog.css';

// Dates are plain YYYY-MM-DD strings; format in UTC so server and browser agree.
function formatDateFull(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export default function BlogListClient({ posts }: { posts: BlogPostMeta[] }) {
    const categories = ['All', ...new Set(posts.map(p => p.category))];
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

    // Only show featured card on "All" view
    const featuredPost = activeCategory === 'All' ? filtered.find(p => p.featured) : null;
    const gridPosts = featuredPost ? filtered.filter(p => p.slug !== featuredPost.slug) : filtered;

    return (
        <>
            {/* Header + filters + posts (Claude Design frame 31/32) */}
            <section className="bl-top">
                <div className="wrap">
                    <div className="bl-head">
                        <div>
                            <h1 className="fd">
                                Latest <br />
                                <em>insights.</em>
                            </h1>
                            <p className="bl-intro">
                                Strategies, case studies, and tactical guides from 20+ years in performance marketing.
                            </p>
                        </div>
                        <div className="catbar" role="group" aria-label="Filter posts by category">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setActiveCategory(cat)}
                                    className={`catchip${activeCategory === cat ? ' on' : ''}`}
                                    aria-pressed={activeCategory === cat}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured post */}
                    {featuredPost && (
                        <Link href={`/blog/${featuredPost.slug}`} className="blogfeat bl-feat">
                            <div className="img">
                                {featuredPost.ogImage ? (
                                    <Image
                                        src={featuredPost.ogImage}
                                        alt={featuredPost.title}
                                        fill
                                        priority
                                        sizes="(max-width: 900px) 100vw, 680px"
                                    />
                                ) : (
                                    <span className="m10 bl-noimg">Featured article cover image</span>
                                )}
                            </div>
                            <div className="body">
                                <div className="bl-pills">
                                    <span className="tagpill">Featured</span>
                                    <span className="tagpill mute">{featuredPost.category}</span>
                                </div>
                                <h2>{featuredPost.title}</h2>
                                <p>{featuredPost.excerpt}</p>
                                <div className="bl-foot">
                                    <span className="byline">
                                        <span className="av">
                                            <Image src="/images/ayush.jpeg" alt={featuredPost.author} width={60} height={60} sizes="30px" />
                                        </span>
                                        <span>
                                            <b>{featuredPost.author}</b>
                                            <span className="readt">{formatDateFull(featuredPost.date)}</span>
                                        </span>
                                    </span>
                                    <span className="readt">{featuredPost.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Card grid */}
                    {gridPosts.length > 0 ? (
                        <div className="pgrid gs">
                            {gridPosts.map((post) => (
                                <PostCard key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="bl-empty">
                            <p>No posts in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="bl-newssec">
                <div className="wrap">
                    <NewsletterBand source="blog_list" />
                </div>
            </section>
        </>
    );
}
