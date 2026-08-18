import React, { useState, useEffect, useMemo, ImgHTMLAttributes } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'loading'> {
  /** The source URL of the image */
  src: string;
  /** Alternative text for screen readers and SEO */
  alt: string;
  /** Explicit width to prevent layout shifts */
  width?: number | string;
  /** Explicit height to prevent layout shifts */
  height?: number | string;
  /** CSS aspect-ratio string (e.g. '16/9', '4/3', '1/1', '21/9') */
  aspectRatio?: string;
  /** Custom widths array to generate srcset (e.g., [320, 640, 768, 1024, 1280, 1600]) */
  widths?: number[];
  /** Custom sizes attribute for responsive selection */
  sizes?: string;
  /** Image quality parameter for CDN images (1-100) */
  quality?: number;
  /** Set to true for hero/above-the-fold images to prioritize loading and boost LCP */
  priority?: boolean;
  /** Loading attribute override ('lazy' | 'eager') */
  loading?: 'lazy' | 'eager';
  /** Fallback image URL when source fails to load */
  fallbackSrc?: string;
  /** Class name for the optional outer aspect-ratio wrapper */
  containerClassName?: string;
  /** Show subtle shimmer background while loading */
  showSkeleton?: boolean;
}

/** Default breakpoints for responsive image srcSet */
const DEFAULT_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1600];

/** Default responsive sizes query */
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

/**
 * Utility to generate responsive srcset string for CDNs (Unsplash, Cloudinary, Pexels, etc.)
 */
export function generateSrcSet(
  src: string,
  widths: number[] = DEFAULT_WIDTHS,
  quality: number = 80
): string | undefined {
  if (!src) return undefined;

  // 1. Unsplash URLs
  if (src.includes('images.unsplash.com')) {
    return widths
      .map((w) => {
        try {
          const url = new URL(src);
          url.searchParams.set('w', w.toString());
          url.searchParams.set('q', quality.toString());
          url.searchParams.set('auto', 'format');
          url.searchParams.set('fit', 'crop');
          return `${url.toString()} ${w}w`;
        } catch {
          // Fallback if URL parsing fails on relative strings
          const cleanSrc = src.split('?')[0];
          return `${cleanSrc}?auto=format&fit=crop&w=${w}&q=${quality} ${w}w`;
        }
      })
      .join(', ');
  }

  // 2. Cloudinary URLs
  if (src.includes('res.cloudinary.com')) {
    return widths
      .map((w) => {
        const parts = src.split('/upload/');
        if (parts.length === 2) {
          return `${parts[0]}/upload/w_${w},q_${quality},f_auto/${parts[1]} ${w}w`;
        }
        return `${src} ${w}w`;
      })
      .join(', ');
  }

  // 3. Pexels Images
  if (src.includes('images.pexels.com')) {
    return widths
      .map((w) => {
        try {
          const url = new URL(src);
          url.searchParams.set('w', w.toString());
          url.searchParams.set('auto', 'compress');
          url.searchParams.set('cs', 'tinysrgb');
          return `${url.toString()} ${w}w`;
        } catch {
          return `${src} ${w}w`;
        }
      })
      .join(', ');
  }

  // Non-CDN static assets return undefined so browser loads source directly
  return undefined;
}

/**
 * Custom Image Component
 *
 * Automatically wraps standard <img> elements with:
 * - Built-in lazy loading (`loading="lazy"`) or high-priority loading for hero items (`priority={true}`)
 * - Dynamic `srcset` and `sizes` generation to serve optimal resolution per screen density & width
 * - Asynchronous decoding (`decoding="async"`) to keep the main thread free
 * - Zero layout shift protection via aspect-ratio and explicit dimensions to safeguard CLS score
 * - Smooth fade-in transition and resilient fallback handling
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  widths = DEFAULT_WIDTHS,
  sizes = DEFAULT_SIZES,
  quality = 80,
  priority = false,
  loading,
  fallbackSrc = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  className = '',
  containerClassName = '',
  showSkeleton = true,
  onLoad,
  onError,
  style,
  ...restProps
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Sync currentSrc when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Determine effective loading & fetchPriority
  const effectiveLoading = loading || (priority ? 'eager' : 'lazy');
  const fetchPriority = priority ? 'high' : 'auto';

  // Generate responsive srcset
  const generatedSrcSet = useMemo(() => {
    if (hasError) return undefined;
    return generateSrcSet(currentSrc, widths, quality);
  }, [currentSrc, widths, quality, hasError]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) {
      onError(e);
    }
  };

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  const imgElement = (
    <img
      src={currentSrc}
      srcSet={generatedSrcSet}
      sizes={generatedSrcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={effectiveLoading}
      decoding="async"
      // React uses camelCase fetchPriority
      // @ts-ignore
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onLoad={handleImageLoad}
      onError={handleImageError}
      style={combinedStyle}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      {...restProps}
    />
  );

  // If container wrapper is requested for skeleton/aspect ratio
  if (containerClassName || aspectRatio || showSkeleton) {
    return (
      <div
        className={`relative overflow-hidden ${
          showSkeleton && !isLoaded ? 'bg-slate-900/60 animate-pulse' : ''
        } ${containerClassName}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {imgElement}
      </div>
    );
  }

  return imgElement;
};

// Re-export as OptimizedImage for interchangeable nomenclature
export const OptimizedImage = Image;
export default Image;
