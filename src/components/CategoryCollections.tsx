import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  categoryFilter: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'laptops',
    name: 'Laptops',
    image: '/categories/laptops.jpg',
    categoryFilter: 'Business',
  },
  {
    id: 'tiny-pc',
    name: 'Tiny PC',
    image: '/categories/tiny-pc.jpg',
    categoryFilter: 'High Performance',
  },
  {
    id: 'monitors',
    name: 'Monitors',
    image: '/categories/monitors.jpg',
    categoryFilter: 'Accessories',
  },
  {
    id: 'desktops',
    name: 'Desktops',
    image: '/categories/desktops.jpg',
    categoryFilter: 'Developer',
  },
  {
    id: 'peripherals',
    name: 'Peripherals',
    image: '/categories/peripherals.jpg',
    categoryFilter: 'Accessories',
  },
];

export const CategoryCollections: React.FC = () => {
  const { content } = useApp();

  const customMarquee = content['banner.collections_text'];
  const defaultItems = [
    'New Arrivals — Explore Our Latest Product Range',
    '⚡ 100% Genuine Imported Stock Direct From Companies',
    '🛡️ 1-Year Warranty & 40-Point QC Passed Hardware',
    '📦 Same Day Delivery & Cash On Delivery in Proddatur',
    '🔥 Up to 70% Off On Certified Refurbished Enterprise Laptops',
  ];

  const marqueeItems = customMarquee 
    ? customMarquee.split('|').map(s => s.trim()).filter(Boolean)
    : defaultItems;

  return (
    <section id="collections" className="w-full bg-white pt-16 pb-0 overflow-hidden border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1E3D] tracking-tight mb-2 uppercase"
          >
            Explore Our Collections
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm md:text-base text-slate-500 font-medium"
          >
            Certified Refurbished IT Solutions
          </motion.p>
        </div>

        {/* 5-Card Category Grid (Exact Match to Reference Site) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {CATEGORIES.map((cat, index) => (
            <motion.a
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#E8A93B] shadow-sm hover:shadow-xl transition-all p-4 sm:p-5 flex flex-col items-center justify-between text-center group cursor-pointer"
            >
              {/* Clean White Product Image Area */}
              <div className="w-full h-36 sm:h-40 md:h-44 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2 mb-4 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & Shop Now Action */}
              <div className="w-full flex flex-col items-center space-y-1.5 pt-1">
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E3D] group-hover:text-brand-blue transition-colors">
                  {cat.name}
                </h3>
                
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-blue group-hover:text-[#E8A93B] uppercase tracking-wider transition-colors pt-1">
                  SHOP NOW <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>

      {/* ─── NEW ARRIVALS BLUE ROLLING TICKER BAR (DYNAMIC CONTENT) ─── */}
      <div className="w-full bg-[#0B1E3D] text-white py-3 overflow-hidden border-t border-[#0B1E3D] shadow-inner select-none">
        <div className="flex animate-marquee whitespace-nowrap cursor-pointer">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, i) => (
            <div key={i} className="inline-flex items-center mx-5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-100 hover:text-[#E8A93B] transition-colors">
              <span>{text}</span>
              <span className="mx-6 text-[#E8A93B]/70 font-normal">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCollections;
