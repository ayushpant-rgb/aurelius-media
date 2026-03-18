import Hero from '@/components/sections/Hero';
import MissionStatement from '@/components/sections/MissionStatement';
import CapabilitiesPanel from '@/components/sections/CapabilitiesPanel';
import ServicesOverview from '@/components/sections/ServicesOverview';
import FeaturedResults from '@/components/sections/FeaturedResults';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import BlogPreview from '@/components/sections/BlogPreview';
import CTABlock from '@/components/sections/CTABlock';
import BlurReveal from '@/components/ui/BlurReveal';
import { getAllPosts } from '@/lib/blog';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <BlurReveal><MissionStatement /></BlurReveal>
      <FeaturedResults />
      <ServicesOverview />
      <TestimonialsCarousel />
      <CapabilitiesPanel />
      <BlogPreview posts={posts} />
      <CTABlock />
    </>
  );
}
