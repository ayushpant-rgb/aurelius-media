import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';
import PostCard from '@/components/ui/PostCard';

export default function BlogPreview({ posts }: { posts: BlogPostMeta[] }) {
    return (
        <section className="sec">
            <div className="wrap">
                <div className="shead rv">
                    <div>
                        <span className="k">— Blog —</span>
                        <h2>Latest insights.</h2>
                    </div>
                    <Link href="/blog" className="btn ghost sm">View All Posts →</Link>
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
