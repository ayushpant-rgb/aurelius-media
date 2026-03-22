import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
    ];
  },
};

export default nextConfig;
