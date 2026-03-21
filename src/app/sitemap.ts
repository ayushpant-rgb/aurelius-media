import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://www.aureliusmedia.co';

const SERVICE_SLUGS = [
  'marketing-strategy-audit',
  'google-ads',
  'meta-ads',
  'ai-creative-design',
  'creative-design',
  'reels-editing',
  'book-marketing',
  'education-marketing',
  'edtech-marketing',
  'd2c-ecommerce-marketing',
  'saas-marketing',
  'ai-automation',
  'no-code-development',
  'ai-workshops',
  'real-estate-marketing',
  'linkedin-ads',
  'youtube-ads',
  'tiktok-ads',
  'retargeting',
  'lead-generation',
  'funnel-building',
  'cro',
  'programmatic-seo',
  'analytics-reporting',
  'email-lifecycle',
  'brand-videos',
  'ugc-ads',
  'landing-pages',
  'content-strategy',
  'pitch-decks',
  'ai-agents',
];

const CATEGORY_SLUGS = [
  'performance-marketing',
  'b2b-marketing',
  'marketing-collaterals',
  'programmatic-seo',
  'web-apps-mvps',
  'full-funnel-marketing',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog posts
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date || now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/categories/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...categoryPages];
}
