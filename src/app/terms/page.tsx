import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Aurelius Media',
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
        <main className="bg-brand-dark text-brand-white">
            <section className="pt-32 pb-20">
                <div className="max-w-[760px] mx-auto px-5 sm:px-6">
                    <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.1] text-brand-white mb-4">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-[14px] text-brand-gray-dark mb-12">
                        Last updated: March 20, 2026
                    </p>

                    <div className="prose-legal space-y-8 text-[15px] text-brand-gray leading-[1.75]">
                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">1. Agreement to Terms</h2>
                            <p>
                                By accessing or using the Aurelius Media website at aureliusmedia.co (the &quot;Site&quot;) or engaging our services, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you should not use our Site or services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">2. Services</h2>
                            <p>
                                Aurelius Media provides AI-powered performance marketing services including but not limited to paid media management, creative production, growth engineering, content strategy, and AI consulting. The specific scope, deliverables, and terms of any engagement will be outlined in a separate service agreement or statement of work.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">3. Intellectual Property</h2>
                            <p className="mb-3">
                                All content on this Site — including text, graphics, logos, images, videos, and software — is the property of Aurelius Media or its content suppliers and is protected by intellectual property laws.
                            </p>
                            <p>
                                You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from this Site without prior written consent from Aurelius Media.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">4. Use of the Site</h2>
                            <p className="mb-3">You agree not to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Use the Site for any unlawful purpose or in violation of any applicable laws</li>
                                <li>Attempt to gain unauthorized access to any part of the Site, its servers, or any connected systems</li>
                                <li>Interfere with or disrupt the operation of the Site</li>
                                <li>Scrape, mine, or collect data from the Site without written permission</li>
                                <li>Transmit any malware, viruses, or other harmful code</li>
                                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">5. Blog Content and Resources</h2>
                            <p>
                                The blog posts, articles, guides, and other resources published on our Site are provided for informational purposes only. While we strive for accuracy, we make no guarantees regarding the completeness, reliability, or applicability of any content. Marketing strategies and results vary based on individual circumstances.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">6. Third-Party Links</h2>
                            <p>
                                Our Site may contain links to third-party websites or services. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. Accessing third-party links is at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">7. Consultations and Bookings</h2>
                            <p>
                                Free strategy consultations are offered at our discretion and do not constitute a binding agreement for services. We reserve the right to decline or reschedule consultations at any time. Any discussions during consultations are confidential and do not create an agency-client relationship until a formal agreement is signed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">8. Limitation of Liability</h2>
                            <p>
                                To the fullest extent permitted by law, Aurelius Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or our services. This includes, without limitation, damages for loss of profits, data, goodwill, or other intangible losses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">9. Disclaimer of Warranties</h2>
                            <p>
                                The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">10. Indemnification</h2>
                            <p>
                                You agree to indemnify and hold harmless Aurelius Media, its founders, employees, and agents from any claims, losses, liabilities, damages, costs, or expenses (including legal fees) arising out of your use of the Site, violation of these Terms, or infringement of any third-party rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">11. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the Site shall be resolved through good-faith negotiation before pursuing any formal proceedings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">12. Changes to These Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Site after any changes constitutes acceptance of the revised Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-brand-white mb-3">13. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms &amp; Conditions, please contact us at:
                            </p>
                            <p className="mt-2">
                                <strong className="text-brand-white">Aurelius Media</strong><br />
                                Email: hello@aureliusmedia.co
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
