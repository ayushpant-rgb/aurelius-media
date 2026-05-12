import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllSlugs, getPostBySlug } from '@/lib/blog';
import { generateBreadcrumbSchema, generateArticleSchema, generateFAQSchema, generateSpeakableSchema } from '@/lib/schema';
import BlogPostClient from './BlogPostClient';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    const BASE_URL = 'https://www.aureliusmedia.co';
    const ogImageRel = post.ogImage || '/logo.png';
    const ogImage = ogImageRel.startsWith('http') ? ogImageRel : `${BASE_URL}${ogImageRel}`;

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            type: 'article',
            url: `${BASE_URL}/blog/${slug}`,
            publishedTime: post.date,
            authors: [post.author],
            images: [{ url: ogImage, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: [ogImage],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post || post.published === false) {
        notFound();
    }

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.aureliusmedia.co' },
        { name: 'Blog', url: 'https://www.aureliusmedia.co/blog' },
        { name: post.title, url: `https://www.aureliusmedia.co/blog/${slug}` },
    ]);

    const articleSchema = generateArticleSchema({
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        dateModified: post.dateModified,
        slug,
        author: post.author,
        authorRole: post.authorRole,
        ogImage: post.ogImage,
        articleSection: post.category,
        keywords: post.keywords,
        wordCount: post.wordCount,
    });

    // Get related posts: same category first, then recent, exclude current
    const allPosts = getAllPosts();
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug)
        .sort((a, b) => {
            const aMatch = a.category === post.category ? 1 : 0;
            const bMatch = b.category === post.category ? 1 : 0;
            return bMatch - aMatch;
        })
        .slice(0, 3);

    const faqSchema = post.faqs && post.faqs.length > 0 ? generateFAQSchema(post.faqs) : null;
    const speakableSchema = post.speakable ? generateSpeakableSchema({ title: post.title, slug }) : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            {speakableSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
                />
            )}
            <BlogPostClient post={post} relatedPosts={relatedPosts} />
        </>
    );
}
