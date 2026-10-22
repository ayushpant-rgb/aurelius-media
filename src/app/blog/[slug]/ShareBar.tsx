'use client';

import { useEffect, useRef, useState } from 'react';

// "Share this article" row from the article frame (33/34).
export default function ShareBar({ url, title }: { url: string; title: string }) {
    const [copied, setCopied] = useState(false);
    const resetTimer = useRef(0);
    useEffect(() => () => window.clearTimeout(resetTimer.current), []);
    const enc = encodeURIComponent(url);

    const copy = async () => {
        let ok = false;
        try {
            await navigator.clipboard.writeText(url);
            ok = true;
        } catch {
            // Async clipboard can be blocked (permissions, unfocused document) — fall back.
            const ta = document.createElement('textarea');
            ta.value = url;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            ok = document.execCommand('copy');
            ta.remove();
        }
        if (ok) {
            setCopied(true);
            window.clearTimeout(resetTimer.current);
            resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="sharebar ar-share ar-narrow">
            <span>Share this article</span>
            <a
                className="chip"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>
            <a
                className="chip"
                href={`https://twitter.com/intent/tweet?url=${enc}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                X
            </a>
            <button type="button" className="chip" onClick={copy} aria-live="polite">
                {copied ? 'Link copied' : 'Copy link'}
            </button>
        </div>
    );
}
