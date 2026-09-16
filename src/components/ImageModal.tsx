import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-xs inline-flex items-center gap-1 px-2.5"
          >
            <span>เปิดภาพต้นฉบับ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <img
          src={imageUrl}
          alt="รูปภาพประกอบข่าว"
          className="max-h-[85vh] w-auto object-contain mx-auto"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
