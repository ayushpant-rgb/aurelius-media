import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
    title: 'Blog | Aurelius Media',
    description: 'Insights on AI marketing, performance advertising, creative production, and growth strategies for startups and brands.',
    openGraph: {
        title: 'Blog | Aurelius Media',
        description: 'AI marketing insights, case studies, and growth strategies from Aurelius Media.',
        type: 'website',
        url: 'https://www.aureliusmedia.co/blog',
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    return <BlogListClient posts={posts} />;
}
