import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BlogPostMeta } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { type JSX } from 'react';
import NewsletterForm from '@/components/NewsletterForm';
import BlogPostTracker from '@/components/BlogPostTracker';

const categoryTagClass: Record<string, string> = {
    'Performance Marketing': 'tag-orange',
    'Performance Advertising': 'tag-orange',
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

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function formatDateShort(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// MDX components — styled to match Blog Style Tile
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
            <div className="rounded-xl overflow-hidden border border-brand-border bg-brand-card mb-6">
                {lang && (
                    <div className="px-4 py-2.5 bg-brand-card-hover border-b border-brand-border flex items-center justify-between">
                        <span className="font-mono text-[11px] text-brand-gray-dark font-medium">{lang}</span>
                        <span className="text-[10px] text-brand-gray-dark cursor-pointer px-2 py-1 rounded border border-brand-border-subtle hover:text-brand-gray hover:border-brand-border-hover transition-all">
                            Copy
                        </span>
                    </div>
                )}
                <div className="px-5 py-4 overflow-x-auto">
                    {children}
                </div>
            </div>
        );
    },
    img: (props: JSX.IntrinsicElements['img']) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={props.alt || ''} {...props} />
    ),
    table: (props: JSX.IntrinsicElements['table']) => (
        <div className="my-6 overflow-x-auto rounded-xl border border-brand-border">
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

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    return (
        <main className="bg-brand-dark text-brand-white">
            <BlogPostTracker title={post.title} category={post.category} slug={post.slug} author={post.author} />
            {/* Article Header — centered */}
            <section className="relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,85,15,0.15)_0%,rgba(232,85,15,0.04)_50%,transparent_75%)] pointer-events-none" />

                <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 lg:px-10 pt-32 pb-10 text-center">
                    {/* Category + read time */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <span className={`tag ${getTagClass(post.category)}`}>{post.category}</span>
                        <span className="text-[12px] text-brand-gray-dark">&middot; {post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-brand-white mb-5">
                        {post.title}
                    </h1>

                    {/* Author + date */}
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-border-subtle">
                                <Image
                                    src="/images/ayush.jpeg"
                                    alt={post.author}
                                    width={32}
                                    height={32}
                                    sizes="32px"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-[13px] font-semibold text-brand-white">{post.author}</div>
                                <div className="text-[11px] text-brand-gray-dark">{post.authorRole}</div>
                            </div>
                        </div>
                        <span className="text-[12px] text-brand-gray-dark">{formatDate(post.date)}</span>
                    </div>
                </div>

                {/* Hero image */}
                <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-10 pb-0">
                    <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden border border-brand-border bg-brand-card-hover">
                        {post.ogImage ? (
                            <Image
                                src={post.ogImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 900px) 100vw, 900px"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-brand-card to-brand-darker" />
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-accent/5 to-transparent" />
                                <div
                                    className="absolute inset-0 opacity-[0.04]"
                                    style={{
                                        backgroundImage: 'linear-gradient(var(--color-brand-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-border-subtle) 1px, transparent 1px)',
                                        backgroundSize: '40px 40px',
                                    }}
                                />
                                <div className="relative z-10 text-center px-8">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-accent mb-3 opacity-70">
                                        {post.category}
                                    </p>
                                    <p className="text-2xl sm:text-3xl gradient-text font-display leading-tight max-w-lg">
                                        {post.title}
                                    </p>
                                </div>
                                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-dark to-transparent" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="blog-article pt-12 pb-4 sm:pt-16 sm:pb-8 px-5 sm:px-6">
                <MDXRemote
                    source={post.content}
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    components={mdxComponents}
                />
            </article>

            {/* Author Card */}
            <div className="max-w-[680px] mx-auto px-5 sm:px-6">
                <div className="flex gap-5 p-7 rounded-[20px] bg-brand-card border border-brand-border-subtle my-12">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-brand-border-subtle">
                        <Image
                            src="/images/ayush.jpeg"
                            alt={post.author}
                            width={56}
                            height={56}
                            sizes="56px"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="font-display text-[16px] font-bold text-brand-white mb-0.5">{post.author}</div>
                        <div className="text-[13px] text-brand-gray-dark mb-2">{post.authorRole}</div>
                        <p className="text-[13px] text-brand-gray leading-[1.6]">
                            20+ years in digital marketing. Google &amp; Meta certified. Managed $15M+ in ad spend across 150+ clients in 25+ countries. Passionate about Stoic philosophy and AI-powered marketing.
                        </p>
                    </div>
                </div>
            </div>

            {/* Inline CTA */}
            <div className="max-w-[680px] mx-auto px-5 sm:px-6">
                <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-br from-[#1A0D05] to-brand-card border border-brand-accent-border p-8 text-center my-10">
                    <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(232,85,15,0.15)_0%,transparent_70%)] pointer-events-none" />
                    <div className="relative">
                        <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-brand-white mb-2">
                            Want us to build this for you?
                        </h3>
                        <p className="text-[14px] text-brand-gray mb-5">
                            Book a free strategy call and we&rsquo;ll audit your growth opportunity.
                        </p>
                        <a
                            href="https://cal.com/aureliusmedia/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex px-6 py-3 cta-primary text-white font-semibold text-[14px]"
                        >
                            Book a Strategy Call &rarr;
                        </a>
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-12 bg-brand-card mt-12">
                    <div className="max-w-[1160px] mx-auto px-5 sm:px-6 lg:px-10">
                        <h2 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-brand-white mb-5">
                            Keep reading
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedPosts.map((rp) => (
                                <Link
                                    key={rp.slug}
                                    href={`/blog/${rp.slug}`}
                                    className="group flex flex-col rounded-[20px] bg-brand-card border border-brand-border-subtle hover:border-[rgba(232,85,15,0.3)] transition-all duration-300 overflow-hidden hover:-translate-y-[3px]"
                                >
                                    <div className="relative h-[200px] bg-gradient-to-br from-brand-card-hover to-brand-dark overflow-hidden">
                                        {rp.ogImage ? (
                                            <Image
                                                src={rp.ogImage}
                                                alt={rp.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 380px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[11px] text-brand-gray-dark">
                                                Cover
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2.5">
                                            <span
                                                className={`tag ${getTagClass(rp.category)}`}
                                                style={{ fontSize: '9px', padding: '2px 8px' }}
                                            >
                                                {rp.category}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-[18px] font-bold tracking-[-0.02em] leading-[1.3] text-brand-white mb-2">
                                            {rp.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-[11px] text-brand-gray-dark font-mono">{rp.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
                            <NewsletterForm source="blog_post" />
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
