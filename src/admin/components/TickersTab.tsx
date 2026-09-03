import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Plus, Trash2, Save, Loader2, CheckCircle2, 
  RefreshCw, Check, ArrowRight, ShieldCheck, Zap, Award 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TickersTab() {
  const { content, refreshContent } = useApp();

  // Green Top Bar items
  const defaultGreenItems = [
    '1-Year Warranty Support',
    '40-Point QC Tested',
    'Free Delivery in Proddatur',
    '1000+ Happy Clients',
    'A+++ Scratch-Less Imported Quality',
    'Best Prices Guaranteed',
    '7-Day Direct Replacement',
    '100% Genuine Hardware Parts',
  ];

  // Blue Collections Bar items
  const defaultBlueItems = [
    'New Arrivals — Explore Our Latest Product Range',
    '⚡ 100% Genuine Imported Stock Direct From Companies',
    '🛡️ 1-Year Warranty & 40-Point QC Passed Hardware',
    '📦 Same Day Delivery & Cash On Delivery in Proddatur',
    '🔥 Up to 70% Off On Certified Refurbished Enterprise Laptops',
  ];

  const [greenList, setGreenList] = useState<string[]>(defaultGreenItems);
  const [blueList, setBlueList] = useState<string[]>(defaultBlueItems);

  const [newGreenInput, setNewGreenInput] = useState('');
  const [newBlueInput, setNewBlueInput] = useState('');

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (content['banner.running_text']) {
      const items = content['banner.running_text'].split('|').map(s => s.trim()).filter(Boolean);
      if (items.length > 0) setGreenList(items);
    }
    if (content['banner.collections_text']) {
      const items = content['banner.collections_text'].split('|').map(s => s.trim()).filter(Boolean);
      if (items.length > 0) setBlueList(items);
    }
  }, [content]);

  // Green item actions
  const addGreenItem = () => {
    if (!newGreenInput.trim()) return;
    setGreenList(prev => [...prev, newGreenInput.trim()]);
    setNewGreenInput('');
  };

  const removeGreenItem = (index: number) => {
    setGreenList(prev => prev.filter((_, i) => i !== index));
  };

  // Blue item actions
  const addBlueItem = () => {
    if (!newBlueInput.trim()) return;
    setBlueList(prev => [...prev, newBlueInput.trim()]);
    setNewBlueInput('');
  };

  const removeBlueItem = (index: number) => {
    setBlueList(prev => prev.filter((_, i) => i !== index));
  };

  // Save to Database
  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const token = localStorage.getItem('uc_admin_token') || '';
      const payload = {
        'banner.running_text': greenList.join(' | '),
        'banner.collections_text': blueList.join(' | '),
      };

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        refreshContent();
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const resetDefaults = () => {
    setGreenList(defaultGreenItems);
    setBlueList(defaultBlueItems);
  };

  return (
    <div className="space-y-8 font-['Inter',sans-serif] text-slate-900">
      
      {/* ── TOP HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Scrolling Ticker & Marquee Banners
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Add, remove, and customize the live scrolling promotional text across your storefront.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetDefaults}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#0B1E3D] hover:bg-[#133da6] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-[#E8A93B]" /> : <Save className="w-4 h-4 text-[#E8A93B]" />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </motion.button>
        </div>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Ticker banners successfully saved and updated on your website!
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── 1. GREEN TOP TRUST TICKER BAR (HEADER RUNNING BANNER) ── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs" />
              <h3 className="text-lg font-bold text-slate-900">
                1. Top Green Trust Ticker Bar (Below Navbar)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Displays key trust badges, warranties, delivery guarantees, and special store offers.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            {greenList.length} Active Phrases
          </span>
        </div>

        {/* Live Animated Preview */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Live Stream Preview:
          </span>
          <div className="w-full bg-gradient-to-r from-[#0e6334] via-[#16a34a] to-[#0e6334] text-white overflow-hidden py-2.5 rounded-2xl shadow-sm select-none border border-[#0b4d28]">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...greenList, ...greenList, ...greenList].map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-2.5 mx-5 text-xs font-black uppercase tracking-wider text-white">
                  <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add New Phrase Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newGreenInput}
            onChange={e => setNewGreenInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGreenItem()}
            placeholder="Type new phrase to add (e.g. '10-Day Easy Exchange Policy')..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 focus:bg-white transition-all"
          />
          <button
            type="button"
            onClick={addGreenItem}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Text
          </button>
        </div>

        {/* Current Phrases List / Tag Pills */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Current Running Labels:
          </span>
          <div className="flex flex-wrap gap-2">
            {greenList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-800 transition-colors group"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeGreenItem(idx)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                  title="Remove label"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── 2. BLUE COLLECTIONS MARQUEE BAR (NEW ARRIVALS TICKER) ── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0B1E3D] inline-block shadow-xs" />
              <h3 className="text-lg font-bold text-slate-900">
                2. Deep Navy Collections Marquee Bar (Explore Collections Section)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Displays product stock arrivals, company wholesale deals, and promotional announcements.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-full">
            {blueList.length} Active Phrases
          </span>
        </div>

        {/* Live Animated Preview */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Live Stream Preview:
          </span>
          <div className="w-full bg-[#0B1E3D] text-white overflow-hidden py-3 rounded-2xl shadow-sm select-none border border-[#0B1E3D]">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...blueList, ...blueList, ...blueList].map((item, idx) => (
                <div key={idx} className="inline-flex items-center mx-5 text-xs font-bold uppercase tracking-wider text-slate-100">
                  <span>{item}</span>
                  <span className="mx-5 text-[#E8A93B]/70 font-normal">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add New Phrase Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newBlueInput}
            onChange={e => setNewBlueInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addBlueItem()}
            placeholder="Type new announcement phrase (e.g. '🔥 Mega Weekend Clearance Sale')..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white transition-all"
          />
          <button
            type="button"
            onClick={addBlueItem}
            className="bg-[#0B1E3D] hover:bg-[#133da6] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#E8A93B]" /> Add Text
          </button>
        </div>

        {/* Current Phrases List */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Current Running Labels:
          </span>
          <div className="flex flex-wrap gap-2">
            {blueList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-800 transition-colors group"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeBlueItem(idx)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                  title="Remove label"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
