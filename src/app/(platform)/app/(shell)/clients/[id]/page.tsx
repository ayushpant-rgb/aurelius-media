import { notFound } from 'next/navigation';
import { requirePlatformPage } from '@/lib/platform/guard';
import { getClient, getSections, getTasksForClient, getNotes, getFiles, todayStr } from '@/lib/platform/data';
import ClientView from './ClientView';

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePlatformPage();
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  const [sections, tasks, notes, files] = await Promise.all([
    getSections(id), getTasksForClient(id), getNotes(id), getFiles(id),
  ]);
  return (
    <ClientView
      client={client} sections={sections} tasks={tasks} notes={notes} files={files} today={todayStr()}
    />
  );
}
