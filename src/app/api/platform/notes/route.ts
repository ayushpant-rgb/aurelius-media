import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, body } = await request.json();
    if (!client_id || !body) return NextResponse.json({ error: 'client_id and body required' }, { status: 400 });
    const { data, error } = await supabase.from('notes').insert({ client_id, body }).select().single();
    if (error) { console.error('note create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ note: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id, body } = await request.json();
    if (!id || body === undefined) return NextResponse.json({ error: 'id and body required' }, { status: 400 });
    const { error } = await supabase.from('notes').update({ body, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) { console.error('note update', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) { console.error('note delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
