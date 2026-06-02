import { describe, it, expect } from 'vitest';
import { compareTasks, classifyDue } from './ordering';
import type { Task } from './types';

function t(partial: Partial<Task>): Task {
  return {
    id: 'x', client_id: 'c', section_id: null, title: 't', description: null,
    completed_at: null, in_progress: false, priority: 4, due_date: null,
    client_visible: false, created_at: '', updated_at: '', ...partial,
  };
}

describe('compareTasks', () => {
  it('puts open tasks before done tasks', () => {
    const open = t({ completed_at: null });
    const done = t({ completed_at: '2026-06-01T00:00:00Z' });
    expect(compareTasks(open, done)).toBeLessThan(0);
  });
  it('orders by priority ascending (P1 before P4) among open tasks', () => {
    expect(compareTasks(t({ priority: 1 }), t({ priority: 4 }))).toBeLessThan(0);
  });
  it('orders by due_date ascending when priority ties, nulls last', () => {
    expect(compareTasks(t({ due_date: '2026-06-10' }), t({ due_date: '2026-06-20' }))).toBeLessThan(0);
    expect(compareTasks(t({ due_date: '2026-06-10' }), t({ due_date: null }))).toBeLessThan(0);
  });
});

describe('classifyDue', () => {
  const today = '2026-06-02';
  it('flags a past due_date as overdue', () => {
    expect(classifyDue('2026-06-01', today)).toBe('overdue');
  });
  it('flags today as today', () => {
    expect(classifyDue('2026-06-02', today)).toBe('today');
  });
  it('flags a future date as upcoming', () => {
    expect(classifyDue('2026-06-03', today)).toBe('upcoming');
  });
  it('returns none for no due date', () => {
    expect(classifyDue(null, today)).toBe('none');
  });
});
