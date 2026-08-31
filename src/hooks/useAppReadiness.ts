import { useState, useEffect } from 'react';

export type ReadinessStatus =
  | 'INITIALIZING'
  | 'AWAITING_WINDOW_LOAD'
  | 'LOADING_CRITICAL_ASSETS'
  | 'VERIFYING_EDGE_API'
  | 'READY';

export interface AppReadinessState {
  status: ReadinessStatus;
  isReady: boolean;
  progress: number;
  stage: string;
  loadDurationMs: number;
}

const CRITICAL_ASSET_URLS = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  '/muco_logo.svg'
];

export interface UseAppReadinessOptions {
  maxWaitMs?: number;
  skipIfLoaded?: boolean;
}

/**
 * Preloads a single image or SVG asset deterministically via Promise.
 * Resolves safely on either successful load or network error to avoid blocking execution.
 */
function preloadAsset(url: string): Promise<void> {
  return new Promise<void>((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    const img = new Image();
    img.src = url;
    if (img.complete) {
      resolve();
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Non-blocking resolution on network/CORS error
    }
  });
}

/**
 * Deterministic application readiness hook.
 * Replaces arbitrary timeout-based loading logic with a robust Promise.all() approach
 * that awaits critical application assets, typography/font subsystem readiness,
 * the window 'load' event, and initial API readiness before calling setReady(true).
 */
export function useAppReadiness(options: UseAppReadinessOptions = {}): AppReadinessState {
  const { maxWaitMs = 2500, skipIfLoaded = true } = options;

  const [state, setState] = useState<AppReadinessState>(() => {
    if (typeof window !== 'undefined' && skipIfLoaded && (window as any).__MUCO_APP_READY__) {
      return {
        status: 'READY',
        isReady: true,
        progress: 100,
        stage: 'EXPERIENCE READY // ENTERING',
        loadDurationMs: 0
      };
    }
    return {
      status: 'INITIALIZING',
      isReady: false,
      progress: 20,
      stage: 'MUCO ARCHITECTURE // INITIALIZING',
      loadDurationMs: 0
    };
  });

  useEffect(() => {
    if (state.isReady) return;

    const startTime = performance.now();
    let isCancelled = false;
    let windowLoadHandler: (() => void) | null = null;
    const fetchAbortController = new AbortController();

    // 1. Window 'load' event promise
    const windowLoadPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        windowLoadHandler = () => {
          if (!isCancelled) {
            setState((prev) =>
              prev.status === 'READY'
                ? prev
                : {
                    ...prev,
                    status: 'LOADING_CRITICAL_ASSETS',
                    progress: Math.max(prev.progress, 45),
                    stage: 'SYNCHRONIZING DISTRIBUTED CLOUD EDGE'
                  }
            );
          }
          resolve();
        };
        window.addEventListener('load', windowLoadHandler, { once: true });
      }
    });

    // 2. Critical Asset Batch: Fonts Subsystem
    const fontsPromise = (async () => {
      if ('fonts' in document && document.fonts && typeof document.fonts.ready?.then === 'function') {
        try {
          await document.fonts.ready;
        } catch {
          // Graceful fallback for non-blocking font resolution
        }
      }
    })();

    // 3. Critical Asset Batch: Preload Above-the-fold imagery & brand SVG assets in parallel
    const criticalAssetsPromise = Promise.all(CRITICAL_ASSET_URLS.map(preloadAsset)).then(() => {
      if (!isCancelled) {
        setState((prev) =>
          prev.status === 'READY'
            ? prev
            : {
                ...prev,
                progress: Math.max(prev.progress, 75),
                stage: 'HYDRATING CRITICAL APPLICATION ASSETS'
              }
        );
      }
    });

    // 4. Initial Edge API Readiness & Service Health Check
    const apiInitializationPromise = (async () => {
      try {
        const timeoutId = setTimeout(() => {
          try {
            fetchAbortController.abort();
          } catch {
            // ignore
          }
        }, 900);

        await fetch('/api/health', {
          signal: fetchAbortController.signal,
          cache: 'no-store'
        });
        clearTimeout(timeoutId);

        if (!isCancelled) {
          setState((prev) =>
            prev.status === 'READY'
              ? prev
              : {
                  ...prev,
                  status: 'VERIFYING_EDGE_API',
                  progress: Math.max(prev.progress, 90),
                  stage: 'OPTIMIZING CLIENT GRAPHICS RUNTIME'
                }
          );
        }
      } catch {
        // Non-blocking fallback for offline or isolated runtime environments
      }
    })();

    // Master completion function setting isReady to true
    const setReady = (source: string) => {
      if (isCancelled) return;
      clearTimeout(safetyTimeout);
      const duration = Math.round(performance.now() - startTime);

      (window as any).__MUCO_APP_READY__ = true;
      window.dispatchEvent(
        new CustomEvent('muco:app_ready', {
          detail: { durationMs: duration, source }
        })
      );

      setState({
        status: 'READY',
        isReady: true,
        progress: 100,
        stage: 'EXPERIENCE READY // ENTERING',
        loadDurationMs: duration
      });
    };

    // Safety Fallback Timeout ensuring deterministic completion even under extreme network throttling
    const safetyTimeout = setTimeout(() => {
      setReady('SAFETY_FALLBACK_TIMEOUT');
    }, maxWaitMs);

    // Robust Promise.all awaiting all critical batches & API initialization
    Promise.all([
      windowLoadPromise,
      fontsPromise,
      criticalAssetsPromise,
      apiInitializationPromise
    ])
      .then(() => {
        setReady('PROMISE_ALL_DETERMINISTIC');
      })
      .catch(() => {
        setReady('PROMISE_ALL_CATCH');
      });

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimeout);
      try {
        fetchAbortController.abort();
      } catch {
        // ignore
      }
      if (windowLoadHandler) {
        window.removeEventListener('load', windowLoadHandler);
      }
    };
  }, [maxWaitMs, state.isReady]);

  return state;
}
