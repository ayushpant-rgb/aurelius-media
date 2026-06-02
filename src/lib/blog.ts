import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogFAQ {
    question: string;
    answer: string;
}

export interface BlogPostMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    dateModified?: string;
    category: string;
    author: string;
    authorRole: string;
    readTime: string;
    featured?: boolean;
    published?: boolean;
    ogImage?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    faqs?: BlogFAQ[];
    speakable?: boolean;
}

export interface BlogPost extends BlogPostMeta {
    content: string;
    wordCount?: number;
}

export function getAllPosts(): BlogPostMeta[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));

    const posts = files.map((filename) => {
        const slug = filename.replace('.mdx', '');
        const filePath = path.join(POSTS_DIR, filename);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);

        return {
            slug,
            title: data.title || '',
            excerpt: data.excerpt || '',
            date: data.date || '',
            dateModified: data.dateModified || undefined,
            category: data.category || '',
            author: data.author || 'Ayush Pant',
            authorRole: data.authorRole || 'Founder, Aurelius Media',
            readTime: stats.text,
            featured: data.featured || false,
            published: data.published !== undefined ? data.published : true,
            ogImage: data.ogImage || undefined,
            metaTitle: data.metaTitle || undefined,
            metaDescription: data.metaDescription || undefined,
            keywords: Array.isArray(data.keywords) ? data.keywords : undefined,
            faqs: Array.isArray(data.faqs) ? data.faqs : undefined,
            speakable: data.speakable === true,
        } as BlogPostMeta;
    });

    // Filter out unpublished posts, then sort by date newest first
    return posts
        .filter(p => p.published !== false)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        dateModified: data.dateModified || undefined,
        category: data.category || '',
        author: data.author || 'Ayush Pant',
        authorRole: data.authorRole || 'Founder, Aurelius Media',
        readTime: stats.text,
        featured: data.featured || false,
        published: data.published !== undefined ? data.published : true,
        ogImage: data.ogImage || undefined,
        metaTitle: data.metaTitle || undefined,
        metaDescription: data.metaDescription || undefined,
        keywords: Array.isArray(data.keywords) ? data.keywords : undefined,
        faqs: Array.isArray(data.faqs) ? data.faqs : undefined,
        speakable: data.speakable === true,
        content,
        wordCount: stats.words,
    };
}

export function getAllSlugs(): string[] {
    // Drive off getAllPosts() so published:false posts are never statically
    // generated. The detail route (page.tsx) also guards on post.published as
    // a second layer for any direct/on-demand hit.
    return getAllPosts().map(p => p.slug);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
    return getAllPosts().filter(p => p.category === category);
}

export function getCategories(): string[] {
    const posts = getAllPosts();
    return [...new Set(posts.map(p => p.category))];
}
