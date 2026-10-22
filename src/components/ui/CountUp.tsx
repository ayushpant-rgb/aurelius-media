'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
    to: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
}

// Counts up from 0 when first scrolled into view. The final value is the
// server-rendered text, so crawlers and no-JS visitors see the real number.
export default function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1500 }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const format = (v: number) =>
        prefix + (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')) + suffix;
    const [text, setText] = useState(format(to));

    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let raf = 0;
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
                const p = Math.min(1, (now - start) / duration);
                setText(format(to * (1 - Math.pow(1 - p, 3))));
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        });
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [to, duration]);

    return <span ref={ref}>{text}</span>;
}
