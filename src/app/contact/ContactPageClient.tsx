'use client';

import { useState } from 'react';
import { useInView } from '@/lib/hooks';

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

export default function ContactPageClient() {
    const { ref, inView } = useInView();
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
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Something went wrong');
            }

            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-brand-card border border-brand-border-subtle rounded-xl text-brand-white placeholder:text-brand-gray-dark focus:outline-none focus:border-brand-accent/50 transition-colors";

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">Get in Touch</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Let&apos;s Build Something{' '}
                        <br />
                        <span className="gradient-text font-display">Extraordinary</span>
                    </h1>
                    <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
                        Book a free 15-minute strategy call or send us a message. We will analyze your
                        current setup, identify quick wins, and show you exactly how we can accelerate your growth.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section ref={ref} className="section-padding bg-brand-dark pt-8">
                <div className={`max-w-6xl mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Cal.com Booking */}
                        <div>
                            <h2 className="text-2xl font-bold mb-2">
                                Book a Strategy <span className="gradient-text font-display">Call</span>
                            </h2>
                            <p className="text-brand-gray mb-6 leading-relaxed">
                                Choose a time that works for you. This is a free, no-obligation 15-minute call where
                                we will discuss your marketing goals and how we can help.
                            </p>

                            {/* Cal.com Embed Placeholder */}
                            <div className="rounded-xl bg-brand-card border border-brand-border-subtle p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                                <span className="text-4xl mb-4">📅</span>
                                <h3 className="text-lg font-bold mb-2">Cal.com Scheduling</h3>
                                <p className="text-sm text-brand-gray mb-6 max-w-sm">
                                    The booking calendar will be embedded here. Currently showing a placeholder.
                                    Share your Cal.com link to activate this feature.
                                </p>
                                <a
                                    href="https://cal.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 cta-primary text-white font-semibold rounded-[20px]"
                                >
                                    Open Calendar →
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold mb-2">
                                Send a <span className="gradient-text font-display">Message</span>
                            </h2>
                            <p className="text-brand-gray mb-6 leading-relaxed">
                                Not ready for a call? No problem. Fill out the form below and we will get back to you
                                within 24 hours.
                            </p>

                            {submitted ? (
                                <div className="rounded-xl bg-brand-card border border-brand-border-subtle p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <span className="text-5xl mb-4">✅</span>
                                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-brand-gray">
                                        Thank you for reaching out. We will be in touch within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-brand-gray mb-1.5">
                                            Full Name *
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-brand-gray mb-1.5">
                                            Email Address *
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="you@company.com"
                                        />
                                    </div>

                                    {/* Phone + Company Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-brand-gray mb-1.5">
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-brand-gray mb-1.5">
                                                Company
                                            </label>
                                            <input
                                                id="company"
                                                name="company"
                                                type="text"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="Company name"
                                            />
                                        </div>
                                    </div>

                                    {/* Service Interest */}
                                    <div>
                                        <label htmlFor="service" className="block text-sm font-medium text-brand-gray mb-1.5">
                                            Service Interest
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className={`${inputClasses} appearance-none`}
                                        >
                                            <option value="" className="bg-brand-dark">Select a service...</option>
                                            {serviceOptions.map((opt) => (
                                                <option key={opt} value={opt} className="bg-brand-dark">
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-brand-gray mb-1.5">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`${inputClasses} resize-none`}
                                            placeholder="Tell us about your project and goals..."
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-400 text-center">{error}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full px-6 py-3.5 cta-primary text-white font-semibold rounded-[20px] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Sending...' : 'Send Message →'}
                                    </button>

                                    <p className="text-xs text-brand-gray-dark text-center">
                                        We typically respond within 24 hours. No spam, ever.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Contact Info Bar */}
                    <div className="mt-16 p-6 rounded-xl bg-brand-card border border-brand-border-subtle">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                            <div>
                                <span className="text-xl mb-2 block">📧</span>
                                <p className="text-sm font-medium text-brand-white">Email</p>
                                <a
                                    href="mailto:ayush@aureliusmedia.co"
                                    className="text-sm text-brand-accent hover:text-brand-accent-hover transition-colors"
                                >
                                    ayush@aureliusmedia.co
                                </a>
                            </div>
                            <div>
                                <span className="text-xl mb-2 block">📍</span>
                                <p className="text-sm font-medium text-brand-white">Location</p>
                                <p className="text-sm text-brand-gray">Gurgaon, India</p>
                            </div>
                            <div>
                                <span className="text-xl mb-2 block">🌐</span>
                                <p className="text-sm font-medium text-brand-white">Social</p>
                                <div className="flex justify-center gap-4 mt-2">
                                    <a href="https://www.linkedin.com/in/ayushpant/" target="_blank" rel="noopener noreferrer" className="text-brand-gray-dark hover:text-brand-accent transition-colors" aria-label="LinkedIn">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a href="https://x.com/FollowAurelius" target="_blank" rel="noopener noreferrer" className="text-brand-gray-dark hover:text-brand-accent transition-colors" aria-label="X (Twitter)">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/aurelius.media" target="_blank" rel="noopener noreferrer" className="text-brand-gray-dark hover:text-brand-accent transition-colors" aria-label="Instagram">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
