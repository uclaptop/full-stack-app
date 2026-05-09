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
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-6">PRODDATUR'S TECH HUB</h2>
              <h3 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-10 uppercase">
                TRUSTED <br /> 
                <span className="text-black/20 italic">SINCE 2015.</span>
              </h3>
              <p className="text-black/60 text-xl mb-12 leading-relaxed font-medium">
                Universal Computers (UC) has been a leading technological hub for over 9 years. 
                Our focus has always been on bridging the gap between premium tech and 
                affordable pricing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 sm:p-12 bg-black/5 border border-black/10 rounded-[40px]">
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
    whileHover={{ y: -10 }}
    className="glass p-8 rounded-3xl group transition-all"
  >
    <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-500">
      <Icon className="w-7 h-7 group-hover:text-white text-brand-blue transition-colors" />
    </div>
    <h4 className="text-xl font-bold mb-4">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export const Services = () => {
  const services = [
    {
      icon: Laptop,
      title: "PREMIUM BUILDS",
      description: "Imported laptops in A+++ scratch-less condition. Guaranteed performance at half the price."
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
      title: "SUPPORT SET",
      description: "From original chargers to specialized laptop bags and peripherals, we have it all in store."
    },
  ];

  return (
    <section id="services" className="py-32 bg-mesh border-y border-black/5">
      <div className="max-w-7xl mx-auto px-5">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue mb-6">OUR SERVICES</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              BEYOND SELLING. <br /> 
              <span className="text-brand-orange italic">EXCELLENCE ONLY.</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} delay={i * 0.1} />
          ))}
          <div className="bg-brand-blue rounded-3xl p-10 flex flex-col justify-between group">
            <h4 className="text-3xl font-black leading-none italic uppercase">50+ Latest <br />Models In Store</h4>
            <div className="grid grid-cols-2 gap-3 mt-10">
              <div className="bg-black/20 p-3 rounded-xl text-[10px] font-black uppercase text-center">Business</div>
              <div className="bg-black/20 p-3 rounded-xl text-[10px] font-black uppercase text-center">Gaming</div>
              <div className="bg-black/20 p-3 rounded-xl text-[10px] font-black uppercase text-center">Workstation</div>
              <div className="bg-black/20 p-3 rounded-xl text-[10px] font-black uppercase text-center">Student</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
