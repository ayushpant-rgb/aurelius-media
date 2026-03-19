# Aurelius Media — Project Context

Welcome to the **Aurelius Media** codebase! This file acts as your ultimate source of truth. As an AI agent working on this repository, you should read this before making any architectural or design decisions. 

## 1. Project Overview
- **Project Name:** Aurelius Media Website
- **Purpose:** A premium, "wow-factor" corporate website for an AI-powered performance marketing agency. It aims to attract VC-backed startups and enterprise clients.
- **Goals:** High-end aesthetic (SaaS-like, dark mode, cinematic), fast performance, programmatic SEO structure for scaling content, and highly readable capabilities overviews.
- **Current Status:** Main pages built (Home, Services Hub, Service Sub-pages, Categories, Blog, Contact). 28 specific service pages built with programmatic routing. 7 blog posts live. All core homepage sections complete with scroll animations and marquee testimonials. About page removed (301 redirect to `/#how-it-works`). Contact page complete with lead capture form, Cal.com placeholder, and social links.
- **Live URL:** `https://www.aureliusmedia.co` (Deployed on Vercel)

## 2. Tech Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4 (using `@theme` in `globals.css`)
- **CMS / Data Layer:** Static TypeScript data files (`src/data/*.ts`) and Markdown files (`content/blog/*.mdx`). No external headless CMS is connected yet.
- **Animations:** Custom CSS animations, Framer Motion, custom `useInView` hook for fade-ins, and Three.js (raw WebGL) for hero shader backgrounds.
- **Package Manager:** npm

## 2b. Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | Core React Framework (App Router) |
| `framer-motion` | 12.35.2 | Complex component enter/exit animations (e.g., CapabilitiesPanel) |
| `three` | 0.183.2 | WebGL for rendering the `AnoAI` hero shader background |
| `gray-matter` | 4.0.3 | Parsing frontmatter from local `.mdx` blog posts |
| `next-mdx-remote` | 6.0.0 | Rendering markdown/MDX safely into React components |
| `reading-time` | 1.5.0 | Generating "X min read" estimations for blog cards |
| `lucide-react` | 0.577.0 | SVG Icon library (fallback for custom drawn svgs) |
| `@radix-ui/react-avatar` | 1.1.11 | Accessible, fallback-supported Avatar components for testimonials |
| `remark-gfm` | latest | GitHub-Flavored Markdown support in MDX (enables tables, strikethrough, etc.) |

## 3. Project Structure
```text
/src
  /app                 # Next.js App Router pages and layouts
    /admin             # Admin dashboard (leads management)
    /api               # API routes (leads submission)
    /blog              # Blog hub and dynamic [slug] routes
    /categories        # Dynamic category pages (e.g., performance-marketing)
    /contact           # Contact form route
    /services          # Services hub and dynamic [slug] routes
    globals.css        # Tailwind v4 theme and global animations
    layout.tsx         # Root layout with fonts, metadata, and Header/Footer
    page.tsx           # Home page
  /components
    /layout          # Header, Footer, and navigation
    /sections        # Large page blocks (Hero, CTABlock, MissionStatement, etc.)
    /ui              # Smaller reusable elements (cards, falling-pattern, shaders, BlurReveal)
  /data                # Static TS data (servicePages.ts, caseStudies.ts, events.ts)
  /lib                 # Utilities (blog parser, hooks, schema.ts, utils.ts, supabase.ts, emails.ts, admin-auth.ts)
  /types               # TypeScript types (lead.ts)
/content
  /blog                # Markdown files for blog posts
/public
  /case-studies        # WebP/AVIF case study images
  /logos               # Client logo assets
  /services            # Hero banner illustrations
  /testimonials        # Avatar portraits
```

**Key Decision:** We split `/sections` from `/ui`. If a component handles its own layout padding and spans the full width of the screen, it goes in `/sections`. If it is a smaller piece used *inside* a section (like a card), it goes in `/ui`.

## 4. Architecture Decisions
- **Routing:** Exclusively Next.js App Router (`/app`).
- **Data Fetching:** We use SSG (Static Site Generation). Dynamic routes like `/services/[slug]` export `generateStaticParams` to pre-build all HTML at build time for maximum speed and SEO.
- **Server vs Client:** The vast majority of components are Server Components by default. We only use `'use client'` at the component level (like `ServicePageClient.tsx`) when we need `useInView` for scroll animations, Framer Motion, or event listeners.
- **Blog Architecture:** We use `gray-matter` to parse local `.mdx` files in the `/content/blog` directory. Blogs are statically generated. MDX is rendered via `next-mdx-remote/rsc` (a server component — no `'use client'` needed) with `remark-gfm` passed in `options.mdxOptions.remarkPlugins`. Do NOT use client-side `serialize()` — it causes hydration failures during SSG prerender.

## 5. Component Patterns
- **Scroll Animations:** Almost every section fades in on scroll. We use a custom `useInView` hook (`src/lib/hooks.ts`) and apply `animate-fade-in-up` utility classes conditionally:
  ```tsx
  const { ref, inView } = useInView();
  // ...
  <section ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
  ```
- **BlurReveal:** `src/components/ui/BlurReveal.tsx` — a scroll-based blur+opacity reveal wrapper. Uses `IntersectionObserver` with 101 thresholds. Maps `intersectionRatio / 0.4` → progress (0–1), applies `filter: blur()` (max 18px) and `opacity` (0.3→1.0). Currently wraps only `MissionStatement` on the homepage. Do NOT apply it globally.
- **Testimonials:** Desktop: 3 vertical columns with alternating scroll (down/up/down at 56s/63s/59s), fixed-height container with top/bottom fades. Mobile: 3 horizontal rows (RTL/LTR/RTL at 45s/40s/47s), each row features a single person (Cameron/Tom/Karan). CSS-only infinite scroll via `@keyframes scroll-rtl` / `scroll-ltr` / `marquee-vertical-down` / `marquee-vertical-up`. Always use CSS classes — not inline `style={{ animation: '...' }}` — for reliable cross-browser behavior.
- **Responsive Images:** We use `next/image` with `object-cover` for nearly all images to retain aspect ratios nicely.
- **Naming:** PascalCase for React components, camelCase for variables/functions.

## 6. Design System
We employ a sleek, dark-mode-first luxury aesthetic. 

**Colors (Tailwind `@theme` in `globals.css`) — 3-tier depth system:**
- Page Background: `var(--color-brand-dark)` `#0B0B0D`
- Card/Panel Surface: `var(--color-brand-card)` `#131316`
- Nested/Elevated: `var(--color-brand-nested)` `#1C1C20`
- Input/Deep Nested: `var(--color-brand-input)` `#252529`
- Primary Accent (Orange): `var(--color-brand-accent)` `#E8550F`
- Accent Text (on dark): `var(--color-brand-accent-text)` `#FF7A3D`
- Accent Hover: `var(--color-brand-accent-hover)` `#FF6B2B`
- Secondary Accent (Gold): `var(--color-brand-gold)` `#C8A951`
- Text Primary: `#FFFFFF`, Secondary: `rgba(255,255,255,0.65)`, Muted: `rgba(255,255,255,0.38)`
- Borders: `rgba(255,255,255,0.08)` (standard), `rgba(255,255,255,0.04)` (subtle)

**Typography:**
- Headers: `Plus Jakarta Sans` weight 800, letter-spacing -0.03em (`font-display`)
- Body/UI: `Inter` (`font-sans`)
- Accent words: `.gradient-text` class (orange gradient, replaces Playfair italic)
- Eyebrows/Tech specs: `JetBrains Mono` (`font-mono`)
- Section labels: `.section-label` class (10px, 700 weight, 0.2em spacing, dashed prefix)

**Spacing & Layout:**
- **Max Width:** Most content is contained within `max-w-7xl` (1280px) or `max-w-6xl` containers to ensure readability on ultrawide monitors.
- **Section Padding:** The standard vertical padding wrapper is `py-16 sm:py-24` or applied directly via custom CSS `.section-padding` (`padding: clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)`).
- **Grids:** Standard gap spacing is `gap-4 sm:gap-6` or `gap-8` depending on card size. 

**Breakpoints:**
- Standard Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- **Mobile Patterns:** Multi-column layouts must always collapse to `grid-cols-1` on mobile to preserve legibility (e.g., `grid-cols-1 md:grid-cols-3`). 

**Animation Standards:**
- **Classes:** `animate-fade-in-up`, `animate-fade-in`, `animate-slide-in-right`, `animate-pulse-glow`, `animate-marquee`, `animate-scroll-rtl`, `animate-scroll-ltr`, `animate-scroll-rtl-slow`, `animate-logo-scroll`.
- **Durations:** `fade-in-up` defaults to 0.7s ease-out. Desktop testimonial columns: 56s/63s/59s. Mobile testimonial rows: 45s/40s/47s.
- **Staggers:** When iterating mapping over arrays, use inline styles for staggered entries: `style={{ animationDelay: \`${i * 0.1}s\` }}`.
- **Rule:** All animations must be defined as named CSS classes in `globals.css`. Never use inline `style={{ animation: '...' }}` for scroll/marquee effects.

**Card Patterns:**
- Backgrounds: `bg-brand-card` (#131316) with `border border-brand-border-subtle`.
- Hover states: orange border glow `hover:border-[rgba(232,85,15,0.30)]` + slight `hover:-translate-y-0.5` lift.
- Card radius: `rounded-[20px]` (pill-like corners). Inner cards/inputs: `rounded-[12px]`.
- CTA buttons: `rounded-[20px]` pill shape with gradient fill + inset highlight + glow shadow.

**Button Patterns:**
- Primary: `.cta-primary` — gradient `#FF6B2B → #E8550F`, inset highlight, 20px pill radius, orange glow shadow.
- Ghost: `.btn-ghost` — transparent bg, white/08 border, 20px radius.
- Orange outline: `.btn-outline-or` — orange text/border, transparent bg.

**Blog Typography (`.blog-article` class in `globals.css`):**
- **Body text:** Inter 16px, line-height 1.75, color `rgba(255,255,255,0.65)`, max-width 680px, 20px paragraph spacing.
- **H2:** Plus Jakarta Sans, 28px, weight 800, letter-spacing -0.03em, margin-top 48px, margin-bottom 16px, line-height 1.2.
- **H3:** Plus Jakarta Sans, 20px, weight 700, letter-spacing -0.01em, margin-top 36px, margin-bottom 12px, line-height 1.3.
- **Links:** `#FF7A3D` with underline, 3px offset, hover intensifies underline color.
- **List markers:** Orange `#FF7A3D` (not white).
- **Blockquotes:** 3px orange left border (not gold), Plus Jakarta Sans 20px italic bold, white text, leading 1.45.
- **Code blocks:** Header bar (`bg-brand-card-hover`, language label + copy button) + body (`font-mono 13px`, line-height 1.7). Inline code uses `#FF7A3D` accent color.
- **Images:** 12px radius, subtle border.
- **Tables:** Full-width, mono uppercase headers, striped hover rows, subtle borders.
- **Article width:** 680px body text, 900px hero/wide elements.

**Blog Content Components (reusable CSS classes in `globals.css`):**
- `.blog-tree` — Visual tree/hierarchy diagrams. Use in MDX with `.blog-tree-hub` (orange-bordered hub card), `.blog-tree-clusters` (left-bordered container), `.blog-tree-cluster` (individual cluster with `.blog-tree-label` + `.blog-tree-items` + `.blog-tree-item`). Replaces broken Unicode box-drawing code blocks.
- `.blog-callout` — Tip/info callout boxes. Orange left border accent, dark card bg. Use `.blog-callout-title` + `<p>` inside.
- `.blog-stats` — 3-column stat card grid (collapses to 1-col on mobile). Use `.blog-stat` with `.blog-stat-num` + `.blog-stat-label` inside.

**Blog Listing Cards:**
- 3-column grid, 20px radius, 200px image area, orange hover border + 3px lift.
- Category pills use `.tag` + `.tag-orange`/`.tag-green`/`.tag-blue` CSS classes.
- Featured post: 2-column card (image left, content right), only shown on "All" filter.
- Author avatars: 28px circles with real photo.
- Newsletter CTA: warm gradient card (`#1A0D05` → `brand-card`), orange border, 24px radius.

## 7. CMS / Content Schema

### Services Interface (`src/data/servicePages.ts`)
```tsx
export interface ServiceFAQ {
    question: string;
    answer: string;
}

export interface ServicePersona {
    title: string;
    description: string;
    icon?: string;              // Lucide icon name (e.g. 'Rocket', 'ShoppingBag')
}

export interface ServiceBenefit {
    title: string;
    description: string;
}

export interface SubService {
    title: string;
    description: string;
    slug?: string;
}

export interface ComparisonRow {
    us: string;
    others: string;
}

export interface ResultHighlight {
    metric: string;
    description: string;
}

export interface Differentiator {
    title: string;
    description: string;
}

export interface ServiceData {
    slug: string; // Used for URL generation
    title: string;
    category: 'paid_media' | 'growth_engine' | 'creative_studio' | 'ai_build' | 'vertical';
    categoryLabel: string;
    headline: string;
    description: string;
    targetKeywords: string[];
    heroImage?: string; // Optional 3D banner image at top right
    problems: { title: string; description: string }[];
    approach: string;
    approachPoints: string[];
    deliverables: string[];
    faqs: ServiceFAQ[];
    relatedSlugs: string[];
    metaTitle: string;
    metaDescription: string;
    // 13-section blueprint fields (all optional)
    whatIs?: string;                    // "What is [Service]" explainer paragraph
    personas?: ServicePersona[];        // "Who Is This For" cards (4 per service, 2×2 grid)
    catchAllText?: string;              // Catch-all text line below persona cards
    benefits?: ServiceBenefit[];        // Benefits grid
    subServices?: SubService[];         // Sub-services/deliverables grid (replaces plain deliverables list)
    comparisonRows?: ComparisonRow[];   // Two-column "Us vs Others" comparison cards
    resultHighlights?: ResultHighlight[]; // Stat highlight cards (metric + description)
    differentiators?: Differentiator[]; // "Why Aurelius Media" cards
}
```

### Blog Frontmatter Schema (`src/lib/blog.ts` via Markdown)
```tsx
export interface BlogPostMeta {
    slug: string; // Inferred from filename (.mdx)
    title: string;
    excerpt: string;
    date: string; // YYYY-MM-DD
    category: string;
    author: string; // Default: 'Ayush Pant'
    authorRole: string; // Default: 'Founder, Aurelius Media'
    readTime: string; // Generated automatically
    featured?: boolean;
    ogImage?: string;
    metaTitle?: string;
    metaDescription?: string;
}
// BlogPost interface also includes raw `content: string`
```
To add new content, simply drop markdown files in `content/blog/` or append an object to the array in `servicePages.ts`.

## 8. SEO & Internal Linking Strategy
- **Metadata:** All pages export a `metadata` object. Dynamic pages use `generateMetadata`. Root layout sets `metadataBase: new URL("https://www.aureliusmedia.co")` and `alternates.canonical: "./"` — Next.js auto-generates self-referencing `<link rel="canonical">` for every page.
- **Programmatic Scale:** The `/services/[slug]` structure is designed to be easily duplicated for hundreds of keywords targeting programmatic SEO landing pages in the future.
- **Schema:** We inject standard JSON-LD Schema (Organization) globally in `layout.tsx`. Service pages also inject FAQPage, Service, and BreadcrumbList JSON-LD schema.

**Internal Linking Strategy:**
- **Header Navigation:** The mega-menu routes primarily to Category Pillar Pages (`/categories/performance-marketing`), not directly to the 28 deep service pages.
- **Homepage Linking:** The `ServicesOverview` module links to 6 category cards (Paid Media, Growth Engine, Creative Studio, AI & Build, Industry Verticals, Full Funnel Marketing) which each link to a representative service page.
- **Service Pages Linking:** Every service page concludes with a "Related Services" block cross-linking siblings (`relatedSlugs` in schema), pushing link equity laterally across hubs.
- **Blog Cross-Linking:** **(TODO)** Blog posts currently do not auto-embed or cross-link explicitly back to conversion/service pages. Future agents should introduce inline CTA links inside `.mdx` parsing.

## 8b. Service Page Section Blueprint (V2)
Each service page (`ServicePageClient.tsx`) follows this section structure:
1. **Hero + Lead Capture** — Breadcrumbs, category badge, headline, description, 3 positive value-prop bullets (from `benefits`), inline lead capture form (white card, right column), secondary CTAs. Hero value props use checkmark icons paired with positive benefit titles (NOT pain points).
2. **Social Proof Bar** — Scrolling client logo carousel (same logos as homepage Hero)
3. **What is [Service]** — Explanatory overview paragraph (optional, renders if `whatIs` exists)
4. **Who Is This For** — 3 persona cards describing ideal clients (optional, renders if `personas` exists)
5. ~~**Sound Familiar?**~~ — **REMOVED** (V2 audit). Pain is established in hero subtitle; section was redundant.
6. **How We Do It** — Approach paragraph + checklist from `approachPoints`
7. **Benefits** — 6 benefit cards (optional, renders if `benefits` exists)
8. **Sub-Services / What's Included** — Numbered deliverable cards from `subServices`, falls back to plain `deliverables` list
9. **What Sets Aurelius Media Apart** — Two-column "Other Agencies vs Aurelius Media" card layout with X/checkmark icons and warm gradient glow (optional, renders if `comparisonRows` exists). Heading: "What sets Aurelius Media apart?" (previously "But, why would you want to work with us?"). AI/automation row auto-appended.
10. **Results / Case Studies** — Stat highlight cards with context labels (metric + timeframe description) from `resultHighlights`
11. **Client Testimonials** — 3-card carousel per service (data stored in `serviceTestimonialKeys` map inside component)
12. **FAQ** — FAQAccordion component with FAQPage JSON-LD schema. Service-specific FAQs + 6 common FAQs appended via `getCommonFAQs()` (8-10 per page). First 3 expanded by default.
13. **Related Services** — Cross-linked sibling service cards from `relatedSlugs`
14. **Related Articles** — Blog posts filtered by `serviceBlogCategoryMap` in page.tsx (category-based). Only shows if matching articles exist.
15. **Final CTA** — Inline lead capture form (Name + Email + Phone) + dual buttons (Book a Strategy Call + Explore All Services) + trust copy
16. **WhatsApp Floating CTA** — Fixed bottom-right green button (#25D366), appears after 30% scroll, hides when final CTA in viewport, pre-populated message with service name
17. **JSON-LD Structured Data** — FAQPage, Service, and BreadcrumbList schemas auto-generated per page in page.tsx

## 9. Pages Built
Every active route in the codebase and its status:

**Homepage section order** (as of March 2026):
`Hero → MissionStatement (BlurReveal) → FeaturedResults → ServicesOverview → TestimonialsCarousel → CapabilitiesPanel → BlogPreview → CTABlock`

**ServicesOverview 6 category cards** (as of March 2026):
1. Paid Media → `/services/google-ads`
2. Growth Engine → `/services/marketing-strategy-audit`
3. Creative Studio → `/services/creative-design`
4. AI & Build → `/services/ai-automation`
5. Industry Verticals → `/services/book-marketing`
6. Full Funnel Marketing → `/services/marketing-strategy-audit`

| Route | Page Title | Status |
|-------|-----------|--------|
| `/` | Home | Complete |
| `/services` | Services Hub | Complete |
| `/services/marketing-strategy-audit` | Marketing Strategy Audit | Complete |
| `/services/google-ads` | Google Ads | Complete |
| `/services/meta-ads` | Meta Ads | Complete |
| `/services/ai-creative-design` | AI Creative Design | Complete |
| `/services/creative-design` | Creative & Design | Complete |
| `/services/reels-editing` | Reels & Shorts Editing | Complete |
| `/services/book-marketing` | Book Marketing | Complete |
| `/services/education-marketing` | Education Marketing | Complete |
| `/services/ai-automation` | AI Automation | Complete |
| `/services/no-code-development` | No-Code Development | Complete |
| `/services/ai-workshops` | AI Workshops | Complete |
| `/services/real-estate-marketing` | Real Estate Marketing | Complete |
| `/services/linkedin-ads` | LinkedIn Ads | Complete |
| `/services/youtube-ads` | YouTube Ads | Complete |
| `/services/tiktok-ads` | TikTok Ads | Complete |
| `/services/retargeting` | Retargeting & Remarketing | Complete |
| `/services/lead-generation` | Lead Generation | Complete |
| `/services/funnel-building` | Funnel Building | Complete |
| `/services/cro` | Conversion Rate Optimization | Complete |
| `/services/programmatic-seo` | Programmatic SEO | Complete |
| `/services/analytics-reporting` | Analytics & Reporting | Complete |
| `/services/email-lifecycle` | Email & Lifecycle Marketing | Complete |
| `/services/brand-videos` | Brand Videos | Complete |
| `/services/ugc-ads` | UGC Ads | Complete |
| `/services/landing-pages` | Landing Pages | Complete |
| `/services/content-strategy` | Content Strategy | Complete |
| `/services/pitch-decks` | Pitch Decks | Complete |
| `/services/ai-agents` | AI Agents | Complete |
| `/categories/[slug]` | Category Pages Template | Complete |
| `/blog` | Blog Hub | Complete |
| `/blog/[slug]` | Blog Post Template | Complete |
| `/blog/meta-ads-vs-google-ads-budget-2026` | Meta Ads vs Google Ads | Complete |
| `/blog/vibe-coding-explained-build-saas-weekend` | Vibe Coding Explained | Complete |
| `/blog/performance-max-2026-hero-or-villain` | Performance Max 2026 | Complete |
| `/blog/instagram-growth-strategy-for-authors-2026` | Instagram Growth for Authors | Complete |
| `/contact` | Contact | Complete |
| `/admin/leads` | Admin Dashboard | Complete |

## 10. Known Issues & TODOs (from recent audit)
- ✅ **RESOLVED — Blog Links:** Homepage `BlogPreview` now correctly links to real published slugs.
- ✅ **RESOLVED — Capabilities Panel Mobile:** Grid now uses `grid-cols-4 sm:grid-cols-5 lg:grid-cols-7` — responsive on all screen sizes.
- ✅ **RESOLVED — Testimonials Repetition:** Each person appears in exactly one row (Cameron+Karan → row1, Tom+Ira → row2, Nidhi → row3).
- ✅ **RESOLVED — MDX Table Rendering:** `remark-gfm` added; tables render correctly in blog posts.
- 🔴 **Blog Images:** `ogImage` is optional — posts without it render a branded gradient fallback (gradient + ghosted title text). No broken UI, but real images would improve CTR.
- 🔴 **Metadata outdated:** Global OG description in `layout.tsx` still references `"100CR+"` — should be updated to `"$15M+"`.
- 🟡 **Shader Accessibility:** `AnoAI` WebGL shader on the hero does not respect `prefers-reduced-motion`.
- 🟡 **Blog Cross-Linking:** Blog posts do not auto-link back to service pages. Future: add inline CTA links inside `.mdx` files or via a custom MDX component.
- ✅ **RESOLVED — About page:** Removed. 301 redirect to `/#how-it-works` via `next.config.ts`.
- ✅ **RESOLVED — Contact page:** Complete with lead capture form (Supabase), Cal.com placeholder, SVG social icons, email `ayush@aureliusmedia.co`.
- 🟡 **Cal.com embed:** Contact page uses placeholder — integrate real Cal.com scheduling widget when ready.

## 11. Build & Deploy

### Environment Variables
| Variable | Purpose | Status |
|----------|---------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for leads database | Active |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key for client-side access | Active |
| `RESEND_API_KEY` | Resend email service for lead notifications | Active |
| `ADMIN_PASSWORD` | Password for `/admin/leads` dashboard access | Active |
| `ANALYTICS_ID` | PostHog / Google Analytics tracking keys | Planned |

### Local Development
- **Dev:** `npm run dev`
- **Build:** `npm run build` (Ensures all static params are valid)
- **Start Prod Server:** `npm run start`
- **Deploy:** `vercel --prod --yes` (Vercel CLI)
- **Live URL:** `https://www.aureliusmedia.co`

## 12. Rules for AI Agents
If you are modifying this codebase:
1. **Never use standard Tailwind colors** (e.g., `text-red-500`, `bg-blue-600`). ALWAYS use `brand-accent`, `brand-dark`, `brand-card`, etc.
2. **Never compromise the aesthetic.** Strive for high-end SaaS visuals. If adding a component, add a subtle border (`border-brand-border-subtle`), a soft glow, or smooth transition. No boring wireframes.
3. If importing `next/image`, always use `object-cover` and realistic `sizes` attributes for performance, or `next/image` will throw warnings.
4. Update `SITEMAP_REFERENCE.json` if you add a new page or route.
5. Do NOT change architecture (e.g., switching to standard generic APIs) without explicit user permission. The static data structure is intentional for V1 speed.

## 13. Changelog
- **March 2026:** Moved Services to specific nested subroutes (`/services/[slug]`), added 12 core services.
- **March 2026:** Migrated Home page to use specialized components under `/sections`.
- **March 2026:** Updated Deliverables mapping across service pages to use custom SVG icons instead of dots.
- **March 2026:** Added dynamic heroImage banner support to Service pages.
- **March 14, 2026:** Expanded `PROJECT_CONTEXT.md` with full route table, dependencies, environment expectations, design system details, data schemas, and internal linking strategy. Generated `SITEMAP_REFERENCE.json`.
- **March 15, 2026:** Wrote 3 new blog posts from content strategy CSV (`meta-ads-vs-google-ads-budget-2026`, `vibe-coding-explained-build-saas-weekend`, `performance-max-2026-hero-or-villain`). Published user-added post (`instagram-growth-strategy-for-authors-2026`) with corrected frontmatter schema.
- **March 15, 2026:** Switched blog MDX rendering from client-side `next-mdx-remote` + `serialize()` to `next-mdx-remote/rsc` server component. Added `remark-gfm` for table support. Fixed blog hero layout (unified header+image, branded gradient fallback, author in hero, removed duplicate author box).
- **March 15, 2026:** Fixed Footer nav: removed Events, Case Studies, AI Workshops; updated Services links to match published service pages.
- **March 15, 2026:** Fixed CapabilitiesPanel mobile: replaced hardcoded 7-column inline style with responsive `grid-cols-4 sm:grid-cols-5 lg:grid-cols-7` Tailwind class.
- **March 15, 2026:** Fixed Hero mobile: CTA buttons are pill-shaped `rounded-full`, subtitle constrained to `max-w-md`, logo/brand text always left-aligned with `whitespace-nowrap`.
- **March 15, 2026:** Added `BlurReveal` component (`src/components/ui/BlurReveal.tsx`) — IntersectionObserver-based scroll blur reveal. Applied only to `MissionStatement` on homepage.
- **March 15, 2026:** Rewrote `TestimonialsCarousel` from vertical floating columns to 3 horizontal CSS marquee rows (RTL 18s → LTR 20s → RTL 22s). Added `scroll-rtl` / `scroll-ltr` keyframes and animation classes to `globals.css`. Each person appears in exactly one row.
- **March 15, 2026:** Updated homepage section order: Hero → MissionStatement → FeaturedResults → ServicesOverview → CapabilitiesPanel → TestimonialsCarousel → BlogPreview → CTABlock.
- **March 18, 2026:** Updated homepage `ServicesOverview` 6 category cards: Paid Media, Growth Engine, Creative Studio, AI & Build (code brackets icon), Industry Verticals (building icon), Full Funnel Marketing (funnel icon). Card design, glow effects, and layout unchanged.
- **March 18, 2026:** Rewrote `ServicePageClient.tsx` from 9-section layout to 13-section programmatic SEO blueprint. New sections: Social Proof Bar (client logo carousel), What is [Service], Who Is This For (persona cards), Benefits grid, Sub-Services grid, Comparison (two-column card layout), Results stat highlights, Why Aurelius Media (differentiator cards).
- **March 18, 2026:** Extended `ServiceData` interface with 7 new optional fields: `whatIs`, `personas`, `benefits`, `subServices`, `comparisonRows`, `resultHighlights`, `differentiators`. All 12 services populated with unique SEO-optimized content for every new section.
- **March 18, 2026:** Redesigned Comparison section from table to two-column card layout matching previous site design: "Other Agencies" (X icons, muted text) vs "Aurelius Media" (checkmarks, white text, warm radial gradient glow, pulsing red dot + logo).
- **March 18, 2026:** V2 service page improvements (15-task list + 10-item V2 audit):
  - Added inline lead capture form to hero (white card, right column, fields: Name, Email, Phone, Industry, Budget)
  - Expanded FAQs to 8-10 per service (6 common questions auto-appended via `getCommonFAQs()`, first 3 expanded by default)
  - Added FAQPage, Service, and BreadcrumbList JSON-LD structured data to all service pages
  - Strengthened final CTA with inline form (Name + Email + Phone) + dual buttons + trust copy
  - Expanded testimonials from single quote to 3-card carousel per service
  - Removed dedicated "Why Aurelius Media" differentiators section, merged unique points into comparison rows
  - Trimmed "Sound familiar?" pain points from 6 to 3 cards, then removed entirely in V2
  - Added AI/automation row auto-appended to every comparison section
  - Added context labels under proof stats (metric + timeframe description)
  - Added WhatsApp floating CTA (green button, appears after 30% scroll, dynamic pre-filled message)
  - Fixed hero value props: checkmarks now show positive benefit outcomes instead of pain points
  - Fixed comparison heading from "But, why would you want to work with us?" to "What sets Aurelius Media apart?"
  - H3 keyword optimization for benefits + sub-services in no-code-development, ai-workshops, and real-estate-marketing
  - Implemented category-based blog article filtering per service page via `serviceBlogCategoryMap`
  - Verified internal linking in sub-services grid and aligned related articles with service keywords
- **March 18, 2026:** Expanded service pages from 12 to 28. Added 16 new services: linkedin-ads, youtube-ads, tiktok-ads, retargeting, lead-generation, funnel-building, cro, programmatic-seo, analytics-reporting, email-lifecycle, brand-videos, ugc-ads, landing-pages, content-strategy, pitch-decks, ai-agents. All populated with full V2 blueprint content.
- **March 18, 2026:** Added bento grid layout (`src/components/ui/bento-grid.tsx`) for service cards on homepage `ServicesOverview` and `/services` hub. Cards use `rounded-[20px]`, orange hover border glow.
- **March 18, 2026:** Added Lucide icon support to `ServicePersona` interface and persona cards on service pages.
- **March 18, 2026:** Complete design token migration per `Aurelius-Design-Token-Migration.pdf`:
  - **Colors:** 3-tier dark surface system (`#0B0B0D` → `#131316` → `#1C1C20` → `#252529`). New orange accent palette (`#E8550F` fill, `#FF7A3D` text, `#FF6B2B` hover, `#C0420A` pressed).
  - **Typography:** Body font swapped from Plus Jakarta Sans → Inter. Heading font swapped from Playfair Display → Plus Jakarta Sans (weight 800, letter-spacing -0.03em). All `font-display italic` patterns replaced with `.gradient-text` (orange gradient).
  - **Borders/Radius:** Cards `rounded-[20px]`, CTA buttons `rounded-[20px]`, floating pill navbar `rounded-[20px]`.
  - **Buttons:** `.cta-primary` gradient fill (`#FF6B2B → #E8550F`) with inset highlight + orange glow shadow. Added `.btn-ghost`, `.btn-outline-or`.
  - **Navbar:** Floating pill style — `fixed left-4 right-4 top-4` on scroll, `backdrop-filter: blur(16px)`.
  - **Atmospheric:** Stronger hero radial glow, CTA section warm gradient bg + orange border card, grid texture (64px, 2.5% white lines).
  - **Section labels:** `.section-label` class with dashed prefix (20px × 2px orange line).
  - **Scope:** 21 files modified. Visual-only change — no structure, content, or functionality modifications.
- **March 18, 2026:** Comparison section heading contrast: "Aurelius Media" rendered in `.gradient-text` on service pages.
- **March 19, 2026:** Rewrote `TestimonialsCarousel` from 3 horizontal marquee rows to 3 vertical columns with alternating scroll directions (down 40s → up 45s → down 42s). Fixed-height container (550/600px) with top/bottom fade gradients. Creates dense "wall of testimonials" illusion.
- **March 19, 2026:** Reordered homepage sections: Testimonials moved right after ServicesOverview, CapabilitiesPanel (Digital CMO) moved below. New order: Hero → MissionStatement → FeaturedResults → ServicesOverview → TestimonialsCarousel → CapabilitiesPanel → BlogPreview → CTABlock.
- **March 19, 2026:** Contained `FeaturedResults` case studies carousel within `max-w-7xl` (no longer edge-to-edge). Switched from JS requestAnimationFrame to CSS `animate-scroll-rtl-slow` animation. Cards enlarged to 400×460px on desktop. Swapped images for Stealth Health Tech Startup and Private University.
- **March 19, 2026:** Changed service page lead gen form budget options from INR (₹1L–₹20L+) to USD ($1,000–$20,000+).
- **March 19, 2026:** Fixed Hero sub-headline text clipping on mobile: widened from `max-w-md` to `max-w-lg` with `px-2` padding.
- **March 19, 2026:** Blog redesign per Blog Style Tile v1.0:
  - **Blog listing page (`BlogListClient.tsx`):** Redesigned header ("Latest insights." with gradient text + subtitle), horizontal category filter pills, featured post as 2-column hero card (image left, content right), 3-column card grid with 20px radius + orange hover glow + 3px lift + author photo avatars, "Load more" ghost button, warm-gradient newsletter CTA section with email input.
  - **Blog post page (`BlogPostClient.tsx`):** Centered article header (category pill + read time → large title → author photo + name/role + date), 900px-wide hero image with 16:9 ratio + 20px radius, 680px article body using `.blog-article` CSS class (Inter 16px/1.75, orange list markers, orange-bordered pull quotes, code blocks with language header bar + copy button), redesigned author card (photo + bio), warm-gradient inline CTA, "Keep reading" related posts 3-column grid, newsletter CTA at bottom.
  - **Server component (`page.tsx`):** Now fetches and passes `relatedPosts` (same category prioritized, max 3) to BlogPostClient.
  - **Homepage blog preview (`BlogPreview.tsx`):** Updated cards to match new listing card style (20px radius, orange hover border, 200px image height, category tag pills, author photo avatars, short date format).
  - **`globals.css`:** Added comprehensive `.blog-article` typography styles (headings, body, links, lists, blockquotes, code, tables, images, hr) replacing inline MDX component classes.
- **March 19, 2026:** Added self-referencing canonical URLs to all pages via `metadataBase` + `alternates.canonical` in root `layout.tsx`. Next.js auto-generates `<link rel="canonical" href="https://www.aureliusmedia.co/...">` for every route.
- **March 19, 2026:** Added reusable blog content components to `globals.css`: `.blog-tree` (visual hierarchy diagrams with hub/cluster/item structure), `.blog-callout` (tip/info boxes with orange left border), `.blog-stats` (3-column responsive stat cards). Replaced broken Unicode tree diagram in `is-programmatic-seo-dead-in-2026.mdx` with `.blog-tree` component markup.
- **March 20, 2026:** Deployed to Vercel production at `aureliusmedia.co`. DNS configured (A record → 76.76.21.21, CNAME www → cname.vercel-dns.com).
- **March 20, 2026:** Updated social media links site-wide: LinkedIn (`linkedin.com/in/ayushpant/`), X (`x.com/FollowAurelius`), Instagram (`instagram.com/aurelius.media`).
- **March 20, 2026:** Removed Google/Meta Certified badges from footer. Changed footer heading colors from `text-brand-gold` to `text-brand-accent`.
- **March 20, 2026:** Rewrote `TestimonialsCarousel` mobile layout: 3 horizontal rows (RTL/LTR/RTL) with each row featuring a single person (Cameron/Tom/Karan). Desktop: 3 vertical columns (56s/63s/59s). Mobile rows: 45s/40s/47s.
- **March 20, 2026:** Fixed Header mobile menu z-index: drawer moved outside `<header>` as sibling with `z-[60]`. Made header fully opaque (no transparency). CTA text changed to "Join the Client Waitlist". Nav "About" redirects to `/#how-it-works`.
- **March 20, 2026:** Removed `/about` page entirely. Added 301 redirect in `next.config.ts` (`/about` → `/#how-it-works`).
- **March 20, 2026:** Removed `line-clamp` truncation from service pages (personas, testimonials, related services) for mobile readability.
- **March 20, 2026:** Added leads system: Supabase database, `/api/leads` POST endpoint, admin dashboard at `/admin/leads` with password auth, Resend email notifications.
- **March 20, 2026:** Contact page completed: lead capture form (name, email, phone, company, service, message), Cal.com booking placeholder, email updated to `ayush@aureliusmedia.co`, SVG social icons matching footer style.
- **March 20, 2026:** Added `robots.txt` and `sitemap.ts` for SEO. Increased FeaturedResults mobile speed by 25%.
