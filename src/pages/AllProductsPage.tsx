import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, ChevronLeft, ArrowLeft, ShoppingBag, 
  MessageSquare, X, ArrowUpDown, Flame, Sparkles, Check 
} from 'lucide-react';
import { Navbar, WhatsAppButton } from '../components/Navigation';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/InfoSections';
import { useApp } from '../context/AppContext';
import { products as staticProducts } from '../data/products';
import { resolveProductImage, resolveProductPrice, resolveProductMrp } from '../utils/productUtils';
import { ProductQuickLookModal } from '../components/ProductQuickLookModal';

export const AllProductsPage = () => {
  const { products: dbProducts, addToCart } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'savings'>('featured');
  const [quickLookProduct, setQuickLookProduct] = useState<any | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allCategories = ['All', 'Laptops', 'Tiny PC', 'Monitors', 'Desktops', 'Peripherals', 'Business', 'Student', 'Gaming'];

  const allProducts = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => {
        const price = resolveProductPrice(p.price, p.name);
        const mrp = resolveProductMrp(p.mrp, price, p.name);
        return {
          id: String(p.id),
          name: p.name,
          brand: p.brand || 'Universal Computers',
          specs: p.specs || '',
          category: p.category || 'Laptops',
          tag: p.tag || '',
          price,
          mrp,
          savings: Math.max(0, mrp - price),
          discountPercent: mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0,
          image: resolveProductImage(p.image_url, p.name),
          secondaryImage: p.secondary_image_url ? resolveProductImage(p.secondary_image_url, p.name) : '',
          galleryImages: p.gallery_images || '',
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
        discountPercent: mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0,
        image: resolveProductImage(p.image, p.name),
        secondaryImage: p.secondary_image ? resolveProductImage(p.secondary_image, p.name) : '',
        galleryImages: '',
      };
    });
  }, [dbProducts]);

  // Filter and Sort
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        const matchesCat = selectedCategory === 'All' || 
          p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === 'Gaming' && p.category.toLowerCase().includes('graphic'));
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specs.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'savings') return b.savings - a.savings;
        return 0;
      });
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  const formatPrice = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-[#f9fafb] text-slate-900 min-h-screen font-['Inter',sans-serif] selection:bg-[#0B1E3D] selection:text-white">
      <Navbar />
      <CartDrawer />
      <WhatsAppButton />

      {/* Main Container */}
      <main className="pt-[118px] sm:pt-[124px] md:pt-[130px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 pt-4">
          <Link to="/" className="hover:text-brand-blue flex items-center gap-1 font-medium transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">All Pieces</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue block mb-1">
              Universal Computers Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              All Products & Collections
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              Showing {filteredProducts.length} certified refurbished enterprise laptops, desktops, and hardware pieces.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all pieces..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue shadow-2xs"
              />
            </div>

            {/* Sort Select */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-none focus:border-brand-blue shadow-2xs cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="savings">Highest Savings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#0B1E3D] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-xs">
            <p className="text-slate-600 text-base font-semibold mb-2">No products match your search or filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs text-brand-blue font-bold underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => {
              const hasSecondary = Boolean(product.secondaryImage);
              const isHovered = hoveredId === product.id;
              const currentImg = (isHovered && hasSecondary) ? product.secondaryImage : product.image;

              return (
                <div
                  key={product.id}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group font-['Inter',sans-serif]"
                >
                  {/* Seamless Pure White Image Stage (Amazon Style) */}
                  <div className="relative bg-white h-60 flex items-center justify-center p-4 overflow-hidden">
                    {product.savings > 0 && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-[#85221b] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-xs tracking-normal">
                          Save {formatPrice(product.savings)}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickLookProduct(product);
                      }}
                      className="absolute top-3 right-3 z-10 text-xs font-semibold text-slate-700 hover:text-brand-blue underline cursor-pointer bg-white/80 hover:bg-white backdrop-blur-xs px-2.5 py-0.5 rounded-md shadow-2xs transition-colors"
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

                  {/* Bottom Info Block */}
                  <div className="p-5 flex flex-col flex-1 justify-between bg-white text-center border-t border-slate-100 font-['Inter',sans-serif]">
                    <div>
                      <span className="text-xs text-[#6b7280] font-normal tracking-normal mb-1 block">
                        Universal Computers
                      </span>

                      {/* Product Name - Click navigates to details page */}
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm font-semibold text-[#111827] line-clamp-2 leading-snug mb-2 min-h-[38px] hover:text-brand-blue transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
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

                    <div className="flex items-center gap-2 pt-1">
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
        )}

      </main>

      {/* Quick Look Modal (Exact Template Match) */}
      {quickLookProduct && (
        <ProductQuickLookModal
          product={quickLookProduct}
          onClose={() => setQuickLookProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default AllProductsPage;
