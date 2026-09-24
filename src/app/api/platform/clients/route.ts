import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { name, company } = await request.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('clients').insert({ name, company: company ?? null }).select().single();
    if (error) { console.error('client create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ client: data });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id, name, company, status } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (company !== undefined) updates.company = company;
    if (status !== undefined) {
      if (!['active', 'archived'].includes(status)) {
        return NextResponse.json({ error: 'bad status' }, { status: 400 });
      }
      updates.status = status;
    }
    if (Object.keys(updates).length === 0) return NextResponse.json({ error: 'nothing to update' }, { status: 400 });
    const { error } = await supabase.from('clients').update(updates).eq('id', id);
    if (error) { console.error('client update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
