import { notFound } from 'next/navigation';
import { ebooks } from '@/data/ebooks';

// Unpublished — ebook landing pages are being redesigned with proper cover art.
// To re-enable: restore generateStaticParams, generateMetadata, and EbookLandingClient.

export function generateStaticParams() {
  return ebooks.map((ebook) => ({ slug: ebook.slug }));
}

export default async function EbookPage() {
  notFound();
}
