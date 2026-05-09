import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Wrench, Star, FileText,
  LogOut, Menu, X, Cpu, ChevronRight, ClipboardList, Activity
} from 'lucide-react';
import ProductsTab from './components/ProductsTab';
import StockTab from './components/StockTab';
import ServicesTab from './components/ServicesTab';
import WhyTab from './components/WhyTab';
import ContentTab from './components/ContentTab';

const tabs = [
  { id: 'products', label: 'Products Inventory', icon: Package, desc: 'Manage live stock' },
  { id: 'stock', label: 'Our Stock Gallery', icon: ClipboardList, desc: 'Homepage real stock' },
  { id: 'services', label: 'Services Config', icon: Wrench, desc: 'Configure repair & sales' },
  { id: 'why', label: 'Why Choose Us', icon: Star, desc: 'Customize value points' },
  { id: 'content', label: 'Site Content', icon: FileText, desc: 'Titles, stats & navbar branding' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const username = localStorage.getItem('uc_admin_user') || 'admin';

  const handleLogout = () => {
    localStorage.removeItem('uc_admin_token');
    localStorage.removeItem('uc_admin_user');
    navigate('/uclaptop');
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'products': return <ProductsTab />;
      case 'stock': return <StockTab />;
      case 'services': return <ServicesTab />;
      case 'why': return <WhyTab />;
      case 'content': return <ContentTab />;
      default: return <ProductsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row relative overflow-hidden font-sans admin-theme-light">
      {/* Background Cinematic Lighting Orbs */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with Cinematic Styling */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-[#0F172A] border-r border-white/5 z-50 flex flex-col transition-all duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="w-10 h-10 rounded-xl object-contain shadow-md border border-white/10 shrink-0" 
            />
            <div>
              <div className="text-white font-black text-sm uppercase tracking-widest leading-none">UC Portal</div>
              <div className="text-gray-400 text-[9px] uppercase tracking-[0.3em] font-bold mt-1">Command deck</div>
            </div>
          </div>
        </div>

        {/* System Health / Status Ticker */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/2">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">
              Live Database Connected
            </span>
          </div>
        </div>

        {/* Dynamic Sidebar Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left border border-transparent transition-all group relative cursor-pointer"
                data-active={isActive}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarGlow"
                    className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-xl shadow-inner pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-4.5 h-4.5 shrink-0 relative z-10 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-white'}`} />
                <div className="relative z-10">
                  <div className={`text-xs font-black uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {tab.label}
                  </div>
                  <div className="text-[9px] text-gray-500 group-hover:text-gray-400 transition-colors font-medium mt-0.5">
                    {tab.desc}
                  </div>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto relative z-10 text-blue-400" />}
              </button>
            );
          })}
        </nav>

        {/* User Session card */}
        <div className="p-4 border-t border-white/5 bg-white/1">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-black/40 rounded-xl border border-white/5">
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <span className="text-orange-400 font-black text-xs uppercase">{username[0]}</span>
            </div>
            <div>
              <div className="text-white text-xs font-black uppercase tracking-wider">{username}</div>
              <div className="text-gray-500 text-[9px] uppercase tracking-widest font-black">Authorized Operator</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 text-xs font-black uppercase tracking-wider transition-all border border-transparent hover:border-red-500/10 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            De-authenticate
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Cinematic Header */}
        <header className="bg-[#0c0e14]/70 backdrop-blur-xl border-b border-white/5 px-6 py-4.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/10 px-2 py-0.5 rounded">
                  Active Area
                </span>
              </div>
              <h1 className="text-white font-black uppercase tracking-wider text-lg mt-1">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/2 border border-white/5 px-3 py-1.5 rounded-lg">
              <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Sys_Status: 100% OK</span>
            </div>
            <a
              href="/"
              target="_blank"
              className="text-[10px] text-gray-400 hover:text-white font-black uppercase tracking-widest flex items-center gap-2 border border-white/10 px-4 py-2.5 rounded-xl hover:border-white/20 transition-all bg-[#111218]/40 backdrop-blur-sm cursor-pointer"
            >
              Access Website ↗
            </a>
          </div>
        </header>

        {/* Tab Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
