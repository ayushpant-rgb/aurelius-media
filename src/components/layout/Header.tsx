'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/#how-it-works' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

function isActive(pathname: string, href: string) {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
}

function Logo() {
    return (
        <>
            <span className="lm">
                <Image src="/logo.png" alt="" width={68} height={68} sizes="34px" priority />
            </span>
            Aurelius Media
        </>
    );
}

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    return (
        <>
            <header className="abar-wrap">
                <span className="scrollbar" aria-hidden="true" />
                <div className="abar">
                    <Link href="/" className="logo" aria-label="Aurelius Media home">
                        <Logo />
                    </Link>

                    <nav aria-label="Main">
                        {navLinks.map((link) => {
                            const active = isActive(pathname, link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={active ? 'on' : undefined}
                                    aria-current={active ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="tools">
                        <ThemeToggle />
                        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn sm hide-sm">
                            Book a Strategy Call →
                        </a>
                        <button
                            type="button"
                            className="iconbtn menu-btn"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={mobileOpen}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="square" d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {mobileOpen && (
                <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
                    <div className="dtop">
                        <Link href="/" className="logo" onClick={() => setMobileOpen(false)}>
                            <Logo />
                        </Link>
                        <div className="tools">
                            <ThemeToggle />
                            <button type="button" className="iconbtn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="square" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <nav aria-label="Mobile">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={isActive(pathname, link.href) ? 'on' : undefined}
                            >
                                {link.label}
                                <span>0{i + 1}</span>
                            </Link>
                        ))}
                    </nav>
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn" onClick={() => setMobileOpen(false)}>
                        Book a Strategy Call →
                    </a>
                </div>
            )}
        </>
    );
}
