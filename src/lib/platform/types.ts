export type ClientStatus = 'active' | 'archived';

export interface Client {
  id: string;
  name: string;
  company: string | null;
  status: ClientStatus;
  created_at: string;
}

export interface Section {
  id: string;
  client_id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export type Priority = 1 | 2 | 3 | 4;

export interface Task {
  id: string;
  client_id: string;
  section_id: string | null;
  title: string;
  description: string | null;
  completed_at: string | null;
  in_progress: boolean;
  priority: Priority;
  due_date: string | null; // 'YYYY-MM-DD'
  client_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  client_id: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface FileLink {
  id: string;
  client_id: string;
  label: string;
  url: string;
  created_at: string;
}

/** A client plus its count of open (incomplete) tasks, for the sidebar. */
export interface ClientWithOpenCount extends Client {
  open_count: number;
}
