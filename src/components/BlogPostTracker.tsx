'use client';

import { useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-js/react';

interface Props {
  title: string;
  category: string;
  slug: string;
  author: string;
}

export default function BlogPostTracker({ title, category, slug, author }: Props) {
  const posthog = usePostHog();
  const captured = useRef(false);

  useEffect(() => {
    if (!posthog || captured.current) return;
    posthog.capture('blog_post_viewed', { title, category, slug, author });
    captured.current = true;
  }, [posthog, title, category, slug, author]);

  return null;
}
