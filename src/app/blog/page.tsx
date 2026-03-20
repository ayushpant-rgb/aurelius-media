import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Insights on AI marketing, performance advertising, creative production, and growth strategies for startups and brands.',
    openGraph: {
        title: 'Blog | Aurelius Media',
        description: 'AI marketing insights, case studies, and growth strategies from Aurelius Media.',
        type: 'website',
        url: 'https://www.aureliusmedia.co/blog',
        images: [{ url: '/logo.png', alt: 'Aurelius Media Blog' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Aurelius Media',
        description: 'AI marketing insights, case studies, and growth strategies from Aurelius Media.',
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    return <BlogListClient posts={posts} />;
}
