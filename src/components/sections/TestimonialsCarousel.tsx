'use client';

import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useInView } from "@/lib/hooks"

interface TestimonialAuthor {
    name: string;
    role: string;
    company: string;
    avatar: string;
}

interface Testimonial {
    author: TestimonialAuthor;
    text: string;
}

// Column 1: Cameron + Tom (scrolls down)
const col1: Testimonial[] = [
    {
        author: { name: "Cameron Hildreth", role: "Brand Manager", company: "Aden + Anais", avatar: "/testimonials/Cameron Hildreth.avif" },
        text: "What impressed me most was their process. Aurelius didn't apply a cookie-cutter approach — they took the time to understand our unique challenges and built a custom strategy that delivered results within weeks.",
    },
    {
        author: { name: "Tom Chalmers", role: "CEO", company: "New Generation Publishing", avatar: "/testimonials/Tom.avif" },
        text: "Working with the Aurelius team gave us the clarity we needed. They cut through the digital marketing noise and built us a system that consistently generates qualified leads. Our sales team can't thank them enough.",
    },
    {
        author: { name: "Cameron Hildreth", role: "Brand Manager", company: "Aden + Anais", avatar: "/testimonials/Cameron Hildreth.avif" },
        text: "What sets Aurelius apart is that they think like growth partners, not just vendors. Every decision was tied to a business outcome. We saw qualified pipeline grow month over month from the very start.",
    },
    {
        author: { name: "Tom Chalmers", role: "CEO", company: "New Generation Publishing", avatar: "/testimonials/Tom.avif" },
        text: "The lead generation system Aurelius built for us delivers consistent, qualified leads every month. Their understanding of our industry combined with disciplined campaign management has been invaluable.",
    },
    {
        author: { name: "Cameron Hildreth", role: "Brand Manager", company: "Aden + Anais", avatar: "/testimonials/Cameron Hildreth.avif" },
        text: "We've worked with several agencies over the years. Aurelius Media is the first team that truly took ownership of the outcome — not just the deliverables. The difference in results was immediate.",
    },
];

// Column 2: Karan + Ira (scrolls up)
const col2: Testimonial[] = [
    {
        author: { name: "Karan Bajaj", role: "CEO, Whitehat Jr.", company: "Exited $300M", avatar: "/testimonials/Karan.avif" },
        text: "Aurelius Media transformed our digital strategy in just 90 days. They didn't just deliver clicks — they delivered customers who were ready to buy. Their data-driven approach eliminated the guesswork from our marketing spend.",
    },
    {
        author: { name: "Ira Trivedi", role: "Author & Wellness Expert", company: "TEDx Speaker", avatar: "/testimonials/Ira Trivedi.avif" },
        text: "Aurelius Media understood exactly what my brand needed. They combined creative storytelling with performance-driven campaigns in a way I'd never seen before. The results were beyond what I expected.",
    },
    {
        author: { name: "Karan Bajaj", role: "CEO, Whitehat Jr.", company: "Exited $300M", avatar: "/testimonials/Karan.avif" },
        text: "What sets Aurelius Media apart is their obsession with data. They don't just run ads — they engineer growth systems. Their work contributed directly to our GTM strategy during a critical period of scale.",
    },
    {
        author: { name: "Ira Trivedi", role: "Author & Wellness Expert", company: "TEDx Speaker", avatar: "/testimonials/Ira Trivedi.avif" },
        text: "From day one, the Aurelius team brought structure and strategy to everything. They don't just execute campaigns — they build systems that keep working and compounding over time.",
    },
    {
        author: { name: "Karan Bajaj", role: "CEO, Whitehat Jr.", company: "Exited $300M", avatar: "/testimonials/Karan.avif" },
        text: "Aurelius brought the kind of rigour and strategic thinking we expected from a top-tier growth partner. Their approach is methodical, creative, and completely tied to business impact.",
    },
];

// Column 3: Nidhi + Cameron + Karan (scrolls down)
const col3: Testimonial[] = [
    {
        author: { name: "Nidhi Upadhyay", role: "Author", company: "That Night (80,000+ copies sold)", avatar: "/testimonials/Nidhi.avif" },
        text: "When I was about to publish my novel, I reached out to Aurelius Media and instantly knew I was in the right hands. Their creative team is hands down one of the best — they make your story impossible to ignore.",
    },
    {
        author: { name: "Karan Bajaj", role: "CEO, Whitehat Jr.", company: "Exited $300M", avatar: "/testimonials/Karan.avif" },
        text: "Aurelius Media transformed our digital strategy in just 90 days. They didn't just deliver clicks — they delivered customers who were ready to buy. Their data-driven approach eliminated the guesswork.",
    },
    {
        author: { name: "Nidhi Upadhyay", role: "Author", company: "That Night (80,000+ copies sold)", avatar: "/testimonials/Nidhi.avif" },
        text: "The campaign Aurelius ran for my book launch was unlike anything I'd seen. They built momentum methodically — combining organic and paid in a way that felt authentic and completely connected with readers.",
    },
    {
        author: { name: "Cameron Hildreth", role: "Brand Manager", company: "Aden + Anais", avatar: "/testimonials/Cameron Hildreth.avif" },
        text: "Aurelius didn't apply a cookie-cutter approach — they took the time to understand our unique challenges. Every decision was tied to measurable business outcomes.",
    },
    {
        author: { name: "Nidhi Upadhyay", role: "Author", company: "That Night (80,000+ copies sold)", avatar: "/testimonials/Nidhi.avif" },
        text: "Aurelius didn't just run a campaign — they built an entire launch ecosystem around my book. The buzz they created was real and sustained. I'm already planning my next book launch with them in mind.",
    },
];

// Mobile rows: each row features a single person with all their testimonials
const cameronAll: Testimonial[] = [col1[0], col1[2], col1[4], col3[3]];
const tomAll: Testimonial[] = [col1[1], col1[3]];
const karanAll: Testimonial[] = [col2[0], col2[2], col2[4], col3[1]];

function TestimonialCard({ author, text }: Testimonial) {
    return (
        <div className="w-full p-5 rounded-[20px] bg-brand-card border border-brand-border-subtle">
            <p className="text-sm text-brand-gray leading-relaxed mb-4">
                &ldquo;{text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-brand-border-subtle flex-shrink-0">
                    <AvatarImage src={author.avatar} alt={author.name} className="object-cover object-top" />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-bold text-brand-white leading-tight">{author.name}</p>
                    <p className="text-xs text-brand-gray-dark">{author.role}, {author.company}</p>
                </div>
            </div>
        </div>
    );
}

function MobileTestimonialCard({ author, text }: Testimonial) {
    return (
        <div className="w-[300px] shrink-0 p-5 rounded-[20px] bg-brand-card border border-brand-border-subtle">
            <p className="text-sm text-brand-gray leading-relaxed mb-4">
                &ldquo;{text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-brand-border-subtle flex-shrink-0">
                    <AvatarImage src={author.avatar} alt={author.name} className="object-cover object-top" />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-bold text-brand-white leading-tight">{author.name}</p>
                    <p className="text-xs text-brand-gray-dark">{author.role}, {author.company}</p>
                </div>
            </div>
        </div>
    );
}

function HorizontalRow({ testimonials, direction, duration }: {
    testimonials: Testimonial[];
    direction: 'rtl' | 'ltr';
    duration: string;
}) {
    const items = [...testimonials, ...testimonials];
    const animClass = direction === 'rtl' ? 'animate-scroll-rtl' : 'animate-scroll-ltr';

    return (
        <div className="relative overflow-hidden">
            {/* Left fade */}
            <div className="absolute top-0 bottom-0 left-0 w-12 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none" />
            {/* Right fade */}
            <div className="absolute top-0 bottom-0 right-0 w-12 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none" />

            <div
                className={`flex gap-4 ${animClass}`}
                style={{ '--duration': duration } as React.CSSProperties}
            >
                {items.map((testimonial, i) => (
                    <MobileTestimonialCard key={i} {...testimonial} />
                ))}
            </div>
        </div>
    );
}

function VerticalColumn({ testimonials, direction, duration, className }: {
    testimonials: Testimonial[];
    direction: 'down' | 'up';
    duration: string;
    className?: string;
}) {
    const items = [...testimonials, ...testimonials];
    const animClass = direction === 'down'
        ? 'animate-marquee-vertical-down'
        : 'animate-marquee-vertical-up';

    return (
        <div className={cn("relative flex-1 overflow-hidden h-[550px] sm:h-[600px]", className)}>
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 z-10 bg-gradient-to-b from-brand-dark to-transparent pointer-events-none" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 z-10 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />

            <div
                className={`flex flex-col gap-4 ${animClass}`}
                style={{ '--duration': duration } as React.CSSProperties}
            >
                {items.map((testimonial, i) => (
                    <TestimonialCard key={i} {...testimonial} />
                ))}
            </div>
        </div>
    );
}

export default function TestimonialsCarousel() {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} className="bg-brand-dark relative overflow-hidden py-20 sm:py-28">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-accent/3 rounded-full blur-3xl" />

            <div className={cn("relative z-10 max-w-7xl mx-auto px-4 sm:px-6", inView ? 'animate-fade-in-up' : 'opacity-0')}>
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-4">Testimonials</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        There&apos;s a reason people
                        <br />
                        are <span className="gradient-text font-display">raving</span> about us.
                    </h2>
                </div>

                {/* Mobile: 3 horizontal rows with alternating directions */}
                <div className="flex flex-col gap-4 sm:hidden">
                    <HorizontalRow testimonials={cameronAll} direction="rtl" duration="45s" />
                    <HorizontalRow testimonials={tomAll} direction="ltr" duration="40s" />
                    <HorizontalRow testimonials={karanAll} direction="rtl" duration="47s" />
                </div>

                {/* Tablet/Desktop: vertical columns */}
                <div className="hidden sm:flex gap-6">
                    <VerticalColumn testimonials={col1} direction="down" duration="56s" />
                    <VerticalColumn testimonials={col2} direction="up" duration="63s" />
                    <VerticalColumn testimonials={col3} direction="down" duration="59s" className="hidden lg:block" />
                </div>

                {/* Inline CTA */}
                <div className="text-center mt-14">
                    <p className="text-sm text-brand-gray mb-5 max-w-sm mx-auto leading-relaxed">
                        Join 84+ businesses that have scaled with Aurelius Media.
                    </p>
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 cta-primary text-white font-semibold rounded-full text-sm"
                    >
                        Book a Strategy Call
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
