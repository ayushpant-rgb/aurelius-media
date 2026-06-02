'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// Initialize at module level so posthog is ready before any child useEffect runs.
// useEffect-based init fires after children's effects, causing pre-init captures to be lost.
if (typeof window !== 'undefined') {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com';
  const isDev = process.env.NODE_ENV === 'development';
  const devEnabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === 'true';

  if (key && (!isDev || devEnabled)) {
    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: 'identified_only',
    });
  }
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
