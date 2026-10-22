import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import type { BlogPostMeta } from '@/lib/blog';

// "From the Blog" block for service pages. Rendered on the server and handed to
// ServicePageClient as a slot, so the post cards' dates never hydrate on the client.
export default function RelatedArticles({ posts }: { posts: BlogPostMeta[] }) {
    if (posts.length === 0) return null;

    return (
        <section className="sec">
            <div className="wrap">
                <div className="shead rv">
                    <div>
                        <span className="k">— From the Blog —</span>
                        <h2>
                            Related <em className="acc-em">articles.</em>
                        </h2>
                    </div>
                    <Link href="/blog" className="textlink viewall">All posts →</Link>
                </div>
                <div className="pgrid gs">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
