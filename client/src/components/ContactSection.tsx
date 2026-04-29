/**
 * ContactSection — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * Cyan background, two white cards: contact info + contact form
 * No physical address, WhatsApp + Email only
 */
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { toast } from 'sonner';
import { MessageCircle, Mail, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { ContactDecorations } from './CharacterDecorations';

export default function ContactSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactMutation = trpc.content.submitContact.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error(t('contact.toast.error'), {
        style: {
          border: '3px solid #0A1628',
          boxShadow: '4px 4px 0 #0A1628',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: '700',
        },
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await contactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setFormData({ name: '', email: '', message: '' });
      toast.success(t('contact.toast.success'), {
        style: {
          border: '3px solid #0A1628',
          background: '#FFE500',
          color: '#0A1628',
          boxShadow: '4px 4px 0 #0A1628',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: '700',
        },
      });
    } catch {
      toast.error('Failed to send message. Please try again.', {
        style: {
          border: '3px solid #0A1628',
          boxShadow: '4px 4px 0 #0A1628',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: '700',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative overflow-visible"
      style={{ backgroundColor: '#00E5FF' }}
    >
      <ContactDecorations />
      {/* Top pixel wave */}
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
          className="text-center mb-4"
        >
          <h2
            className="font-pixel text-white leading-relaxed"
            style={{
              fontSize: 'clamp(16px, 3vw, 26px)',
              textShadow: '3px 3px 0 #0A1628',
              letterSpacing: '0.05em',
            }}
          >
            {t('contact.title')}
          </h2>
          <div className="flex gap-1 mt-3 justify-center">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#FFE500] border border-[#0A1628]" />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-pixel-body text-white text-center mb-12"
          style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', textShadow: '1px 1px 0 rgba(10,22,40,0.4)' }}
        >
          {t('contact.intro')}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-white border-3 border-[#0A1628] p-8"
            style={{
              border: '3px solid #0A1628',
              boxShadow: '8px 8px 0 #0A1628',
            }}
          >
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />

            <h3
              className="font-pixel text-[#0A1628] mb-8"
              style={{
                fontSize: 'clamp(10px, 1.5vw, 14px)',
                letterSpacing: '0.05em',
                textShadow: '2px 2px 0 rgba(0,229,255,0.5)',
              }}
            >
              {t('contact.touch.title')}
            </h3>

            <div className="space-y-6">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${t('contact.whatsapp.number').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 bg-[#00E5FF] border-2 border-[#0A1628] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFE500] transition-colors duration-150"
                  style={{ boxShadow: '3px 3px 0 #0A1628' }}
                >
                  <MessageCircle size={20} color="#0A1628" />
                </div>
                <div>
                  <div className="font-pixel text-[#0A1628] mb-1" style={{ fontSize: '8px' }}>{t('contact.whatsapp.label')}</div>
                  <div className="font-pixel-body text-[#0A1628] font-extrabold" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)' }}>
                    {t('contact.whatsapp.number')}
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${t('contact.email.address')}`}
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 bg-[#00E5FF] border-2 border-[#0A1628] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFE500] transition-colors duration-150"
                  style={{ boxShadow: '3px 3px 0 #0A1628' }}
                >
                  <Mail size={20} color="#0A1628" />
                </div>
                <div>
                  <div className="font-pixel text-[#0A1628] mb-1" style={{ fontSize: '8px' }}>{t('contact.email.label')}</div>
                  <div className="font-pixel-body text-[#0A1628] font-extrabold" style={{ fontSize: 'clamp(13px, 1.6vw, 16px)' }}>
                    {t('contact.email.address')}
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={`https://www.instagram.com/${t('contact.ig.handle').replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 bg-[#00E5FF] border-2 border-[#0A1628] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFE500] transition-colors duration-150"
                  style={{ boxShadow: '3px 3px 0 #0A1628' }}
                >
                  <Instagram size={20} color="#0A1628" />
                </div>
                <div>
                  <div className="font-pixel text-[#0A1628] mb-1" style={{ fontSize: '8px' }}>{t('contact.ig.label')}</div>
                  <div className="font-pixel-body text-[#0A1628] font-extrabold" style={{ fontSize: 'clamp(13px, 1.6vw, 16px)' }}>
                    {t('contact.ig.handle')}
                  </div>
                </div>
              </a>
            </div>

            {/* Note */}
            <div
              className="mt-8 p-4 bg-[#00E5FF] border-2 border-[#0A1628]"
              style={{ boxShadow: '3px 3px 0 #0A1628' }}
            >
              <p
                className="font-pixel-body text-[#0A1628] leading-relaxed"
                style={{ fontSize: 'clamp(12px, 1.4vw, 14px)' }}
              >
                {t('contact.touch.note')}
              </p>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-white border-3 border-[#0A1628] p-8"
            style={{
              border: '3px solid #0A1628',
              boxShadow: '8px 8px 0 #0A1628',
            }}
          >
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFE500] border-2 border-[#0A1628]" />

            <h3
              className="font-pixel text-[#0A1628] mb-8"
              style={{
                fontSize: 'clamp(10px, 1.5vw, 14px)',
                letterSpacing: '0.05em',
                textShadow: '2px 2px 0 rgba(0,229,255,0.5)',
              }}
            >
              {t('contact.form.title')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="font-pixel text-[#0A1628] block mb-2"
                  style={{ fontSize: '8px', letterSpacing: '0.05em' }}
                >
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.form.name.ph')}
                  className="w-full px-4 py-3 border-2 border-[#0A1628] bg-white font-pixel-body text-[#0A1628] outline-none focus:border-[#00E5FF] transition-colors"
                  style={{
                    fontSize: 'clamp(13px, 1.5vw, 15px)',
                    boxShadow: '3px 3px 0 #0A1628',
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="font-pixel text-[#0A1628] block mb-2"
                  style={{ fontSize: '8px', letterSpacing: '0.05em' }}
                >
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border-2 border-[#0A1628] bg-white font-pixel-body text-[#0A1628] outline-none focus:border-[#00E5FF] transition-colors"
                  style={{
                    fontSize: 'clamp(13px, 1.5vw, 15px)',
                    boxShadow: '3px 3px 0 #0A1628',
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="font-pixel text-[#0A1628] block mb-2"
                  style={{ fontSize: '8px', letterSpacing: '0.05em' }}
                >
                  {t('contact.form.msg')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact.form.msg.ph')}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-[#0A1628] bg-white font-pixel-body text-[#0A1628] outline-none focus:border-[#00E5FF] transition-colors resize-none"
                  style={{
                    fontSize: 'clamp(13px, 1.5vw, 15px)',
                    boxShadow: '3px 3px 0 #0A1628',
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="pixel-btn w-full text-center"
                style={{ fontSize: '9px' }}
              >
                {isSubmitting ? 'SENDING...' : t('contact.form.submit')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom pixel wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: '60px', display: 'block' }}
        >
          <path
            d="M0,60 L0,40 L50,40 L50,20 L100,20 L100,40 L150,40 L150,20 L200,20 L200,40 L250,40 L250,20 L300,20 L300,40 L350,40 L350,20 L400,20 L400,40 L450,40 L450,20 L500,20 L500,40 L550,40 L550,20 L600,20 L600,40 L650,40 L650,20 L700,20 L700,40 L750,40 L750,20 L800,20 L800,40 L850,40 L850,20 L900,20 L900,40 L950,40 L950,20 L1000,20 L1000,40 L1050,40 L1050,20 L1100,20 L1100,40 L1150,40 L1150,20 L1200,20 L1200,60 Z"
            fill="#0A1628"
          />
        </svg>
      </div>
    </section>
  );
}
