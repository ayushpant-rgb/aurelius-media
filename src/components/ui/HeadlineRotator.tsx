'use client';

import { useEffect, useState } from 'react';

interface HeadlineRotatorProps {
    words: string[];
    suffix?: string;
    interval?: number;
}

// Rolls one word of the hero headline, letter by letter. The first word is what
// the server renders, so crawlers and no-JS visitors read the real headline.
export default function HeadlineRotator({ words, suffix = '', interval = 2600 }: HeadlineRotatorProps) {
    const [index, setIndex] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = window.setInterval(() => {
            if (document.hidden) return;
            setIndex((i) => {
                setPrev(i);
                return (i + 1) % words.length;
            });
        }, interval);
        return () => window.clearInterval(id);
    }, [words.length, interval]);

    const letters = (word: string, cls: string) =>
        Array.from(word + suffix).map((ch, i) => (
            <span key={i} className={cls} style={{ '--i': i } as React.CSSProperties}>
                {ch === ' ' ? ' ' : ch}
            </span>
        ));

    return (
        <span className="rot">
            <span className="rot-cur" key={`c${index}`}>{letters(words[index], 'rl in')}</span>
            {prev !== null && (
                <span className="rot-prev" key={`p${prev}-${index}`} aria-hidden="true">{letters(words[prev], 'rl out')}</span>
            )}
        </span>
    );
}
