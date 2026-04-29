import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { trpc } from '@/lib/trpc';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  images: Record<string, string>;
  social: Record<string, string>;
  isLoaded: boolean;
}

// ─── Static fallback translations (used before API loads) ────────────────────
const DEFAULT_TRANSLATIONS: Record<Language, Record<string, string>> = {
  zh: {
    'nav.about': 'ABOUT US',
    'nav.experience': 'EXPERIENCE',
    'nav.services': 'SERVICES',
    'nav.contact': 'CONTACT',
    'nav.links': 'LINKS',
    'marquee.1': '🍦 MADNESS TIME, CHILL MOMENT',
    'marquee.2': '★ 手工製作 ARTISAN GELATO',
    'marquee.3': '🎪 POP-UP MARKETS ACROSS HK',
    'marquee.4': '✨ 創意口味 CREATIVE FLAVOURS',
    'marquee.5': '❤️ MADE WITH LOVE IN HONG KONG',
    'marquee.6': '🛒 CATERING & DISTRIBUTION',
    'marquee.7': '📸 INSTAGRAM-WORTHY MOMENTS',
    'marquee.8': '🇭🇰 本地品牌 LOCAL BRAND',
    'hero.tagline': 'MADNESS TIME, CHILL MOMENT',
    'hero.sub': '同你一齊顛覆 Gelato 世界既本地品牌',
    'hero.cta.services': 'OUR SERVICES',
    'hero.cta.contact': 'CONTACT US',
    'hero.scroll': 'SCROLL DOWN',
    'about.title': 'ABOUT US',
    'about.p1': 'Madness Family 是一個紮根香港的本地 Gelato 品牌，我們以創意和熱情顛覆傳統雪糕的世界。從經典的比利時朱古力到大膽的麻醬味、蝦醬味，每一球 Gelato 都是我們對品質和創新的堅持。',
    'about.p2': '我們相信，美味的 Gelato 能夠將人們聚在一起。無論是家庭聚會、朋友派對還是特別的慶祝時刻，Madness Family 都希望成為你最甜蜜的回憶。',
    'about.tag1': '手工製作',
    'about.tag2': '本地風味',
    'about.tag3': '家庭溫暖',
    'about.tag4': '創意無限',
    'about.badge': 'MADE IN HK',
    'exp.title': 'THE MADNESS EXPERIENCE',
    'exp.card1.title': 'POP-UP MARKETS',
    'exp.card1.desc': '我們定期出現在全港各大商場和市集，從赤柱廣場到荃灣廣場，帶給你最新鮮的 Gelato 體驗。每次 Pop-up 都有獨家限定口味！',
    'exp.card2.title': 'CREATIVE FLAVOURS',
    'exp.card2.desc': '從全港首創的麻醬味、蝦醬味到茉莉花 Gelato，我們不斷挑戰味蕾的極限。每一款口味都是精心研發，融合本地文化與意式工藝。',
    'exp.card3.title': 'INSTAGRAM-WORTHY',
    'exp.card3.desc': '我們獨家設計的可愛雪糕托盤是全港首創，讓每一球 Gelato 都成為打卡焦點。分享你的 Madness 時刻！',
    'exp.card4.title': 'FAMILY MOMENTS',
    'exp.card4.desc': 'Madness Family 不只是一個品牌，更是一個大家庭。我們珍惜每一個與你分享甜蜜的時刻，讓 Gelato 成為連結家人和朋友的橋樑。',
    'services.title': 'OUR SERVICES',
    'services.catering.badge': 'CATERING',
    'services.catering.title': 'The Madness Family',
    'services.catering.desc': '為你的活動增添甜蜜驚喜！Madness Family 提供專業的 Gelato 到會服務，無論是企業活動、婚禮、生日派對還是商場市集，我們都能為你度身訂造最完美的 Gelato 體驗。',
    'services.catering.b1': '企業活動及商場市集',
    'services.catering.b2': '婚禮及私人派對',
    'services.catering.b3': '節日慶典及特別活動',
    'services.catering.b4': '度身訂造口味',
    'services.dist.badge': 'DISTRIBUTION',
    'services.dist.title': 'The Madness Family',
    'services.dist.desc': '我們亦為餐廳、酒店及零售商提供批發服務，以最優質的手工 Gelato 提升你的餐飲體驗。歡迎聯絡我們了解更多合作詳情。',
    'services.dist.b1': '餐廳及酒店批發',
    'services.dist.b2': '零售合作夥伴計劃',
    'services.enquire': 'ENQUIRE NOW',
    'contact.title': 'CONTACT US',
    'contact.intro': '有任何查詢或想預訂我們的服務？歡迎留下你的聯絡資料，我們會盡快回覆！',
    'contact.touch.title': 'GET IN TOUCH',
    'contact.touch.note': '💡 我們經常在不同商場舉辦 Pop-up 活動，請關注我們的 Instagram 獲取最新消息！',
    'contact.form.title': 'SEND A MESSAGE',
    'contact.form.name': 'NAME',
    'contact.form.name.ph': '你的名字',
    'contact.form.email': 'EMAIL *',
    'contact.form.email.ph': 'your@email.com',
    'contact.form.msg': 'MESSAGE *',
    'contact.form.msg.ph': '告訴我們你的需求...',
    'contact.form.submit': 'SEND MESSAGE',
    'contact.toast.success': '訊息已發送！我們會盡快回覆你。',
    'contact.toast.error': '請填寫電郵和訊息。',
    'contact.whatsapp.label': 'WHATSAPP',
    'contact.whatsapp.number': '+852 5166 4808',
    'contact.email.label': 'EMAIL',
    'contact.email.address': 'info@madnessfamily.hk',
    'contact.ig.label': 'INSTAGRAM',
    'contact.ig.handle': '@madness_family_hk',
    'exp.photo1.label': 'POP-UP',
    'exp.photo2.label': 'GELATO CART',
    'links.title': 'FOLLOW US',
    'links.sub': 'STAY UPDATED',
    'links.sub.desc': '訂閱我們的最新消息，第一時間知道 Pop-up 活動和新口味！',
    'links.subscribe.ph': 'your@email.com',
    'links.subscribe.btn': 'SUBSCRIBE',
    'links.subscribe.success': '訂閱成功！感謝你的支持 🍦',
    'links.subscribe.error': '請輸入有效的電郵地址',
    'links.ig.label': 'INSTAGRAM',
    'links.ig.sub': '@madness_family_hk',
    'links.fb.label': 'FACEBOOK',
    'links.fb.sub': 'Madness Family HK',
    'links.email.label': 'EMAIL',
    'links.email.sub': 'info@madnessfamily.hk',
    'links.visit': 'VISIT',
    'links.copyright': '© 2025 MADNESS FAMILY',
    'links.copyright.sub': 'MADNESS TIME, CHILL MOMENT',
  },
  en: {
    'nav.about': 'ABOUT US',
    'nav.experience': 'EXPERIENCE',
    'nav.services': 'SERVICES',
    'nav.contact': 'CONTACT',
    'nav.links': 'LINKS',
    'marquee.1': '🍦 MADNESS TIME, CHILL MOMENT',
    'marquee.2': '★ HANDCRAFTED ARTISAN GELATO',
    'marquee.3': '🎪 POP-UP MARKETS ACROSS HK',
    'marquee.4': '✨ CREATIVE FLAVOURS',
    'marquee.5': '❤️ MADE WITH LOVE IN HONG KONG',
    'marquee.6': '🛒 CATERING & DISTRIBUTION',
    'marquee.7': '📸 INSTAGRAM-WORTHY MOMENTS',
    'marquee.8': '🇭🇰 LOCAL BRAND',
    'hero.tagline': 'MADNESS TIME, CHILL MOMENT',
    'hero.sub': 'The local brand redefining Gelato in Hong Kong',
    'hero.cta.services': 'OUR SERVICES',
    'hero.cta.contact': 'CONTACT US',
    'hero.scroll': 'SCROLL DOWN',
    'about.title': 'ABOUT US',
    'about.p1': 'Madness Family is a homegrown Hong Kong gelato brand driven by creativity and passion. From classic Belgian chocolate to bold sesame paste and shrimp paste flavours, every scoop reflects our commitment to quality and innovation.',
    'about.p2': "We believe delicious gelato brings people together. Whether it's a family gathering, a friends' party, or a special celebration, Madness Family aims to be your sweetest memory.",
    'about.tag1': 'Handcrafted',
    'about.tag2': 'Local Flavours',
    'about.tag3': 'Family Warmth',
    'about.tag4': 'Endless Creativity',
    'about.badge': 'MADE IN HK',
    'exp.title': 'THE MADNESS EXPERIENCE',
    'exp.card1.title': 'POP-UP MARKETS',
    'exp.card1.desc': 'We regularly appear at major shopping malls and markets across Hong Kong — from Stanley Plaza to Tsuen Wan Plaza — bringing you the freshest gelato experience. Each pop-up features exclusive limited-edition flavours!',
    'exp.card2.title': 'CREATIVE FLAVOURS',
    'exp.card2.desc': "From Hong Kong's first sesame paste and shrimp paste gelato to jasmine flower, we constantly push the boundaries of taste. Every flavour is carefully crafted, blending local culture with Italian artisanship.",
    'exp.card3.title': 'INSTAGRAM-WORTHY',
    'exp.card3.desc': 'Our exclusively designed adorable gelato serving trays are a Hong Kong first — making every scoop a photo-worthy moment. Share your Madness moment!',
    'exp.card4.title': 'FAMILY MOMENTS',
    'exp.card4.desc': "Madness Family is more than a brand — it's a big family. We cherish every sweet moment shared with you, letting gelato become the bridge connecting family and friends.",
    'services.title': 'OUR SERVICES',
    'services.catering.badge': 'CATERING',
    'services.catering.title': 'The Madness Family',
    'services.catering.desc': 'Add a sweet surprise to your event! Madness Family offers professional gelato catering services for corporate events, weddings, birthday parties, and mall pop-ups.',
    'services.catering.b1': 'Corporate Events & Mall Pop-ups',
    'services.catering.b2': 'Weddings & Private Parties',
    'services.catering.b3': 'Festive Celebrations & Special Events',
    'services.catering.b4': 'Customised Flavours',
    'services.dist.badge': 'DISTRIBUTION',
    'services.dist.title': 'The Madness Family',
    'services.dist.desc': 'We also provide wholesale services to restaurants, hotels, and retailers, elevating your dining experience with the finest handcrafted gelato. Contact us to learn more about partnership opportunities.',
    'services.dist.b1': 'Restaurant & Hotel Wholesale',
    'services.dist.b2': 'Retail Partnership Programme',
    'services.enquire': 'ENQUIRE NOW',
    'contact.title': 'CONTACT US',
    'contact.intro': "Have a question or want to book our services? Leave your details and we'll get back to you as soon as possible!",
    'contact.touch.title': 'GET IN TOUCH',
    'contact.touch.note': '💡 We regularly host pop-up events at various malls. Follow our Instagram for the latest updates!',
    'contact.form.title': 'SEND A MESSAGE',
    'contact.form.name': 'NAME',
    'contact.form.name.ph': 'Your name',
    'contact.form.email': 'EMAIL *',
    'contact.form.email.ph': 'your@email.com',
    'contact.form.msg': 'MESSAGE *',
    'contact.form.msg.ph': 'Tell us about your needs...',
    'contact.form.submit': 'SEND MESSAGE',
    'contact.toast.success': "Message sent! We'll get back to you soon.",
    'contact.toast.error': 'Please fill in your email and message.',
    'contact.whatsapp.label': 'WHATSAPP',
    'contact.whatsapp.number': '+852 5166 4808',
    'contact.email.label': 'EMAIL',
    'contact.email.address': 'info@madnessfamily.hk',
    'contact.ig.label': 'INSTAGRAM',
    'contact.ig.handle': '@madness_family_hk',
    'exp.photo1.label': 'POP-UP',
    'exp.photo2.label': 'GELATO CART',
    'links.title': 'FOLLOW US',
    'links.sub': 'STAY UPDATED',
    'links.sub.desc': 'Subscribe for the latest news — be the first to know about pop-up events and new flavours!',
    'links.subscribe.ph': 'your@email.com',
    'links.subscribe.btn': 'SUBSCRIBE',
    'links.subscribe.success': 'Subscribed! Thank you for your support 🍦',
    'links.subscribe.error': 'Please enter a valid email address',
    'links.ig.label': 'INSTAGRAM',
    'links.ig.sub': '@madness_family_hk',
    'links.fb.label': 'FACEBOOK',
    'links.fb.sub': 'Madness Family HK',
    'links.email.label': 'EMAIL',
    'links.email.sub': 'info@madnessfamily.hk',
    'links.visit': 'VISIT',
    'links.copyright': '© 2025 MADNESS FAMILY',
    'links.copyright.sub': 'MADNESS TIME, CHILL MOMENT',
  },
};

const DEFAULT_IMAGES: Record<string, string> = {
  logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/logo-transparent_f5086686.png',
  characters: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/chars-family_c8bfb2c7.png',
  charGreen: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_green_2c11a5f3.png',
  charPink: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_pink_1f972b7e.png',
  charMini: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_mini_c998ba29.png',
  aboutTeam: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/about-team-new_39bf4a62.webp',
  expPhoto1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/catering-popwalk-4k_68005f32.jpg',
  expPhoto2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/gelato-cart-indoor-4k_1c1679be.jpg',
  gelatoCart: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/popup-crowd-4k_19f40008.jpg',
  gelatoCup: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663521525574/WjTo48czAgD5XK28VPgPrj/gelato-cup_37d7594b.jpg',
};

const DEFAULT_SOCIAL: Record<string, string> = {
  instagram: 'https://www.instagram.com/madness_family_hk',
  facebook: 'https://www.facebook.com/madnessfamilyhk',
  email: 'info@madnessfamily.hk',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<Language, Record<string, string>>>(DEFAULT_TRANSLATIONS);
  const [images, setImages] = useState<Record<string, string>>(DEFAULT_IMAGES);
  const [social, setSocial] = useState<Record<string, string>>(DEFAULT_SOCIAL);
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: serverData } = trpc.content.get.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (serverData) {
      setDynamicTranslations({
        zh: { ...DEFAULT_TRANSLATIONS.zh, ...(serverData.zh || {}) },
        en: { ...DEFAULT_TRANSLATIONS.en, ...(serverData.en || {}) },
      });
      setImages({ ...DEFAULT_IMAGES, ...(serverData.images || {}) });
      setSocial({ ...DEFAULT_SOCIAL, ...(serverData.social || {}) });
      setIsLoaded(true);
    }
  }, [serverData]);

  const t = (key: string): string => {
    return dynamicTranslations[lang]?.[key] ?? dynamicTranslations['en']?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, images, social, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
