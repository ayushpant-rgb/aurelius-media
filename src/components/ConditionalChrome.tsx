'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function ConditionalChrome({
  header, footer, children,
}: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/app')) return <>{children}</>;
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
