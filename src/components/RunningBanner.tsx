import React from 'react';
import { Sparkles, ShieldCheck, Zap, Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface RunningBannerProps {
  className?: string;
}

export const RunningBanner: React.FC<RunningBannerProps> = ({ className = '' }) => {
  const { content } = useApp();

  const customText = content['banner.running_text'];
  
  const defaultItems = [
    { text: '1-Year Warranty Support', icon: ShieldCheck },
    { text: '40-Point QC Tested', icon: CheckCircle2 },
    { text: 'Free Delivery in Proddatur', icon: Zap },
    { text: '1000+ Happy Clients', icon: Award },
    { text: 'A+++ Scratch-Less Imported Quality', icon: Sparkles },
    { text: 'Best Prices Guaranteed', icon: Zap },
    { text: '7-Day Direct Replacement', icon: ShieldCheck },
    { text: '100% Genuine Hardware Parts', icon: CheckCircle2 },
  ];

  const items = customText 
    ? customText.split('|').map((t) => ({ text: t.trim(), icon: CheckCircle2 }))
    : defaultItems;

  return (
    <div className={`w-full bg-gradient-to-r from-[#0e6334] via-[#16a34a] to-[#0e6334] text-white overflow-hidden py-1.5 sm:py-2 shadow-xs select-none border-y border-[#0b4d28] font-['Inter',sans-serif] ${className}`}>
      <div className="flex animate-marquee whitespace-nowrap cursor-pointer">
        {/* Seamless marquee repetition */}
        {[...items, ...items, ...items, ...items].map((item, index) => {
          return (
            <div
              key={index}
              className="inline-flex items-center gap-2 mx-4 sm:mx-6 text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/90 shadow-2xs shrink-0" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RunningBanner;
