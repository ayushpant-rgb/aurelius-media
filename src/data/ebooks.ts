export interface Ebook {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pdfPath: string;
  coverPlaceholder: string; // emoji or icon identifier for placeholder
  accentColor: string;
  chapters: { title: string; description: string }[];
  formFields: {
    /** The extra field shown alongside Name, Email, Phone */
    label: string;
    name: string;
    placeholder: string;
  };
  metaTitle: string;
  metaDescription: string;
}

export const ebooks: Ebook[] = [
  {
    slug: 'startup-growth-playbook',
    title: 'The Startup Growth Playbook',
    subtitle: 'From Zero to Scale — A Performance Marketing Blueprint for VC-Backed Startups',
    description:
      'A comprehensive guide for VC-backed startups looking to build a scalable performance marketing engine. Covers paid media strategy, creative frameworks, attribution models, and the exact playbooks Aurelius Media uses to help startups go from early traction to exponential growth.',
    pdfPath: '/ebooks/startup-growth-playbook.pdf',
    coverPlaceholder: '🚀',
    accentColor: '#FF6B2B',
    chapters: [
      {
        title: 'The Growth Marketing Mindset',
        description: 'Why traditional marketing fails startups — and what to do instead.',
      },
      {
        title: 'Channel Strategy & Budget Allocation',
        description: 'How to pick the right paid channels for your stage and vertical.',
      },
      {
        title: 'Creative That Converts',
        description: 'AI-powered ad creative frameworks that drive performance at scale.',
      },
      {
        title: 'Attribution & Measurement',
        description: 'Setting up a measurement stack that actually tells you what\'s working.',
      },
      {
        title: 'Scaling Without Burning Cash',
        description: 'The exact scaling playbook for going from $10K to $500K/mo in ad spend.',
      },
    ],
    formFields: {
      label: 'Company / Organization',
      name: 'company',
      placeholder: 'Your company name',
    },
    metaTitle: 'The Startup Growth Playbook — Free Ebook | Aurelius Media',
    metaDescription:
      'Download the free Startup Growth Playbook. A performance marketing blueprint for VC-backed startups covering paid media, creative strategy, attribution, and scaling.',
  },
  {
    slug: 'meta-andromeda-playbook',
    title: 'The Meta Andromeda Playbook',
    subtitle: 'Mastering Meta\'s Next-Gen AI Ad Engine for Maximum ROAS',
    description:
      'Deep dive into Meta\'s Andromeda ranking system and how to leverage it for dramatically better ad performance. Learn the creative strategies, audience signals, and campaign structures that align with Meta\'s AI to unlock higher ROAS and lower CPAs.',
    pdfPath: '/ebooks/meta-andromeda-playbook.pdf',
    coverPlaceholder: '🌌',
    accentColor: '#4F46E5',
    chapters: [
      {
        title: 'Understanding Andromeda',
        description: 'How Meta\'s AI ranking engine works and why it changes everything.',
      },
      {
        title: 'Creative-First Strategy',
        description: 'Why creative diversity is the new targeting — and how to execute it.',
      },
      {
        title: 'Campaign Architecture',
        description: 'The optimal account structure for Andromeda-era campaigns.',
      },
      {
        title: 'Signal Optimization',
        description: 'Feeding Meta\'s AI the right data for better auction outcomes.',
      },
      {
        title: 'Scaling & Advanced Tactics',
        description: 'How to scale spend while maintaining ROAS in the Andromeda era.',
      },
    ],
    formFields: {
      label: 'Company / Organization',
      name: 'company',
      placeholder: 'Your company name',
    },
    metaTitle: 'The Meta Andromeda Playbook — Free Ebook | Aurelius Media',
    metaDescription:
      'Download the free Meta Andromeda Playbook. Master Meta\'s AI ad engine for higher ROAS and lower CPAs with creative strategies, campaign architecture, and scaling tactics.',
  },
  {
    slug: 'authors-book-marketing-playbook',
    title: 'The Author\'s Book Marketing Playbook',
    subtitle: 'The Complete Digital Marketing Guide for Authors & Publishers',
    description:
      'Everything authors and publishers need to know about marketing books in the digital age. From Amazon Ads to social media strategy, email list building, launch campaigns, and long-term discoverability — this playbook covers it all.',
    pdfPath: '/ebooks/Authors_Book_Marketing_Playbook_Aurelius.pdf',
    coverPlaceholder: '📚',
    accentColor: '#C8A951',
    chapters: [
      {
        title: 'Building Your Author Platform',
        description: 'Creating a digital presence that sells books on autopilot.',
      },
      {
        title: 'Amazon Ads Mastery',
        description: 'The step-by-step system for profitable Amazon book advertising.',
      },
      {
        title: 'Social Media for Authors',
        description: 'Platform-specific strategies that build readership, not just followers.',
      },
      {
        title: 'Launch Campaign Blueprint',
        description: 'A 90-day pre-launch to post-launch marketing timeline.',
      },
      {
        title: 'Long-Term Discoverability',
        description: 'SEO, email marketing, and evergreen strategies for sustained sales.',
      },
    ],
    formFields: {
      label: 'Book Title',
      name: 'company',
      placeholder: 'Your book title (published or upcoming)',
    },
    metaTitle: 'The Author\'s Book Marketing Playbook — Free Ebook | Aurelius Media',
    metaDescription:
      'Download the free Author\'s Book Marketing Playbook. Complete digital marketing guide covering Amazon Ads, social media strategy, launch campaigns, and discoverability for authors.',
  },
];

export function getEbookBySlug(slug: string): Ebook | undefined {
  return ebooks.find((e) => e.slug === slug);
}
