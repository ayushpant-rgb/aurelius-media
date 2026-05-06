import { ServiceFAQ } from '@/data/servicePages';

const SITE_URL = 'https://www.aureliusmedia.co';

export function generateFAQSchema(faqs: ServiceFAQ[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function generateServiceSchema(service: {
    title: string;
    description: string;
    slug: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: generateOrganizationRef(),
        url: `${SITE_URL}/services/${service.slug}`,
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Aurelius Media',
        alternateName: ['Aurelius Media Co', 'Aurelius'],
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
            width: 512,
            height: 512,
        },
        description:
            'Performance marketing, AI-powered creative, and growth strategy agency. Specialists in EdTech, education, D2C, SaaS, and real estate marketing.',
        founder: generatePersonSchema(),
        foundingDate: '2024',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Gurgaon',
            addressRegion: 'Haryana',
            addressCountry: 'IN',
        },
        knowsAbout: [
            'Performance Marketing',
            'EdTech Marketing',
            'Education Marketing',
            'D2C Marketing',
            'SaaS Marketing',
            'Real Estate Marketing',
            'Meta Ads',
            'Google Ads',
            'Conversion Rate Optimization',
            'Programmatic SEO',
            'Answer Engine Optimization',
            'Generative Engine Optimization',
        ],
        sameAs: [
            'https://www.linkedin.com/in/ayushpant/',
            'https://x.com/FollowAurelius',
            'https://www.instagram.com/aurelius.media',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            url: `${SITE_URL}/contact`,
            availableLanguage: ['English', 'Hindi'],
        },
    };
}

function generateOrganizationRef() {
    return {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Aurelius Media',
        url: SITE_URL,
    };
}

export function generatePersonSchema(person?: {
    name?: string;
    role?: string;
}) {
    const name = person?.name || 'Ayush Pant';
    const role = person?.role || 'Founder, Aurelius Media';

    return {
        '@type': 'Person',
        '@id': `${SITE_URL}/#${name.toLowerCase().replace(/\s+/g, '-')}`,
        name,
        jobTitle: role,
        worksFor: generateOrganizationRef(),
        url: SITE_URL,
        sameAs: [
            'https://www.linkedin.com/in/ayushpant/',
            'https://x.com/FollowAurelius',
        ],
    };
}

export function generateArticleSchema(post: {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    author: string;
    authorRole?: string;
    ogImage?: string;
    dateModified?: string;
    keywords?: string[];
    articleSection?: string;
    wordCount?: number;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.dateModified || post.date,
        image: post.ogImage
            ? (post.ogImage.startsWith('http') ? post.ogImage : `${SITE_URL}${post.ogImage}`)
            : `${SITE_URL}/logo.png`,
        author: generatePersonSchema({ name: post.author, role: post.authorRole }),
        publisher: generateOrganizationSchema(),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${post.slug}`,
        },
        keywords: post.keywords?.join(', '),
        articleSection: post.articleSection,
        wordCount: post.wordCount,
        inLanguage: 'en',
    };
}

export function generateHowToSchema(howTo: {
    name: string;
    description: string;
    steps: { name: string; text: string }[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howTo.name,
        description: howTo.description,
        step: howTo.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
        })),
    };
}

export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Aurelius Media',
        publisher: generateOrganizationRef(),
        inLanguage: 'en',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}
