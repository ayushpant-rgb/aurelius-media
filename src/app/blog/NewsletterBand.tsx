import NewsletterForm from '@/components/NewsletterForm';

// Newsletter sign-up band shared by the blog listing and the article view.
export default function NewsletterBand({ source, className = '' }: { source: string; className?: string }) {
    return (
        <div className={`bl-news rv ${className}`.trim()}>
            <div>
                <span className="k">— Newsletter —</span>
                <h2 className="fd">
                    Get the Aurelius <em>newsletter</em>
                </h2>
                <p className="bl-newsp">
                    Weekly insights on performance marketing, AI, and growth. No spam. Unsubscribe anytime.
                </p>
            </div>
            <div className="bl-newsform">
                <NewsletterForm source={source} />
                <p className="mininote">Join 2,400+ marketers &middot; Free forever</p>
            </div>
        </div>
    );
}
