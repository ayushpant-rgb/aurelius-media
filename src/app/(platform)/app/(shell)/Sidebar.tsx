'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Client, ClientWithOpenCount } from '@/lib/platform/types';

export default function Sidebar({
  clients, archived,
}: { clients: ClientWithOpenCount[]; archived: Client[] }) {
  const pathname = usePathname();
  const [showArchived, setShowArchived] = useState(false);
  const linkCls = (active: boolean) =>
    `block px-3 py-2 rounded-[12px] text-sm ${active ? 'bg-brand-nested text-white' : 'text-brand-gray hover:text-white hover:bg-brand-card'}`;

  return (
    <aside className="w-64 shrink-0 border-r border-brand-border-subtle bg-brand-card px-3 py-6 flex flex-col gap-6">
      <div className="px-3 font-display font-extrabold">Aurelius</div>
      <nav className="flex flex-col gap-1">
        <Link href="/app" className={linkCls(pathname === '/app')}>Today</Link>
        <Link href="/app/upcoming" className={linkCls(pathname === '/app/upcoming')}>Upcoming</Link>
      </nav>
      <div className="flex flex-col gap-1">
        <div className="px-3 text-xs uppercase tracking-wider text-brand-gray-dark mb-1">Clients</div>
        {clients.map((c) => (
          <Link key={c.id} href={`/app/clients/${c.id}`} className={linkCls(pathname === `/app/clients/${c.id}`)}>
            <span className="flex justify-between">
              <span className="truncate">{c.name}</span>
              {c.open_count > 0 && <span className="text-brand-gray-dark">{c.open_count}</span>}
            </span>
          </Link>
        ))}
        <NewClientButton />
        {archived.length > 0 && (
          <button onClick={() => setShowArchived((s) => !s)} className="px-3 py-2 text-xs text-brand-gray-dark text-left">
            {showArchived ? 'Hide' : 'Show'} archived ({archived.length})
          </button>
        )}
        {showArchived && archived.map((c) => (
          <Link key={c.id} href={`/app/clients/${c.id}`} className={linkCls(false) + ' opacity-60'}>{c.name}</Link>
        ))}
      </div>
    </aside>
  );
}

function NewClientButton() {
  async function add() {
    const name = window.prompt('New client name');
    if (!name) return;
    const res = await fetch('/api/platform/clients', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) window.location.reload();
  }
  return (
    <button onClick={add} className="px-3 py-2 rounded-[12px] text-sm text-brand-accent-text hover:bg-brand-card text-left">
      + Add client
    </button>
  );
}
