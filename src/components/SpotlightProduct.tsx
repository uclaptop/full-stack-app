import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, ShoppingBag, MessageSquare, 
  Truck, RefreshCw, PackageCheck, ArrowRight 
} from 'lucide-react';
import { products as staticProducts } from '../data/products';
import { useApp } from '../context/AppContext';
import { resolveProductImage, resolveProductPrice, resolveProductMrp } from '../utils/productUtils';

export const SpotlightProduct: React.FC = () => {
  const { products: dbProducts, addToCart } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Find either marked trending product OR highest discount product
  const featuredProduct = useMemo(() => {
    const list = dbProducts && dbProducts.length > 0 ? dbProducts : staticProducts;

    // 1. Try to find product explicitly marked as trending
    const trending = list.find((p: any) => p.is_trending);
    if (trending) return trending;

    // 2. Otherwise find the product with the highest savings margin (MRP - Price)
    const sorted = [...list].sort((a: any, b: any) => {
      const priceA = resolveProductPrice(a.price, a.name);
      const mrpA = resolveProductMrp(a.mrp, priceA, a.name);
      const priceB = resolveProductPrice(b.price, b.name);
      const mrpB = resolveProductMrp(b.mrp, priceB, b.name);
      return (mrpB - priceB) - (mrpA - priceA);
    });

    return sorted[0] || list[0];
  }, [dbProducts]);

  // Build the array of multiple gallery images for this featured product (ONLY authentic DB images)
  const galleryImages = useMemo(() => {
    if (!featuredProduct) return ['/dell-latitude-5420.png'];

    const primary = resolveProductImage((featuredProduct as any).image_url || (featuredProduct as any).image, featuredProduct.name);
    const secondary = (featuredProduct as any).secondary_image_url || (featuredProduct as any).secondary_image;
    const resolvedSecondary = secondary ? resolveProductImage(secondary, featuredProduct.name) : '';
    const extra = (featuredProduct as any).gallery_images 
      ? (featuredProduct as any).gallery_images.split(',').map((s: string) => resolveProductImage(s.trim(), featuredProduct.name)).filter(Boolean)
      : [];

    const list = [primary, resolvedSecondary, ...extra].filter(Boolean);
    return list.length > 0 ? list : [primary || '/dell-latitude-5420.png'];
  }, [featuredProduct]);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [featuredProduct]);

  if (!featuredProduct) return null;

  const price = resolveProductPrice((featuredProduct as any).price, featuredProduct.name);
  const mrp = resolveProductMrp((featuredProduct as any).mrp, price, featuredProduct.name);
  const savings = Math.max(0, mrp - price);
  const sku = (featuredProduct as any).sku || `EPW-DL5410-I7-10TH`;
  const description = (featuredProduct as any).description || 
    `${featuredProduct.name} refurbished laptop, powerful and reliable, ideal for professionals & students, with 1-year warranty.`;

  const formatPrice = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section className="w-full bg-[#f9fafb] py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── MAIN PRODUCT SHOWCASE CONTAINER ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── LEFT COLUMN (Large Image Preview + Thumbnail Gallery Strip) ── */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Large Main Product Photo Stage */}
            <div className="relative w-full h-[340px] sm:h-[400px] md:h-[440px] rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex items-center justify-center overflow-hidden group">
              {savings > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#85221b] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm font-['Inter',sans-serif]">
                    Save {formatPrice(savings)}
                  </span>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  src={galleryImages[activeImageIndex]}
                  alt={featuredProduct.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Strip with Navigation Arrows */}
            {galleryImages.length > 1 && (
              <div className="flex items-center justify-between gap-2 pt-1 px-2">
                <button
                  onClick={prevImage}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shrink-0"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none justify-center flex-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 sm:w-20 h-16 sm:h-20 rounded-2xl p-1.5 bg-white transition-all cursor-pointer shrink-0 border ${
                        idx === activeImageIndex
                          ? 'border-[#0B1E3D] shadow-md scale-105 ring-2 ring-[#0B1E3D]/20'
                          : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain rounded-xl"
                        onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextImage}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shrink-0"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN (Product Title, Pricing & Value Benefit Icons) ── */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 font-['Inter',sans-serif]">
            
            <div>
              {/* SKU / Model Code */}
              <span className="text-xs font-['Inter',sans-serif] tracking-normal text-slate-400 uppercase block mb-1.5 font-medium">
                {sku}
              </span>

              {/* Product Title (Exact Match to Reference Type) */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-normal mb-3 font-['Inter',sans-serif]">
                {featuredProduct.name}
              </h2>

              {/* Price Row: Selling Price + Struck Showroom MRP */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-slate-950 font-['Inter',sans-serif]">
                  {formatPrice(price)}
                </span>
                {mrp > price && (
                  <span className="text-base sm:text-lg text-red-600 line-through font-normal font-['Inter',sans-serif]">
                    {formatPrice(mrp)}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-slate-200" />

            {/* Description / Summary */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed font-['Inter',sans-serif]">
              {description}
            </p>

            {/* 3 Value Benefit Badges (Matching Reference Screenshot) */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              
              {/* Benefit 1: Fast. Reliable. Trackable. */}
              <div className="flex flex-col items-center space-y-2 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <div className="w-11 h-11 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-tight font-['Inter',sans-serif]">
                  Fast. Reliable.<br />Trackable.
                </span>
              </div>

              {/* Benefit 2: No Hassle Replacements. */}
              <div className="flex flex-col items-center space-y-2 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <div className="w-11 h-11 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-tight font-['Inter',sans-serif]">
                  No Hassle<br />Replacements.
                </span>
              </div>

              {/* Benefit 3: Green Safe Packaging. */}
              <div className="flex flex-col items-center space-y-2 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <div className="w-11 h-11 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-tight font-['Inter',sans-serif]">
                  Green Safe<br />Packaging.
                </span>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 font-['Inter',sans-serif]">
              <button
                onClick={() => addToCart(featuredProduct)}
                className="px-8 py-3.5 bg-[#0B1E3D] hover:bg-[#133da6] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#0B1E3D]/20 flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <a
                href={`https://wa.me/918712173339?text=Hi Universal Computers, I want to order the Spotlight Deal: ${encodeURIComponent(featuredProduct.name)} (Price: ${formatPrice(price)})`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" /> Instant WhatsApp
              </a>
            </div>

            <div>
              <a
                href="#products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-brand-blue transition-colors pt-2 font-['Inter',sans-serif]"
              >
                View Product Details <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SpotlightProduct;
