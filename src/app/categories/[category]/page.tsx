import type { Metadata } from 'next';
import Link from 'next/link';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

/* ─────────────────────────────────────────────────
   CATEGORY DATA — comprehensive, SEO-optimized content
   ───────────────────────────────────────────────── */

interface ServiceItem {
    name: string;
    detail: string;
    slug?: string;
}
interface ProcessStep {
    step: string;
    title: string;
    description: string;
}
interface FAQ {
    q: string;
    a: string;
}
interface CategoryData {
    title: string;
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    subHeadline: string;
    description: string;
    whyTitle: string;
    whyDescription: string;
    whyPoints: string[];
    processTitle: string;
    processSubtitle: string;
    process: ProcessStep[];
    services: ServiceItem[];
    whoTitle: string;
    whoDescription: string;
    whoList: string[];
    stats: { value: string; label: string }[];
    faqs: FAQ[];
    ctaHeadline: string;
    ctaDescription: string;
}

const categories: Record<string, CategoryData> = {
    'performance-marketing': {
        title: 'Performance Marketing',
        metaTitle: 'Performance Marketing Agency | Aurelius Media',
        metaDescription: 'Full-funnel performance marketing across Google, Meta, LinkedIn, TikTok, and YouTube. AI-augmented bidding and real-time attribution.',
        eyebrow: 'Paid Media',
        headline: 'From ad spend to measurable revenue.',
        subHeadline: 'Performance marketing that treats every dollar as an investment — not an experiment.',
        description: 'We build and manage high-ROI paid media campaigns across Google, Meta, LinkedIn, TikTok, and YouTube. Our approach combines AI-augmented bidding, rapid creative testing, and real-time attribution so you always know what is working, what is not, and where to scale next. No vanity metrics. No wasted spend.',
        whyTitle: 'Why most paid media fails',
        whyDescription: 'Most brands overspend on ads because they lack three things: a data-informed bidding strategy, creative that actually converts, and a clear attribution model connecting spend to revenue. Without these, ad budgets become guesswork.',
        whyPoints: [
            'Ad creative fatigues after 7–14 days, but most teams only refresh monthly',
            'Platform algorithms need structured data and clear conversion events to optimize — most setups are misconfigured',
            'Without multi-touch attribution, you are optimizing for last-click and missing the full picture',
            'Scaling spend without scaling creative is the fastest way to kill ROAS',
        ],
        processTitle: 'Our performance marketing process',
        processSubtitle: 'A repeatable system that moves from audit to scale in 90 days.',
        process: [
            { step: '01', title: 'Audit & Diagnose', description: 'We audit your current ad accounts, tracking setup, creative library, and landing pages — and deliver a gap analysis with exact fixes.' },
            { step: '02', title: 'Strategy & Architecture', description: 'We design the full campaign architecture: audience segments, funnel stages, budget allocation, and conversion events — mapped to business revenue goals.' },
            { step: '03', title: 'Creative Production', description: 'Our AI-augmented creative team produces ad variants — static, video, UGC — at 10x speed. Every creative is built to a brief tied to performance data.' },
            { step: '04', title: 'Launch & Optimize', description: 'Campaigns launch across channels with daily monitoring. We use automated rules, bid adjustments, and creative rotation to maximize performance from day one.' },
            { step: '05', title: 'Measure & Scale', description: 'Weekly reporting with full-funnel attribution. We identify winning audiences and creatives, then systematically scale spend where ROAS is strongest.' },
        ],
        services: [
            { name: 'Google Ads Management', detail: 'Search, Shopping, Display, and Performance Max campaigns with keyword strategy, bid management, and continuous optimization against revenue targets.' },
            { name: 'Meta Ads (Facebook & Instagram)', detail: 'Creative-led campaigns with Advantage+ integration, dynamic creative optimization, lookalike audiences, and conversion API tracking for accurate attribution.' },
            { name: 'YouTube Advertising', detail: 'In-stream, discovery, bumper, and Shorts ad campaigns designed to drive both brand awareness and measurable downstream conversions.' },
            { name: 'TikTok Ads', detail: 'Native-first creative strategy for TikTok Spark Ads, TopView, and In-Feed placements — optimized for engagement and conversion at scale.' },
            { name: 'LinkedIn Advertising', detail: 'Sponsored content, message ads, and lead gen forms with precision targeting by job title, company size, seniority, and industry vertical.' },
            { name: 'Retargeting & Remarketing', detail: 'Cross-platform retargeting sequences across display, social, and email — designed to re-engage warm audiences and shorten the path to conversion.' },
            { name: 'Shopping & E-Commerce Ads', detail: 'Product feed optimization, Smart Shopping campaigns, and dynamic product ads for DTC and e-commerce brands selling online.' },
            { name: 'Conversion Rate Optimization', detail: 'Landing page A/B testing, UX analysis, and funnel optimization to ensure your ad traffic converts at the highest possible rate.' },
        ],
        whoTitle: 'Who this is for',
        whoDescription: 'Performance marketing works best for businesses that have product-market fit and are ready to scale acquisition profitably.',
        whoList: [
            'VC-backed startups looking to scale user acquisition with clear unit economics',
            'DTC and e-commerce brands running paid channels but struggling with ROAS',
            'B2B SaaS companies that need to generate qualified pipeline through paid media',
            'Established brands expanding into new markets or launching new products',
            'Businesses spending $10K–$500K+/month on ads who want better returns',
        ],
        stats: [
            { value: '200+', label: 'brands scaled worldwide' },
            { value: '3.8x', label: 'average ROAS across clients' },
            { value: '10x', label: 'creative production speed' },
        ],
        faqs: [
            { q: 'What is the minimum ad spend you manage?', a: 'We work with businesses spending $5,000/month and above on paid media. Our strategies are designed to scale — so we focus on building a foundation that supports growth from day one.' },
            { q: 'How quickly can we expect results?', a: 'Most clients see meaningful performance improvements within 30–60 days. The first two weeks are focused on audit, setup, and initial testing. By week 4, we have enough data to begin optimizing aggressively.' },
            { q: 'Do you handle creative production too?', a: 'Yes. Our in-house AI-augmented creative team produces ad creatives, videos, and landing pages as part of the engagement. Creative is a critical lever for performance — we do not outsource it.' },
            { q: 'How do you measure success?', a: 'We measure against revenue-driven KPIs: ROAS, cost per acquisition, pipeline generated, and blended CAC. We provide weekly reports with full-funnel attribution and clear recommendations.' },
            { q: 'Which industries do you specialize in?', a: 'We have deep experience across SaaS, e-commerce/DTC, edtech, fintech, real estate, healthcare, and professional services. Our frameworks are industry-agnostic but our execution is vertical-specific.' },
        ],
        ctaHeadline: 'Ready to make your ad spend work harder?',
        ctaDescription: 'Book a free 15-minute strategy call. We will audit your current setup, identify quick wins, and show you exactly where the growth opportunities are.',
    },
    'b2b-marketing': {
        title: 'B2B Marketing & Demand Gen',
        metaTitle: 'B2B Marketing & Demand Gen Agency | Aurelius Media',
        metaDescription: 'Account-based marketing, LinkedIn lead gen, outbound sequencing, and demand capture for B2B companies. Build qualified pipeline, not clicks.',
        eyebrow: 'B2B Growth',
        headline: 'Build pipeline. Not just traffic.',
        subHeadline: 'Demand generation strategies designed for complex B2B sales cycles — from first touch to closed deal.',
        description: 'B2B buyers do not convert from a single ad. They research, compare, consult internally, and evaluate over weeks or months. Our demand gen programs are built for this reality — combining account-based marketing, LinkedIn campaigns, outbound sequencing, and content-driven authority to fill your pipeline with qualified opportunities.',
        whyTitle: 'Why B2B marketing is different',
        whyDescription: 'B2B buying decisions involve multiple stakeholders, longer sales cycles, and higher stakes. The strategies that work for consumer brands fail in B2B because the funnel operates on trust, timing, and relevance — not impulse.',
        whyPoints: [
            'The average B2B deal involves 6–10 decision-makers — you need to reach the full buying committee',
            'Content marketing alone takes 6–12 months to generate pipeline without paid amplification',
            'Most B2B companies waste budget on broad targeting instead of focusing on accounts ready to buy',
            'Without alignment between marketing and sales, leads fall through the cracks and pipeline stalls',
        ],
        processTitle: 'Our B2B demand gen process',
        processSubtitle: 'A systematic approach to building predictable, qualified pipeline.',
        process: [
            { step: '01', title: 'ICP & Account Selection', description: 'We define your ideal customer profile using firmographic, technographic, and intent data — then build a prioritized target account list.' },
            { step: '02', title: 'Messaging & Positioning', description: 'We craft messaging frameworks that speak to each persona in the buying committee — from economic buyer to technical evaluator.' },
            { step: '03', title: 'Multi-Channel Activation', description: 'We deploy campaigns across LinkedIn Ads, Google Ads, email outbound, and content syndication — each channel optimized for its role in the funnel.' },
            { step: '04', title: 'Nurture & Follow-Up', description: 'Leads enter automated nurture sequences with personalized content, retargeting, and sales enablement materials that move them toward a decision.' },
            { step: '05', title: 'Pipeline Attribution & Optimization', description: 'We track every touchpoint from first impression to closed deal — identifying which channels, content, and campaigns drive real revenue.' },
        ],
        services: [
            { name: 'Account-Based Marketing (ABM)', detail: 'Hyper-targeted campaigns for high-value accounts at every funnel stage — awareness, engagement, and pipeline acceleration — using display, LinkedIn, and direct outreach.' },
            { name: 'LinkedIn Lead Generation', detail: 'Sponsored content, InMail, conversation ads, and lead gen forms with precision targeting by job title, company, seniority, and industry segment.', slug: 'linkedin-ads' },
            { name: 'Outbound Email Sequencing', detail: 'Multi-touch, personalized cold outbound sequences with high deliverability — designed to book meetings, not just send emails.', slug: 'email-lifecycle' },
            { name: 'Demand Capture Campaigns', detail: 'Intent-based advertising that targets buyers actively researching solutions like yours — capturing demand at the moment of highest purchase intent.', slug: 'google-ads' },
            { name: 'B2B Content Marketing', detail: 'Thought leadership articles, whitepapers, case study narratives, and pillar content that earns trust, ranks in search, and feeds your nurture sequences.', slug: 'content-strategy' },
            { name: 'Sales Funnel Automation', detail: 'CRM workflows, lead scoring models, and automated nurture sequences in HubSpot, Salesforce, or your CRM of choice — shortening the path from MQL to closed-won.', slug: 'funnel-building' },
            { name: 'Founder-Led Brand Building', detail: 'Strategic LinkedIn presence and thought leadership positioning for founders and executives — building authority that drives inbound pipeline.' },
        ],
        whoTitle: 'Who this is for',
        whoDescription: 'B2B demand gen is built for companies selling high-consideration products or services with deal sizes above $5K.',
        whoList: [
            'B2B SaaS companies that need to generate qualified pipeline and reduce CAC',
            'Professional services firms (consulting, legal, financial) seeking high-value clients',
            'Enterprise technology companies targeting specific verticals or company sizes',
            'Startups that have product-market fit and need to systematize lead generation',
            'Companies with sales teams that need better leads, not more leads',
        ],
        stats: [
            { value: '84%', label: 'average response rate on outbound' },
            { value: '300+', label: 'qualified leads per campaign' },
            { value: '45%', label: 'reduction in cost per qualified lead' },
        ],
        faqs: [
            { q: 'How is this different from just running LinkedIn Ads?', a: 'LinkedIn Ads are one channel. Our B2B programs combine ABM, outbound, content, and paid media into a coordinated system — so every touchpoint reinforces the others and pipeline builds compounding momentum.' },
            { q: 'What CRM do you work with?', a: 'We work across HubSpot, Salesforce, Pipedrive, and other major CRMs. We handle the integration, lead scoring setup, and workflow automation as part of the engagement.' },
            { q: 'How long does it take to see pipeline?', a: 'For outbound campaigns, you can expect booked meetings within 2–3 weeks. For full ABM programs, pipeline velocity typically accelerates significantly by month 2–3 as nurture sequences mature.' },
            { q: 'Do you work with early-stage startups?', a: 'Yes — as long as there is product-market fit and a clear ICP. We help startups build their first repeatable demand gen engine, then scale it as the business grows.' },
            { q: 'Can you handle sales enablement too?', a: 'We create battle cards, objection-handling guides, one-pagers, and case study narratives that arm your sales team — so the leads we generate convert at higher rates.' },
        ],
        ctaHeadline: 'Ready to build a repeatable pipeline engine?',
        ctaDescription: 'Book a free 15-minute call to discuss your ICP, target accounts, and how we can build a demand gen program around your revenue goals.',
    },
    'marketing-collaterals': {
        title: 'Marketing Collaterals',
        metaTitle: 'Creative Production | UGC, Video & Design | Aurelius Media',
        metaDescription: 'Ad creatives, brand videos, UGC ads, landing pages, pitch decks, and social assets — produced at 10x speed with AI-augmented tools.',
        eyebrow: 'Creative & Production',
        headline: 'Creative that earns attention and drives action.',
        subHeadline: 'Every asset your campaigns need — produced at 10x speed with AI-augmented tools and human creative direction.',
        description: 'Performance marketing is only as good as the creative it runs on. We produce everything from ad creatives and UGC videos to landing pages and pitch decks — all designed to convert. Our AI-augmented workflow means faster iteration, more variants to test, and creative that stays fresh instead of fatiguing.',
        whyTitle: 'Why creative is the #1 performance lever',
        whyDescription: 'Platform algorithms have commoditized targeting. Audiences are the same for everyone. The only variable left that separates high-performing campaigns from wasteful ones is creative — the actual assets people see, engage with, and act on.',
        whyPoints: [
            'Ad creative accounts for 50–70% of campaign performance variation, according to Meta and Google research',
            'The best-performing brands test 10–20 creative variants per campaign — most test 2–3',
            'UGC-style ads consistently outperform polished studio content for conversion-focused campaigns',
            'Landing page quality directly impacts quality score, cost per click, and conversion rate',
        ],
        processTitle: 'Our creative production process',
        processSubtitle: 'From brief to deliverables in days, not weeks.',
        process: [
            { step: '01', title: 'Brief & Direction', description: 'We start with performance data, competitor analysis, and brand guidelines to build creative briefs that are tied to campaign objectives — not just aesthetics.' },
            { step: '02', title: 'Concept & Scripting', description: 'We develop concepts, hooks, and scripts for each format — static, video, carousel, landing page — with multiple angles to test.' },
            { step: '03', title: 'AI-Augmented Production', description: 'Our team uses generative AI tools alongside traditional design and video production to produce high-quality assets at 10x the speed of a traditional agency.' },
            { step: '04', title: 'Review & Iteration', description: 'You review asset batches with a simple approval workflow. Our turnaround on revisions is typically 24–48 hours.' },
            { step: '05', title: 'Performance Tracking', description: 'We track which creatives drive results and feed winners back into production — so every batch gets smarter over time.' },
        ],
        services: [
            { name: 'Ad Creatives (Static & Animated)', detail: 'High-converting display ads, social ads, carousels, and animated creatives optimized for every platform — Facebook, Instagram, Google Display, LinkedIn, and TikTok.', slug: 'ai-creative-design' },
            { name: 'UGC Ad Production', detail: 'Creator-sourced authentic ad content — we manage the full pipeline from creator brief and casting to filming, editing, and platform-specific formatting.', slug: 'ugc-ads' },
            { name: 'Brand Videos & AI Trailers', detail: 'Cinematic brand films, explainer videos, product demos, and AI-generated trailers — from scripting and storyboarding to post-production.', slug: 'brand-videos' },
            { name: 'Short-Form Content (Reels & Shorts)', detail: 'Hook-first vertical videos optimized for Instagram Reels, TikTok, and YouTube Shorts — designed for engagement, reach, and virality.', slug: 'reels-editing' },
            { name: 'Landing Page Design & Development', detail: 'High-converting landing pages built specifically for ad traffic — with fast load times, clear CTAs, and built-in A/B testing capability.', slug: 'landing-pages' },
            { name: 'Pitch Decks & Presentations', detail: 'Investor pitch decks, sales presentations, and partner proposals designed to persuade, impress, and close — not just inform.', slug: 'pitch-decks' },
            { name: 'Brand Identity & Design Systems', detail: 'Logo design, visual identity, typography, color systems, and comprehensive brand guidelines that ensure consistency across every touchpoint.', slug: 'creative-design' },
            { name: 'Social Media Template Systems', detail: 'Modular, on-brand templates for Instagram, LinkedIn, and Twitter/X — so your team can produce consistent social content at scale without a designer.' },
        ],
        whoTitle: 'Who this is for',
        whoDescription: 'Creative production services are for businesses that need professional-quality assets without the overhead of building an in-house team.',
        whoList: [
            'Startups and scale-ups running paid campaigns that need a constant flow of fresh creative',
            'Brands launching new products and needing a complete creative package — fast',
            'Marketing teams that are bottlenecked by slow creative turnaround from traditional agencies',
            'Founders preparing for fundraising who need a compelling pitch deck and brand presence',
            'E-commerce brands that need product photography, lifestyle content, and ad variants at volume',
        ],
        stats: [
            { value: '10x', label: 'faster creative output vs traditional agencies' },
            { value: '500+', label: 'assets produced per month' },
            { value: '48hr', label: 'average revision turnaround' },
        ],
        faqs: [
            { q: 'Do you handle video production end-to-end?', a: 'Yes — from scripting and storyboarding through filming (remote or on-location) to editing and post-production. We also produce AI-generated video content for teams that need volume and speed.' },
            { q: 'What if we already have brand guidelines?', a: 'We work within your existing brand system. If you do not have one yet, we can create comprehensive brand guidelines as part of the engagement.' },
            { q: 'How many creative variants do you typically produce?', a: 'It depends on the engagement, but most clients receive 15–30 unique creative variants per month across formats. For larger campaigns, we produce significantly more.' },
            { q: 'Can you work with our internal team?', a: 'Absolutely. We integrate with internal marketing teams as an extension — attending standups, using your project management tools, and adapting to your workflow.' },
            { q: 'What AI tools do you use?', a: 'We use a combination of Midjourney, Runway, ElevenLabs, and custom internal tools alongside Adobe Creative Suite and Figma. AI accelerates production — our creative directors ensure quality.' },
        ],
        ctaHeadline: 'Need creative that actually performs?',
        ctaDescription: 'Book a 15-minute call to discuss your creative needs. We will share examples from similar projects and outline a production plan.',
    },
    'programmatic-seo': {
        title: 'Programmatic SEO & AEO',
        metaTitle: 'Programmatic SEO & AEO Agency | Aurelius Media',
        metaDescription: 'Programmatic SEO that generates hundreds of keyword-optimized pages at scale. AI Engine Optimization for ChatGPT, Perplexity, and Google AI Overviews.',
        eyebrow: 'Organic Growth',
        headline: 'Own organic search. Win in the age of AI answers.',
        subHeadline: 'Programmatic SEO systems and AI Engine Optimization strategies that build sustainable, compounding organic growth.',
        description: 'Search is changing. Google AI Overviews, ChatGPT, and Perplexity are reshaping how people find information and make decisions. We build programmatic SEO systems that generate hundreds of targeted pages at scale — and implement AI Engine Optimization (AEO) strategies so your brand surfaces wherever your customers search, including in AI-generated answers.',
        whyTitle: 'Why traditional SEO is no longer enough',
        whyDescription: 'The old playbook of publishing blog posts and building backlinks still matters, but it is no longer sufficient. Search behavior is fragmenting across traditional search engines, AI assistants, and social platforms — and the brands that win will be the ones that adapt.',
        whyPoints: [
            'Google AI Overviews now appear in 40%+ of search results — pushing organic listings further down the page',
            'ChatGPT and Perplexity are becoming primary research tools for B2B buyers and high-consideration purchases',
            'Programmatic SEO can generate 100x the pages of traditional content marketing — at a fraction of the cost',
            'Most websites have significant technical SEO issues that silently suppress their ranking potential',
        ],
        processTitle: 'Our organic growth process',
        processSubtitle: 'A data-driven system that combines programmatic scale with editorial quality.',
        process: [
            { step: '01', title: 'Keyword & Opportunity Audit', description: 'We analyze your search landscape — identifying high-intent keywords, content gaps, competitor weaknesses, and programmatic opportunities your competitors are missing.' },
            { step: '02', title: 'Technical SEO Foundation', description: 'We fix crawlability issues, schema markup, Core Web Vitals, internal linking, and site architecture — the technical foundation that everything else is built on.' },
            { step: '03', title: 'Programmatic Page Generation', description: 'We design data-driven templates and generate hundreds of keyword-targeted pages automatically — each with unique, useful content, proper structured data, and internal linking.' },
            { step: '04', title: 'AEO Strategy & Implementation', description: 'We optimize your content and site structure to surface in AI-generated answers — including structured data, entity optimization, and authoritative content positioning.' },
            { step: '05', title: 'Monitor, Iterate & Scale', description: 'Monthly performance reviews, ranking tracking, and content iteration. We identify what is working, prune what is not, and continuously expand into new keyword territories.' },
        ],
        services: [
            { name: 'Programmatic SEO Architecture', detail: 'Custom-designed template systems that generate hundreds or thousands of keyword-targeted pages from structured data — each page unique, useful, and optimized for search.' },
            { name: 'AI Engine Optimization (AEO)', detail: 'Strategies to surface your brand in ChatGPT, Perplexity, Gemini, and Google AI Overviews — including entity optimization, structured data, and authoritative content positioning.' },
            { name: 'Technical SEO Audit & Implementation', detail: 'Comprehensive technical audits covering Core Web Vitals, crawl efficiency, schema markup, URL structure, canonicalization, and site architecture optimization.' },
            { name: 'Content Strategy & Pillar Pages', detail: 'Topic cluster architecture and long-form pillar content that establishes topical authority — the foundation for both traditional SEO and AI visibility.' },
            { name: 'Local SEO', detail: 'Google Business Profile optimization, local citation building, review management, and location-specific content strategies for multi-location businesses.' },
            { name: 'Link Building & Digital PR', detail: 'High-authority backlink acquisition through data-driven digital PR, expert commentary, resource link building, and strategic content partnerships.' },
            { name: 'SEO-Optimized Landing Pages', detail: 'Landing pages engineered to rank in search AND convert paid traffic — bridging the gap between organic visibility and conversion performance.' },
        ],
        whoTitle: 'Who this is for',
        whoDescription: 'Programmatic SEO and AEO are best suited for businesses in information-rich markets where search is a primary discovery channel.',
        whoList: [
            'SaaS companies with large keyword universes (features, integrations, use cases, comparisons)',
            'Marketplaces and directories that can generate pages from structured data',
            'E-commerce brands with extensive product catalogs that need category and product-level SEO',
            'Professional services firms competing in markets where organic search drives high-value leads',
            'Any business that wants to be visible in AI-generated search answers — not just traditional results',
        ],
        stats: [
            { value: '3x', label: 'average organic traffic growth' },
            { value: '100s', label: 'of pages generated at scale' },
            { value: 'Top 3', label: 'AI-search visibility within 6 months' },
        ],
        faqs: [
            { q: 'What is programmatic SEO?', a: 'Programmatic SEO is the practice of generating large numbers of keyword-targeted pages from structured data and templates — instead of writing each page manually. It is how companies like Zapier, Wise, and Zillow built massive organic traffic at scale.' },
            { q: 'What is AEO and why does it matter?', a: 'AI Engine Optimization (AEO) is the practice of optimizing your content to appear in AI-generated answers from ChatGPT, Perplexity, Google AI Overviews, and similar tools. As more users rely on AI for research, AEO is becoming as important as traditional SEO.' },
            { q: 'How long does it take to see results from programmatic SEO?', a: 'Programmatic pages typically start ranking within 2–4 weeks of indexing. Meaningful traffic improvements are usually visible within 60–90 days. Full maturity takes 4–6 months as pages build authority.' },
            { q: 'Do programmatic pages risk being flagged as low quality?', a: 'Not when done correctly. Our programmatic pages are built with unique, genuinely useful content per page — not thin, keyword-stuffed duplicates. We follow Google quality guidelines rigorously.' },
            { q: 'Can you work alongside our existing SEO agency?', a: 'Yes. We frequently complement existing SEO programs by adding programmatic scale and AEO strategy — capabilities that most traditional SEO agencies do not offer.' },
        ],
        ctaHeadline: 'Ready to own your category in organic search?',
        ctaDescription: 'Book a 15-minute call to discuss your keyword landscape and how we can build a programmatic system tailored to your market.',
    },
    'web-apps-mvps': {
        title: 'Web Apps & MVPs',
        metaTitle: 'Web App & MVP Development | Aurelius Media',
        metaDescription: 'Rapid web app and MVP development using Next.js and AI tools. From idea to working prototype in 2 weeks. SaaS products and marketing sites.',
        eyebrow: 'Product & Dev',
        headline: 'Ship fast. Learn faster.',
        subHeadline: 'Rapid product development for teams that need to test, launch, and iterate — not wait 6 months for a spec.',
        description: 'We build production-ready web applications and MVPs in weeks, not months. Using Next.js, modern deployment infrastructure, and AI-native tools, we help founders and teams go from idea to working product quickly — so you can start testing with real users, generating revenue, and making informed decisions about what to build next.',
        whyTitle: 'Why speed-to-market defines winners',
        whyDescription: 'In competitive markets, the team that ships first and iterates fastest wins. Traditional development cycles — months of specifications, design phases, and build sprints — cost time, money, and often result in products nobody wants.',
        whyPoints: [
            'Most startups fail because they build too much before validating — an MVP lets you test the core hypothesis fast',
            'Modern frameworks like Next.js and deployment tools like Vercel make it possible to ship production-grade products in 2 weeks',
            'AI-native development tools accelerate the build process by 5–10x compared to traditional development',
            'Internal tools and custom dashboards built quickly pay for themselves in weeks through team productivity gains',
        ],
        processTitle: 'Our development process',
        processSubtitle: 'From kickoff to deployed product in 2 weeks.',
        process: [
            { step: '01', title: 'Kickoff & Scope', description: 'A focused session to define the core value proposition, must-have features, and success criteria — then we ruthlessly scope down to what matters most for launch.' },
            { step: '02', title: 'Design & Architecture', description: 'Rapid UI/UX design using a component-first approach. We design in code — so what you see in review is the actual product, not a mockup.' },
            { step: '03', title: 'Build Sprint', description: 'A concentrated build sprint using Next.js, TypeScript, and modern tooling. Daily progress updates so you can course-correct in real-time.' },
            { step: '04', title: 'Testing & Polish', description: 'Functional testing, cross-browser verification, performance optimization, and final polish — ensuring the product is genuinely production-ready.' },
            { step: '05', title: 'Deploy & Handover', description: 'Deployed to production on Vercel or your infrastructure of choice. Full handover including source code, documentation, and deployment guides.' },
        ],
        services: [
            { name: 'MVP Development', detail: 'Core product builds with the minimum feature set needed to test your hypothesis with real users — designed for speed-to-market without sacrificing code quality.' },
            { name: 'AI-Native Product Builds', detail: 'Products with built-in AI capabilities — chatbots, content generators, recommendation engines, and automation layers powered by OpenAI, Anthropic, or open-source models.' },
            { name: 'Internal Tools & Dashboards', detail: 'Custom internal tools, admin panels, CRMs, and analytics dashboards that replace spreadsheets and manual processes — built for your specific workflows.' },
            { name: 'Marketing Sites & Landing Pages', detail: 'Fast, SEO-optimized, beautifully designed marketing sites that load in under 1 second — built with Next.js for performance and developer experience.' },
            { name: 'No-Code & Low-Code Solutions', detail: 'Webflow, Framer, and Bubble builds for projects where speed and cost-efficiency are the top priority — without sacrificing design quality.' },
            { name: 'API Integrations & Automation', detail: 'Connect your tools — CRM, payments, communications, analytics — with custom API integrations and automation workflows.' },
            { name: 'Deployment & Infrastructure', detail: 'Production deployment on Vercel, AWS, or Railway with CI/CD pipelines, monitoring, and scalable infrastructure from day one.' },
        ],
        whoTitle: 'Who this is for',
        whoDescription: 'We work with founders, product teams, and businesses that need to move fast — whether validating a new idea or solving an internal problem.',
        whoList: [
            'Founders with a product idea who need a working prototype to test with users or show investors',
            'Product teams at companies that need to ship features or tools quickly without burdening their engineering team',
            'Businesses that rely on spreadsheets or manual processes and need a custom tool built fast',
            'Marketing teams that need a high-performance site or landing page built properly — not a WordPress template',
            'Anyone who needs production-quality web development on a startup timeline',
        ],
        stats: [
            { value: '2 wk', label: 'average time to launch' },
            { value: '15+', label: 'products shipped to production' },
            { value: 'Next.js', label: 'AI-native modern stack' },
        ],
        faqs: [
            { q: 'How can you build an MVP in 2 weeks?', a: 'We use modern frameworks (Next.js), component libraries, and AI-assisted development to move fast. The key is ruthless scoping — we focus on the core value proposition and ship only what matters for validation.' },
            { q: 'Do we own the code?', a: 'Yes, 100%. You receive full source code, documentation, and deployment access. We build on your GitHub repository from day one.' },
            { q: 'What happens after launch?', a: 'We offer ongoing development retainers for teams that need continued iteration. Alternatively, we do a clean handoff with documentation so your team or another developer can take over.' },
            { q: 'Can you build mobile apps too?', a: 'We specialize in web applications. For projects that need mobile, we build responsive progressive web apps (PWAs) that work natively on mobile devices — or recommend trusted mobile development partners.' },
            { q: 'What is your tech stack?', a: 'Next.js (React), TypeScript, Tailwind CSS, Prisma/Drizzle, PostgreSQL, and Vercel for deployment. We choose tools that maximize developer velocity and long-term maintainability.' },
        ],
        ctaHeadline: 'Have an idea that needs to be built?',
        ctaDescription: 'Book a 15-minute call to walk us through your concept. We will tell you honestly what can be built in 2 weeks — and what a realistic scope looks like.',
    },
    'full-funnel-marketing': {
        title: 'Full Funnel Marketing',
        metaTitle: 'Full Funnel Marketing Agency | Aurelius Media',
        metaDescription: 'End-to-end growth marketing — strategy, paid media, creative, email, SEO, and analytics. One team managing your entire stack.',
        eyebrow: 'Growth System',
        headline: 'Your entire growth engine. One team.',
        subHeadline: 'Awareness to loyalty. Strategy, creative, paid media, email, SEO, and analytics — all working together as a cohesive system.',
        description: 'Most businesses piece together their marketing from separate vendors — one agency for ads, another for creative, a freelancer for email, an SEO consultant on the side. The result is fragmented execution, inconsistent messaging, and blind spots in attribution. We replace that with a single, integrated growth team that manages your entire marketing stack — from strategy through execution to measurement.',
        whyTitle: 'Why fragmented marketing underperforms',
        whyDescription: 'When your ad team does not talk to your email team, when your creative is disconnected from your data, and when nobody owns the full funnel, you lose money at every handoff.',
        whyPoints: [
            'Fragmented agency setups create reporting silos where no one sees the full customer journey',
            'Creative that is disconnected from performance data produces pretty assets that do not convert',
            'Without a unified strategy, channels compete with each other instead of complementing each other',
            'Mid-market companies often lack the budget for a full-time CMO but desperately need senior strategic leadership',
        ],
        processTitle: 'Our full funnel process',
        processSubtitle: 'A comprehensive growth operating system — not just campaign execution.',
        process: [
            { step: '01', title: 'Growth Audit & Strategy', description: 'We audit your entire marketing stack, analyze performance data, and deliver a 90-day growth roadmap with channel strategy, budget allocation, and KPI targets.' },
            { step: '02', title: 'Foundation & Tracking', description: 'We set up proper analytics, attribution, and tracking infrastructure — so every downstream decision is based on accurate data, not guesswork.' },
            { step: '03', title: 'Multi-Channel Execution', description: 'Coordinated execution across paid media, organic, email, social, and content — with every channel reinforcing the others and messaging aligned across touchpoints.' },
            { step: '04', title: 'Creative & Content Engine', description: 'Continuous creative production — ad variants, email sequences, social content, landing pages — all driven by performance data and rapid iteration.' },
            { step: '05', title: 'Weekly Reporting & Optimization', description: 'Transparent weekly reports with full-funnel metrics, clear insights, and specific recommendations. Monthly strategy reviews to adjust course based on what the data shows.' },
        ],
        services: [
            { name: 'Growth Strategy & 90-Day Roadmap', detail: 'A comprehensive growth plan covering channel strategy, budget allocation, creative direction, content calendar, and measurable KPIs — updated quarterly.', slug: 'marketing-strategy-audit' },
            { name: 'Multi-Channel Paid Media', detail: 'Google, Meta, LinkedIn, TikTok, and YouTube campaigns — all managed as one coordinated system with unified attribution and cross-channel budget optimization.', slug: 'google-ads' },
            { name: 'Email Marketing & Automation', detail: 'Lifecycle email programs, drip sequences, newsletter strategy, and automation workflows that drive repeat engagement and revenue — not just opens.', slug: 'email-lifecycle' },
            { name: 'Social Media Management', detail: 'Strategic content planning, community management, and cross-platform publishing — with content calendars, engagement tracking, and monthly reporting.', slug: 'content-strategy' },
            { name: 'Analytics & Attribution', detail: 'Custom dashboards in Looker/GA4, multi-touch attribution modeling, and weekly performance reports that connect marketing activity to business outcomes.', slug: 'analytics-reporting' },
            { name: 'Conversion Rate Optimization', detail: 'Systematic testing of landing pages, forms, checkout flows, and CTAs — using data to incrementally improve conversion rates across the entire funnel.', slug: 'cro' },
            { name: 'Brand & Content Strategy', detail: 'Editorial planning, brand voice development, content pillar frameworks, and distribution strategy that builds long-term brand equity while driving near-term results.', slug: 'content-strategy' },
            { name: 'Fractional CMO Services', detail: 'Senior marketing leadership on demand — strategic oversight, team management, board reporting, and growth planning without the full-time executive hire.' },
        ],
        whoTitle: 'Who this is for',
        whoDescription: 'Full funnel marketing is ideal for companies that want one team managing everything — rather than coordinating across multiple vendors.',
        whoList: [
            'Series A–C startups that need a complete growth function without building a 10-person marketing team',
            'Mid-market companies that have outgrown their freelancer/agency patchwork and need integrated execution',
            'Founder-led companies where the CEO is still the de-facto CMO and needs to hand off marketing leadership',
            'Companies entering new markets or launching new products that need a full go-to-market push',
            'Businesses spending $20K+/month on marketing that want better coordination, attribution, and ROI',
        ],
        stats: [
            { value: 'Full stack', label: 'strategy through execution' },
            { value: '1 team', label: 'managing all channels' },
            { value: 'Weekly', label: 'performance reporting' },
        ],
        faqs: [
            { q: 'How is this different from hiring an in-house team?', a: 'You get the output of 5–8 specialists (strategist, media buyer, designer, copywriter, email marketer, analytics) for a fraction of the cost of hiring full-time. Plus, you get senior strategic leadership from day one.' },
            { q: 'What does the Fractional CMO service include?', a: 'A senior marketing leader who owns your growth strategy, attends leadership meetings, manages the execution team, provides board-level reporting, and makes the strategic calls a full-time CMO would — at 20–30% of the cost.' },
            { q: 'Do we need to commit to all services at once?', a: 'No. We start with the channels that have the highest immediate impact and expand over time. Most clients start with 2–3 core channels and scale to full-funnel within 3–6 months.' },
            { q: 'How do you report on cross-channel performance?', a: 'We build custom dashboards that show full-funnel performance across all channels — with unified attribution so you can see exactly how each touchpoint contributes to conversions and revenue.' },
            { q: 'What is the minimum engagement period?', a: 'We recommend a 3-month minimum for full funnel engagements to allow enough time for strategy, setup, and optimization. Most clients stay for 12+ months because the system compounds over time.' },
        ],
        ctaHeadline: 'Ready for a growth partner who handles everything?',
        ctaDescription: 'Book a 15-minute call to discuss where you are today, where you want to be, and how a full-funnel approach can get you there faster.',
    },
};

/* ─────────────────────────────────────────────────
   PAGE GENERATION
   ───────────────────────────────────────────────── */

export async function generateStaticParams() {
    return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const cat = categories[category];
    if (!cat) return { title: 'Not Found' };
    return {
        title: cat.metaTitle,
        description: cat.metaDescription,
        openGraph: {
            title: cat.metaTitle,
            description: cat.metaDescription,
            type: 'website',
            url: `https://www.aureliusmedia.co/categories/${category}`,
            images: [{ url: '/logo.png', alt: cat.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: cat.metaTitle,
            description: cat.metaDescription,
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const cat = categories[category];

    if (!cat) {
        return (
            <main className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-brand-white mb-4">Category not found</h1>
                    <Link href="/services" className="text-brand-accent hover:underline">← Back to Services</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-brand-dark text-brand-white">

            {/* ─── HERO ─── */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 hero-glow opacity-50" />
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                    <nav className="flex items-center gap-2 text-xs text-brand-gray-dark mb-8">
                        <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-brand-white transition-colors">Services</Link>
                        <span>/</span>
                        <span className="text-brand-gray">{cat.title}</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card/50 border border-brand-border-subtle text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                        {cat.eyebrow}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 max-w-4xl">
                        {cat.headline}
                    </h1>
                    <p className="text-lg sm:text-xl text-brand-gray-light font-medium mb-4 max-w-3xl">
                        {cat.subHeadline}
                    </p>
                    <p className="text-base text-brand-gray max-w-2xl leading-relaxed mb-10">
                        {cat.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 cta-primary text-white font-semibold rounded-[20px]">
                            Book a Strategy Call
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                        <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover text-brand-white rounded-lg font-semibold transition-all duration-200">
                            All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── STATS BAR ─── */}
            <section className="bg-brand-darker border-y border-brand-border-subtle py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap gap-10 sm:gap-20">
                        {cat.stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <svg className="w-3.5 h-3.5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                                    <span className="text-xl sm:text-2xl font-bold text-brand-white">{stat.value}</span>
                                </div>
                                <span className="text-xs text-brand-gray">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WHY THIS MATTERS ─── */}
            <section className="py-20 sm:py-24 bg-brand-dark">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-dark mb-3 font-mono">The Challenge</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                                {cat.whyTitle}
                            </h2>
                            <p className="text-sm text-brand-gray leading-relaxed">
                                {cat.whyDescription}
                            </p>
                        </div>
                        <div className="space-y-3">
                            {cat.whyPoints.map((point, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-brand-card/30 border border-brand-border-subtle">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-accent/15 flex items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold text-brand-accent">{i + 1}</span>
                                    </div>
                                    <p className="text-xs text-brand-gray leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PROCESS ─── */}
            <section className="py-20 sm:py-24 bg-brand-darker">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-dark mb-3 font-mono">How We Work</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{cat.processTitle}</h2>
                    <p className="text-sm text-brand-gray max-w-xl leading-relaxed mb-12">{cat.processSubtitle}</p>

                    <div className="space-y-4">
                        {cat.process.map((step) => (
                            <div key={step.step} className="flex items-start gap-5 p-5 sm:p-6 rounded-xl bg-brand-card/20 border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-200">
                                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-brand-accent">{step.step}</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-brand-white mb-1.5">{step.title}</h3>
                                    <p className="text-xs text-brand-gray leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SERVICES INCLUDED ─── */}
            <section className="py-20 sm:py-24 bg-brand-dark">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-dark mb-3 font-mono">What We Deliver</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-12">
                        Services under <span className="gradient-text font-display">{cat.title.toLowerCase()}.</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cat.services.map((service, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-brand-card/30 border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-200">
                                <div className="mt-0.5 w-7 h-7 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0">
                                    <span className="text-[11px] font-bold text-brand-accent">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold mb-1.5">
                                        {service.slug ? (
                                            <Link href={`/services/${service.slug}`} className="text-brand-white hover:text-brand-accent-text transition-colors">
                                                {service.name}
                                            </Link>
                                        ) : (
                                            <span className="text-brand-white">{service.name}</span>
                                        )}
                                    </h3>
                                    <p className="text-xs text-brand-gray leading-relaxed">{service.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WHO THIS IS FOR ─── */}
            <section className="py-20 sm:py-24 bg-brand-darker">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-dark mb-3 font-mono">Ideal Fit</p>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">{cat.whoTitle}</h2>
                            <p className="text-sm text-brand-gray leading-relaxed">{cat.whoDescription}</p>
                        </div>
                        <div className="space-y-3">
                            {cat.whoList.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-accent/15 flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-xs text-brand-gray leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-20 sm:py-24 bg-brand-dark">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray-dark mb-3 text-center font-mono">FAQ</p>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-10 text-center">
                        Frequently asked <span className="gradient-text font-display">questions.</span>
                    </h2>
                    <div className="space-y-3">
                        {cat.faqs.map((faq, i) => (
                            <details key={i} className="group rounded-xl border border-brand-border-subtle overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-brand-card/50 transition-colors duration-200 text-sm font-medium text-brand-white list-none">
                                    {faq.q}
                                    <svg className="w-4 h-4 text-brand-gray-dark shrink-0 transition-transform duration-200 group-open:rotate-180 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </summary>
                                <div className="px-5 pb-5">
                                    <p className="text-xs text-brand-gray leading-relaxed">{faq.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-20 sm:py-28 bg-brand-darker relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{cat.ctaHeadline}</h2>
                    <p className="text-brand-gray text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">{cat.ctaDescription}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 cta-primary text-white font-semibold rounded-[20px]">
                            Book a Strategy Call →
                        </a>
                        <Link href="/services" className="w-full sm:w-auto px-8 py-4 bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover text-brand-white rounded-lg font-semibold transition-all duration-200">
                            Explore All Services
                        </Link>
                    </div>
                    <p className="mt-5 text-xs text-brand-gray-dark">No commitment. 100% free consultation.</p>
                </div>
            </section>
        </main>
    );
}
