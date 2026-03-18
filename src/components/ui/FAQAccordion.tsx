'use client';

import { useState } from 'react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    heading?: string;
    headingAccent?: string;
    eyebrow?: string;
}

export default function FAQAccordion({
    items,
    heading = 'Frequently asked',
    headingAccent = 'questions.',
    eyebrow = 'FAQ',
}: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div>
            {/* Header */}
            {eyebrow && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-dark mb-4 font-mono">
                    {eyebrow}
                </p>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 tracking-tight">
                {heading}{' '}
                <span className="font-display italic font-normal">{headingAccent}</span>
            </h2>

            {/* Accordion */}
            <div className="space-y-0 divide-y divide-brand-border-subtle border-y border-brand-border-subtle">
                {items.map((item, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <div key={i} className="group">
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                className="w-full flex items-center justify-between py-6 sm:py-7 text-left cursor-pointer transition-colors duration-200"
                            >
                                <span className={`text-lg sm:text-xl font-medium pr-8 transition-colors duration-200 ${isOpen ? 'text-brand-white' : 'text-brand-white/80 group-hover:text-brand-white'}`}>
                                    {item.question}
                                </span>
                                <span className="relative w-7 h-7 shrink-0 flex items-center justify-center rounded-full border border-brand-border-subtle transition-colors duration-300">
                                    <span className={`absolute w-3.5 h-[1.5px] rounded-full transition-colors duration-300 ${isOpen ? 'bg-brand-accent' : 'bg-brand-white/60'}`} />
                                    <span className={`absolute w-3.5 h-[1.5px] rounded-full transition-all duration-300 ${isOpen ? 'rotate-0 opacity-0 bg-brand-accent' : 'rotate-90 opacity-100 bg-brand-white/60'}`} />
                                </span>
                            </button>
                            <div
                                className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                            >
                                <div className="overflow-hidden">
                                    <p className="pb-7 sm:pb-8 pr-12 text-base sm:text-[17px] text-brand-gray leading-[1.75] max-w-3xl">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
