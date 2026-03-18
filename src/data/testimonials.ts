export interface Testimonial {
    name: string;
    title: string;
    company: string;
    quote: string;
    image?: string;
    serviceRelevance: string[];
}

export const testimonials: Testimonial[] = [
    {
        name: 'Cameron Hildreth',
        title: 'Brand Manager',
        company: 'Aden + Anais',
        quote: 'Aurelius Media delivered a custom strategy that drove results faster than we anticipated. Their approach to Meta Ads completely transformed our e-commerce performance, reducing our CPA by 37% while scaling to 2,000+ sales.',
        serviceRelevance: ['meta-ads', 'creative-design'],
    },
    {
        name: 'Tom Chalmers',
        title: 'CEO',
        company: 'New Generation Publishing',
        quote: 'The lead generation system Aurelius Media built for us consistently delivers qualified leads. Their understanding of the publishing industry combined with data-driven campaign management has been invaluable to our growth.',
        serviceRelevance: ['google-ads', 'book-marketing'],
    },
    {
        name: 'Karan Bajaj',
        title: 'CEO, WhiteHat Jr (exited $300M)',
        company: 'Complement1',
        quote: 'What sets Aurelius Media apart is their data-driven approach to customer acquisition. They do not just run ads; they engineer growth systems. Their work contributed directly to our GTM strategy during our $16M funding round.',
        serviceRelevance: ['google-ads', 'meta-ads', 'ai-automation'],
    },
];
