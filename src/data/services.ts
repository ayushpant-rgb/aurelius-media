export interface Service {
    title: string;
    slug: string;
    description: string;
    icon: string;
    category: 'performance' | 'creative' | 'growth' | 'industry';
    keywords: string[];
}

export const services: Service[] = [
    // ─── PERFORMANCE MARKETING ───
    {
        title: 'Marketing Strategy Audit',
        slug: 'marketing-strategy-audit',
        description: 'Full-funnel marketing audit with channel strategy, budget allocation, and a custom growth roadmap.',
        icon: '📋',
        category: 'performance',
        keywords: ['marketing strategy audit', 'marketing audit agency', 'performance marketing strategy'],
    },
    {
        title: 'Google Ads Management',
        slug: 'google-ads',
        description: 'Search, Display, Shopping, YouTube, and Performance Max campaigns with ROAS-focused optimization.',
        icon: '📊',
        category: 'performance',
        keywords: ['google ads agency', 'google ads management', 'PPC agency'],
    },
    {
        title: 'Meta Ads Management',
        slug: 'meta-ads',
        description: 'Full-funnel Meta campaigns across Facebook and Instagram with advanced creative testing and Advantage+ optimization.',
        icon: '📱',
        category: 'performance',
        keywords: ['facebook ads agency', 'instagram advertising', 'meta ads management'],
    },

    // ─── CREATIVE & CONTENT ───
    {
        title: 'AI Creative & Design',
        slug: 'ai-creative-design',
        description: 'AI-powered ad creatives, video content, and brand assets using Midjourney, DALL-E, Kling, and Runway at 10x speed.',
        icon: '✦',
        category: 'creative',
        keywords: ['AI ad creative', 'AI design agency', 'AI-powered marketing creative'],
    },
    {
        title: 'Creative & Design',
        slug: 'creative-design',
        description: 'Ad creatives, pitch decks, branding, social media graphics, and marketing collateral with strategic intent.',
        icon: '🎨',
        category: 'creative',
        keywords: ['marketing creative agency', 'ad design services', 'brand creative'],
    },
    {
        title: 'Reels Ads Editing',
        slug: 'reels-editing',
        description: 'Short-form video editing optimized for Instagram Reels, YouTube Shorts, and TikTok. Hook-first, trend-aware content.',
        icon: '✂️',
        category: 'creative',
        keywords: ['reels editing service', 'short form video ads', 'social media video editing'],
    },

    // ─── GROWTH & AUTOMATION ───
    {
        title: 'AI Automation & Agents',
        slug: 'ai-automation',
        description: 'Custom AI marketing automation, intelligent agents, and workflow optimization to scale your marketing operations.',
        icon: '⚡',
        category: 'growth',
        keywords: ['AI marketing automation', 'AI agents', 'marketing workflow automation'],
    },
    {
        title: 'No-Code App Development',
        slug: 'no-code-development',
        description: 'Rapid MVP prototyping and web applications built with modern platforms for fast market validation.',
        icon: '🛠️',
        category: 'growth',
        keywords: ['no-code web apps', 'AI app development', 'MVP prototyping'],
    },
    {
        title: 'AI Workshops & Training',
        slug: 'ai-workshops',
        description: 'Hands-on AI marketing workshops and generative AI training for teams, institutions, and enterprises.',
        icon: '🧠',
        category: 'growth',
        keywords: ['AI marketing workshop', 'AI training for teams', 'generative AI training'],
    },

    // ─── INDUSTRY VERTICALS ───
    {
        title: 'Book & Author Marketing',
        slug: 'book-marketing',
        description: 'End-to-end book launch campaigns, author brand building, and digital marketing for publishers. 100,000+ copies sold for clients.',
        icon: '📚',
        category: 'industry',
        keywords: ['book marketing agency', 'author marketing', 'book launch campaign'],
    },
    {
        title: 'Education & EdTech Marketing',
        slug: 'education-marketing',
        description: 'School admissions marketing, EdTech growth campaigns, and enrollment optimization. 250% enrollment increase achieved for clients.',
        icon: '🎓',
        category: 'industry',
        keywords: ['education marketing agency', 'school admissions marketing', 'EdTech ads'],
    },
    {
        title: 'Real Estate Marketing',
        slug: 'real-estate-marketing',
        description: 'Performance marketing for real estate developers and brokerages. Multi-channel campaigns that deliver qualified buyer leads.',
        icon: '🏠',
        category: 'industry',
        keywords: ['real estate marketing agency', 'property ads', 'real estate lead generation'],
    },
];

export const serviceCategories = [
    { key: 'performance' as const, label: 'Performance Marketing' },
    { key: 'creative' as const, label: 'Creative & Content' },
    { key: 'growth' as const, label: 'Growth & Automation' },
    { key: 'industry' as const, label: 'Industry Verticals' },
];
