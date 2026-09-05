import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Wrench, Star, FileText,
  LogOut, Menu, X, ChevronRight, ClipboardList, Activity, ExternalLink, Sparkles
} from 'lucide-react';
import ProductsTab from './components/ProductsTab';
import BannersTab from './components/BannersTab';
import StockTab from './components/StockTab';
import ServicesTab from './components/ServicesTab';
import WhyTab from './components/WhyTab';
import ContentTab from './components/ContentTab';
import TickersTab from './components/TickersTab';

const tabs = [
  { id: 'products', label: 'Products Inventory', icon: Package, desc: 'Manage stock & pricing' },
  { id: 'banners', label: 'Hero Banners', icon: LayoutDashboard, desc: 'Edit slides & banner photos' },
  { id: 'tickers', label: 'Scrolling Ticker Bars', icon: Sparkles, desc: 'Edit running banner texts' },
  { id: 'content', label: 'Store Content', icon: FileText, desc: 'Titles, hours & phone numbers' },
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
      case 'banners': return <BannersTab />;
      case 'tickers': return <TickersTab />;
      case 'content': return <ContentTab />;
      default: return <ProductsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row relative overflow-hidden font-['Inter',sans-serif]">
      
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR (DEEP NAVY THEME) ── */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-[#0B1E3D] border-r border-[#133da6]/30 z-50 flex flex-col transition-all duration-300 transform font-['Inter',sans-serif] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2.5 py-1 rounded-xl shadow-xs inline-flex items-center shrink-0">
              <img 
                src="/logo.png" 
                alt="Universal Computers" 
                className="h-7 w-auto max-w-[130px] object-contain" 
              />
            </div>
            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider leading-none">Admin Hub</div>
              <div className="text-[#E8A93B] text-[10px] font-semibold mt-1">Universal Computers</div>
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="px-6 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-slate-300">
              Neon Cloud DB Live
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all group relative cursor-pointer ${
                  isActive 
                    ? 'bg-white/10 text-white font-bold shadow-xs border border-white/10' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#E8A93B]' : 'text-slate-400 group-hover:text-white'}`} />
                <div>
                  <div className="text-xs font-bold tracking-normal leading-tight">
                    {tab.label}
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover:text-slate-300 font-normal mt-0.5">
                    {tab.desc}
                  </div>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#E8A93B]" />}
              </button>
            );
          })}
        </nav>

        {/* User Session card */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center justify-between px-3 py-2 mb-2 bg-[#133da6]/20 rounded-xl border border-white/10">
            <div>
              <div className="text-white text-xs font-bold">{username}</div>
              <div className="text-slate-400 text-[10px]">Store Administrator</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-300 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout Portal
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 bg-[#F8FAFC]">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="lg:hidden text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-slate-900 font-bold text-base sm:text-lg tracking-tight">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white bg-[#0B1E3D] hover:bg-[#133da6] font-bold flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Open Website <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Tab Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
