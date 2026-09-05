import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ShoppingBag, MessageSquare, Share2, Check, 
  Truck, RefreshCw, ShieldCheck, CheckCircle2, ChevronRight,
  Shield, Zap, Award, Sparkles, Copy
} from 'lucide-react';
import { Navbar, WhatsAppButton } from '../components/Navigation';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/InfoSections';
import { useApp } from '../context/AppContext';
import { products as staticProducts } from '../data/products';
import { 
  resolveProductImage, 
  resolveProductPrice, 
  resolveProductMrp, 
  resolveProductGallery,
  generateProductTags,
  generateWhatsAppOrderUrl
} from '../utils/productUtils';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products: dbProducts, addToCart, setIsCartOpen, content } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find product by ID or fallback to matching static/DB product
  const product = useMemo(() => {
    const list = dbProducts && dbProducts.length > 0 ? dbProducts : staticProducts;
    
    // Match by ID
    const foundById = list.find((p: any) => String(p.id) === String(id));
    if (foundById) return foundById;

    // Match by normalized name/slug if ID is a slug
    if (id) {
      const slugId = id.toLowerCase().replace(/-/g, ' ');
      const foundByName = list.find((p: any) => p.name.toLowerCase().includes(slugId));
      if (foundByName) return foundByName;
    }

    // Default to first product
    return list[0] || staticProducts[0];
  }, [id, dbProducts]);

  const price = useMemo(() => resolveProductPrice((product as any)?.price, product?.name), [product]);
  const mrp = useMemo(() => resolveProductMrp((product as any)?.mrp, price, product?.name), [product, price]);
  const savings = Math.max(0, mrp - price);
  const discountPercent = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

  // 4 authentic angle images for the 2x2 grid
  const galleryImages = useMemo(() => resolveProductGallery(product), [product]);

  const whatsappNumber = content['contact.whatsapp_number'] || '918712173339';
  const whatsappUrl = useMemo(() => 
    generateWhatsAppOrderUrl(product?.name || 'Refurbished Laptop', price, whatsappNumber),
    [product, price, whatsappNumber]
  );

  const tags = useMemo(() => generateProductTags(product), [product]);

  const formatPrice = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: String(product.id),
      name: product.name,
      price: price,
      specs: (product as any).specs || '',
      category: (product as any).category || 'Laptop',
      image_url: galleryImages[0] || resolveProductImage((product as any).image_url, product.name),
    });
    setIsAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Universal Computers for ${formatPrice(price)}!`,
          url,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-center items-center p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-brand-blue underline font-semibold">Back to All Products</Link>
      </div>
    );
  }

  const description = (product as any).description || 
    `${product.name} refurbished business laptop, sleek and reliable with top-tier performance, professionally checked with 40-point QC by Universal Computers, with 1-year warranty.`;

  return (
    <div className="bg-[#f9fafb] text-slate-900 min-h-screen font-['Inter',sans-serif] selection:bg-[#0B1E3D] selection:text-white">
      <Navbar />
      <CartDrawer />
      <WhatsAppButton />

      {/* Main Content Stage */}
      <main className="pt-[118px] sm:pt-[124px] md:pt-[130px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── BREADCRUMBS NAVIGATION (Matching Screenshot 1) ── */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 pt-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-brand-blue font-medium transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link to={`/products?category=${encodeURIComponent((product as any).category || 'Laptops')}`} className="hover:text-brand-blue font-medium transition-colors">
            {(product as any).category || 'Laptops'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* ── 2-COLUMN PRODUCT SHOWCASE GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ════════ LEFT COLUMN: MAIN IMAGE STAGE + 2x2 ANGLE GRID ════════ */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* 1. Large Main Image Showcase Box */}
            <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 flex items-center justify-center overflow-hidden group shadow-xs">
              
              {/* Top-Left Share Action Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 left-4 z-10 w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex items-center justify-center text-slate-600 hover:text-brand-blue transition-all cursor-pointer group/share"
                title="Share this product"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
                )}
              </button>

              {/* Top-Right Maroon Savings Pill Badge */}
              {savings > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#85221b] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm font-['Inter',sans-serif]">
                    Save {formatPrice(savings)}
                  </span>
                </div>
              )}

              {/* Active Main View with Smooth Animation */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  src={galleryImages[activeImageIndex] || galleryImages[0]}
                  alt={`${product.name} - Angle ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain max-h-[380px] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                />
              </AnimatePresence>
            </div>

            {/* 2. 2x2 Grid of All Camera Angles / Gallery Photos (Matching Screenshot 2) */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.slice(0, 4).map((imgUrl, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`bg-white rounded-2xl border p-4 sm:p-5 flex items-center justify-center aspect-[4/3] sm:aspect-square transition-all cursor-pointer relative overflow-hidden group shadow-2xs ${
                      isActive
                        ? 'border-[#0B1E3D] ring-2 ring-[#0B1E3D]/20 shadow-md scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-400 hover:shadow-xs'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                    />
                    
                    {/* View Angle Indicator */}
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold text-slate-400 bg-white/90 px-1.5 py-0.5 rounded shadow-2xs">
                      {idx === 0 ? 'Front' : idx === 1 ? 'Angled' : idx === 2 ? 'Cover' : 'Ports'}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* ════════ RIGHT COLUMN: METADATA, CTAs, SPECS & TRUST (Matching Screenshot 1 & 2) ════════ */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* 1. Brand / Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price Line (Exact match: Bold Price + Struck Red MRP) */}
              <div className="flex items-center gap-3 flex-wrap font-['Inter',sans-serif]">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {formatPrice(price)}
                </span>
                {mrp > price && (
                  <span className="text-lg sm:text-xl text-red-600 line-through font-semibold">
                    {formatPrice(mrp)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* 2. Action Buttons (WhatsApp & Add to Cart) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Order on WhatsApp Button (Exact green match) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 text-base shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.148-.197.297-.767.966-.94 1.163-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order on WhatsApp</span>
              </a>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0B1E3D] hover:bg-[#133da6] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 text-base shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* 3. Short Product Description (Exact match) */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal pt-1">
              {description}
            </p>

            {/* 4. 3 Feature Trust Badges (Exact match to Screenshot 1 & 2) */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-200/80">
              {/* Express Delivery */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Truck className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Express Delivery
                </span>
              </div>

              {/* Easy Return */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <RefreshCw className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Easy Return
                </span>
              </div>

              {/* A+ Condition */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Award className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  A+ Condition
                </span>
              </div>
            </div>

            {/* 5. Secure Checkout Trust Box */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                Secure checkout with
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                {['UPI', 'Visa', 'Mastercard', 'RuPay', 'NetBanking', 'COD Available', '100% Verified'].map((badge) => (
                  <span
                    key={badge}
                    className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Product Specifications & Fields Table (Exact match to Screenshot 2) */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 border-t border-slate-200/80">
              
              {/* Vendor */}
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 font-semibold text-slate-900">Vendor:</span>
                <span className="col-span-9 text-slate-600 font-medium">Universal Computers</span>
              </div>

              {/* Type */}
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 font-semibold text-slate-900">Type:</span>
                <span className="col-span-9 text-slate-600 font-medium">{(product as any).category || 'Laptop'}</span>
              </div>

              {/* Hardware Specs */}
              {(product as any).specs && (
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-3 font-semibold text-slate-900">Specs:</span>
                  <span className="col-span-9 text-slate-600 font-medium">{(product as any).specs}</span>
                </div>
              )}

              {/* Condition */}
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 font-semibold text-slate-900">Condition:</span>
                <span className="col-span-9 text-slate-600 font-medium">40-Point QC Certified Grade A+++</span>
              </div>

              {/* Warranty */}
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 font-semibold text-slate-900">Warranty:</span>
                <span className="col-span-9 text-slate-600 font-medium">1 Year Comprehensive Store Warranty</span>
              </div>

              {/* Tags */}
              <div className="grid grid-cols-12 gap-2 pt-1">
                <span className="col-span-3 font-semibold text-slate-900">Tags:</span>
                <p className="col-span-9 text-slate-600 leading-relaxed font-normal">
                  {tags}
                </p>
              </div>

            </div>

            {/* 7. Social Share Buttons (Exact match to Screenshot 2) */}
            <div className="flex items-center gap-2 pt-3">
              {/* Facebook Share */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3b5998] hover:bg-[#324b81] text-white text-xs font-bold px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                </svg>
                <span>Share</span>
              </a>

              {/* Twitter / X Tweet */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${product.name} at Universal Computers!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Tweet</span>
              </a>

              {/* Pinterest Pin */}
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(galleryImages[0])}&description=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#cb2027] hover:bg-[#b01b21] text-white text-xs font-bold px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.225-.174.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.537.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
                <span>Pin it</span>
              </a>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
