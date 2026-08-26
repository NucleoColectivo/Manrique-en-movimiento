import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';
import { useEffect } from 'react';

interface ImageModalProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export function ImageModal({ src, alt = 'Imagen', onClose }: ImageModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (src) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (src) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-4 z-[110]">
            <a
              href={src}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-white hover:text-gold transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full flex items-center gap-2 backdrop-blur-md"
              title="Guardar imagen"
            >
              <Download size={24} />
              <span className="hidden md:inline text-sm font-extrabold uppercase tracking-widest pr-2">Guardar</span>
            </a>
            
            <button 
              className="text-white hover:text-orange transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md"
              onClick={onClose}
              title="Cerrar"
            >
              <X size={24} />
            </button>
          </div>

          <motion.img
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={src}
            alt={alt}
            className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
