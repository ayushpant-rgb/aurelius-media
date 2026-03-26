'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

interface Props {
  title: string;
  category: string;
  slug: string;
  author: string;
}

export default function BlogPostTracker({ title, category, slug, author }: Props) {
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture('blog_post_viewed', { title, category, slug, author });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
