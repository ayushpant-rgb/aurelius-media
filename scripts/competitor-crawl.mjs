#!/usr/bin/env node
/**
 * Aurelius Media — Competitor Crawl Script
 * Uses FireCrawl API to map + crawl 3 competitor sites and generate
 * a structured analysis report for use in site planning.
 *
 * Usage:
 *   node scripts/competitor-crawl.mjs
 *   node scripts/competitor-crawl.mjs --limit 50   (pages per site)
 *   node scripts/competitor-crawl.mjs --site webfx  (single site)
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'docs', 'competitor-data');

const FIRECRAWL_API_KEY = 'fc-b0bb5a18b2834c48ae889a6c4f40e60d';
const BASE_URL = 'https://api.firecrawl.dev/v1';

const COMPETITORS = [
  { name: 'WebFX',                 url: 'https://www.webfx.com',              slug: 'webfx'       },
  { name: 'Disruptive Advertising', url: 'https://disruptiveadvertising.com', slug: 'disruptive'  },
  { name: 'Thrive Agency',          url: 'https://thriveagency.com',          slug: 'thrive'      },
];

// CLI args
const args = process.argv.slice(2);
const limitArg  = args.indexOf('--limit');
const siteArg   = args.indexOf('--site');
const PAGE_LIMIT = limitArg !== -1 ? parseInt(args[limitArg + 1], 10) : 100;
const ONLY_SITE  = siteArg  !== -1 ? args[siteArg + 1] : null;

// ─── Helpers ────────────────────────────────────────────────────────────────

function log(msg) { console.log(`[${new Date().toISOString().slice(11,19)}] ${msg}`); }

async function fc(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`FireCrawl ${method} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/** Poll a crawl job until it's done, with exponential backoff */
async function pollCrawl(jobId, siteName) {
  let attempts = 0;
  let allData = [];
  let nextUrl = null;

  while (true) {
    attempts++;
    const path = nextUrl ? nextUrl.replace(BASE_URL, '') : `/crawl/${jobId}`;
    const result = await fc(path);

    log(`  ${siteName}: status=${result.status} pages=${result.data?.length ?? 0} (poll #${attempts})`);

    if (result.data?.length) {
      allData = allData.concat(result.data);
    }

    if (result.status === 'completed') {
      // Handle pagination if FireCrawl returns next page
      if (result.next) {
        nextUrl = result.next;
        continue;
      }
      break;
    }

    if (result.status === 'failed' || result.status === 'cancelled') {
      throw new Error(`Crawl ${jobId} ended with status: ${result.status}`);
    }

    // Still running — wait before next poll (max 30s)
    const wait = Math.min(5000 * Math.ceil(attempts / 3), 30000);
    await sleep(wait);
  }

  return allData;
}

// ─── Per-page extraction ─────────────────────────────────────────────────────

function classifyPageType(url, content) {
  const u = url.toLowerCase();
  if (u.match(/\/(blog|insights|resources|articles?|news|guides?)\//)) return 'blog';
  if (u.match(/\/(services?|capabilities|solutions?|what-we-do)\//)) return 'service';
  if (u.match(/\/(case-stud|portfolio|work|results?)\//)) return 'case-study';
  if (u.match(/\/(about|team|culture|careers?|jobs?)\//)) return 'about';
  if (u.match(/\/(contact|get-started|proposal|quote)\//)) return 'contact';
  if (u.match(/\/(pricing?|plans?|packages?)\//)) return 'pricing';
  if (u.match(/\/(industries?|sectors?|verticals?)\//)) return 'industry';
  if (u === '/' || u.endsWith('.com') || u.endsWith('.com/')) return 'home';
  return 'other';
}

function extractHeadings(markdown) {
  if (!markdown) return { h1: [], h2: [], h3: [] };
  const h1 = [...markdown.matchAll(/^#\s+(.+)$/gm)].map(m => m[1].trim());
  const h2 = [...markdown.matchAll(/^##\s+(.+)$/gm)].map(m => m[1].trim());
  const h3 = [...markdown.matchAll(/^###\s+(.+)$/gm)].map(m => m[1].trim());
  return { h1, h2, h3 };
}

function wordCount(markdown) {
  if (!markdown) return 0;
  return markdown.replace(/[#*`\[\]()]/g, '').split(/\s+/).filter(Boolean).length;
}

function urlDepth(url) {
  try {
    const path = new URL(url).pathname;
    return path.split('/').filter(Boolean).length;
  } catch {
    return 0;
  }
}

function extractCTAs(markdown) {
  if (!markdown) return [];
  // Look for button-like patterns in markdown
  const patterns = markdown.match(/\[([^\]]{3,60})\]\(/g) || [];
  return patterns
    .map(p => p.slice(1, p.indexOf(']')))
    .filter(t => /free|audit|proposal|quote|start|get|book|schedule|contact|demo|trial/i.test(t))
    .slice(0, 10);
}

function processPage(page) {
  const url = page.url || page.metadata?.url || '';
  const md  = page.markdown || '';
  const meta = page.metadata || {};
  const headings = extractHeadings(md);

  return {
    url,
    depth: urlDepth(url),
    page_type: classifyPageType(url, md),
    title: meta.title || '',
    description: meta.description || meta.ogDescription || '',
    og_title: meta.ogTitle || '',
    h1: headings.h1[0] || '',
    h2s: headings.h2.slice(0, 8),
    h3s: headings.h3.slice(0, 10),
    word_count: wordCount(md),
    ctas_found: extractCTAs(md),
    has_schema: !!(page.metadata?.jsonLd || md.includes('application/ld+json')),
    internal_links: (page.links || []).filter(l => {
      try { return new URL(l).hostname === new URL(url).hostname; } catch { return false; }
    }).length,
    content_preview: md.slice(0, 600).replace(/\n+/g, ' ').trim(),
  };
}

// ─── Site Map (fast URL discovery) ──────────────────────────────────────────

async function mapSite(url, name) {
  log(`Mapping ${name}...`);
  try {
    const result = await fc('/map', 'POST', {
      url,
      includeSubdomains: false,
      limit: 5000,
    });
    const links = result.links || [];
    log(`  ${name}: found ${links.length} URLs in sitemap`);
    return links;
  } catch (err) {
    log(`  ${name}: map failed (${err.message}) — will rely on crawl data`);
    return [];
  }
}

// ─── Full Crawl ──────────────────────────────────────────────────────────────

async function crawlSite(url, name, limit) {
  log(`Starting crawl of ${name} (limit: ${limit} pages)...`);

  const job = await fc('/crawl', 'POST', {
    url,
    limit,
    scrapeOptions: {
      formats: ['markdown', 'links'],
      onlyMainContent: true,
      excludeTags: ['nav', 'footer', 'header', 'script', 'style', '.cookie-banner', '#chat-widget'],
    },
    excludePaths: [
      '/wp-login', '/wp-admin', '/feed', '/tag/', '/page/',
      '/author/', '/amp/', '/print',
    ],
  });

  log(`  ${name}: crawl job started → id=${job.id}`);
  const pages = await pollCrawl(job.id, name);
  log(`  ${name}: crawl complete — ${pages.length} pages returned`);
  return pages;
}

// ─── Analysis & Report ───────────────────────────────────────────────────────

function buildSiteAnalysis(name, slug, mapUrls, crawlPages) {
  const processed = crawlPages.map(processPage);

  // URL taxonomy from map
  const urlTree = buildUrlTree(mapUrls);

  // Page type breakdown
  const byType = {};
  for (const p of processed) {
    byType[p.page_type] = (byType[p.page_type] || 0) + 1;
  }

  // Service pages
  const servicePages = processed.filter(p => p.page_type === 'service');
  const blogPages    = processed.filter(p => p.page_type === 'blog');

  // Top-level URL segments (navigation inference)
  const topSegments = {};
  for (const url of mapUrls) {
    try {
      const seg = new URL(url).pathname.split('/').filter(Boolean)[0];
      if (seg) topSegments[seg] = (topSegments[seg] || 0) + 1;
    } catch {}
  }
  const topNav = Object.entries(topSegments)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([seg, count]) => ({ segment: `/${seg}/`, page_count: count }));

  // Avg word count
  const avgWords = processed.length
    ? Math.round(processed.reduce((s, p) => s + p.word_count, 0) / processed.length)
    : 0;

  // Common CTAs across service pages
  const allCTAs = servicePages.flatMap(p => p.ctas_found);
  const ctaFreq = {};
  for (const c of allCTAs) ctaFreq[c] = (ctaFreq[c] || 0) + 1;
  const topCTAs = Object.entries(ctaFreq).sort((a,b) => b[1]-a[1]).slice(0,10).map(([text, freq]) => ({ text, freq }));

  return {
    meta: {
      name,
      slug,
      crawled_at: new Date().toISOString(),
      total_mapped_urls: mapUrls.length,
      total_crawled_pages: crawlPages.length,
      total_processed: processed.length,
    },
    url_taxonomy: {
      top_nav_segments: topNav,
      url_tree_sample: urlTree,
    },
    page_type_breakdown: byType,
    avg_word_count: avgWords,
    top_ctas: topCTAs,
    service_pages: servicePages,
    blog_pages: blogPages.slice(0, 30),
    all_pages: processed,
  };
}

function buildUrlTree(urls) {
  const tree = {};
  for (const url of urls) {
    try {
      const parts = new URL(url).pathname.split('/').filter(Boolean);
      const top = parts[0] || '(root)';
      if (!tree[top]) tree[top] = { count: 0, children: {} };
      tree[top].count++;
      if (parts[1]) {
        const sub = parts[1];
        tree[top].children[sub] = (tree[top].children[sub] || 0) + 1;
      }
    } catch {}
  }
  // Return top 30 sections
  return Object.entries(tree)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 30)
    .reduce((acc, [k, v]) => {
      acc[k] = {
        page_count: v.count,
        sub_sections: Object.entries(v.children)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([name, count]) => ({ name, count })),
      };
      return acc;
    }, {});
}

function generateMarkdownReport(analyses) {
  const lines = [
    `# Competitor Site Analysis Report`,
    `**Generated:** ${new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}  `,
    `**Sites analyzed:** ${analyses.map(a => a.meta.name).join(', ')}`,
    `**Purpose:** Inform Aurelius Media site architecture, service page design, and content strategy`,
    ``,
    `---`,
    ``,
  ];

  // ── Summary table ──
  lines.push(`## Summary Comparison`);
  lines.push(``);
  lines.push(`| Metric | ${analyses.map(a => a.meta.name).join(' | ')} |`);
  lines.push(`|---|${analyses.map(() => '---').join('|')}|`);
  lines.push(`| Total URLs mapped | ${analyses.map(a => a.meta.total_mapped_urls.toLocaleString()).join(' | ')} |`);
  lines.push(`| Pages crawled | ${analyses.map(a => a.meta.total_crawled_pages).join(' | ')} |`);
  lines.push(`| Service pages found | ${analyses.map(a => a.service_pages.length).join(' | ')} |`);
  lines.push(`| Blog pages found | ${analyses.map(a => a.blog_pages.length).join(' | ')} |`);
  lines.push(`| Avg word count | ${analyses.map(a => a.avg_word_count.toLocaleString()).join(' | ')} |`);
  lines.push(``);

  for (const analysis of analyses) {
    lines.push(`---`);
    lines.push(``);
    lines.push(`## ${analysis.meta.name}`);
    lines.push(``);
    lines.push(`> **${analysis.meta.total_mapped_urls.toLocaleString()} total URLs** mapped across the site  `);
    lines.push(`> **${analysis.meta.total_crawled_pages} pages** deeply crawled for content`);
    lines.push(``);

    // Nav structure
    lines.push(`### Site Structure (Top-Level Navigation Inferred from URLs)`);
    lines.push(``);
    lines.push(`| URL Segment | Page Count | Top Sub-Sections |`);
    lines.push(`|---|---|---|`);
    for (const [seg, data] of Object.entries(analysis.url_taxonomy.url_tree_sample).slice(0, 20)) {
      const subs = data.sub_sections.slice(0,5).map(s => `${s.name} (${s.count})`).join(', ');
      lines.push(`| /${seg}/ | ${data.page_count} | ${subs || '—'} |`);
    }
    lines.push(``);

    // Page type breakdown
    lines.push(`### Page Type Breakdown`);
    lines.push(``);
    for (const [type, count] of Object.entries(analysis.page_type_breakdown).sort((a,b) => b[1]-a[1])) {
      lines.push(`- **${type}**: ${count} pages`);
    }
    lines.push(``);

    // Service pages
    if (analysis.service_pages.length > 0) {
      lines.push(`### Service Pages Found (${analysis.service_pages.length})`);
      lines.push(``);
      lines.push(`| URL | H1 | Word Count | Top CTAs |`);
      lines.push(`|---|---|---|---|`);
      for (const p of analysis.service_pages.slice(0, 30)) {
        const ctas = p.ctas_found.slice(0,2).join(', ');
        lines.push(`| ${p.url} | ${p.h1 || '—'} | ${p.word_count.toLocaleString()} | ${ctas || '—'} |`);
      }
      lines.push(``);

      // H2 patterns from service pages
      const allH2s = analysis.service_pages.flatMap(p => p.h2s);
      const h2Freq = {};
      for (const h of allH2s) {
        const key = h.toLowerCase().replace(/\d+/g, 'N').slice(0, 50);
        h2Freq[key] = (h2Freq[key] || 0) + 1;
      }
      const topH2s = Object.entries(h2Freq).filter(([,c]) => c > 1).sort((a,b) => b[1]-a[1]).slice(0, 15);
      if (topH2s.length) {
        lines.push(`### Common H2 Patterns on Service Pages`);
        lines.push(``);
        lines.push(`These section headings appear repeatedly — they reveal the standard service page template:`);
        lines.push(``);
        for (const [h2, freq] of topH2s) {
          lines.push(`- "${h2}" × ${freq}`);
        }
        lines.push(``);
      }
    }

    // Blog structure
    if (analysis.blog_pages.length > 0) {
      lines.push(`### Blog Content (sample of ${analysis.blog_pages.length} posts)`);
      lines.push(``);
      lines.push(`| Title | Word Count | URL |`);
      lines.push(`|---|---|---|`);
      for (const p of analysis.blog_pages.slice(0, 15)) {
        lines.push(`| ${p.title || p.h1 || '—'} | ${p.word_count.toLocaleString()} | ${p.url} |`);
      }
      lines.push(``);
    }

    // CTAs
    if (analysis.top_ctas.length > 0) {
      lines.push(`### Most Common CTAs on Service Pages`);
      lines.push(``);
      for (const { text, freq } of analysis.top_ctas) {
        lines.push(`- "${text}" × ${freq}`);
      }
      lines.push(``);
    }
  }

  // ── Aurelius Comparison Section ──
  lines.push(`---`);
  lines.push(``);
  lines.push(`## Aurelius Media — Gap Analysis`);
  lines.push(``);
  lines.push(`Based on crawl data, here are the structural gaps between Aurelius and these three competitors:`);
  lines.push(``);

  const maxMapped   = Math.max(...analyses.map(a => a.meta.total_mapped_urls));
  const avgServices = Math.round(analyses.reduce((s, a) => s + a.service_pages.length, 0) / analyses.length);
  const avgWords    = Math.round(analyses.reduce((s, a) => s + a.avg_word_count, 0) / analyses.length);

  lines.push(`| Dimension | Competitors (avg) | Aurelius | Gap |`);
  lines.push(`|---|---|---|---|`);
  lines.push(`| Total site pages | ${Math.round(analyses.reduce((s,a) => s+a.meta.total_mapped_urls,0)/analyses.length).toLocaleString()} | ~23 | Massive — expected for mature agencies |`);
  lines.push(`| Service pages | ${avgServices} | 12 | Acceptable for V1 — expand with verticals |`);
  lines.push(`| Avg page word count | ${avgWords.toLocaleString()} | ~800 est. | Likely under-indexed — expand service pages |`);
  lines.push(`| Blog posts | ${Math.round(analyses.reduce((s,a) => s+a.blog_pages.length,0)/analyses.length)} crawled | 4 | High priority content gap |`);
  lines.push(``);

  lines.push(`---`);
  lines.push(``);
  lines.push(`*Report generated by \`scripts/competitor-crawl.mjs\` using FireCrawl API*`);

  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🔍 Aurelius Media — Competitor Crawl\n');
  console.log(`  Page limit per site: ${PAGE_LIMIT}`);
  if (ONLY_SITE) console.log(`  Filtering to: ${ONLY_SITE}`);
  console.log('');

  // Ensure output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    log(`Created output directory: docs/competitor-data/`);
  }

  const sites = ONLY_SITE
    ? COMPETITORS.filter(c => c.slug === ONLY_SITE || c.name.toLowerCase().includes(ONLY_SITE.toLowerCase()))
    : COMPETITORS;

  if (sites.length === 0) {
    console.error(`No matching site for --site "${ONLY_SITE}". Valid slugs: ${COMPETITORS.map(c=>c.slug).join(', ')}`);
    process.exit(1);
  }

  const analyses = [];

  for (const site of sites) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ${site.name.toUpperCase()}`);
    console.log(`${'═'.repeat(60)}\n`);

    try {
      // Step 1: Map (fast — just URLs)
      const mapUrls = await mapSite(site.url, site.name);

      // Step 2: Deep crawl (content + metadata)
      const crawlPages = await crawlSite(site.url, site.name, PAGE_LIMIT);

      // Step 3: Process + analyze
      const analysis = buildSiteAnalysis(site.name, site.slug, mapUrls, crawlPages);
      analyses.push(analysis);

      // Save per-site JSON
      const jsonPath = join(OUTPUT_DIR, `${site.slug}.json`);
      writeFileSync(jsonPath, JSON.stringify(analysis, null, 2));
      log(`Saved: docs/competitor-data/${site.slug}.json`);

      // Save per-site URL list
      const urlListPath = join(OUTPUT_DIR, `${site.slug}-urls.txt`);
      writeFileSync(urlListPath, mapUrls.join('\n'));
      log(`Saved: docs/competitor-data/${site.slug}-urls.txt (${mapUrls.length} URLs)`);

    } catch (err) {
      console.error(`\n❌ Failed to crawl ${site.name}: ${err.message}\n`);
      // Continue with other sites
    }
  }

  if (analyses.length > 0) {
    // Generate combined Markdown report
    const report = generateMarkdownReport(analyses);
    const reportPath = join(OUTPUT_DIR, 'competitor-analysis-live.md');
    writeFileSync(reportPath, report);
    log(`\nSaved combined report: docs/competitor-data/competitor-analysis-live.md`);

    console.log('\n✅ Done! Files written to docs/competitor-data/\n');
    console.log('  • competitor-analysis-live.md  — Markdown report for Notion / review');
    for (const a of analyses) {
      console.log(`  • ${a.meta.slug}.json            — Full structured data (${a.meta.total_crawled_pages} pages)`);
      console.log(`  • ${a.meta.slug}-urls.txt        — Complete URL list (${a.meta.total_mapped_urls.toLocaleString()} URLs)`);
    }
    console.log('');
  } else {
    console.log('\n❌ No analyses completed. Check errors above.\n');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
