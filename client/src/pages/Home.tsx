/**
 * Home — Madness Family
 * Single-page website integrating all sections
 * Style: Neo-Brutalist Pixel Arcade
 */
import Navbar from '@/components/Navbar';
import MarqueeBanner from '@/components/MarqueeBanner';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import LinksSection from '@/components/LinksSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <MarqueeBanner />
      </div>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ContactSection />
      <LinksSection />
    </div>
  );
}
