import type { Task } from './types';

export type DueClass = 'overdue' | 'today' | 'upcoming' | 'none';

/** Classify a 'YYYY-MM-DD' due date relative to a 'YYYY-MM-DD' today. */
export function classifyDue(dueDate: string | null, today: string): DueClass {
  if (!dueDate) return 'none';
  if (dueDate < today) return 'overdue';
  if (dueDate === today) return 'today';
  return 'upcoming';
}

/** Default ordering: open before done, then priority asc, then due_date asc (nulls last). */
export function compareTasks(a: Task, b: Task): number {
  const aDone = a.completed_at ? 1 : 0;
  const bDone = b.completed_at ? 1 : 0;
  if (aDone !== bDone) return aDone - bDone;
  if (a.priority !== b.priority) return a.priority - b.priority;
  if (a.due_date && b.due_date) return a.due_date < b.due_date ? -1 : a.due_date > b.due_date ? 1 : 0;
  if (a.due_date && !b.due_date) return -1;
  if (!a.due_date && b.due_date) return 1;
  return 0;
}
