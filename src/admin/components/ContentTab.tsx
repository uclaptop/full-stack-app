import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Loader2, CheckCircle2, Globe, Layout, Phone, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

type ContentMap = Record<string, string>;

const SECTIONS = [
  {
    label: 'Header & Navbar Branding',
    color: 'cyan',
    icon: Globe,
    fields: [
      { key: 'navbar.title', label: 'Navbar Logo Title' },
      { key: 'navbar.subtitle', label: 'Navbar Logo Subtitle' },
      { key: 'contact.phone_raw', label: 'Enquiry Call Number (digits only, e.g. 8712173339)' },
    ],
  },
  {
    label: 'Hero Section',
    color: 'blue',
    icon: Layout,
    fields: [
      { key: 'hero.badge', label: 'Badge Text' },
      { key: 'hero.headline_line1', label: 'Headline Line 1' },
      { key: 'hero.headline_accent1', label: 'Headline Accent 1 (blue)' },
      { key: 'hero.headline_accent2', label: 'Headline Accent 2 (orange)' },
      { key: 'hero.subtext', label: 'Subtext', multiline: true },
      { key: 'hero.stat1_value', label: 'Stat 1 Value' },
      { key: 'hero.stat1_label', label: 'Stat 1 Label' },
      { key: 'hero.stat2_value', label: 'Stat 2 Value' },
      { key: 'hero.stat2_label', label: 'Stat 2 Label' },
      { key: 'hero.stat3_value', label: 'Stat 3 Value' },
      { key: 'hero.stat3_label', label: 'Stat 3 Label' },
    ],
  },
  {
    label: 'Hero Specs Grid (Bottom-Right Cards)',
    color: 'cyan',
    icon: Layout,
    fields: [
      { key: 'hero.spec_condition', label: 'Condition Card (default: A+++ Scratchless)' },
      { key: 'hero.spec_testing', label: 'Testing Card (default: 40-Point QC)' },
      { key: 'hero.spec_warranty', label: 'Warranty Card (default: Standard Support)' },
      { key: 'hero.spec_region', label: 'Region Card (default: Imported Quality)' },
    ],
  },
  {
    label: 'About Section',
    color: 'orange',
    icon: Heart,
    fields: [
      { key: 'about.eyebrow', label: 'Eyebrow Label' },
      { key: 'about.headline', label: 'Headline' },
      { key: 'about.body', label: 'Body Text', multiline: true },
      { key: 'about.badge_text', label: 'Badge Text (e.g. 9+ Years)' },
      { key: 'about.badge_sub', label: 'Badge Subtitle' },
      { key: 'about.stat1_value', label: 'Stat 1 Value' },
      { key: 'about.stat1_label', label: 'Stat 1 Label' },
      { key: 'about.stat2_value', label: 'Stat 2 Value' },
      { key: 'about.stat2_label', label: 'Stat 2 Label' },
      { key: 'about.stat3_value', label: 'Stat 3 Value' },
      { key: 'about.stat3_label', label: 'Stat 3 Label' },
    ],
  },
  {
    label: 'Contact & Store Info',
    color: 'green',
    icon: Phone,
    fields: [
      { key: 'contact.email', label: 'Official Store Email (e.g. uclaptopstore@gmail.com)' },
      { key: 'contact.phone', label: 'Phone Number (display)' },
      { key: 'contact.whatsapp_number', label: 'WhatsApp Number (digits only, e.g. 918712173339)' },
      { key: 'contact.address_line1', label: 'Address Line 1' },
      { key: 'contact.address_city', label: 'City / Region' },
    ],
  },
  {
    label: 'Footer Socials & Hours',
    color: 'purple',
    icon: Save,
    fields: [
      { key: 'footer.tagline', label: 'Store Tagline', multiline: true },
      { key: 'footer.hours_weekday', label: 'Weekday Hours' },
      { key: 'footer.hours_weekend', label: 'Weekend Hours' },
      { key: 'footer.instagram_url', label: 'Instagram URL' },
      { key: 'footer.youtube_url', label: 'YouTube URL' },
      { key: 'footer.facebook_url', label: 'Facebook URL' },
    ],
  },
];

const token = () => localStorage.getItem('uc_admin_token') || '';
const authHeader = () => ({ Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' });

const sectionColor: Record<string, string> = {
  cyan: 'border-cyan-500/10 bg-cyan-500/2 hover:border-cyan-500/20',
  blue: 'border-blue-500/10 bg-blue-500/2 hover:border-blue-500/20',
  orange: 'border-orange-500/10 bg-orange-500/2 hover:border-orange-500/20',
  green: 'border-green-500/10 bg-green-500/2 hover:border-green-500/20',
  purple: 'border-purple-500/10 bg-purple-500/2 hover:border-purple-500/20',
};

const labelColor: Record<string, string> = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  orange: 'text-orange-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
};

export default function ContentTab() {
  const { refreshContent } = useApp();
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/content');
      if (r.ok) setContent(await r.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContent(); }, []);

  const handleChange = (key: string, value: string) => {
    setContent(c => ({ ...c, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const updates = Object.entries(content).map(([fullKey, value]) => {
        const [section, ...rest] = fullKey.split('.');
        return { section, key: rest.join('.'), value };
      });
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setSaved(true);
        refreshContent(); // instantly update homepage text without reload
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-white font-black text-2xl uppercase tracking-wider">Site Content System</h2>
          <p className="text-gray-500 text-xs mt-1 font-medium">Dynamically edit titles, buttons, icons, navbar labels and stats displayed across the site.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          {saved ? (
            <><CheckCircle2 className="w-4 h-4 text-green-300" />Saved Changes!</>
          ) : saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Saving...</>
          ) : (
            <><Save className="w-4 h-4" />Save All Changes</>
          )}
        </motion.button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map(section => {
          const Icon = section.icon;
          return (
            <div
              key={section.label}
              className={`border rounded-2xl p-6 transition-colors duration-300 bg-[#111218]/40 backdrop-blur-md ${sectionColor[section.color]}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl bg-white/2 ${labelColor[section.color]} border border-white/5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className={`font-black text-sm uppercase tracking-widest ${labelColor[section.color]}`}>
                  {section.label}
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {section.fields.map(field => (
                  <div key={field.key} className={field.multiline ? 'md:col-span-2' : ''}>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">
                      {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        rows={4}
                        value={content[field.key] || ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        className="w-full bg-[#0a0b0f] border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm font-semibold resize-none transition-all"
                      />
                    ) : (
                      <input
                        type="text"
                        value={content[field.key] || ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        className="w-full bg-[#0a0b0f] border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm font-semibold transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom save bar */}
      <div className="flex justify-end pt-4 border-t border-white/5">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-green-300" /> : <Save className="w-4 h-4" />}
          {saved ? 'All Changes Saved Successfully!' : 'Save All Changes'}
        </motion.button>
      </div>
    </div>
  );
}
