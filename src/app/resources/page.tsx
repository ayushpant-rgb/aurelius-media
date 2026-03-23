import { notFound } from 'next/navigation';

// Unpublished — resource pages are being redesigned with proper cover art.
// To re-enable: remove notFound(), restore metadata and ResourcesHubClient import.
export default function ResourcesPage() {
  notFound();
}
