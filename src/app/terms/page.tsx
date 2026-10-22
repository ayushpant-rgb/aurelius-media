import type { Metadata } from 'next';
import Link from 'next/link';
import '@/app/styles/pages.css';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description:
        'Terms and Conditions for Aurelius Media. Read our terms of service, usage policies, and legal agreements.',
    openGraph: {
        title: 'Terms & Conditions | Aurelius Media',
        description: 'Terms of service and usage policies for Aurelius Media.',
        type: 'website',
        url: 'https://www.aureliusmedia.co/terms',
        images: [{ url: '/logo.png', alt: 'Aurelius Media' }],
    },
};

export default function TermsPage() {
    return (
        <section className="sec pg-legal">
            <div className="wrap">
                <div className="pg-legal-col">
                    <header className="pg-legal-head">
                        <nav className="crumb" aria-label="Breadcrumb">
                            <Link href="/">Home</Link> / <span aria-current="page">Terms &amp; Conditions</span>
                        </nav>
                        <span className="k">— Legal —</span>
                        <h1 className="fd h-xl">
                            Terms &amp; Conditions
                        </h1>
                        <p className="m10">
                            Last updated: March 20, 2026
                        </p>
                    </header>

                    <div className="pg-legal-body">
                        <section>
                            <h2><span className="pg-no">1.</span> Agreement to Terms</h2>
                            <p>
                                By accessing or using the Aurelius Media website at aureliusmedia.co (the &quot;Site&quot;) or engaging our services, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you should not use our Site or services.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">2.</span> Services</h2>
                            <p>
                                Aurelius Media provides AI-powered performance marketing services including but not limited to paid media management, creative production, growth engineering, content strategy, and AI consulting. The specific scope, deliverables, and terms of any engagement will be outlined in a separate service agreement or statement of work.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">3.</span> Intellectual Property</h2>
                            <p>
                                All content on this Site — including text, graphics, logos, images, videos, and software — is the property of Aurelius Media or its content suppliers and is protected by intellectual property laws.
                            </p>
                            <p>
                                You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from this Site without prior written consent from Aurelius Media.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">4.</span> Use of the Site</h2>
                            <p>You agree not to:</p>
                            <ul>
                                <li>Use the Site for any unlawful purpose or in violation of any applicable laws</li>
                                <li>Attempt to gain unauthorized access to any part of the Site, its servers, or any connected systems</li>
                                <li>Interfere with or disrupt the operation of the Site</li>
                                <li>Scrape, mine, or collect data from the Site without written permission</li>
                                <li>Transmit any malware, viruses, or other harmful code</li>
                                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                            </ul>
                        </section>

                        <section>
                            <h2><span className="pg-no">5.</span> Blog Content and Resources</h2>
                            <p>
                                The blog posts, articles, guides, and other resources published on our Site are provided for informational purposes only. While we strive for accuracy, we make no guarantees regarding the completeness, reliability, or applicability of any content. Marketing strategies and results vary based on individual circumstances.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">6.</span> Third-Party Links</h2>
                            <p>
                                Our Site may contain links to third-party websites or services. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. Accessing third-party links is at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">7.</span> Consultations and Bookings</h2>
                            <p>
                                Free strategy consultations are offered at our discretion and do not constitute a binding agreement for services. We reserve the right to decline or reschedule consultations at any time. Any discussions during consultations are confidential and do not create an agency-client relationship until a formal agreement is signed.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">8.</span> Limitation of Liability</h2>
                            <p>
                                To the fullest extent permitted by law, Aurelius Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or our services. This includes, without limitation, damages for loss of profits, data, goodwill, or other intangible losses.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">9.</span> Disclaimer of Warranties</h2>
                            <p>
                                The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">10.</span> Indemnification</h2>
                            <p>
                                You agree to indemnify and hold harmless Aurelius Media, its founders, employees, and agents from any claims, losses, liabilities, damages, costs, or expenses (including legal fees) arising out of your use of the Site, violation of these Terms, or infringement of any third-party rights.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">11.</span> Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the Site shall be resolved through good-faith negotiation before pursuing any formal proceedings.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">12.</span> Changes to These Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Site after any changes constitutes acceptance of the revised Terms.
                            </p>
                        </section>

                        <section>
                            <h2><span className="pg-no">13.</span> Contact Us</h2>
                            <p>
                                If you have any questions about these Terms &amp; Conditions, please reach out through our <Link href="/contact">contact page</Link>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
