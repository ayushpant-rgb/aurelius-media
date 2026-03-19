# Aurelius Media — Phase 2 Design Spec

**Date:** 2026-03-20
**Author:** Ayush Pant + Claude
**Status:** Approved (pending final review)

---

## 1. Vision & Philosophy

Phase 2 follows the HubSpot playbook: build genuinely useful tools that solve real problems for real people. The tools *are* the marketing. If the content and tools are genuinely valuable, traffic, conversions, and brand authority follow organically.

**Core flywheel:**
Useful Tool → Solves Real Problem → User Shares It → Organic Traffic → Trust Built → Conversion

**Phase 1 delivered:** 41-page site with 28 service pages, 7 blog posts, lead capture system (Supabase + Resend + admin dashboard), polished dark luxury aesthetic, SEO infrastructure.

**Phase 2 adds:** Interactive tools, playbooks, templates, resource hub, lead qualifier chatbot, and content expansion — all designed around solving genuine pain points for 5 target audiences.

---

## 2. Target Audiences & Their Pain Points

| Audience | Core Pain Point |
|----------|----------------|
| **Authors/Publishers** | "I'm launching a book and have no idea what to do, in what order, or what I'm forgetting" |
| **VC-backed Startups** | "I have $10K/month and don't know where to spend it" |
| **Real Estate** | "I need leads but don't know if my ads are set up right" |
| **Education/EdTech** | "Enrollment season is coming and our funnel is broken" |
| **D2C Brands** | "Andromeda killed our ROAS and we don't know how to fix it" |

---

## 3. Approach & Sequencing

**Content-first approach (Approach C):** Write all content first, then build the pages and infrastructure to house it.

- **Phase 2a (Content):** Write 8 e-books, prepare templates, write 5-8 new blog posts
- **Phase 2b (Infrastructure):** Build resource hub, tool pages, email gates, chatbot
- **Phase 2c (Polish):** Cross-linking, Cal.com integration, analytics, chatbot tuning

**Constraints:**
- Static data layer (no CMS) — consistent with Phase 1
- No LLM API costs — tools use decision trees, weighted scoring, and Firecrawl
- Dark luxury aesthetic maintained throughout
- Sprint pace (~3-5 days)

---

## 4. Section 1: Interactive Tools

### 4.1 Overview

5 interactive tools, each at `/tools/[slug]`. All follow the same pattern:

**Problem statement → Interactive UI → Personalized result → Email gate on result → CTA to relevant service**

All lead captures feed into the existing Supabase leads system with `source: 'tool-[slug]'`.

### 4.2 Tool 1: Book Launch Planner & Checklist

- **Route:** `/tools/book-launch-planner`
- **Audience:** Authors/Publishers
- **Pain:** "I'm launching a book and have no idea what to do, in what order, or what I'm forgetting"
- **How it works:** User enters launch date, genre, budget range, and whether they have an existing audience. The tool generates a personalized countdown timeline — a week-by-week checklist from 12 weeks out to post-launch. Tasks are categorized (Amazon setup, social media, email list, ads, PR). Each task has a checkbox they can track.
- **Result:** Visual timeline they can bookmark/return to. Email gate to get the full PDF version + editable Notion template.
- **Links to:** `/services/book-marketing`
- **Tech:** Client component with React state. Decision tree logic in a static TS data file. No API calls.

### 4.3 Tool 2: Startup Channel Budget Allocator

- **Route:** `/tools/budget-allocator`
- **Audience:** VC-backed Startups
- **Pain:** "I have $X/month and don't know how to split it across channels"
- **How it works:** User inputs monthly budget, industry (SaaS/eComm/marketplace/fintech), primary goal (lead gen/sales/brand awareness), and current stage (pre-revenue/post-PMF/scaling). Decision tree outputs a recommended channel split (Google/Meta/LinkedIn/TikTok/SEO/Content) with % allocations, estimated CPA ranges per channel, and reasoning.
- **Result:** Visual budget breakdown chart + rationale. Email gate to get the spreadsheet version with scenario modeling.
- **Links to:** `/services/marketing-strategy-audit`
- **Tech:** Client component. Budget allocation logic as weighted scoring in static TS. Visual chart rendered with CSS (no charting library needed).

### 4.4 Tool 3: Andromeda Creative Testing Matrix

- **Route:** `/tools/andromeda-creative-matrix`
- **Audience:** D2C Brands, media buyers
- **Pain:** "Andromeda changed everything and I don't know how to structure creative testing anymore"
- **How it works:** User selects their vertical, average order value, and number of creatives they can produce per week. Tool generates a structured testing framework — how many concept groups to run, how to diversify creative angles, which formats to prioritize (static/video/carousel), and a weekly testing cadence.
- **Result:** Personalized creative testing plan with a visual matrix. Email gate for the Sheets/Notion template.
- **Links to:** `/services/meta-ads`
- **Tech:** Client component. Static logic based on input combinations.

### 4.5 Tool 4: Competitor Gap Analyzer (Hero Tool)

- **Route:** `/tools/competitor-analyzer`
- **Audience:** All audiences
- **Pain:** "I don't know what my competitors are doing that I'm not"
- **How it works:** User enters their URL + up to 2 competitor URLs. Firecrawl crawls all three sites. Tool compares: pages indexed, meta tag quality, social presence, ad library activity, tech stack, content volume. Surfaces specific gaps with actionable recommendations.
- **Result:** Visual report card — your site vs. competitors across 8-10 dimensions. Email gate to get the full PDF report.
- **Links to:** `/services/marketing-strategy-audit`, `/services/programmatic-seo`
- **Tech:** Client component for UI. Server-side API route (`/api/tools/competitor-analyzer`) that calls Firecrawl. Results rendered client-side. This is the only tool with a backend component.

### 4.6 Tool 5: AI Readiness Assessment

- **Route:** `/tools/ai-readiness`
- **Audience:** Marketing teams, agencies
- **Pain:** "We keep hearing about AI tools but don't know where to start"
- **How it works:** 8-10 questions about their current marketing stack, team size, manual processes, data maturity, and budget. Weighted scoring outputs a readiness tier (Not Ready / Getting Started / Ready to Scale) with specific AI tool recommendations per score area.
- **Result:** Personalized readiness scorecard with prioritized next steps. Email gate for the full AI marketing toolkit guide.
- **Links to:** `/services/ai-automation`, `/services/ai-agents`
- **Tech:** Client component. Scoring weights in static TS data file.

### 4.7 Shared Tool Infrastructure

- **Data layer:** New `src/data/tools.ts` with a `ToolData` interface (slug, title, description, audience, linkedService, linkedResource)
- **Page template:** `/tools/[slug]` with `generateStaticParams` from tools data. Each tool page imports a tool-specific client component.
- **Email gate component:** Reusable `EmailGate.tsx` component. Renders a form (name + email) that blocks the full result until submitted. Posts to `/api/leads` with `source: 'tool-[slug]'`.
- **Result sharing:** Each tool result generates a unique URL hash so users can bookmark/return to their result.

---

## 5. Section 2: Playbooks & E-books (8)

### 5.1 Overview

8 e-books, each with a dedicated landing page at `/resources/[slug]`. PDF downloads gated behind email capture. Every e-book cross-links to a relevant interactive tool and service page.

### 5.2 E-book List

| # | Title | Audience | Pain Solved | Links To (Service) | Links To (Tool) |
|---|-------|----------|-------------|--------------------|--------------------|
| 1 | Meta Ads Andromeda Playbook | D2C, media buyers | "My ROAS dropped after Andromeda and I don't know how to adapt" | `/services/meta-ads` | Andromeda Creative Testing Matrix |
| 2 | Google Ads & Performance Max Guide 2026 | Startups, D2C | "PMax feels like a black box and I'm wasting budget" | `/services/google-ads` | Budget Allocator |
| 3 | Book Marketing: Amazon Ads Campaign Blueprint | Authors, publishers | "I published my book but nobody's finding it" | `/services/book-marketing` | Book Launch Planner |
| 4 | Real Estate Paid Media System | Agents, developers, brokerages | "I need consistent property leads but don't know how to set up ads" | `/services/real-estate-marketing` | — |
| 5 | Education Enrollment Marketing Handbook | Universities, EdTech, coaching | "Enrollment season is coming and our funnel leaks at every stage" | `/services/education-marketing` | — |
| 6 | AI Automation Starter Guide for Marketing Teams | In-house marketing teams, agencies | "We're spending 20 hours/week on tasks AI could handle" | `/services/ai-automation` | AI Readiness Assessment |
| 7 | The Startup Growth Playbook: $0 to $50K MRR | VC-backed early-stage founders | "We raised a round but don't know how to deploy marketing budget" | `/services/marketing-strategy-audit` | Budget Allocator |
| 8 | D2C Meta Ads Recovery Guide | E-commerce brands | "Our Meta ads used to work and now they don't" | `/services/meta-ads` | Andromeda Creative Testing Matrix |

### 5.3 E-book Content Standards

Each e-book should be:
- **Genuinely useful** — a reader should be able to implement the advice without hiring Aurelius Media
- **Specific and actionable** — real numbers, real frameworks, real examples (not vague marketing advice)
- **20-40 pages** — long enough to be comprehensive, short enough to finish in one sitting
- **Branded** — Aurelius Media design system applied to PDF layout (dark theme, orange accents, Plus Jakarta Sans headers)

### 5.4 Landing Page Template

Each e-book landing page at `/resources/[slug]` includes:
- Hero: Title + 2-sentence description + preview mockup image (angled PDF cover)
- "What's Inside" section: 5-6 bullet points summarizing key takeaways
- Social proof: "Join X marketers who've downloaded this" (counter from Supabase)
- Email gate form: Name + Email → delivers PDF download link + adds to Supabase leads with `source: 'resource-[slug]'`
- Related: Link to relevant tool + service page
- SEO: `generateMetadata` with title, description, OG image per resource

---

## 6. Section 3: Templates & Frameworks (2)

### 6.1 Book Launch Checklist

- **Route:** `/resources/book-launch-checklist`
- **Audience:** Authors/Publishers
- **Gated:** No — free, ungated, designed to be shared in Facebook groups and writing communities
- **Format:** Beautiful, printable web page + downloadable PDF
- **Content:** 12-week countdown checklist, every task listed and categorized (Amazon setup, social media, email list, ads, PR, reviews)
- **Links to:** Book Launch Planner tool, Book Marketing e-book, `/services/book-marketing`

### 6.2 Andromeda Creative Brief Template

- **Route:** `/resources/andromeda-creative-brief`
- **Audience:** D2C brands, media buyers
- **Gated:** Yes — email required
- **Format:** Downloadable Sheets/Notion template
- **Content:** Structured brief for producing 10-15 conceptually distinct creatives. Fields for concept angle, format, hook type, audience segment, visual direction, performance hypothesis.
- **Links to:** Andromeda Creative Testing Matrix tool, Meta Ads Andromeda Playbook, `/services/meta-ads`

---

## 7. Section 4: Resource Hub (`/resources`)

### 7.1 Page Design

- **Route:** `/resources`
- **Header:** "Free Tools & Resources" with `.gradient-text` + subtitle: "Genuinely useful tools built by marketers, for marketers."
- **Filters:** Two filter rows:
  - By type: All | Tools | Playbooks | Templates (horizontal pills, same style as blog category filter)
  - By audience: All | Authors | Startups | Real Estate | Education | D2C (horizontal pills)
- **Card grid:** 3-column grid matching blog listing card style (20px radius, orange hover glow, 3px lift). Each card shows:
  - Thumbnail/icon
  - Type badge (Tool / Playbook / Template) using `.tag` CSS classes
  - Audience tag
  - Title + short description
  - CTA button: "Use Tool" (for tools) / "Download" (for gated PDFs) / "View" (for free templates)
- **Tool cards get priority:** Either pinned to top or visually differentiated (slightly larger, accent border)
- **Design language:** Consistent with blog listing page — same gradient header, filter pills, card grid, newsletter CTA at bottom

### 7.2 Data Layer

New file: `src/data/resources.ts`

```typescript
export type ResourceType = 'tool' | 'ebook' | 'template';
export type ResourceAudience = 'authors' | 'startups' | 'real-estate' | 'education' | 'd2c' | 'all';

export interface ResourceData {
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  audience: ResourceAudience;
  gated: boolean;
  thumbnailImage?: string;
  downloadUrl?: string;       // For PDFs
  toolRoute?: string;         // For tools (links to /tools/[slug])
  linkedServiceSlug?: string; // Cross-link to service page
  linkedToolSlug?: string;    // Cross-link to related tool
  metaTitle: string;
  metaDescription: string;
}
```

### 7.3 Routing

- `/resources` — Hub page (filterable grid)
- `/resources/[slug]` — Individual landing page per e-book and template (uses `generateStaticParams`)
- `/tools/[slug]` — Interactive tool pages (separate route, separate data file, linked from resource hub)

---

## 8. Section 5: Lead Qualifier Chatbot

### 8.1 Overview

A rule-based conversational widget that qualifies visitors, recommends services, and captures leads. No LLM costs — pure decision tree logic. Architecture designed for future LLM upgrade.

### 8.2 Visual Design

- **Position:** Fixed bottom-right (replaces WhatsApp CTA position)
- **Collapsed state:** Small pill/bubble with subtle pulse animation, text: "Need help choosing?"
- **Expanded state:** Chat panel (~360px wide, ~480px tall)
- **Theme:** Dark, matching site aesthetic — `bg-brand-card` panel, `brand-border-subtle` borders, orange accent for bot messages, white for user messages
- **Animation:** Smooth expand/collapse with Framer Motion

### 8.3 Conversation Flow

```
Bot: "Hey! I'm the Aurelius AI assistant. Want help figuring out which service fits your business?"
  → "Yes, let's go" / "Just browsing"

If "Just browsing": "No problem! Feel free to explore our free tools and resources. [Link to /resources]"

If "Yes, let's go":

  Q1: "What best describes your business?"
    → Author/Publisher
    → Startup (VC-backed or bootstrapped)
    → Real Estate (agent/developer/brokerage)
    → Education/EdTech
    → D2C / E-commerce Brand
    → Agency / Other

  Q2: "What's your biggest challenge right now?"
    [Options tailored to Q1 answer]
    - Author: "Launching a book" / "Low Amazon sales" / "Building an audience" / "Need ads help"
    - Startup: "Setting up paid ads" / "Scaling what's working" / "Not sure where to spend" / "Need a marketing strategy"
    - D2C: "ROAS is dropping" / "Creative fatigue" / "Scaling Meta ads" / "Diversifying channels"
    - Real Estate: "Need more leads" / "Ads not converting" / "Don't know where to start" / "Want to scale what's working"
    - Education: "Low enrollment" / "Funnel leaks" / "Need paid ads" / "Want to scale"
    - Agency/Other: "Need marketing help" / "Want AI automation" / "Looking for a partner"

  Q3: "What's your monthly marketing budget?"
    → Under $1,000
    → $1,000 - $5,000
    → $5,000 - $20,000
    → $20,000+

  Q4: "How soon are you looking to get started?"
    → This week
    → This month
    → Just exploring

Bot: Personalized recommendation
  → "Based on what you've told me, I'd recommend [Service Name]. Here's why: [1-2 sentences]."
  → Shows: Service link + Book a Call CTA
  → "Or explore a free resource: [relevant tool/ebook]"
  → Email capture: "Drop your email and I'll send you a personalized summary"
```

### 8.4 Technical Details

- **Component:** `src/components/ui/ChatWidget.tsx` (client component)
- **Decision tree data:** `src/data/chatbotFlow.ts` — maps `(business_type + challenge + budget)` → service slug + relevant resource slug
- **Lead capture:** Posts to `/api/leads` with `source: 'chatbot'` and full conversation context as JSON metadata
- **Visibility rules:**
  - Appears after 10 seconds or 30% scroll (whichever comes first)
  - Does NOT appear on `/tools/*` or `/resources/*` pages (user is already engaged)
  - Collapsed by default, never auto-opens
- **WhatsApp coexistence:** WhatsApp CTA becomes a secondary option inside the chatbot's final recommendation ("Prefer WhatsApp? Message us directly")

---

## 9. Section 6: Content & SEO Expansion

### 9.1 New Blog Posts (5-8)

Each post serves as a gateway to a Phase 2 resource, creating the SEO → Blog → Tool/Resource → Lead capture funnel.

Recommended posts:
1. "What Changed with Meta's Andromeda Update in 2026" → Andromeda Playbook + Creative Testing Matrix
2. "How to Launch a Book in 2026: The Complete Timeline" → Book Launch Planner + Book Marketing e-book
3. "Where to Spend Your First $10K in Marketing as a Startup" → Budget Allocator + Startup Growth Playbook
4. "Is Your Marketing Team AI-Ready? Here's How to Tell" → AI Readiness Assessment + AI Automation Guide
5. "Why Your Meta Ads Stopped Working (And How to Fix Them)" → D2C Recovery Guide + Andromeda Matrix
6. "Real Estate Lead Generation: Paid Media vs. Organic in 2026" → Real Estate e-book
7. "The Enrollment Marketing Playbook for 2026" → Education Handbook
8. "How to Analyze Your Competitors' Marketing Strategy" → Competitor Gap Analyzer

### 9.2 Blog Cross-Linking (Phase 1 TODO)

- Add inline CTA callout blocks to existing 7 blog posts linking to relevant Phase 2 tools and resources
- Use existing `.blog-callout` CSS class pattern in MDX
- Example: The "Meta Ads vs Google Ads" post gets a callout promoting the Budget Allocator tool and the Andromeda Playbook

### 9.3 Cal.com Integration

- Replace the placeholder on `/contact` with a real Cal.com embed widget (`@calcom/embed-react`)
- Chatbot "Book a Strategy Call" CTA links to Cal.com scheduling
- Service page CTAs also link to Cal.com

### 9.4 Analytics

- Set up PostHog or Google Analytics (the `ANALYTICS_ID` env variable is already planned in Phase 1)
- Key events to track:
  - Tool completions (per tool)
  - Resource downloads (per resource)
  - Chatbot conversations (started, completed, service recommended)
  - Email captures (per source)
  - Cal.com bookings

### 9.5 Navigation Updates

- **Header mega-menu:** Add "Resources" link → `/resources`
- **Footer:** Add "Free Tools" and "Resources" links
- **Service pages:** Add contextual "Try our free [Tool Name]" callout between sections, linking to the relevant tool for that service vertical

---

## 10. New Routes Summary

| Route | Type | Pages |
|-------|------|-------|
| `/resources` | Hub page | 1 |
| `/resources/[slug]` | E-book + template landing pages | 10 (8 e-books + 2 templates) |
| `/tools/[slug]` | Interactive tool pages | 5 |
| `/blog/[slug]` | New blog posts | 5-8 |
| **Total new pages** | | **~21-24** |
| **Total site pages after Phase 2** | | **~62-65** |

---

## 11. New Files & Data Layer

| File | Purpose |
|------|---------|
| `src/data/resources.ts` | ResourceData interface + all e-books/templates data |
| `src/data/tools.ts` | ToolData interface + all tools metadata |
| `src/data/chatbotFlow.ts` | Decision tree data for chatbot conversation flow |
| `src/app/resources/page.tsx` | Resource hub page |
| `src/app/resources/[slug]/page.tsx` | Resource landing page template |
| `src/app/tools/[slug]/page.tsx` | Tool page template |
| `src/app/tools/[slug]/BookLaunchPlanner.tsx` | Book Launch Planner tool component |
| `src/app/tools/[slug]/BudgetAllocator.tsx` | Budget Allocator tool component |
| `src/app/tools/[slug]/AndromedalMatrix.tsx` | Andromeda Creative Testing Matrix component |
| `src/app/tools/[slug]/CompetitorAnalyzer.tsx` | Competitor Gap Analyzer component |
| `src/app/tools/[slug]/AiReadiness.tsx` | AI Readiness Assessment component |
| `src/app/api/tools/competitor-analyzer/route.ts` | Firecrawl API route for Competitor Analyzer |
| `src/components/ui/ChatWidget.tsx` | Lead qualifier chatbot widget |
| `src/components/ui/EmailGate.tsx` | Reusable email gate component |
| `content/blog/*.mdx` | 5-8 new blog posts |

---

## 12. Design Standards

All Phase 2 pages follow the existing Aurelius Media design system:

- **Colors:** Brand dark surfaces (`#0B0B0D` → `#131316` → `#1C1C20`), orange accent (`#E8550F` / `#FF7A3D`), gold secondary (`#C8A951`)
- **Typography:** Plus Jakarta Sans headers, Inter body, JetBrains Mono eyebrows
- **Cards:** `bg-brand-card`, `rounded-[20px]`, `border-brand-border-subtle`, orange hover glow
- **Buttons:** `.cta-primary` for main CTAs, `.btn-ghost` for secondary
- **Animations:** `animate-fade-in-up` on scroll, staggered entries via `animationDelay`
- **Responsive:** Mobile-first, all grids collapse to single column
- **SEO:** `generateMetadata` + JSON-LD structured data on all new pages

---

## 13. Out of Scope (Phase 3+)

- Portfolio/work showcase (no content ready)
- Case study deep-dive pages (later)
- Pricing/packages page
- Careers/team page
- LLM-powered chatbot upgrade
- AI Ad Copy Generator tool
- CMS integration
- Amazon Ads Keyword & Bid Tracker template
