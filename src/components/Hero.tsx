import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ChevronLeft, ChevronRight, Pause, Play,
  ShieldCheck, Award, Zap, Sparkles, MessageSquare, Phone, 
  Monitor, Cpu, Laptop, Layers, Clock, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero = () => {
  const { content } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const phone = content['contact.phone_raw'] || '8712173339';
  const whatsapp = content['contact.whatsapp_number'] || '918712173339';

  // Dynamic banner configurations from DB site_content
  const slide1 = {
    tag: content['hero.slide1_tag'] || 'A TRUSTED NAME IN REFURBISHED IT',
    title1: content['hero.slide1_title1'] || 'REFURBISHED',
    title2: content['hero.slide1_title2'] || 'LAPTOPS & MONITORS',
    subtitle: content['hero.slide1_subtitle'] || 'Exceptional value on Dell, HP & Lenovo — 40-point quality checked, scratch-less condition with 1-year warranty.',
    badge: content['hero.slide1_badge'] || 'UP TO 70% OFF',
    btnText: content['hero.slide1_btn_text'] || 'SHOP NOW',
    btnLink: content['hero.slide1_btn_link'] || '#products',
    image: content['hero.slide1_image'] || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000',
  };

  const slide2 = {
    tag: content['hero.slide2_tag'] || 'CERTIFIED TESTING PROCESS',
    title1: content['hero.slide2_title1'] || '40-POINT QC',
    title2: content['hero.slide2_title2'] || 'DIAGNOSTICS & TESTING',
    subtitle: content['hero.slide2_subtitle'] || 'Motherboard diagnostics, thermal paste refresh, battery health optimization, and clean OS installation on every unit.',
    badge: content['hero.slide2_badge'] || '100% QC PASSED',
    btnText: content['hero.slide2_btn_text'] || 'EXPLORE QC PROCESS',
    btnLink: content['hero.slide2_btn_link'] || '#about',
    image: content['hero.slide2_image'] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000',
  };

  const slide3 = {
    tag: content['hero.slide3_tag'] || 'PREMIUM INVENTORY',
    title1: content['hero.slide3_title1'] || 'ENTERPRISE LAPTOPS',
    title2: content['hero.slide3_title2'] || 'HIGH PERFORMANCE',
    subtitle: content['hero.slide3_subtitle'] || 'Curated laptops for developers, designers, students, and corporate teams at up to 60% off showroom price.',
    badge: content['hero.slide3_badge'] || 'SAVE UP TO 60%',
    btnText: content['hero.slide3_btn_text'] || 'SHOP NOW',
    btnLink: content['hero.slide3_btn_link'] || '#products',
    image: content['hero.slide3_image'] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
  };

  const slide4 = {
    tag: content['hero.slide4_tag'] || 'REFURBISHED IT ASSET SOLUTIONS',
    title1: content['hero.slide4_title1'] || 'CERTIFIED HARDWARE',
    title2: content['hero.slide4_title2'] || 'AT SMART PRICES',
    subtitle: content['hero.slide4_subtitle'] || 'Equipping startups, institutions, and professionals with certified enterprise hardware and reliable after-sales support.',
    badge: content['hero.slide4_badge'] || 'BULK ORDERS',
    btnText: content['hero.slide4_btn_text'] || 'CONTACT US',
    btnLink: content['hero.slide4_btn_link'] || '#contact',
    image: content['hero.slide4_image'] || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000',
  };

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
    <section className="w-full relative bg-[#0B1E3D] overflow-hidden font-['Inter',sans-serif]">
      {/* 
        ══════════════════════════════════════════════════════════════════════════
        RESPONSIVE HERO BANNER
        • Mobile: Clean, punchy typography, non-overlapping CTAs, sleek visual
        • Desktop: Dynamic diagonal visual + floating category badges
        ══════════════════════════════════════════════════════════════════════════
      */}
      <div className="relative w-full min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:h-[580px] xl:h-[600px] select-none bg-[#0B1E3D] flex items-center">
        
        <AnimatePresence mode="wait">

          {/* ───────────────────────────────────────────────────────────────────
              SLIDE 1: MAIN HERO / UP TO 70% OFF
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 0 && (
            <motion.div
              key="banner-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full h-full flex items-center py-8 sm:py-10 lg:py-0 pb-16 lg:pb-0"
            >
              {/* Background Ambient Glows */}
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                
                {/* Text Content */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-20 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E8A93B] w-max mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#E8A93B] shrink-0" />
                    <span>{slide1.tag}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.12] mb-3">
                    {slide1.title1} <br className="hidden sm:inline" />
                    <span className="text-[#E8A93B]">{slide1.title2}</span>
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-5 line-clamp-3 sm:line-clamp-none">
                    {slide1.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href={slide1.btnLink}
                      className="px-6 sm:px-8 py-3 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      {slide1.btnText} <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <span className="px-4 py-3 bg-white/[0.08] border border-white/20 text-[#F5F7FA] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm">
                      {slide1.badge}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                    Quality Tested • 7-Day Support • 1,000+ Happy Clients
                  </p>
                </div>

                {/* Right Visual (Optimized for Mobile & Desktop) */}
                <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
                  
                  {/* Floating Circular Badges (Desktop Only) */}
                  <div className="hidden lg:flex flex-col gap-3 absolute left-0 top-1/2 -translate-y-1/2 z-30">
                    <a href="#products" className="flex items-center gap-2.5 group">
                      <div className="w-11 h-11 rounded-full bg-[#0B1E3D]/90 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-lg flex items-center justify-center text-[#E8A93B] transition-all shrink-0">
                        <Monitor className="w-5 h-5" />
                      </div>
                      <span className="bg-[#0B1E3D]/90 border border-white/10 px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm">
                        Monitors
                      </span>
                    </a>

                    <a href="#products" className="flex items-center gap-2.5 translate-x-2 group">
                      <div className="w-11 h-11 rounded-full bg-[#0B1E3D]/90 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-lg flex items-center justify-center text-[#E8A93B] transition-all shrink-0">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="bg-[#0B1E3D]/90 border border-white/10 px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm">
                        Desktops
                      </span>
                    </a>

                    <a href="#products" className="flex items-center gap-2.5 group">
                      <div className="w-11 h-11 rounded-full bg-[#0B1E3D]/90 backdrop-blur-md border border-[#E8A93B]/40 group-hover:border-[#E8A93B] shadow-lg flex items-center justify-center text-[#E8A93B] transition-all shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="bg-[#0B1E3D]/90 border border-white/10 px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm">
                        PC Sets
                      </span>
                    </a>
                  </div>

                  {/* Circular Gold Badge */}
                  <div className="absolute -top-3 right-2 sm:right-6 lg:right-12 z-30 px-3 py-2.5 rounded-2xl bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-6">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-center leading-tight">
                      {slide1.badge}
                    </span>
                  </div>

                  {/* Clean Visual Container */}
                  <div className="w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] h-[190px] sm:h-[250px] lg:h-[320px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900">
                    <img
                      src={slide1.image}
                      alt={slide1.title1}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000';
                      }}
                    />
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              SLIDE 2: 40-POINT QC DIAGNOSTICS
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 1 && (
            <motion.div
              key="banner-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full h-full flex items-center py-8 sm:py-10 lg:py-0 pb-16 lg:pb-0"
            >
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                
                {/* Text Block */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-20 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E8A93B] w-max mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E8A93B] shrink-0" />
                    <span>{slide2.tag}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.12] mb-3">
                    {slide2.title1} <br className="hidden sm:inline" />
                    <span className="text-[#E8A93B]">{slide2.title2}</span>
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-5 line-clamp-3 sm:line-clamp-none">
                    {slide2.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href={slide2.btnLink}
                      className="px-6 sm:px-8 py-3 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      {slide2.btnText} <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <a
                      href={`https://wa.me/${whatsapp}?text=Hi Universal Computers, I want to know about your 40-point testing process.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 sm:px-5 py-3 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-[#F5F7FA] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#E8A93B]" /> ASK A TECHNICIAN
                    </a>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                    Motherboard Diagnostics • Battery Cycles • Thermal Benchmarking
                  </p>
                </div>

                {/* Right Visual */}
                <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
                  
                  {/* Circular Gold Badge */}
                  <div className="absolute -top-3 right-2 sm:right-6 lg:right-12 z-30 px-3 py-2.5 rounded-2xl bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-6">
                    <CheckCircle2 className="w-4 h-4 mb-0.5" />
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-center leading-tight">
                      {slide2.badge}
                    </span>
                  </div>

                  <div className="w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] h-[190px] sm:h-[250px] lg:h-[320px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900">
                    <img
                      src={slide2.image}
                      alt={slide2.title1}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000';
                      }}
                    />
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              SLIDE 3: HIGH PERFORMANCE LAPTOPS / SAVE 60%
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 2 && (
            <motion.div
              key="banner-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full h-full flex items-center py-8 sm:py-10 lg:py-0 pb-16 lg:pb-0"
            >
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                
                {/* Text Block */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-20 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E8A93B] w-max mb-3">
                    <Laptop className="w-3.5 h-3.5 text-[#E8A93B] shrink-0" />
                    <span>{slide3.tag}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.12] mb-3">
                    {slide3.title1} <br className="hidden sm:inline" />
                    <span className="text-[#E8A93B]">{slide3.title2}</span>
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-5 line-clamp-3 sm:line-clamp-none">
                    {slide3.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href={slide3.btnLink}
                      className="px-6 sm:px-8 py-3 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      {slide3.btnText} <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <span className="px-4 py-3 bg-white/[0.08] border border-white/20 text-[#E8A93B] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm">
                      {slide3.badge}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                    Dell Latitude • Lenovo ThinkPad • HP EliteBook Series
                  </p>
                </div>

                {/* Right Visual */}
                <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
                  
                  {/* Circular Gold Badge */}
                  <div className="absolute -top-3 right-2 sm:right-6 lg:right-12 z-30 px-3 py-2.5 rounded-2xl bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-6">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-center leading-tight">
                      {slide3.badge}
                    </span>
                  </div>

                  <div className="w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] h-[190px] sm:h-[250px] lg:h-[320px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900">
                    <img
                      src={slide3.image}
                      alt={slide3.title1}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000';
                      }}
                    />
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              SLIDE 4: BULK ORDERS / STORE CONTACT
             ─────────────────────────────────────────────────────────────────── */}
          {currentIndex === 3 && (
            <motion.div
              key="banner-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full h-full flex items-center py-8 sm:py-10 lg:py-0 pb-16 lg:pb-0"
            >
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#E8A93B]/[0.08] rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

              <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                
                {/* Text Block */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-20 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8A93B]/10 border border-[#E8A93B]/30 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E8A93B] w-max mb-3">
                    <Award className="w-3.5 h-3.5 text-[#E8A93B] shrink-0" />
                    <span>{slide4.tag}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black uppercase tracking-tight text-[#F5F7FA] leading-[1.12] mb-3">
                    {slide4.title1} <br className="hidden sm:inline" />
                    <span className="text-[#E8A93B]">{slide4.title2}</span>
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-md font-normal mb-5 line-clamp-3 sm:line-clamp-none">
                    {slide4.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href={slide4.btnLink.startsWith('http') || slide4.btnLink.startsWith('#') ? slide4.btnLink : `https://wa.me/${whatsapp}?text=${encodeURIComponent(slide4.btnLink)}`}
                      target={slide4.btnLink.startsWith('http') || !slide4.btnLink.startsWith('#') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="px-6 sm:px-8 py-3 bg-[#E8A93B] hover:bg-[#d99b26] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#E8A93B]/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      {slide4.btnText} <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <a
                      href={`tel:${phone}`}
                      className="px-4 sm:px-5 py-3 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-[#F5F7FA] font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E8A93B]" /> +91 {phone}
                    </a>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                    Church Complex Upstairs, Proddatur
                  </p>
                </div>

                {/* Right Visual */}
                <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
                  
                  {/* Circular Gold Badge */}
                  <div className="absolute -top-3 right-2 sm:right-6 lg:right-12 z-30 px-3 py-2.5 rounded-2xl bg-gradient-to-br from-[#E8A93B] to-[#d99b26] border-4 border-[#0B1E3D] shadow-xl flex flex-col items-center justify-center text-[#0B1E3D] rotate-6">
                    <Sparkles className="w-4 h-4 mb-0.5" />
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-center leading-tight">
                      {slide4.badge}
                    </span>
                  </div>

                  <div className="w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] h-[190px] sm:h-[250px] lg:h-[320px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900">
                    <img
                      src={slide4.image}
                      alt={slide4.title1}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000';
                      }}
                    />
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════════════════
            BOTTOM CAROUSEL CONTROLS (CLEAN GLASS PILL - POSITIONED SAFELY)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-40 flex items-center justify-center gap-3 pointer-events-auto">
          <div className="bg-[#0B1E3D]/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 flex items-center gap-2.5 shadow-xl">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="text-slate-300 hover:text-[#E8A93B] transition-colors p-1 cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-[#E8A93B] w-5 h-1.5 shadow-xs shadow-[#E8A93B]/50'
                      : 'bg-white/30 hover:bg-white/60 w-1.5 h-1.5'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="text-slate-300 hover:text-[#E8A93B] transition-colors p-1 cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-3 bg-white/20" />

            {/* Pause / Play Button */}
            <button
              onClick={togglePlay}
              className="text-slate-300 hover:text-[#E8A93B] transition-colors p-1 cursor-pointer"
              title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
