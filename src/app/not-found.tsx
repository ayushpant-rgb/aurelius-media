import Link from 'next/link';
import '@/app/styles/pages.css';

export default function NotFound() {
    return (
        <section className="sec pg-404">
            <div className="wrap">
                <div className="pg-404-in">
                    <span className="k">— Error 404 —</span>
                    <p className="pg-404-num" aria-hidden="true">404</p>
                    <h1 className="fd h-lg">Page not found</h1>
                    <p className="lede">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <div className="btnrow">
                        <Link href="/" className="btn">
                            Go Home
                        </Link>
                        <Link href="/contact" className="btn ghost">
                            Contact Us
                        </Link>
                    </div>
                    <nav className="pg-404-more" aria-label="Popular pages">
                        <span className="m10">Or try</span>
                        <Link href="/services" className="textlink">Services →</Link>
                        <Link href="/blog" className="textlink">Blog →</Link>
                    </nav>
                </div>
            </div>
        </section>
    );
}
