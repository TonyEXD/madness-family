/**
 * HeroSection — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * Full-viewport cyan hero with pure pixel grid background,
 * brand character family group (3D style with pixel-art border treatment),
 * large logo, taglines, CTA buttons, and pixel wave divider at bottom.
 */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const LOGO_URL_FALLBACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/logo-transparent_f5086686.png';

// Full individual characters with hands and legs (complete, crisp)
const CHAR_GREEN_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_green_2c11a5f3.png';
const CHAR_PINK_URL  = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_pink_1f972b7e.png';
const CHAR_MINI_URL  = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_mini_c998ba29.png';

// Pixel decorations
const PixelStar = ({ size = 16, color = '#FFE500' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="6" y="0" width="4" height="4" fill={color} />
    <rect x="6" y="12" width="4" height="4" fill={color} />
    <rect x="0" y="6" width="4" height="4" fill={color} />
    <rect x="12" y="6" width="4" height="4" fill={color} />
    <rect x="4" y="4" width="8" height="8" fill={color} />
    <rect x="2" y="2" width="4" height="4" fill={color} />
    <rect x="10" y="2" width="4" height="4" fill={color} />
    <rect x="2" y="10" width="4" height="4" fill={color} />
    <rect x="10" y="10" width="4" height="4" fill={color} />
  </svg>
);

const PixelHeart = ({ size = 20, color = '#FF6B9D' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="4" height="4" fill={color} />
    <rect x="14" y="4" width="4" height="4" fill={color} />
    <rect x="0" y="6" width="6" height="6" fill={color} />
    <rect x="14" y="6" width="6" height="6" fill={color} />
    <rect x="2" y="10" width="16" height="4" fill={color} />
    <rect x="4" y="14" width="12" height="4" fill={color} />
    <rect x="6" y="18" width="8" height="2" fill={color} />
  </svg>
);

const PixelDiamond = ({ size = 20, color = 'white' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="8" y="0" width="4" height="4" fill={color} />
    <rect x="4" y="4" width="12" height="4" fill={color} />
    <rect x="0" y="8" width="20" height="4" fill={color} />
    <rect x="4" y="12" width="12" height="4" fill={color} />
    <rect x="8" y="16" width="4" height="4" fill={color} />
  </svg>
);

const smallDecorations = [
  { component: 'star',    top: '10%', left: '4%',  delay: 0,   duration: 3,   size: 22, color: '#FFE500' },
  { component: 'heart',   top: '16%', left: '80%', delay: 0.5, duration: 4,   size: 20, color: '#FF6B9D' },
  { component: 'star',    top: '40%', left: '2%',  delay: 1,   duration: 3.5, size: 18, color: 'white' },
  { component: 'diamond', top: '38%', left: '92%', delay: 1.5, duration: 4.5, size: 16, color: '#FFE500' },
  { component: 'star',    top: '62%', left: '5%',  delay: 0.8, duration: 3.2, size: 14, color: 'white' },
  { component: 'heart',   top: '58%', left: '91%', delay: 2,   duration: 3.8, size: 18, color: '#FFE500' },
  { component: 'star',    top: '8%',  left: '44%', delay: 2.5, duration: 4,   size: 12, color: 'white' },
  { component: 'diamond', top: '22%', left: '55%', delay: 0.3, duration: 5,   size: 10, color: '#FFE500' },
];

export default function HeroSection() {
  const { t, images } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const LOGO_URL = images.logo || LOGO_URL_FALLBACK;

  const handleScrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#00E5FF', minHeight: '100svh', paddingBottom: 'clamp(320px, 46vw, 560px)' }}
    >
      {/* Pixel grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,80,120,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,80,120,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Subtle wavy blob shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute" style={{ top: '-10%', left: '-8%', width: '45vw', height: '45vw', borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%', background: 'rgba(0,180,220,0.22)' }} />
        <div className="absolute" style={{ bottom: '15%', right: '-6%', width: '35vw', height: '35vw', borderRadius: '45% 55% 40% 60% / 60% 40% 55% 45%', background: 'rgba(0,180,220,0.18)' }} />
        <div className="absolute" style={{ top: '30%', left: '8%', width: '16vw', height: '16vw', borderRadius: '50% 50% 60% 40% / 40% 60% 50% 50%', background: 'rgba(0,200,240,0.15)' }} />
        <div className="absolute" style={{ top: '18%', right: '10%', width: '12vw', height: '12vw', borderRadius: '55% 45% 50% 50% / 50% 55% 45% 50%', background: 'rgba(0,200,240,0.12)' }} />
      </div>

      {/* Small pixel accent decorations */}
      {smallDecorations.map((deco, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: deco.top, left: deco.left, animation: `float ${deco.duration}s ease-in-out ${deco.delay}s infinite` }}
        >
          {deco.component === 'star'    && <PixelStar    size={deco.size} color={deco.color} />}
          {deco.component === 'heart'   && <PixelHeart   size={deco.size} color={deco.color} />}
          {deco.component === 'diamond' && <PixelDiamond size={deco.size} color={deco.color} />}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-12 pb-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <img
            src={LOGO_URL}
            alt="Madness Family"
            className="w-full h-auto"
            style={{
              maxWidth: 'min(560px, 82vw)',
              filter: 'drop-shadow(4px 4px 0 rgba(10,22,40,0.45))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4"
        >
          <h1
            className="font-pixel text-[#FFE500] leading-relaxed"
            style={{
              fontSize: 'clamp(9px, 2.2vw, 17px)',
              textShadow: '3px 3px 0 #0A1628',
              letterSpacing: '0.05em',
            }}
          >
            {t('hero.tagline')}
          </h1>
        </motion.div>

        {/* Sub-tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <p
            className="font-pixel-body text-white font-extrabold"
            style={{
              fontSize: 'clamp(13px, 2.8vw, 21px)',
              textShadow: '2px 2px 0 rgba(10,22,40,0.45)',
            }}
          >
            {t('hero.sub')}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button onClick={handleScrollToServices} className="pixel-btn" style={{ fontSize: '9px' }}>
            {t('hero.cta.services')}
          </button>
          <button
            onClick={handleScrollToContact}
            className="pixel-btn-outline"
            style={{ fontSize: '9px', color: '#0A1628', background: 'rgba(255,255,255,0.9)' }}
          >
            {t('hero.cta.contact')}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <span className="font-pixel text-[8px] text-[#0A1628] opacity-60">{t('hero.scroll')}</span>
          <div className="flex flex-col gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-[#0A1628] opacity-40"
                style={{ animation: `blink 1.5s ease-in-out ${i * 0.3}s infinite` }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ===== Characters at bottom — full body with hands & legs ===== */}
      {/* Green character — left side */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: 'clamp(80px, 12vw, 140px)',
          left: 'clamp(0px, 5vw, 80px)',
          zIndex: 8,
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
      >
        <motion.img
          src={CHAR_GREEN_URL}
          alt="Green Character"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 'clamp(160px, 22vw, 320px)',
            height: 'auto',
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
          }}
        />
      </motion.div>

      {/* Pink character — right side */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: 'clamp(80px, 12vw, 140px)',
          right: 'clamp(0px, 5vw, 80px)',
          zIndex: 8,
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
      >
        <motion.img
          src={CHAR_PINK_URL}
          alt="Pink Character"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            width: 'clamp(140px, 20vw, 290px)',
            height: 'auto',
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
          }}
        />
      </motion.div>

      {/* Mini character — center bottom */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: 'clamp(75px, 11vw, 130px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 7,
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
      >
        <motion.img
          src={CHAR_MINI_URL}
          alt="Mini Character"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            width: 'clamp(80px, 12vw, 160px)',
            height: 'auto',
            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.2))',
          }}
        />
      </motion.div>

      {/* Pixel wave divider at bottom — behind characters */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 5 }}>
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: '100px', display: 'block' }}
        >
          <path
            d="M0,100 L0,70 L50,70 L50,50 L100,50 L100,70 L150,70 L150,50 L200,50 L200,70 L250,70 L250,50 L300,50 L300,70 L350,70 L350,50 L400,50 L400,70 L450,70 L450,50 L500,50 L500,70 L550,70 L550,50 L600,50 L600,70 L650,70 L650,50 L700,50 L700,70 L750,70 L750,50 L800,50 L800,70 L850,70 L850,50 L900,50 L900,70 L950,70 L950,50 L1000,50 L1000,70 L1050,70 L1050,50 L1100,50 L1100,70 L1150,70 L1150,50 L1200,50 L1200,100 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
