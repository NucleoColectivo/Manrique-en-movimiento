import React, { useState, ComponentProps } from 'react';
import { cn } from '../../lib/utils';

export interface AnimatedImageProps extends ComponentProps<"img"> {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  wrapperClassName?: string;
  className?: string;
  loading?: "eager" | "lazy";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export function AnimatedImage({ 
  src,
  fallbackSrc,
  className, 
  wrapperClassName, 
  alt, 
  ...props 
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  React.useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    
    // Auto-fallback for /img/ paths to official GitHub repository RAW URL
    if (typeof currentSrc === 'string' && currentSrc.startsWith('/img/') && !currentSrc.includes('githubusercontent')) {
      const gitHubFallback = `https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main${encodeURI(currentSrc)}`;
      setCurrentSrc(gitHubFallback);
      return;
    }

    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted/40 w-full h-full", 
        !isLoaded && "skeleton-shimmer",
        wrapperClassName
      )}
    >
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt || ""}
        className={cn(
          "transition-opacity duration-700 ease-in-out w-full h-full object-cover",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
