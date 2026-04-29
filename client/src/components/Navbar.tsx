/**
 * Navbar — Madness Family
 * Style: Neo-Brutalist Pixel Arcade
 * Sticky fixed-top navbar with cyan background, pixel font nav links, yellow hover
 * Mobile hamburger menu with slide-down drawer
 * Language switcher: ZH / EN toggle button
 */
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/logo-transparent_f5086686.png';

const navLinkKeys = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.contact', href: '#contact' },
  { key: 'nav.links', href: '#links' },
];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh');

  return (
    <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: '#00E5FF',
          borderBottom: scrolled ? '3px solid #0A1628' : '3px solid transparent',
          boxShadow: scrolled ? '0 4px 0 #0A1628' : 'none',
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center flex-shrink-0"
            >
              <img
                src={LOGO_URL}
                alt="Madness Family"
                className="h-10 md:h-12 w-auto object-contain"
                style={{ maxWidth: '200px' }}
              />
            </a>

            {/* Desktop Nav Links + Language Toggle */}
            <div className="hidden md:flex items-center gap-1">
              {navLinkKeys.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-pixel text-[9px] px-4 py-2 text-[#0A1628] transition-all duration-100 relative group hover:bg-[#FFE500] border-2 border-transparent hover:border-[#0A1628]"
                  style={{ 
                    letterSpacing: '0.05em',
                    transition: 'background-color 0.1s ease, border-color 0.1s ease, box-shadow 0.1s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '3px 3px 0 #0A1628';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {t(link.key)}
                </button>
              ))}

              {/* Language Toggle Button */}
              <button
                onClick={toggleLang}
                className="font-pixel text-[9px] px-3 py-2 ml-2 border-2 border-[#0A1628] bg-[#FFE500] text-[#0A1628] hover:bg-[#0A1628] hover:text-[#FFE500] transition-all duration-100"
                style={{
                  letterSpacing: '0.05em',
                  boxShadow: '3px 3px 0 #0A1628',
                  transition: 'background-color 0.1s ease, color 0.1s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-2px, -2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '5px 5px 0 #0A1628';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(0, 0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '3px 3px 0 #0A1628';
                }}
                title={lang === 'zh' ? 'Switch to English' : '切換至中文'}
              >
                {lang === 'zh' ? 'EN' : '中'}
              </button>
            </div>

            {/* Mobile: Language Toggle + Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLang}
                className="font-pixel text-[8px] px-2 py-1 border-2 border-[#0A1628] bg-[#FFE500] text-[#0A1628]"
                style={{ boxShadow: '2px 2px 0 #0A1628', letterSpacing: '0.05em' }}
              >
                {lang === 'zh' ? 'EN' : '中'}
              </button>

              {/* Hamburger */}
              <button
                className="p-2 border-2 border-[#0A1628] bg-white"
                style={{ boxShadow: '3px 3px 0 #0A1628' }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X size={20} color="#0A1628" />
                ) : (
                  <Menu size={20} color="#0A1628" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div
            className="md:hidden border-t-3 border-[#0A1628]"
            style={{
              borderTop: '3px solid #0A1628',
              backgroundColor: '#00E5FF',
            }}
          >
            <div className="container py-4 flex flex-col gap-2">
              {navLinkKeys.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-pixel text-[10px] px-4 py-3 text-left text-[#0A1628] border-2 border-[#0A1628] bg-white hover:bg-[#FFE500] transition-colors duration-100"
                  style={{
                    boxShadow: '3px 3px 0 #0A1628',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t(link.key)}
                </button>
              ))}
            </div>
          </div>
        )}
    </nav>
  );
}
