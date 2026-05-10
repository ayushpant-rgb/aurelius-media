# Aurelius Media — Claude Code Rules

## HARD RULES (recurring bugs — read before touching anything)

### Blog ogImage: ALWAYS relative paths
`ogImage` in MDX frontmatter must be a relative path starting with `/`.
**Never** use absolute URLs like `https://www.aureliusmedia.co/blog/foo.jpg`.

**Why:** `BlogPostClient.tsx` uses `post.ogImage` directly as `<Image src>`. Next.js requires absolute-URL domains in `next.config.ts remotePatterns`. Relative paths avoid this — images live in `/public` and are served locally.

```
# CORRECT
ogImage: "/blog/foo.jpeg"

# WRONG — breaks every blog hero image on production
ogImage: "https://www.aureliusmedia.co/blog/foo.jpeg"
```

This has broken production 3 times. Do not use absolute ogImage URLs.

---

### Homepage: do not touch unless explicitly asked
Changes to service pages, blog posts, or layout do NOT justify touching homepage sections. If the task is about a specific page, stay on that page.

### Shopify push order (for atinytwisted.com work)
Always push sections/assets BEFORE templates/layout. Pushing templates first strips settings.

### Keyword research: real data only
Never brainstorm keywords. Use Search Console, Ahrefs, or GA4 data. Speculative phrases waste content effort.

### URL slugs: no years or numbers
Never add years (2026, 2025) or sequential numbers to URL slugs. Creates SEO debt when content is revisited.

## Project facts
- Stack: Next.js 16 App Router, TypeScript, Tailwind v4, Framer Motion
- Deploy: Vercel → `https://www.aureliusmedia.co`
- GitHub: `github.com/ayushpant-rgb/aurelius-media`
- Source of truth: `SITEMAP_REFERENCE.json` (architecture) — read it before structural changes
- Blog content: `content/blog/*.mdx` — static MDX, no CMS
- GA4 property: `483115288`
- All blog images live in `/public/blog/` or `/public/images/`
