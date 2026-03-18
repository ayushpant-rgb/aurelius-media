import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with Aurelius Media. Book a free 15-minute strategy call or send us a message. AI-powered performance marketing for brands that demand results.',
};

export default function ContactPage() {
    return <ContactPageClient />;
}
