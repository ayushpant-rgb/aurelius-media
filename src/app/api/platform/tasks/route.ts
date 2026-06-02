import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

/** A due_date is valid if it is null/undefined (cleared) or a 'YYYY-MM-DD' string. */
function badDate(d: unknown): boolean {
  if (d === null || d === undefined) return false;
  return !(typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d));
}

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, title, section_id, due_date, priority } = await request.json();
    if (!client_id || !title) return NextResponse.json({ error: 'client_id and title required' }, { status: 400 });
    if (priority !== undefined && ![1, 2, 3, 4].includes(priority)) {
      return NextResponse.json({ error: 'bad priority' }, { status: 400 });
    }
    if (badDate(due_date)) return NextResponse.json({ error: 'bad due_date' }, { status: 400 });
    const { data, error } = await supabase.from('tasks').insert({
      client_id, title,
      section_id: section_id ?? null,
      due_date: due_date ?? null,
      priority: priority ?? 4,
    }).select().single();
    if (error) { console.error('task create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ task: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    if (body.priority !== undefined && ![1, 2, 3, 4].includes(body.priority)) {
      return NextResponse.json({ error: 'bad priority' }, { status: 400 });
    }
    if (body.due_date !== undefined && badDate(body.due_date)) {
      return NextResponse.json({ error: 'bad due_date' }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    // Completion via checkbox: client sends `done: true|false`.
    if (body.done !== undefined) {
      updates.completed_at = body.done ? new Date().toISOString() : null;
      if (body.done) updates.in_progress = false; // done tasks are not "in progress"
    }
    for (const f of ['title', 'description', 'section_id', 'due_date', 'priority', 'in_progress', 'client_visible'] as const) {
      if (body[f] !== undefined) updates[f] = body[f];
    }
    const { error } = await supabase.from('tasks').update(updates).eq('id', id);
    if (error) { console.error('task update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) { console.error('task delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
