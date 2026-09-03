import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Link2, X, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageSelected: (url: string) => void;
  label?: string;
  subtitle?: string;
}

export default function ImageUploader({ currentImage = '', onImageSelected, label, subtitle }: ImageUploaderProps) {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [preview, setPreview] = useState(currentImage || '');
  const [urlInput, setUrlInput] = useState(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage || '');
    setUrlInput(currentImage || '');
  }, [currentImage]);

  const token = localStorage.getItem('uc_admin_token');

  const handleLocalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setPreview(data.url);
      setUrlInput(data.url);
      onImageSelected(data.url);
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setUrlInput(url);
    setError('');
    if (!url.trim()) {
      setPreview('');
      onImageSelected('');
      return;
    }
    setPreview(url.trim());
    onImageSelected(url.trim());
  };

  const clearImage = () => {
    setPreview('');
    setUrlInput('');
    onImageSelected('');
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 font-['Inter',sans-serif] text-slate-900">
      
      {/* Slot Header */}
      <div>
        {label && (
          <span className="text-xs font-bold text-slate-900 block">
            {label}
          </span>
        )}
        {subtitle && (
          <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
            {subtitle}
          </span>
        )}
      </div>

      {/* Segmented Mode Switcher (Clean Modern Tab Pills) */}
      <div className="grid grid-cols-2 gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            mode === 'url'
              ? 'bg-[#0B1E3D] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Amazon / Web Link</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            mode === 'upload'
              ? 'bg-[#0B1E3D] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Local Device</span>
        </button>
      </div>

      {/* Input Action Area */}
      {mode === 'url' ? (
        <div className="space-y-1">
          <div className="relative flex items-center">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="Paste image link from Amazon or Web..."
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 text-xs outline-none focus:border-brand-blue pr-8 shadow-2xs"
            />
            {urlInput && (
              <button
                type="button"
                onClick={clearImage}
                className="absolute right-2.5 text-slate-400 hover:text-slate-700 p-0.5"
                title="Clear link"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl py-3 px-2 text-center cursor-pointer transition-all bg-white hover:bg-slate-50"
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-2 py-1">
                <Loader2 className="w-4 h-4 text-brand-blue animate-spin" />
                <span className="text-slate-600 text-xs font-medium">Uploading image...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 py-1 text-slate-700">
                <Upload className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold">Choose image from device</span>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleLocalUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-[11px] rounded-lg p-2 font-medium">
          {error}
        </div>
      )}

      {/* Image Preview Box */}
      {preview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-xl overflow-hidden border border-slate-200 bg-white h-32 p-2 flex items-center justify-center group shadow-2xs"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
            onError={() => setError('Unable to render image. Check that URL is valid.')}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-slate-900/80 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white/60 h-20 flex flex-col items-center justify-center text-slate-400">
          <ImageIcon className="w-5 h-5 mb-1 stroke-[1.5]" />
          <span className="text-[10px] font-medium">No image added yet</span>
        </div>
      )}

    </div>
  );
}
