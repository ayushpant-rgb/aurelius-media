import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import MissionStatement from '@/components/sections/MissionStatement';
import CapabilitiesPanel from '@/components/sections/CapabilitiesPanel';
import ServicesOverview from '@/components/sections/ServicesOverview';
import FeaturedResults from '@/components/sections/FeaturedResults';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import BlogPreview from '@/components/sections/BlogPreview';
import CTABlock from '@/components/sections/CTABlock';
import KineticBand from '@/components/sections/KineticBand';
import { getAllPosts } from '@/lib/blog';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <TrustStrip />
      <MissionStatement />
      <FeaturedResults />
      <KineticBand />
      <ServicesOverview />
      <TestimonialsCarousel />
      <CapabilitiesPanel />
      <BlogPreview posts={posts} />
      <CTABlock />
    </>
  );
}
