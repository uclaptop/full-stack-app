import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageSquare, Plus } from 'lucide-react';
import { products as staticProducts } from '../data/products';
import { useApp } from '../context/AppContext';
import { resolveProductImage, resolveProductPrice, resolveProductMrp } from '../utils/productUtils';

export const RecommendedTech = () => {
  const { products: dbProducts, addToCart } = useApp();
  const [page, setPage] = useState(0);

  const displayProducts = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => {
        const price = resolveProductPrice(p.price, p.name);
        const mrp = resolveProductMrp(p.mrp, price, p.name);
        return {
          id: String(p.id),
          name: p.name,
          brand: p.brand || 'Universal Computers',
          specs: p.specs || '',
          category: p.category || 'Business',
          tag: p.tag || '',
          price,
          mrp,
          savings: Math.max(0, mrp - price),
          image: resolveProductImage(p.image_url, p.name),
        };
      });
    }
    return staticProducts.map((p) => {
      const price = resolveProductPrice(p.price, p.name);
      const mrp = resolveProductMrp(p.mrp, price, p.name);
      return {
        ...p,
        price,
        mrp,
        savings: Math.max(0, mrp - price),
        image: resolveProductImage(p.image, p.name),
      };
    });
  }, [dbProducts]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const start = page * itemsPerPage;
    return displayProducts.slice(start, start + itemsPerPage);
  }, [displayProducts, page]);

  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const formatPrice = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <section className="w-full bg-[#f9fafb] py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── CONTAINER BOX (Matching Reference Screenshot) ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm font-['Inter',sans-serif]">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-normal mb-1 font-['Inter',sans-serif]">
                Recommended Tech Just For You
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 italic font-normal font-['Inter',sans-serif]">
                Curated Picks Based On What's Trending And Trusted.
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 self-end sm:self-auto font-['Inter',sans-serif]">
              <a 
                href="/products"
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-brand-blue underline transition-colors cursor-pointer"
              >
                View All Pieces
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  className="w-8 h-8 rounded-lg bg-[#274887]/20 hover:bg-[#133da6] text-[#133da6] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextPage}
                  className="w-8 h-8 rounded-lg bg-[#133da6] hover:bg-[#0c266a] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ─── 2-ROW × 3-COL HORIZONTAL PRODUCT CARD GRID ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            >
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-3 sm:p-4 flex items-center gap-4 hover:shadow-md transition-all duration-300 group relative font-['Inter',sans-serif]"
                >
                  {/* Left Square Pure White Image Stage (Amazon Style) */}
                  <Link 
                    to={`/product/${product.id}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white border border-slate-100 p-2 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                    />
                  </Link>

                  {/* Right Metadata Block */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5 font-['Inter',sans-serif]">
                    <div>
                      {/* Vendor Label */}
                      <span className="text-[11px] text-slate-400 font-normal tracking-normal block mb-0.5">
                        Universal Computers
                      </span>

                      {/* Price Row */}
                      <div className="flex items-center gap-1.5 flex-wrap font-['Inter',sans-serif]">
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-xs text-red-600 line-through font-normal">
                            {formatPrice(product.mrp)}
                          </span>
                        )}
                      </div>

                      {/* Product Title */}
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 leading-snug mt-1 hover:text-brand-blue transition-colors font-['Inter',sans-serif]">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Quick Action Bar */}
                    <div className="flex items-center gap-2 pt-2 font-['Inter',sans-serif]">
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1 bg-slate-100 hover:bg-[#0B1E3D] text-slate-700 hover:text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3 h-3" /> Cart
                      </button>

                      <a
                        href={`https://wa.me/918712173339?text=Hi Universal Computers, I am interested in ${encodeURIComponent(product.name)} (Price: ${formatPrice(product.price)})`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] transition-all flex items-center cursor-pointer"
                        title="Enquire on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

export default RecommendedTech;
