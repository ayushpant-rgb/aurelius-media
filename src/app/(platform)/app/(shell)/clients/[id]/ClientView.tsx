'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Client, Section, Task, Note, FileLink } from '@/lib/platform/types';
import { compareTasks } from '@/lib/platform/ordering';

type Tab = 'tasks' | 'notes' | 'files';

async function api(path: string, method: string, body: unknown) {
  const res = await fetch(path, {
    method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  return res.ok;
}

export default function ClientView(props: {
  client: Client; sections: Section[]; tasks: Task[]; notes: Note[]; files: FileLink[]; today: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('tasks');
  const refresh = () => router.refresh();

  async function toggleDone(t: Task) {
    if (await api('/api/platform/tasks', 'PATCH', { id: t.id, done: !t.completed_at })) refresh();
  }
  async function patchTask(id: string, patch: Record<string, unknown>) {
    if (await api('/api/platform/tasks', 'PATCH', { id, ...patch })) refresh();
  }
  async function addTask(sectionId: string | null, title: string) {
    if (!title.trim()) return;
    if (await api('/api/platform/tasks', 'POST', { client_id: props.client.id, section_id: sectionId, title })) refresh();
  }

  const sorted = [...props.sections].sort((a, b) => a.sort_order - b.sort_order);
  const groups: { id: string | null; name: string; sortOrder: number; tasks: Task[] }[] = [
    { id: null, name: 'No section', sortOrder: -1, tasks: props.tasks.filter((t) => !t.section_id) },
    ...sorted.map((s) => ({
      id: s.id, name: s.name, sortOrder: s.sort_order,
      tasks: props.tasks.filter((t) => t.section_id === s.id),
    })),
  ];

  async function renameSection(id: string, current: string) {
    const next = window.prompt('Rename section', current);
    if (next && await api('/api/platform/sections', 'PATCH', { id, name: next })) refresh();
  }
  async function moveSection(idx: number, dir: -1 | 1) {
    // idx is the index within `sorted` (named sections only).
    const a = sorted[idx];
    const b = sorted[idx + dir];
    if (!a || !b) return;
    await api('/api/platform/sections', 'PATCH', { id: a.id, sort_order: b.sort_order });
    await api('/api/platform/sections', 'PATCH', { id: b.id, sort_order: a.sort_order });
    refresh();
  }
  async function deleteSection(id: string) {
    if (confirm('Delete this section? Its tasks stay and become ungrouped.') &&
        await api('/api/platform/sections', 'DELETE', { id })) refresh();
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <button
          className="font-display text-2xl font-extrabold text-left hover:text-brand-accent-text"
          title="Rename client"
          onClick={async () => {
            const next = window.prompt('Rename client', props.client.name);
            if (next && await api('/api/platform/clients', 'PATCH', { id: props.client.id, name: next })) refresh();
          }}
        >{props.client.name}</button>
        <button
          className="btn-ghost text-sm"
          onClick={async () => {
            if (confirm('Archive this client?') &&
                await api('/api/platform/clients', 'PATCH', { id: props.client.id, status: 'archived' })) {
              router.push('/app');
              router.refresh();
            }
          }}
        >Archive</button>
      </header>

      <nav className="flex gap-2 mb-6">
        {(['tasks', 'notes', 'files'] as Tab[]).map((x) => (
          <button key={x} onClick={() => setTab(x)}
            className={`px-3 py-1 rounded-[12px] text-sm ${tab === x ? 'bg-brand-nested' : 'text-brand-gray'}`}>
            {x[0].toUpperCase() + x.slice(1)}
          </button>
        ))}
      </nav>

      {tab === 'tasks' && (
        <div className="flex flex-col gap-8">
          {groups.map((g, gi) => (
            <TaskGroup
              key={g.id ?? 'none'} group={g} today={props.today}
              onToggle={toggleDone} onPatch={patchTask} onAdd={(title) => addTask(g.id, title)}
              // section controls (named sections only); gi-1 is index within `sorted`
              onRename={g.id ? () => renameSection(g.id!, g.name) : undefined}
              onMoveUp={g.id && gi - 1 > 0 ? () => moveSection(gi - 1, -1) : undefined}
              onMoveDown={g.id && gi - 1 < sorted.length - 1 ? () => moveSection(gi - 1, 1) : undefined}
              onDelete={g.id ? () => deleteSection(g.id!) : undefined}
            />
          ))}
          <AddSection clientId={props.client.id} onDone={refresh} count={props.sections.length} />
        </div>
      )}

      {tab === 'notes' && <NotesTab clientId={props.client.id} notes={props.notes} onDone={refresh} />}
      {tab === 'files' && <FilesTab clientId={props.client.id} files={props.files} onDone={refresh} />}
    </div>
  );
}

function TaskGroup({
  group, today, onToggle, onPatch, onAdd, onRename, onMoveUp, onMoveDown, onDelete,
}: {
  group: { id: string | null; name: string; tasks: Task[] };
  today: string;
  onToggle: (t: Task) => void;
  onPatch: (id: string, patch: Record<string, unknown>) => void;
  onAdd: (title: string) => void;
  onRename?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
}) {
  const [showDone, setShowDone] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const open = group.tasks.filter((t) => !t.completed_at).sort(compareTasks);
  const done = group.tasks.filter((t) => t.completed_at);

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm uppercase tracking-wider text-brand-gray-dark">{group.name}</h2>
        {onMoveUp && <button onClick={onMoveUp} className="text-xs text-brand-gray-dark" title="Move up">↑</button>}
        {onMoveDown && <button onClick={onMoveDown} className="text-xs text-brand-gray-dark" title="Move down">↓</button>}
        {onRename && <button onClick={onRename} className="text-xs text-brand-gray-dark" title="Rename">edit</button>}
        {onDelete && <button onClick={onDelete} className="text-xs text-brand-gray-dark" title="Delete section">del</button>}
      </div>
      <div className="flex flex-col">
        {open.map((t) => (
          <div key={t.id} className="flex items-center gap-3 py-2 border-b border-brand-border-subtle">
            <input type="checkbox" checked={false} onChange={() => onToggle(t)} className="accent-brand-accent" />
            <span className="flex-1 min-w-0 truncate">{t.title}</span>
            <select value={t.priority} onChange={(e) => onPatch(t.id, { priority: Number(e.target.value) })}
              className="bg-brand-input border border-brand-border rounded-[8px] text-xs px-1 py-0.5">
              {[1, 2, 3, 4].map((p) => <option key={p} value={p}>P{p}</option>)}
            </select>
            <input type="date" value={t.due_date ?? ''} onChange={(e) => onPatch(t.id, { due_date: e.target.value || null })}
              className={`bg-brand-input border border-brand-border rounded-[8px] text-xs px-1 py-0.5 ${
                t.due_date && t.due_date < today ? 'text-red-400' : ''}`} />
            <label className="text-xs text-brand-gray-dark flex items-center gap-1">
              <input type="checkbox" checked={t.in_progress} onChange={(e) => onPatch(t.id, { in_progress: e.target.checked })} />
              wip
            </label>
            <label className="text-xs text-brand-gray-dark flex items-center gap-1">
              <input type="checkbox" checked={t.client_visible} onChange={(e) => onPatch(t.id, { client_visible: e.target.checked })} />
              client
            </label>
          </div>
        ))}
        <div className="flex gap-2 py-2">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { onAdd(newTitle); setNewTitle(''); } }}
            placeholder="+ Add task (Enter)"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-brand-gray-dark" />
        </div>
        {done.length > 0 && (
          <button onClick={() => setShowDone((s) => !s)} className="text-xs text-brand-gray-dark text-left py-1">
            {showDone ? 'Hide' : 'Show'} completed ({done.length})
          </button>
        )}
        {showDone && done.map((t) => (
          <div key={t.id} className="flex items-center gap-3 py-2 opacity-50 border-b border-brand-border-subtle">
            <input type="checkbox" checked onChange={() => onToggle(t)} className="accent-brand-accent" />
            <span className="flex-1 min-w-0 truncate line-through">{t.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AddSection({ clientId, onDone, count }: { clientId: string; onDone: () => void; count: number }) {
  async function add() {
    const name = window.prompt('New section name');
    if (!name) return;
    if (await api('/api/platform/sections', 'POST', { client_id: clientId, name, sort_order: count })) onDone();
  }
  return (
    <button onClick={add} className="text-sm text-brand-accent-text text-left">+ Add section</button>
  );
}

function NotesTab({ clientId, notes, onDone }: { clientId: string; notes: Note[]; onDone: () => void }) {
  const [body, setBody] = useState('');
  async function add() {
    if (!body.trim()) return;
    if (await api('/api/platform/notes', 'POST', { client_id: clientId, body })) { setBody(''); onDone(); }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="New note"
          className="bg-brand-input border border-brand-border rounded-[12px] px-3 py-2 text-sm min-h-20" />
        <button onClick={add} className="cta-primary self-start text-sm">Add note</button>
      </div>
      {notes.map((n) => (
        <div key={n.id} className="bg-brand-card border border-brand-border-subtle rounded-[12px] p-3">
          <p className="text-sm whitespace-pre-wrap">{n.body}</p>
          <div className="flex gap-3 mt-2 text-xs text-brand-gray-dark">
            <span>{n.created_at.slice(0, 10)}</span>
            <button onClick={async () => {
              const next = window.prompt('Edit note', n.body);
              if (next != null && await api('/api/platform/notes', 'PATCH', { id: n.id, body: next })) onDone();
            }}>Edit</button>
            <button onClick={async () => {
              if (confirm('Delete note?') && await api('/api/platform/notes', 'DELETE', { id: n.id })) onDone();
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FilesTab({ clientId, files, onDone }: { clientId: string; files: FileLink[]; onDone: () => void }) {
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  async function add() {
    if (!label.trim() || !url.trim()) return;
    if (await api('/api/platform/files', 'POST', { client_id: clientId, label, url })) {
      setLabel(''); setUrl(''); onDone();
    } else {
      alert('Could not add link. URL must start with http:// or https://');
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label"
          className="bg-brand-input border border-brand-border rounded-[12px] px-3 py-2 text-sm" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…"
          className="flex-1 bg-brand-input border border-brand-border rounded-[12px] px-3 py-2 text-sm" />
        <button onClick={add} className="cta-primary text-sm">Add link</button>
      </div>
      {files.map((f) => (
        <div key={f.id} className="flex items-center gap-3 py-2 border-b border-brand-border-subtle">
          <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-brand-accent-text text-sm flex-1 truncate">{f.label}</a>
          <button onClick={async () => {
            if (confirm('Remove link?') && await api('/api/platform/files', 'DELETE', { id: f.id })) onDone();
          }} className="text-xs text-brand-gray-dark">Remove</button>
        </div>
      ))}
    </div>
  );
}
