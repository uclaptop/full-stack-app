import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Loader2, Tag } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { useApp } from '../../context/AppContext';

interface Product {
  id: number;
  name: string;
  brand: string;
  specs: string;
  category: string;
  tag: string;
  price: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

const BRANDS = ['Dell', 'HP', 'Lenovo', 'Apple', 'Accessories', 'Other'];
const CATEGORIES = [
  'Business',
  'High Performance',
  'Graphics',
  'Student',
  'Developer',
  'Accessories',
];
const TAGS = ['', 'Best Seller', 'New', 'Offer'];

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

  const [form, setForm] = useState({
    name: '',
    brand: 'Dell',
    specs: '',
    category: 'Business',
    tag: '',
    price: '',
    image_url: '',
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
      category: 'Business',
      tag: '',
      price: '',
      image_url: '',
      sort_order: products.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      brand: p.brand || 'Dell',
      specs: p.specs || '',
      category: p.category || 'Business',
      tag: p.tag || '',
      price: p.price || '',
      image_url: p.image_url,
      sort_order: p.sort_order,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.image_url.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `/api/products/${editing.id}` : '/api/products';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: authHeader(),
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModalOpen(false);
        fetchProducts();
        refreshProducts(); // update global context state
      }
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id: number) => {
    await fetch(`/api/products/${id}/toggle`, { method: 'PUT', headers: authHeader() });
    fetchProducts();
    refreshProducts(); // update global context state
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE', headers: authHeader() });
    setDeleteId(null);
    fetchProducts();
    refreshProducts(); // update global context state
  };

  const activeCount = products.filter(p => p.is_active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-xl uppercase tracking-wider">Products (Live Inventory)</h2>
          <p className="text-gray-500 text-xs mt-1">{activeCount} active / {products.length} total</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </motion.button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      ) : (
        <div className="bg-[#111218] border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">Product</th>
                <th className="text-left px-4 py-4 text-xs font-black uppercase tracking-widest text-gray-500 hidden md:table-cell">Brand</th>
                <th className="text-left px-4 py-4 text-xs font-black uppercase tracking-widest text-gray-500 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-4 text-xs font-black uppercase tracking-widest text-gray-500 hidden lg:table-cell">Specs</th>
                <th className="text-left px-4 py-4 text-xs font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="text-right px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div>
                        <span className="text-white font-bold text-sm block">{p.name}</span>
                        {p.tag && (
                          <span className="inline-flex items-center gap-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full mt-1 border border-blue-500/10">
                            <Tag className="w-2 h-2" />
                            {p.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs font-bold text-gray-400">{p.brand}</span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-full">{p.category}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-gray-400 text-xs font-medium">{p.specs}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleToggle(p.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                        p.is_active
                          ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                          : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      }`}
                    >
                      {p.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {p.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="w-8 h-8 bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 text-gray-400 rounded-lg flex items-center justify-center transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="w-8 h-8 bg-white/5 hover:bg-red-600/20 hover:text-red-400 text-gray-400 rounded-lg flex items-center justify-center transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111218] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-black text-lg uppercase tracking-wider">
                  {editing ? 'Edit Product' : 'Add Product'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Dell Latitude 5420"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Brand</label>
                    <select
                      value={form.brand}
                      onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm"
                    >
                      {BRANDS.map(b => <option key={b} value={b} className="bg-[#111218]">{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111218]">{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Specifications *</label>
                  <input
                    type="text"
                    value={form.specs}
                    onChange={e => setForm(f => ({ ...f, specs: e.target.value }))}
                    placeholder="e.g. i5 11th Gen | 8GB | 256GB SSD"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Promo Tag</label>
                    <select
                      value={form.tag}
                      onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm"
                    >
                      {TAGS.map(t => <option key={t} value={t} className="bg-[#111218]">{t || 'None'}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Sort Order</label>
                    <input
                      type="number"
                      value={form.sort_order}
                      onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Image *</label>
                  <ImageUploader
                    currentImage={form.image_url}
                    onImageSelected={url => setForm(f => ({ ...f, image_url: url }))}
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">
                    Or paste image URL directly
                  </label>
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                    placeholder="/filename.png or https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saving || !form.name || !form.image_url || !form.specs}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save Product'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#111218] border border-white/10 rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-white font-black text-lg mb-2">Delete Product?</h3>
              <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 bg-white/5 text-gray-400 py-3 rounded-xl font-bold text-sm">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold text-sm transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
