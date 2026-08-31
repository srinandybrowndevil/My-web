import React from 'react';

/**
 * Image optimization utilities for MUCO Labs
 * Handles lazy loading, responsive images, and performance optimization
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  fit?: 'crop' | 'fill' | 'contain' | 'cover';
}

/**
 * Generate optimized image URL for Unsplash
 */
export function optimizeUnsplashUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!url.includes('images.unsplash.com')) {
    return url;
  }

  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'auto',
    fit = 'crop'
  } = options;

  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('h', height.toString());
    urlObj.searchParams.set('q', quality.toString());
    urlObj.searchParams.set('auto', format);
    urlObj.searchParams.set('fit', fit);
    return urlObj.toString();
  } catch {
    // Fallback for relative URLs
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&h=${height}&q=${quality}&auto=${format}&fit=${fit}`;
  }
}

/**
 * Generate responsive image sources for picture element
 */
export function generateResponsiveSources(
  baseUrl: string,
  breakpoints: { width: number; height: number; media?: string }[]
) {
  return breakpoints.map(({ width, height, media }) => ({
    srcSet: optimizeUnsplashUrl(baseUrl, { width, height }),
    media: media || `(max-width: ${width}px)`
  }));
}

/**
 * Calculate image aspect ratio
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Lazy load images using Intersection Observer
 */
export class LazyImageLoader {
  private observer: IntersectionObserver | null = null;
  private loadedImages = new WeakSet<HTMLImageElement>();

  constructor(options: IntersectionObserverInit = {}) {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          rootMargin: '50px',
          threshold: 0.01,
          ...options
        }
      );
    }
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        this.loadImage(img);
        this.observer?.unobserve(img);
      }
    });
  }

  private loadImage(img: HTMLImageElement) {
    if (this.loadedImages.has(img)) return;

    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }

    if (srcset) {
      img.srcset = srcset;
      img.removeAttribute('data-srcset');
    }

    img.classList.add('loaded');
    this.loadedImages.add(img);
  }

  observe(img: HTMLImageElement) {
    if (this.observer && !this.loadedImages.has(img)) {
      this.observer.observe(img);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadImage(img);
    }
  }

  disconnect() {
    this.observer?.disconnect();
  }
}

// Global lazy loader instance
let globalLazyLoader: LazyImageLoader | null = null;

export function getLazyLoader(): LazyImageLoader {
  if (!globalLazyLoader) {
    globalLazyLoader = new LazyImageLoader();
  }
  return globalLazyLoader;
}

/**
 * Hook for lazy loading images
 */
export function useLazyImage() {
  const loader = React.useMemo(() => getLazyLoader(), []);

  React.useEffect(() => {
    return () => loader.disconnect();
  }, [loader]);

  return loader;
}