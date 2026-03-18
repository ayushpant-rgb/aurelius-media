'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/#how-it-works' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <header
            className={`fixed left-4 right-4 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 top-4' : 'bg-transparent py-5 top-0'
                }`}
        >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <Image
                        src="/logo.png"
                        alt="Aurelius Media"
                        width={52}
                        height={52}
                        className="rounded-md transition-transform group-hover:scale-105"
                    />
                    <span className="whitespace-nowrap text-lg sm:text-xl font-extrabold tracking-wider uppercase text-brand-white">
                        Aurelius Media
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3 py-2 text-sm font-medium text-brand-gray hover:text-brand-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 cta-primary text-white text-sm font-semibold rounded-full"
                    >
                        Book a Call
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 text-brand-gray hover:text-brand-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`lg:hidden fixed inset-0 top-0 bg-[#0B0B0D]/95 backdrop-blur-xl z-40 transition-all duration-300 ${mobileOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-5 right-5 p-2 text-brand-gray hover:text-brand-white transition-colors"
                    aria-label="Close menu"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex flex-col items-center justify-center h-full gap-6">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-2xl font-semibold text-brand-gray hover:text-brand-white transition-colors"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="mt-4 px-8 py-3 cta-primary text-white font-semibold rounded-[20px]"
                    >
                        Book a Call →
                    </a>
                </div>
            </div>
        </header>
    );
}
