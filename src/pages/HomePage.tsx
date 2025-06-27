import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import AiToolsSection from '../components/AiToolsSection';
import BlogSection from '../components/BlogSection';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <FeatureSection />
      <AiToolsSection />
      <BlogSection />
      <Newsletter />
    </div>
  );
}
