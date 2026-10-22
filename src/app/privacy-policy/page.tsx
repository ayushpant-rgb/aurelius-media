import type { Metadata } from 'next';
import Link from 'next/link';
import '@/app/styles/pages.css';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'Privacy Policy for Aurelius Media. Learn how we collect, use, and protect your personal information.',
    openGraph: {
        title: 'Privacy Policy | Aurelius Media',
        description: 'Learn how we collect, use, and protect your personal information.',
        type: 'website',
        url: 'https://www.aureliusmedia.co/privacy-policy',
        images: [{ url: '/logo.png', alt: 'Aurelius Media' }],
    },
};

export default function PrivacyPolicyPage() {
    return (
        <section className="sec pg-legal">
            <div className="wrap">
                <div className="pg-legal-col">
                    <header className="pg-legal-head">
                        <nav className="crumb" aria-label="Breadcrumb">
                            <Link href="/">Home</Link> / <span aria-current="page">Privacy Policy</span>
                        </nav>
                        <span className="k">— Legal —</span>
                        <h1 className="fd h-xl">
                            Privacy Policy
                        </h1>
                        <p className="m10">
                            Last updated: March 20, 2026
                        </p>
                    </header>

                    <div className="pg-legal-body">
                        <section>
                            <h2><span className="pg-no">1.</span> Introduction</h2>
                            <p>
                                Aurelius Media (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at aureliusmedia.co (the &quot;Site&quot;) or engage our services.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">2.</span> Information We Collect</h2>
                            <p>We may collect the following types of information:</p>
                            <ul>
                                <li><strong>Contact information:</strong> Name, email address, phone number, and company name when you submit a contact form or book a consultation.</li>
                                <li><strong>Usage data:</strong> Pages visited, time spent on pages, referring URLs, browser type, device type, and IP address.</li>
                                <li><strong>Newsletter data:</strong> Email address when you subscribe to our newsletter.</li>
                                <li><strong>Communication data:</strong> Messages, inquiries, and correspondence you send us.</li>
                            </ul>
                        </section>

                        <section>
                            <h2><span className="pg-no">3.</span> How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul>
                                <li>Respond to your inquiries and provide our services</li>
                                <li>Send newsletters and marketing communications you have opted into</li>
                                <li>Improve our website, services, and user experience</li>
                                <li>Analyze website traffic and usage patterns</li>
                                <li>Schedule and manage consultations</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2><span className="pg-no">4.</span> Third-Party Services</h2>
                            <p>We use the following third-party services that may process your data:</p>
                            <ul>
                                <li><strong>Vercel:</strong> Website hosting and analytics</li>
                                <li><strong>Cal.com:</strong> Consultation scheduling</li>
                                <li><strong>Resend:</strong> Email delivery for newsletters and communications</li>
                                <li><strong>Supabase:</strong> Database and authentication services</li>
                                <li><strong>Google Analytics:</strong> Website traffic analysis</li>
                            </ul>
                            <p>
                                Each of these services has their own privacy policies governing how they handle your data. We encourage you to review their respective privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">5.</span> Cookies and Tracking</h2>
                            <p>
                                Our Site may use cookies and similar tracking technologies to enhance your browsing experience and collect usage data. You can control cookie settings through your browser preferences. Essential cookies required for site functionality cannot be disabled.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">6.</span> Data Retention</h2>
                            <p>
                                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Contact and newsletter data is retained until you request its deletion or unsubscribe.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">7.</span> Your Rights</h2>
                            <p>Depending on your jurisdiction, you may have the right to:</p>
                            <ul>
                                <li>Access the personal data we hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Opt out of marketing communications at any time</li>
                                <li>Request a copy of your data in a portable format</li>
                            </ul>
                        </section>

                        <section>
                            <h2><span className="pg-no">8.</span> Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">9.</span> Children&apos;s Privacy</h2>
                            <p>
                                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us so we can promptly delete it.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">10.</span> Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">11.</span> Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy or wish to exercise your data rights, please reach out through our <Link href="/contact">contact page</Link>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
