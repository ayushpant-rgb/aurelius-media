import { requirePlatformPage } from '@/lib/platform/guard';
import { getUpcomingTasks, getClientNameMap, todayStr } from '@/lib/platform/data';
import { compareTasks } from '@/lib/platform/ordering';
import TaskRow from '../TaskRow';

export default async function UpcomingPage() {
  await requirePlatformPage();
  const today = todayStr();
  const [tasks, names] = await Promise.all([getUpcomingTasks(today), getClientNameMap()]);
  const byDate = new Map<string, typeof tasks>();
  for (const t of tasks) {
    const key = t.due_date as string;
    let arr = byDate.get(key);
    if (!arr) { arr = []; byDate.set(key, arr); }
    arr.push(t);
  }
  const dates = [...byDate.keys()].sort();
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold mb-6">Upcoming</h1>
      {dates.length === 0 && <p className="text-brand-gray">Nothing scheduled ahead.</p>}
      {dates.map((d) => (
        <section key={d} className="mb-6">
          <h2 className="text-sm text-brand-gray-dark mb-2">{d}</h2>
          {byDate.get(d)!.sort(compareTasks).map((t) => (
            <TaskRow key={t.id} task={t} clientName={names.get(t.client_id) ?? ''} today={today} />
          ))}
        </section>
      ))}
    </div>
  );
}
