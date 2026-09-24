'use client';

import { useRouter } from 'next/navigation';

export default function CompleteCheckbox({ taskId }: { taskId: string }) {
  const router = useRouter();
  async function complete() {
    const res = await fetch('/api/platform/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId, done: true }),
    });
    if (res.ok) router.refresh();
  }
  return <input type="checkbox" checked={false} onChange={complete} className="accent-brand-accent" />;
}
