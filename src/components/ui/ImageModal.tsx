import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Maximize, Minimize, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useEffect, useState, useRef, type MouseEvent } from 'react';

interface ImageModalProps {
  src: string | null;
  alt?: string;
  title?: string;
  author?: string;
  year?: string;
  onClose: () => void;
}

export function ImageModal({ src, alt = 'Fotografía histórica', title, author, year, onClose }: ImageModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key, zoom with +/-
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + 0.25, 3));
      if (e.key === '-') setZoom(z => Math.max(z - 0.25, 0.75));
      if (e.key === '0') setZoom(1);
    };
    if (src) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
  }, [src]);

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

  // Fullscreen listener
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  const handleDownload = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!src || isDownloading) return;
    setIsDownloading(true);
    try {
      const response = await fetch(src, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      const cleanName = (title || alt || 'manrique-archivo-patrimonial')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      a.download = `${cleanName}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // Fallback
      window.open(src, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-between bg-black/95 backdrop-blur-md p-4 md:p-6"
          onClick={onClose}
        >
          {/* Top Bar with Title and Actions */}
          <div 
            className="w-full flex items-center justify-between gap-4 z-[130] max-w-7xl mx-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-white/90">
              {title && <h3 className="font-editorial text-lg md:text-2xl text-white line-clamp-1">{title}</h3>}
              <div className="flex items-center gap-3 text-xs text-white/60 font-mono mt-0.5">
                {year && <span>{year}</span>}
                {year && author && <span>•</span>}
                {author && <span>{author}</span>}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Zoom Controls (hidden on mobile, visible on tablet/desktop) */}
              <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-md rounded-full px-2 py-1 text-white border border-white/15">
                <button
                  type="button"
                  onClick={() => setZoom(z => Math.max(z - 0.25, 0.75))}
                  className="p-1.5 hover:text-orange transition-colors"
                  title="Alejar (-)"
                >
                  <ZoomOut size={18} />
                </button>
                <span className="text-xs px-2 font-mono w-12 text-center text-white/80">{Math.round(zoom * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setZoom(z => Math.min(z + 0.25, 3))}
                  className="p-1.5 hover:text-orange transition-colors"
                  title="Acercar (+)"
                >
                  <ZoomIn size={18} />
                </button>
                {zoom !== 1 && (
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="p-1.5 hover:text-gold transition-colors ml-1 text-white/60 hover:text-white"
                    title="Restablecer (0)"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>

              {/* Toggle Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="text-white hover:text-gold transition-colors bg-white/10 hover:bg-white/20 p-2.5 md:p-3 rounded-full flex items-center gap-1.5 backdrop-blur-md border border-white/15"
                title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider pr-1">
                  {isFullscreen ? 'Normal' : 'Pantalla completa'}
                </span>
              </button>

              {/* Download / Guardar button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="text-white bg-orange hover:bg-orange/90 transition-all p-2.5 md:p-3 rounded-full flex items-center gap-2 backdrop-blur-md shadow-lg shadow-orange/30 disabled:opacity-50"
                title="Guardar / Descargar imagen"
              >
                <Download size={20} className={isDownloading ? 'animate-bounce' : ''} />
                <span className="text-xs font-extrabold uppercase tracking-widest pr-1">
                  {isDownloading ? 'Guardando...' : 'Guardar'}
                </span>
              </button>
              
              {/* Close Button */}
              <button 
                type="button"
                className="text-white hover:text-orange transition-colors bg-white/10 hover:bg-white/20 p-2.5 md:p-3 rounded-full backdrop-blur-md border border-white/15 ml-1"
                onClick={onClose}
                title="Cerrar (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Central Image Canvas with Zoom & Drag */}
          <div 
            className="flex-1 w-full max-w-7xl flex items-center justify-center overflow-auto p-2 md:p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: zoom, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative max-w-full max-h-[82vh] flex items-center justify-center cursor-zoom-in"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(z => (z === 1 ? 1.6 : 1));
              }}
              title="Haz clic para alternar zoom"
            >
              <img
                src={src}
                alt={alt}
                className="w-auto h-auto max-w-full max-h-[78vh] object-contain rounded-md shadow-2xl select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Bottom Bar Info / Hints */}
          <div 
            className="w-full flex items-center justify-between text-xs text-white/50 px-2 py-1 max-w-7xl mx-auto"
            onClick={e => e.stopPropagation()}
          >
            <span>Archivo Sonoro y Visual · Núcleo Colectivo · Comuna 3, Manrique</span>
            <span className="hidden sm:inline">Usa Esc para cerrar · Clic en la foto para zoom</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
