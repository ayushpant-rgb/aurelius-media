import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { type JSX } from 'react';


function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Custom MDX components for styling
const mdxComponents = {
    h1: (props: JSX.IntrinsicElements['h1']) => (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-14 mb-6 text-brand-white tracking-tight" {...props} />
    ),
    h2: (props: JSX.IntrinsicElements['h2']) => (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-14 mb-5 text-brand-white tracking-tight first:mt-0" {...props} />
    ),
    h3: (props: JSX.IntrinsicElements['h3']) => (
        <h3 className="text-lg sm:text-xl font-bold mt-10 mb-4 text-brand-white" {...props} />
    ),
    p: (props: JSX.IntrinsicElements['p']) => (
        <p className="text-[17px] sm:text-lg text-brand-white leading-[1.85] mb-7" {...props} />
    ),
    ul: (props: JSX.IntrinsicElements['ul']) => (
        <ul className="space-y-3 mb-7 ml-5 list-disc marker:text-brand-white" {...props} />
    ),
    ol: (props: JSX.IntrinsicElements['ol']) => (
        <ol className="space-y-3 mb-7 ml-5 list-decimal marker:text-brand-white" {...props} />
    ),
    li: (props: JSX.IntrinsicElements['li']) => (
        <li className="text-[17px] sm:text-lg text-brand-white leading-[1.85] pl-1" {...props} />
    ),
    strong: (props: JSX.IntrinsicElements['strong']) => (
        <strong className="text-brand-white font-semibold" {...props} />
    ),
    em: (props: JSX.IntrinsicElements['em']) => (
        <em className="text-brand-white italic" {...props} />
    ),
    blockquote: (props: JSX.IntrinsicElements['blockquote']) => (
        <blockquote className="border-l-[3px] border-brand-gold pl-6 my-10 py-1 text-[19px] sm:text-xl text-brand-white italic leading-[1.7]" {...props} />
    ),
    a: (props: JSX.IntrinsicElements['a']) => (
        <a className="text-brand-white hover:text-brand-accent underline underline-offset-4 decoration-brand-white/30 hover:decoration-brand-accent transition-colors" {...props} />
    ),
    hr: () => (
        <hr className="border-brand-border-subtle my-12" />
    ),
    code: (props: JSX.IntrinsicElements['code']) => (
        <code className="px-1.5 py-0.5 bg-brand-card rounded text-[15px] font-mono text-brand-accent" {...props} />
    ),
    pre: (props: JSX.IntrinsicElements['pre']) => (
        <pre className="bg-[#111] rounded-xl p-5 mb-8 overflow-x-auto border border-brand-border-subtle text-sm leading-relaxed" {...props} />
    ),
    img: (props: JSX.IntrinsicElements['img']) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-xl border border-brand-border-subtle my-8 w-full" alt={props.alt || ''} {...props} />
    ),
    table: (props: JSX.IntrinsicElements['table']) => (
        <div className="my-8 overflow-x-auto rounded-xl border border-brand-border-subtle">
            <table className="w-full text-[15px]" {...props} />
        </div>
    ),
    thead: (props: JSX.IntrinsicElements['thead']) => (
        <thead className="bg-brand-card border-b border-brand-border-subtle" {...props} />
    ),
    tbody: (props: JSX.IntrinsicElements['tbody']) => (
        <tbody className="divide-y divide-brand-border-subtle" {...props} />
    ),
    tr: (props: JSX.IntrinsicElements['tr']) => (
        <tr className="hover:bg-brand-card/40 transition-colors" {...props} />
    ),
    th: (props: JSX.IntrinsicElements['th']) => (
        <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-widest text-brand-gray-dark whitespace-nowrap" {...props} />
    ),
    td: (props: JSX.IntrinsicElements['td']) => (
        <td className="px-4 py-3 text-[15px] text-brand-white leading-relaxed" {...props} />
    ),
};

export default function BlogPostClient({ post }: { post: BlogPost }) {
    return (
        <main className="bg-brand-dark text-brand-white">
            {/* Article Hero — header + image unified */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow opacity-20" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-0">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-brand-gray-dark mb-5">
                        <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-brand-white transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-brand-gray truncate max-w-[200px]">{post.title}</span>
                    </nav>

                    {/* Category + meta row */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono uppercase tracking-widest text-brand-accent">
                            {post.category}
                        </span>
                        <span className="text-brand-border-subtle text-xs">•</span>
                        <span className="text-xs text-brand-gray-dark">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6 max-w-3xl">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-lg sm:text-xl text-brand-white/90 leading-[1.6] mb-6 max-w-2xl">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author row */}
                    <div className="flex items-center gap-3 pb-8 border-b border-brand-border-subtle">
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-border-subtle">
                            <Image
                                src="/images/ayush.jpeg"
                                alt={post.author}
                                width={32}
                                height={32}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-brand-white font-medium">{post.author}</span>
                            <span className="text-brand-gray-dark">·</span>
                            <span className="text-brand-gray-dark">{post.authorRole}</span>
                            <span className="text-brand-gray-dark">·</span>
                            <span className="text-brand-gray-dark">{formatDate(post.date)}</span>
                        </div>
                    </div>

                    {/* Hero image — always shown, branded fallback if no ogImage */}
                    <div className="mt-0 -mx-4 sm:-mx-6 md:-mx-0">
                        <div className="relative w-full aspect-[4/3] md:rounded-xl overflow-hidden border-y md:border border-brand-border-subtle">
                            {post.ogImage ? (
                                <Image
                                    src={post.ogImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 896px) 100vw, 896px"
                                />
                            ) : (
                                <div className="w-full h-full bg-brand-card flex items-center justify-center relative overflow-hidden">
                                    {/* Ambient gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-brand-card to-brand-darker" />
                                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-accent/5 to-transparent" />
                                    {/* Grid pattern */}
                                    <div
                                        className="absolute inset-0 opacity-[0.04]"
                                        style={{
                                            backgroundImage: 'linear-gradient(var(--color-brand-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-border-subtle) 1px, transparent 1px)',
                                            backgroundSize: '40px 40px',
                                        }}
                                    />
                                    {/* Center content */}
                                    <div className="relative z-10 text-center px-8">
                                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-accent mb-3 opacity-70">
                                            {post.category}
                                        </p>
                                        <p className="text-2xl sm:text-3xl font-display italic font-normal text-brand-white/20 leading-tight max-w-lg">
                                            {post.title}
                                        </p>
                                    </div>
                                    {/* Bottom fade */}
                                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-dark to-transparent" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="pt-12 pb-16 sm:pt-16 sm:pb-20 bg-brand-dark">
                <div className="max-w-[720px] mx-auto px-5 sm:px-6">
                    <MDXRemote
                        source={post.content}
                        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                        components={mdxComponents}
                    />
                </div>
            </article>

            {/* Author Box */}
            <section className="pb-12 bg-brand-dark">
                <div className="max-w-[720px] mx-auto px-5 sm:px-6">
                    <div className="p-6 rounded-xl bg-brand-card border border-brand-border-subtle flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-brand-border-subtle">
                            <Image
                                src="/images/ayush.jpeg"
                                alt={post.author}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-brand-white">{post.author}</p>
                            <p className="text-sm text-brand-gray mb-2">{post.authorRole}</p>
                            <p className="text-sm text-brand-gray leading-relaxed">
                                20+ years in digital marketing. Trusted by unicorn founders and VC-backed startups across 25+ countries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-brand-darker">
                <div className="max-w-[720px] mx-auto px-5 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        Ready to <span className="font-display italic font-normal">grow?</span>
                    </h2>
                    <p className="text-base text-brand-gray max-w-md mx-auto mb-7 leading-relaxed">
                        Book a 15-minute strategy call to discuss how we can scale your marketing.
                    </p>
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-7 py-3.5 cta-primary text-white font-semibold rounded-lg text-sm"
                    >
                        Book a Strategy Call
                    </a>
                </div>
            </section>

            {/* Back to Blog */}
            <section className="py-8 bg-brand-dark border-t border-brand-border-subtle">
                <div className="max-w-[720px] mx-auto px-5 sm:px-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-brand-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to All Posts
                    </Link>
                </div>
            </section>
        </main>
    );
}
