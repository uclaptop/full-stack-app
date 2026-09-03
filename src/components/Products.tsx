import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, ShoppingBag, MessageSquare, 
  X, Check, ShieldCheck, Zap
} from 'lucide-react';
import { products as staticProducts } from '../data/products';
import { useApp } from '../context/AppContext';
import { resolveProductImage, resolveProductPrice, resolveProductMrp } from '../utils/productUtils';

// ── Auto-Scrolling Image Stage Component for Quick Look ──
const QuickLookCarousel = ({ product, formatPrice }: { product: any, formatPrice: (n: number) => string }) => {
  const images = useMemo(() => {
    const primary = resolveProductImage(product.image, product.name);
    const secondary = product.secondaryImage ? resolveProductImage(product.secondaryImage, product.name) : '';
    const gallery = product.galleryImages 
      ? product.galleryImages.split(',').map((s: string) => resolveProductImage(s.trim(), product.name)).filter(Boolean) 
      : [];
    return [primary, secondary, ...gallery].filter(Boolean);
  }, [product]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll images slowly every 2.8 seconds
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  const nextImg = () => {
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = () => {
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="bg-white h-72 sm:h-80 flex items-center justify-center p-6 relative overflow-hidden group select-none border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Left Maroon Savings Badge */}
      {product.savings > 0 && (
        <span className="absolute top-4 left-4 z-10 bg-[#85221b] text-white text-xs font-bold px-3 py-1 rounded shadow-sm font-['Inter',sans-serif]">
          Save {formatPrice(product.savings)}
        </span>
      )}

      {/* Auto-Rotating Image with Smooth Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIdx}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35 }}
          src={images[currentIdx]}
          alt={`${product.name} - View ${currentIdx + 1}`}
          className="w-full h-full object-contain"
          onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
        />
      </AnimatePresence>

      {/* Navigation Controls (If multiple images exist) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImg}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
            title="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextImg}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
            title="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Bottom Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIdx ? 'w-5 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                title={`Angle ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const ProductsSection = () => {
  const { products: dbProducts, addToCart } = useApp();
  const [quickLookProduct, setQuickLookProduct] = useState<any | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Combine DB products with static fallback, respecting is_trending filter
  const displayProducts = useMemo(() => {
    let list: any[] = [];
    if (dbProducts && dbProducts.length > 0) {
      list = dbProducts.map((p) => {
        const price = resolveProductPrice(p.price, p.name);
        const mrp = resolveProductMrp(p.mrp, price, p.name);
        return {
          id: String(p.id),
          name: p.name,
          brand: p.brand || 'Universal Computers',
          specs: p.specs || '',
          category: p.category || 'Business',
          tag: p.tag || '',
          isTrending: Boolean(p.is_trending) || p.tag === 'Trending Deal',
          price,
          mrp,
          savings: Math.max(0, mrp - price),
          discountPercent: mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0,
          image: resolveProductImage(p.image_url, p.name),
          secondaryImage: p.secondary_image_url ? resolveProductImage(p.secondary_image_url, p.name) : '',
          galleryImages: p.gallery_images || '',
        };
      });
    } else {
      list = staticProducts.map((p) => {
        const price = resolveProductPrice(p.price, p.name);
        const mrp = resolveProductMrp(p.mrp, price, p.name);
        return {
          ...p,
          price,
          mrp,
          isTrending: true,
          savings: Math.max(0, mrp - price),
          discountPercent: mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0,
          image: resolveProductImage(p.image, p.name),
          secondaryImage: p.secondary_image ? resolveProductImage(p.secondary_image, p.name) : '',
          galleryImages: '',
        };
      });
    }

    // When the admin enables trending toggle on products, display ONLY those products!
    const trendingOnly = list.filter((p) => p.isTrending);
    if (trendingOnly.length > 0) {
      return trendingOnly;
    }
    return list;
  }, [dbProducts]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const formatPrice = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <section id="products" className="w-full bg-[#f9fafb] py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── SECTION HEADER (Exact Match to Reference Screenshot) ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-normal mb-1 font-['Inter',sans-serif]">
              Trending Tech Deals Of The Week
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5563] italic font-normal font-['Inter',sans-serif]">
              Handpicked Bestsellers With Lightning-Fast Delivery.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 self-end sm:self-auto font-['Inter',sans-serif]">
            <a 
              href="/products"
              className="text-xs sm:text-sm font-bold text-[#111827] hover:text-[#133da6] underline transition-colors cursor-pointer"
            >
              View All Pieces
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-8 h-8 rounded-lg bg-[#274887]/20 hover:bg-[#133da6] text-[#133da6] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="Previous deals"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="w-8 h-8 rounded-lg bg-[#133da6] hover:bg-[#0c266a] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="Next deals"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── PRODUCT CAROUSEL / ROW (Exact Match to Reference Screenshot) ─── */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {displayProducts.map((product) => {
            const hasSecondary = Boolean(product.secondaryImage);
            const isHovered = hoveredId === product.id;
            const currentImg = (isHovered && hasSecondary) ? product.secondaryImage : product.image;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-[270px] sm:w-[285px] md:w-[295px] shrink-0 snap-start flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group font-['Inter',sans-serif]"
              >
                {/* ── SEAMLESS PURE WHITE IMAGE STAGE (AMAZON STYLE) ── */}
                <div className="relative bg-white h-60 flex items-center justify-center p-4 overflow-hidden">
                  
                  {/* Top-Left Maroon Savings Pill Badge */}
                  {product.savings > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#85221b] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-xs tracking-normal font-['Inter',sans-serif]">
                        Save {formatPrice(product.savings)}
                      </span>
                    </div>
                  )}

                  {/* Top-Right Quick Look Action */}
                  <button
                    onClick={() => setQuickLookProduct(product)}
                    className="absolute top-3 right-3 z-10 text-xs font-semibold text-slate-700 hover:text-brand-blue underline cursor-pointer bg-white/80 hover:bg-white backdrop-blur-xs px-2.5 py-0.5 rounded-md shadow-2xs transition-colors font-['Inter',sans-serif]"
                  >
                    Quick Look
                  </button>

                  {/* Product Photo */}
                  <img
                    src={currentImg}
                    alt={product.name}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 relative z-0"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                  />
                </div>

                {/* ── BOTTOM METADATA & PRICING CONTAINER ── */}
                <div className="p-5 flex flex-col flex-1 justify-between bg-white text-center border-t border-slate-100 font-['Inter',sans-serif]">
                  <div>
                    {/* Brand / Vendor Label */}
                    <span className="text-xs text-[#6b7280] font-normal tracking-normal mb-1 block">
                      Universal Computers
                    </span>

                    {/* Product Name */}
                    <h3 className="text-sm font-semibold text-[#111827] line-clamp-2 leading-snug mb-2 min-h-[38px] group-hover:text-brand-blue transition-colors font-['Inter',sans-serif]">
                      {product.name}
                    </h3>

                    {/* Price Row: Selling Price + Struck Red MRP */}
                    <div className="flex items-center justify-center gap-2 flex-wrap mb-4 font-['Inter',sans-serif]">
                      <span className="text-sm sm:text-base font-bold text-[#111827]">
                        {formatPrice(product.price)}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-xs sm:text-sm text-red-600 line-through font-normal">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1 font-['Inter',sans-serif]">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 py-2.5 bg-[#0B1E3D] hover:bg-[#133da6] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>

                    <a
                      href={`https://wa.me/918712173339?text=Hi Universal Computers, I am interested in ${encodeURIComponent(product.name)} (Price: ${formatPrice(product.price)})`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-xl transition-all flex items-center justify-center cursor-pointer active:scale-95"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ─── QUICK LOOK MODAL (WITH SLOW AUTO-SCROLLING MULTI-IMAGE CAROUSEL) ─── */}
      <AnimatePresence>
        {quickLookProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-['Inter',sans-serif]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative font-['Inter',sans-serif]"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickLookProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-700 shadow-md transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* ── AUTO-SCROLLING PRODUCT IMAGE STAGE ── */}
              <QuickLookCarousel 
                product={quickLookProduct} 
                formatPrice={formatPrice} 
              />

              {/* Details & Specs */}
              <div className="p-6 font-['Inter',sans-serif]">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-1">
                  {quickLookProduct.brand} • {quickLookProduct.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 font-['Inter',sans-serif]">
                  {quickLookProduct.name}
                </h3>

                {/* Specs Box */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Technical Specifications
                  </span>
                  <p className="text-xs text-slate-700 font-normal leading-relaxed font-['Inter',sans-serif]">
                    {quickLookProduct.specs || 'Tested A+++ Refurbished Condition with Original Charger'}
                  </p>
                </div>

                {/* Pricing Box */}
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-slate-100 font-['Inter',sans-serif]">
                  <div>
                    <span className="text-xs text-slate-500 block">Offer Selling Price</span>
                    <span className="text-2xl font-bold text-[#0B1E3D]">
                      {formatPrice(quickLookProduct.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Showroom MRP</span>
                    <span className="text-sm text-red-600 line-through font-normal">
                      {formatPrice(quickLookProduct.mrp)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 font-['Inter',sans-serif]">
                  <button
                    onClick={() => {
                      addToCart(quickLookProduct);
                      setQuickLookProduct(null);
                    }}
                    className="flex-1 py-3.5 bg-[#0B1E3D] hover:bg-[#133da6] text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#0B1E3D]/20 cursor-pointer active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  <a
                    href={`https://wa.me/918712173339?text=Hi Universal Computers, I want to purchase ${encodeURIComponent(quickLookProduct.name)} (Price: ${formatPrice(quickLookProduct.price)})`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductsSection;
