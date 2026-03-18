"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    tags?: string[];
    meta?: string;
    cta?: string;
    href?: string;
}

interface BentoGridProps {
    items: BentoItem[];
    className?: string;
}

function BentoGrid({ items, className }: BentoGridProps) {
    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", className)}>
            {items.map((item, index) => {
                const cardContent = (
                    <div className="relative flex flex-col h-full space-y-3">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                            {item.icon}
                        </div>

                        {/* Title + meta */}
                        <div>
                            <h3 className="text-sm font-semibold text-brand-white group-hover:text-white transition-colors">
                                {item.title}
                            </h3>
                            {item.meta && (
                                <span className="text-[10px] uppercase tracking-[0.12em] text-brand-gray-dark">{item.meta}</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-brand-gray leading-relaxed flex-1">
                            {item.description}
                        </p>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-brand-border-subtle text-brand-gray-dark"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* CTA on hover */}
                        {item.cta && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                                <span className="text-xs font-medium text-brand-accent">{item.cta}</span>
                            </div>
                        )}
                    </div>
                );

                const cardClasses = cn(
                    "group relative p-7 rounded-[20px] overflow-hidden transition-all duration-300",
                    "bg-brand-card border border-brand-border-subtle",
                    "hover:border-[rgba(232,85,15,0.30)] hover:-translate-y-0.5",
                );

                if (item.href) {
                    return (
                        <Link key={index} href={item.href} className={cardClasses}>
                            {cardContent}
                        </Link>
                    );
                }

                return (
                    <div key={index} className={cardClasses}>
                        {cardContent}
                    </div>
                );
            })}
        </div>
    );
}

export { BentoGrid };
