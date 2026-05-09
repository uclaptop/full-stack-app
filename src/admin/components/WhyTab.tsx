import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WhyPoint {
  id: number;
  point: string;
  sort_order: number;
  is_active: boolean;
}

const token = () => localStorage.getItem('uc_admin_token') || '';
const authHeader = () => ({ Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' });

export default function WhyTab() {
  const { refreshWhy } = useApp();
  const [points, setPoints] = useState<WhyPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WhyPoint | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ point: '', sort_order: 0, is_active: true });

  const fetchPoints = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/why/all', { headers: authHeader() });
      if (r.ok) setPoints(await r.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchPoints(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ point: '', sort_order: points.length + 1, is_active: true });
    setModalOpen(true);
  };

  const openEdit = (p: WhyPoint) => {
    setEditing(p);
    setForm({ point: p.point, sort_order: p.sort_order, is_active: p.is_active });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.point.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `/api/why/${editing.id}` : '/api/why';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(form) });
      if (res.ok) { 
        setModalOpen(false); 
        fetchPoints(); 
        refreshWhy(); // update frontend context immediately
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/why/${id}`, { method: 'DELETE', headers: authHeader() });
    setDeleteId(null);
    fetchPoints();
    refreshWhy(); // update frontend context immediately
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-xl uppercase tracking-wider">Why Choose Us</h2>
          <p className="text-gray-500 text-xs mt-1">{points.filter(p => p.is_active).length} active points</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-colors">
          <Plus className="w-4 h-4" /> Add Point
        </motion.button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="w-8 h-8 text-blue-400 animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {points.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 bg-[#111218] border rounded-xl px-5 py-4 ${p.is_active ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${p.is_active ? 'text-orange-400' : 'text-gray-600'}`} />
              <span className="text-white font-bold text-sm flex-1">{p.point}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full hidden sm:block ${p.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                  {p.is_active ? 'Visible' : 'Hidden'}
                </span>
                <button onClick={() => openEdit(p)} className="w-7 h-7 bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 text-gray-400 rounded-lg flex items-center justify-center transition-all">
                  <Pencil className="w-3 h-3" />
                </button>
                <button onClick={() => setDeleteId(p.id)} className="w-7 h-7 bg-white/5 hover:bg-red-600/20 hover:text-red-400 text-gray-400 rounded-lg flex items-center justify-center transition-all">
                  <Trash2 className="w-3 h-3" />
                </button>
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
                <h3 className="text-white font-black text-lg uppercase tracking-wider">{editing ? 'Edit Point' : 'Add Point'}</h3>
                <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Selling Point</label>
                  <textarea rows={2} value={form.point} onChange={e => setForm(f => ({ ...f, point: e.target.value }))}
                    placeholder="e.g. 40-Point Rigorous Quality Testing"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm resize-none" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Sort Order</label>
                  <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 text-sm" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="w-4 h-4 rounded accent-blue-600" />
                  <span className="text-sm text-gray-300 font-bold">Visible on site</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModalOpen(false)} className="flex-1 bg-white/5 text-gray-400 py-3 rounded-xl font-bold text-sm">Cancel</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || !form.point}
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
              <h3 className="text-white font-black text-lg mb-2">Delete Point?</h3>
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
