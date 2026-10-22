'use client';

import { useEffect } from 'react';

// Reveal-on-scroll for .rv / .gs blocks. Runs after hydration so it never
// changes server-rendered markup React is still matching. Blocks already on
// screen are marked .in first, then html.rv-on switches on the hidden state
// (aurelius.css), so only off-screen blocks fade in as they are scrolled to.
// Crawlers and browsers without IntersectionObserver never get the hidden
// state, so they always see every block.
const CRAWLER = /bot|crawl|spider|slurp|lighthouse|headless/i;

export default function RevealArm() {
    useEffect(() => {
        if (CRAWLER.test(navigator.userAgent) || !('IntersectionObserver' in window)) return;
        const root = document.documentElement;
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            }),
            // threshold 0: a block taller than the screen (the blog grid on a
            // phone) can never be 8% visible, so any overlap has to count
            { threshold: 0, rootMargin: '0px 0px -40px 0px' }
        );

        const scan = () => {
            const vh = window.innerHeight;
            document.querySelectorAll('.rv:not(.in), .gs:not(.in)').forEach((el) => {
                const r = el.getBoundingClientRect();
                if (r.top < vh && r.bottom > 0) el.classList.add('in');
                else io.observe(el);
            });
        };

        scan();
        root.classList.add('rv-on');

        // sections mounted later (client navigation, expanding panels)
        let queued = 0;
        const mo = new MutationObserver(() => {
            if (!queued) queued = requestAnimationFrame(() => { queued = 0; scan(); });
        });
        mo.observe(document.body, { childList: true, subtree: true });

        // Safety net: a fast fling or an anchor jump can carry a block past the
        // viewport between frames without it ever intersecting. Anything at or
        // above the bottom of the screen is shown regardless.
        let swept = 0;
        const sweep = () => {
            swept = 0;
            const vh = window.innerHeight;
            document.querySelectorAll('.rv:not(.in), .gs:not(.in)').forEach((el) => {
                if (el.getBoundingClientRect().top < vh) {
                    el.classList.add('in');
                    io.unobserve(el);
                }
            });
        };
        const onScroll = () => { if (!swept) swept = requestAnimationFrame(sweep); };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('hashchange', onScroll);

        return () => {
            io.disconnect();
            mo.disconnect();
            cancelAnimationFrame(queued);
            cancelAnimationFrame(swept);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('hashchange', onScroll);
        };
    }, []);

    return null;
}
