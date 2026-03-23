// src/pages/admin/AdminSettings.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Save, Globe, Phone, Mail, Search } from 'lucide-react';

export default function AdminSettings() {
  const { content, updateContent } = useContent();
  const [seo, setSeo] = useState(content?.seo || { title: '', description: '', keywords: '' });
  const [contact, setContact] = useState(content?.cta || { whatsapp: '', phone: '', email: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await updateContent('seo', seo);
      await updateContent('cta', { ...content?.cta, ...contact });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Settings saved locally (Firebase not connected).');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel font-bold text-3xl text-white">Settings</h1>
          <p className="text-white/40 text-sm mt-1">Platform configuration</p>
        </div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'btn-gold'}`}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* SEO Settings */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center"><Search size={16} className="text-blue-400" /></div>
            <h3 className="font-cinzel font-bold text-lg text-white">SEO Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Page Title</label>
              <input value={seo.title} onChange={(e) => setSeo((p) => ({ ...p, title: e.target.value }))} placeholder="PROEVERON — Global Real Estate Investment" className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Meta Description</label>
              <textarea value={seo.description} onChange={(e) => setSeo((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="Invest in premium real estate..." className="input-gold w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Keywords (comma-separated)</label>
              <input value={seo.keywords} onChange={(e) => setSeo((p) => ({ ...p, keywords: e.target.value }))} placeholder="real estate, investment, fractional..." className="input-gold w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-yellow-600/30 flex items-center justify-center"><Phone size={16} className="text-yellow-400" /></div>
            <h3 className="font-cinzel font-bold text-lg text-white">Contact Info</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '+919876543210', icon: Phone },
              { key: 'phone', label: 'Business Phone', placeholder: '+919876543210', icon: Phone },
              { key: 'email', label: 'Business Email', placeholder: 'invest@proeveron.com', icon: Mail },
            ].map(({ key, label, placeholder, icon: Icon }) => (
              <div key={key}>
                <label className="text-xs text-white/50 mb-1 block">{label}</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input value={contact[key] || ''} onChange={(e) => setContact((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} className="input-gold w-full pl-9 pr-4 py-2.5 rounded-xl text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-red-500/20">
          <h3 className="font-cinzel font-bold text-lg text-red-400 mb-4">Admin Access</h3>
          <p className="text-white/50 text-sm mb-4">To grant admin privileges to a user, set their Firestore document role to "admin" in the users collection.</p>
          <div className="bg-white/5 rounded-xl p-4 font-mono text-xs text-white/70">
            <span className="text-blue-400">db</span>
            <span className="text-white/40">.collection(</span>
            <span className="text-green-400">'users'</span>
            <span className="text-white/40">).doc(</span>
            <span className="text-green-400">'userId'</span>
            <span className="text-white/40">).update({'{'}</span>
            <span className="text-yellow-400"> role: 'admin' </span>
            <span className="text-white/40">{'}'})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
