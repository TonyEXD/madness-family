/**
 * LinksSection + Footer — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * Dark navy background, social links, email subscription, footer
 */
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { toast } from 'sonner';
import { Instagram, Facebook, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LinksDecorations } from './CharacterDecorations';

const LOGO_URL_FALLBACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/logo-transparent_f5086686.png';

const socialLinkMeta = [
  { nameKey: 'links.ig.label', handleKey: 'links.ig.sub', socialKey: 'instagram', icon: Instagram, bgColor: '#FFE500' },
  { nameKey: 'links.fb.label', handleKey: 'links.fb.sub', socialKey: 'facebook', icon: Facebook, bgColor: '#00E5FF' },
  { nameKey: 'links.email.label', handleKey: 'links.email.sub', socialKey: 'email', icon: Mail, bgColor: '#FFE500' },
];

// Pixel decoration
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

export default function LinksSection() {
  const { t, images, social } = useLanguage();
  const LOGO_URL = images.logo || LOGO_URL_FALLBACK;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const socialLinks = socialLinkMeta.map(l => ({
    ...l,
    name: t(l.nameKey),
    handle: t(l.handleKey),
    url: l.socialKey === 'email'
      ? `mailto:${social.email || 'info@madnessfamily.hk'}`
      : (social[l.socialKey] || ''),
  }));

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t('links.subscribe.error'));
      return;
    }
    setEmail('');
    toast.success(t('links.subscribe.success'), {
      style: {
        border: '3px solid #0A1628',
        background: '#FFE500',
        color: '#0A1628',
        boxShadow: '4px 4px 0 #0A1628',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: '700',
      },
    });
  };

  return (
    <>
      {/* Links Section */}
      <section
        id="links"
        className="py-20 md:py-28 relative overflow-visible"
        style={{ backgroundColor: '#0A1628' }}
      >
        <LinksDecorations />
        {/* Pixel grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Floating pixel stars */}
        {[
          { top: '15%', left: '5%', size: 20, delay: 0 },
          { top: '70%', left: '8%', size: 16, delay: 1 },
          { top: '30%', left: '92%', size: 24, delay: 0.5 },
          { top: '80%', left: '88%', size: 18, delay: 1.5 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: star.top,
              left: star.left,
              animation: `float ${3 + i * 0.5}s ease-in-out ${star.delay}s infinite`,
            }}
          >
            <PixelStar size={star.size} color="#00E5FF" />
          </div>
        ))}

        <div className="container relative z-10" ref={ref}>
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-pixel text-[#FFE500] leading-relaxed"
              style={{
                fontSize: 'clamp(16px, 3vw, 26px)',
                textShadow: '3px 3px 0 #00E5FF',
                letterSpacing: '0.05em',
              }}
            >
              {t('links.title')}
            </h2>
            <div className="flex gap-1 mt-3 justify-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 border border-[#00E5FF] ${i % 2 === 0 ? 'bg-[#00E5FF]' : 'bg-[#FFE500]'}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Social links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {socialLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative flex flex-col items-center gap-4 p-8 border-3 border-[#00E5FF] group"
                  style={{
                    border: '3px solid #00E5FF',
                    boxShadow: '6px 6px 0 #00E5FF',
                    backgroundColor: '#0F1E35',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
                    textDecoration: 'none',
                  }}
                  whileHover={{
                    y: -4,
                    x: -4,
                    boxShadow: '10px 10px 0 #00E5FF',
                  }}
                >
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#00E5FF]" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#00E5FF]" />

                  <div
                    className="w-16 h-16 flex items-center justify-center border-2 border-[#00E5FF] group-hover:border-[#FFE500] transition-colors duration-150"
                    style={{ backgroundColor: link.bgColor }}
                  >
                    <Icon size={28} color="#0A1628" />
                  </div>

                  <div className="text-center">
                    <div
                      className="font-pixel text-[#FFE500] mb-2"
                      style={{ fontSize: '9px', letterSpacing: '0.1em' }}
                    >
                      {link.name}
                    </div>
                    <div
                      className="font-pixel-body text-white"
                      style={{ fontSize: 'clamp(12px, 1.4vw, 14px)' }}
                    >
                      {link.handle}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#00E5FF] group-hover:text-[#FFE500] transition-colors duration-150">
                    <span className="font-pixel" style={{ fontSize: '8px' }}>{t('links.visit')}</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Email subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <div
              className="border-3 border-[#00E5FF] p-8 text-center"
              style={{
                border: '3px solid #00E5FF',
                boxShadow: '6px 6px 0 #00E5FF',
                backgroundColor: '#0F1E35',
              }}
            >
              <h3
                className="font-pixel text-[#FFE500] mb-2"
                style={{ fontSize: 'clamp(10px, 1.5vw, 13px)', letterSpacing: '0.05em' }}
              >
                {t('links.sub')}
              </h3>
              <p
                className="font-pixel-body text-white mb-6"
                style={{ fontSize: 'clamp(13px, 1.5vw, 15px)' }}
              >
                {t('links.sub.desc')}
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('links.subscribe.ph')}
                  className="flex-1 px-4 py-3 border-2 border-[#00E5FF] bg-[#0A1628] text-white font-pixel-body outline-none focus:border-[#FFE500] transition-colors"
                  style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
                />
                <button
                  type="submit"
                  className="pixel-btn flex-shrink-0"
                  style={{ fontSize: '8px', whiteSpace: 'nowrap' }}
                >
                  {t('links.subscribe.btn')}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 border-t-4 border-[#00E5FF]"
        style={{ backgroundColor: '#060E1A' }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <img
              src={LOGO_URL}
              alt="Madness Family"
              className="h-10 w-auto"
              style={{ maxWidth: '180px', filter: 'brightness(1)' }}
            />

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p
                className="font-pixel text-[#00E5FF] mb-1"
                style={{ fontSize: '8px', letterSpacing: '0.05em' }}
              >
                {t('links.copyright')}
              </p>
              <p
                className="font-pixel-body text-white opacity-60"
                style={{ fontSize: '12px' }}
              >
                {t('links.copyright.sub')} 🍦
              </p>
            </div>
          </div>

          {/* Pixel divider */}
          <div className="flex gap-1 justify-center mt-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${i % 3 === 0 ? 'bg-[#FFE500]' : i % 3 === 1 ? 'bg-[#00E5FF]' : 'bg-white opacity-20'}`}
              />
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
