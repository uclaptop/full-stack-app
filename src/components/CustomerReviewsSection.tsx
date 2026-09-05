import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle, Quote, ThumbsUp, ShieldCheck, Heart } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  city: string;
  avatarColor: string;
  initials: string;
  rating: number;
  productPurchased: string;
  date: string;
  review: string;
  verified: boolean;
}

const rowOneReviews: Review[] = [
  {
    id: 'r1',
    name: 'Rahul Sharma',
    role: 'Senior Full Stack Developer',
    city: 'Hyderabad',
    avatarColor: 'bg-blue-600',
    initials: 'RS',
    rating: 5,
    productPurchased: 'Dell Latitude 5420 i7 11th Gen',
    date: '2 days ago',
    review: 'Ordered the Dell Latitude 5420 for my remote dev setup. The laptop arrived in flawless scratch-less condition with 94% battery health! Compiles heavy Docker containers and React projects like a breeze. Truly saved over 60,000 INR compared to new retail.',
    verified: true,
  },
  {
    id: 'r2',
    name: 'Priya Nair',
    role: 'UI/UX Product Designer',
    city: 'Bengaluru',
    avatarColor: 'bg-emerald-600',
    initials: 'PN',
    rating: 5,
    productPurchased: 'HP EliteBook 840 G5 16GB RAM',
    date: '4 days ago',
    review: 'The Bang & Olufsen audio and full HD matte display are crystal clear. It literally looks brand new straight out of the packaging. Universal Computers customer support helped me choose the best model on WhatsApp within 5 minutes. Super impressed!',
    verified: true,
  },
  {
    id: 'r3',
    name: 'Vikram Reddy',
    role: 'IT Director @ CloudScale Systems',
    city: 'Visakhapatnam',
    avatarColor: 'bg-indigo-600',
    initials: 'VR',
    rating: 5,
    productPurchased: 'Lenovo ThinkPad T490 (Batch of 5)',
    date: '1 week ago',
    review: 'We procured 5 ThinkPads for our offshore engineering team. Every single machine came with original chargers, verified 40-point QC test certificates, and lightning-fast NVMe SSDs. Best enterprise refurbished hardware supplier in South India.',
    verified: true,
  },
  {
    id: 'r4',
    name: 'Ananya Deshmukh',
    role: 'Architecture & 3D Modeling Student',
    city: 'Chennai',
    avatarColor: 'bg-purple-600',
    initials: 'AD',
    rating: 5,
    productPurchased: 'Dell Precision 5530 4GB Nvidia GPU',
    date: '1 week ago',
    review: 'Needed a workstation with a dedicated GPU for AutoCAD and Revit on a student budget. The Dell Precision is an absolute beast! Render times are phenomenal and thermal performance is rock solid. Delivered to Chennai in just 2 days.',
    verified: true,
  },
  {
    id: 'r5',
    name: 'Karthik Varma',
    role: 'Data Analyst & Python Developer',
    city: 'Pune',
    avatarColor: 'bg-amber-600',
    initials: 'KV',
    rating: 5,
    productPurchased: 'Dell Latitude 5580 i7 Full HD',
    date: '2 weeks ago',
    review: 'Exceptional build quality. The keyboard tactile feedback is top notch and the battery easily lasts 5 to 6 hours on heavy Pandas/Jupyter notebook workflows. Highly recommend Universal Computers to anyone looking for certified quality.',
    verified: true,
  }
];

const rowTwoReviews: Review[] = [
  {
    id: 'r6',
    name: 'Sanjay Patel',
    role: 'Founder @ FinTech Pulse',
    city: 'Bengaluru',
    avatarColor: 'bg-cyan-600',
    initials: 'SP',
    rating: 5,
    productPurchased: 'Apple Mac Mini M2 Desktop',
    date: '3 days ago',
    review: 'Purchased the Mac mini desktop for our office trading desk. Flawless condition, original Apple packaging accessories, and zero lag. The price was unmatched across Amazon and offline stores. Will definitely order our next batch here.',
    verified: true,
  },
  {
    id: 'r7',
    name: 'Deepak Chowdary',
    role: 'Chartered Accountant',
    city: 'Vijayawada',
    avatarColor: 'bg-rose-600',
    initials: 'DC',
    rating: 5,
    productPurchased: 'HP ProBook 650 G5 15.6" FHD',
    date: '5 days ago',
    review: 'The numeric keypad on the 15.6-inch HP ProBook is fantastic for audit and spreadsheet work. Very clean machine with no dents or scratches. The 1-year warranty gives 100% peace of mind. Excellent packaging and prompt delivery.',
    verified: true,
  },
  {
    id: 'r8',
    name: 'Meera Iyer',
    role: 'Video Editor & Digital Creator',
    city: 'Mumbai',
    avatarColor: 'bg-orange-600',
    initials: 'MI',
    rating: 5,
    productPurchased: 'Dell Latitude 7420 Carbon Fiber',
    date: '1 week ago',
    review: 'Super lightweight carbon fiber chassis! Handles Premiere Pro 1080p and 4K proxy timelines without dropping frames. WhatsApp support sent live device photos before dispatching. Transparent, honest, and high quality service.',
    verified: true,
  },
  {
    id: 'r9',
    name: 'Dr. Suresh Kumar',
    role: 'Professor & Researcher',
    city: 'Kochi',
    avatarColor: 'bg-teal-600',
    initials: 'SK',
    rating: 5,
    productPurchased: 'HP EliteBook 745 G6 Ryzen 5 Pro',
    date: '2 weeks ago',
    review: 'Very quiet fan curve, premium metal aluminum finish, and snappy multitasking with the Ryzen processor. Universal Computers is setting a new standard for certified refurbished electronics in India. Keep up the great work!',
    verified: true,
  },
  {
    id: 'r10',
    name: 'Amitabh Sen',
    role: 'Cybersecurity Consultant',
    city: 'Kolkata',
    avatarColor: 'bg-slate-700',
    initials: 'AS',
    rating: 5,
    productPurchased: 'Lenovo ThinkPad T490 Backlit KB',
    date: '2 weeks ago',
    review: 'Legendary ThinkPad keyboard and robust spill-resistant chassis. Ran hardware diagnostics for memory, SSD health, and CPU stress tests—passed 100% with flying colors. A genuine 10/10 purchase experience.',
    verified: true,
  }
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="w-full bg-[#f9fafb] py-20 overflow-hidden border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Trust Rating Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full mb-4 shadow-2xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-extrabold text-emerald-900 tracking-normal">
              4.9 / 5.0 Star Rated (2,400+ Verified Reviews)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 font-['Inter',sans-serif]">
            Loved By 10,000+ Happy Customers
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Real experiences from software engineers, creative studios, IT managers, and students who trust Universal Computers for certified Grade A+++ refurbished hardware.
          </p>
        </div>

      </div>

      {/* ── CONTINUOUS AUTO-SCROLLING MARQUEE (ROW 1 - SCROLLS LEFT) ── */}
      <div className="relative w-full overflow-hidden mb-6">
        
        {/* Subtle Gradient Edge Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-5">
          {[...rowOneReviews, ...rowOneReviews].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between group font-['Inter',sans-serif]"
            >
              <div>
                {/* Header: Avatar, Name, Location & Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${item.avatarColor} text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <span className="inline-flex items-center text-emerald-600" title="Verified Customer">
                          <CheckCircle className="w-3.5 h-3.5 fill-emerald-100" />
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.role} • <span className="font-semibold text-slate-700">{item.city}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Rating Stars & Purchased Tag */}
                <div className="flex items-center justify-between gap-2 mb-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 truncate max-w-[170px]">
                    {item.productPurchased}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.review}"
                </p>
              </div>

              {/* Bottom Footer Trust Note */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Verified Purchase
                </span>
                <span className="font-medium text-slate-400">Universal Computers Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTINUOUS AUTO-SCROLLING MARQUEE (ROW 2 - SCROLLS RIGHT) ── */}
      <div className="relative w-full overflow-hidden">
        
        {/* Subtle Gradient Edge Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse flex gap-5">
          {[...rowTwoReviews, ...rowTwoReviews].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between group font-['Inter',sans-serif]"
            >
              <div>
                {/* Header: Avatar, Name, Location & Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${item.avatarColor} text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <span className="inline-flex items-center text-emerald-600" title="Verified Customer">
                          <CheckCircle className="w-3.5 h-3.5 fill-emerald-100" />
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.role} • <span className="font-semibold text-slate-700">{item.city}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Rating Stars & Purchased Tag */}
                <div className="flex items-center justify-between gap-2 mb-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 truncate max-w-[170px]">
                    {item.productPurchased}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.review}"
                </p>
              </div>

              {/* Bottom Footer Trust Note */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Verified Purchase
                </span>
                <span className="font-medium text-slate-400">Universal Computers Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default CustomerReviewsSection;
