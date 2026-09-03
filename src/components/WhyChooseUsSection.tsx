import React from 'react';
import { motion } from 'motion/react';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

export const WhyChooseUsSection: React.FC = () => {
  const cards: FeatureCard[] = [
    {
      id: 'refurbisher',
      title: "India's Biggest Refurbisher",
      description: 'We are market leaders in IT asset disposition and refurbishment. Trusted by thousands.',
      image: '/why/why_refurbisher.jpg',
      buttonText: 'Learn More',
      link: '#about',
    },
    {
      id: 'desktops',
      title: 'Refurbished Desktops',
      description: 'High-performance towers and mini-desktops at a fraction of cost. Fully tested.',
      image: '/why/why_desktops.jpg',
      buttonText: 'Shop Desktops',
      link: '#products',
    },
    {
      id: 'monitors',
      title: 'Refurbished Monitors',
      description: 'Crisp displays from top brands. Perfect for office setup or gaming.',
      image: '/why/why_monitors.jpg',
      buttonText: 'Shop Monitors',
      link: '#products',
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── SECTION HEADER (Exact Match to Reference Screenshot) ─── */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase mb-2 font-['Inter',sans-serif]"
          >
            <span className="text-[#0B1E3D]">WHY CHOOSE </span>
            <span className="text-[#65a30d]">US?</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm font-semibold text-[#65a30d] tracking-normal font-['Inter',sans-serif]"
          >
            Premium quality, trusted service, and India's widest range.
          </motion.p>
        </div>

        {/* ─── 3 FEATURE CATEGORY CARDS (Exact Match to Reference Screenshot) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Top Full-Width Image Visual Stage */}
              <div className="w-full h-64 sm:h-72 lg:h-80 overflow-hidden relative bg-slate-900">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Bottom Card Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5 bg-white">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-normal font-['Inter',sans-serif]">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed font-['Inter',sans-serif]">
                    {card.description}
                  </p>
                </div>

                {/* Pill Outline Button */}
                <a
                  href={card.link}
                  className="w-full py-2.5 rounded-full border border-[#0B1E3D] text-[#0B1E3D] hover:bg-[#0B1E3D] hover:text-white font-bold text-xs tracking-wide transition-all text-center block cursor-pointer active:scale-98 shadow-xs font-['Inter',sans-serif]"
                >
                  {card.buttonText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
