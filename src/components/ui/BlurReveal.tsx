'use client';

import { useRef, useEffect, useState } from 'react';

interface BlurRevealProps {
    children: React.ReactNode;
    className?: string;
}

export default function BlurReveal({ children, className = '' }: BlurRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0); // 0 = fully blurred, 1 = fully clear

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Build a dense threshold array for smooth interpolation
        const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

        const observer = new IntersectionObserver(
            ([entry]) => {
                // intersectionRatio goes 0 → ~0.4 as element scrolls into view
                // Map 0–0.4 → 0–1 for a crisp reveal in the first 40% of entry
                const ratio = Math.min(entry.intersectionRatio / 0.4, 1);
                setProgress(ratio);
            },
            { threshold: thresholds }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const blur = (1 - progress) * 18; // max 18px blur when fully hidden
    const opacity = 0.3 + progress * 0.7; // fade from 0.3 → 1.0

    return (
        <div
            ref={ref}
            className={className}
            style={{
                filter: `blur(${blur.toFixed(1)}px)`,
                opacity,
                transition: 'filter 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'filter, opacity',
            }}
        >
            {children}
        </div>
    );
}
