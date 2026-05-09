import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
}

const ICONS = ['Laptop', 'Cpu', 'ShieldCheck', 'BadgePercent', 'Settings', 'Wrench', 'Star', 'Zap', 'Globe', 'Heart'];

const token = () => localStorage.getItem('uc_admin_token') || '';
const authHeader = () => ({ Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' });

export default function ServicesTab() {
  const { refreshServices } = useApp();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', description: '', icon_name: 'Laptop', sort_order: 0, is_active: true });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/services/all', { headers: authHeader() });
      if (r.ok) setServices(await r.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchServices(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', description: '', icon_name: 'Laptop', sort_order: services.length + 1, is_active: true });
    setModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description, icon_name: s.icon_name, sort_order: s.sort_order, is_active: s.is_active });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/services/${editing.id}` : '/api/services';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(form) });
      if (res.ok) { 
        setModalOpen(false); 
        fetchServices(); 
        refreshServices(); // update frontend context immediately
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/services/${id}`, { method: 'DELETE', headers: authHeader() });
    setDeleteId(null);
    fetchServices();
    refreshServices(); // update frontend context immediately
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-xl uppercase tracking-wider">Services</h2>
          <p className="text-gray-500 text-xs mt-1">{services.length} service cards</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-colors">
          <Plus className="w-4 h-4" />Add Service
        </motion.button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="w-8 h-8 text-blue-400 animate-spin" /></div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className={`bg-[#111218] border rounded-2xl p-5 ${s.is_active ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1 block">{s.icon_name}</span>
                  <h3 className="text-white font-black text-sm uppercase tracking-wider">{s.title}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="w-7 h-7 bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 text-gray-400 rounded-lg flex items-center justify-center transition-all">
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button onClick={() => setDeleteId(s.id)} className="w-7 h-7 bg-white/5 hover:bg-red-600/20 hover:text-red-400 text-gray-400 rounded-lg flex items-center justify-center transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{s.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                  {s.is_active ? 'Visible' : 'Hidden'}
                </span>
                <span className="text-gray-600 text-[10px]">Order: {s.sort_order}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#111218] border border-white/10 rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-black text-lg uppercase tracking-wider">{editing ? 'Edit Service' : 'Add Service'}</h3>
                <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Title</label>
                  <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Icon</label>
                    <select value={form.icon_name} onChange={e => setForm(f => ({ ...f, icon_name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm">
                      {ICONS.map(i => <option key={i} value={i} className="bg-[#111218]">{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Sort Order</label>
                    <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm" />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="w-4 h-4 rounded accent-blue-600" />
                  <span className="text-sm text-gray-300 font-bold">Visible on site</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModalOpen(false)} className="flex-1 bg-white/5 text-gray-400 py-3 rounded-xl font-bold text-sm">Cancel</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#111218] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-white font-black text-lg mb-2">Delete Service?</h3>
              <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 bg-white/5 text-gray-400 py-3 rounded-xl font-bold text-sm">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold text-sm">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
