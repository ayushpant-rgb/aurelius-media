'use client';

import { useState } from 'react';

/**
 * Anti-bot form guard: pairs a hidden honeypot field with a mount timestamp.
 * Spread `spamFields` into the JSON payload sent to /api/leads or
 * /api/newsletter; the server scores it in src/lib/spam.ts.
 */
export function useSpamGuard() {
  const [formTs] = useState(() => Date.now());
  const [website, setWebsite] = useState('');
  return {
    website,
    setWebsite,
    spamFields: { website, form_ts: formTs } as { website: string; form_ts: number },
  };
}

interface HoneypotFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * Off-screen "website" input that real users never see or tab into, but
 * form-filling bots complete. Uncontrolled when no value/onChange is given
 * (for FormData-based forms — read it via fd.get('website')).
 */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div
      style={{ position: 'absolute', left: '-9999px', top: 0, width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <label>
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          {...(onChange
            ? { value: value ?? '', onChange: (e) => onChange(e.target.value) }
            : { defaultValue: '' })}
        />
      </label>
    </div>
  );
}
