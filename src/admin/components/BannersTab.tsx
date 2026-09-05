import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Image as ImageIcon, Save, Sparkles, ShieldCheck, Laptop, 
  Award, ArrowRight, Check, AlertCircle, RefreshCw, Upload, Link2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ImageUploader from './ImageUploader';

interface BannerSlideConfig {
  id: number;
  tag: string;
  title1: string;
  title2: string;
  subtitle: string;
  badge: string;
  btnText: string;
  btnLink: string;
  imageUrl: string;
}

const defaultSlides: BannerSlideConfig[] = [
  {
    id: 1,
    tag: 'A TRUSTED NAME IN REFURBISHED IT',
    title1: 'REFURBISHED',
    title2: 'LAPTOPS & MONITORS',
    subtitle: 'Exceptional value on Dell, HP & Lenovo — 40-point quality checked, scratch-less condition with 1-year warranty.',
    badge: 'UP TO 70% OFF',
    btnText: 'SHOP NOW',
    btnLink: '#products',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    tag: 'CERTIFIED TESTING PROCESS',
    title1: '40-POINT QC',
    title2: 'DIAGNOSTICS & TESTING',
    subtitle: 'Motherboard diagnostics, thermal paste refresh, battery health optimization, and clean OS installation on every unit.',
    badge: '100% QC PASSED',
    btnText: 'EXPLORE QC PROCESS',
    btnLink: '#about',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    tag: 'PREMIUM INVENTORY',
    title1: 'ENTERPRISE LAPTOPS',
    title2: 'HIGH PERFORMANCE',
    subtitle: 'Curated laptops for developers, designers, students, and corporate teams at up to 60% off showroom price.',
    badge: 'SAVE UP TO 60%',
    btnText: 'SHOP NOW',
    btnLink: '#products',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    tag: 'REFURBISHED IT ASSET SOLUTIONS',
    title1: 'CERTIFIED HARDWARE',
    title2: 'AT SMART PRICES',
    subtitle: 'Equipping startups, institutions, and professionals with certified enterprise hardware and reliable after-sales support.',
    badge: 'BULK ORDERS',
    btnText: 'CONTACT US',
    btnLink: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000',
  },
];

export const BannersTab: React.FC = () => {
  const { content, updateContent } = useApp();
  const [activeSlide, setActiveSlide] = useState(1);
  const [slides, setSlides] = useState<BannerSlideConfig[]>(defaultSlides);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Initialize slides from DB content
  useEffect(() => {
    setSlides([
      {
        id: 1,
        tag: content['hero.slide1_tag'] || defaultSlides[0].tag,
        title1: content['hero.slide1_title1'] || defaultSlides[0].title1,
        title2: content['hero.slide1_title2'] || defaultSlides[0].title2,
        subtitle: content['hero.slide1_subtitle'] || defaultSlides[0].subtitle,
        badge: content['hero.slide1_badge'] || defaultSlides[0].badge,
        btnText: content['hero.slide1_btn_text'] || defaultSlides[0].btnText,
        btnLink: content['hero.slide1_btn_link'] || defaultSlides[0].btnLink,
        imageUrl: content['hero.slide1_image'] || defaultSlides[0].imageUrl,
      },
      {
        id: 2,
        tag: content['hero.slide2_tag'] || defaultSlides[1].tag,
        title1: content['hero.slide2_title1'] || defaultSlides[1].title1,
        title2: content['hero.slide2_title2'] || defaultSlides[1].title2,
        subtitle: content['hero.slide2_subtitle'] || defaultSlides[1].subtitle,
        badge: content['hero.slide2_badge'] || defaultSlides[1].badge,
        btnText: content['hero.slide2_btn_text'] || defaultSlides[1].btnText,
        btnLink: content['hero.slide2_btn_link'] || defaultSlides[1].btnLink,
        imageUrl: content['hero.slide2_image'] || defaultSlides[1].imageUrl,
      },
      {
        id: 3,
        tag: content['hero.slide3_tag'] || defaultSlides[2].tag,
        title1: content['hero.slide3_title1'] || defaultSlides[2].title1,
        title2: content['hero.slide3_title2'] || defaultSlides[2].title2,
        subtitle: content['hero.slide3_subtitle'] || defaultSlides[2].subtitle,
        badge: content['hero.slide3_badge'] || defaultSlides[2].badge,
        btnText: content['hero.slide3_btn_text'] || defaultSlides[2].btnText,
        btnLink: content['hero.slide3_btn_link'] || defaultSlides[2].btnLink,
        imageUrl: content['hero.slide3_image'] || defaultSlides[2].imageUrl,
      },
      {
        id: 4,
        tag: content['hero.slide4_tag'] || defaultSlides[3].tag,
        title1: content['hero.slide4_title1'] || defaultSlides[3].title1,
        title2: content['hero.slide4_title2'] || defaultSlides[3].title2,
        subtitle: content['hero.slide4_subtitle'] || defaultSlides[3].subtitle,
        badge: content['hero.slide4_badge'] || defaultSlides[3].badge,
        btnText: content['hero.slide4_btn_text'] || defaultSlides[3].btnText,
        btnLink: content['hero.slide4_btn_link'] || defaultSlides[3].btnLink,
        imageUrl: content['hero.slide4_image'] || defaultSlides[3].imageUrl,
      },
    ]);
  }, [content]);

  const updateCurrentSlide = (field: keyof BannerSlideConfig, value: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === activeSlide ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const updates: Array<{ section: string; key: string; value: string }> = [];
      slides.forEach((s) => {
        updates.push({ section: 'hero', key: `slide${s.id}_tag`, value: s.tag });
        updates.push({ section: 'hero', key: `slide${s.id}_title1`, value: s.title1 });
        updates.push({ section: 'hero', key: `slide${s.id}_title2`, value: s.title2 });
        updates.push({ section: 'hero', key: `slide${s.id}_subtitle`, value: s.subtitle });
        updates.push({ section: 'hero', key: `slide${s.id}_badge`, value: s.badge });
        updates.push({ section: 'hero', key: `slide${s.id}_btn_text`, value: s.btnText });
        updates.push({ section: 'hero', key: `slide${s.id}_btn_link`, value: s.btnLink });
        updates.push({ section: 'hero', key: `slide${s.id}_image`, value: s.imageUrl });
      });

      await updateContent(updates);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save banners:', err);
    } finally {
      setSaving(false);
    }
  };

  const current = slides.find((s) => s.id === activeSlide) || slides[0];

  return (
    <div className="space-y-6 font-['Inter',sans-serif] text-slate-900 pb-12">
      
      {/* ── HEADER ── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block mb-1">
            Storefront Customization
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Hero Banners & Slides
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Upload custom banner images locally, edit slide headings, badges, and button links in real time.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-[#0B1E3D] hover:bg-[#133da6] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : savedSuccess ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving...' : savedSuccess ? 'Saved Live!' : 'Save Banners'}</span>
        </button>
      </div>

      {/* ── SLIDE SELECTOR TABS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slides.map((s) => {
          const isActive = s.id === activeSlide;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSlide(s.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-[#0B1E3D] text-white border-[#0B1E3D] shadow-md ring-2 ring-[#0B1E3D]/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[#E8A93B]' : 'text-slate-400'}`}>
                  Slide {s.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {s.badge}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold truncate">
                {s.title1} {s.title2}
              </h4>
            </button>
          );
        })}
      </div>

      {/* ── MAIN EDITING GRID (2-COLUMNS: FORM & LIVE PREVIEW) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SLIDE CONFIGURATION FORM (7 COLS) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Edit Slide {activeSlide} Details
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Customize text, banner photo, offer pill badge, and button action for Slide {activeSlide}.
            </p>
          </div>

          {/* Tagline Badge */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Top Tagline Badge
            </label>
            <input
              type="text"
              value={current.tag}
              onChange={(e) => updateCurrentSlide('tag', e.target.value)}
              placeholder="e.g. A TRUSTED NAME IN REFURBISHED IT"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-brand-blue"
            />
          </div>

          {/* Title Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Main Title (Line 1 - White)
              </label>
              <input
                type="text"
                value={current.title1}
                onChange={(e) => updateCurrentSlide('title1', e.target.value)}
                placeholder="e.g. REFURBISHED"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Accent Title (Line 2 - Gold)
              </label>
              <input
                type="text"
                value={current.title2}
                onChange={(e) => updateCurrentSlide('title2', e.target.value)}
                placeholder="e.g. LAPTOPS & MONITORS"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-brand-blue text-[#d99b26]"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Subtitle Description
            </label>
            <textarea
              rows={3}
              value={current.subtitle}
              onChange={(e) => updateCurrentSlide('subtitle', e.target.value)}
              placeholder="Provide a compelling description of this offer or process..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 font-normal outline-none focus:border-brand-blue leading-relaxed"
            />
          </div>

          {/* Offer Badge & Button Text */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Offer Badge Text
              </label>
              <input
                type="text"
                value={current.badge}
                onChange={(e) => updateCurrentSlide('badge', e.target.value)}
                placeholder="e.g. UP TO 70% OFF"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Button Label
              </label>
              <input
                type="text"
                value={current.btnText}
                onChange={(e) => updateCurrentSlide('btnText', e.target.value)}
                placeholder="e.g. SHOP NOW"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Button Link / Hash
              </label>
              <input
                type="text"
                value={current.btnLink}
                onChange={(e) => updateCurrentSlide('btnLink', e.target.value)}
                placeholder="e.g. #products"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-brand-blue font-mono"
              />
            </div>
          </div>

          {/* Banner Photo Upload (Local File Upload & Direct URL) */}
          <div className="pt-2">
            <ImageUploader
              label={`Slide ${activeSlide} Hero Photo`}
              subtitle="Upload a high-resolution banner image from your computer or paste an external URL."
              currentImage={current.imageUrl}
              onImageSelected={(url) => updateCurrentSlide('imageUrl', url)}
            />
          </div>

        </div>

        {/* RIGHT COLUMN: REAL-TIME LIVE PREVIEW (5 COLS) */}
        <div className="lg:col-span-5 space-y-4 sticky top-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Slide {activeSlide} Live Preview
            </span>

            {/* Simulated Hero Stage */}
            <div className="bg-[#0B1E3D] rounded-2xl p-5 text-white overflow-hidden relative shadow-md">
              
              {/* Tag */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#E8A93B] mb-2">
                <Sparkles className="w-3 h-3 text-[#E8A93B]" />
                <span className="truncate">{current.tag}</span>
              </div>

              {/* Title */}
              <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#F5F7FA] leading-tight mb-1.5">
                {current.title1} <br />
                <span className="text-[#E8A93B]">{current.title2}</span>
              </h4>

              {/* Subtitle */}
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal mb-3 line-clamp-2">
                {current.subtitle}
              </p>

              {/* Button & Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-4 py-1.5 bg-[#E8A93B] text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1">
                  {current.btnText} <ArrowRight className="w-3 h-3" />
                </span>
                <span className="px-3 py-1.5 bg-white/10 text-white font-bold text-[10px] rounded-full">
                  {current.badge}
                </span>
              </div>

              {/* Banner Image Preview Container */}
              <div className="w-full h-36 rounded-xl overflow-hidden border border-white/20 bg-slate-900 mt-2 relative">
                <img
                  src={current.imageUrl || defaultSlides[0].imageUrl}
                  alt={`Slide ${activeSlide} Preview`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultSlides[0].imageUrl;
                  }}
                />
                <div className="absolute top-2 right-2 bg-gradient-to-br from-[#E8A93B] to-[#d99b26] text-[#0B1E3D] px-2 py-0.5 rounded-full text-[9px] font-black uppercase shadow-sm">
                  {current.badge}
                </div>
              </div>

            </div>

            {/* Quick Action */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-4 py-3 bg-[#0B1E3D] hover:bg-[#133da6] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Changes</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BannersTab;
