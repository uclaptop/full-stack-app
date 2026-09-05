import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, ShoppingBag, MessageSquare, Truck, RefreshCw, Award, 
  CheckCircle2, ArrowRight, ExternalLink, Share2, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  resolveProductImage, 
  resolveProductPrice, 
  resolveProductMrp, 
  resolveProductGallery,
  generateProductTags,
  generateWhatsAppOrderUrl
} from '../utils/productUtils';

interface ProductQuickLookModalProps {
  product: any | null;
  onClose: () => void;
}

export const ProductQuickLookModal: React.FC<ProductQuickLookModalProps> = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen, content } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

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

  if (!product) return null;

  const handleAddToCart = () => {
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

  const description = (product as any).description || 
    `${product.name} refurbished business laptop, sleek and reliable with top-tier performance, professionally checked with 40-point QC by Universal Computers, with 1-year warranty.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm font-['Inter',sans-serif] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative font-['Inter',sans-serif] p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 shadow-sm transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Quick Look Header Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-[#0B1E3D] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Quick Look Preview
            </span>
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-xs text-brand-blue hover:underline font-semibold flex items-center gap-1"
            >
              Open Full Details Page <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ── 2-COLUMN MODAL CONTENT (MATCHING SCREENSHOTS) ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* ════════ LEFT COLUMN: MAIN IMAGE + 2x2 ANGLE GRID ════════ */}
            <div className="md:col-span-6 flex flex-col space-y-3">
              
              {/* Main Photo Container */}
              <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-center overflow-hidden group shadow-2xs">
                {savings > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#85221b] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-xs font-['Inter',sans-serif]">
                      Save {formatPrice(savings)}
                    </span>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    src={galleryImages[activeImageIndex] || galleryImages[0]}
                    alt={`${product.name} - View ${activeImageIndex + 1}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                  />
                </AnimatePresence>
              </div>

              {/* 2x2 Camera Angle Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {galleryImages.slice(0, 4).map((imgUrl, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`bg-white rounded-xl border p-2.5 flex items-center justify-center aspect-[4/3] transition-all cursor-pointer relative overflow-hidden group shadow-2xs ${
                        isActive
                          ? 'border-[#0B1E3D] ring-2 ring-[#0B1E3D]/20 shadow-xs scale-[1.02]'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} angle ${idx + 1}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-bold text-slate-400 bg-white/90 px-1 rounded">
                        {idx === 0 ? 'Front' : idx === 1 ? 'Angled' : idx === 2 ? 'Cover' : 'Ports'}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* ════════ RIGHT COLUMN: SPECS, CTAs & TRUST ════════ */}
            <div className="md:col-span-6 flex flex-col space-y-4 font-['Inter',sans-serif]">
              
              {/* Product Title */}
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                  {product.name}
                </h3>

                {/* Pricing Line */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {formatPrice(price)}
                  </span>
                  {mrp > price && (
                    <span className="text-sm sm:text-base text-red-600 line-through font-semibold">
                      {formatPrice(mrp)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
                {/* Order on WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.148-.197.297-.767.966-.94 1.163-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Order on WhatsApp</span>
                </a>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#0B1E3D] hover:bg-[#133da6] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {description}
              </p>

              {/* 3 Feature Trust Icons */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200/80">
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-800">Express Delivery</span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-800">Easy Return</span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-800">A+ Condition</span>
                </div>
              </div>

              {/* Specifications Table */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-3 font-semibold text-slate-900">Vendor:</span>
                  <span className="col-span-9 text-slate-600">Universal Computers</span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-3 font-semibold text-slate-900">Type:</span>
                  <span className="col-span-9 text-slate-600">{(product as any).category || 'Laptop'}</span>
                </div>
                {(product as any).specs && (
                  <div className="grid grid-cols-12 gap-1">
                    <span className="col-span-3 font-semibold text-slate-900">Specs:</span>
                    <span className="col-span-9 text-slate-600">{(product as any).specs}</span>
                  </div>
                )}
                <div className="grid grid-cols-12 gap-1">
                  <span className="col-span-3 font-semibold text-slate-900">Tags:</span>
                  <p className="col-span-9 text-slate-500 line-clamp-2">{tags}</p>
                </div>
              </div>

              {/* Link to Full Product Page */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-brand-blue text-brand-blue font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  View Complete Product Page <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
