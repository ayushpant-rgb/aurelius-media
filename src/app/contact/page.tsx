import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
    title: 'Contact Aurelius Media',
    description:
        'Get in touch with Aurelius Media. Book a free 15-minute strategy call or send us a message. AI-powered performance marketing for brands that demand results.',
    openGraph: {
        title: 'Contact Aurelius Media',
        description: 'Book a free 15-minute strategy call or send us a message.',
        type: 'website',
        url: 'https://www.aureliusmedia.co/contact',
        images: [{ url: '/logo.png', alt: 'Aurelius Media' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Aurelius Media',
        description: 'Book a free strategy call or send us a message.',
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
