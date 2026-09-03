import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ChevronLeft, ChevronRight, Pause, Play,
  ShieldCheck, Award, Zap, Sparkles, MessageSquare, Phone, 
  Monitor, Cpu, Laptop, Layers, Wrench, Clock, Users, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero = () => {
  const { content } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const phone = content['contact.phone_raw'] || '8712173339';
  const whatsapp = content['contact.whatsapp_number'] || '918712173339';

  const totalSlides = 4;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <section className="w-full relative bg-[#0B1E3D] overflow-hidden">
      {/* 
        ══════════════════════════════════════════════════════════════════════════
        HERO BANNER V3: DYNAMIC DIAGONAL FULL-BLEED LAYOUT
        • Locked Design System: Deep Navy (#0B1E3D), Warm Gold (#E8A93B), Off-White (#F5F7FA)
        • Dynamic Diagonal Hero Image (rotated 8-10°, bleeding off-frame right)
        • Circular Gold Offer Badge overlapping top-right
        • Scattered Circular Navy-Glass Shortcut Badges along diagonal edge
        • Larger, Bolder Pill CTAs with High Energy
        ══════════════════════════════════════════════════════════════════════════
      */}
      <div className="relative w-full h-[520px] sm:h-[540px] md:h-[570px] lg:h-[600px] select-none bg-[#0B1E3D]">
        
        <AnimatePresence mode="wait">

          {/* ───────────────────────────────────────────────────────────────────
              BANNER 1: HERO / MAIN OFFER (DIAGONAL HERO + 70% OFF + 3 BUBBLES)
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 0 && (
            <motion.div
              key="banner-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center overflow-hidden"
            >
              {/* Background Soft Glows */}
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[550px] h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full py-6 relative z-10">
                
                {/* Left 45%: Confident Headline & CTAs */}
                <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center z-20">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#E8A93B] w-max mb-3.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E8A93B]" />
                    A TRUSTED NAME IN REFURBISHED IT ASSETS
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.06] mb-3.5">
                    REFURBISHED <br />
                    <span className="text-[#E8A93B]">LAPTOPS & MONITORS</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-6">
                    Discover exceptional value on Dell, HP & Lenovo — verified performance, smarter savings, instant warranty included.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 mb-5">
                    <a
                      href="#products"
                      className="px-8 py-3.5 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
                    >
                      SHOP NOW <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <span className="px-5 py-3.5 bg-white/[0.06] border border-white/20 text-[#F5F7FA] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm">
                      QUALITY-TESTED | WARRANTY INCLUDED
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    Quality Tested • 7-Day Support • 1,000+ Happy Clients in Proddatur
                  </p>
                </div>

                {/* Right 55%: Diagonal Bleed Hero Visual + Floating Shortcut Badges */}
                <div className="lg:col-span-6 xl:col-span-7 h-full relative flex items-center justify-center lg:justify-end">
                  
                  {/* Floating Circular Category Badges Scattered along Diagonal Left Edge */}
                  <div className="hidden sm:flex flex-col gap-4 absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30">
                    {/* Badge 1: Monitors */}
                    <a href="#products" className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-xl flex items-center justify-center text-[#E8A93B] group-hover:scale-110 transition-all shrink-0">
                        <Monitor className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:text-[#E8A93B] transition-colors shadow-md">
                        Monitors
                      </span>
                    </a>

                    {/* Badge 2: Desktops */}
                    <a href="#products" className="flex items-center gap-3 translate-x-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-xl flex items-center justify-center text-[#E8A93B] group-hover:scale-110 transition-all shrink-0">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:text-[#E8A93B] transition-colors shadow-md">
                        Desktops
                      </span>
                    </a>

                    {/* Badge 3: PC Sets */}
                    <a href="#products" className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-xl flex items-center justify-center text-[#E8A93B] group-hover:scale-110 transition-all shrink-0">
                        <Layers className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:text-[#E8A93B] transition-colors shadow-md">
                        PC Sets
                      </span>
                    </a>
                  </div>

                  {/* Circular Gold 70% Off Badge */}
                  <div className="absolute top-6 right-8 sm:right-16 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-2xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-12 group-hover:rotate-0 transition-transform">
                    <span className="text-[10px] font-black uppercase tracking-wider leading-none">UP TO</span>
                    <span className="text-2xl sm:text-3xl font-black leading-none my-0.5">70%</span>
                    <span className="text-[10px] font-black uppercase tracking-wider leading-none">OFF</span>
                  </div>

                  {/* Diagonal Full-Bleed Product Hero (Rotated 8-10°, Bleeding Right) */}
                  <div className="relative w-[340px] sm:w-[480px] md:w-[540px] lg:w-[620px] h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] rotate-[-7deg] lg:rotate-[-9deg] translate-x-4 sm:translate-x-8 lg:translate-x-14 group">
                    <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)] bg-slate-900">
                      <img
                        src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1200"
                        alt="Dell Latitude & ThinkPad Hero Shot"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              BANNER 2: TRUST / QC PROCESS (DIAGONAL TESTING BENCH + QC BUBBLES)
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 1 && (
            <motion.div
              key="banner-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center overflow-hidden"
            >
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[550px] h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full py-6 relative z-10">
                
                {/* Left 45%: Text Block */}
                <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center z-20">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#E8A93B] w-max mb-3.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E8A93B]" />
                    CERTIFIED TESTING PROCESS
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.06] mb-3.5">
                    40-POINT QC <br />
                    <span className="text-[#E8A93B]">DIAGNOSTICS & TESTING</span>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-6">
                    Every device undergoes comprehensive motherboard testing, thermal paste refresh, battery health optimization, and clean OS installation.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 mb-5">
                    <a
                      href="#services"
                      className="px-8 py-3.5 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
                    >
                      EXPLORE QC PROCESS <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <a
                      href={`https://wa.me/${whatsapp}?text=Hi Universal Computers, I want to know about your 40-point testing process.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-white/[0.06] hover:bg-white/10 border border-white/20 text-[#F5F7FA] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm transition-all flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#E8A93B]" /> ASK A TECHNICIAN
                    </a>
                  </div>

                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    Motherboard Diagnostics • Battery Cycles • Thermal Benchmarking
                  </p>
                </div>

                {/* Right 55%: Diagonal Bleed Hero Visual + QC Shortcut Badges */}
                <div className="lg:col-span-6 xl:col-span-7 h-full relative flex items-center justify-center lg:justify-end">
                  
                  {/* Floating Circular QC Badges */}
                  <div className="hidden sm:flex flex-col gap-4 absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30">
                    <div className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 shadow-xl flex items-center justify-center text-[#E8A93B] shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        40-Point QC
                      </span>
                    </div>

                    <div className="flex items-center gap-3 translate-x-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 shadow-xl flex items-center justify-center text-[#E8A93B] shrink-0">
                        <Zap className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        Battery Health
                      </span>
                    </div>

                    <div className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 shadow-xl flex items-center justify-center text-[#E8A93B] shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        7-Day Support
                      </span>
                    </div>
                  </div>

                  {/* Circular Gold 100% Passed Badge */}
                  <div className="absolute top-6 right-8 sm:right-16 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-2xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-12">
                    <CheckCircle2 className="w-6 h-6 mb-0.5" />
                    <span className="text-xs font-black uppercase tracking-wider text-center leading-tight">100% QC<br />PASSED</span>
                  </div>

                  {/* Diagonal Full-Bleed Testing Bench Hero */}
                  <div className="relative w-[340px] sm:w-[480px] md:w-[540px] lg:w-[620px] h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] rotate-[-7deg] lg:rotate-[-9deg] translate-x-4 sm:translate-x-8 lg:translate-x-14 group">
                    <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)] bg-slate-900">
                      <img
                        src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1200"
                        alt="Dual Testing Laptops on Wood Surface"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              BANNER 3: PRODUCT CATEGORY (DIAGONAL WORKSTATION + BRAND BUBBLES)
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 2 && (
            <motion.div
              key="banner-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center overflow-hidden"
            >
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[550px] h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full py-6 relative z-10">
                
                {/* Left 45%: Text Block */}
                <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center z-20">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#E8A93B] w-max mb-3.5">
                    <Laptop className="w-3.5 h-3.5 text-[#E8A93B]" />
                    PREMIUM INVENTORY
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.06] mb-3.5">
                    REFURBISHED LAPTOPS <br />
                    <span className="text-[#E8A93B]">HIGH PERFORMANCE</span>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-6">
                    Curated business laptops for developers, designers, students, and corporate fleets at up to 60% off showroom price.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 mb-5">
                    <a
                      href="#products"
                      className="px-8 py-3.5 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
                    >
                      SHOP NOW <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <span className="px-5 py-3.5 bg-white/[0.06] border border-white/20 text-[#E8A93B] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm">
                      SAVE UP TO 60%
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    Dell Latitude • Lenovo ThinkPad • HP EliteBook Series
                  </p>
                </div>

                {/* Right 55%: Diagonal Bleed Hero Visual + Brand Shortcut Badges */}
                <div className="lg:col-span-6 xl:col-span-7 h-full relative flex items-center justify-center lg:justify-end">
                  
                  {/* Floating Circular Brand Badges */}
                  <div className="hidden sm:flex flex-col gap-4 absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30">
                    <a href="#products" className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-xl flex items-center justify-center text-[#E8A93B] group-hover:scale-110 transition-all shrink-0">
                        <Laptop className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:text-[#E8A93B] transition-colors shadow-md">
                        Dell Latitude
                      </span>
                    </a>

                    <a href="#products" className="flex items-center gap-3 translate-x-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-xl flex items-center justify-center text-[#E8A93B] group-hover:scale-110 transition-all shrink-0">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:text-[#E8A93B] transition-colors shadow-md">
                        ThinkPad T-Series
                      </span>
                    </a>

                    <a href="#products" className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-xl flex items-center justify-center text-[#E8A93B] group-hover:scale-110 transition-all shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:text-[#E8A93B] transition-colors shadow-md">
                        HP EliteBook
                      </span>
                    </a>
                  </div>

                  {/* Circular Gold 60% Save Badge */}
                  <div className="absolute top-6 right-8 sm:right-16 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-2xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-12">
                    <span className="text-[10px] font-black uppercase tracking-wider leading-none">SAVE</span>
                    <span className="text-2xl sm:text-3xl font-black leading-none my-0.5">60%</span>
                    <span className="text-[10px] font-black uppercase tracking-wider leading-none">OFF MRP</span>
                  </div>

                  {/* Diagonal Full-Bleed Product Hero */}
                  <div className="relative w-[340px] sm:w-[480px] md:w-[540px] lg:w-[620px] h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] rotate-[-7deg] lg:rotate-[-9deg] translate-x-4 sm:translate-x-8 lg:translate-x-14 group">
                    <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)] bg-slate-900">
                      <img
                        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200"
                        alt="High Performance Laptop on Wood Surface"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              BANNER 4: CONTACT / CREDIBILITY & BUSINESS SOLUTIONS
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 3 && (
            <motion.div
              key="banner-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center overflow-hidden"
            >
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[550px] h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full py-6 relative z-10">
                
                {/* Left 45%: Text Block */}
                <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center z-20">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#E8A93B] w-max mb-3.5">
                    <Award className="w-3.5 h-3.5 text-[#E8A93B]" />
                    REFURBISHED IT ASSET SOLUTIONS
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.06] mb-3.5">
                    CERTIFIED HARDWARE <br />
                    <span className="text-[#E8A93B]">AT SMART PRICES</span>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-6">
                    Equipping startups, institutions, and professionals across Proddatur with certified enterprise hardware and reliable after-sales support.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 mb-5">
                    <a
                      href={`https://wa.me/${whatsapp}?text=Hi Universal Computers, I want to inquire about bulk business/student laptops.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-3.5 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
                    >
                      CONTACT US <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <a
                      href={`tel:${phone}`}
                      className="px-6 py-3.5 bg-white/[0.06] hover:bg-white/10 border border-white/20 text-[#F5F7FA] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm transition-all flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#E8A93B]" /> +91 {phone}
                    </a>
                  </div>

                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    Store Address: D.No 14/331, Church Complex Upstairs, Proddatur.
                  </p>
                </div>

                {/* Right 55%: Diagonal Bleed Hero Visual + Trust Shortcut Badges */}
                <div className="lg:col-span-6 xl:col-span-7 h-full relative flex items-center justify-center lg:justify-end">
                  
                  {/* Floating Circular Trust Badges */}
                  <div className="hidden sm:flex flex-col gap-4 absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30">
                    <div className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 shadow-xl flex items-center justify-center text-[#E8A93B] shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        Certified Quality
                      </span>
                    </div>

                    <div className="flex items-center gap-3 translate-x-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 shadow-xl flex items-center justify-center text-[#E8A93B] shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        Store Warranty
                      </span>
                    </div>

                    <div className="flex items-center gap-3 group">
                      <div className="w-14 h-14 rounded-full bg-[#0B1E3D]/85 backdrop-blur-md border border-[#E8A93B]/40 shadow-xl flex items-center justify-center text-[#E8A93B] shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <span className="bg-[#0B1E3D]/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                        1000+ Clients
                      </span>
                    </div>
                  </div>

                  {/* Circular Gold Bulk Orders Badge */}
                  <div className="absolute top-6 right-8 sm:right-16 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-2xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-12">
                    <Sparkles className="w-5 h-5 mb-0.5" />
                    <span className="text-xs font-black uppercase tracking-wider text-center leading-tight">BULK<br />ORDERS</span>
                  </div>

                  {/* Diagonal Full-Bleed Enterprise Hero */}
                  <div className="relative w-[340px] sm:w-[480px] md:w-[540px] lg:w-[620px] h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] rotate-[-7deg] lg:rotate-[-9deg] translate-x-4 sm:translate-x-8 lg:translate-x-14 group">
                    <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)] bg-slate-900">
                      <img
                        src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1200"
                        alt="Corporate Enterprise Hardware on Wood Surface"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════════════════
            BOTTOM CAROUSEL CONTROLS (UNIFIED GOLD & NAVY DESIGN)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="absolute bottom-4 inset-x-0 z-40 flex items-center justify-center gap-3 pointer-events-auto">
          <div className="bg-[#0B1E3D]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 flex items-center gap-3 shadow-xl">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="text-slate-300 hover:text-[#E8A93B] transition-colors p-1"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all rounded-full ${
                    idx === currentIndex
                      ? 'bg-[#E8A93B] w-6 h-2 shadow-sm shadow-[#E8A93B]/50'
                      : 'bg-white/30 hover:bg-white/60 w-2 h-2'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="text-slate-300 hover:text-[#E8A93B] transition-colors p-1"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="w-px h-3.5 bg-white/20" />

            {/* Pause / Play Button */}
            <button
              onClick={togglePlay}
              className="text-slate-300 hover:text-[#E8A93B] transition-colors p-1"
              title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
