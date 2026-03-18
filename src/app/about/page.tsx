import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
    title: 'About',
    description:
        'Learn about Aurelius Media. Founded by Ayush Pant with 20+ years of digital marketing expertise, managing 100CR+ in ad spend across 150+ clients in 25+ countries.',
};

export default function AboutPage() {
    return <AboutPageClient />;
}
