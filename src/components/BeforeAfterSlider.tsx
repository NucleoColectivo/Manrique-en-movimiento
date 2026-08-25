import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal } from 'lucide-react';
import { AnimatedImage } from './ui/AnimatedImage';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
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
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Full width background) */}
      <AnimatedImage 
        src={afterImage} 
        alt="Después - Restaurada con IA" 
        wrapperClassName="absolute inset-0 w-full h-full pointer-events-none"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-deep-black/60 backdrop-blur-md px-3 py-1 font-montserrat text-xs tracking-widest text-off-white z-10">
        RESTAURADA CON IA
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <AnimatedImage 
          src={beforeImage} 
          alt="Antes - Original" 
          wrapperClassName="absolute inset-0 w-full h-full"
          className="filter grayscale sepia-[0.5] contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-deep-black/60 backdrop-blur-md px-3 py-1 font-montserrat text-xs tracking-widest text-off-white z-10">
          ORIGINAL
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute inset-y-0 w-0.5 bg-off-white pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-off-white rounded-full flex items-center justify-center text-deep-black shadow-lg">
          <MoveHorizontal size={20} />
        </div>
      </div>
    </div>
  );
}
