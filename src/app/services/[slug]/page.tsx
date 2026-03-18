import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug, getRelatedServices } from '@/data/servicePages';
import { generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import ServicePageClient from './ServicePageClient';

interface Props {
    params: Promise<{ slug: string }>;
}

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
            <ServicePageClient service={service} relatedServices={related} />
        </>
    );
}
