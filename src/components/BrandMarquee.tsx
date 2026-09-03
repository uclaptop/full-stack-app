import React from 'react';
import { motion } from 'motion/react';

interface BrandItem {
  name: string;
  logo: React.ReactNode;
}

export const BrandMarquee: React.FC = () => {
  const brands: BrandItem[] = [
    {
      name: 'Dell',
      logo: (
        <svg className="h-8 sm:h-9 w-auto text-slate-800 group-hover:text-blue-600 transition-colors" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,5A45,45,0,1,0,95,50,45,45,0,0,0,50,5ZM50,88A38,38,0,1,1,88,50,38,38,0,0,1,50,88ZM24,42.5h6.5v15H24Zm14,0h5.5l5.2,10.2V42.5h6.5v15H49.7L44.5,47.3V57.5H38Zm22,0h6.5v10.5h8.5v4.5H60Zm20,0h6.5v10.5h8.5v4.5H80Z"/>
        </svg>
      ),
    },
    {
      name: 'HP',
      logo: (
        <svg className="h-8 sm:h-9 w-auto text-slate-800 group-hover:text-blue-600 transition-colors" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M43 25 L34 75 M54 25 L45 75 M33 50 L56 50 M62 25 L58 45 M58 45 C65 42 72 48 70 56 C68 64 61 70 53 70 L48 70" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Lenovo',
      logo: (
        <div className="bg-[#E2231A] text-white px-4 py-1.5 rounded-sm font-black text-sm tracking-tight select-none">
          Lenovo
        </div>
      ),
    },
    {
      name: 'ASUS',
      logo: (
        <span className="font-black text-xl sm:text-2xl tracking-[0.2em] text-slate-800 group-hover:text-blue-600 transition-colors select-none font-sans">
          ASUS
        </span>
      ),
    },
    {
      name: 'Acer',
      logo: (
        <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-800 group-hover:text-green-600 transition-colors select-none font-sans lowercase">
          acer
        </span>
      ),
    },
    {
      name: 'Samsung',
      logo: (
        <span className="font-black text-lg sm:text-xl tracking-[0.25em] text-slate-800 group-hover:text-blue-700 transition-colors select-none font-sans">
          SAMSUNG
        </span>
      ),
    },
    {
      name: 'Apple',
      logo: (
        <svg className="h-8 sm:h-9 w-auto text-slate-800 group-hover:text-slate-950 transition-colors" viewBox="0 0 170 170" fill="currentColor">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.79-11.72-14.24-5.66-8.8-10.1-18.9-13.32-30.3-3.23-11.41-4.85-22.37-4.85-32.88 0-14.24 3.7-25.79 11.09-34.66 7.39-8.86 16.73-13.43 28.02-13.69 4.35 0 9.3 1.17 14.86 3.52 5.56 2.34 9.36 3.59 11.39 3.73 1.62-.27 5.58-1.57 11.89-3.92 6.31-2.35 11.58-3.41 15.8-3.19 12.01.63 21.65 5.09 28.93 13.38-10.43 6.31-15.54 14.88-15.33 25.71.21 8.52 3.49 15.7 9.84 21.56 6.35 5.86 13.99 9.17 22.92 9.93-2.09 6.26-4.71 12.44-7.86 18.54zM119.22 33.37c-.12-4.13.91-8.52 3.09-13.16 2.18-4.64 5.34-8.86 9.47-12.65 3.92-3.69 8.27-6.22 13.06-7.56-1.19 4.35-2.6 8.7-4.24 13.06-1.63 4.35-4.13 8.37-7.49 12.06-3.36 3.69-7.39 6.35-12.09 7.98-.6-.62-1.2-1.19-1.8-1.73z" />
        </svg>
      ),
    },
    {
      name: 'Intel',
      logo: (
        <span className="font-black text-xl sm:text-2xl tracking-tight text-[#0071C5] select-none font-sans lowercase">
          intel.
        </span>
      ),
    },
    {
      name: 'AMD',
      logo: (
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#ED1C24] transform rotate-45 shrink-0" />
          <span className="font-black text-lg sm:text-xl tracking-wider text-slate-900 select-none">
            AMD
          </span>
        </div>
      ),
    },
    {
      name: 'Logitech',
      logo: (
        <span className="font-bold text-base sm:text-lg tracking-tight text-slate-800 select-none font-sans">
          logitech
        </span>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-16 overflow-hidden border-b border-slate-200/80 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        
        {/* Section Header (Matching Reference Screenshot) */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black text-[#0B1E3D] tracking-tight uppercase mb-2 font-sans"
        >
          Brands We Sell
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xs sm:text-sm font-semibold text-emerald-600 tracking-wide"
        >
          Trusted global leaders in refurbished IT assets
        </motion.p>
      </div>

      {/* ─── CONTINUOUS SMOOTH MARQUEE OF BRAND CARDS ─── */}
      <div className="w-full overflow-hidden py-4">
        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap cursor-pointer">
          {/* Render 4 repeated sets for an infinite seamless loop */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="inline-flex mx-3 sm:mx-4 shrink-0"
            >
              <div className="w-36 sm:w-44 md:w-48 h-24 sm:h-28 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-[#E8A93B] flex items-center justify-center p-4 transition-all duration-300 group">
                <div className="flex items-center justify-center w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                  {brand.logo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
