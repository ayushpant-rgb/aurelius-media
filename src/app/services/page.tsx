import { Metadata } from 'next';
import ServicesHubClient from './ServicesHubClient';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Performance advertising, creative production, AI automation, and growth services. Explore our full range of AI-native marketing services.',
    openGraph: {
        title: 'Services | Aurelius Media',
        description: 'Performance advertising, creative production, AI automation, and growth services for startups and brands.',
        type: 'website',
        url: 'https://www.aureliusmedia.co/services',
    },
};

export default function ServicesPage() {
    return <ServicesHubClient />;
}
