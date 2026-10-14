import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePlatformApi } from '@/lib/platform/guard';

export async function POST(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { client_id, label, url } = await request.json();
    if (!client_id || !label || !url) return NextResponse.json({ error: 'client_id, label, url required' }, { status: 400 });
    if (!/^https?:\/\//.test(url)) return NextResponse.json({ error: 'url must start with http(s)://' }, { status: 400 });
    const { data, error } = await supabase.from('files').insert({ client_id, label, url }).select().single();
    if (error) { console.error('file create', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ file: data });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requirePlatformApi();
  if (unauth) return unauth;
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('files').delete().eq('id', id);
    if (error) { console.error('file delete', error); return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); }
}
