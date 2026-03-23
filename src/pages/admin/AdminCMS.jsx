// src/pages/admin/AdminCMS.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, Trash2, Edit3 } from 'lucide-react';

export default function AdminCMS() {
  const { content, updateContent } = useContent();
  const [activeSection, setActiveSection] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [heroForm, setHeroForm] = useState(content?.hero || {});
  const [aboutForm, setAboutForm] = useState(content?.about || {});
  const [videoForm, setVideoForm] = useState(content?.videoSection || {});
  const [ctaForm, setCtaForm] = useState(content?.cta || {});
  const [testimonials, setTestimonials] = useState(content?.testimonials || []);
  const [whyInvest, setWhyInvest] = useState(content?.whyInvest || []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeSection === 'hero') await updateContent('hero', heroForm);
      if (activeSection === 'about') await updateContent('about', aboutForm);
      if (activeSection === 'video') await updateContent('videoSection', videoForm);
      if (activeSection === 'cta') await updateContent('cta', ctaForm);
      if (activeSection === 'testimonials') await updateContent('testimonials', testimonials);
      if (activeSection === 'whyInvest') await updateContent('whyInvest', whyInvest);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'video', label: 'Video Section' },
    { id: 'about', label: 'About Section' },
    { id: 'cta', label: 'CTA / Contact' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'whyInvest', label: 'Why Invest' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel font-bold text-3xl text-white">Content Management</h1>
          <p className="text-white/40 text-sm mt-1">Edit website content dynamically</p>
        </div>
        <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'btn-gold'}`}>
          <Save size={16} />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Section nav */}
        <div className="space-y-2">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === id ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' : 'glass text-white/60 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 glass rounded-2xl p-6">
          {/* Hero */}
          {activeSection === 'hero' && (
            <div className="space-y-4">
              <h3 className="font-cinzel font-bold text-lg text-white mb-4">Hero Section</h3>
              {[
                { key: 'title', label: 'Main Title', placeholder: 'Own Property.' },
                { key: 'titleAccent', label: 'Accent Title (Gold)', placeholder: 'Earn Like Equity.' },
                { key: 'subtitle', label: 'Subtitle', placeholder: 'Global Investment Ecosystem' },
                { key: 'ctaPrimary', label: 'Primary CTA Button', placeholder: 'Explore Projects' },
                { key: 'ctaSecondary', label: 'Secondary CTA Button', placeholder: 'Invest Now' },
                { key: 'videoUrl', label: 'Background Video URL', placeholder: 'https://...' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-white/50 mb-1 block">{label}</label>
                  <input
                    value={heroForm[key] || ''}
                    onChange={(e) => setHeroForm((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="input-gold w-full px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-white/50 mb-1 block">Description</label>
                <textarea
                  value={heroForm.description || ''}
                  onChange={(e) => setHeroForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="input-gold w-full px-4 py-2.5 rounded-xl text-sm resize-none"
                />
              </div>
            </div>
          )}

          {/* Video Section */}
          {activeSection === 'video' && (
            <div className="space-y-6">
              <h3 className="font-cinzel font-bold text-xl text-white">YouTube Video</h3>

              {/* Input */}
              <div>
                <label className="text-sm text-white/70 mb-2 block">Video ID</label>
                <input
                  value={videoForm.youtubeVideoId || ''}
                  onChange={(e) => setVideoForm((p) => ({ ...p, youtubeVideoId: e.target.value }))}
                  placeholder="dQw4w9WgXcQ"
                  className="input-gold w-full px-4 py-3 rounded-lg text-sm"
                />
                <p className="text-xs text-white/50 mt-2">
                  From: youtube.com/watch?v=<span className="text-yellow-400">VIDEO_ID</span>
                </p>
              </div>

              {/* Preview */}
              <div>
                <label className="text-sm text-white/70 mb-3 block">Preview</label>
                {videoForm.youtubeVideoId ? (
                  <div className="rounded-xl overflow-hidden border border-yellow-500/20">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoForm.youtubeVideoId}`}
                        title="Preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-white/5 rounded-xl border border-yellow-500/20 flex items-center justify-center text-white/40 text-sm">
                    Enter Video ID to preview
                  </div>
                )}
              </div>
            </div>
          )}

          {/* About */}
          {activeSection === 'about' && (
            <div className="space-y-4">
              <h3 className="font-cinzel font-bold text-lg text-white mb-4">About Section</h3>
              {[
                { key: 'title', label: 'Main Title' },
                { key: 'subtitle', label: 'Subtitle (Italic)' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs text-white/50 mb-1 block">{label}</label>
                  <input value={aboutForm[key] || ''} onChange={(e) => setAboutForm((p) => ({ ...p, [key]: e.target.value }))} className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
                </div>
              ))}
              <div>
                <label className="text-xs text-white/50 mb-1 block">Description</label>
                <textarea value={aboutForm.description || ''} onChange={(e) => setAboutForm((p) => ({ ...p, description: e.target.value }))} rows={4} className="input-gold w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              </div>
            </div>
          )}

          {/* CTA */}
          {activeSection === 'cta' && (
            <div className="space-y-4">
              <h3 className="font-cinzel font-bold text-lg text-white mb-4">CTA & Contact Info</h3>
              {[
                { key: 'title', label: 'CTA Title' },
                { key: 'description', label: 'CTA Description' },
                { key: 'whatsapp', label: 'WhatsApp Number (+919...)' },
                { key: 'phone', label: 'Phone Number' },
                { key: 'email', label: 'Email Address' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs text-white/50 mb-1 block">{label}</label>
                  <input value={ctaForm[key] || ''} onChange={(e) => setCtaForm((p) => ({ ...p, [key]: e.target.value }))} className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
                </div>
              ))}
            </div>
          )}

          {/* Testimonials */}
          {activeSection === 'testimonials' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-bold text-lg text-white">Testimonials</h3>
                <button onClick={() => setTestimonials((p) => [...p, { name: '', role: '', quote: '', avatar: '' }])} className="flex items-center gap-1 text-yellow-400 text-sm hover:text-yellow-300">
                  <Plus size={14} /> Add
                </button>
              </div>
              {(testimonials || []).map((t, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 text-xs font-medium">Testimonial {i + 1}</span>
                    <button onClick={() => setTestimonials((p) => p.filter((_, j) => j !== i))} className="text-red-400/60 hover:text-red-400"><Trash2 size={13} /></button>
                  </div>
                  {['name', 'role', 'avatar', 'quote'].map((k) => (
                    <div key={k}>
                      <label className="text-xs text-white/40 mb-1 block capitalize">{k}</label>
                      <input value={t[k] || ''} onChange={(e) => setTestimonials((p) => p.map((item, j) => j === i ? { ...item, [k]: e.target.value } : item))} className="input-gold w-full px-3 py-2 rounded-lg text-sm" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Why Invest */}
          {activeSection === 'whyInvest' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-bold text-lg text-white">Why Invest Cards</h3>
                <button onClick={() => setWhyInvest((p) => [...p, { title: '', desc: '', icon: '✅' }])} className="flex items-center gap-1 text-yellow-400 text-sm hover:text-yellow-300">
                  <Plus size={14} /> Add Card
                </button>
              </div>
              {(whyInvest || []).map((w, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 text-xs">Card {i + 1}</span>
                    <button onClick={() => setWhyInvest((p) => p.filter((_, j) => j !== i))} className="text-red-400/60 hover:text-red-400"><Trash2 size={13} /></button>
                  </div>
                  {['icon', 'title', 'desc'].map((k) => (
                    <div key={k}>
                      <label className="text-xs text-white/40 mb-1 block capitalize">{k}</label>
                      <input value={w[k] || ''} onChange={(e) => setWhyInvest((p) => p.map((item, j) => j === i ? { ...item, [k]: e.target.value } : item))} className="input-gold w-full px-3 py-2 rounded-lg text-sm" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
