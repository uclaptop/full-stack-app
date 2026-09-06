import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, CheckCircle, Quote, ThumbsUp, ShieldCheck, 
  Heart, MessageCircle, ExternalLink, Award, MapPin 
} from 'lucide-react';

interface GoogleReview {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  isLocalGuide?: boolean;
  meta: string;
  timeAgo: string;
  rating: number;
  category: 'all' | 'refurbished laptops' | 'genuine products' | 'laptop shop' | 'second hand';
  badge: string;
  review: string;
  ownerReply?: string;
  likes?: number;
  cityTag?: string;
}

const allReviews: GoogleReview[] = [
  // ── ROW 1 REVIEWS ──
  {
    id: 'gr1',
    name: 'Neelima Avula',
    initials: 'NA',
    avatarColor: 'bg-emerald-600',
    meta: '3 reviews • 2 photos',
    timeAgo: '6 months ago',
    rating: 5,
    category: 'refurbished laptops',
    badge: 'Refurbished Laptops',
    cityTag: 'Proddatur',
    review: 'We have purchased two refurbished laptops from universal computers, highly satisfied by the products and the service they have provided. Also packaging and the mode of delivery is very good. Price offered is also budget price. Laptop speed and other related technical stuff is also satisfactory.',
    ownerReply: 'Thank you very much for your review Neelima Garu. We are happy to see customers satisfied with our products.',
    likes: 1,
  },
  {
    id: 'gr2',
    name: 'Dheeraj Mouly.s',
    initials: 'DM',
    avatarColor: 'bg-amber-600',
    isLocalGuide: true,
    meta: 'Local Guide • 46 reviews • 22 photos',
    timeAgo: '3 years ago',
    rating: 5,
    category: 'laptop shop',
    badge: 'Laptop Shop',
    cityTag: 'Gooty / PDTR',
    review: 'I had a fantastic experience at this laptop shop! They were knowledgeable and helpful, guiding me to find the perfect laptop that suited my needs. The range of laptops they offer is impressive, with options for every budget. Not only did they provide expert advice, but they also offered competitive prices. Highly recommended 💯',
    ownerReply: 'Thank you for your feedback and buying the laptop from Gooty.',
    likes: 3,
  },
  {
    id: 'gr3',
    name: 'Tanveer Ahammed',
    initials: 'TA',
    avatarColor: 'bg-blue-600',
    meta: '5 reviews • 7 photos',
    timeAgo: '1 year ago',
    rating: 5,
    category: 'genuine products',
    badge: 'Genuine Products',
    cityTag: 'Proddatur',
    review: 'If you r looking for good laptop with excellent condition and affordable prices then go and buy in universal computer’s shop. They r providing genuine products and services. Bought three laptops two months ago, had a fantastic experience with their services.',
    ownerReply: 'Thank you for your valuable feedback. Glad you loved our products!',
    likes: 3,
  },
  {
    id: 'gr4',
    name: 'JOEL SHAROFF',
    initials: 'JS',
    avatarColor: 'bg-indigo-600',
    meta: '326 reviews • 825 photos',
    timeAgo: '2 years ago',
    rating: 5,
    category: 'refurbished laptops',
    badge: 'Refurbished Laptops',
    cityTag: 'Proddatur',
    review: 'Wonderful services by Universal Computers. Mr. Haneef is giving good services to the customers. Selling Laptops, desktops and other peripherals at very reasonable prices. I had purchased 3 laptops and 1 desktop.',
    ownerReply: 'Universal computers: Thank you. We are glad that you like the laptop. Hope you refer your friends.',
    likes: 2,
  },
  {
    id: 'gr5',
    name: 'Jaswanth Kandukuru',
    initials: 'JK',
    avatarColor: 'bg-purple-600',
    meta: '6 reviews',
    timeAgo: '3 years ago',
    rating: 5,
    category: 'refurbished laptops',
    badge: 'Refurbished Laptops',
    cityTag: 'Tirupati Delivery',
    review: 'I am satisfied with their service and products. They are providing the service at affordable prices. I bought a refurbished laptop 3 years ago, and it is still in working condition. I highly recommend this store.',
    ownerReply: 'Thanks for ordering from Tirupati. Thank you for your review!',
    likes: 5,
  },
  {
    id: 'gr6',
    name: 'Raghavendra R (Raghav)',
    initials: 'RR',
    avatarColor: 'bg-teal-600',
    isLocalGuide: true,
    meta: 'Local Guide • 33 reviews • 20 photos',
    timeAgo: '3 years ago',
    rating: 5,
    category: 'genuine products',
    badge: 'Genuine Products',
    cityTag: 'Bangalore Delivery',
    review: 'If you want genuine products in competitive price, this is the best place. I have taken multiple laptops to my frnds and family. No issues faced. Good service.',
    ownerReply: 'Thank you for your valuable feedback. We are glad that you are happy with the laptops and delivery to Bangalore.',
    likes: 3,
  },
  {
    id: 'gr7',
    name: 'YALLANURU BASHA',
    initials: 'YB',
    avatarColor: 'bg-cyan-600',
    meta: '3 reviews',
    timeAgo: '2 months ago',
    rating: 5,
    category: 'refurbished laptops',
    badge: 'Dell Latitude 5420',
    cityTag: 'Proddatur',
    review: 'Iam Dell latitude 5420 purchased but laptop working good 💯',
    ownerReply: 'Thank you for your feedback and 5 stars rating.',
    likes: 1,
  },
  {
    id: 'gr8',
    name: 'Suman Chinnu',
    initials: 'SC',
    avatarColor: 'bg-orange-600',
    isLocalGuide: true,
    meta: 'Local Guide • 22 reviews • 12 photos',
    timeAgo: '3 years ago',
    rating: 5,
    category: 'laptop shop',
    badge: 'Laptop Shop',
    cityTag: 'Proddatur',
    review: 'I have bought a laptop here and Haneef Bro gives me Bag, Mouse and a cleankit for the complimentary. Best place for Laptops to buy in Proddatur...',
    ownerReply: 'Thank you very much for your feedback. We are happy to see you satisfied with the laptop.',
    likes: 3,
  },

  // ── ROW 2 REVIEWS ──
  {
    id: 'gr9',
    name: 'Makula Narasimha Rao',
    initials: 'MN',
    avatarColor: 'bg-slate-700',
    isLocalGuide: true,
    meta: 'Local Guide • 457 reviews • 1,284 photos',
    timeAgo: '7 months ago',
    rating: 5,
    category: 'second hand',
    badge: 'Second Hand Laptops',
    cityTag: 'Proddatur',
    review: 'Good. Sales and service available. Second hand laptops are available in clean scratchless condition and affordable price.',
    ownerReply: 'Thank you for your time and we are glad for your review on our service. Thanks again for spreading positivity.',
    likes: 1,
  },
  {
    id: 'gr10',
    name: 'M A Parveez Khan',
    initials: 'PK',
    avatarColor: 'bg-rose-600',
    meta: '3 reviews',
    timeAgo: '3 years ago',
    rating: 5,
    category: 'refurbished laptops',
    badge: 'Courier to Bangalore',
    cityTag: 'Bangalore Delivery',
    review: 'I purchased 2 laptops in a week\'s time. They were delivered from Proddatur by courier to Bangalore, the best laptops with the most affordable price.',
    ownerReply: 'Thank you for your valuable words Sir. We are very happy that you are satisfied with the laptop and courier delivery.',
    likes: 3,
  },
  {
    id: 'gr11',
    name: 'Rãm creations',
    initials: 'RC',
    avatarColor: 'bg-emerald-700',
    isLocalGuide: true,
    meta: 'Local Guide • 3 reviews • 6 photos',
    timeAgo: '8 months ago',
    rating: 5,
    category: 'refurbished laptops',
    badge: 'Refurbished Laptops',
    cityTag: 'Proddatur',
    review: 'Refurbished laptop here. Prices are very reasonable, staff communicates clearly, and the warranty gives peace of mind. Highly recommended!',
    ownerReply: 'Thank you for your wonderful words and recommendation.',
    likes: 2,
  },
  {
    id: 'gr12',
    name: 'Dheerajbasha T',
    initials: 'DT',
    avatarColor: 'bg-blue-700',
    meta: '1 review',
    timeAgo: '11 months ago',
    rating: 5,
    category: 'genuine products',
    badge: 'Corporate Laptops',
    cityTag: 'Enterprise Client',
    review: 'If you’re looking for business or corporate laptops, this is the place. No personal laptops, just solid, high-quality machines. Staff explained everything well.',
    ownerReply: 'Thank you…!! Glad you appreciate our corporate hardware lineup.',
    likes: 2,
  },
  {
    id: 'gr13',
    name: 'Manikandan D',
    initials: 'MD',
    avatarColor: 'bg-indigo-700',
    meta: '4 reviews',
    timeAgo: '3 years ago',
    rating: 5,
    category: 'laptop shop',
    badge: 'Laptop Shop',
    cityTag: 'Mysore & Bangalore',
    review: 'I bought 2 laptops from this shop in last 4 years. Both are working fine till now. Even my friends took many laptops from this shop as I suggested and all of them were satisfied.',
    ownerReply: 'Thank you for ordering the laptops from Mysore and Bangalore. We are happy that you and your friends are satisfied.',
    likes: 3,
  },
  {
    id: 'gr14',
    name: 'Mohammad Rahil Syed',
    initials: 'MR',
    avatarColor: 'bg-teal-700',
    isLocalGuide: true,
    meta: 'Local Guide • 5 reviews',
    timeAgo: '2 years ago',
    rating: 5,
    category: 'genuine products',
    badge: 'Genuine Products',
    cityTag: 'Proddatur',
    review: 'The service provided by them is outstanding, the coordination offered by Mr.Haneef and Mr.Arif is appreciable and the prices too are quite affordable.',
    ownerReply: 'Thank you for buying the laptop with universal computers.',
    likes: 2,
  },
  {
    id: 'gr15',
    name: 'Gowtham',
    initials: 'G',
    avatarColor: 'bg-amber-700',
    meta: '1 review',
    timeAgo: '11 months ago',
    rating: 5,
    category: 'refurbished laptops',
    badge: 'Refurbished Laptops',
    cityTag: 'Proddatur',
    review: 'Excellent service and very helpful staff. Got a laptop in perfect condition at a fair price. Warranty was included, which is a big plus.',
    ownerReply: 'Thank you for your 5 star review and trust in Universal Computers.',
    likes: 1,
  },
  {
    id: 'gr16',
    name: 'Mudnila surendra',
    initials: 'MS',
    avatarColor: 'bg-cyan-700',
    meta: '6 reviews • 1 photo',
    timeAgo: '2 years ago',
    rating: 5,
    category: 'laptop shop',
    badge: 'Laptop Shop',
    cityTag: 'Proddatur',
    review: 'Overall good service, The way they treat customers so nice. Especially founder of universal computers he\'s cool guy n he will give proper suggestions which laptop we need.',
    ownerReply: 'Thank you for the review. We are happy that you like the laptop.',
    likes: 3,
  },
];

const filterCategories = [
  { id: 'all', label: 'All Reviews', count: 233 },
  { id: 'refurbished laptops', label: 'Refurbished Laptops', count: 24 },
  { id: 'genuine products', label: 'Genuine Products', count: 5 },
  { id: 'laptop shop', label: 'Laptop Shop', count: 4 },
  { id: 'second hand', label: 'Second Hand', count: 3 },
];

export const CustomerReviewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredReviews = selectedCategory === 'all'
    ? allReviews
    : allReviews.filter((r) => r.category === selectedCategory);

  const rowOne = filteredReviews.slice(0, Math.ceil(filteredReviews.length / 2));
  const rowTwo = filteredReviews.slice(Math.ceil(filteredReviews.length / 2));

  // If filtered list is small, replicate so marquee loops seamlessly
  const displayRowOne = rowOne.length < 4 ? [...rowOne, ...rowOne, ...rowOne] : rowOne;
  const displayRowTwo = rowTwo.length < 4 ? [...rowTwo, ...rowTwo, ...rowTwo] : rowTwo;

  return (
    <section id="reviews" className="w-full bg-[#f8fafc] py-20 overflow-hidden border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Google Verified Review Pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full mb-4 shadow-xs">
            {/* Google Colorful G Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <div className="flex items-center text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">
              4.8 ★ Rated (233 Verified Google Reviews)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3 uppercase">
            TRUSTED BY <span className="text-brand-blue">1,000+ HAPPY CUSTOMERS</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
            Real customer feedback from clients in Proddatur, Tirupati, Bangalore, Mysore, and across South India who purchased certified Grade A+++ refurbished laptops with 1-year warranty.
          </p>

          {/* ── STATS SUMMARY BAR ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-6 pt-6 border-t border-slate-200/80">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-[#0B1E3D] block">4.8 / 5.0</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Google Star Rating</span>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-[#E8A93B] block">233</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Original Reviews</span>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-brand-blue block">1,000+</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Happy Customers</span>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 block">100%</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Quality Verified</span>
            </div>
          </div>

          {/* ── GOOGLE SEARCH FILTER PILLS (All, Refurbished Laptops, Genuine Products, etc.) ── */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {filterCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                    isActive
                      ? 'bg-[#0B1E3D] text-white shadow-xs scale-105 ring-2 ring-[#0B1E3D]/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* ── CONTINUOUS AUTO-SCROLLING MARQUEE (ROW 1 - SCROLLS LEFT) ── */}
      <div className="relative w-full overflow-hidden mb-6">
        
        {/* Subtle Gradient Edge Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-5">
          {[...displayRowOne, ...displayRowOne].map((item, index) => (
            <div
              key={`row1-${item.id}-${index}`}
              className="w-[320px] sm:w-[390px] shrink-0 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between group font-['Inter',sans-serif]"
            >
              <div>
                {/* Header: Google Icon, Avatar, Name & Local Guide Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${item.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.name}
                        </h4>
                        {item.isLocalGuide && (
                          <span className="inline-flex items-center px-1.5 py-0.2 bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-extrabold rounded-md uppercase" title="Google Local Guide">
                            Guide
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.meta}
                      </p>
                    </div>
                  </div>

                  {/* Google G Logo Badge */}
                  <div className="flex items-center gap-1 shrink-0 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.timeAgo}</span>
                  </div>
                </div>

                {/* Rating Stars & Keyword Badge */}
                <div className="flex items-center justify-between gap-2 mb-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                    {item.badge}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.review}"
                </p>

                {/* Owner Reply Quote if present */}
                {item.ownerReply && (
                  <div className="mt-3 bg-blue-50/60 border border-blue-100 rounded-xl p-2.5 text-[11px] text-slate-600 space-y-0.5">
                    <span className="font-bold text-[#0B1E3D] block text-[10px] uppercase tracking-wider">
                      Universal Computers (Owner)
                    </span>
                    <p className="italic text-slate-600 font-normal">
                      "{item.ownerReply}"
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Footer Trust Note */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Google Review
                </span>
                {item.cityTag && (
                  <span className="font-medium text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {item.cityTag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTINUOUS AUTO-SCROLLING MARQUEE (ROW 2 - SCROLLS RIGHT) ── */}
      <div className="relative w-full overflow-hidden">
        
        {/* Subtle Gradient Edge Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse flex gap-5">
          {[...displayRowTwo, ...displayRowTwo].map((item, index) => (
            <div
              key={`row2-${item.id}-${index}`}
              className="w-[320px] sm:w-[390px] shrink-0 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between group font-['Inter',sans-serif]"
            >
              <div>
                {/* Header: Google Icon, Avatar, Name & Local Guide Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${item.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.name}
                        </h4>
                        {item.isLocalGuide && (
                          <span className="inline-flex items-center px-1.5 py-0.2 bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-extrabold rounded-md uppercase" title="Google Local Guide">
                            Guide
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.meta}
                      </p>
                    </div>
                  </div>

                  {/* Google G Logo Badge */}
                  <div className="flex items-center gap-1 shrink-0 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.timeAgo}</span>
                  </div>
                </div>

                {/* Rating Stars & Keyword Badge */}
                <div className="flex items-center justify-between gap-2 mb-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                    {item.badge}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.review}"
                </p>

                {/* Owner Reply Quote if present */}
                {item.ownerReply && (
                  <div className="mt-3 bg-blue-50/60 border border-blue-100 rounded-xl p-2.5 text-[11px] text-slate-600 space-y-0.5">
                    <span className="font-bold text-[#0B1E3D] block text-[10px] uppercase tracking-wider">
                      Universal Computers (Owner)
                    </span>
                    <p className="italic text-slate-600 font-normal">
                      "{item.ownerReply}"
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Footer Trust Note */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Google Review
                </span>
                {item.cityTag && (
                  <span className="font-medium text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {item.cityTag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default CustomerReviewsSection;
