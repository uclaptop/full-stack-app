import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Youtube, Facebook } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { content } = useApp();
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
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Categories', href: '#products' },
    { name: 'Products', href: '#products' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img src="/logo.jpg" alt="Universal Computers Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
          <div className="hidden sm:block">
            <span className="text-xl font-bold tracking-normal text-black block leading-none uppercase">{navTitle}</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold block mt-1">{navSubtitle}</span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-black/50 hover:text-black transition-all relative group"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <motion.a 
            href={`tel:${phoneRaw}`}
            whileHover={{ backgroundColor: '#EA580C', color: '#fff' }}
            className="hidden lg:block px-6 py-2.5 bg-black text-white text-[10px] font-black tracking-widest rounded-full transition-all"
          >
            ENQUIRE NOW
          </motion.a>
          
          <button 
            className="md:hidden text-black"
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
            <div className="flex flex-col p-5 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-brand-blue border-b border-black/5 pb-2"
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
