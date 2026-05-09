import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=100&w=3840",
    tag: "Premium Refurbished Laptops",
    title: "Dell, HP & Lenovo",
    desc: "A+++ scratch-less imported laptops, 40-point quality tested and ready to deliver.",
  },
  {
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=100&w=3840",
    tag: "Trusted Since 2015",
    title: "9+ Years of Excellence",
    desc: "Over 1,000 happy clients in Proddatur trust Universal Computers for every laptop purchase.",
  },
  {
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=100&w=3840",
    tag: "Student Friendly Pricing",
    title: "High Performance, Low Cost",
    desc: "Top-spec laptops at unbeatable prices — perfect for students, freelancers and professionals.",
  },
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=100&w=3840",
    tag: "Verified Quality Testing",
    title: "40-Point QC Checked",
    desc: "Every laptop undergoes rigorous quality testing before it reaches your hands.",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=100&w=3840",
    tag: "Daily Fresh Inventory",
    title: "500+ Models Available",
    desc: "Wide range updated daily — find the perfect laptop for your budget and needs.",
  },
];

export const Hero = () => {
  const { content } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const badge = content['hero.badge'] || 'TRUSTED STORE SINCE 2015';
  const headlineLine1 = content['hero.headline_line1'] || 'UPGRADE';
  const headlineAccent1 = content['hero.headline_accent1'] || 'YOUR';
  const headlineAccent2 = content['hero.headline_accent2'] || 'TECH.';
  const subtext = content['hero.subtext'] || 'Premium Refurbished Laptops from Dell, HP & Lenovo. High performance, verified quality, and student-friendly prices.';

  const stat1Value = content['hero.stat1_value'] || '1000+';
  const stat1Label = content['hero.stat1_label'] || 'Happy Clients';
  const stat2Value = content['hero.stat2_value'] || '9+ YRS';
  const stat2Label = content['hero.stat2_label'] || 'Market Leader';
  const stat3Value = content['hero.stat3_value'] || '500+';
  const stat3Label = content['hero.stat3_label'] || 'Daily Inventory';

  const specCondition = content['hero.spec_condition'] || 'A+++ Scratchless';
  const specTesting = content['hero.spec_testing'] || '40-Point QC';
  const specWarranty = content['hero.spec_warranty'] || 'Standard Support';
  const specRegion = content['hero.spec_region'] || 'Imported Quality';
  const whatsapp = content['contact.whatsapp_number'] || '918712173339';

  const slide = SLIDES[currentIndex];

  return (
    <section className="pt-28 md:pt-36 bg-bg-dark">
      {/* Banner Image Slider */}
      <div className="relative w-full h-[320px] md:h-[520px] lg:h-[620px] bg-black overflow-hidden group">

        {/* Images — stack with absolute positioning, no AnimatePresence to avoid flicker */}
        {SLIDES.map((s, idx) => (
          <motion.img
            key={idx}
            src={s.image}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: idx === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        ))}

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />

        {/* Slide Info Overlay — bottom left */}
        <div className="absolute bottom-0 left-0 z-20 p-6 md:p-10 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="inline-block px-3 py-1 bg-brand-orange text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-3">
                {slide.tag}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight mb-2 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium drop-shadow">
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide counter — top right */}
        <div className="absolute top-5 right-5 z-20 bg-black/40 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full">
          {currentIndex + 1} / {SLIDES.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="w-full bg-black/5 py-3 flex justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`transition-all rounded-full ${
              idx === currentIndex
                ? 'bg-brand-orange w-6 h-2.5'
                : 'bg-gray-400 hover:bg-gray-600 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>

      {/* Hero Content Below Slider */}
      <div className="relative overflow-hidden py-20">
        {/* Animated Orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 -left-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] z-0 pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[150px] z-0 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-5 relative z-20 w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-black/5 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-6">
                {badge}
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-[80px] font-black tracking-normal leading-snug md:leading-tight mb-8 uppercase text-black drop-shadow-sm">
                {headlineLine1} <br />
                <span className="text-brand-blue italic pr-4">{headlineAccent1}</span>
                <span className="text-brand-orange">{headlineAccent2}</span>
              </h1>
              <p className="text-lg md:text-xl text-black/60 mb-10 leading-relaxed max-w-xl font-medium">
                {subtext}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex gap-10 bg-black/5 backdrop-blur-sm p-6 rounded-2xl border border-black/10">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-brand-orange">{stat1Value}</span>
                    <span className="text-[10px] text-black/50 font-black uppercase tracking-widest">{stat1Label}</span>
                  </div>
                  <div className="w-px h-12 bg-black/10 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-brand-blue">{stat2Value}</span>
                    <span className="text-[10px] text-black/50 font-black uppercase tracking-widest">{stat2Label}</span>
                  </div>
                  <div className="w-px h-12 bg-black/10 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-black">{stat3Value}</span>
                    <span className="text-[10px] text-black/50 font-black uppercase tracking-widest">{stat3Label}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-blue text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-brand-orange hover:text-white shadow-lg shadow-brand-blue/20"
                >
                  View Inventory
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-black/5 backdrop-blur-md border border-black/10 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black/10 text-black shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-brand-orange" />
                  Expert Inquiry
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Floating Specs Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 gap-4 w-full xl:w-auto mt-10 xl:mt-0"
          >
            <div className="glass p-6 rounded-xl w-full xl:w-48 text-center xl:text-left">
              <div className="text-xs text-black/50 uppercase font-bold mb-2">Condition</div>
              <div className="text-base font-mono font-bold text-black">{specCondition}</div>
            </div>
            <div className="glass p-6 rounded-xl w-full xl:w-48 text-center xl:text-left">
              <div className="text-xs text-black/50 uppercase font-bold mb-2">Testing</div>
              <div className="text-base font-mono font-bold text-black">{specTesting}</div>
            </div>
            <div className="glass p-6 rounded-xl w-full xl:w-48 text-center xl:text-left">
              <div className="text-xs text-black/50 uppercase font-bold mb-2">Warranty</div>
              <div className="text-base font-mono font-bold text-black">{specWarranty}</div>
            </div>
            <div className="glass p-6 rounded-xl w-full xl:w-48 text-center xl:text-left">
              <div className="text-xs text-black/50 uppercase font-bold mb-2">Region</div>
              <div className="text-base font-mono font-bold text-black">{specRegion}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
