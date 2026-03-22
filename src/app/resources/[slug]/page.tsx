import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ebooks, getEbookBySlug } from '@/data/ebooks';
import EbookLandingClient from './EbookLandingClient';

export function generateStaticParams() {
  return ebooks.map((ebook) => ({ slug: ebook.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) return {};

  return {
    title: ebook.metaTitle,
    description: ebook.metaDescription,
    openGraph: {
      title: ebook.metaTitle,
      description: ebook.metaDescription,
      type: 'website',
      url: `https://www.aureliusmedia.co/resources/${ebook.slug}`,
      images: [{ url: '/logo.png', alt: 'Aurelius Media' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ebook.metaTitle,
      description: ebook.metaDescription,
    },
  };
}

export default async function EbookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) notFound();

  return <EbookLandingClient ebook={ebook} />;
}
