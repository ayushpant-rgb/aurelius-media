'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePostHog } from 'posthog-js/react';
import { HoneypotField, useSpamGuard } from '@/components/SpamGuard';
import '@/app/styles/pages.css';

const serviceOptions = [
    'Google Ads Management',
    'Meta Ads Management',
    'AI Creative & Design',
    'Creative & Design',
    'Photo Shoots',
    'Video Shoots & Production',
    'Reels Ads Editing',
    'Book & Author Marketing',
    'Education & EdTech Marketing',
    'AI Automation & Agents',
    'No-Code App Development',
    'AI Workshops & Training',
    'Other',
];

// Same booking link as before; only the `theme` param follows the site theme.
const CAL_EMBED_URL = 'https://cal.com/aureliusmedia/15min?embed=true&layout=month_view';

// Site theme lives on <html data-theme>. Subscribing to it lets the cal.com
// embed switch light/dark with the header toggle.
function subscribeTheme(onChange: () => void) {
    const mo = new MutationObserver(onChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
}
const getTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
// No theme on the server: the iframe renders after hydration so it loads once, in the right theme.
const getServerTheme = () => null;

export default function ContactPageClient() {
    const posthog = usePostHog();
    const calTheme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
    const calRef = useRef<HTMLIFrameElement>(null);
    const [calHeight, setCalHeight] = useState<number | null>(null);

    // The cal.com iframe reports its content height (the same message embed.js
    // uses), so the frame grows/shrinks with the scheduler instead of clipping it.
    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            if (e.origin !== 'https://cal.com' || e.source !== calRef.current?.contentWindow) return;
            const msg = e.data;
            if (msg?.originator === 'CAL' && msg.type === '__dimensionChanged') {
                const h = Number(msg.data?.iframeHeight);
                if (h > 0) setCalHeight(Math.ceil(h));
            }
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { website, setWebsite, spamFields } = useSpamGuard();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    company: formData.company || undefined,
                    service_interest: formData.service || undefined,
                    message: formData.message,
                    source: 'contact' as const,
                    ...spamFields,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Something went wrong');
            }

            setSubmitted(true);
            posthog?.capture('contact_form_submitted', {
                source: 'contact',
                service_interest: formData.service || undefined,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="sec pg-contact">
            <div className="wrap">
                {/* Hero */}
                <header className="pg-contact-head rv">
                    <span className="k">— Get in Touch —</span>
                    <h1 className="fd">
                        Let&apos;s Build Something{' '}
                        <br />
                        <em>Extraordinary</em>
                    </h1>
                    <p className="lede">
                        Book a free 15-minute strategy call or send us a message. We will analyze your
                        current setup, identify quick wins, and show you exactly how we can accelerate your growth.
                    </p>
                </header>

                {/* Cal.com booking — first, full width */}
                <div className="calembed rv">
                    <div className="calhead">
                        <div className="pg-calhead-copy">
                            <span className="k">◷ Live calendar</span>
                            <h2>
                                Book a Strategy <em className="acc-em">Call</em>
                            </h2>
                            <p>
                                Choose a time that works for you. This is a free, no-obligation 15-minute call where
                                we will discuss your marketing goals and how we can help.
                            </p>
                        </div>
                        <div className="calmeta">
                            <span className="chip acc">Free</span>
                            <span className="chip">No obligation</span>
                        </div>
                    </div>

                    {/* Cal.com Inline Embed */}
                    <div className="pg-calframe">
                        {calTheme ? (
                            <iframe
                                key={calTheme}
                                ref={calRef}
                                src={`${CAL_EMBED_URL}&theme=${calTheme}`}
                                width="100%"
                                frameBorder="0"
                                title="Book a Strategy Call"
                                style={calHeight ? { height: calHeight } : undefined}
                            />
                        ) : (
                            <div className="pg-calwait">
                                <span className="mininote">Loading calendar…</span>
                            </div>
                        )}
                        {/* without JavaScript the themed iframe never mounts; show the default one */}
                        <noscript>
                            <iframe src={`${CAL_EMBED_URL}&theme=dark`} width="100%" frameBorder="0" title="Book a Strategy Call" />
                        </noscript>
                    </div>
                </div>

                <div className="pg-contact-grid">
                    {/* Contact Form */}
                    <div className="rv">
                        <h2 className="fd">
                            Send a <em>Message</em>
                        </h2>
                        <p className="pg-intro">
                            Not ready for a call? No problem. Fill out the form below and we will get back to you
                            within 24 hours.
                        </p>

                        {submitted ? (
                            <div className="pg-sent" role="status">
                                <span className="pg-tick" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We will be in touch within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="pg-form">
                                <HoneypotField value={website} onChange={setWebsite} />
                                <div className="fld">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div className="fld">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@company.com"
                                    />
                                </div>

                                <div className="pg-pair">
                                    <div className="fld">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div className="fld">
                                        <label htmlFor="company">Company</label>
                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Company name"
                                        />
                                    </div>
                                </div>

                                <div className="fld pg-select">
                                    <label htmlFor="service">Service Interest</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a service...</option>
                                        {serviceOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="fld">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project and goals..."
                                    />
                                </div>

                                {error && (
                                    <p className="formmsg err" role="alert">{error}</p>
                                )}
                                <button type="submit" disabled={loading} className="btn">
                                    {loading ? 'Sending...' : 'Send Message →'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact details */}
                    <div className="pg-methods rv">
                        <h2 className="fd">
                            Reach Us <em>Directly</em>
                        </h2>
                        <a className="method" href="mailto:ayush@aureliusmedia.co">
                            <span className="ic" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="3" y="5" width="18" height="14" />
                                    <path d="M3 6l9 7 9-7" />
                                </svg>
                            </span>
                            <span>
                                <b>Email</b>
                                <span className="v">ayush@aureliusmedia.co</span>
                            </span>
                        </a>
                        <div className="method">
                            <span className="ic" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
                                    <circle cx="12" cy="10" r="2.5" />
                                </svg>
                            </span>
                            <span>
                                <b>Location</b>
                                <span className="v">Gurgaon, India</span>
                            </span>
                        </div>
                        <div className="method">
                            <span className="ic" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                                </svg>
                            </span>
                            <span>
                                <b>Social</b>
                                <span className="v">
                                    <a href="https://www.linkedin.com/in/ayushpant/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    <span className="pg-dot" aria-hidden="true">·</span>
                                    <a href="https://x.com/FollowAurelius" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">X</a>
                                    <span className="pg-dot" aria-hidden="true">·</span>
                                    <a href="https://www.instagram.com/aurelius.media" target="_blank" rel="noopener noreferrer">Instagram</a>
                                </span>
                            </span>
                        </div>
                        <p className="mininote" style={{ marginTop: 26 }}>
                            We typically respond within 24 hours. No spam, ever.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
