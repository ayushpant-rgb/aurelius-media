import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Aurelius Media',
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
        <main className="bg-brand-dark text-brand-white">
            <section className="pt-32 pb-20">
                <div className="max-w-[760px] mx-auto px-5 sm:px-6">
                    <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.1] text-brand-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-[14px] text-brand-gray-dark mb-12">
                        Last updated: March 20, 2026
                    </p>

                    <div className="prose-legal space-y-8 text-[15px] text-brand-gray leading-[1.75]">
                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">1. Introduction</h2>
                            <p>
                                Aurelius Media (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at aureliusmedia.co (the &quot;Site&quot;) or engage our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">2. Information We Collect</h2>
                            <p className="mb-3">We may collect the following types of information:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong className="text-brand-white">Contact information:</strong> Name, email address, phone number, and company name when you submit a contact form or book a consultation.</li>
                                <li><strong className="text-brand-white">Usage data:</strong> Pages visited, time spent on pages, referring URLs, browser type, device type, and IP address.</li>
                                <li><strong className="text-brand-white">Newsletter data:</strong> Email address when you subscribe to our newsletter.</li>
                                <li><strong className="text-brand-white">Communication data:</strong> Messages, inquiries, and correspondence you send us.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">3. How We Use Your Information</h2>
                            <p className="mb-3">We use the information we collect to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Respond to your inquiries and provide our services</li>
                                <li>Send newsletters and marketing communications you have opted into</li>
                                <li>Improve our website, services, and user experience</li>
                                <li>Analyze website traffic and usage patterns</li>
                                <li>Schedule and manage consultations</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">4. Third-Party Services</h2>
                            <p className="mb-3">We use the following third-party services that may process your data:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong className="text-brand-white">Vercel:</strong> Website hosting and analytics</li>
                                <li><strong className="text-brand-white">Cal.com:</strong> Consultation scheduling</li>
                                <li><strong className="text-brand-white">Resend:</strong> Email delivery for newsletters and communications</li>
                                <li><strong className="text-brand-white">Supabase:</strong> Database and authentication services</li>
                                <li><strong className="text-brand-white">Google Analytics:</strong> Website traffic analysis</li>
                            </ul>
                            <p className="mt-3">
                                Each of these services has their own privacy policies governing how they handle your data. We encourage you to review their respective privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">5. Cookies and Tracking</h2>
                            <p>
                                Our Site may use cookies and similar tracking technologies to enhance your browsing experience and collect usage data. You can control cookie settings through your browser preferences. Essential cookies required for site functionality cannot be disabled.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">6. Data Retention</h2>
                            <p>
                                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Contact and newsletter data is retained until you request its deletion or unsubscribe.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">7. Your Rights</h2>
                            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Access the personal data we hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Opt out of marketing communications at any time</li>
                                <li>Request a copy of your data in a portable format</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">8. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">9. Children&apos;s Privacy</h2>
                            <p>
                                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us so we can promptly delete it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">10. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">11. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy or wish to exercise your data rights, please reach out through our <a href="/contact" className="text-brand-accent-text underline underline-offset-2 hover:text-brand-accent-hover transition-colors">contact page</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
