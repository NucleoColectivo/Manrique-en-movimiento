import React, { useState, ComponentProps } from 'react';
import { cn } from '../../lib/utils';

export interface AnimatedImageProps extends ComponentProps<"img"> {
  src: string;
  alt?: string;
  wrapperClassName?: string;
  className?: string;
  loading?: "eager" | "lazy";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export function AnimatedImage({ 
  className, 
  wrapperClassName, 
  alt, 
  ...props 
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted/50 w-full h-full", 
        !isLoaded && "skeleton-shimmer",
        wrapperClassName
      )}
    >
      <img
        ref={imgRef}
        alt={alt || ""}
        className={cn(
          "transition-opacity duration-1000 ease-in-out w-full h-full object-cover",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
