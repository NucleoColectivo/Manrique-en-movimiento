import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from 'react';
import { MoveHorizontal, Eye, Sparkles, Columns } from 'lucide-react';
import { cn } from '../lib/utils';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage,
  beforeLabel = 'ORIGINAL',
  afterLabel = 'RESTAURADA (IA / 2K)',
  className = '',
  aspectRatio = 'aspect-[16/10] md:aspect-[16/9]'
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'original' | 'restored' | 'sideBySide'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    return () => {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  return (
    <div className={cn("w-full flex flex-col gap-3 select-none", className)}>
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-full border border-white/15 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={cn(
              "px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5",
              viewMode === 'slider' 
                ? "bg-orange text-white font-bold shadow-sm" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <MoveHorizontal size={13} />
            <span>Deslizador</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('original')}
            className={cn(
              "px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5",
              viewMode === 'original' 
                ? "bg-white text-black font-bold shadow-sm" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <Eye size={13} />
            <span>{beforeLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('restored')}
            className={cn(
              "px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5",
              viewMode === 'restored' 
                ? "bg-orange text-white font-bold shadow-sm" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <Sparkles size={13} />
            <span>{afterLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('sideBySide')}
            className={cn(
              "hidden sm:flex px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all items-center gap-1.5",
              viewMode === 'sideBySide' 
                ? "bg-white text-black font-bold shadow-sm" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <Columns size={13} />
            <span>Lado a Lado</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-white/50 hidden md:inline-block">
          {viewMode === 'slider' ? 'Arrastra la barra central para comparar' : 'Comparación de archivo patrimonial'}
        </span>
      </div>

      {/* Main View Area */}
      {viewMode === 'sideBySide' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <div className="relative rounded-lg overflow-hidden border border-white/15 bg-black/70 flex flex-col">
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] tracking-widest text-white border border-white/20 rounded z-10">
              {beforeLabel}
            </div>
            <img 
              src={beforeImage} 
              alt={beforeLabel}
              className="w-full h-full object-contain max-h-[60vh]"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden border border-orange/40 bg-black/70 flex flex-col">
            <div className="absolute top-3 right-3 bg-orange/90 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] tracking-widest text-white font-bold rounded z-10 flex items-center gap-1">
              <Sparkles size={11} />
              {afterLabel}
            </div>
            <img 
              src={afterImage} 
              alt={afterLabel}
              className="w-full h-full object-contain max-h-[60vh]"
            />
          </div>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className={cn(
            "relative w-full overflow-hidden bg-black/80 rounded-lg border border-white/15 select-none",
            viewMode === 'slider' ? "cursor-ew-resize" : "cursor-default",
            aspectRatio
          )}
          onMouseMove={viewMode === 'slider' ? handleMouseMove : undefined}
          onTouchMove={viewMode === 'slider' ? handleTouchMove : undefined}
          onMouseDown={(e) => {
            if (viewMode !== 'slider') return;
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            if (viewMode !== 'slider') return;
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          {/* AFTER / RESTORED IMAGE (Background) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <img 
              src={afterImage} 
              alt={afterLabel} 
              className={cn(
                "w-full h-full object-contain pointer-events-none transition-opacity duration-300",
                viewMode === 'original' ? "opacity-0" : "opacity-100"
              )}
            />
          </div>

          {/* After Badge */}
          {viewMode !== 'original' && (
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-widest text-orange border border-orange/40 rounded z-10 flex items-center gap-1.5 shadow-md">
              <Sparkles size={12} className="text-orange" />
              <span>{afterLabel}</span>
            </div>
          )}

          {/* BEFORE / ORIGINAL IMAGE (Clipped or full) */}
          {viewMode !== 'restored' && (
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
              style={{ 
                clipPath: viewMode === 'original' 
                  ? 'inset(0 0 0 0)' 
                  : `inset(0 ${100 - sliderPosition}% 0 0)` 
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={beforeImage} 
                  alt={beforeLabel} 
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>

              {/* Before Badge */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-widest text-white border border-white/20 rounded z-10 shadow-md">
                {beforeLabel}
              </div>
            </div>
          )}

          {/* Slider Line & Handle */}
          {viewMode === 'slider' && (
            <div 
              className="absolute inset-y-0 w-0.5 bg-white pointer-events-none z-20 shadow-[0_0_10px_rgba(0,0,0,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 md:w-11 md:h-11 bg-white text-zinc-950 rounded-full flex items-center justify-center shadow-2xl border-2 border-orange">
                <MoveHorizontal size={18} className="text-zinc-950" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
