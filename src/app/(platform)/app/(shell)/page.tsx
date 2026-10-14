import { requirePlatformPage } from '@/lib/platform/guard';
import { getTodayTasks, getClientNameMap, todayStr } from '@/lib/platform/data';
import { compareTasks } from '@/lib/platform/ordering';
import TaskRow from './TaskRow';

export default async function TodayPage() {
  await requirePlatformPage();
  const today = todayStr();
  const [tasks, names] = await Promise.all([getTodayTasks(today), getClientNameMap()]);
  const sorted = [...tasks].sort(compareTasks);
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold mb-6">Today</h1>
      {sorted.length === 0 && <p className="text-brand-gray">Nothing due today. Clear desk.</p>}
      {sorted.map((t) => (
        <TaskRow key={t.id} task={t} clientName={names.get(t.client_id) ?? ''} today={today} />
      ))}
    </div>
  );
}
