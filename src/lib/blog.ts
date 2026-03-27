import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPostMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    author: string;
    authorRole: string;
    readTime: string;
    featured?: boolean;
    published?: boolean;
    ogImage?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface BlogPost extends BlogPostMeta {
    content: string;
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
            category: data.category || '',
            author: data.author || 'Ayush Pant',
            authorRole: data.authorRole || 'Founder, Aurelius Media',
            readTime: stats.text,
            featured: data.featured || false,
            published: data.published !== undefined ? data.published : true,
            ogImage: data.ogImage || undefined,
            metaTitle: data.metaTitle || undefined,
            metaDescription: data.metaDescription || undefined,
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
        category: data.category || '',
        author: data.author || 'Ayush Pant',
        authorRole: data.authorRole || 'Founder, Aurelius Media',
        readTime: stats.text,
        featured: data.featured || false,
        ogImage: data.ogImage || undefined,
        metaTitle: data.metaTitle || undefined,
        metaDescription: data.metaDescription || undefined,
        content,
    };
}

export function getAllSlugs(): string[] {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.mdx'))
        .map(f => f.replace('.mdx', ''));
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
    return getAllPosts().filter(p => p.category === category);
}

export function getCategories(): string[] {
    const posts = getAllPosts();
    return [...new Set(posts.map(p => p.category))];
}
