/**
 * AboutSection — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * White background, cyan pixel font title, brand story, highlight tags, team photo
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { AboutDecorations } from './CharacterDecorations';

const ABOUT_TEAM_URL_FALLBACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/about-team-new_39bf4a62.webp';

const tagIcons = ['🍦', '🇭🇰', '❤️', '✨'];
const tagKeys = ['about.tag1', 'about.tag2', 'about.tag3', 'about.tag4'];

const PixelCornerCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    {/* Corner accents */}
    <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628] z-10" />
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628] z-10" />
    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628] z-10" />
    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628] z-10" />
    {children}
  </div>
);

export default function AboutSection() {
  const { t, images } = useLanguage();
  const ABOUT_TEAM_URL = images.aboutTeam || ABOUT_TEAM_URL_FALLBACK;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const tags = tagKeys.map((key, i) => ({ label: t(key), icon: tagIcons[i] }));

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-visible" style={{ paddingTop: '80px' }}>
      <AboutDecorations />
      {/* Background pixel decoration */}
      <div
        className="absolute top-0 right-0 w-48 h-48 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #00E5FF 0px, #00E5FF 4px,
            transparent 4px, transparent 16px
          )`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #FFE500 0px, #FFE500 4px,
            transparent 4px, transparent 16px
          )`,
        }}
      />

      <div className="container" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Section title */}
            <div className="mb-8">
              <h2
                className="font-pixel text-[#00E5FF] leading-relaxed"
                style={{
                  fontSize: 'clamp(16px, 3vw, 26px)',
                  textShadow: '3px 3px 0 #0A1628',
                  letterSpacing: '0.05em',
                }}
              >
                {t('about.title')}
              </h2>
              {/* Yellow pixel underline */}
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-[#FFE500] border border-[#0A1628]"
                  />
                ))}
              </div>
            </div>

            {/* Brand story */}
            <div className="space-y-5 mb-8">
              <p
                className="font-pixel-body text-[#0A1628] leading-relaxed"
                style={{ fontSize: 'clamp(14px, 1.8vw, 17px)' }}
              >
                {t('about.p1')}
              </p>
              <p
                className="font-pixel-body text-[#0A1628] leading-relaxed"
                style={{ fontSize: 'clamp(14px, 1.8vw, 17px)' }}
              >
                {t('about.p2')}
              </p>
            </div>

            {/* Highlight tags */}
            <div className="grid grid-cols-2 gap-3">
              {tags.map((tag, i) => (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-[#0A1628] bg-[#00E5FF] hover:bg-[#FFE500] transition-colors duration-150 cursor-default"
                  style={{ boxShadow: '3px 3px 0 #0A1628' }}
                >
                  <span className="text-lg">{tag.icon}</span>
                  <span
                    className="font-pixel-body text-[#0A1628] font-extrabold"
                    style={{ fontSize: 'clamp(12px, 1.5vw, 15px)' }}
                  >
                    {tag.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Team photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <PixelCornerCard>
              <div
                className="border-3 border-[#0A1628] overflow-hidden"
                style={{
                  border: '3px solid #0A1628',
                  boxShadow: '8px 8px 0 #00E5FF, 12px 12px 0 #0A1628',
                }}
              >
                <img
                  src={ABOUT_TEAM_URL}
                  alt="Madness Family Team"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/3', display: 'block' }}
                />
              </div>
            </PixelCornerCard>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 bg-[#FFE500] border-3 border-[#0A1628] px-4 py-2 z-20"
              style={{
                border: '3px solid #0A1628',
                boxShadow: '4px 4px 0 #0A1628',
              }}
            >
              <span
                className="font-pixel text-[#0A1628]"
                style={{ fontSize: '9px', letterSpacing: '0.05em' }}
              >
                {t('about.badge')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
