import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Youtube, Facebook, ShoppingBag, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RunningBanner } from './RunningBanner';

export const Navbar = () => {
  const { content, cartCount, setIsCartOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTitle = content['navbar.title'] || 'UNIVERSAL COMPUTERS';
  const navSubtitle = content['navbar.subtitle'] || 'Refurbished Excellence';
  const phoneRaw = content['contact.phone_raw'] || '8712173339';
  const instagram = content['footer.instagram_url'] || 'https://www.instagram.com/_universal_computers_';
  const youtube = content['footer.youtube_url'] || 'https://www.youtube.com/@UniversalComputerspdtr';
  const facebook = content['footer.facebook_url'] || 'https://www.facebook.com/share/14bJmiFVj6T/';

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Collections', href: '#collections' },
    { name: 'Deals', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav 
        className={`transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md py-2.5 shadow-sm' : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-black/5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="/logo.png" 
            alt="Universal Computers" 
            className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px] object-contain drop-shadow-sm group-hover:scale-105 transition-transform" 
          />
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="text-sm font-semibold text-slate-700 hover:text-brand-blue transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full rounded-full" />
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 md:gap-4"
        >
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-brand-blue/10 border border-slate-200/80 hover:border-brand-blue/30 transition-all group"
            title="View Cart & Enquire"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-slate-800 group-hover:text-brand-blue transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-xs font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                Cart
              </span>
              <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          </button>

          <motion.a 
            href={`tel:${phoneRaw}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden lg:flex items-center justify-center px-6 py-2.5 bg-slate-900 hover:bg-brand-blue text-white text-xs font-bold rounded-full transition-all shadow-sm hover:shadow-md hover:shadow-brand-blue/20 tracking-wider"
          >
            ENQUIRE NOW
          </motion.a>
          
          <button 
            className="md:hidden text-slate-900 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-3 bg-white/95 backdrop-blur-xl border-t border-black/5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-brand-blue/10 text-brand-blue font-bold text-sm"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>View Cart / Enquiry</span>
                </div>
                <span className="bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full font-black">
                  {cartCount}
                </span>
              </button>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-slate-800 hover:text-brand-blue border-b border-black/5 pb-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 mt-2">
                <a href={instagram} target="_blank" rel="noreferrer" className="p-2 glass rounded-full"><Instagram size={20}/></a>
                <a href={youtube} target="_blank" rel="noreferrer" className="p-2 glass rounded-full"><Youtube size={20}/></a>
                <a href={facebook} target="_blank" rel="noreferrer" className="p-2 glass rounded-full"><Facebook size={20}/></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
      {/* Continuous Green Running Ticker Bar */}
      <RunningBanner />
    </header>
  );
};

export const WhatsAppButton = () => {
  const { content } = useApp();
  const whatsapp = content['contact.whatsapp_number'] || '918712173339';

  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center"
    >
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.148-.197.297-.767.966-.94 1.163-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
};
