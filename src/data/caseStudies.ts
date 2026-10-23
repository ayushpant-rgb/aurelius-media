/* Case studies: one record per page at /case-studies/[slug], plus the homepage
   cards and the service-page strips, which all read from this file.

   Published 23 Oct 2026 with every client's approval. Phynix, Call to Play,
   Fill Your Own Cup and Provoked figures come from each client's CONTEXT.md
   and reports (sources in the comment on each record). Figures for aden + anais, Anandi School, the
   private university, Karan Bajaj, Nidhi Upadhyay, the health tech startup,
   Hello Muslim and the TIME100 prototype come from Ayush's own records; there
   is no data access to those accounts from this Mac. */

export type CaseStudyGroup = 'books' | 'growth' | 'product';

export const caseStudyGroups: { id: CaseStudyGroup; label: string; blurb: string }[] = [
    {
        id: 'books',
        label: 'Book Marketing',
        blurb: 'Launches and long-run sales for authors and publishers, from a premium book sold from its own store to a thriller past 50,000 copies.',
    },
    {
        id: 'growth',
        label: 'Growth & Performance',
        blurb: 'Paid media for media brands, schools, universities and D2C, measured in subscribers, admissions and sales.',
    },
    {
        id: 'product',
        label: 'Product & Prototypes',
        blurb: 'MVPs and prototypes we designed and built, then put in front of real demand.',
    },
];

/** What each platform card shows an icon for. */
export type PlatformKind =
    | 'meta'
    | 'google'
    | 'amazon'
    | 'youtube'
    | 'email'
    | 'landing'
    | 'payments'
    | 'shipping'
    | 'tracking'
    | 'ux'
    | 'product'
    | 'strategy'
    | 'creative';

export interface CaseStudyStat {
    metric: string;
    label: string;
}

export interface CaseStudyPlatform {
    kind: PlatformKind;
    name: string;
    /** What we did on this platform, in one or two sentences. */
    detail: string;
}

export interface CaseStudyStep {
    title: string;
    body: string;
}

export interface CaseStudyVisual {
    /** photo: fills the card. cover: a book cover set on a coloured panel. */
    kind: 'photo' | 'cover';
    src: string;
    alt: string;
    /** Panel colour behind a cover. */
    tone?: string;
}

export interface CaseStudyTestimonial {
    quote: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface CaseStudy {
    slug: string;
    client: string;
    group: CaseStudyGroup;
    vertical: string;
    /** H1. `accent` must be a substring of it; that phrase is set in orange. */
    title: string;
    accent: string;
    summary: string;
    /** Card subtitle and the two result chips on the homepage card. */
    cardLine: string;
    chips: [string, string];
    visual?: CaseStudyVisual;
    stats: CaseStudyStat[];
    platforms: CaseStudyPlatform[];
    brief: string[];
    steps: CaseStudyStep[];
    outcome: string[];
    testimonial?: CaseStudyTestimonial;
    /** Service page slugs this case study appears on. */
    services: string[];
    /** Client asked not to be named: no logo, no name, no identifying detail. */
    confidential?: boolean;
}

export const caseStudies: CaseStudy[] = [
    /* ───────────── Book marketing ───────────── */
    {
        // Phynix CONTEXT.md: 124 Razorpay orders 13 Aug–16 Sep (ROAS 2.63) and
        // 124 sales 1–19 Oct on the main campaign; average order ₹1,405 for
        // 29 Sep–12 Oct. Orders include eBooks. ROAS: the notes show 2.63
        // (13 Aug–16 Sep) and 2.35 (1–19 Oct); Ayush set the page to 3x on
        // 23 Oct. Keep the doctors, Kapil Dev,
        // the charity terms and the fee split off this page (not cleared).
        slug: 'illusion-of-i-am-fine',
        client: 'Phynix',
        group: 'books',
        vertical: 'Book Marketing · D2C',
        title: 'Selling a premium book straight to readers',
        accent: 'straight to readers',
        summary:
            'The Illusion of “I am Fine” by Panckaj N Umrania sells at ₹1,499 in paperback and more in hardcover, a price marketplaces punish. We built Phynix its own book store and checkout, and sold hundreds of copies direct with Meta ads.',
        cardLine: 'A premium-priced book sold direct, from its own store',
        chips: ['248 direct orders', '3x return on ad spend'],
        visual: {
            kind: 'cover',
            src: '/case-studies/illusion-of-i-am-fine-book.webp',
            alt: 'The Illusion of “I am Fine” by Panckaj N Umrania, hardback',
            tone: '#26301b',
        },
        stats: [
            { metric: '248', label: 'Direct orders across two campaign windows' },
            { metric: '3x', label: 'Return on ad spend' },
            { metric: '₹1,405', label: 'Average order value' },
        ],
        platforms: [
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Facebook and Instagram ads built from the book’s own lines and statistics, with the real cover in every ad.',
            },
            {
                kind: 'landing',
                name: 'Book store',
                detail: 'A store for this one book on Phynix’s own domain, making the case for the price before the reader reaches it.',
            },
            {
                kind: 'payments',
                name: 'Razorpay checkout',
                detail: 'Payment on the page, confirmed by webhook, with order emails sent automatically.',
            },
            {
                kind: 'tracking',
                name: 'Server-side tracking',
                detail: 'Every paid order reported back to Meta from the server, so the campaigns learned from real purchases.',
            },
        ],
        brief: [
            'Phynix is a platform for lifestyle medicine, nutrition and human performance. Its founder, Panckaj N Umrania, wrote The Illusion of “I am Fine”, an evidence-based blueprint for building strength, preventing chronic disease and staying independent at any age.',
            'The book comes as an eBook, a ₹1,499 paperback and a hardcover. At that price it sits far above a typical marketplace book, next to titles a fraction of the cost, so Phynix wanted to sell it direct.',
        ],
        steps: [
            {
                title: 'Give the book its own store',
                body: 'A dedicated store for this title on Phynix’s domain, with every format on one page.',
            },
            {
                title: 'Let the page sell the price',
                body: 'The page leads with who the book is for and what changes for the reader, so the price reads as fair by the time it appears.',
            },
            {
                title: 'Own the checkout',
                body: 'Razorpay checkout on the page, a payment webhook and automatic order emails. Every order and every buyer belongs to Phynix.',
            },
            {
                title: 'Meta ads from the book itself',
                body: 'We turned the book’s sharpest lines and numbers into ad concepts, fed real purchases back to Meta, and moved budget to the concepts that sold.',
            },
        ],
        outcome: [
            'The store took 124 orders between 13 August and 16 September and another 124 in the first 19 days of October, at around a 3x return on ad spend. Orders average ₹1,405, and every buyer is now a customer Phynix can reach again.',
        ],
        services: ['book-marketing', 'meta-ads', 'landing-pages', 'd2c-ecommerce-marketing'],
    },
    {
        // Namita Nair CONTEXT.md: ads live 3 Oct, first ad sale 5 Oct, 90 orders
        // 7–21 Oct, best day 9 Oct (10 orders), 24 Meta ads. Her rule: no
        // profit-after-ads talk, so no spend, cost per order or ROAS here.
        // The ads still point at the Vercel landing URL, so name no domain.
        slug: 'call-to-play-data-to-ai',
        client: 'Call to Play: Data to AI',
        group: 'books',
        vertical: 'Book Marketing · D2C Setup',
        title: 'The D2C setup that gave a new book a head start',
        accent: 'D2C setup',
        summary:
            'For Call to Play: Data to AI by Namita Nair, we built the whole direct-to-reader setup: the store, checkout, fulfilment and order emails, then launched Meta ads into it. The first sale came two days after the ads went live, and the store took 90 orders in its first two weeks.',
        cardLine: 'The full D2C setup, selling within days of launch',
        chips: ['First sale in 2 days', '90 orders in 15 days'],
        visual: {
            kind: 'cover',
            src: '/case-studies/call-to-play-data-to-ai-book.webp',
            alt: 'Call to Play: Data to AI, an exercise book on algorithms by Namita Nair',
            tone: '#14304a',
        },
        stats: [
            { metric: '2 days', label: 'From ads going live to the first sale' },
            { metric: '90', label: 'Direct orders, 7–21 October' },
            { metric: '10', label: 'Orders on the best single day' },
        ],
        platforms: [
            {
                kind: 'landing',
                name: 'Book store',
                detail: 'A store for this one book on its own site, showing what is inside before anyone is asked to pay.',
            },
            {
                kind: 'payments',
                name: 'Razorpay checkout',
                detail: 'Checkout on the page, a payment webhook, policy pages and order emails that go out on their own.',
            },
            {
                kind: 'shipping',
                name: 'Shiprocket fulfilment',
                detail: 'Paid orders flow into Shiprocket, so a sale from an ad ships without being re-keyed.',
            },
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: '24 Facebook and Instagram ads aimed at the parents and educators who buy learning books for young readers.',
            },
        ],
        brief: [
            'Namita Nair wrote Call to Play: Data to AI, published by RowRow Learn, to make algorithms something a young reader can play with: 20 algorithms to work through.',
            'The book was to sell direct, so every piece of the D2C setup had to work before the first ad ran: a store, a checkout, payments, shipping and the emails a buyer expects.',
        ],
        steps: [
            {
                title: 'Build the store',
                body: 'A store for this one book that shows what the exercises look like and who the book is for, with ordering on the same page.',
            },
            {
                title: 'Wire up payments',
                body: 'Razorpay checkout, a payment webhook that confirms every order, policy pages and automatic order emails.',
            },
            {
                title: 'Connect fulfilment',
                body: 'Orders go straight to Shiprocket, so the setup runs from payment to doorstep without manual steps.',
            },
            {
                title: 'Launch Meta ads into it',
                body: '24 ads built from the book’s own pages and ideas, aimed at the adults who buy for young readers, with spend moved to the ads that sold.',
            },
        ],
        outcome: [
            'Because the setup was right before the first ad ran, the campaign started with a head start. The ads went live on 3 October, the first sale came on 5 October, and the store took 90 direct orders between 7 and 21 October, with 10 on its best day. It keeps producing sales.',
        ],
        services: ['book-marketing', 'meta-ads', 'landing-pages', 'd2c-ecommerce-marketing'],
    },
    {
        // Sangeeta CONTEXT.md: launch 20 Oct 2026. YouTube 232 (5 Oct) → 8,625
        // (19 Oct), Google video ads behind it. Meta lead ads: 236 leads to
        // Mailchimp. No Amazon ads (they start after 25 reviews). The creator
        // programme had not started at debut (Ayush, 23 Oct), so "no
        // influencers" holds for the debut only; keep it tied to the debut.
        // #23 in Self-Esteem confirmed by Ayush. No AI images of her; quotes
        // verbatim only.
        slug: 'fill-your-own-cup',
        client: 'Fill Your Own Cup',
        group: 'books',
        vertical: 'Book Marketing · Author Platform',
        title: 'A #23 debut with no influencers and no Amazon ads',
        accent: '#23 debut',
        summary:
            'Fill Your Own Cup by Sangeeta Maheshwari debuted at #23 in Self-Esteem on Amazon with no influencer push and no Amazon ads. Before launch we grew her YouTube channel from 232 to 8,625 subscribers and brought new readers onto her email list.',
        cardLine: 'An audience built before launch day',
        chips: ['#23 in Self-Esteem', 'No influencers or Amazon ads'],
        visual: {
            kind: 'cover',
            src: '/case-studies/fill-your-own-cup-cover.webp',
            alt: 'Fill Your Own Cup by Sangeeta Maheshwari, with a foreword by Kailash Satyarthi',
            tone: '#2c2412',
        },
        stats: [
            { metric: '#23', label: 'Debut rank in Self-Esteem on Amazon' },
            { metric: '8,625', label: 'YouTube subscribers, up from 232 in two weeks' },
            { metric: '236', label: 'New email subscribers from Meta lead ads' },
        ],
        platforms: [
            {
                kind: 'youtube',
                name: 'YouTube',
                detail: 'A calm, long-form episode series in Sangeeta’s own voice, edited and published by us, with Reels cut from every episode.',
            },
            {
                kind: 'google',
                name: 'Google video ads',
                detail: 'Put each new episode in front of viewers who had not met her yet: the channel went from 232 to 8,625 subscribers between 5 and 19 October.',
            },
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Lead ads offering the book’s free chapters, which brought 236 new subscribers onto her list.',
            },
            {
                kind: 'email',
                name: 'Mailchimp',
                detail: 'Brought a list untouched since 2023 back into use and grew it from 348 to 573 sendable subscribers before launch.',
            },
            {
                kind: 'landing',
                name: 'Free-chapters page',
                detail: 'A page for the free chapters, with tracking, that turns curious readers into subscribers.',
            },
            {
                kind: 'amazon',
                name: 'Amazon listing',
                detail: 'The cover and the A+ content on the book’s Amazon page. No Amazon ads.',
            },
        ],
        brief: [
            'Sangeeta Maheshwari (London · Dubai · India) wrote Fill Your Own Cup: Care for Yourself, So You Can Care for Others, published by Soulscribe Publishing with a foreword by Nobel Peace Laureate Kailash Satyarthi.',
            'She wanted the launch to rest on people who already knew her voice, and on channels she would keep after launch week.',
        ],
        steps: [
            {
                title: 'Give her a channel',
                body: 'We turned Sangeeta’s recordings into a weekly YouTube series and short Reels, so readers met her before they met the book.',
            },
            {
                title: 'Put each episode in front of new viewers',
                body: 'Google video ads carried every episode beyond her existing circle, and the channel grew from 232 to 8,625 subscribers in two weeks.',
            },
            {
                title: 'Turn interest into subscribers',
                body: 'Meta lead ads offered the free chapters, and 236 new readers joined her Mailchimp list, taking it to 573 sendable subscribers.',
            },
            {
                title: 'Get the Amazon page ready',
                body: 'The cover and the A+ content were ready for the readers arriving on launch day. Amazon ads wait until the book has its first reviews.',
            },
        ],
        outcome: [
            'Fill Your Own Cup launched on 20 October and debuted at #23 in Self-Esteem on Amazon, with no influencer push and no Amazon ad spend behind it. Sangeeta now owns a YouTube channel and an email list that will carry her next book too.',
        ],
        services: ['book-marketing', 'content-strategy', 'email-lifecycle', 'reels-editing', 'youtube-ads'],
    },
    {
        slug: 'karan-bajaj-freedom-manifesto',
        client: 'Karan Bajaj',
        group: 'books',
        vertical: 'Book Marketing · Author Platform',
        title: 'Building the audience that sold 25,000+ copies',
        accent: '25,000+ copies',
        summary:
            'For Karan Bajaj, bestselling novelist and founder of WhiteHat Jr, we grew an email list to 50,000 subscribers and a YouTube channel to 50,000 subscribers, then turned both toward The Freedom Manifesto. It sold more than 25,000 copies.',
        cardLine: 'An owned audience of 100,000 behind one launch',
        chips: ['25,000+ copies sold', '50K email + 50K YouTube'],
        stats: [
            { metric: '25,000+', label: 'Copies of The Freedom Manifesto sold' },
            { metric: '50,000', label: 'Email subscribers' },
            { metric: '50,000', label: 'YouTube subscribers' },
        ],
        platforms: [
            {
                kind: 'email',
                name: 'Email list',
                detail: 'Grew Karan’s list to 50,000 subscribers and made it the main launch channel for the book.',
            },
            {
                kind: 'youtube',
                name: 'YouTube',
                detail: 'Pushed his channel to 50,000 subscribers, so the ideas in the book reached people before the book did.',
            },
        ],
        brief: [
            'Karan Bajaj is a bestselling novelist and the founder of WhiteHat Jr. The Freedom Manifesto, published by HarperCollins India, was his first non-fiction book, and he wanted readers he could reach directly, for this book and the ones after it.',
        ],
        steps: [
            {
                title: 'Grow the list first',
                body: 'We built Karan’s email list to 50,000 subscribers before asking anyone to buy.',
            },
            {
                title: 'Grow the channel alongside it',
                body: 'We pushed his YouTube channel to 50,000 subscribers with the ideas the book is built on.',
            },
            {
                title: 'Launch to 100,000 people who already knew him',
                body: 'When the book came out, two owned channels carried the launch, and kept carrying it after launch week.',
            },
        ],
        outcome: [
            'The Freedom Manifesto sold more than 25,000 copies, and Karan owns the 100,000-strong audience that sold it.',
        ],
        testimonial: {
            quote: 'Aurelius Media transformed our digital strategy in just 90 days. They didn’t just deliver clicks — they delivered customers who were ready to buy. Their data-driven approach eliminated the guesswork from our marketing spend.',
            name: 'Karan Bajaj',
            role: 'Author, The Freedom Manifesto · Founder, WhiteHat Jr.',
            avatar: '/testimonials/Karan.avif',
        },
        services: ['book-marketing', 'email-lifecycle', 'content-strategy'],
    },
    {
        slug: 'nidhi-upadhyay-that-night',
        client: 'Nidhi Upadhyay',
        group: 'books',
        vertical: 'Book Marketing · Fiction',
        title: 'Taking a thriller past 50,000 copies',
        accent: '50,000 copies',
        summary:
            'Nidhi Upadhyay’s thriller That Night sold more than 50,000 copies. Meta ads built the buzz around the book, and Amazon turned that interest into orders.',
        cardLine: 'Meta to create demand, Amazon to capture it',
        chips: ['50,000+ copies sold', 'Meta + Amazon'],
        stats: [
            { metric: '50,000+', label: 'Copies of That Night sold' },
            { metric: 'Meta + Amazon', label: 'The whole channel mix' },
        ],
        platforms: [
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Facebook and Instagram campaigns that got thriller readers talking about That Night.',
            },
            {
                kind: 'amazon',
                name: 'Amazon',
                detail: 'Amazon ads and a listing ready for the readers the buzz sent there, so interest became orders.',
            },
        ],
        brief: [
            'Nidhi Upadhyay was about to publish That Night and wanted the book in front of every reader who loves a thriller.',
        ],
        steps: [
            {
                title: 'Create the buzz on Meta',
                body: 'Creative built around the book’s hook, run to thriller readers on Facebook and Instagram.',
            },
            {
                title: 'Capture it on Amazon',
                body: 'Amazon ads and a sharp listing met readers at the moment they went looking for the book.',
            },
            {
                title: 'Keep both running',
                body: 'Meta kept feeding new readers in while Amazon kept converting them, long after launch.',
            },
        ],
        outcome: ['That Night went past 50,000 copies sold.'],
        testimonial: {
            quote: 'When I was about to publish my novel, I reached out to Aurelius Media and instantly knew I was in the right hands. Their creative team is hands down one of the best, spreading a huge buzz around my book. They go beyond marketing — they make your story impossible to ignore.',
            name: 'Nidhi Upadhyay',
            role: 'Author, That Night',
            avatar: '/testimonials/Nidhi.avif',
        },
        services: ['book-marketing', 'meta-ads'],
    },

    /* ───────────── Growth & performance ───────────── */
    {
        // Kit-verified cost per new subscriber (Provoked Sept close + Oct MTD
        // reports): Jun $5.56, Jul $2.35 (previous agency), Aug $2.33 (partly
        // ours), Sep $1.45, 1–21 Oct $1.17. 12-week retention 86.9%; cost per
        // kept subscriber Meta $1.35 vs SparkLoop $2.82; Kit match 63% → 93%.
        // The old homepage card's $2.28 → $0.97 was one ad set's week.
        // Don't name Susan or John, or the previous agency.
        slug: 'provoked-magazine',
        client: 'Provoked Magazine',
        group: 'growth',
        vertical: 'Media · Newsletter Subscriptions',
        title: 'Cost per subscriber halved, measured in the inbox',
        accent: 'halved',
        summary:
            'Provoked moved its Meta ads to us from another agency. We rebuilt the campaigns and the measurement behind them. The cost of a new subscriber, counted in Kit rather than in Meta, fell from $2.35 to $1.17, and 86.9% of those subscribers are still reading 12 weeks later.',
        cardLine: 'Cost per subscriber halved, counted in Kit',
        chips: ['50% lower cost per subscriber', '$2.35 → $1.17'],
        visual: {
            kind: 'photo',
            src: '/case-studies/provoked-magazine.webp',
            alt: 'A Provoked Magazine ad from the campaign',
        },
        stats: [
            { metric: '50%', label: 'Lower cost per new subscriber: $2.35 → $1.17' },
            { metric: '86.9%', label: 'Of Meta subscribers still subscribed at 12 weeks' },
            { metric: '$1.35', label: 'Per kept subscriber on Meta, vs $2.82 on SparkLoop' },
            { metric: '93%', label: 'Of Meta sign-ups now matched in Kit, up from 63%' },
        ],
        platforms: [
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Subscriber campaigns on Facebook and Instagram, rebuilt around the magazine’s own articles. New ads went live on 2 September.',
            },
            {
                kind: 'email',
                name: 'Kit',
                detail: 'The source of truth. We count a subscriber when Kit has them, and we exclude the existing list from the ads so no money goes to people already reading.',
            },
            {
                kind: 'tracking',
                name: 'GA4 & server-side tracking',
                detail: 'A GA4 sign-up event, then a server-side tracking spec we wrote and Stape built, live on 16 October.',
            },
        ],
        brief: [
            'Provoked is a free Thursday newsletter for women over 50, and it grows through subscribers. With the previous agency, a new subscriber cost $2.35 in July, counted in Kit.',
        ],
        steps: [
            {
                title: 'Review the year before',
                body: 'We started with an annual review of the account’s Meta spend, which showed where the money had gone and what it had bought.',
            },
            {
                title: 'Rebuild the ads',
                body: 'New ad sets and creative built from Provoked’s own articles and images, live from 2 September.',
            },
            {
                title: 'Count subscribers in Kit',
                body: 'A GA4 sign-up event and a reconciliation against Kit. Meta’s sign-ups now match the list 93% of the time, up from 63%.',
            },
            {
                title: 'Stop paying for existing readers',
                body: 'From 2 October the Kit list is excluded from the ads, so spend reaches people who are not subscribed yet.',
            },
            {
                title: 'Move tracking server-side',
                body: 'We wrote the tracking spec; Stape built it. Server-side tracking went live on 16 October.',
            },
            {
                title: 'Judge on readers who stay',
                body: 'We report kept subscribers as well as new ones: 86.9% of Meta subscribers are still there at 12 weeks, at $1.35 each against $2.82 for SparkLoop.',
            },
        ],
        outcome: [
            'Cost per new subscriber, counted in Kit, went from $2.35 in July to $1.45 in September and $1.17 for 1–21 October: half what it was. The subscribers stay, too, and each one Provoked keeps costs less than half what it pays SparkLoop.',
        ],
        services: ['meta-ads', 'meta-ads-management', 'analytics-reporting', 'email-lifecycle'],
    },
    {
        slug: 'aden-anais',
        client: 'aden + anais',
        group: 'growth',
        vertical: 'D2C E-commerce · Global',
        title: 'A 16-country collection launch on a $100,000 budget',
        accent: '16-country',
        summary:
            'For the launch of the aden + anais × babyGap collection, we ran the campaign across 16 countries, managed a $100,000 budget, and delivered 2,500 sales while cutting cost per acquisition by 37%.',
        cardLine: 'A 16-country launch for the babyGap collection',
        chips: ['2,500 sales', '37% lower CPA'],
        visual: {
            kind: 'photo',
            src: '/case-studies/UYQiJm2rPfGOYdRaYtjkLWBn0s.webp',
            alt: 'aden + anais campaign creative',
        },
        stats: [
            { metric: '2,500', label: 'Sales during the launch' },
            { metric: '16', label: 'Countries, one campaign' },
            { metric: '$100K', label: 'Budget managed by Aurelius' },
            { metric: '37%', label: 'Lower cost per acquisition' },
        ],
        platforms: [
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Facebook and Instagram campaigns in 16 countries, with budget moved country by country toward the markets that sold.',
            },
            {
                kind: 'creative',
                name: 'Launch creative',
                detail: 'Ad creative for the new collection, adapted for each market.',
            },
        ],
        brief: [
            'aden + anais, the global baby brand, was debuting a new collection with babyGap and needed one campaign to carry the launch across 16 countries at once.',
        ],
        steps: [
            {
                title: 'One launch, 16 markets',
                body: 'A single campaign structure that let us compare every country on the same terms.',
            },
            {
                title: 'Move money to the markets that sell',
                body: 'We managed the $100,000 budget actively, shifting spend toward the countries converting best.',
            },
            {
                title: 'Bring the cost of a sale down',
                body: 'Creative and audience tests ran throughout, and cost per acquisition fell by 37%.',
            },
        ],
        outcome: [
            'The collection launch delivered 2,500 sales across 16 countries, at a cost per acquisition 37% below where it started.',
        ],
        testimonial: {
            quote: 'What impressed me most was their process. Aurelius didn’t apply a cookie-cutter approach — they took the time to understand our unique challenges and built a custom strategy that delivered results within weeks.',
            name: 'Cameron Hildreth',
            role: 'Brand Manager, aden + anais',
            avatar: '/testimonials/Cameron Hildreth.avif',
        },
        services: ['meta-ads', 'd2c-ecommerce-marketing', 'creative-design'],
    },
    {
        slug: 'anandi-school',
        client: 'Anandi School',
        group: 'growth',
        vertical: 'Education · Admissions',
        title: 'Thousands of admission leads from Bangalore’s most affluent neighbourhoods',
        accent: 'Thousands of admission leads',
        summary:
            'Anandi School brought us in to drive admissions. We ran Meta ads hyper-targeted to the high-net-worth areas of Bangalore and generated thousands of admission leads.',
        cardLine: 'Hyper-local Meta ads for a Bangalore school',
        chips: ['1,000s of admission leads', 'Bangalore HNI areas'],
        stats: [
            { metric: '1,000s', label: 'Admission leads from Meta ads' },
            { metric: '1 city', label: 'Bangalore, its high-net-worth areas only' },
        ],
        platforms: [
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Facebook and Instagram campaigns drawn tight around Bangalore’s high-net-worth neighbourhoods, so every rupee reached families the school was built for.',
            },
        ],
        brief: [
            'Anandi School wanted more admission enquiries from the families it serves best, and those families live in a handful of Bangalore neighbourhoods.',
        ],
        steps: [
            {
                title: 'Draw the map first',
                body: 'We limited the ads to Bangalore’s high-net-worth areas, so no spend went to families outside the school’s catchment.',
            },
            {
                title: 'Speak to parents',
                body: 'Creative built around what those parents weigh when they choose a school.',
            },
            {
                title: 'Hand admissions real leads',
                body: 'Every enquiry went to the admissions team to follow up.',
            },
        ],
        outcome: ['The campaign generated thousands of admission leads from the neighbourhoods the school wanted to reach.'],
        services: ['education-marketing', 'meta-ads', 'lead-generation'],
    },
    {
        slug: 'private-university',
        client: 'Private University',
        group: 'growth',
        vertical: 'Education · Higher Ed',
        title: '2.5x enrollments for a university that was struggling',
        accent: '2.5x enrollments',
        summary:
            'A private university came to us while enrollments were struggling. Running Meta Ads, Google Ads and the channels around them as one system, we took enrollments to 2.5x without raising the budget.',
        cardLine: 'Every channel working as one admissions funnel',
        chips: ['2.5x enrollments', 'No increase in budget'],
        visual: {
            kind: 'photo',
            src: '/case-studies/PCg7rQvx3EQUl4ncNISDMHw8io.avif',
            alt: 'University students on campus',
        },
        stats: [
            { metric: '2.5x', label: 'Enrollments' },
            { metric: '0%', label: 'Increase in the marketing budget' },
        ],
        platforms: [
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Campaigns that put the university in front of prospective students and their parents.',
            },
            {
                kind: 'google',
                name: 'Google Ads',
                detail: 'Search campaigns that met students while they were searching for programmes.',
            },
        ],
        brief: [
            'The university was struggling to fill its seats, and the budget was fixed. Every channel had to pull its weight.',
        ],
        steps: [
            {
                title: 'Treat the channels as one funnel',
                body: 'Meta Ads, Google Ads and the rest planned together, each with a job in the student’s decision.',
            },
            {
                title: 'Spend where students decide',
                body: 'Budget moved to the campaigns that produced applications, inside the same total.',
            },
        ],
        outcome: ['Enrollments reached 2.5x, with no increase in budget.'],
        services: ['education-marketing', 'meta-ads', 'google-ads'],
        confidential: true,
    },

    /* ───────────── Product & prototypes ───────────── */
    {
        slug: 'health-tech-mvp',
        client: 'Stealth Health Tech Startup',
        group: 'product',
        vertical: 'Health Tech · MVP',
        title: 'From MVP to a $16M raise',
        accent: '$16M',
        summary:
            'A health tech startup in stealth needed proof that people wanted its product. We designed the UX, built the MVP and tested demand with Meta and Google ads. The startup went on to raise $16 million.',
        cardLine: 'MVP, UX and demand tests before the raise',
        chips: ['$16M raised', '84% response rate'],
        visual: {
            kind: 'photo',
            src: '/case-studies/qblDLWSIdCrrJBd83Cjf6xh6HM.avif',
            alt: 'Health tech MVP on screen',
        },
        stats: [
            { metric: '$16M', label: 'Funding raised after the MVP' },
            { metric: '84%', label: 'Response rate' },
            { metric: '300+', label: 'Qualified leads' },
        ],
        platforms: [
            {
                kind: 'ux',
                name: 'UX design',
                detail: 'The product’s user experience, designed from first screen to sign-up.',
            },
            {
                kind: 'product',
                name: 'MVP build',
                detail: 'A working MVP that real users could try.',
            },
            {
                kind: 'meta',
                name: 'Meta Ads',
                detail: 'Demand tests that showed whether the audience would respond.',
            },
            {
                kind: 'google',
                name: 'Google Ads',
                detail: 'Search tests that showed whether people were already looking for a solution.',
            },
        ],
        brief: [
            'A health tech startup, still in stealth, had a product idea and needed evidence that people wanted it before it raised.',
        ],
        steps: [
            { title: 'Design the experience', body: 'We designed the UX around the one thing the product had to prove.' },
            { title: 'Build the MVP', body: 'A working product, built fast enough to test while the idea was fresh.' },
            { title: 'Test demand with paid media', body: 'Meta and Google ads sent real people to the MVP, and the response rate told us they wanted it.' },
        ],
        outcome: [
            'The tests returned an 84% response rate and more than 300 qualified leads. The startup went on to raise $16 million.',
        ],
        services: ['no-code-development', 'google-ads', 'meta-ads', 'saas-marketing'],
        confidential: true,
    },
    {
        // Funding per Ayush (Dr. Khan, WhatsApp, Oct 2026); $125K confirmed by
        // Ayush on 23 Oct. Not launched yet: no launch date, no feature
        // detail ("without giving away everything"); frame as a collaboration.
        // The logo came from her brand book; we didn't design it.
        slug: 'hello-muslim',
        client: 'Hello Muslim',
        group: 'product',
        vertical: 'Platform · Prototype',
        title: 'A prototype that got Hello Muslim funded',
        accent: 'funded',
        summary:
            'Working with Dr. Daisy Khan and WISE, Aurelius designed and built the full Hello Muslim prototype. The platform has since been funded with $125,000, and the team is now hiring an AI engineer to take it into production.',
        cardLine: 'The full prototype, designed and built by Aurelius',
        chips: ['$125K funded', 'Prototype by Aurelius'],
        stats: [
            { metric: '$125K', label: 'Funding secured on the strength of the prototype' },
            { metric: '100%', label: 'Of the prototype designed and built by Aurelius' },
            { metric: 'Hiring', label: 'An AI engineer to build it out' },
        ],
        platforms: [
            {
                kind: 'strategy',
                name: 'Product strategy',
                detail: 'Shaped the idea into a product a funder can understand in minutes.',
            },
            {
                kind: 'ux',
                name: 'UX & interface',
                detail: 'Designed every screen of the prototype.',
            },
            {
                kind: 'product',
                name: 'Prototype build',
                detail: 'Built and deployed the working prototype end to end.',
            },
        ],
        brief: [
            'Dr. Daisy Khan, founder of the Women’s Islamic Initiative in Spirituality and Equality (WISE), had a vision for Hello Muslim and needed something funders could see, click through and believe in.',
        ],
        steps: [
            { title: 'Shape the idea', body: 'Together with Dr. Khan, we turned the vision into a clear product with a clear first use.' },
            { title: 'Design it', body: 'Every screen designed so the idea comes across without a pitch.' },
            { title: 'Build it', body: 'Aurelius built and deployed the full working prototype, and keeps developing it.' },
        ],
        outcome: [
            'Hello Muslim has been funded with $125,000, and the team is hiring an AI engineer to take the prototype into production. Aurelius remains responsible for developing the prototype.',
        ],
        services: ['no-code-development', 'ai-automation', 'pitch-decks'],
    },
    {
        slug: 'public-good-prototype',
        client: 'TIME100 Founder',
        group: 'product',
        vertical: 'Public Good · Prototype',
        title: 'Hired for marketing, trusted with the product',
        accent: 'trusted with the product',
        summary:
            'A founder named to the TIME100 list of the world’s most influential people hired Aurelius for marketing. The work went further: we designed the prototype for their public-good platform.',
        cardLine: 'Hired for marketing, asked to design the product',
        chips: ['TIME100 founder', 'Public-good prototype'],
        stats: [
            { metric: 'TIME100', label: 'Founder, unnamed at their request' },
            { metric: 'Prototype', label: 'Designed by Aurelius for a public-good platform' },
        ],
        platforms: [
            {
                kind: 'strategy',
                name: 'Marketing strategy',
                detail: 'The original brief: how to bring the founder’s work to a wider audience.',
            },
            {
                kind: 'ux',
                name: 'Prototype design',
                detail: 'The product itself: a prototype for a platform built for public good.',
            },
        ],
        brief: [
            'A TIME100-listed founder contracted Aurelius for their marketing. As we worked through the brief, it became clear the biggest lever was the platform itself.',
        ],
        steps: [
            { title: 'Start with marketing', body: 'We began where we were hired: the strategy for reaching the founder’s audience.' },
            { title: 'Go beyond it', body: 'We designed a prototype for a public-good platform that carries the founder’s mission.' },
        ],
        outcome: ['The founder now has a prototype for the platform, designed by the team they hired to market it.'],
        services: ['no-code-development', 'marketing-strategy-audit'],
        confidential: true,
    },
];

/* Homepage row order: photos, covers and number cards alternate. */
const homepageOrder = [
    'provoked-magazine',
    'nidhi-upadhyay-that-night',
    'illusion-of-i-am-fine',
    'karan-bajaj-freedom-manifesto',
    'aden-anais',
    'hello-muslim',
    'call-to-play-data-to-ai',
    'anandi-school',
    'health-tech-mvp',
    'public-good-prototype',
    'fill-your-own-cup',
    'private-university',
];

export const homepageCaseStudies = homepageOrder.map((slug) => caseStudies.find((c) => c.slug === slug)!);

export function getCaseStudy(slug: string) {
    return caseStudies.find((c) => c.slug === slug);
}

export function caseStudiesForService(serviceSlug: string) {
    return caseStudies.filter((c) => c.services.includes(serviceSlug));
}
