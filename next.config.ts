import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.aureliusmedia.co",
      },
      {
        protocol: "https",
        hostname: "aureliusmedia.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/page",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/product-led-content",
        destination: "/blog/product-led-marketing",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/#how-it-works",
        permanent: true,
      },
      {
        source: "/blog/meta-ads-vs-google-ads-budget-2026",
        destination: "/blog/meta-ads-vs-google-ads-budget",
        permanent: true,
      },
      {
        source: "/blog/instagram-growth-strategy-for-authors-2026",
        destination: "/blog/instagram-growth-strategy-for-authors",
        permanent: true,
      },
      {
        source: "/blog/is-programmatic-seo-dead-in-2026",
        destination: "/blog/is-programmatic-seo-dead",
        permanent: true,
      },
      {
        source: "/blog/marketing-trends-2026-2030",
        destination: "/blog/marketing-trends",
        permanent: true,
      },
      {
        source: "/blog/performance-max-2026-hero-or-villain",
        destination: "/blog/performance-max-hero-or-villain",
        permanent: true,
      },
      // /resources → /blog redirects (unused resource section)
      {
        source: '/resources',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/resources/:slug*',
        destination: '/blog',
        permanent: true,
      },
      // Deleted blog posts → most relevant surviving page
      {
        source: "/blog/linkedin-marketing-india",
        destination: "/services/linkedin-ads",
        permanent: true,
      },
      {
        source: "/blog/how-to-choose-performance-marketing-agency",
        destination: "/services/performance-marketing",
        permanent: true,
      },
      {
        source: "/blog/edtech-marketing-agency",
        destination: "/blog/edtech-marketing",
        permanent: true,
      },
      {
        source: "/blog/best-meta-ads-agency-india",
        destination: "/services/meta-ads",
        permanent: true,
      },
      {
        source: "/blog/performance-marketing-guide",
        destination: "/services/performance-marketing",
        permanent: true,
      },
      // Category → Service pillar redirects (keyword cannibalization fix)
      {
        source: "/categories/performance-marketing",
        destination: "/services/performance-marketing",
        permanent: true,
      },
      {
        source: "/categories/programmatic-seo",
        destination: "/services/programmatic-seo",
        permanent: true,
      },
      {
        source: "/categories/web-apps-mvps",
        destination: "/services/no-code-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
