import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Instagram, Youtube, Facebook, Phone, MapPin, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DEFAULT_WHY_POINTS = [
  'Scratch-less A+++ Imported Quality',
  '40-Point Rigorous Quality Testing',
  '9+ Years of Trusted Service',
  'Bulk Availability for Businesses',
  'Affordable Student-Friendly Models',
  'Dedicated Post-Purchase Warranty',
  'Original Accessories Included',
  'Top Google-Rated Store in Proddatur',
];

const DEFAULT_GALLERY = [
  { image_url: '/Dell Latitude  3570.png', name: 'Dell Latitude 3570' },
  { image_url: '/Dell Latitude  5570.png', name: 'Dell Latitude 5570' },
  { image_url: '/Dell Latitude  7540.png', name: 'Dell Latitude 7540' },
  { image_url: '/Dell Latitude 5420.png', name: 'Dell Latitude 5420' },
  { image_url: '/Dell latitude  5490.png', name: 'Dell Latitude 5490' },
  { image_url: '/Dell latitude  5580.png', name: 'Dell Latitude 5580' },
  { image_url: '/Dell latitude 3400.png', name: 'Dell Latitude 3400' },
  { image_url: '/Dell latitude 3480.png', name: 'Dell Latitude 3480' },
  { image_url: '/Dell latitude 5400.png', name: 'Dell Latitude 5400' },
  { image_url: '/Dell precision 5530.png', name: 'Dell Precision 5530' },
  { image_url: '/Hp Elitebook  745 G6.png', name: 'HP EliteBook 745 G6' },
  { image_url: '/Hp Elitebook 840 G3.png', name: 'HP EliteBook 840 G3' },
  { image_url: '/Hp Elitebook 840 G5.png', name: 'HP EliteBook 840 G5' },
  { image_url: '/Hp probook 640 G5.png', name: 'HP ProBook 640 G5' },
  { image_url: '/T490.png', name: 'Lenovo ThinkPad T490' },
  { image_url: '/dell latitude 5550.png', name: 'Dell Latitude 5550' },
];

export const WhyChooseUs = () => {
  const { whyPoints } = useApp();
  const points = whyPoints.length > 0
    ? whyPoints.map(p => p.point)
    : DEFAULT_WHY_POINTS;

  return (
    <section className="py-24 bg-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue mb-6">WHY CHOOSE UC</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-normal leading-snug mb-12 uppercase">
              RELIABILITY <br /> 
              <span className="text-brand-orange italic">THAT MATTERS.</span>
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {points.map((pt, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-black/5 border border-black/10 rounded-2xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-black/70">{pt}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-blue/20 blur-[100px] rounded-full" />
            <div className="glass p-8 rounded-[40px] relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200" 
                alt="Quality Check" 
                className="rounded-3xl shadow-2xl mb-8"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass rounded-2xl">
                  <div className="text-2xl font-black text-brand-blue">100%</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Genuine Parts</div>
                </div>
                <div className="text-center p-4 glass rounded-2xl">
                  <div className="text-2xl font-black text-brand-orange">48Hrs</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Testing Period</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Gallery = () => {
  const { stockItems } = useApp();
  const galleryItems = stockItems.length > 0
    ? stockItems.map(p => ({ image: p.image_url, name: p.name }))
    : DEFAULT_GALLERY.map(p => ({ image: p.image_url, name: p.name }));

  return (
    <section id="gallery" className="py-32">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-6 text-center">CURRENT STOCK</h2>
        <h3 className="text-4xl md:text-7xl font-black tracking-normal leading-snug text-center mb-20 uppercase">
          REAL DEVICES. <br/><span className="text-black/20 italic">REAL DEALS.</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-video rounded-2xl overflow-hidden glass group cursor-zoom-in bg-white/50 flex items-center justify-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-md p-3 border-t border-white/10">
                <span className="text-white font-bold uppercase tracking-wider text-[10px] md:text-xs text-center block">{item.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  const { content } = useApp();
  const phone = content['contact.phone'] || '+91 87121 73339';
  const whatsapp = content['contact.whatsapp_number'] || '918712173339';
  const addressLine1 = content['contact.address_line1'] || 'D.No 14/331, Church Complex Upstairs';
  const addressCity = content['contact.address_city'] || 'Proddatur, AP, India.';
  const instagram = content['footer.instagram_url'] || 'https://www.instagram.com/_universal_computers_';
  const youtube = content['footer.youtube_url'] || 'https://www.youtube.com/@UniversalComputerspdtr';
  const facebook = content['footer.facebook_url'] || 'https://www.facebook.com/share/14bJmiFVj6T/';

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phoneNum = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const text = `*New Inquiry*\n\n*Name:* ${name}\n*Phone:* ${phoneNum}\n*Email:* ${email || 'Not provided'}\n*Requirement:* ${message}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-32 bg-mesh relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue mb-6">GET IN TOUCH</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-normal leading-snug mb-10 uppercase">
              VISIT OUR <br />
              <span className="text-brand-orange italic">EXPERIENCE STORE.</span>
            </h3>
            <div className="space-y-10 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                  <MapPin className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-black/40 mb-2">Location</h4>
                  <p className="text-lg font-bold leading-tight">{addressCity}</p>
                  <p className="text-sm text-black/40 mt-1">{addressLine1}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-orange-500/20">
                  <Phone className="text-brand-orange w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-black/40 mb-2">Phone</h4>
                  <p className="text-2xl font-mono font-black">{phone}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <a href={instagram} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors group">
                <Instagram className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href={youtube} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors group">
                <Youtube className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href={facebook} target="_blank" rel="noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors group">
                <Facebook className="w-5 h-5 group-hover:text-white" />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Send size={120} className="rotate-12" />
            </div>
            <h4 className="text-2xl font-black mb-8 tracking-tight">Drop us a message</h4>
            <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="name" required placeholder="Your Name"
                  className="bg-black/5 border border-black/10 rounded-2xl p-4 outline-none focus:border-brand-blue/50 w-full text-black placeholder:text-black/50" />
                <input type="text" name="phone" required placeholder="Phone Number"
                  className="bg-black/5 border border-black/10 rounded-2xl p-4 outline-none focus:border-brand-blue/50 w-full text-black placeholder:text-black/50" />
              </div>
              <input type="email" name="email" placeholder="Email Address (Optional)"
                className="bg-black/5 border border-black/10 rounded-2xl p-4 outline-none focus:border-brand-blue/50 w-full text-black placeholder:text-black/50" />
              <textarea rows={4} name="message" required placeholder="What laptop are you looking for?"
                className="bg-black/5 border border-black/10 rounded-2xl p-4 outline-none focus:border-brand-blue/50 w-full text-black placeholder:text-black/50" />
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/20 cursor-pointer">
                Send via WhatsApp
                <Send className="w-5 h-5" />
              </motion.button>
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
  const whatsapp = content['contact.whatsapp_number'] || '918712173339';
  const addressLine1 = content['contact.address_line1'] || 'D.No 14/331, Church Complex Upstairs';
  const addressCity = content['contact.address_city'] || 'Proddatur, AP 516360';
  const email = content['contact.email'] || 'info@universalcomputers.com';
  
  const instagram = content['footer.instagram_url'] || 'https://www.instagram.com/_universal_computers_';
  const youtube = content['footer.youtube_url'] || 'https://www.youtube.com/@UniversalComputerspdtr';
  const facebook = content['footer.facebook_url'] || 'https://www.facebook.com/share/14bJmiFVj6T/';

  return (
    <section id="map" className="bg-[#1f1f1f] font-sans">
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Left: Contact Details */}
          <div className="text-white">
            <h3 className="text-2xl md:text-[28px] font-bold mb-6 text-white tracking-normal normal-case">
              Contact Us
            </h3>
            
            <div className="space-y-3 text-[15px] text-gray-200">
              <p>
                Phone: {phone}
              </p>
              
              <p>
                Email: {email}
              </p>
              
              <p className="leading-relaxed">
                Address: {addressLine1},<br />
                {addressCity}
              </p>
            </div>

            {/* Simple Social Icons */}
            <div className="flex gap-5 mt-8">
              <a href={facebook} target="_blank" rel="noreferrer" className="text-[#3b5998] hover:text-white transition-colors">
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a href={instagram} target="_blank" rel="noreferrer" className="text-[#00acee] hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={youtube} target="_blank" rel="noreferrer" className="text-brand-blue hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: Map iframe */}
          <div className="w-full h-[300px] md:h-[400px] relative">
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
            {/* Overlay "Open in Maps" button */}
            <a
              href="https://maps.app.goo.gl/aeSvq9gcxcFew8iR8"
              target="_blank"
              rel="noreferrer"
              className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded shadow flex items-center gap-1 hover:bg-blue-50 transition-colors z-10"
            >
              <MapPin className="w-3 h-3" />
              Open in Maps
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { content } = useApp();
  const weekday = content['footer.hours_weekday'] || 'MON-SAT 9AM-8:30PM';
  const weekend = content['footer.hours_weekend'] || 'SUN 10AM-6:00PM';
  const tagline = content['footer.tagline'] || "Bringing premium technology within everyone's reach. Trusted by over 1k+ satisfied customers for more than 9 years in Proddatur.";
  const instagram = content['footer.instagram_url'] || 'https://www.instagram.com/_universal_computers_';
  const youtube = content['footer.youtube_url'] || 'https://www.youtube.com/@UniversalComputerspdtr';
  const facebook = content['footer.facebook_url'] || 'https://www.facebook.com/share/14bJmiFVj6T/';

  return (
    <footer className="py-24 border-t border-black/5 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img src="/logo.jpg" alt="Universal Computers Logo" className="w-16 h-16 object-contain" />
              <span className="text-3xl font-black tracking-normal uppercase text-black">Universal <br/>Computers.</span>
            </div>
            <p className="text-black/60 max-w-sm mb-10 leading-relaxed font-medium">{tagline}</p>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-brand-blue">Store Info</h4>
            <div className="space-y-4 font-black uppercase text-[10px] tracking-widest">
              <p className="text-black/50">{weekday}</p>
              <p className="text-brand-orange">{weekend}</p>
              <p className="text-black">PRODDATUR, AP</p>
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.4em] text-brand-orange">Socials</h4>
            <div className="flex flex-col gap-3">
              <a href={instagram} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-all">INSTAGRAM</a>
              <a href={youtube} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-all">YOUTUBE</a>
              <a href={facebook} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-all">FACEBOOK</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-black/30 uppercase tracking-[0.5em]">
          <div>© 2024 UNIVERSAL COMPUTERS</div>
          <div>ESTD 2015</div>
        </div>
      </div>
    </footer>
  );
};
