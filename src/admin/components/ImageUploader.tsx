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

  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const maxWidth = 1600;
          const maxHeight = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            resolve(dataUrl);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = () => resolve(event.target?.result as string);
      };
      reader.onerror = () => {
        // Fallback
        resolve('');
      };
    });
  };

  const handleLocalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      // First compress the image for high speed & web optimization
      const compressedDataUrl = await compressImageFile(file);
      
      // Try backend server upload if available
      try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.url) {
            setPreview(data.url);
            setUrlInput(data.url);
            onImageSelected(data.url);
            return;
          }
        }
      } catch {
        // Server upload endpoint unreachable or on serverless lambda, use optimized Base64
      }

      // If backend disk upload isn't available, use the compressed Data URL
      if (compressedDataUrl) {
        setPreview(compressedDataUrl);
        setUrlInput(compressedDataUrl);
        onImageSelected(compressedDataUrl);
      } else {
        throw new Error('Could not process selected image.');
      }
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
