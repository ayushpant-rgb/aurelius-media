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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with email API (Resend/SendGrid)
        console.log('Form submitted:', formData);
        setSubmitted(true);
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

                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3.5 cta-primary text-white font-semibold rounded-[20px]"
                                    >
                                        Send Message →
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
                                    href="mailto:hello@aureliusmedia.co"
                                    className="text-sm text-brand-accent hover:text-brand-accent-hover transition-colors"
                                >
                                    hello@aureliusmedia.co
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
                                <div className="flex justify-center gap-3 mt-1">
                                    <a href="https://linkedin.com/company/aurelius-media" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-gray hover:text-brand-accent transition-colors">
                                        LinkedIn
                                    </a>
                                    <a href="https://x.com/aureliusmedia" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-gray hover:text-brand-accent transition-colors">
                                        X
                                    </a>
                                    <a href="https://instagram.com/aureliusmedia" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-gray hover:text-brand-accent transition-colors">
                                        Instagram
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
