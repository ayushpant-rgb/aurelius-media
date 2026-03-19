# Phase 2 Implementation Plan — Tools, Resources, Chatbot, Content Expansion

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add interactive tools, resource hub, lead qualifier chatbot, and content expansion to the Aurelius Media site — following the HubSpot playbook of genuinely useful tools that drive organic growth.

**Architecture:** Content-first build. Create all data layers and content first, then build pages/components that render them, then polish with cross-linking and integrations. All new pages follow the existing pattern: server component (data + SEO) → client component (rendering + interactivity). Static data in `src/data/*.ts`, no CMS.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Supabase (leads), Resend (emails), Firecrawl (competitor analyzer only)

**Spec:** `docs/superpowers/specs/2026-03-20-phase2-design.md`

---

## File Map

### New Files

| File | Responsibility |
|------|---------------|
| `src/types/resource.ts` | `ResourceData`, `ResourceType`, `ResourceAudience` interfaces |
| `src/types/tool.ts` | `ToolData` interface |
| `src/types/chatbot.ts` | `ChatStep`, `ChatOption`, `ChatRecommendation` interfaces |
| `src/data/resources.ts` | All 10 resource entries (8 e-books + 2 templates) |
| `src/data/tools.ts` | All 5 tool entries + helper functions |
| `src/data/chatbotFlow.ts` | Decision tree: business type × challenge × budget → service + resource |
| `src/data/bookLaunchData.ts` | 12-week checklist data for Book Launch Planner tool |
| `src/data/budgetAllocatorData.ts` | Channel allocation rules for Budget Allocator tool |
| `src/data/andromedaMatrixData.ts` | Creative testing framework data for Andromeda Matrix tool |
| `src/data/aiReadinessData.ts` | Questions + scoring weights for AI Readiness Assessment |
| `src/lib/toolState.ts` | URL hash encode/decode utility for tool state sharing |
| `src/lib/analytics.ts` | Google Analytics event tracking utility |
| `src/types/global.d.ts` | Window.gtag type declaration for analytics |
| `src/components/ui/EmailGate.tsx` | Reusable email gate form (name + email → Supabase leads) |
| `src/components/ui/ChatWidget.tsx` | Lead qualifier chatbot widget |
| `src/components/tools/BookLaunchPlanner.tsx` | Book Launch Planner interactive UI |
| `src/components/tools/BudgetAllocator.tsx` | Budget Allocator interactive UI |
| `src/components/tools/AndromedaMatrix.tsx` | Andromeda Creative Testing Matrix UI |
| `src/components/tools/CompetitorAnalyzer.tsx` | Competitor Gap Analyzer UI |
| `src/components/tools/AiReadiness.tsx` | AI Readiness Assessment UI |
| `src/app/resources/page.tsx` | Resource hub server component |
| `src/app/resources/ResourceHubClient.tsx` | Resource hub client component (filters + grid) |
| `src/app/resources/[slug]/page.tsx` | Resource landing page server component |
| `src/app/resources/[slug]/ResourcePageClient.tsx` | Resource landing page client component |
| `src/app/tools/[slug]/page.tsx` | Tool page server component |
| `src/app/tools/[slug]/ToolPageClient.tsx` | Tool page client component (loads tool-specific component) |
| `src/app/api/tools/competitor-analyzer/route.ts` | Firecrawl API route |
| `content/blog/andromeda-update-2026.mdx` | Blog post: Meta Andromeda update |
| `content/blog/book-launch-timeline-2026.mdx` | Blog post: Book launch timeline |
| `content/blog/first-10k-marketing-budget.mdx` | Blog post: Startup budget allocation |
| `content/blog/ai-readiness-marketing-teams.mdx` | Blog post: AI readiness |
| `content/blog/meta-ads-stopped-working.mdx` | Blog post: D2C Meta Ads recovery |
| `content/blog/real-estate-paid-vs-organic.mdx` | Blog post: Real estate lead gen |
| `content/blog/enrollment-marketing-2026.mdx` | Blog post: Education enrollment |
| `content/blog/competitor-analysis-strategy.mdx` | Blog post: Competitor analysis |

### Modified Files

| File | Change |
|------|--------|
| `src/types/lead.ts` | Extend `LeadSource` union with new source values |
| `src/app/api/leads/route.ts` | Extend `VALID_SOURCES` array, add flexible source validation |
| `src/components/layout/Header.tsx` | Add "Resources" nav link |
| `src/components/layout/Footer.tsx` | Add "Free Tools" and "Resources" links to footer |
| `src/app/layout.tsx` | Add `ChatWidget` to root layout |
| `src/app/globals.css` | Add tool-specific and chatbot CSS classes |
| Existing `content/blog/*.mdx` files (7) | Add cross-linking callout blocks to relevant resources/tools |

---

## Chunk 1: Data Layer & Shared Components

### Task 1: Extend Lead Source Types

**Files:**
- Modify: `src/types/lead.ts`
- Modify: `src/app/api/leads/route.ts`

- [ ] **Step 1: Update LeadSource type in lead.ts**

Open `src/types/lead.ts`. The current `LeadSource` type is:
```typescript
export type LeadSource = 'service_hero' | 'service_cta' | 'contact' | 'popup';
```

Replace with:
```typescript
export type LeadSource =
  | 'service_hero'
  | 'service_cta'
  | 'contact'
  | 'popup'
  | 'chatbot'
  | `tool-${string}`
  | `resource-${string}`;
```

This uses template literal types so any `tool-*` or `resource-*` string is valid.

- [ ] **Step 2: Update VALID_SOURCES validation in leads route**

Open `src/app/api/leads/route.ts`. The current validation is:
```typescript
const VALID_SOURCES = ['service_hero', 'service_cta', 'contact', 'popup'] as const;
```

Replace the hard-coded array check with a pattern-based validator:
```typescript
const STATIC_SOURCES = ['service_hero', 'service_cta', 'contact', 'popup', 'chatbot'] as const;

function isValidSource(source: string): boolean {
  if ((STATIC_SOURCES as readonly string[]).includes(source)) return true;
  if (source.startsWith('tool-') && source.length > 5) return true;
  if (source.startsWith('resource-') && source.length > 9) return true;
  return false;
}
```

Then update the validation block that checks `VALID_SOURCES.includes(source)` to use `isValidSource(source)` instead.

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/lead.ts src/app/api/leads/route.ts
git commit -m "feat: extend LeadSource to accept tool, resource, and chatbot sources"
```

---

### Task 2: Create Resource Data Layer

**Files:**
- Create: `src/types/resource.ts`
- Create: `src/data/resources.ts`

- [ ] **Step 1: Create ResourceData types**

Create `src/types/resource.ts`:
```typescript
export type ResourceType = 'tool' | 'ebook' | 'template';

export type ResourceAudience =
  | 'authors'
  | 'startups'
  | 'real-estate'
  | 'education'
  | 'd2c'
  | 'all';

export interface ResourceData {
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  audience: ResourceAudience;
  gated: boolean;
  thumbnailImage?: string;
  downloadUrl?: string;
  toolRoute?: string;
  linkedServiceSlug?: string;
  linkedToolSlug?: string;
  whatsInside?: string[];
  metaTitle: string;
  metaDescription: string;
}
```

- [ ] **Step 2: Create resources.ts with all 10 entries**

Create `src/data/resources.ts`. Export `resources: ResourceData[]` with all 10 entries (8 e-books + 2 templates). Each entry must include:
- `slug` matching the route (e.g., `'meta-ads-andromeda-playbook'`)
- `title`, `description` (2-sentence summary)
- `type`: `'ebook'` or `'template'`
- `audience`: one of the `ResourceAudience` values
- `gated`: `true` for all e-books + Andromeda Creative Brief, `false` for Book Launch Checklist
- `linkedServiceSlug`: slug of the related service page
- `linkedToolSlug`: slug of the related tool (if any)
- `whatsInside`: 5-6 bullet points per resource
- `metaTitle`, `metaDescription` for SEO

Also export helper functions:
```typescript
export function getResourceBySlug(slug: string): ResourceData | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByType(type: ResourceType): ResourceData[] {
  return resources.filter((r) => r.type === type);
}

export function getResourcesByAudience(audience: ResourceAudience): ResourceData[] {
  if (audience === 'all') return resources;
  return resources.filter((r) => r.audience === audience || r.audience === 'all');
}
```

The 10 entries (fill in full SEO-optimized content for each):
1. `meta-ads-andromeda-playbook` — ebook, d2c, gated, links to `/services/meta-ads` + `andromeda-creative-matrix`
2. `google-ads-pmax-guide-2026` — ebook, startups, gated, links to `/services/google-ads` + `budget-allocator`
3. `book-marketing-amazon-ads-blueprint` — ebook, authors, gated, links to `/services/book-marketing` + `book-launch-planner`
4. `real-estate-paid-media-system` — ebook, real-estate, gated, links to `/services/real-estate-marketing`
5. `education-enrollment-marketing-handbook` — ebook, education, gated, links to `/services/education-marketing`
6. `ai-automation-starter-guide` — ebook, all, gated, links to `/services/ai-automation` + `ai-readiness`
7. `startup-growth-playbook` — ebook, startups, gated, links to `/services/marketing-strategy-audit` + `budget-allocator`
8. `d2c-meta-ads-recovery-guide` — ebook, d2c, gated, links to `/services/meta-ads` + `andromeda-creative-matrix`
9. `book-launch-checklist` — template, authors, NOT gated, links to `/services/book-marketing` + `book-launch-planner`
10. `andromeda-creative-brief` — template, d2c, gated, links to `/services/meta-ads` + `andromeda-creative-matrix`

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/types/resource.ts src/data/resources.ts
git commit -m "feat: add resource data layer with 10 entries (8 ebooks, 2 templates)"
```

---

### Task 3: Create Tool Data Layer

**Files:**
- Create: `src/types/tool.ts`
- Create: `src/data/tools.ts`

- [ ] **Step 1: Create ToolData types**

Create `src/types/tool.ts`:
```typescript
export interface ToolData {
  slug: string;
  title: string;
  description: string;
  audience: string;
  painPoint: string;
  linkedServiceSlug: string;
  linkedResourceSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}
```

- [ ] **Step 2: Create tools.ts with 5 entries**

Create `src/data/tools.ts`. Export `tools: ToolData[]` with 5 entries:
1. `book-launch-planner` — "Book Launch Planner & Checklist", authors, links to `book-marketing`
2. `budget-allocator` — "Startup Channel Budget Allocator", startups, links to `marketing-strategy-audit`
3. `andromeda-creative-matrix` — "Andromeda Creative Testing Matrix", d2c, links to `meta-ads`
4. `competitor-analyzer` — "Competitor Gap Analyzer", all, links to `marketing-strategy-audit`
5. `ai-readiness` — "AI Readiness Assessment", all, links to `ai-automation`

Also export:
```typescript
export function getToolBySlug(slug: string): ToolData | undefined {
  return tools.find((t) => t.slug === slug);
}
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/tool.ts src/data/tools.ts
git commit -m "feat: add tool data layer with 5 entries"
```

---

### Task 4: Create Tool-Specific Data Files

**Files:**
- Create: `src/data/bookLaunchData.ts`
- Create: `src/data/budgetAllocatorData.ts`
- Create: `src/data/andromedaMatrixData.ts`
- Create: `src/data/aiReadinessData.ts`

- [ ] **Step 1: Create bookLaunchData.ts**

Export a `bookLaunchTasks` array. Each entry:
```typescript
export interface LaunchTask {
  week: number; // -12 to +2 (negative = weeks before launch, positive = post-launch)
  category: 'amazon' | 'social' | 'email' | 'ads' | 'pr' | 'reviews' | 'content';
  task: string;
  description: string;
  priority: 'critical' | 'important' | 'nice-to-have';
  requiresAudience: boolean; // true = only show if user has existing audience
  budgetTier: 'free' | 'low' | 'medium' | 'high'; // minimum budget to recommend this
}
```

Populate with 60-80 tasks covering the full 12-week timeline. Categories: Amazon KDP setup (cover, description, keywords, categories, pricing), social media (platform setup, content calendar, author branding), email list (lead magnet, sequences, launch emails), paid ads (Meta, Amazon, BookBub), PR (ARCs, blog tours, podcast pitches), reviews (ARC distribution, Goodreads, NetGalley), content (excerpts, behind-the-scenes, testimonials). Each task has a clear, actionable description.

- [ ] **Step 2: Create budgetAllocatorData.ts**

Export allocation rules:
```typescript
export interface ChannelAllocation {
  channel: string;
  percentage: number;
  estimatedCPA: { min: number; max: number };
  reasoning: string;
}

export interface AllocationRule {
  industry: string;
  goal: string;
  stage: string;
  channels: ChannelAllocation[];
}
```

Populate with allocation rules for each combination of:
- Industry: SaaS, eCommerce, marketplace, fintech
- Goal: lead-gen, sales, brand-awareness
- Stage: pre-revenue, post-PMF, scaling

Each rule specifies channel percentages (Google, Meta, LinkedIn, TikTok, SEO, Content) with estimated CPAs and reasoning text. Budget amounts scale the CPA estimates. ~36 rule combinations total.

- [ ] **Step 3: Create andromedaMatrixData.ts**

Export creative testing framework data:
```typescript
export interface CreativeTestPlan {
  conceptGroups: number;
  formatsPerGroup: { format: string; priority: 'high' | 'medium' | 'low' }[];
  weeklyTestingCadence: string;
  diversificationAngles: string[];
  recommendations: string[];
}

export interface MatrixRule {
  vertical: string;
  aovRange: string;
  weeklyCreativeCapacity: string;
  plan: CreativeTestPlan;
}
```

Populate rules for verticals (eCommerce, SaaS, services, education, real-estate), AOV ranges (under-$50, $50-200, $200+), and creative capacity (1-3/week, 4-7/week, 8+/week). Each combination outputs a specific testing plan.

- [ ] **Step 4: Create aiReadinessData.ts**

Export quiz questions and scoring:
```typescript
export interface ReadinessQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; score: number }[];
  category: 'stack' | 'team' | 'process' | 'data' | 'budget';
}

export interface ReadinessTier {
  id: 'not-ready' | 'getting-started' | 'ready-to-scale';
  title: string;
  scoreRange: { min: number; max: number };
  description: string;
  recommendations: string[];
  suggestedTools: string[];
}
```

Populate with 8-10 questions across 5 categories, 3 result tiers with specific AI tool recommendations and next steps per tier.

- [ ] **Step 5: Commit**

```bash
git add src/data/bookLaunchData.ts src/data/budgetAllocatorData.ts src/data/andromedaMatrixData.ts src/data/aiReadinessData.ts
git commit -m "feat: add tool-specific data files (book launch, budget allocator, andromeda matrix, AI readiness)"
```

---

### Task 5: Create Chatbot Decision Tree Data

**Files:**
- Create: `src/types/chatbot.ts`
- Create: `src/data/chatbotFlow.ts`

- [ ] **Step 1: Create chatbot types**

Create `src/types/chatbot.ts`:
```typescript
export interface ChatOption {
  label: string;
  value: string;
}

export interface ChatStep {
  id: string;
  message: string;
  options: ChatOption[];
}

export interface ChatRecommendation {
  serviceSlug: string;
  serviceName: string;
  reason: string;
  resourceSlug?: string;
  resourceName?: string;
  toolSlug?: string;
  toolName?: string;
}

export type RecommendationKey = `${string}|${string}|${string}`;
```

- [ ] **Step 2: Create chatbotFlow.ts**

Create `src/data/chatbotFlow.ts`. Export:

1. `chatSteps` object with the 4 questions:
   - `welcome`: Initial greeting with "Yes, let's go" / "Just browsing"
   - `business_type`: 6 options (Author, Startup, Real Estate, Education, D2C, Agency/Other)
   - `challenge`: Keyed by business type → 4 challenge options each (per spec section 8.3)
   - `budget`: 4 budget ranges
   - `timeline`: 3 timeline options

2. `recommendations` map: `Map<RecommendationKey, ChatRecommendation>` keyed by `"businessType|challenge|budget"` → recommendation object with service slug, reason text, and relevant resource/tool slugs.

Populate all recommendation mappings. Example:
```typescript
// "author|launching-a-book|1000-5000" → book-marketing + book-launch-planner
// "d2c|roas-dropping|5000-20000" → meta-ads + andromeda-creative-matrix
// "startup|not-sure-where-to-spend|1000-5000" → marketing-strategy-audit + budget-allocator
```

Cover all 6 business types × 4 challenges × 4 budgets = 96 combinations. Many will share the same recommendation — group common mappings.

- [ ] **Step 3: Commit**

```bash
git add src/types/chatbot.ts src/data/chatbotFlow.ts
git commit -m "feat: add chatbot decision tree data with 96 recommendation mappings"
```

---

### Task 6: Create EmailGate Reusable Component

**Files:**
- Create: `src/components/ui/EmailGate.tsx`

- [ ] **Step 1: Create EmailGate component**

Create `src/components/ui/EmailGate.tsx` — a `'use client'` component.

**Props:**
```typescript
interface EmailGateProps {
  source: string;          // e.g., 'tool-budget-allocator' or 'resource-andromeda-playbook'
  serviceInterest?: string; // e.g., 'Meta Ads' — maps from linked service
  children: React.ReactNode; // The gated content (shown after submission)
  title?: string;          // e.g., "Get your full results"
  description?: string;    // e.g., "Enter your email to unlock the complete report"
  onUnlock?: () => void;   // Callback when email is submitted
}
```

**Behavior:**
- Renders `children` blurred/hidden behind an overlay with the email form
- Form fields: Name (required), Email (required, validated with regex)
- On submit: POST to `/api/leads` with `{ name, email, source, service_interest }`
- On success: sets `unlocked` state to `true`, calls `onUnlock`, stores `unlocked-${source}` in localStorage so returning users skip the gate
- On mount: check localStorage for existing unlock
- Loading state during submission
- Error state with retry

**Design:** Match existing form patterns — `bg-brand-card`, `rounded-[20px]`, `border-brand-border-subtle`, `.cta-primary` submit button. The blur overlay uses `backdrop-filter: blur(8px)` over the children.

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/EmailGate.tsx
git commit -m "feat: add reusable EmailGate component for gated content"
```

---

## Chunk 2: Resource Hub & Landing Pages

### Task 7: Create Resource Hub Page

**Files:**
- Create: `src/app/resources/page.tsx`
- Create: `src/app/resources/ResourceHubClient.tsx`

- [ ] **Step 1: Create server component**

Create `src/app/resources/page.tsx`:
- Export `metadata` with title "Free Tools & Resources | Aurelius Media", description, OG data
- Import `resources` from `@/data/resources` and `tools` from `@/data/tools`
- Render `<ResourceHubClient resources={resources} tools={tools} />`

Follow the exact pattern from `src/app/blog/page.tsx` — thin server component that passes data to client.

- [ ] **Step 2: Create ResourceHubClient component**

Create `src/app/resources/ResourceHubClient.tsx` — a `'use client'` component.

**Props:** `{ resources: ResourceData[], tools: ToolData[] }`

**State:**
- `activeType: ResourceType | 'all'` (default `'all'`)
- `activeAudience: ResourceAudience` (default `'all'`)

**Layout:** Follow `BlogListClient.tsx` pattern exactly:
- Header section: "Free Tools & Resources" with `.gradient-text`, subtitle, section-label eyebrow
- Two rows of filter pills (type + audience), same styling as blog category pills
- 3-column card grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`)
- Tool cards pinned to top with accent border (`border-brand-accent-dim`)
- Each card: thumbnail/icon area (200px height), type badge (`.tag` + color class), audience tag, title, description, CTA button
- CTA buttons: "Use Tool" (links to `/tools/[slug]`), "Download" (links to `/resources/[slug]`), "View" (links to `/resources/[slug]`)
- Cards use `rounded-[20px]`, `bg-brand-card`, `border border-brand-border-subtle`, orange hover glow + lift

**Max width:** `max-w-[1160px]` (matching blog hub).

- [ ] **Step 3: Verify the page renders at /resources**

Run: `npm run dev`, navigate to `http://localhost:3000/resources`
Expected: Page renders with header, filters, and card grid.

- [ ] **Step 4: Commit**

```bash
git add src/app/resources/page.tsx src/app/resources/ResourceHubClient.tsx
git commit -m "feat: add resource hub page with filterable grid"
```

---

### Task 8: Create Resource Landing Page Template

**Files:**
- Create: `src/app/resources/[slug]/page.tsx`
- Create: `src/app/resources/[slug]/ResourcePageClient.tsx`

- [ ] **Step 1: Create server component with generateStaticParams**

Create `src/app/resources/[slug]/page.tsx`:
- Follow `src/app/services/[slug]/page.tsx` pattern exactly
- `Props`: `{ params: Promise<{ slug: string }> }` (Next.js 15+ async params)
- `generateStaticParams()`: Map over `resources` array → `{ slug }` for each
- `generateMetadata()`: Await params, look up resource by slug, return title/description/OG
- Main component: Await params, `getResourceBySlug(slug)`, `notFound()` if missing
- Pass resource data + related tool/service info to `<ResourcePageClient />`
- Add BreadcrumbList JSON-LD schema

- [ ] **Step 2: Create ResourcePageClient component**

Create `src/app/resources/[slug]/ResourcePageClient.tsx` — a `'use client'` component.

**Props:** `{ resource: ResourceData, linkedTool?: ToolData, linkedServiceTitle?: string }`

**Layout:**
- Hero section: Resource title (h1), 2-sentence description, preview image (angled mockup or icon)
- "What's Inside" section: Render `resource.whatsInside` as a bulleted list with orange markers
- Social proof line: "Join X marketers who've downloaded this" — fetch count from Supabase by querying leads where `source = 'resource-${slug}'`. Use a client-side fetch to `/api/leads/count?source=resource-${slug}` (create a simple GET endpoint that returns `{ count: number }`). Start with a minimum display of 50 (i.e., show `Math.max(actualCount, 50)`). If the fetch fails, hide the counter gracefully.
- Email gate (for gated resources): Wrap the download button/link in `<EmailGate source={`resource-${resource.slug}`} serviceInterest={linkedServiceTitle}>`. For ungated resources (Book Launch Checklist), show content directly.
- After gate: Download button (for PDFs) or direct content display (for the checklist template)
- Related section: Link to relevant tool ("Try our free [Tool Name]") + link to service page
- CTA section: "Need help implementing this? Book a strategy call" linking to Cal.com

**Design:** Follow service page aesthetic — dark background, card sections, orange accents, `animate-fade-in-up` on scroll.

- [ ] **Step 3: Verify a resource landing page renders**

Run: `npm run dev`, navigate to `http://localhost:3000/resources/meta-ads-andromeda-playbook`
Expected: Landing page renders with hero, what's inside, email gate, and related links.

- [ ] **Step 4: Commit**

```bash
git add src/app/resources/[slug]/page.tsx src/app/resources/[slug]/ResourcePageClient.tsx
git commit -m "feat: add resource landing page template with email gate"
```

---

## Chunk 3: Interactive Tool Pages (Client-Side Tools)

### Task 9: Create Tool Page Template

**Files:**
- Create: `src/app/tools/[slug]/page.tsx`
- Create: `src/app/tools/[slug]/ToolPageClient.tsx`

- [ ] **Step 1: Create server component with generateStaticParams**

Create `src/app/tools/[slug]/page.tsx`:
- Same pattern as resource and service pages
- `generateStaticParams()`: Map over `tools` array
- `generateMetadata()`: Tool-specific title, description, OG
- Main component: Look up tool by slug, pass to `<ToolPageClient />`
- Add BreadcrumbList JSON-LD

- [ ] **Step 2: Create ToolPageClient component**

Create `src/app/tools/[slug]/ToolPageClient.tsx` — a `'use client'` component.

**Props:** `{ tool: ToolData }`

**Behavior:**
- Dynamically renders the correct tool component based on `tool.slug`:
```typescript
const toolComponents: Record<string, React.ComponentType> = {
  'book-launch-planner': BookLaunchPlanner,
  'budget-allocator': BudgetAllocator,
  'andromeda-creative-matrix': AndromedaMatrix,
  'competitor-analyzer': CompetitorAnalyzer,
  'ai-readiness': AiReadiness,
};
const ToolComponent = toolComponents[tool.slug];
```
- Wraps each tool in a consistent layout: breadcrumbs, tool title (h1), pain point subtitle, tool component, related resources section, CTA block

**URL hash state:** Add a shared utility for encoding/decoding state:
```typescript
// src/lib/toolState.ts
export function encodeToolState(state: Record<string, unknown>): string {
  const encoded = btoa(JSON.stringify(state));
  if (encoded.length > 2000) {
    // Fall back to localStorage with a short ID
    const id = crypto.randomUUID().slice(0, 8);
    localStorage.setItem(`tool-state-${id}`, JSON.stringify(state));
    return `ls:${id}`;
  }
  return encoded;
}

export function decodeToolState(hash: string): Record<string, unknown> | null {
  try {
    if (hash.startsWith('ls:')) {
      const id = hash.slice(3);
      const stored = localStorage.getItem(`tool-state-${id}`);
      return stored ? JSON.parse(stored) : null;
    }
    return JSON.parse(atob(hash));
  } catch {
    return null;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/tools/[slug]/page.tsx src/app/tools/[slug]/ToolPageClient.tsx src/lib/toolState.ts
git commit -m "feat: add tool page template with dynamic component loading"
```

---

### Task 10: Build Book Launch Planner Tool

**Files:**
- Create: `src/components/tools/BookLaunchPlanner.tsx`

- [ ] **Step 1: Build the input form**

Create `src/components/tools/BookLaunchPlanner.tsx` — a `'use client'` component.

**Input state:**
- `launchDate: string` (date picker)
- `genre: string` (select: Fiction, Non-Fiction, Self-Help, Business, Children's, Academic, Other)
- `budgetRange: string` (select: Free/organic only, Under $500, $500-$2,000, $2,000-$5,000, $5,000+)
- `hasAudience: boolean` (toggle: "Do you have an existing email list or social following?")

**Input UI:** 4 fields in a 2×2 grid on desktop, stacked on mobile. Each field: label + input/select. Use `bg-brand-input`, `rounded-[12px]`, `border-brand-border-subtle`. Submit button: `.cta-primary` "Generate My Launch Plan".

- [ ] **Step 2: Build the result view**

After submission, filter `bookLaunchTasks` based on inputs:
- Filter by `budgetTier` (only show tasks matching or below selected budget)
- Filter by `requiresAudience` (hide audience-dependent tasks if no audience)
- Calculate week numbers relative to the selected launch date
- Group tasks by week, sort chronologically

**Result UI:**
- Vertical timeline layout: each week is a section with date range header
- Tasks shown as checklist items with category color badges
- Checkboxes persist to localStorage (`book-launch-${launchDate}`)
- Progress bar at top showing % tasks completed
- Wrap the full timeline in `<EmailGate>` — show first 3 weeks free, gate the rest

**URL state:** Encode `{launchDate, genre, budgetRange, hasAudience}` in hash on generate.

- [ ] **Step 3: Test the full flow**

Run: `npm run dev`, navigate to `/tools/book-launch-planner`
Verify: Input form renders, generates timeline on submit, email gate works, checkboxes persist.

- [ ] **Step 4: Commit**

```bash
git add src/components/tools/BookLaunchPlanner.tsx
git commit -m "feat: add Book Launch Planner tool with timeline and checklist"
```

---

### Task 11: Build Budget Allocator Tool

**Files:**
- Create: `src/components/tools/BudgetAllocator.tsx`

- [ ] **Step 1: Build the input form**

Create `src/components/tools/BudgetAllocator.tsx` — a `'use client'` component.

**Input state:**
- `monthlyBudget: number` (input with dollar formatting)
- `industry: string` (select: SaaS, eCommerce, Marketplace, Fintech)
- `goal: string` (select: Lead Generation, Direct Sales, Brand Awareness)
- `stage: string` (select: Pre-revenue, Post-PMF, Scaling)

**Input UI:** Same grid pattern as Book Launch Planner.

- [ ] **Step 2: Build the result view**

On submit, look up the matching `AllocationRule` from `budgetAllocatorData.ts`. Calculate dollar amounts by applying percentages to the monthly budget.

**Result UI:**
- Visual bar chart: horizontal bars per channel, width proportional to %, labeled with channel name + $X,XXX + XX%
- CSS-only bars (no charting library): `bg-brand-accent` with width set via inline style
- Below chart: card per channel with estimated CPA range and reasoning text
- Total budget confirmation at top
- Wrap in `<EmailGate>` — show the chart free, gate the detailed per-channel recommendations

- [ ] **Step 3: Test the full flow**

Verify at `/tools/budget-allocator`: form → chart → email gate → detailed view.

- [ ] **Step 4: Commit**

```bash
git add src/components/tools/BudgetAllocator.tsx
git commit -m "feat: add Budget Allocator tool with channel breakdown chart"
```

---

### Task 12: Build Andromeda Creative Testing Matrix Tool

**Files:**
- Create: `src/components/tools/AndromedaMatrix.tsx`

- [ ] **Step 1: Build the input form**

Create `src/components/tools/AndromedaMatrix.tsx` — a `'use client'` component.

**Input state:**
- `vertical: string` (select: eCommerce, SaaS, Services, Education, Real Estate)
- `aovRange: string` (select: Under $50, $50-$200, $200+)
- `weeklyCapacity: string` (select: 1-3 creatives/week, 4-7/week, 8+/week)

- [ ] **Step 2: Build the result view**

Look up the matching `MatrixRule` from `andromedaMatrixData.ts`.

**Result UI:**
- Summary card: "You need X concept groups with Y formats each"
- Visual matrix grid: rows = concept groups, columns = formats (static/video/carousel), cells colored by priority (high=orange, medium=gold, low=gray)
- Weekly cadence timeline: "Week 1: Test concepts A vs B in static format → Week 2: Scale winner to video..." etc.
- Diversification angles list: specific creative angles to explore
- Wrap in `<EmailGate>` — show the matrix free, gate the full cadence plan + template download

- [ ] **Step 3: Test and commit**

```bash
git add src/components/tools/AndromedaMatrix.tsx
git commit -m "feat: add Andromeda Creative Testing Matrix tool"
```

---

### Task 13: Build AI Readiness Assessment Tool

**Files:**
- Create: `src/components/tools/AiReadiness.tsx`

- [ ] **Step 1: Build the quiz UI**

Create `src/components/tools/AiReadiness.tsx` — a `'use client'` component.

**State:**
- `currentQuestion: number` (0-based index)
- `answers: Record<string, string>` (question id → selected value)
- `showResults: boolean`

**Quiz UI:**
- One question at a time, full-width card
- Progress bar at top (X of 10)
- Multiple choice options as clickable cards (not radio buttons)
- Back/Next navigation
- Smooth transitions between questions (Framer Motion `AnimatePresence`)

- [ ] **Step 2: Build the scoring and result view**

On completion:
- Sum scores across all answers
- Map total score to a `ReadinessTier`
- Calculate per-category scores for a radar/breakdown view

**Result UI:**
- Tier badge: large colored badge (Not Ready = red, Getting Started = gold, Ready to Scale = green)
- Overall score: "Your AI Readiness Score: X/50"
- Category breakdown: 5 horizontal bars per category (stack, team, process, data, budget)
- Recommendations: numbered list of specific next steps from the tier data
- Suggested tools: list of AI tools relevant to their tier
- Wrap in `<EmailGate>` — show tier + overall score free, gate the detailed breakdown + recommendations

- [ ] **Step 3: Test and commit**

```bash
git add src/components/tools/AiReadiness.tsx
git commit -m "feat: add AI Readiness Assessment tool with scoring and tiers"
```

---

## Chunk 4: Competitor Gap Analyzer (Backend Tool)

### Task 14: Build Competitor Gap Analyzer API Route

**Files:**
- Create: `src/app/api/tools/competitor-analyzer/route.ts`

- [ ] **Step 1: Create the API route**

Create `src/app/api/tools/competitor-analyzer/route.ts`:

**Request body:**
```typescript
interface AnalyzeRequest {
  userUrl: string;
  competitorUrls: string[]; // max 2
}
```

**Validation:**
- `userUrl` required, must be a valid URL
- `competitorUrls` max length 2, each must be a valid URL
- All URLs must start with `https://` or `http://`

**Rate limiting:**
- Use a `Map<string, { count: number, resetAt: number }>` at module scope
- Key: IP from `request.headers.get('x-forwarded-for')` or `'unknown'`
- Max 3 requests per IP per hour
- Return 429 with `{ error: 'Rate limit exceeded. Try again in X minutes.' }` if exceeded

**Firecrawl integration:**
- Import Firecrawl SDK (install `@mendable/firecrawl-js` or use fetch to Firecrawl REST API)
- Read `FIRECRAWL_API_KEY` from `process.env`
- For each URL (user + competitors), crawl with timeout of 60 seconds
- Use `Promise.allSettled` so one failure doesn't block others
- Extract: page count, meta tags quality (title length, description presence), tech stack signals, content volume, heading structure

**Response:**
```typescript
interface AnalyzeResponse {
  results: {
    url: string;
    status: 'success' | 'error';
    error?: string;
    data?: {
      pageCount: number;
      metaScore: number; // 0-100
      techStack: string[];
      contentScore: number; // 0-100
      headingStructure: { h1: number; h2: number; h3: number };
      socialPresence: string[];
    };
  }[];
  gaps: {
    dimension: string;
    userScore: number;
    bestCompetitorScore: number;
    recommendation: string;
  }[];
}
```

- [ ] **Step 2: Verify the API route responds**

Run: `npm run dev`
Test with curl:
```bash
curl -X POST http://localhost:3000/api/tools/competitor-analyzer \
  -H "Content-Type: application/json" \
  -d '{"userUrl":"https://example.com","competitorUrls":["https://example.org"]}'
```
Expected: JSON response with crawl results (or graceful error if Firecrawl key not set).

- [ ] **Step 3: Commit**

```bash
git add src/app/api/tools/competitor-analyzer/route.ts
git commit -m "feat: add Competitor Gap Analyzer API route with Firecrawl + rate limiting"
```

---

### Task 15: Build Competitor Analyzer Client Component

**Files:**
- Create: `src/components/tools/CompetitorAnalyzer.tsx`

- [ ] **Step 1: Build the input form**

Create `src/components/tools/CompetitorAnalyzer.tsx` — a `'use client'` component.

**Input state:**
- `userUrl: string`
- `competitorUrls: string[]` (start with 1 field, "Add competitor" button adds up to 2)

**Input UI:** URL input fields with validation feedback. "Analyze" button with `.cta-primary`.

- [ ] **Step 2: Build the loading state**

On submit, POST to `/api/tools/competitor-analyzer`. Show animated progress:
- Step 1: "Crawling your site..." (with spinning indicator)
- Step 2: "Analyzing competitors..." (after ~5s)
- Step 3: "Generating report..." (after ~15s)

Progress steps are time-based estimates, not actual progress. Use `useEffect` with intervals.

- [ ] **Step 3: Build the result view**

**Result UI:**
- Report card header: site URL + date
- Comparison table: rows = dimensions (Meta Tags, Content Volume, Page Count, Tech Stack, Heading Structure), columns = user site + competitors, cells colored green/yellow/red
- Gaps section: cards for each identified gap, with score comparison bar and recommendation text
- Wrap in `<EmailGate>` — show the overview table free, gate the detailed gap analysis + recommendations
- Handle partial results: if one competitor failed, show "Couldn't reach [url]" in its column with the rest still displayed
- Handle rate limit: show friendly message with countdown timer

- [ ] **Step 4: Test and commit**

```bash
git add src/components/tools/CompetitorAnalyzer.tsx
git commit -m "feat: add Competitor Gap Analyzer client UI with loading states and report"
```

---

## Chunk 5: Chatbot Widget

### Task 16: Build ChatWidget Component

**Files:**
- Create: `src/components/ui/ChatWidget.tsx`

- [ ] **Step 1: Build the collapsed state**

Create `src/components/ui/ChatWidget.tsx` — a `'use client'` component.

**State:**
- `isOpen: boolean` (default `false`)
- `isVisible: boolean` (default `false` — controlled by scroll/timer)
- `currentStep: string` (tracks position in conversation)
- `answers: Record<string, string>` (accumulated answers)
- `messages: { role: 'bot' | 'user'; text: string; options?: ChatOption[] }[]`

**Collapsed state:**
- Fixed bottom-right: `fixed bottom-6 right-6 z-50`
- Small pill: `bg-brand-card`, `rounded-full`, `border-brand-border-subtle`
- Text: "Need help choosing?" with a subtle `animate-pulse-glow` on the dot
- Click to open

**Visibility logic:**
- `useEffect` with scroll listener: show after 30% scroll OR 10 seconds (whichever first)
- Use `usePathname()` from `next/navigation` (NOT `window.location.pathname` — client-side navigation won't trigger re-evaluation otherwise): hide on `/tools/*` and `/resources/*` routes
- Store dismissal in sessionStorage so it doesn't keep reappearing after close

- [ ] **Step 2: Build the expanded chat panel**

**Expanded state:**
- Panel: ~360px wide, ~480px tall, `bg-brand-card`, `rounded-[20px]`, `border-brand-border-subtle`
- Header: "Aurelius AI" + close button
- Message area: scrollable, bot messages in orange-tinted cards, user messages in white-text cards
- Option buttons: when bot presents options, render as clickable pills below the message
- Smooth open/close with Framer Motion `AnimatePresence`

- [ ] **Step 3: Build the conversation logic**

On each user selection:
1. Add user's choice to `messages` array
2. **Handle "Just browsing" exit:** If welcome answer is `'just-browsing'`, display exit message: "No problem! Feel free to explore our free tools and resources." with a link to `/resources`. Do not proceed to Q1. End conversation.
3. Look up next step from `chatbotFlow.ts` based on `currentStep` + selected value
4. Add bot's next message to `messages` with appropriate options
5. After Q4 (timeline), compute recommendation:
   - Build key: `${answers.business_type}|${answers.challenge}|${answers.budget}`
   - Look up in `recommendations` map from `chatbotFlow.ts`
   - Display recommendation with service link, resource link, and "Book a Strategy Call" CTA
5. Show email capture form: "Drop your email and I'll send you a personalized summary"
6. On email submit: POST to `/api/leads` with `source: 'chatbot'`, full answers as `message` field

**WhatsApp fallback:** In the final recommendation, include "Prefer WhatsApp? Message us directly" linking to `https://wa.me/...` with pre-populated message.

- [ ] **Step 4: Test the full conversation flow**

Run: `npm run dev`, scroll to trigger chatbot, click through all 4 questions, verify recommendation and email capture.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ChatWidget.tsx
git commit -m "feat: add rule-based lead qualifier chatbot widget"
```

---

### Task 17: Integrate ChatWidget into Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add ChatWidget to layout**

Open `src/app/layout.tsx`. Add `ChatWidget` import and render it inside `<body>`, after `<Footer />`:

```tsx
import ChatWidget from '@/components/ui/ChatWidget';

// ... in the return:
<body>
  <Header />
  <main>{children}</main>
  <Footer />
  <ChatWidget />
</body>
```

The ChatWidget handles its own visibility logic internally (scroll %, timer, route checking).

Also update the existing WhatsApp floating CTA (in `ServicePageClient.tsx`): wrap it in a condition that hides it when the chatbot is visible on the same page. The simplest approach: the WhatsApp CTA already has its own scroll-based visibility. Add a `data-chatbot-page` attribute or use the same `usePathname()` check — on pages where the chatbot is active (NOT `/tools/*` or `/resources/*`), hide the standalone WhatsApp CTA since WhatsApp is offered inside the chatbot instead. On `/tools/*` and `/resources/*` pages, the WhatsApp CTA remains visible in its normal bottom-right position.

- [ ] **Step 2: Verify it appears on homepage**

Run: `npm run dev`, scroll down on homepage. Chatbot pill should appear after 30% scroll or 10 seconds.

- [ ] **Step 3: Verify it does NOT appear on tool/resource pages**

Navigate to `/tools/book-launch-planner` and `/resources/meta-ads-andromeda-playbook`. Chatbot should not be visible.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate ChatWidget into root layout"
```

---

## Chunk 6: Content & Navigation

### Task 18: Write New Blog Posts

**Files:**
- Create: 8 new `.mdx` files in `content/blog/`

- [ ] **Step 1: Write all 8 blog posts**

Create each file with proper frontmatter (matching `BlogPostMeta` schema from `src/lib/blog.ts`). Note: the slug is derived from the filename (minus `.mdx` extension), consistent with existing posts — no explicit `slug` field in frontmatter.

```yaml
---
title: "..."
excerpt: "..."
date: "2026-03-20"
category: "..."
author: "Ayush Pant"
authorRole: "Founder, Aurelius Media"
featured: false
metaTitle: "..."
metaDescription: "..."
---
```

**Posts to write (per spec section 9.1):**

1. `content/blog/andromeda-update-2026.mdx` — "What Changed with Meta's Andromeda Update in 2026" (category: Paid Media)
2. `content/blog/book-launch-timeline-2026.mdx` — "How to Launch a Book in 2026: The Complete Timeline" (category: Book Marketing)
3. `content/blog/first-10k-marketing-budget.mdx` — "Where to Spend Your First $10K in Marketing as a Startup" (category: Growth Engineering)
4. `content/blog/ai-readiness-marketing-teams.mdx` — "Is Your Marketing Team AI-Ready? Here's How to Tell" (category: AI)
5. `content/blog/meta-ads-stopped-working.mdx` — "Why Your Meta Ads Stopped Working (And How to Fix Them)" (category: Paid Media)
6. `content/blog/real-estate-paid-vs-organic.mdx` — "Real Estate Lead Generation: Paid Media vs. Organic in 2026" (category: Industry)
7. `content/blog/enrollment-marketing-2026.mdx` — "The Enrollment Marketing Playbook for 2026" (category: Industry)
8. `content/blog/competitor-analysis-strategy.mdx` — "How to Analyze Your Competitors' Marketing Strategy" (category: Growth Engineering)

Each post: 1500-2500 words, genuinely useful content (not marketing fluff), includes inline CTAs linking to the relevant tool/resource using `.blog-callout` pattern:

```html
<div class="blog-callout">
  <div class="blog-callout-title">Try it yourself</div>
  <p>Use our free <a href="/tools/budget-allocator">Startup Budget Allocator</a> to get a personalized channel breakdown for your budget.</p>
</div>
```

- [ ] **Step 2: Verify all posts render**

Run: `npm run build`
Expected: All 8 new blog slugs generate successfully.

- [ ] **Step 3: Commit**

```bash
git add content/blog/
git commit -m "feat: add 8 new blog posts with cross-links to Phase 2 tools and resources"
```

---

### Task 19: Add Cross-Links to Existing Blog Posts

**Files:**
- Modify: 7 existing `content/blog/*.mdx` files

- [ ] **Step 1: Add callout blocks to existing posts**

Add a `.blog-callout` block to each existing post, linking to the most relevant Phase 2 tool or resource:

| Post | Add callout for |
|------|----------------|
| `meta-ads-vs-google-ads-budget-2026.mdx` | Budget Allocator tool + Andromeda Playbook |
| `vibe-coding-explained-build-saas-weekend.mdx` | AI Automation Starter Guide |
| `performance-max-2026-hero-or-villain.mdx` | Google Ads & PMax Guide e-book |
| `instagram-growth-strategy-for-authors-2026.mdx` | Book Launch Planner tool + Book Marketing e-book |
| `is-programmatic-seo-dead-in-2026.mdx` | Competitor Gap Analyzer tool |
| `9-ai-tools-for-startup-founders.mdx` | AI Readiness Assessment tool |
| `marketing-trends-2026-2030.mdx` | Resource hub page |

Insert each callout near the end of the post, before the conclusion.

- [ ] **Step 2: Verify no rendering issues**

Run: `npm run build`
Expected: All existing blog posts build without errors.

- [ ] **Step 3: Commit**

```bash
git add content/blog/
git commit -m "feat: add Phase 2 cross-links to all existing blog posts"
```

---

### Task 20: Update Header & Footer Navigation

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add Resources link to Header**

Open `src/components/layout/Header.tsx`. Add to the `navLinks` array:
```typescript
{ name: 'Resources', href: '/resources' }
```

Place it between "Blog" and "Contact" in the nav order.

- [ ] **Step 2: Add Resources links to Footer**

Open `src/components/layout/Footer.tsx`. Add a new `resources` group to `footerLinks`:
```typescript
resources: [
  { name: 'Free Tools', href: '/resources?type=tool' },
  { name: 'Playbooks & E-books', href: '/resources?type=ebook' },
  { name: 'Templates', href: '/resources?type=template' },
  { name: 'Blog', href: '/blog' },
]
```

Move "Blog" from the current location to this new "Resources" group. Update the footer grid to accommodate the new column.

- [ ] **Step 3: Verify navigation works**

Run: `npm run dev`. Click "Resources" in header and footer. Verify links navigate correctly and filters activate.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "feat: add Resources links to header and footer navigation"
```

---

### Task 21: Add Tool CSS Classes to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add tool and chatbot CSS classes**

Add to `src/app/globals.css`:

```css
/* Tool result charts */
.tool-bar {
  height: 32px;
  border-radius: 8px;
  background: var(--color-brand-accent);
  transition: width 0.6s ease-out;
}

.tool-bar-bg {
  height: 32px;
  border-radius: 8px;
  background: var(--color-brand-nested);
}

/* Tool progress indicator */
.tool-progress {
  height: 6px;
  border-radius: 3px;
  background: var(--color-brand-accent);
  transition: width 0.3s ease;
}

/* Chatbot message bubbles */
.chat-message-bot {
  background: var(--color-brand-nested);
  border: 1px solid var(--color-brand-border-subtle);
  border-radius: 16px 16px 16px 4px;
  padding: 12px 16px;
  max-width: 85%;
}

.chat-message-user {
  background: var(--color-brand-accent-dim);
  border: 1px solid var(--color-brand-accent-border);
  border-radius: 16px 16px 4px 16px;
  padding: 12px 16px;
  max-width: 85%;
  margin-left: auto;
}

.chat-option-pill {
  background: var(--color-brand-card);
  border: 1px solid var(--color-brand-border);
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.chat-option-pill:hover {
  border-color: var(--color-brand-accent-border);
  background: var(--color-brand-nested);
}

/* Email gate blur overlay */
.email-gate-blur {
  filter: blur(8px);
  user-select: none;
  pointer-events: none;
}

.email-gate-overlay {
  background: rgba(11, 11, 13, 0.85);
  backdrop-filter: blur(4px);
  border-radius: 20px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add tool, chatbot, and email gate CSS classes"
```

---

### Task 22: Cal.com Integration

**Files:**
- Modify: `src/app/contact/page.tsx` (or its client component)

- [ ] **Step 1: Install Cal.com embed package**

```bash
npm install @calcom/embed-react
```

- [ ] **Step 2: Replace Cal.com placeholder**

Open the contact page client component. Find the Cal.com placeholder section. Replace with:

```tsx
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

// Inside component:
useEffect(() => {
  (async function () {
    const cal = await getCalApi();
    cal("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#E8550F" } },
    });
  })();
}, []);

// In JSX:
<Cal
  calLink="aureliusmedia/15min"
  style={{ width: "100%", height: "100%", overflow: "scroll" }}
  config={{ layout: "month_view", theme: "dark" }}
/>
```

- [ ] **Step 3: Update service page "Book a Strategy Call" CTAs**

Open `src/app/services/[slug]/ServicePageClient.tsx`. The existing "Book a Strategy Call" buttons link to `https://cal.com/aureliusmedia/15min`. These are already correct — verify they point to the right URL. No changes needed if they already link to Cal.com.

Note: The `calLink` value `"aureliusmedia/15min"` is the real Cal.com booking link (already used in the Header CTA and service pages).

- [ ] **Step 4: Verify the widget loads**

Run: `npm run dev`, navigate to `/contact`. Cal.com booking widget should render in the placeholder area.

- [ ] **Step 5: Commit**

```bash
git add src/app/contact/ package.json package-lock.json
git commit -m "feat: integrate Cal.com booking widget on contact page"
```

---

### Task 23: Analytics Setup

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Verify Google Analytics is already present**

Check `src/app/layout.tsx` — Google Analytics (G-Y2CTMVVP1H) is already injected in `<head>`. Confirm it's tracking page views.

- [ ] **Step 2: Add gtag type declaration**

Create `src/types/global.d.ts`:
```typescript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
export {};
```

- [ ] **Step 3: Add custom event tracking utility**

Create `src/lib/analytics.ts`:
```typescript
export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}
```

- [ ] **Step 4: Add tracking calls to key components**

Add `trackEvent` calls to:
- `EmailGate.tsx`: `trackEvent('email_capture', { source })` on successful submission
- `ChatWidget.tsx`: `trackEvent('chatbot_started')` on open, `trackEvent('chatbot_completed', { service: recommendation.serviceSlug })` on finish
- Each tool component: `trackEvent('tool_completed', { tool: slug })` on result generation
- Resource pages: `trackEvent('resource_download', { slug })` on download click

- [ ] **Step 5: Commit**

```bash
git add src/types/global.d.ts src/lib/analytics.ts src/components/ui/EmailGate.tsx src/components/ui/ChatWidget.tsx src/components/tools/
git commit -m "feat: add event tracking for tools, resources, chatbot, and email captures"
```

---

### Task 24: Update SITEMAP_REFERENCE.json and PROJECT_CONTEXT.md

**Files:**
- Modify: `SITEMAP_REFERENCE.json`
- Modify: `PROJECT_CONTEXT.md`

- [ ] **Step 1: Add all new routes to SITEMAP_REFERENCE.json**

Add entries for:
- `/resources` hub page
- All 10 `/resources/[slug]` landing pages
- All 5 `/tools/[slug]` tool pages
- All 8 new `/blog/[slug]` blog posts

Follow the existing entry format with route, title, status, internal_links_to, internal_links_from.

- [ ] **Step 2: Update PROJECT_CONTEXT.md**

Add to relevant sections:
- Section 3 (Project Structure): Add `/tools`, `/resources` routes and new data files
- Section 7 (CMS/Content Schema): Add `ResourceData` and `ToolData` interfaces
- Section 9 (Pages Built): Add all new routes to the table
- Section 10 (Known Issues): Update with any new TODOs
- Section 11 (Environment Variables): Add `FIRECRAWL_API_KEY`
- Section 13 (Changelog): Add Phase 2 entry

- [ ] **Step 3: Commit**

```bash
git add SITEMAP_REFERENCE.json PROJECT_CONTEXT.md
git commit -m "docs: update PROJECT_CONTEXT and SITEMAP_REFERENCE with Phase 2 pages"
```

---

### Task 25: Final Build Verification & Deploy

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: All pages generate successfully (62-65 total pages). No TypeScript errors. No missing static params.

- [ ] **Step 2: Run local production server and spot-check**

```bash
npm run start
```

Manually verify:
- [ ] `/resources` — hub page renders, filters work
- [ ] `/resources/meta-ads-andromeda-playbook` — landing page renders, email gate works
- [ ] `/resources/book-launch-checklist` — renders without email gate (ungated)
- [ ] `/tools/book-launch-planner` — full flow works (inputs → timeline → email gate)
- [ ] `/tools/budget-allocator` — full flow works (inputs → chart → email gate)
- [ ] `/tools/andromeda-creative-matrix` — full flow works
- [ ] `/tools/ai-readiness` — quiz → scoring → results → email gate
- [ ] `/tools/competitor-analyzer` — form renders (Firecrawl may need API key to fully test)
- [ ] Chatbot appears on homepage after scroll, does NOT appear on tool pages
- [ ] Chatbot full conversation flow → recommendation → email capture
- [ ] Header "Resources" link works
- [ ] Footer resource links work
- [ ] New blog posts render correctly
- [ ] Existing blog posts show cross-link callouts
- [ ] Contact page Cal.com widget loads
- [ ] Mobile responsive: all new pages collapse to single column
- [ ] Analytics events fire in browser console (check Network tab for gtag calls)

**Note:** Service page contextual tool callouts (e.g., "Try our free Budget Allocator" between service page sections per spec 9.5) are deferred to a follow-up task. The cross-linking from blog posts and resource pages provides the primary discovery path for Phase 2 launch.

- [ ] **Step 3: Deploy to Vercel**

```bash
vercel --prod --yes
```

Add `FIRECRAWL_API_KEY` to Vercel environment variables before deploying.

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final Phase 2 build fixes"
```
