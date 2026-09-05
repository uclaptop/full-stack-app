import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, MapPin, Send, Instagram, Youtube, Facebook, 
  Mail, Clock, ShieldCheck, Truck, CheckCircle2, 
  ExternalLink, Sparkles, MessageSquare 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Contact = () => {
  const { content } = useApp();
  const phone = content['contact.phone'] || '+91 87121 73339';
  const phoneRaw = content['contact.phone_raw'] || '8712173339';
  const addressLine1 = content['contact.address_line1'] || 'D.No 14/331, Church Complex Upstairs';
  const addressCity = content['contact.address_city'] || 'Proddatur, AP 516360';
  const email = content['contact.email'] || 'uclaptopstore@gmail.com';
  
  const instagram = content['footer.instagram_url'] || 'https://www.instagram.com/_universal_computers_';
  const youtube = content['footer.youtube_url'] || 'https://www.youtube.com/@UniversalComputerspdtr';
  const facebook = content['footer.facebook_url'] || 'https://www.facebook.com/share/14bJmiFVj6T/';

  const [selectedInterest, setSelectedInterest] = useState('Refurbished Laptop');

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const userPhone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';
    const userEmail = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';

    const text = `*New Inquiry from Universal Computers Website*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${userPhone}\n` +
      (userEmail ? `*Email:* ${userEmail}\n` : '') +
      `*Interest:* ${selectedInterest}\n` +
      `*Requirement:* ${message}\n\n` +
      `_Sent from universalcomputers.in_`;

    window.open(`https://wa.me/${phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const interests = [
    '💻 Refurbished Laptop',
    '🖥️ Tiny PC / Desktop',
    '📺 Monitor / Display',
    '⚡ Bulk Order / Business',
  ];

  return (
    <section id="contact" className="w-full bg-[#f8f9fa] py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: STORE INFO & CREDENTIALS ── */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1E3D]/10 text-[#0B1E3D] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#E8A93B]" /> Get in Touch
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E3D] tracking-tight leading-tight uppercase mb-4 font-['Inter',sans-serif]">
                VISIT OUR <br />
                <span className="text-brand-blue">EXPERIENCE STORE.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Experience testing devices in person at our Proddatur showroom. Our hardware specialists are ready to guide you to the perfect specs.
              </p>
            </div>

            {/* Store Contact Badges */}
            <div className="space-y-4">
              
              {/* Location */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#133da6]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Store Location</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{addressCity}</p>
                  <p className="text-xs text-slate-500">{addressLine1}</p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Call / WhatsApp Support</span>
                  <a href={`tel:${phoneRaw}`} className="text-base sm:text-lg font-bold text-slate-900 hover:text-brand-blue transition-colors mt-0.5 block">
                    {phone}
                  </a>
                  <p className="text-xs text-emerald-600 font-semibold mt-0.5">● Available Mon–Sat (9 AM – 8:30 PM)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E8A93B] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Official Email</span>
                  <a href={`mailto:${email}`} className="text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors mt-0.5 block">
                    {email}
                  </a>
                </div>
              </div>

            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Connect On Social Media</span>
              <div className="flex items-center gap-3">
                <a 
                  href={instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-11 h-11 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 transition-all cursor-pointer"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={youtube} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-11 h-11 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:text-white hover:bg-red-600 transition-all cursor-pointer"
                  title="Subscribe on YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href={facebook} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-11 h-11 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#1877F2] transition-all cursor-pointer"
                  title="Follow on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* ── RIGHT COLUMN: INTERACTIVE INQUIRY FORM ── */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1 font-['Inter',sans-serif]">
                Drop Us A Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Tell us your hardware requirements and we'll instantly connect with current available stock & best price quotes.
              </p>
            </div>

            {/* Requirement Interest Pills */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                I Am Looking For:
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedInterest(item)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedInterest === item
                        ? 'bg-[#0B1E3D] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. ramesh@gmail.com"
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">What laptop or PC specs are you looking for? *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="e.g. Need an i5 8th or 11th Gen Dell/HP laptop with 16GB RAM for programming and college work..."
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl p-4 text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#0B1E3D] hover:bg-[#133da6] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#0B1E3D]/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-2"
              >
                Send via WhatsApp <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export const MapSection = () => {
  const { content } = useApp();
  const phone = content['contact.phone'] || '+91 87121 73339';
  const addressLine1 = content['contact.address_line1'] || 'D.No 14/331, Church Complex Upstairs';
  const addressCity = content['contact.address_city'] || 'Proddatur, AP 516360';
  const email = content['contact.email'] || 'uclaptopstore@gmail.com';

  return (
    <section id="map" className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0B1E3D] rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden grid lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Store Info */}
          <div className="lg:col-span-5 space-y-5 relative z-10">
            <span className="text-[#E8A93B] font-mono text-xs uppercase tracking-widest block font-bold">
              Find Our Store Location
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Universal Computers Experience Hub
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Located right at Church Complex Upstairs in the center of Proddatur. Walk in anytime to test any laptop before purchasing.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#E8A93B] shrink-0" />
                <span>{addressLine1}, {addressCity}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon–Sat: 9:00 AM – 8:30 PM (Sun: 10 AM – 6 PM)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/aeSvq9gcxcFew8iR8"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8A93B] hover:bg-[#d8972a] text-[#0B1E3D] font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Open in Google Maps <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Map Preview */}
          <div className="lg:col-span-7 h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <iframe
              title="Universal Computers Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.6!2d78.5480!3d14.7340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb478a826957a3f%3A0x6d07c32748b8a5d2!2sUniversal%20computers!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { content } = useApp();
  const phone = content['contact.phone'] || '+91 87121 73339';
  const phoneRaw = content['contact.phone_raw'] || '8712173339';
  const addressLine1 = content['contact.address_line1'] || 'D.No 14/331, Church Complex Upstairs';
  const addressCity = content['contact.address_city'] || 'Proddatur, AP 516360';
  const email = content['contact.email'] || 'uclaptopstore@gmail.com';
  const weekday = content['footer.hours_weekday'] || 'MON-SAT 9:00 AM - 8:30 PM';
  const weekend = content['footer.hours_weekend'] || 'SUN 10:00 AM - 6:00 PM';
  
  const instagram = content['footer.instagram_url'] || 'https://www.instagram.com/_universal_computers_';
  const youtube = content['footer.youtube_url'] || 'https://www.youtube.com/@UniversalComputerspdtr';
  const facebook = content['footer.facebook_url'] || 'https://www.facebook.com/share/14bJmiFVj6T/';

  return (
    <footer className="w-full bg-[#0B1E3D] text-white pt-16 pb-8 border-t border-[#133da6]/40 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Top Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center">
              <div className="bg-white px-3.5 py-1.5 rounded-2xl inline-flex items-center shadow-md">
                <img 
                  src="/logo.png" 
                  alt="Universal Computers" 
                  className="h-11 sm:h-12 w-auto max-w-[280px] object-contain" 
                />
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              South India's most trusted certified refurbished IT hardware store. Delivering premium enterprise-grade laptops, desktops, and workstations tested with 40-point quality assurance since 2015.
            </p>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-2 pt-1 max-w-md">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-bold text-[#E8A93B] block uppercase tracking-wider">1-Year</span>
                <span className="text-[10px] text-slate-300 font-medium">Warranty</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-bold text-[#E8A93B] block uppercase tracking-wider">40-Point</span>
                <span className="text-[10px] text-slate-300 font-medium">QC Tested</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-bold text-[#E8A93B] block uppercase tracking-wider">9+ Years</span>
                <span className="text-[10px] text-slate-300 font-medium">In Proddatur</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8A93B]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><a href="#collections" className="hover:text-white hover:underline transition-colors">Laptops</a></li>
              <li><a href="#collections" className="hover:text-white hover:underline transition-colors">Tiny PC</a></li>
              <li><a href="#collections" className="hover:text-white hover:underline transition-colors">Desktops</a></li>
              <li><a href="#collections" className="hover:text-white hover:underline transition-colors">Monitors</a></li>
              <li><a href="#collections" className="hover:text-white hover:underline transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Column 3: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8A93B]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><a href="#" className="hover:text-white hover:underline transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white hover:underline transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-white hover:underline transition-colors">Trending Deals</a></li>
              <li><a href="#contact" className="hover:text-white hover:underline transition-colors">Store Visit</a></li>
              <li><a href="/uclaptop" className="hover:text-[#E8A93B] transition-colors">Admin Portal</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8A93B]">
              Store Timings
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-white">{weekday}</p>
              <p className="text-[#E8A93B] font-semibold">{weekend}</p>
              <p className="text-slate-400 pt-1 leading-relaxed">
                {addressLine1},<br />
                {addressCity}
              </p>
              <div className="pt-2">
                <a 
                  href={`mailto:${email}`} 
                  className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-[#E8A93B] transition-colors font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E8A93B] shrink-0" />
                  <span>{email}</span>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href={instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-pink-600 flex items-center justify-center text-white transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={youtube} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center text-white transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            © {new Date().getFullYear()} Universal Computers. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Proddatur, Andhra Pradesh</span>
            <span>•</span>
            <span className="text-[#E8A93B] font-semibold">Established 2015</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
