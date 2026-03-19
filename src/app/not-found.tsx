import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <p className="text-6xl font-bold gradient-text font-display mb-4">404</p>
                <h1 className="text-2xl font-bold text-brand-white mb-3">Page not found</h1>
                <p className="text-sm text-brand-gray mb-8 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 cta-primary text-white font-semibold rounded-[20px] text-sm"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 border border-brand-border-subtle text-brand-white font-semibold rounded-[20px] text-sm hover:border-brand-accent/50 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
}
