import type { Metadata } from 'next';
import { requirePlatformPage } from '@/lib/platform/guard';
import { getActiveClientsWithCounts, getArchivedClients } from '@/lib/platform/data';
import Sidebar from './Sidebar';

export const metadata: Metadata = {
  title: 'Platform | Aurelius Media',
  robots: { index: false, follow: false },
};

export default async function ShellLayout({ children }: { children: React.ReactNode }) {
  await requirePlatformPage();
  const [clients, archived] = await Promise.all([
    getActiveClientsWithCounts(),
    getArchivedClients(),
  ]);
  return (
    <div className="min-h-screen flex bg-brand-dark text-white">
      <Sidebar clients={clients} archived={archived} />
      <main className="flex-1 min-w-0 px-8 py-8 max-w-4xl">{children}</main>
    </div>
  );
}
