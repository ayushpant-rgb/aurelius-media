import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug, getRelatedServices } from '@/data/servicePages';
import { generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { getAllPosts } from '@/lib/blog';
import ServicePageClient from './ServicePageClient';

interface Props {
    params: Promise<{ slug: string }>;
}

/* Map service slugs to relevant blog categories for cross-linking */
const serviceBlogCategoryMap: Record<string, string[]> = {
    'google-ads': ['Google Ads', 'Performance Marketing'],
    'meta-ads': ['Performance Marketing', 'Google Ads'],
    'marketing-strategy-audit': ['Performance Marketing', 'SEO & Content Strategy'],
    'ai-creative-design': ['Vibe Coding & MVPs', 'Performance Marketing'],
    'creative-design': ['Performance Marketing'],
    'reels-editing': ['Book Marketing', 'Performance Marketing'],
    'book-marketing': ['Book Marketing'],
    'education-marketing': ['Performance Marketing'],
    'ai-automation': ['Vibe Coding & MVPs'],
    'no-code-development': ['Vibe Coding & MVPs'],
    'ai-workshops': ['Vibe Coding & MVPs'],
    'real-estate-marketing': ['Performance Marketing'],
};

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) return {};

    return {
        title: service.metaTitle,
        description: service.metaDescription,
        openGraph: {
            title: service.metaTitle,
            description: service.metaDescription,
            type: 'website',
            url: `https://www.aureliusmedia.co/services/${service.slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: service.metaTitle,
            description: service.metaDescription,
        },
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const related = getRelatedServices(service.relatedSlugs);

    /* Fetch topically relevant blog posts for this service */
    const allPosts = getAllPosts();
    const relevantCategories = serviceBlogCategoryMap[service.slug] || [];
    const relatedArticles = allPosts
        .filter((post) => relevantCategories.includes(post.category))
        .slice(0, 3)
        .map((post) => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            readTime: post.readTime,
            ogImage: post.ogImage,
        }));

    const faqSchema = generateFAQSchema(service.faqs);
    const serviceSchema = generateServiceSchema(service);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.aureliusmedia.co' },
        { name: 'Services', url: 'https://www.aureliusmedia.co/services' },
        { name: service.title, url: `https://www.aureliusmedia.co/services/${service.slug}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ServicePageClient service={service} relatedServices={related} relatedArticles={relatedArticles} />
        </>
    );
}
