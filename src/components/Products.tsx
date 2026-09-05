import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ShoppingBag, MessageSquare, 
  Check, ShieldCheck, Zap
} from 'lucide-react';
import { products as staticProducts } from '../data/products';
import { useApp } from '../context/AppContext';
import { resolveProductImage, resolveProductPrice, resolveProductMrp } from '../utils/productUtils';
import { ProductQuickLookModal } from './ProductQuickLookModal';

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
        
        {/* ─── SECTION HEADER ─── */}
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
            <Link 
              to="/products"
              className="text-xs sm:text-sm font-bold text-[#111827] hover:text-[#133da6] underline transition-colors cursor-pointer"
            >
              View All Pieces
            </Link>

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

        {/* ─── PRODUCT CAROUSEL / ROW ─── */}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickLookProduct(product);
                    }}
                    className="absolute top-3 right-3 z-10 text-xs font-semibold text-slate-700 hover:text-brand-blue underline cursor-pointer bg-white/80 hover:bg-white backdrop-blur-xs px-2.5 py-0.5 rounded-md shadow-2xs transition-colors font-['Inter',sans-serif]"
                  >
                    Quick Look
                  </button>

                  {/* Product Photo - Click navigates to details page */}
                  <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={currentImg}
                      alt={product.name}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 relative z-0"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                    />
                  </Link>
                </div>

                {/* ── BOTTOM METADATA & PRICING CONTAINER ── */}
                <div className="p-5 flex flex-col flex-1 justify-between bg-white text-center border-t border-slate-100 font-['Inter',sans-serif]">
                  <div>
                    {/* Brand / Vendor Label */}
                    <span className="text-xs text-[#6b7280] font-normal tracking-normal mb-1 block">
                      Universal Computers
                    </span>

                    {/* Product Name - Click navigates to details page */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-semibold text-[#111827] line-clamp-2 leading-snug mb-2 min-h-[38px] hover:text-brand-blue transition-colors font-['Inter',sans-serif]">
                        {product.name}
                      </h3>
                    </Link>

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

      {/* ─── QUICK LOOK MODAL (MATCHING EXACT SCREENSHOT TEMPLATE) ─── */}
      {quickLookProduct && (
        <ProductQuickLookModal
          product={quickLookProduct}
          onClose={() => setQuickLookProduct(null)}
        />
      )}
    </section>
  );
};

export default ProductsSection;
