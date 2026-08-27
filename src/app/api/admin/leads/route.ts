import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const source = searchParams.get('source');
  // spam=only → quarantine view; spam=all → everything; default → real leads only
  const spam = searchParams.get('spam');

  const buildQuery = (withSpamFilter: boolean) => {
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (source) query = query.eq('source', source);
    if (withSpamFilter) {
      if (spam === 'only') query = query.eq('is_spam', true);
      else if (spam !== 'all') query = query.eq('is_spam', false);
    }
    return query;
  };

  let { data, error } = await buildQuery(true);

  // Pre-migration DBs don't have is_spam yet — retry without the filter
  if (error && (error.code === '42703' || /column/i.test(error.message || ''))) {
    ({ data, error } = await buildQuery(false));
  }

  if (error) {
    console.error('Admin leads fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }

  return NextResponse.json({ leads: data });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, notes, is_spam } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    const updates: Record<string, string | boolean> = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (typeof is_spam === 'boolean') updates.is_spam = is_spam;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const { error } = await supabase.from('leads').update(updates).eq('id', id);

    if (error) {
      console.error('Admin lead update error:', error);
      return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
