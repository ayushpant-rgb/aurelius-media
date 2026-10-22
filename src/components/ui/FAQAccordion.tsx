'use client';

import { useId, useState } from 'react';
import '@/app/styles/services.css';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    heading?: string;
    headingAccent?: string;
    eyebrow?: string;
    defaultOpenCount?: number;
}

// Design-system FAQ (.faq / .q / .qh / .qa). Several answers can be open at once;
// the first `defaultOpenCount` start open.
export default function FAQAccordion({
    items,
    heading = 'Frequently asked',
    headingAccent = 'questions.',
    eyebrow = 'FAQ',
    defaultOpenCount = 0,
}: FAQAccordionProps) {
    const uid = useId();
    const [openIndices, setOpenIndices] = useState<Set<number>>(
        () => new Set(Array.from({ length: Math.min(defaultOpenCount, items.length) }, (_, i) => i))
    );

    const toggle = (index: number) => {
        setOpenIndices((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    return (
        <div>
            <div className="shead rv">
                <div>
                    {eyebrow && <span className="k">— {eyebrow} —</span>}
                    <h2>
                        {heading}{' '}
                        <em className="acc-em">{headingAccent}</em>
                    </h2>
                </div>
            </div>

            <div className="faq">
                {items.map((item, i) => {
                    const isOpen = openIndices.has(i);
                    const panelId = `${uid}-a${i}`;
                    return (
                        <div key={i} className={`q${isOpen ? ' open' : ''}`}>
                            <button
                                type="button"
                                className="qh"
                                onClick={() => toggle(i)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                            >
                                <span className="qt">{item.question}</span>
                                <span className="pm" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                            </button>
                            <div
                                id={panelId}
                                className="qwrap"
                                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                            >
                                <div>
                                    <p className="qa">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
