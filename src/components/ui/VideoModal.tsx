import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
  title?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoId = 'VFmeCbiblmI',
  title = 'Cortometraje: Manrique, Memoria en Movimiento'
}: VideoModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10"
          onClick={onClose}
        >
          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 flex items-center justify-between z-[110] pointer-events-none">
            <div className="text-white font-barlow text-lg md:text-2xl uppercase tracking-wider font-extrabold truncate pr-4 pointer-events-auto drop-shadow-md">
              {title}
            </div>

            <div className="flex items-center gap-3 pointer-events-auto">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white hover:text-orange transition-colors bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full flex items-center gap-2 backdrop-blur-md text-xs md:text-sm font-extrabold uppercase tracking-widest border border-white/10"
                title="Abrir en YouTube"
              >
                <ExternalLink size={18} />
                <span className="hidden sm:inline">Abrir en YouTube</span>
              </a>
              
              <button 
                className="text-white hover:text-orange transition-colors bg-white/10 hover:bg-white/20 p-2.5 md:p-3 rounded-full backdrop-blur-md border border-white/10"
                onClick={onClose}
                title="Cerrar reproductor"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Video Container (16:9) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-5xl aspect-video rounded-[18px] md:rounded-[24px] overflow-hidden shadow-2xl border border-white/20 bg-black relative mt-10 md:mt-12"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
