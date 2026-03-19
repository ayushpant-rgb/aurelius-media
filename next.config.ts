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
    ];
  },
};

export default nextConfig;
