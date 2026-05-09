import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageSelected: (url: string) => void;
}

export default function ImageUploader({ currentImage, onImageSelected }: ImageUploaderProps) {
  const [preview, setPreview] = useState(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

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
      onImageSelected(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreview('');
    onImageSelected('');
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      {/* Input area */}
      <div>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-xl p-6 text-center cursor-pointer transition-all group bg-white/2"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <p className="text-gray-400 text-sm">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <p className="text-gray-400 text-sm font-medium">Click to upload image</p>
              <p className="text-gray-600 text-xs">PNG, JPG, WEBP up to 10MB</p>
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

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3">
          {error}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain"
            onError={() => {
              setError('Could not load image. Check that the URL is accessible.');
            }}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-red-600/80 rounded-full flex items-center justify-center text-white transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm py-2 px-3">
            <p className="text-white text-[10px] font-bold truncate">{preview}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
