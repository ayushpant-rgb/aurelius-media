export interface AureliusEvent {
    name: string;
    slug: string;
    type: 'conference' | 'hackathon-organized' | 'hackathon-participated' | 'workshop' | 'product-demo';
    typeLabel: string;
    date: string;
    description: string;
}

export const events: AureliusEvent[] = [
    {
        name: 'VibeCon India by Emergent',
        slug: 'vibecon-india',
        type: 'conference',
        typeLabel: 'Conference (Selected)',
        date: 'February 2026',
        description: 'Selected from 1,000+ applicants. Presented OpenRank AI. Met Vijay Shekhar Sharma (Paytm founder). Delhi edition.',
    },
    {
        name: 'SheBuilds Hackathon (IWD 2026)',
        slug: 'shebuilds-hackathon',
        type: 'hackathon-organized',
        typeLabel: 'Hackathon Organized',
        date: 'March 8, 2026',
        description: "Women's Day hackathon organized by Aurelius Media in partnership with Lovable. Delhi/Gurgaon.",
    },
    {
        name: "World's Largest Hackathon by Bolt",
        slug: 'bolt-hackathon',
        type: 'hackathon-participated',
        typeLabel: 'Hackathon Participated',
        date: 'May-June 2025',
        description: 'Global hackathon with $1M+ in prizes. Built using Bolt.new vibe coding platform.',
    },
    {
        name: 'GL Bajaj AI Workshop',
        slug: 'gl-bajaj-workshop',
        type: 'workshop',
        typeLabel: 'Workshop Conducted',
        date: '2025',
        description: 'AI marketing workshop delivered to GL Bajaj Institute students and faculty.',
    },
    {
        name: 'Phantom Films AI Workshop',
        slug: 'phantom-films-workshop',
        type: 'workshop',
        typeLabel: 'Workshop Conducted',
        date: '2025',
        description: "AI marketing and production workshop delivered to Madhu Mantena's team.",
    },
    {
        name: 'OpenRank AI at Emergent',
        slug: 'openrank-ai',
        type: 'product-demo',
        typeLabel: 'Product Demo',
        date: 'February 2026',
        description: 'Presented the OpenRank AI SEO intelligence platform co-founded with Surbhi Sondhi.',
    },
];
