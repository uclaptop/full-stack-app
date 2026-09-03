import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Loader2, 
  Flame, Image as ImageIcon, Sparkles, Filter, Search, Check, Tag 
} from 'lucide-react';
import ImageUploader from './ImageUploader';
import { useApp } from '../../context/AppContext';

interface Product {
  id: number;
  name: string;
  brand: string;
  specs: string;
  category: string;
  tag: string;
  price: number | string;
  mrp: number | string;
  image_url: string;
  secondary_image_url?: string;
  gallery_images?: string;
  is_trending?: boolean;
  description?: string;
  sku?: string;
  sort_order: number;
  is_active: boolean;
}

const BRANDS = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'Samsung', 'Accessories', 'Other'];

const CATEGORIES = [
  'Laptops',
  'Tiny PC',
  'Monitors',
  'Desktops',
  'Peripherals',
  'Business',
  'High Performance',
  'Student',
  'Developer',
  'Graphics & Gaming',
];

const TAGS = ['', 'Trending Deal'];

const token = () => localStorage.getItem('uc_admin_token') || '';
const authHeader = () => ({ Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' });

export default function ProductsTab() {
  const { refreshProducts } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'trending' | 'active' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    name: '',
    brand: 'Dell',
    specs: '',
    category: 'Laptops',
    tag: '',
    price: '' as number | string,
    mrp: '' as number | string,
    image_url: '',
    secondary_image_url: '',
    image_3: '',
    image_4: '',
    is_trending: false,
    description: '',
    sku: '',
    sort_order: 0,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/products/all', { headers: authHeader() });
      if (r.ok) setProducts(await r.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      name: '',
      brand: 'Dell',
      specs: '',
      category: 'Laptops',
      tag: 'Trending Deal',
      price: '',
      mrp: '',
      image_url: '',
      secondary_image_url: '',
      image_3: '',
      image_4: '',
      is_trending: true,
      description: '',
      sku: `UC-${Date.now().toString().slice(-6)}`,
      sort_order: products.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    const gallery = p.gallery_images ? p.gallery_images.split(',').map(s => s.trim()) : [];
    const isTrend = Boolean(p.is_trending) || p.tag === 'Trending Deal';
    setForm({
      name: p.name,
      brand: p.brand || 'Dell',
      specs: p.specs || '',
      category: p.category || 'Laptops',
      tag: isTrend ? 'Trending Deal' : '',
      price: p.price ?? '',
      mrp: p.mrp ?? '',
      image_url: p.image_url,
      secondary_image_url: p.secondary_image_url || '',
      image_3: gallery[0] || '',
      image_4: gallery[1] || '',
      is_trending: isTrend,
      description: p.description || '',
      sku: p.sku || `UC-DL${p.id}`,
      sort_order: p.sort_order,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.image_url.trim()) return;
    setSaving(true);
    try {
      const galleryList = [form.image_3, form.image_4].filter(Boolean).join(',');
      const payload = {
        ...form,
        tag: form.is_trending ? 'Trending Deal' : '',
        gallery_images: galleryList,
        price: Number(form.price) || 0,
        mrp: Number(form.mrp) || 0,
      };

      const url = editing ? `/api/products/${editing.id}` : '/api/products';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: authHeader(),
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setModalOpen(false);
        fetchProducts();
        refreshProducts();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id: number) => {
    await fetch(`/api/products/${id}/toggle`, { method: 'PUT', headers: authHeader() });
    fetchProducts();
    refreshProducts();
  };

  const handleToggleTrending = async (id: number) => {
    await fetch(`/api/products/${id}/toggle-trending`, { method: 'PUT', headers: authHeader() });
    fetchProducts();
    refreshProducts();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE', headers: authHeader() });
    setDeleteId(null);
    fetchProducts();
    refreshProducts();
  };

  const activeCount = products.filter(p => p.is_active).length;
  const trendingCount = products.filter(p => p.is_trending || p.tag === 'Trending Deal').length;

  const numPrice = Number(form.price) || 0;
  const numMrp = Number(form.mrp) || 0;
  const calculatedSavings = Math.max(0, numMrp - numPrice);
  const calculatedDiscount = numMrp > 0 && numPrice > 0 ? Math.round(((numMrp - numPrice) / numMrp) * 100) : 0;

  // Filter products for the table
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterTab === 'trending') return p.is_trending || p.tag === 'Trending Deal';
    if (filterTab === 'active') return p.is_active;
    if (filterTab === 'hidden') return !p.is_active;
    return true;
  });

  return (
    <div className="space-y-6 font-['Inter',sans-serif] text-slate-900">
      
      {/* ── TOP HEADER & ACTIONS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inventory & Products Manager
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            {products.length} Total Hardware Items • <span className="text-emerald-600 font-bold">{activeCount} Live</span> • <span className="text-amber-600 font-bold">{trendingCount} in Trending Section</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#0B1E3D] hover:bg-[#133da6] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#E8A93B]" /> Create Product
          </motion.button>
        </div>
      </div>

      {/* ── FILTER TABS & SEARCH BAR ── */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white border border-slate-200/90 p-3 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              filterTab === 'all' 
                ? 'bg-[#0B1E3D] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Products ({products.length})
          </button>
          
          <button
            onClick={() => setFilterTab('trending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              filterTab === 'trending' 
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs' 
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current text-amber-500" /> Trending Deals Only ({trendingCount})
          </button>

          <button
            onClick={() => setFilterTab('active')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              filterTab === 'active' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            Active ({activeCount})
          </button>

          <button
            onClick={() => setFilterTab('hidden')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              filterTab === 'hidden' 
                ? 'bg-slate-700 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Hidden ({products.length - activeCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, category..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder:text-slate-400 text-xs outline-none focus:border-brand-blue focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* ── PRODUCTS TABLE (CLEAN WHITE PROFESSIONAL THEME) ── */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#0B1E3D] animate-spin" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
          <p className="text-slate-500 text-sm font-medium">No products match this view. Click "Create Product" to add items.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50/80">
                <th className="px-5 py-4">Image(s)</th>
                <th className="px-5 py-4">Product Details</th>
                <th className="px-4 py-4">Pricing (Offer / MRP)</th>
                <th className="px-4 py-4">Margin Saved</th>
                <th className="px-4 py-4 text-center">Trending Toggle</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(p => {
                const itemPrice = Number(p.price) || 0;
                const itemMrp = Number(p.mrp) || 0;
                const savings = Math.max(0, itemMrp - itemPrice);
                const isTrendingItem = p.is_trending || p.tag === 'Trending Deal';
                const galleryCount = [p.image_url, p.secondary_image_url, ...(p.gallery_images ? p.gallery_images.split(',') : [])].filter(Boolean).length;

                return (
                  <motion.tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Thumbnail */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 p-1 shrink-0 relative group flex items-center justify-center">
                          <img src={p.image_url} alt={p.name} className="w-full h-full object-contain" />
                          <span className="absolute -top-1 -right-1 bg-[#0B1E3D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full" title={`${galleryCount} camera angles`}>
                            {galleryCount}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Name & Specs */}
                    <td className="px-5 py-4 max-w-sm">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-slate-900 font-bold text-sm leading-snug">{p.name}</span>
                        {isTrendingItem && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <Flame className="w-2.5 h-2.5 fill-current text-amber-600" /> Trending
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                        <span className="text-brand-blue font-bold">{p.brand}</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
                          {p.category}
                        </span>
                        <span>•</span>
                        <span className="truncate max-w-xs">{p.specs}</span>
                      </div>
                    </td>

                    {/* Pricing */}
                    <td className="px-4 py-4">
                      <div className="text-sm font-bold text-slate-900">
                        ₹{itemPrice.toLocaleString('en-IN')}
                      </div>
                      {itemMrp > itemPrice && (
                        <div className="text-xs text-red-600 line-through font-normal">
                          MRP ₹{itemMrp.toLocaleString('en-IN')}
                        </div>
                      )}
                    </td>

                    {/* Margin Saved */}
                    <td className="px-4 py-4">
                      {savings > 0 ? (
                        <span className="bg-[#85221b] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-xs inline-block">
                          Save ₹{savings.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>

                    {/* 1-Click Trending Toggle */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleToggleTrending(p.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                          isTrendingItem
                            ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs ring-2 ring-amber-400/20'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                        }`}
                        title="Click to toggle display on the Trending Deals section"
                      >
                        <Flame className={`w-3.5 h-3.5 ${isTrendingItem ? 'fill-current text-amber-600' : 'text-slate-400'}`} />
                        {isTrendingItem ? 'Trending Active' : 'Set Trending'}
                      </button>
                    </td>

                    {/* Visibility */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleToggle(p.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                          p.is_active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {p.is_active ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                        {p.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-8 h-8 bg-slate-100 hover:bg-[#0B1E3D] hover:text-white text-slate-700 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                          title="Edit Product"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="w-8 h-8 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── CREATE / EDIT PRODUCT MODAL (HIGH-CONTRAST CLEAN THEME) ── */}
      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={e => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl my-6 font-['Inter',sans-serif] text-slate-900"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {editing ? 'Edit Hardware Product' : 'Create New Hardware Product'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure pricing, assign category, upload 4 camera angles, and toggle trending status
                  </p>
                </div>
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                
                {/* ── TRENDING TOGGLE CARD ── */}
                <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5 fill-current text-amber-500" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-amber-900 block">
                        Trending Deals Section Feature
                      </span>
                      <span className="text-[11px] text-amber-800/80">
                        When enabled, this product will appear in the "Trending Tech Deals" section on the storefront
                      </span>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_trending}
                      onChange={e => setForm(f => ({ 
                        ...f, 
                        is_trending: e.target.checked,
                        tag: e.target.checked ? 'Trending Deal' : ''
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* ── PRODUCT TITLE & SKU ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Dell Latitude 5410 i7 10th Gen Refurbished Laptop"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      SKU / Model Number
                    </label>
                    <input
                      type="text"
                      value={form.sku}
                      onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                      placeholder="e.g. EPW-DL5410-I7-10TH"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white text-sm font-mono transition-all"
                    />
                  </div>
                </div>

                {/* ── CATEGORY, BRAND & PROMO TAG ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Category *
                    </label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 outline-none focus:border-brand-blue focus:bg-white text-sm font-semibold transition-all cursor-pointer"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Brand
                    </label>
                    <select
                      value={form.brand}
                      onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all cursor-pointer"
                    >
                      {BRANDS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Promo Tag
                    </label>
                    <select
                      value={form.tag}
                      onChange={e => setForm(f => ({ 
                        ...f, 
                        tag: e.target.value,
                        is_trending: e.target.value === 'Trending Deal'
                      }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all cursor-pointer"
                    >
                      {TAGS.map(t => (
                        <option key={t} value={t}>{t || 'No Badge'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ── HARDWARE SPECIFICATIONS ── */}
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                    Hardware Specifications *
                  </label>
                  <input
                    type="text"
                    value={form.specs}
                    onChange={e => setForm(f => ({ ...f, specs: e.target.value }))}
                    placeholder="e.g. Intel Core i7 10th Gen | 16GB RAM | 512GB NVMe SSD | 14.0 FHD IPS"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white text-sm transition-all"
                  />
                </div>

                {/* ── PRICING & AUTO-MARGIN CALCULATION ── */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-emerald-800 mb-1.5 block">
                        Selling Offer Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                        placeholder="e.g. 33434"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 text-sm font-bold shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-red-800 mb-1.5 block">
                        Showroom MRP Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={form.mrp}
                        onChange={e => setForm(f => ({ ...f, mrp: e.target.value }))}
                        placeholder="e.g. 86000"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-red-600 text-sm font-bold shadow-2xs"
                      />
                    </div>
                  </div>

                  {numMrp > 0 && numPrice > 0 && (
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 mt-2 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#85221b] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                          Save ₹{calculatedSavings.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-600 font-medium">({calculatedDiscount}% Off Showroom Price)</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Live Margin</span>
                    </div>
                  )}
                </div>

                {/* ── 4 MULTIPLE IMAGE SLOTS (SPACIOUS 2×2 GRID) ── */}
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                      Multiple Camera Angles (Amazon Web Links & Local Uploads)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Paste direct Amazon image links or choose local device files for all 4 product views
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Slot 1 */}
                    <ImageUploader
                      label="Slot 1: Front View (Primary Cover)"
                      subtitle="Main front-facing laptop photo shown across product cards"
                      currentImage={form.image_url}
                      onImageSelected={url => setForm(f => ({ ...f, image_url: url }))}
                    />

                    {/* Slot 2 */}
                    <ImageUploader
                      label="Slot 2: Screen Open / 45° Angle"
                      subtitle="Displays screen display and smooth hover transition"
                      currentImage={form.secondary_image_url}
                      onImageSelected={url => setForm(f => ({ ...f, secondary_image_url: url }))}
                    />

                    {/* Slot 3 */}
                    <ImageUploader
                      label="Slot 3: Keyboard & Trackpad Top View"
                      subtitle="Top deck layout view for Spotlight multi-angle gallery"
                      currentImage={form.image_3}
                      onImageSelected={url => setForm(f => ({ ...f, image_3: url }))}
                    />

                    {/* Slot 4 */}
                    <ImageUploader
                      label="Slot 4: Side Ports & Profile View"
                      subtitle="Shows USB/HDMI ports and slim chassis profile"
                      currentImage={form.image_4}
                      onImageSelected={url => setForm(f => ({ ...f, image_4: url }))}
                    />
                  </div>
                </div>

              </div>

              {/* ── MODAL ACTION BUTTONS ── */}
              <div className="flex items-center gap-3 mt-8 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  onClick={handleSave}
                  disabled={saving || !form.name || !form.image_url || !form.specs}
                  className="flex-1 bg-[#0B1E3D] hover:bg-[#133da6] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0B1E3D]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin text-[#E8A93B]" /> : <Save className="w-4 h-4 text-[#E8A93B]" />}
                  {saving ? 'Saving Product...' : 'Save Product'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DELETE CONFIRMATION ── */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-sm text-slate-900 shadow-2xl"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-1">Delete Product?</h3>
              <p className="text-slate-500 text-xs mb-6">This item will be permanently removed from your catalog.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold text-xs transition-colors">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
