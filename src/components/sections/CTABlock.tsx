'use client';

import { usePostHog } from 'posthog-js/react';

export default function CTABlock() {
    const posthog = usePostHog();
    return (
        <section className="sec">
            <div className="wrap">
                <div className="ctabox gridbg rv">
                    <span className="k">— Doors Open —</span>
                    <h2 style={{ marginTop: 18 }}>
                        Ready to scale your brand
                        <br />
                        to <em className="acc-em">new heights?</em>
                    </h2>
                    <p>
                        Book a 15-minute strategy call. We will analyze your current setup, identify quick wins,
                        and show you exactly how we can accelerate your growth.
                    </p>
                    <div className="btnrow">
                        <a
                            href="https://cal.com/aureliusmedia/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            onClick={() => posthog?.capture('cta_clicked', { location: 'cta_block', text: 'Book a Strategy Call' })}
                        >
                            Book a Strategy Call →
                        </a>
                    </div>
                    <p className="mininote" style={{ margin: '22px auto 0' }}>
                        No commitment required. 100% free consultation.
                    </p>
                </div>
            </div>
        </section>
    );
}
