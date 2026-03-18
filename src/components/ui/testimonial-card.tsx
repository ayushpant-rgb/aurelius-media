import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
    name: string
    handle: string
    avatar: string
}

export interface TestimonialCardProps {
    author: TestimonialAuthor
    text: string
    href?: string
    className?: string
}

export function TestimonialCard({
    author,
    text,
    href,
    className
}: TestimonialCardProps) {
    const Card = href ? 'a' : 'div'

    return (
        <Card
            {...(href ? { href } : {})}
            className={cn(
                "flex flex-col rounded-xl border",
                "bg-brand-card border-brand-border-subtle",
                "p-6 text-start",
                "hover:border-brand-border-hover",
                "w-[320px] shrink-0",
                "transition-colors duration-300",
                className
            )}
        >
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-brand-border-subtle">
                    <AvatarImage src={author.avatar} alt={author.name} />
                </Avatar>
                <div className="flex flex-col items-start">
                    <h3 className="text-base font-bold text-brand-white leading-tight">
                        {author.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-accent mt-0.5">
                        {author.handle}
                    </p>
                </div>
            </div>
            <p className="mt-4 text-sm text-brand-gray leading-relaxed">
                "{text}"
            </p>
        </Card>
    )
}
