/**
 * MarqueeBanner — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * Scrolling marquee banner with brand messages
 */
import { useLanguage } from '@/contexts/LanguageContext';

export default function MarqueeBanner() {
  const { t } = useLanguage();

  const messages = [
    t('marquee.1'), t('marquee.2'), t('marquee.3'), t('marquee.4'),
    t('marquee.5'), t('marquee.6'), t('marquee.7'), t('marquee.8'),
  ];

  const repeatedMessages = [...messages, ...messages];

  return (
    <div
      className="overflow-hidden border-b-3 border-[#0A1628]"
      style={{
        backgroundColor: '#FFE500',
        borderBottom: '3px solid #0A1628',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 25s linear infinite',
          willChange: 'transform',
        }}
      >
        {repeatedMessages.map((msg, i) => (
          <span
            key={i}
            className="font-pixel text-[#0A1628] mx-6"
            style={{ fontSize: '8px', letterSpacing: '0.05em', flexShrink: 0 }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
