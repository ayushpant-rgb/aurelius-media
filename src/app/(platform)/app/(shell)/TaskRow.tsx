import Link from 'next/link';
import type { Task } from '@/lib/platform/types';
import { classifyDue } from '@/lib/platform/ordering';

const P_COLORS = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-brand-gray-dark'];

export default function TaskRow({ task, clientName, today }: { task: Task; clientName: string; today: string }) {
  const due = classifyDue(task.due_date, today);
  return (
    <div className="flex items-center gap-3 py-2 border-b border-brand-border-subtle">
      <span className={`text-xs ${P_COLORS[task.priority]}`}>P{task.priority}</span>
      <span className="flex-1 min-w-0 truncate">{task.title}</span>
      {task.in_progress && <span className="text-xs text-brand-accent-text">in progress</span>}
      {task.due_date && (
        <span className={`text-xs ${due === 'overdue' ? 'text-red-400' : 'text-brand-gray-dark'}`}>{task.due_date}</span>
      )}
      <Link href={`/app/clients/${task.client_id}`} className="text-xs text-brand-gray-dark hover:text-white">
        {clientName}
      </Link>
    </div>
  );
}
