import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, name, sort_order } = await request.json();
    if (!client_id || !name) return NextResponse.json({ error: 'client_id and name required' }, { status: 400 });
    const { data, error } = await supabase
      .from('sections').insert({ client_id, name, sort_order: sort_order ?? 0 }).select().single();
    if (error) { console.error('section create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ section: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id, name, sort_order } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (sort_order !== undefined) updates.sort_order = sort_order;
    if (Object.keys(updates).length === 0) return NextResponse.json({ error: 'nothing to update' }, { status: 400 });
    const { error } = await supabase.from('sections').update(updates).eq('id', id);
    if (error) { console.error('section update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('sections').delete().eq('id', id);
    if (error) { console.error('section delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
