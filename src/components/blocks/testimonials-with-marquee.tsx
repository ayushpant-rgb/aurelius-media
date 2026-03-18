import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { useInView } from "@/lib/hooks"

interface TestimonialsSectionProps {
    title: React.ReactNode
    description: string
    testimonials: Array<{
        author: TestimonialAuthor
        text: string
        href?: string
    }>
    className?: string
}

export function TestimonialsSection({
    title,
    description,
    testimonials,
    className
}: TestimonialsSectionProps) {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} className={cn(
            "bg-brand-darker relative overflow-hidden",
            "py-20 sm:py-24 px-0",
            className
        )}>
            {/* Background Accents to match design system */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-accent/3 rounded-full blur-3xl pointer-events-none" />

            <div className={cn("mx-auto flex flex-col items-center gap-8 sm:gap-16 relative z-10", inView ? 'animate-fade-in-up' : 'opacity-0')}>
                <div className="flex flex-col items-center gap-4 px-4 text-center">
                    <p className="text-xs uppercase tracking-[0.12em] text-brand-gray-dark mb-2">Testimonials</p>
                    <h2 className="max-w-[720px] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-lg max-w-2xl font-medium text-brand-gray mt-2 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
                    <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
                        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                            {[...Array(4)].map((_, setIndex) => (
                                testimonials.map((testimonial, i) => (
                                    <TestimonialCard
                                        key={`${setIndex}-${i}`}
                                        {...testimonial}
                                    />
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-brand-darker sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-brand-darker sm:block" />
                </div>
            </div>
        </section>
    )
}
