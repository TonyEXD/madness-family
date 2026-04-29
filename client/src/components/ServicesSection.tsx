/**
 * ServicesSection — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * White background, alternating left-right service blocks
 * Service 01: Catering (image left, text right)
 * Service 02: Distribution (text left, image right)
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServicesDecorations } from './CharacterDecorations';

const GELATO_CART_URL_FALLBACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/popup-crowd-4k_19f40008.jpg';
const GELATO_CUP_URL_FALLBACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/gelato-cup_37d7594b.jpg';

const cateringBulletKeys = ['services.catering.b1', 'services.catering.b2', 'services.catering.b3', 'services.catering.b4'];
const distributionBulletKeys = ['services.dist.b1', 'services.dist.b2'];

export default function ServicesSection() {
  const { t, images } = useLanguage();
  const GELATO_CART_URL = images.gelatoCart || GELATO_CART_URL_FALLBACK;
  const GELATO_CUP_URL = images.gelatoCup || GELATO_CUP_URL_FALLBACK;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const cateringBullets = cateringBulletKeys.map(k => t(k));
  const distributionBullets = distributionBulletKeys.map(k => t(k));

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative overflow-visible" style={{ paddingTop: '80px' }}>
      <ServicesDecorations />
      {/* Background decoration */}
      <div
        className="absolute top-20 right-0 w-64 h-64 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #00E5FF 0px, #00E5FF 4px,
            transparent 4px, transparent 16px
          )`,
        }}
      />

      <div className="container" ref={ref}>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-pixel text-[#00E5FF] leading-relaxed"
            style={{
              fontSize: 'clamp(16px, 3vw, 26px)',
              textShadow: '3px 3px 0 #0A1628',
              letterSpacing: '0.05em',
            }}
          >
            {t('services.title')}
          </h2>
          <div className="flex gap-1 mt-3 justify-center">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#FFE500] border border-[#0A1628]" />
            ))}
          </div>
        </motion.div>

        {/* SERVICE 01 — CATERING: image left, text right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20"
        >
          {/* Image */}
          <div className="relative">
            {/* Number badge */}
            <div
              className="absolute -top-4 -left-4 z-20 w-12 h-12 bg-[#FFE500] border-3 border-[#0A1628] flex items-center justify-center"
              style={{ border: '3px solid #0A1628', boxShadow: '3px 3px 0 #0A1628' }}
            >
              <span className="font-pixel text-[#0A1628]" style={{ fontSize: '10px' }}>01</span>
            </div>
            <div
              className="overflow-hidden border-3 border-[#0A1628]"
              style={{
                border: '3px solid #0A1628',
                boxShadow: '8px 8px 0 #00E5FF, 12px 12px 0 #0A1628',
              }}
            >
              <img
                src={GELATO_CART_URL}
                alt="Madness Family Catering Service"
                className="w-full object-cover"
                style={{ aspectRatio: '4/3', display: 'block' }}
              />
            </div>
          </div>

          {/* Text */}
          <div>
            {/* Label badge */}
            <div
              className="inline-block mb-4 px-4 py-2 bg-[#00E5FF] border-2 border-[#0A1628]"
              style={{ boxShadow: '3px 3px 0 #0A1628' }}
            >
              <span className="font-pixel text-[#0A1628]" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
                {t('services.catering.badge')}
              </span>
            </div>

            <h3
              className="font-pixel text-[#0A1628] mb-4 leading-relaxed"
              style={{
                fontSize: 'clamp(14px, 2vw, 20px)',
                letterSpacing: '0.05em',
              }}
            >
              {t('services.catering.title')}
            </h3>

            <p
              className="font-pixel-body text-[#0A1628] leading-relaxed mb-6"
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)' }}
            >
              {t('services.catering.desc')}
            </p>

            <div className="space-y-2">
              {cateringBullets.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="flex-shrink-0 w-6 h-6 bg-[#FFE500] border-2 border-[#0A1628] flex items-center justify-center"
                  >
                    <Check size={12} color="#0A1628" strokeWidth={3} />
                  </div>
                  <span
                    className="font-pixel-body text-[#0A1628]"
                    style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pixel divider */}
        <div className="flex gap-2 justify-center mb-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 border border-[#0A1628] ${i % 2 === 0 ? 'bg-[#00E5FF]' : 'bg-[#FFE500]'}`}
            />
          ))}
        </div>

        {/* SERVICE 02 — DISTRIBUTION: text left, image right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Text (left on desktop, second on mobile) */}
          <div className="order-2 lg:order-1">
            {/* Label badge */}
            <div
              className="inline-block mb-4 px-4 py-2 bg-[#FFE500] border-2 border-[#0A1628]"
              style={{ boxShadow: '3px 3px 0 #0A1628' }}
            >
              <span className="font-pixel text-[#0A1628]" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
                {t('services.dist.badge')}
              </span>
            </div>

            <h3
              className="font-pixel text-[#0A1628] mb-4 leading-relaxed"
              style={{
                fontSize: 'clamp(14px, 2vw, 20px)',
                letterSpacing: '0.05em',
              }}
            >
              {t('services.dist.title')}
            </h3>

            <p
              className="font-pixel-body text-[#0A1628] leading-relaxed mb-6"
              style={{ fontSize: 'clamp(13px, 1.5vw, 16px)' }}
            >
              {t('services.dist.desc')}
            </p>

            <div className="space-y-2">
              {distributionBullets.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="flex-shrink-0 w-6 h-6 bg-[#00E5FF] border-2 border-[#0A1628] flex items-center justify-center"
                  >
                    <Check size={12} color="#0A1628" strokeWidth={3} />
                  </div>
                  <span
                    className="font-pixel-body text-[#0A1628]"
                    style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector('#contact');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 72;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="pixel-btn inline-block"
                style={{ fontSize: '9px' }}
              >
                {t('services.enquire')}
              </a>
            </div>
          </div>

          {/* Image (right on desktop, first on mobile) */}
          <div className="relative order-1 lg:order-2">
            {/* Number badge */}
            <div
              className="absolute -top-4 -right-4 z-20 w-12 h-12 bg-[#00E5FF] border-3 border-[#0A1628] flex items-center justify-center"
              style={{ border: '3px solid #0A1628', boxShadow: '3px 3px 0 #0A1628' }}
            >
              <span className="font-pixel text-[#0A1628]" style={{ fontSize: '10px' }}>02</span>
            </div>
            <div
              className="overflow-hidden border-3 border-[#0A1628]"
              style={{
                border: '3px solid #0A1628',
                boxShadow: '8px 8px 0 #FFE500, 12px 12px 0 #0A1628',
              }}
            >
              <img
                src={GELATO_CUP_URL}
                alt="Madness Family Gelato Distribution"
                className="w-full object-cover"
                style={{ aspectRatio: '3/4', display: 'block', maxHeight: '500px', objectPosition: 'center 35%' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
