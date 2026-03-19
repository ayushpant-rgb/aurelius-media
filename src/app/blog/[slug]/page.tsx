import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllSlugs, getPostBySlug } from '@/lib/blog';
import { generateBreadcrumbSchema } from '@/lib/schema';
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

    const ogImage = post.ogImage || '/logo.png';

    return {
        title: post.metaTitle || `${post.title} | Aurelius Media Blog`,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            type: 'article',
            url: `https://www.aureliusmedia.co/blog/${slug}`,
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

    if (!post) {
        notFound();
    }

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.aureliusmedia.co' },
        { name: 'Blog', url: 'https://www.aureliusmedia.co/blog' },
        { name: post.title, url: `https://www.aureliusmedia.co/blog/${slug}` },
    ]);

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: post.ogImage ? `https://www.aureliusmedia.co${post.ogImage}` : undefined,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Aurelius Media',
            url: 'https://www.aureliusmedia.co',
        },
    };

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
            <BlogPostClient post={post} relatedPosts={relatedPosts} />
        </>
    );
}
