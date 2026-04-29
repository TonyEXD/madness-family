/**
 * ExperienceSection — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * Cyan background, two side-by-side photos, 4 experience cards in 2x2 grid
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExperienceDecorations } from './CharacterDecorations';

const EXP_PHOTO1_FALLBACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/catering-popwalk-4k_68005f32.jpg';
const EXP_PHOTO2_FALLBACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/gelato-cart-indoor-4k_1c1679be.jpg';

const cardIcons = ['🎪', '🍦', '📸', '👨‍👩‍👧‍👦'];
const cardTitleKeys = ['exp.card1.title', 'exp.card2.title', 'exp.card3.title', 'exp.card4.title'];
const cardDescKeys = ['exp.card1.desc', 'exp.card2.desc', 'exp.card3.desc', 'exp.card4.desc'];

export default function ExperienceSection() {
  const { t, images } = useLanguage();
  const EXP_PHOTO1 = (images as Record<string, string>)?.expPhoto1 || EXP_PHOTO1_FALLBACK;
  const EXP_PHOTO2 = (images as Record<string, string>)?.expPhoto2 || EXP_PHOTO2_FALLBACK;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const experienceCards = cardTitleKeys.map((titleKey, i) => ({
    icon: cardIcons[i],
    title: t(titleKey),
    desc: t(cardDescKeys[i]),
  }));

  return (
    <section
      id="experience"
      className="py-20 md:py-28 relative overflow-visible"
      style={{ backgroundColor: '#00E5FF' }}
    >
      <ExperienceDecorations />
      {/* Top pixel wave from white */}
      <div className="absolute top-0 left-0 right-0" style={{ marginTop: '-1px' }}>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: '60px', display: 'block', transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,60 L0,40 L50,40 L50,20 L100,20 L100,40 L150,40 L150,20 L200,20 L200,40 L250,40 L250,20 L300,20 L300,40 L350,40 L350,20 L400,20 L400,40 L450,40 L450,20 L500,20 L500,40 L550,40 L550,20 L600,20 L600,40 L650,40 L650,20 L700,20 L700,40 L750,40 L750,20 L800,20 L800,40 L850,40 L850,20 L900,20 L900,40 L950,40 L950,20 L1000,20 L1000,40 L1050,40 L1050,20 L1100,20 L1100,40 L1150,40 L1150,20 L1200,20 L1200,60 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Pixel grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,22,40,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,22,40,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10" ref={ref} style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="font-pixel text-white leading-relaxed"
            style={{
              fontSize: 'clamp(12px, 2.5vw, 22px)',
              textShadow: '3px 3px 0 #0A1628',
              letterSpacing: '0.05em',
            }}
          >
            {t('exp.title')}
          </h2>
          <div className="flex gap-1 mt-3 justify-center">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#FFE500] border border-[#0A1628]" />
            ))}
          </div>
        </motion.div>

        {/* Two side-by-side photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div
            className="overflow-hidden"
                style={{
                  border: '3px solid #0A1628',
                  boxShadow: '6px 6px 0 #0A1628',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <img
                  src={EXP_PHOTO1}
                  alt="Madness Family Gelato Cart"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ aspectRatio: '4/3', display: 'block' }}
                />
            </div>
            <div
              className="absolute -bottom-3 -left-3 bg-[#FFE500] border-2 border-[#0A1628] px-3 py-1"
              style={{ boxShadow: '3px 3px 0 #0A1628' }}
            >
              <span className="font-pixel text-[#0A1628]" style={{ fontSize: '8px' }}>
                {t('exp.photo1.label')}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <div
            className="overflow-hidden"
                style={{
                  border: '3px solid #0A1628',
                  boxShadow: '6px 6px 0 #0A1628',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <img
                  src={EXP_PHOTO2}
                alt="Madness Family Pop-up Market"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ aspectRatio: '4/3', display: 'block' }}
              />
            </div>
            <div
              className="absolute -bottom-3 -right-3 bg-[#FFE500] border-2 border-[#0A1628] px-3 py-1"
              style={{ boxShadow: '3px 3px 0 #0A1628' }}
            >
              <span className="font-pixel text-[#0A1628]" style={{ fontSize: '8px' }}>
                {t('exp.photo2.label')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Experience cards 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {experienceCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="relative bg-white border-3 border-[#0A1628] p-6 group cursor-default"
              style={{
                border: '3px solid #0A1628',
                boxShadow: '6px 6px 0 #0A1628',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              whileHover={{
                y: -4,
                x: -4,
                boxShadow: '10px 10px 0 #0A1628',
              }}
            >
              {/* Yellow corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />

              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{card.icon}</span>
                <h3
                  className="font-pixel text-[#00E5FF]"
                  style={{
                    fontSize: 'clamp(8px, 1.2vw, 11px)',
                    textShadow: '2px 2px 0 #0A1628',
                    letterSpacing: '0.05em',
                    lineHeight: '1.8',
                  }}
                >
                  {card.title}
                </h3>
              </div>
              <p
                className="font-pixel-body text-[#0A1628] leading-relaxed"
                style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom pixel wave to white */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: '60px', display: 'block' }}
        >
          <path
            d="M0,60 L0,40 L50,40 L50,20 L100,20 L100,40 L150,40 L150,20 L200,20 L200,40 L250,40 L250,20 L300,20 L300,40 L350,40 L350,20 L400,20 L400,40 L450,40 L450,20 L500,20 L500,40 L550,40 L550,20 L600,20 L600,40 L650,40 L650,20 L700,20 L700,40 L750,40 L750,20 L800,20 L800,40 L850,40 L850,20 L900,20 L900,40 L950,40 L950,20 L1000,20 L1000,40 L1050,40 L1050,20 L1100,20 L1100,40 L1150,40 L1150,20 L1200,20 L1200,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
