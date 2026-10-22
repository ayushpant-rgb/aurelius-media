import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BlogPostMeta } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { type JSX } from 'react';
import BlogPostTracker from '@/components/BlogPostTracker';
import PostCard from '@/components/ui/PostCard';
import NewsletterBand from '../NewsletterBand';
import ShareBar from './ShareBar';
import '@/app/styles/blog.css';

const BASE_URL = 'https://www.aureliusmedia.co';
const CAL_URL = 'https://cal.com/aureliusmedia/15min';

// Dates are plain YYYY-MM-DD strings; format in UTC so the day never shifts.
function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

// MDX components. Typography, tables, callouts, stats, FAQs etc. are styled
// globally under `.blog-article` (globals.css); these only add structure.
const mdxComponents = {
    h1: (props: JSX.IntrinsicElements['h1']) => (
        <h2 {...props} />
    ),
    h2: (props: JSX.IntrinsicElements['h2']) => (
        <h2 {...props} />
    ),
    h3: (props: JSX.IntrinsicElements['h3']) => (
        <h3 {...props} />
    ),
    p: (props: JSX.IntrinsicElements['p']) => (
        <p {...props} />
    ),
    ul: (props: JSX.IntrinsicElements['ul']) => (
        <ul className="list-disc" {...props} />
    ),
    ol: (props: JSX.IntrinsicElements['ol']) => (
        <ol className="list-decimal" {...props} />
    ),
    li: (props: JSX.IntrinsicElements['li']) => (
        <li {...props} />
    ),
    strong: (props: JSX.IntrinsicElements['strong']) => (
        <strong {...props} />
    ),
    em: (props: JSX.IntrinsicElements['em']) => (
        <em {...props} />
    ),
    blockquote: (props: JSX.IntrinsicElements['blockquote']) => (
        <blockquote {...props} />
    ),
    a: (props: JSX.IntrinsicElements['a']) => (
        <a {...props} />
    ),
    hr: () => <hr />,
    code: (props: JSX.IntrinsicElements['code']) => (
        <code {...props} />
    ),
    pre: ({ children }: JSX.IntrinsicElements['pre']) => {
        const child = children as React.ReactElement<{ className?: string }>;
        const className = child?.props?.className || '';
        const lang = className.replace('language-', '');

        return (
            <div className="ar-code">
                {lang && <div className="ar-codehead">{lang}</div>}
                <pre>{children}</pre>
            </div>
        );
    },
    img: (props: JSX.IntrinsicElements['img']) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={props.alt || ''} {...props} />
    ),
    table: (props: JSX.IntrinsicElements['table']) => (
        <div className="ar-tablewrap">
            <table {...props} />
        </div>
    ),
    thead: (props: JSX.IntrinsicElements['thead']) => (
        <thead {...props} />
    ),
    tbody: (props: JSX.IntrinsicElements['tbody']) => (
        <tbody {...props} />
    ),
    tr: (props: JSX.IntrinsicElements['tr']) => (
        <tr {...props} />
    ),
    th: (props: JSX.IntrinsicElements['th']) => (
        <th {...props} />
    ),
    td: (props: JSX.IntrinsicElements['td']) => (
        <td {...props} />
    ),
};

interface BlogPostClientProps {
    post: BlogPost;
    relatedPosts: BlogPostMeta[];
}

// Article view (Claude Design frames 33/34).
export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    return (
        <>
            <BlogPostTracker title={post.title} category={post.category} slug={post.slug} author={post.author} />

            {/* Article header — centred */}
            <section className="ar-top">
                <div className="wrap">
                    <nav className="crumb ar-crumb" aria-label="Breadcrumb">
                        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>{post.category}</span>
                    </nav>

                    <header className="arthead">
                        <span className="tagpill">{post.category}</span>
                        <h1 className="fd">{post.title}</h1>
                        <div className="ar-meta">
                            <span className="byline">
                                <span className="av">
                                    <Image src="/images/ayush.jpeg" alt={post.author} width={80} height={80} sizes="40px" />
                                </span>
                                <span>
                                    <b>{post.author}</b>
                                    <span className="readt">{post.authorRole}</span>
                                </span>
                            </span>
                            <span className="ar-when">
                                <span className="readt ar-dot" aria-hidden="true">&middot;</span>
                                <time className="readt" dateTime={post.date}>{formatDate(post.date)}</time>
                                <span className="readt" aria-hidden="true">&middot;</span>
                                <span className="readt">{post.readTime}</span>
                            </span>
                        </div>
                    </header>

                    {/* Hero image — ogImage stays a relative path through next/image */}
                    <div className="arthero">
                        {post.ogImage ? (
                            <Image
                                src={post.ogImage}
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 1280px) 100vw, 1200px"
                            />
                        ) : (
                            <div className="ar-fallback gridbg">
                                <span className="k">{post.category}</span>
                                <p className="fd">{post.title}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article content */}
            <section className="ar-body">
                <div className="wrap">
                    <article className="blog-article">
                        <MDXRemote
                            source={post.content}
                            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                            components={mdxComponents}
                        />
                    </article>
                </div>
            </section>

            <div className="wrap ar-end">
                <ShareBar url={`${BASE_URL}/blog/${post.slug}`} title={post.title} />

                {/* Author card */}
                <div className="authorbio ar-narrow">
                    <span className="av">
                        <Image src="/images/ayush.jpeg" alt={post.author} width={128} height={128} sizes="64px" />
                    </span>
                    <div>
                        <Link href="/authors/ayush-pant" className="ar-bioname">{post.author}</Link>
                        <div className="ar-biorole">{post.authorRole}</div>
                        <p>
                            20+ years in digital marketing. Google &amp; Meta certified. Managed $15M+ in ad spend across 150+ clients in 25+ countries. Passionate about Stoic philosophy and AI-powered marketing.
                        </p>
                    </div>
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <>
                        <hr className="hr ar-hr" />
                        <div className="ar-rel">
                            <div className="shead rv">
                                <div>
                                    <span className="k">— Related Articles —</span>
                                    <h2>Keep reading</h2>
                                </div>
                                <Link href="/blog" className="btn ghost sm">All Posts →</Link>
                            </div>
                            <div className="pgrid gs">
                                {relatedPosts.map((rp) => (
                                    <PostCard key={rp.slug} post={rp} />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <hr className="hr ar-hr" />

                {/* Strategy-call CTA */}
                <div className="ctabox gridbg ar-cta rv">
                    <span className="k">— Work With Us —</span>
                    <h3>Want us to build this for you?</h3>
                    <p>Book a free strategy call and we&rsquo;ll audit your growth opportunity.</p>
                    <div className="btnrow">
                        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn">
                            Book a Strategy Call &rarr;
                        </a>
                    </div>
                </div>

                {/* Newsletter CTA */}
                <NewsletterBand source="blog_post" className="ar-news" />
            </div>
        </>
    );
}
