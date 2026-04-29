/**
 * Admin — Madness Family CMS
 * Replicates the Railway admin panel: text content, image URLs, social links
 * Password protected + image upload support
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { trpc } from '@/lib/trpc';

const ADMIN_PASSWORD = 'mfweb2796';

// ─── Section definitions (matching Railway exactly) ───────────────────────────
const SECTIONS = [
  { id: 'nav', label: '導覽列 Navigation', icon: '🧭', keys: ['nav.about', 'nav.experience', 'nav.services', 'nav.contact', 'nav.links'] },
  { id: 'marquee', label: '跑馬燈 Marquee Banner', icon: '📢', keys: ['marquee.1', 'marquee.2', 'marquee.3', 'marquee.4', 'marquee.5', 'marquee.6', 'marquee.7', 'marquee.8'] },
  { id: 'hero', label: '主視覺 Hero Section', icon: '🎯', keys: ['hero.tagline', 'hero.sub', 'hero.cta.services', 'hero.cta.contact', 'hero.scroll'] },
  { id: 'about', label: '關於我們 About', icon: '🍦', keys: ['about.title', 'about.p1', 'about.p2', 'about.tag1', 'about.tag2', 'about.tag3', 'about.tag4', 'about.badge'] },
  { id: 'exp', label: '品牌體驗 Experience', icon: '✨', keys: ['exp.title', 'exp.card1.title', 'exp.card1.desc', 'exp.card2.title', 'exp.card2.desc', 'exp.card3.title', 'exp.card3.desc', 'exp.card4.title', 'exp.card4.desc', 'exp.photo1.label', 'exp.photo2.label'] },
  { id: 'services', label: '服務 Services', icon: '🛒', keys: ['services.title', 'services.catering.badge', 'services.catering.title', 'services.catering.desc', 'services.catering.b1', 'services.catering.b2', 'services.catering.b3', 'services.catering.b4', 'services.dist.badge', 'services.dist.title', 'services.dist.desc', 'services.dist.b1', 'services.dist.b2', 'services.enquire'] },
  { id: 'contact', label: '聯絡我們 Contact', icon: '📬', keys: ['contact.title', 'contact.intro', 'contact.touch.title', 'contact.touch.note', 'contact.whatsapp.label', 'contact.whatsapp.number', 'contact.email.label', 'contact.email.address', 'contact.ig.label', 'contact.ig.handle', 'contact.form.title', 'contact.form.name', 'contact.form.name.ph', 'contact.form.email', 'contact.form.email.ph', 'contact.form.msg', 'contact.form.msg.ph', 'contact.form.submit', 'contact.toast.success', 'contact.toast.error'] },
  { id: 'links', label: '社群連結 Links', icon: '🔗', keys: ['links.title', 'links.sub', 'links.sub.desc', 'links.subscribe.ph', 'links.subscribe.btn', 'links.subscribe.success', 'links.subscribe.error', 'links.ig.label', 'links.ig.sub', 'links.fb.label', 'links.fb.sub', 'links.email.label', 'links.email.sub', 'links.visit', 'links.copyright', 'links.copyright.sub'] },
];

const IMAGE_FIELDS = [
  { key: 'logo', label: 'Logo 圖片' },
  { key: 'characters', label: '角色插圖 (Hero)' },
  { key: 'charGreen', label: '綠色角色裝飾 (Hero)' },
  { key: 'charPink', label: '粉色角色裝飾 (Hero)' },
  { key: 'charMini', label: '迷你角色裝飾 (Hero)' },
  { key: 'aboutTeam', label: '團隊照片 (About)' },
  { key: 'expPhoto1', label: '體驗區塊照片 1 - 左側 (Experience)' },
  { key: 'expPhoto2', label: '體驗區塊照片 2 - 右側 (Experience)' },
  { key: 'gelatoCart', label: '到會服務圖片 (Services)' },
  { key: 'gelatoCup', label: '批發服務圖片 (Services)' },
];

const SOCIAL_FIELDS = [
  { key: 'instagram', label: 'Instagram 連結' },
  { key: 'facebook', label: 'Facebook 連結' },
  { key: 'email', label: '電郵地址' },
];

function isTextarea(key: string) {
  return key.includes('.desc') || key.includes('.p1') || key.includes('.p2') || key.includes('.intro') || key.includes('.note');
}

function formatKey(key: string) {
  return key.replace(/\./g, ' › ');
}

function Toast({ msg, type }: { msg: string; type: 'success' | 'error' }) {
  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
      background: type === 'success' ? '#00E5FF' : '#ff4444',
      color: type === 'success' ? '#0A1628' : '#fff',
      border: '3px solid #0A1628', padding: '12px 24px',
      fontFamily: '"Press Start 2P", monospace', fontSize: 10,
      boxShadow: '4px 4px 0 #0A1628', maxWidth: 320,
    }}>
      {msg}
    </div>
  );
}

type SiteData = {
  zh: Record<string, string>;
  en: Record<string, string>;
  images: Record<string, string>;
  social: Record<string, string>;
};

// ─── Password Login Screen ──────────────────────────────────────────────────
function PasswordScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('madness-admin-auth', 'true');
      onLogin();
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0A1628',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1a2f50', border: '3px solid #00E5FF',
        padding: 40, width: 380, boxShadow: '8px 8px 0 #00E5FF',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: '"Press Start 2P", monospace', color: '#00E5FF',
          fontSize: 14, marginBottom: 8,
        }}>
          🍦 MADNESS ADMIN
        </div>
        <div style={{
          fontFamily: '"Press Start 2P", monospace', color: '#FFE500',
          fontSize: 8, marginBottom: 32,
        }}>
          ENTER PASSWORD TO CONTINUE
        </div>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%', padding: '12px 16px',
            border: error ? '3px solid #ff4444' : '3px solid #00E5FF',
            background: '#0A1628', color: '#fff',
            fontFamily: 'Nunito, sans-serif', fontSize: 16,
            fontWeight: 700, outline: 'none', boxSizing: 'border-box',
            marginBottom: 16, textAlign: 'center',
          }}
        />
        {error && (
          <div style={{
            fontFamily: '"Press Start 2P", monospace', color: '#ff4444',
            fontSize: 8, marginBottom: 12,
          }}>
            WRONG PASSWORD
          </div>
        )}
        <button type="submit" style={{
          fontFamily: '"Press Start 2P", monospace', fontSize: 10,
          background: '#FFE500', color: '#0A1628',
          border: '3px solid #0A1628', padding: '12px 24px',
          cursor: 'pointer', boxShadow: '4px 4px 0 #0A1628',
          width: '100%',
        }}>
          LOGIN
        </button>
      </form>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@600;700;800&display=swap');
      `}</style>
    </div>
  );
}

// ─── Image Upload Component ─────────────────────────────────────────────────
function ImageUploader({ currentUrl, onUpload }: { currentUrl: string; onUpload: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const uploadMutation = trpc.content.uploadImage.useMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }

    setUploading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const result = await uploadMutation.mutateAsync({
          data: base64,
          filename: file.name,
          contentType: file.type,
        });
        onUpload(result.url);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      alert('Upload failed, please try again');
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        style={{
          fontFamily: '"Press Start 2P", monospace', fontSize: 7,
          background: uploading ? '#888' : '#00E5FF', color: '#0A1628',
          border: '2px solid #0A1628', padding: '6px 12px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          boxShadow: '2px 2px 0 #0A1628', whiteSpace: 'nowrap',
        }}
      >
        {uploading ? 'UPLOADING...' : '📤 UPLOAD'}
      </button>
    </div>
  );
}

// ─── Main Admin Component ───────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('madness-admin-auth') === 'true');

  if (!authed) {
    return <PasswordScreen onLogin={() => setAuthed(true)} />;
  }

  return <AdminPanel />;
}

function AdminPanel() {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeSection, setActiveSection] = useState('nav');
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [activeTab, setActiveTab] = useState<'text' | 'images' | 'social'>('text');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const { data: serverData, isLoading } = trpc.content.get.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const saveMutation = trpc.content.save.useMutation();

  useEffect(() => {
    if (serverData && !isDirty) {
      setData(serverData as SiteData);
    }
  }, [serverData]);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateText = useCallback((langKey: 'zh' | 'en', key: string, value: string) => {
    setData(prev => prev ? { ...prev, [langKey]: { ...prev[langKey], [key]: value } } : prev);
    setIsDirty(true);
  }, []);

  const updateImage = useCallback((key: string, value: string) => {
    setData(prev => prev ? { ...prev, images: { ...prev.images, [key]: value } } : prev);
    setIsDirty(true);
  }, []);

  const updateSocial = useCallback((key: string, value: string) => {
    setData(prev => prev ? { ...prev, social: { ...prev.social, [key]: value } } : prev);
    setIsDirty(true);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await saveMutation.mutateAsync(data);
      setIsDirty(false);
      showToast('✅ 儲存成功！網站內容已更新。', 'success');
    } catch {
      showToast('❌ 儲存失敗，請再試一次。', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('madness-admin-auth');
    window.location.reload();
  };

  if (isLoading || !data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0A1628' }}>
        <div style={{ fontFamily: '"Press Start 2P", monospace', color: '#00E5FF', fontSize: 12, textAlign: 'center' }}>
          <div style={{ marginBottom: 16 }}>LOADING...</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 12, height: 12, background: '#FFE500', animation: `blink 1.2s ${i * 0.4}s infinite` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentSection = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Nunito, sans-serif' }}>
      {/* Header */}
      <div style={{
        background: '#0A1628', borderBottom: '3px solid #00E5FF',
        padding: '0 24px', height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: '"Press Start 2P", monospace', color: '#00E5FF', fontSize: 11 }}>🍦 MADNESS</span>
          <span style={{ fontFamily: '"Press Start 2P", monospace', color: '#FFE500', fontSize: 9 }}>ADMIN</span>
          {isDirty && (
            <span style={{ background: '#FFE500', color: '#0A1628', fontFamily: '"Press Start 2P", monospace', fontSize: 7, padding: '3px 8px', border: '2px solid #0A1628' }}>
              未儲存
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: '"Press Start 2P", monospace', fontSize: 8, color: '#00E5FF',
            textDecoration: 'none', border: '2px solid #00E5FF', padding: '6px 12px',
          }}>
            ↗ 預覽網站
          </a>
          <button onClick={handleSave} disabled={saving || !isDirty} style={{
            fontFamily: '"Press Start 2P", monospace', fontSize: 8,
            background: isDirty ? '#FFE500' : '#444', color: '#0A1628',
            border: '2px solid #0A1628', padding: '8px 16px',
            cursor: isDirty ? 'pointer' : 'not-allowed',
            boxShadow: isDirty ? '3px 3px 0 #00E5FF' : 'none',
          }}>
            {saving ? 'SAVING...' : '💾 SAVE'}
          </button>
          <button onClick={handleLogout} style={{
            fontFamily: '"Press Start 2P", monospace', fontSize: 7,
            background: 'transparent', color: '#ff6b6b',
            border: '2px solid #ff6b6b', padding: '6px 10px',
            cursor: 'pointer',
          }}>
            🚪 LOGOUT
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <div style={{
          width: 220, background: '#0A1628', borderRight: '3px solid #00E5FF',
          padding: '16px 0', flexShrink: 0, position: 'sticky', top: 64,
          height: 'calc(100vh - 64px)', overflowY: 'auto',
        }}>
          {/* Tab switcher */}
          <div style={{ padding: '0 12px 12px', borderBottom: '2px solid #1a2f50' }}>
            {(['text', 'images', 'social'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                fontFamily: '"Press Start 2P", monospace', fontSize: 8,
                padding: '8px 10px', marginBottom: 4,
                background: activeTab === tab ? '#00E5FF' : 'transparent',
                color: activeTab === tab ? '#0A1628' : '#8899aa',
                border: activeTab === tab ? '2px solid #0A1628' : '2px solid transparent',
                cursor: 'pointer',
              }}>
                {tab === 'text' ? '📝 文字內容' : tab === 'images' ? '🖼️ 圖片連結' : '🔗 社群連結'}
              </button>
            ))}
          </div>

          {/* Section nav (only for text tab) */}
          {activeTab === 'text' && (
            <div style={{ padding: '12px 0' }}>
              {SECTIONS.map(section => (
                <button key={section.id} onClick={() => setActiveSection(section.id)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 16px',
                  background: activeSection === section.id ? '#1a2f50' : 'transparent',
                  borderLeft: activeSection === section.id ? '3px solid #FFE500' : '3px solid transparent',
                  borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                  color: activeSection === section.id ? '#FFE500' : '#8899aa',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                }}>
                  {section.icon} {section.label.split(' ')[0]}
                  <div style={{ fontSize: 9, color: '#556677', marginTop: 2 }}>
                    {section.label.split(' ').slice(1).join(' ')}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          {/* TEXT TAB */}
          {activeTab === 'text' && (
            <div>
              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h1 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 14, color: '#0A1628', margin: 0 }}>
                    {currentSection.icon} {currentSection.label}
                  </h1>
                  <p style={{ color: '#667788', marginTop: 6, fontSize: 13 }}>
                    共 {currentSection.keys.length} 個文字欄位
                  </p>
                </div>
                {/* Language switcher */}
                <div style={{ display: 'flex', gap: 0, border: '3px solid #0A1628' }}>
                  {(['zh', 'en'] as const).map(l => (
                    <button key={l} onClick={() => setLang(l)} style={{
                      fontFamily: '"Press Start 2P", monospace', fontSize: 9,
                      padding: '8px 16px',
                      background: lang === l ? '#0A1628' : '#fff',
                      color: lang === l ? '#FFE500' : '#0A1628',
                      border: 'none', cursor: 'pointer',
                    }}>
                      {l === 'zh' ? '中文' : 'EN'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {currentSection.keys.map(key => (
                  <div key={key} style={{
                    background: '#fff', border: '2px solid #dde3ea',
                    borderRadius: 4, padding: 16, boxShadow: '2px 2px 0 #dde3ea',
                  }}>
                    <label style={{
                      display: 'block', fontFamily: '"Press Start 2P", monospace',
                      fontSize: 8, color: '#00E5FF', marginBottom: 8, letterSpacing: 1,
                    }}>
                      {formatKey(key)}
                    </label>
                    {isTextarea(key) ? (
                      <textarea
                        value={data[lang]?.[key] ?? ''}
                        onChange={e => updateText(lang, key, e.target.value)}
                        rows={4}
                        style={{
                          width: '100%', padding: '10px 12px',
                          border: '2px solid #dde3ea', borderRadius: 4,
                          fontSize: 14, fontFamily: 'Nunito, sans-serif',
                          fontWeight: 600, resize: 'vertical', outline: 'none',
                          boxSizing: 'border-box', lineHeight: 1.6,
                        }}
                        onFocus={e => (e.target.style.borderColor = '#00E5FF')}
                        onBlur={e => (e.target.style.borderColor = '#dde3ea')}
                      />
                    ) : (
                      <input
                        type="text"
                        value={data[lang]?.[key] ?? ''}
                        onChange={e => updateText(lang, key, e.target.value)}
                        style={{
                          width: '100%', padding: '10px 12px',
                          border: '2px solid #dde3ea', borderRadius: 4,
                          fontSize: 14, fontFamily: 'Nunito, sans-serif',
                          fontWeight: 600, outline: 'none', boxSizing: 'border-box',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#00E5FF')}
                        onBlur={e => (e.target.style.borderColor = '#dde3ea')}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IMAGES TAB */}
          {activeTab === 'images' && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 14, color: '#0A1628', margin: 0 }}>
                  🖼️ 圖片管理
                </h1>
                <p style={{ color: '#667788', marginTop: 6, fontSize: 13 }}>
                  可直接上傳圖片或貼上圖片網址（URL）。上傳的圖片會自動儲存到雲端。
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {IMAGE_FIELDS.map(field => (
                  <div key={field.key} style={{
                    background: '#fff', border: '2px solid #dde3ea',
                    borderRadius: 4, padding: 20, boxShadow: '2px 2px 0 #dde3ea',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <label style={{
                        fontFamily: '"Press Start 2P", monospace',
                        fontSize: 9, color: '#0A1628',
                      }}>
                        {field.label}
                      </label>
                      <ImageUploader
                        currentUrl={data.images?.[field.key] ?? ''}
                        onUpload={(url) => { updateImage(field.key, url); }}
                      />
                    </div>
                    {data.images?.[field.key] && (
                      <div style={{ marginBottom: 12 }}>
                        <img
                          src={data.images[field.key]}
                          alt={field.label}
                          style={{
                            maxHeight: 120, maxWidth: '100%',
                            border: '2px solid #dde3ea', objectFit: 'contain',
                            background: '#f8f8f8',
                          }}
                          onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
                        />
                      </div>
                    )}
                    <input
                      type="url"
                      value={data.images?.[field.key] ?? ''}
                      onChange={e => updateImage(field.key, e.target.value)}
                      placeholder="https://... 或使用上方上傳按鈕"
                      style={{
                        width: '100%', padding: '10px 12px',
                        border: '2px solid #dde3ea', borderRadius: 4,
                        fontSize: 13, fontFamily: 'monospace',
                        outline: 'none', boxSizing: 'border-box', color: '#334',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#00E5FF')}
                      onBlur={e => (e.target.style.borderColor = '#dde3ea')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL TAB */}
          {activeTab === 'social' && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 14, color: '#0A1628', margin: 0 }}>
                  🔗 社群連結設定
                </h1>
                <p style={{ color: '#667788', marginTop: 6, fontSize: 13 }}>
                  更新 Instagram、Facebook 頁面連結及聯絡電郵。
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {SOCIAL_FIELDS.map(field => (
                  <div key={field.key} style={{
                    background: '#fff', border: '2px solid #dde3ea',
                    borderRadius: 4, padding: 20, boxShadow: '2px 2px 0 #dde3ea',
                  }}>
                    <label style={{
                      display: 'block', fontFamily: '"Press Start 2P", monospace',
                      fontSize: 9, color: '#0A1628', marginBottom: 10,
                    }}>
                      {field.label}
                    </label>
                    <input
                      type={field.key === 'email' ? 'email' : 'url'}
                      value={data.social?.[field.key] ?? ''}
                      onChange={e => updateSocial(field.key, e.target.value)}
                      placeholder={field.key === 'email' ? 'info@example.com' : 'https://...'}
                      style={{
                        width: '100%', padding: '10px 12px',
                        border: '2px solid #dde3ea', borderRadius: 4,
                        fontSize: 14, fontFamily: 'Nunito, sans-serif',
                        fontWeight: 600, outline: 'none', boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#00E5FF')}
                      onBlur={e => (e.target.style.borderColor = '#dde3ea')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A1628; }
        ::-webkit-scrollbar-thumb { background: #00E5FF; }
      `}</style>
    </div>
  );
}
