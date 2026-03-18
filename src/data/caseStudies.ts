export interface CaseStudy {
    client: string;
    vertical: string;
    slug: string;
    heroMetric: string;
    metricLabel: string;
    oneLiner: string;
    status: 'ready' | 'in-progress';
    services: string[];
}

export const caseStudies: CaseStudy[] = [
    {
        client: 'Aden + Anais',
        vertical: 'D2C E-commerce',
        slug: 'aden-anais',
        heroMetric: '2,000+',
        metricLabel: 'Sales Generated',
        oneLiner: '37% CPA reduction while scaling Meta Ads for a global baby brand.',
        status: 'ready',
        services: ['meta-ads', 'creative-design'],
    },
    {
        client: 'Stealth Health Tech Startup',
        vertical: 'Health Tech',
        slug: 'health-tech-startup',
        heroMetric: '84%',
        metricLabel: 'Response Rate',
        oneLiner: '300+ qualified leads generated through targeted outreach campaigns.',
        status: 'ready',
        services: ['google-ads', 'ai-automation'],
    },
    {
        client: 'Private University (Anandi)',
        vertical: 'Education',
        slug: 'anandi-school',
        heroMetric: '250%',
        metricLabel: 'Enrollment Increase',
        oneLiner: 'Transformed admissions marketing from traditional to digital-first.',
        status: 'ready',
        services: ['education-marketing', 'meta-ads', 'google-ads'],
    },
    {
        client: 'Complement1 (Karan Bajaj)',
        vertical: 'Health Tech / VC Startup',
        slug: 'complement1',
        heroMetric: '$16M',
        metricLabel: 'Funding GTM',
        oneLiner: 'Contributed to the go-to-market strategy during their $16M funding round.',
        status: 'ready',
        services: ['google-ads', 'meta-ads'],
    },
    {
        client: 'IraYogaWellness',
        vertical: 'Health & Wellness',
        slug: 'ira-yoga-wellness',
        heroMetric: '7-Figure',
        metricLabel: 'Revenue Platform',
        oneLiner: 'Built a 7-figure revenue platform for a wellness brand.',
        status: 'ready',
        services: ['meta-ads', 'creative-design'],
    },
    {
        client: 'Nidhi Upadhyay - That Night',
        vertical: 'Book Marketing',
        slug: 'nidhi-upadhyay',
        heroMetric: '100,000+',
        metricLabel: 'Copies Sold',
        oneLiner: 'Massive book launch campaign driving six-figure sales.',
        status: 'ready',
        services: ['book-marketing', 'meta-ads'],
    },
    {
        client: 'Karan Bajaj - Freedom Manifesto',
        vertical: 'Book Marketing',
        slug: 'karan-bajaj-book',
        heroMetric: '20,000+',
        metricLabel: 'Copies Sold',
        oneLiner: 'Strategic book marketing campaign for a bestselling author and entrepreneur.',
        status: 'ready',
        services: ['book-marketing', 'meta-ads'],
    },
];

export const featuredCaseStudies = caseStudies.filter(c =>
    ['aden-anais', 'anandi-school', 'complement1', 'nidhi-upadhyay'].includes(c.slug)
);
