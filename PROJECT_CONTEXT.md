# Aurelius Media — Project Context

Welcome to the **Aurelius Media** codebase! This file acts as your ultimate source of truth. As an AI agent working on this repository, you should read this before making any architectural or design decisions. 

## 1. Project Overview
- **Project Name:** Aurelius Media Website
- **Purpose:** A premium, "wow-factor" corporate website for an AI-powered performance marketing agency. It aims to attract VC-backed startups and enterprise clients.
- **Goals:** High-end aesthetic (SaaS-like, dark mode, cinematic), fast performance, programmatic SEO structure for scaling content, and highly readable capabilities overviews.
- **Current Status:** Main pages built (Home, About, Services Hub, Service Sub-pages, Categories, Blog, Contact). 12 specific service pages built with programmatic routing. 4 blog posts live. All core homepage sections complete with scroll animations and marquee testimonials.
- **Live URL:** `http://localhost:3000` (Currently in local development)

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
    /about             # About page route
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
  /lib                 # Utilities (blog parser, hooks, schema.ts, utils.ts)
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
- **Horizontal Marquee (Testimonials):** CSS-only infinite scroll via `@keyframes scroll-rtl` / `scroll-ltr` defined in `globals.css`. Pattern: duplicate array ×2, wrap in `flex gap-4` with the animation class, add left/right fade overlays. `group-hover:[animation-play-state:paused]` pauses on hover. Animation classes: `.animate-scroll-rtl` (18s), `.animate-scroll-ltr` (20s), `.animate-scroll-rtl-slow` (22s). Always use CSS classes — not inline `style={{ animation: '...' }}` — for reliable cross-browser behavior.
- **Responsive Images:** We use `next/image` with `object-cover` for nearly all images to retain aspect ratios nicely.
- **Naming:** PascalCase for React components, camelCase for variables/functions.

## 6. Design System
We employ a sleek, dark-mode-first luxury aesthetic. 

**Colors (Tailwind `@theme` in `globals.css`):**
- System Dark: `var(--color-brand-dark)` `#0A0A0F`
- Off-Dark: `var(--color-brand-darker)` `#111118`
- Cards: `var(--color-brand-card)` `#16161E`
- Primary Accent (Red/Orange): `var(--color-brand-accent)` `#DC4632`
- Secondary Accent (Gold): `var(--color-brand-gold)` `#C8A951`
- Text (White & Gray): `#FFFFFF` and `#A0A0B0`

**Typography:**
- Headers: `Playfair Display` (often italicized for style: `font-display italic font-normal`)
- Body/UI: `Plus Jakarta Sans` (`font-sans`)
- Eyebrows/Tech specs: `JetBrains Mono` (`font-mono`)

**Spacing & Layout:**
- **Max Width:** Most content is contained within `max-w-7xl` (1280px) or `max-w-6xl` containers to ensure readability on ultrawide monitors.
- **Section Padding:** The standard vertical padding wrapper is `py-16 sm:py-24` or applied directly via custom CSS `.section-padding` (`padding: clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)`).
- **Grids:** Standard gap spacing is `gap-4 sm:gap-6` or `gap-8` depending on card size. 

**Breakpoints:**
- Standard Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- **Mobile Patterns:** Multi-column layouts must always collapse to `grid-cols-1` on mobile to preserve legibility (e.g., `grid-cols-1 md:grid-cols-3`). 

**Animation Standards:**
- **Classes:** `animate-fade-in-up`, `animate-fade-in`, `animate-slide-in-right`, `animate-pulse-glow`, `animate-marquee`, `animate-scroll-rtl`, `animate-scroll-ltr`, `animate-scroll-rtl-slow`, `animate-logo-scroll`.
- **Durations:** `fade-in-up` defaults to 0.7s ease-out. Marquee rows: 18s / 20s / 22s.
- **Staggers:** When iterating mapping over arrays, use inline styles for staggered entries: `style={{ animationDelay: \`${i * 0.1}s\` }}`.
- **Rule:** All animations must be defined as named CSS classes in `globals.css`. Never use inline `style={{ animation: '...' }}` for scroll/marquee effects.

**Card Patterns:**
- Backgrounds usually `bg-brand-card` with `border border-brand-border-subtle`.
- Hover states include `hover:border-brand-border-hover transition-colors duration-300` and often a slight `hover:-translate-y-0.5` lift.
- Sharp corners are forbidden; always use `rounded-xl` or `rounded-2xl`.

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
    category: 'performance' | 'creative' | 'growth' | 'industry';
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
    personas?: ServicePersona[];        // "Who Is This For" cards
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
- **Metadata:** All pages export a `metadata` object. Dynamic pages use `generateMetadata`.
- **Programmatic Scale:** The `/services/[slug]` structure is designed to be easily duplicated for hundreds of keywords targeting programmatic SEO landing pages in the future.
- **Schema:** We inject standard JSON-LD Schema (Organization) globally in `layout.tsx`. Service pages also inject FAQPage, Service, and BreadcrumbList JSON-LD schema.

**Internal Linking Strategy:**
- **Header Navigation:** The mega-menu routes primarily to Category Pillar Pages (`/categories/performance-marketing`), not directly to the 12 deep service pages.
- **Homepage Linking:** The `ServicesOverview` module links to 6 category cards (Paid Media, Growth Engine, Creative Studio, AI & Build, Industry Verticals, Full Funnel Marketing) which each link to a representative service page.
- **Service Pages Linking:** Every service page concludes with a "Related Services" block cross-linking siblings (`relatedSlugs` in schema), pushing link equity laterally across hubs.
- **Blog Cross-Linking:** **(TODO)** Blog posts currently do not auto-embed or cross-link explicitly back to conversion/service pages. Future agents should introduce inline CTA links inside `.mdx` parsing.

## 8b. Service Page 13-Section Blueprint
Each service page (`ServicePageClient.tsx`) follows this section structure:
1. **Hero + Lead Capture** — Breadcrumbs, category badge, headline, description, dual CTAs, optional hero image
2. **Social Proof Bar** — Scrolling client logo carousel (same logos as homepage Hero)
3. **What is [Service]** — Explanatory overview paragraph (optional, renders if `whatIs` exists)
4. **Who Is This For** — 3 persona cards describing ideal clients (optional, renders if `personas` exists)
5. **Sound Familiar? (The Problem)** — Pain point cards from `problems` array
6. **How We Do It** — Approach paragraph + checklist from `approachPoints`
7. **Benefits** — 6 benefit cards (optional, renders if `benefits` exists)
8. **Sub-Services / What's Included** — Numbered deliverable cards from `subServices`, falls back to plain `deliverables` list
9. **Comparison** — Two-column "Other Agencies vs Aurelius Media" card layout with X/checkmark icons and warm gradient glow (optional, renders if `comparisonRows` exists)
10. **Results / Case Studies** — Stat highlight cards from `resultHighlights`, falls back to placeholder text
11. **Client Testimonial** — Per-service testimonial (data stored in component)
12. **Why Aurelius Media** — Differentiator cards (optional, renders if `differentiators` exists)
13. **FAQ** — FAQAccordion component with schema markup
14. **Related Services** — Cross-linked sibling service cards
15. **Final CTA** — Book a Strategy Call + Explore All Services

## 9. Pages Built
Every active route in the codebase and its status:

**Homepage section order** (as of March 2026):
`Hero → MissionStatement (BlurReveal) → FeaturedResults → ServicesOverview → CapabilitiesPanel → TestimonialsCarousel → BlogPreview → CTABlock`

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
| `/about` | About | In Progress |
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
| `/categories/[slug]` | Category Pages Template | Complete |
| `/blog` | Blog Hub | Complete |
| `/blog/[slug]` | Blog Post Template | Complete |
| `/blog/meta-ads-vs-google-ads-budget-2026` | Meta Ads vs Google Ads | Complete |
| `/blog/vibe-coding-explained-build-saas-weekend` | Vibe Coding Explained | Complete |
| `/blog/performance-max-2026-hero-or-villain` | Performance Max 2026 | Complete |
| `/blog/instagram-growth-strategy-for-authors-2026` | Instagram Growth for Authors | Complete |
| `/contact` | Contact | In Progress |

## 10. Known Issues & TODOs (from recent audit)
- ✅ **RESOLVED — Blog Links:** Homepage `BlogPreview` now correctly links to real published slugs.
- ✅ **RESOLVED — Capabilities Panel Mobile:** Grid now uses `grid-cols-4 sm:grid-cols-5 lg:grid-cols-7` — responsive on all screen sizes.
- ✅ **RESOLVED — Testimonials Repetition:** Each person appears in exactly one row (Cameron+Karan → row1, Tom+Ira → row2, Nidhi → row3).
- ✅ **RESOLVED — MDX Table Rendering:** `remark-gfm` added; tables render correctly in blog posts.
- 🔴 **Blog Images:** `ogImage` is optional — posts without it render a branded gradient fallback (gradient + ghosted title text). No broken UI, but real images would improve CTR.
- 🔴 **Metadata outdated:** Global OG description in `layout.tsx` still references `"100CR+"` — should be updated to `"$15M+"`.
- 🟡 **Shader Accessibility:** `AnoAI` WebGL shader on the hero does not respect `prefers-reduced-motion`.
- 🟡 **Blog Cross-Linking:** Blog posts do not auto-link back to service pages. Future: add inline CTA links inside `.mdx` files or via a custom MDX component.
- 🟡 **About & Contact pages:** Both are marked "In Progress" — no substantial content yet.

## 11. Build & Deploy

### Environment Variables
| Variable | Purpose | Status |
|----------|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | Base URL for OG image generation and canonical URIs | Planned |
| `CONTACT_FORM_API_KEY` | Backend mapping for the `/contact` form submissions | Planned |
| `ANALYTICS_ID` | PostHog / Google Analytics tracking keys | Planned |
*(Note: As of now, the application functions fully entirely without `.env` files.)*

### Local Development
- **Dev:** `npm run dev`
- **Build:** `npm run build` (Ensures all static params are valid)
- **Start Prod Server:** `npm run start`
- Deployment target will be **Vercel** with zero-config needed.

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
