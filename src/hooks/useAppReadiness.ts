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

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';

export interface UseAppReadinessOptions {
  maxWaitMs?: number;
  skipIfLoaded?: boolean;
}

/**
 * Deterministic application readiness state machine hook.
 * Uses Promise.all() to await critical asset batches and initial edge API readiness
 * alongside the window 'load' event and a safety fallback timeout before calling setReady(true).
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
                    progress: Math.max(prev.progress, 50),
                    stage: 'SYNCHRONIZING DISTRIBUTED CLOUD EDGE'
                  }
            );
          }
          resolve();
        };
        window.addEventListener('load', windowLoadHandler, { once: true });
      }
    });

    // 2. Critical Asset Batch 1: Document Fonts
    const fontsPromise = (async () => {
      if ('fonts' in document && document.fonts && typeof document.fonts.ready?.then === 'function') {
        try {
          await document.fonts.ready;
        } catch {
          // Graceful fallback for non-blocking font resolution
        }
      }
    })();

    // 3. Critical Asset Batch 2: Above-the-fold Hero Image Preload
    const heroAssetPromise = new Promise<void>((resolve) => {
      const img = new Image();
      img.src = HERO_IMAGE_URL;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Non-blocking resolution on network errors
      }
    });

    // 4. Initial Edge API Readiness Check
    const apiHealthPromise = (async () => {
      try {
        const timeoutId = setTimeout(() => {
          try {
            fetchAbortController.abort();
          } catch {
            // ignore
          }
        }, 800);

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
                  progress: Math.max(prev.progress, 85),
                  stage: 'OPTIMIZING CLIENT GRAPHICS RUNTIME'
                }
          );
        }
      } catch {
        // Non-blocking fallback for offline/isolated runtime environments
      }
    })();

    // Master completion callback
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

    // Safety Fallback Timeout ensuring deterministic completion under all network environments
    const safetyTimeout = setTimeout(() => {
      setReady('SAFETY_FALLBACK_TIMEOUT');
    }, maxWaitMs);

    // Deterministic Promise.all awaiting all critical asset batches + edge API readiness + window load
    Promise.all([windowLoadPromise, fontsPromise, heroAssetPromise, apiHealthPromise])
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
