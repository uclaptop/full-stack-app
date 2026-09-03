import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { resolveProductImage } from '../utils/productUtils';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, content } = useApp();

  const phone = content['contact.phone_raw'] || '8712173339';
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const formatPrice = (amount: number | string | undefined) => {
    if (!amount) return '';
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
    if (!num || isNaN(num)) return '';
    return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalPrice = cart.reduce((acc, item) => {
    const p = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : (Number(item.price) || 0);
    return acc + (p * (item.quantity || 1));
  }, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `*Hello Universal Computers, I am interested in ordering/inquiring about the following laptops:*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      if (item.specs) message += `   • Specs: ${item.specs}\n`;
      if (item.brand) message += `   • Brand: ${item.brand}\n`;
      if (item.price) message += `   • Price: ${formatPrice(item.price)}\n`;
      message += `\n`;
    });
    if (totalPrice > 0) {
      message += `*Estimated Total:* ${formatPrice(totalPrice)}\n\n`;
    }
    message += `Please let me know about current availability and delivery in Proddatur!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/91${phone}?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col font-['Inter',sans-serif]"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Your Cart</h3>
                    <p className="text-xs text-slate-500 font-semibold">{totalItems} {totalItems === 1 ? 'laptop' : 'laptops'} selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-800">Your Cart is Empty</h4>
                      <p className="text-xs text-slate-500 max-w-[240px]">Explore our verified laptop inventory and add laptops to inquire easily.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const el = document.getElementById('products');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-orange transition-all shadow-md shadow-brand-blue/20 flex items-center gap-2"
                    >
                      Browse Laptops <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-all group"
                    >
                      <img
                        src={resolveProductImage(item.image_url || (item as any).image, item.name)}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-xl bg-white p-1 border border-slate-100 flex-shrink-0"
                        onError={(e) => { e.currentTarget.src = '/hp-probook-640-g5.png'; }}
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-black text-slate-900 uppercase truncate group-hover:text-brand-blue transition-colors">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.specs && (
                            <p className="text-xs text-slate-500 line-clamp-1 font-medium mt-0.5">
                              {item.specs}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-slate-500 hover:text-slate-900 p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-900 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-slate-500 hover:text-slate-900 p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          {item.price && (
                            <span className="text-xs font-black text-slate-900">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span>Selected Laptops:</span>
                    <span className="text-slate-900">{totalItems} units</span>
                  </div>

                  {totalPrice > 0 && (
                    <div className="flex items-center justify-between text-sm font-black border-t border-slate-200 pt-2 text-slate-900">
                      <span>Total Estimated Price:</span>
                      <span className="text-base text-brand-blue">{formatPrice(totalPrice)}</span>
                    </div>
                  )}

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 bg-[#25D366] hover:bg-[#1eb857] text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20 active:scale-[0.99] cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5 fill-white text-transparent" />
                    Enquire Cart on WhatsApp
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-2.5 text-center text-xs text-slate-400 hover:text-slate-600 font-bold tracking-wider uppercase transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
