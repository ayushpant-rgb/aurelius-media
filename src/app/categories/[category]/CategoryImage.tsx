'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

// Framed category illustration. If the file can't be loaded the whole frame is
// dropped instead of leaving a broken-image box (the hero then falls back to
// a single column via :has() in blog.css).
export default function CategoryImage({
    src,
    alt,
    className,
    sizes,
    priority = false,
}: {
    src: string;
    alt: string;
    className: string;
    sizes: string;
    priority?: boolean;
}) {
    const [failed, setFailed] = useState(false);

    // The request can fail before hydration, when onError isn't attached yet,
    // so also check the element once React attaches to it.
    const ref = useCallback((img: HTMLImageElement | null) => {
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    }, []);

    if (failed) return null;

    return (
        <div className={className}>
            <Image ref={ref} src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} />
        </div>
    );
}
