import React, { Suspense, lazy, ComponentType } from 'react';

/**
 * Enhanced lazy loading utility with:
 * - Custom loading states
 * - Error boundaries
 * - Retry logic
 * - Preloading strategies
 */

interface LazyLoadOptions {
  loadingComponent?: React.ComponentType;
  errorComponent?: React.ComponentType<{ error: Error; retry: () => void }>;
  retryCount?: number;
  preload?: boolean;
}

const defaultLoadingComponent = () => (
  <div className="flex items-center justify-center p-8 min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
  </div>
);

const defaultErrorComponent = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="p-8 text-center">
    <p className="text-red-500 mb-4">Failed to load component</p>
    <button 
      onClick={retry}
      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
    >
      Retry
    </button>
  </div>
);

export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): T {
  const {
    loadingComponent = defaultLoadingComponent,
    errorComponent = defaultErrorComponent,
    retryCount = 3,
    preload = false
  } = options;

  let retryAttempts = 0;

  const loadComponent = (): Promise<{ default: T }> => {
    return importFn().catch((error) => {
      if (retryAttempts < retryCount) {
        retryAttempts++;
        console.warn(`Retry attempt ${retryAttempts} for component`);
        return new Promise((resolve) => 
          setTimeout(() => resolve(loadComponent()), 1000 * retryAttempts)
        );
      }
      throw error;
    });
  };

  const LazyComponent = lazy(loadComponent);

  // Preload if requested
  if (preload && typeof window !== 'undefined') {
    loadComponent();
  }

  const WrappedComponent = (props: React.ComponentProps<T>) => (
    <Suspense fallback={React.createElement(loadingComponent)}>
      <ErrorBoundary 
        fallback={(error) => React.createElement(errorComponent, { error, retry: () => window.location.reload() })}
      >
        <LazyComponent {...props} />
      </ErrorBoundary>
    </Suspense>
  );

  return WrappedComponent as T;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: (error: Error) => React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback: (error: Error) => React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy load error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}

/**
 * Lazy load component when it enters viewport
 */
export function LazyOnViewport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions & { threshold?: number } = {}
) {
  const { threshold = 0.1, ...lazyOptions } = options;
  const LazyComponent = createLazyComponent(importFn, lazyOptions);

  return (props: React.ComponentProps<T>) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref, { threshold });

    if (!isVisible) {
      return <div ref={ref} style={{ minHeight: '200px' }} />;
    }

    return <LazyComponent {...props} />;
  };
}