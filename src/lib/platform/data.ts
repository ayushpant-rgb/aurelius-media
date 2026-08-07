import { supabase } from '@/lib/supabase';
import type { Client, ClientWithOpenCount, Section, Task, Note, FileLink } from './types';

/** Today as 'YYYY-MM-DD' in the app's timezone (Asia/Kolkata for this agency). */
export function todayStr(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
}

export async function getActiveClientsWithCounts(): Promise<ClientWithOpenCount[]> {
  const { data: clients, error } = await supabase
    .from('clients').select('*').eq('status', 'active').order('name');
  if (error) throw error;
  const { data: openTasks, error: tErr } = await supabase
    .from('tasks').select('client_id').is('completed_at', null);
  if (tErr) throw tErr;
  const counts = new Map<string, number>();
  for (const row of openTasks ?? []) counts.set(row.client_id, (counts.get(row.client_id) ?? 0) + 1);
  return (clients ?? []).map((c) => ({ ...(c as Client), open_count: counts.get(c.id) ?? 0 }));
}

export async function getArchivedClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients').select('*').eq('status', 'archived').order('name');
  if (error) throw error;
  return (data ?? []) as Client[];
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data as Client) ?? null;
}

export async function getSections(clientId: string): Promise<Section[]> {
  const { data, error } = await supabase
    .from('sections').select('*').eq('client_id', clientId).order('sort_order');
  if (error) throw error;
  return (data ?? []) as Section[];
}

export async function getTasksForClient(clientId: string): Promise<Task[]> {
  const { data, error } = await supabase.from('tasks').select('*').eq('client_id', clientId);
  if (error) throw error;
  return (data ?? []) as Task[];
}

/** Open tasks across all clients due today or earlier. */
export async function getTodayTasks(today: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks').select('*').is('completed_at', null).not('due_date', 'is', null).lte('due_date', today);
  if (error) throw error;
  return (data ?? []) as Task[];
}

/** Open tasks across all clients due after today. */
export async function getUpcomingTasks(today: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks').select('*').is('completed_at', null).gt('due_date', today).order('due_date');
  if (error) throw error;
  return (data ?? []) as Task[];
}

export async function getNotes(clientId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes').select('*').eq('client_id', clientId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Note[];
}

export async function getFiles(clientId: string): Promise<FileLink[]> {
  const { data, error } = await supabase
    .from('files').select('*').eq('client_id', clientId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as FileLink[];
}

/** A name lookup for labeling cross-client task rows in Today/Upcoming. */
export async function getClientNameMap(): Promise<Map<string, string>> {
  const { data, error } = await supabase.from('clients').select('id,name');
  if (error) throw error;
  return new Map((data ?? []).map((c) => [c.id, c.name]));
}
