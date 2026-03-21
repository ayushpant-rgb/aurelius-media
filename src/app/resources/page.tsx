import type { Metadata } from 'next';
import ResourcesHubClient from './ResourcesHubClient';

export const metadata: Metadata = {
  title: 'Free Marketing Resources & Ebooks | Aurelius Media',
  description:
    'Download free marketing playbooks and ebooks from Aurelius Media. Startup growth strategies, Meta Ads mastery, book marketing guides, and more.',
  openGraph: {
    title: 'Free Marketing Resources & Ebooks | Aurelius Media',
    description:
      'Download free marketing playbooks from Aurelius Media — startup growth, Meta Ads, book marketing, and more.',
    type: 'website',
    url: 'https://www.aureliusmedia.co/resources',
    images: [{ url: '/logo.png', alt: 'Aurelius Media' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Marketing Resources | Aurelius Media',
    description: 'Download free marketing playbooks and ebooks.',
  },
};

export default function ResourcesPage() {
  return <ResourcesHubClient />;
}
