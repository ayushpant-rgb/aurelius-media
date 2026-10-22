'use client';

import { useEffect, useRef } from 'react';

// Section whose background grid + glow follow the pointer (sets --mx / --my).
export default function Spotlight({ className = '', children }: { className?: string; children: React.ReactNode }) {
    const ref = useRef<HTMLElement>(null);
    const frame = useRef(0);
    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    const onMove = (e: React.PointerEvent<HTMLElement>) => {
        if (e.pointerType !== 'mouse') return;
        const el = ref.current;
        if (!el) return;
        const { clientX, clientY } = e;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${clientX - r.left}px`);
            el.style.setProperty('--my', `${clientY - r.top}px`);
        });
    };

    return (
        <section ref={ref} className={`gridbg spot ${className}`} onPointerMove={onMove}>
            <span className="spotglow" aria-hidden="true" />
            {children}
        </section>
    );
}
