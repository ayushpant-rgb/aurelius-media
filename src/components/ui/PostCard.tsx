import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';

function formatDateShort(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

// Post card from the Claude Design blog listing (pcard).
export default function PostCard({ post, headingLevel = 3 }: { post: BlogPostMeta; headingLevel?: 2 | 3 }) {
    const Heading = headingLevel === 2 ? 'h2' : 'h3';
    return (
        <Link href={`/blog/${post.slug}`} className="pcard">
            <div className="img">
                {post.ogImage ? (
                    <Image
                        src={post.ogImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 430px"
                    />
                ) : (
                    <span className="m10" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>Article cover</span>
                )}
            </div>
            <div className="body">
                <div className="meta">
                    <span className="tagpill">{post.category}</span>
                    <span className="readt">{post.readTime}</span>
                </div>
                <Heading>{post.title}</Heading>
                <p>{post.excerpt}</p>
                <div className="pfoot">
                    <span className="byline">
                        <span className="av">
                            <Image src="/images/ayush.jpeg" alt="" width={60} height={60} sizes="30px" />
                        </span>
                        <b>{post.author}</b>
                    </span>
                    <span className="readt">{formatDateShort(post.date)}</span>
                </div>
            </div>
        </Link>
    );
}
