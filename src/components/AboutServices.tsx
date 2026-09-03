import React from 'react';
import { motion, useInView } from 'motion/react';
import { Laptop, Cpu, ShieldCheck, BadgePercent, Settings } from 'lucide-react';

const CountUp = ({ to, label }: { to: string, label: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-black mb-2 text-brand-blue italic"
      >
        {to}
      </motion.div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black">{label}</div>
    </div>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200" 
              alt="Laptop Store" 
              className="rounded-3xl shadow-2xl relative z-10 border border-black/10"
            />
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl z-20 shadow-xl max-w-[200px]">
              <span className="text-3xl font-bold text-brand-orange">9+ Years</span>
              <p className="text-sm text-gray-600 mt-1 uppercase font-bold tracking-tight">of Trusted Excellence</p>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">PRODDATUR'S TECH HUB</h2>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 uppercase text-slate-900">
                TRUSTED <br /> 
                <span className="text-slate-400 italic">SINCE 2015.</span>
              </h3>
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed font-normal">
                Universal Computers (UC) has been a leading technological hub for over 9 years. 
                Our focus has always been on bridging the gap between premium tech and 
                affordable pricing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm">
                <CountUp to="1k+" label="Customers" />
                <CountUp to="500+" label="Models" />
                <CountUp to="#1" label="Rated" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  key?: React.Key;
}

const ServiceCard = ({ icon: Icon, title, description, delay }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -6 }}
    className="bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-brand-blue/30 shadow-sm hover:shadow-md transition-all group"
  >
    <div className="w-13 h-13 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-all duration-300">
      <Icon className="w-6 h-6 group-hover:text-white text-brand-blue transition-colors" />
    </div>
    <h4 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-brand-blue transition-colors">{title}</h4>
    <p className="text-slate-600 text-sm leading-relaxed font-normal">
      {description}
    </p>
  </motion.div>
);

export const Services = () => {
  const services = [
    {
      icon: Laptop,
      title: "PREMIUM BUILDS",
      description: "Imported laptops in A+++ scratch-less condition. Guaranteed performance at unbeatable prices."
    },
    {
      icon: Cpu,
      title: "POWER USERS",
      description: "Curated models for developers, designers, and business power users. High specs, low cost."
    },
    {
      icon: ShieldCheck,
      title: "VERIFIED QC",
      description: "Every purchase comes with our dedicated warranty support and specialized technician assistance."
    },
    {
      icon: BadgePercent,
      title: "BEST PRICING",
      description: "We offer the most competitive prices in the market without compromising on device quality."
    },
    {
      icon: Settings,
      title: "ACCESSORIES & SUPPORT",
      description: "From original chargers to specialized laptop bags and peripherals, we have it all in store."
    },
  ];

  return (
    <section id="services" className="py-24 bg-mesh border-y border-black/5">
      <div className="max-w-7xl mx-auto px-5">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3">OUR SERVICES</h2>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight uppercase text-slate-900">
              BEYOND SELLING. <br /> 
              <span className="text-brand-orange">EXCELLENCE ONLY.</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} delay={i * 0.08} />
          ))}
          <div className="bg-brand-blue text-white rounded-3xl p-8 flex flex-col justify-between group shadow-lg shadow-brand-blue/20">
            <h4 className="text-2xl font-extrabold leading-snug uppercase">500+ Latest <br />Models In Store</h4>
            <div className="grid grid-cols-2 gap-2.5 mt-8">
              <div className="bg-white/15 backdrop-blur-sm p-3 rounded-xl text-xs font-bold uppercase text-center">Business</div>
              <div className="bg-white/15 backdrop-blur-sm p-3 rounded-xl text-xs font-bold uppercase text-center">Developer</div>
              <div className="bg-white/15 backdrop-blur-sm p-3 rounded-xl text-xs font-bold uppercase text-center">High Spec</div>
              <div className="bg-white/15 backdrop-blur-sm p-3 rounded-xl text-xs font-bold uppercase text-center">Student</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
