import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import MissionStatement from '@/components/sections/MissionStatement';
import CapabilitiesPanel from '@/components/sections/CapabilitiesPanel';
import ServicesOverview from '@/components/sections/ServicesOverview';
import FeaturedResults from '@/components/sections/FeaturedResults';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import BlogPreview from '@/components/sections/BlogPreview';
import CTABlock from '@/components/sections/CTABlock';
import { getAllPosts } from '@/lib/blog';

const topicLinks = [
  { label: 'B2B Marketing', href: '/categories/b2b-marketing' },
  { label: 'Full-Funnel Marketing', href: '/categories/full-funnel-marketing' },
  { label: 'Marketing Collaterals', href: '/categories/marketing-collaterals' },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <MissionStatement />
      <FeaturedResults />
      <ServicesOverview />
      <TestimonialsCarousel />
      <CapabilitiesPanel />
      <BlogPreview posts={posts} />
      <CTABlock />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {topicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-brand-gray hover:text-brand-white border border-brand-border-subtle rounded-full transition-colors hover:border-brand-accent/30"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
