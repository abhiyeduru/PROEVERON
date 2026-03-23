// src/pages/HomePage.jsx
import HeroSection from '../components/home/HeroSection';
import VideoSection from '../components/home/VideoSection';
import AboutSection from '../components/home/AboutSection';
import EcosystemSection from '../components/home/EcosystemSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import InvestmentModels from '../components/home/InvestmentModels';
import WhyInvestSection from '../components/home/WhyInvestSection';
import ROICalculator from '../components/home/ROICalculator';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <EcosystemSection />
      <FeaturedProjects />
      <InvestmentModels />
      <WhyInvestSection />
      <ROICalculator />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
