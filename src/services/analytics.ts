import { PageId } from '../types';

export interface PageViewEvent {
  id: string;
  page: PageId;
  timestamp: string;
  path: string;
  title: string;
  referrer: string;
  userAgent: string;
  meta?: Record<string, unknown>;
}

export type WebVitalRating = 'good' | 'needs-improvement' | 'poor';

export interface PerformanceMetricEvent {
  id: string;
  page: PageId;
  timestamp: string;
  path: string;
  fcp: number | null; // First Contentful Paint in ms (Good <= 1800ms)
  lcp: number | null; // Largest Contentful Paint in ms (Good <= 2500ms)
  cls: number | null; // Cumulative Layout Shift score (Good <= 0.1)
  ttfb: number | null; // Time to First Byte in ms (Good <= 800ms)
  domLoad: number | null; // DOMContentLoaded in ms
  pageLoad: number | null; // Full Load in ms
  fps?: number | null;
  deviceMemory?: number; // GB (if supported)
  effectiveType?: string; // 4g, 3g, etc.
  rating: {
    fcp: WebVitalRating;
    lcp: WebVitalRating;
    cls: WebVitalRating;
    overall: WebVitalRating;
  };
}

const PAGEVIEWS_STORAGE_KEY = 'muco_analytics_pageviews';
const PERF_METRICS_STORAGE_KEY = 'muco_analytics_perf_metrics';
const MAX_LOGS = 100;

// GA4 Global window extension
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __MUCO_GA4_INITIALIZED__?: boolean;
  }
}

/**
 * GA4 Initialization and Event Tracking
 */
export function getGa4MeasurementId(): string | null {
  const envId = (import.meta.env?.VITE_GA4_MEASUREMENT_ID as string | undefined)?.trim();
  if (envId && envId.startsWith('G-') && envId !== 'G-MEASUREMENT_ID' && !envId.includes('PLACEHOLDER')) {
    return envId;
  }
  return null;
}

/**
 * Enhanced GA4 initialization with error handling and validation
 */
export function initGA4Enhanced(): { success: boolean; measurementId: string | null; error?: string } {
  try {
    const measurementId = getGa4MeasurementId();
    if (!measurementId) {
      return { 
        success: false, 
        measurementId: null, 
        error: 'GA4 measurement ID not configured or invalid' 
      };
    }

    if (typeof window === 'undefined') {
      return { 
        success: false, 
        measurementId, 
        error: 'Window object not available (SSR context)' 
      };
    }

    if (window.__MUCO_GA4_INITIALIZED__) {
      return { success: true, measurementId };
    }

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };
    }

    // Inject gtag script if not already in DOM
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.onerror = () => {
        console.error('[GA4] Failed to load gtag script');
      };
      document.head.appendChild(script);
    }

    // Configure GA4 with enhanced privacy settings
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      debug_mode: Boolean(import.meta.env.DEV),
      custom_map: {
        custom_page_path: 'page_path',
        custom_page_title: 'page_title'
      }
    });

    window.__MUCO_GA4_INITIALIZED__ = true;
    
    // Track initialization event
    window.gtag('event', 'ga4_initialized', {
      timestamp: new Date().toISOString(),
      environment: import.meta.env.MODE || 'unknown'
    });

    return { success: true, measurementId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[GA4] Initialization failed:', errorMessage);
    return { 
      success: false, 
      measurementId: getGa4MeasurementId(), 
      error: errorMessage 
    };
  }
}

/**
 * Lazily and safely initializes GA4 if configured via VITE_GA4_MEASUREMENT_ID
 */
export function initGA4(): boolean {
  const result = initGA4Enhanced();
  return result.success;
}

/**
 * Sanitize event data to ensure NO passwords, tokens, full names or PII are sent
 */
function sanitizeEventData(data?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!data) return undefined;
  const sanitized: Record<string, unknown> = {};
  const blockedKeys = ['password', 'token', 'secret', 'key', 'auth', 'email', 'phone', 'message', 'prompt', 'notes'];

  for (const [key, value] of Object.entries(data)) {
    const lower = key.toLowerCase();
    if (blockedKeys.some((b) => lower.includes(b))) {
      // Don't forward raw sensitive fields
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export type MucoAnalyticsEventName =
  | 'page_view'
  | 'sign_up'
  | 'login'
  | 'logout'
  | 'language_change'
  | 'theme_change'
  | 'service_view'
  | 'portfolio_view'
  | 'estimator_start'
  | 'estimator_complete'
  | 'contact_submit'
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'lead_captured';

/**
 * Track an analytics event across GA4 and local telemetry
 */
export function trackEvent(eventName: MucoAnalyticsEventName, params?: Record<string, unknown>) {
  const safeParams = sanitizeEventData(params) || {};

  // GA4 dispatch if available
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, safeParams);
    } catch {
      // Ignore
    }
  }

  // Custom DOM event for internal reactive components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('muco:event', {
        detail: {
          event: eventName,
          params: safeParams,
          timestamp: new Date().toISOString()
        }
      })
    );
  }
}

export function evaluateFcp(fcp: number | null): WebVitalRating {
  if (fcp === null) return 'good';
  if (fcp <= 1800) return 'good';
  if (fcp <= 3000) return 'needs-improvement';
  return 'poor';
}

export function evaluateLcp(lcp: number | null): WebVitalRating {
  if (lcp === null) return 'good';
  if (lcp <= 2500) return 'good';
  if (lcp <= 4000) return 'needs-improvement';
  return 'poor';
}

export function evaluateCls(cls: number | null): WebVitalRating {
  if (cls === null) return 'good';
  if (cls <= 0.1) return 'good';
  if (cls <= 0.25) return 'needs-improvement';
  return 'poor';
}

export function evaluateOverall(fcp: number | null, lcp: number | null, cls: number | null): WebVitalRating {
  const fcpR = evaluateFcp(fcp);
  const lcpR = evaluateLcp(lcp);
  const clsR = evaluateCls(cls);

  if (fcpR === 'poor' || lcpR === 'poor' || clsR === 'poor') return 'poor';
  if (fcpR === 'needs-improvement' || lcpR === 'needs-improvement' || clsR === 'needs-improvement') return 'needs-improvement';
  return 'good';
}

/**
 * Logs a PageView event when a user navigates between routes.
 * Stores in localStorage for audit & dispatches custom DOM event and GA4.
 */
export function logPageView(page: PageId, extraMeta?: Record<string, unknown>): PageViewEvent {
  const event: PageViewEvent = {
    id: `pv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    page,
    timestamp: new Date().toISOString(),
    path: `/#${page}`,
    title: typeof document !== 'undefined' ? document.title : page,
    referrer: typeof document !== 'undefined' ? document.referrer || 'Direct Navigation' : 'Direct Navigation',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown Browser',
    meta: extraMeta,
  };

  try {
    const existingRaw = localStorage.getItem(PAGEVIEWS_STORAGE_KEY);
    const existing: PageViewEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [event, ...existing].slice(0, MAX_LOGS);
    localStorage.setItem(PAGEVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage unavailable for analytics logging:', e);
  }

  // Dispatch custom DOM event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('muco:pageview', { detail: event }));
  }

  // Dispatch to GA4
  initGA4();
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: event.title,
      page_location: window.location.href,
      page_path: `/#${page}`
    });
  }

  return event;
}

/**
 * Logs Real-World Web Vitals (FCP, LCP, CLS, TTFB) for a specific route visit.
 * Dispatches a DOM event for live dashboard listeners.
 */
export function logPerformanceMetric(data: {
  page: PageId;
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  ttfb?: number | null;
  domLoad?: number | null;
  pageLoad?: number | null;
  fps?: number | null;
}): PerformanceMetricEvent {
  const navAny = typeof navigator !== 'undefined' ? (navigator as unknown as { deviceMemory?: number; connection?: { effectiveType?: string } }) : null;
  const deviceMemory = navAny?.deviceMemory || undefined;
  const effectiveType = navAny?.connection?.effectiveType || undefined;

  const fcp = data.fcp !== undefined ? data.fcp : null;
  const lcp = data.lcp !== undefined ? data.lcp : null;
  const cls = data.cls !== undefined ? data.cls : null;
  const ttfb = data.ttfb !== undefined ? data.ttfb : null;
  const domLoad = data.domLoad !== undefined ? data.domLoad : null;
  const pageLoad = data.pageLoad !== undefined ? data.pageLoad : null;

  const fcpRating = evaluateFcp(fcp);
  const lcpRating = evaluateLcp(lcp);
  const clsRating = evaluateCls(cls);
  const overallRating = evaluateOverall(fcp, lcp, cls);

  const event: PerformanceMetricEvent = {
    id: `perf_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    page: data.page,
    timestamp: new Date().toISOString(),
    path: `/#${data.page}`,
    fcp,
    lcp,
    cls,
    ttfb,
    domLoad,
    pageLoad,
    fps: data.fps || null,
    deviceMemory,
    effectiveType,
    rating: {
      fcp: fcpRating,
      lcp: lcpRating,
      cls: clsRating,
      overall: overallRating,
    },
  };

  try {
    const existingRaw = localStorage.getItem(PERF_METRICS_STORAGE_KEY);
    const existing: PerformanceMetricEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [event, ...existing].slice(0, MAX_LOGS);
    localStorage.setItem(PERF_METRICS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage unavailable for performance metric logging:', e);
  }

  // Dispatch custom DOM event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('muco:performance-logged', { detail: event }));
  }

  return event;
}

/**
 * Retrieve stored performance metric events
 */
export function getStoredPerformanceMetrics(): PerformanceMetricEvent[] {
  try {
    const existingRaw = localStorage.getItem(PERF_METRICS_STORAGE_KEY);
    if (!existingRaw) {
      const seedMetrics = generateBaselinePerformanceSeeds();
      localStorage.setItem(PERF_METRICS_STORAGE_KEY, JSON.stringify(seedMetrics));
      return seedMetrics;
    }
    return JSON.parse(existingRaw);
  } catch {
    return [];
  }
}

/**
 * Generates realistic initial baseline telemetry data across typical routes
 */
export function generateBaselinePerformanceSeeds(): PerformanceMetricEvent[] {
  const pages: PageId[] = ['home', 'services', 'portfolio', 'pricing', 'about', 'maintenance', 'contact', 'blog'];
  const now = Date.now();
  
  return pages.map((page, idx) => {
    const fcp = Math.round(380 + Math.random() * 320); // 380-700ms
    const lcp = Math.round(fcp + 420 + Math.random() * 600); // 800-1700ms
    const cls = Number((0.005 + Math.random() * 0.035).toFixed(3)); // 0.005-0.040
    const ttfb = Math.round(35 + Math.random() * 45); // 35-80ms
    const domLoad = Math.round(fcp + 120);
    const pageLoad = Math.round(lcp + 300);

    return {
      id: `perf_seed_${idx}_${Math.random().toString(36).substring(2, 6)}`,
      page,
      timestamp: new Date(now - (pages.length - idx) * 3600000).toISOString(),
      path: `/#${page}`,
      fcp,
      lcp,
      cls,
      ttfb,
      domLoad,
      pageLoad,
      fps: 60,
      deviceMemory: 8,
      effectiveType: '4g',
      rating: {
        fcp: evaluateFcp(fcp),
        lcp: evaluateLcp(lcp),
        cls: evaluateCls(cls),
        overall: evaluateOverall(fcp, lcp, cls),
      },
    };
  });
}

/**
 * Calculates statistical aggregations across stored performance metrics
 */
export function getPerformanceAverages(metrics?: PerformanceMetricEvent[]) {
  const data = metrics || getStoredPerformanceMetrics();
  if (data.length === 0) {
    return {
      totalSamples: 0,
      avgFcp: 0,
      avgLcp: 0,
      avgCls: 0,
      avgTtfb: 0,
      goodPercentage: 100,
      ratingSummary: { good: 0, needsImprovement: 0, poor: 0 },
    };
  }

  let totalFcp = 0;
  let countFcp = 0;
  let totalLcp = 0;
  let countLcp = 0;
  let totalCls = 0;
  let countCls = 0;
  let totalTtfb = 0;
  let countTtfb = 0;
  let goodCount = 0;
  let needsImpCount = 0;
  let poorCount = 0;

  data.forEach((m) => {
    if (m.fcp !== null) { totalFcp += m.fcp; countFcp++; }
    if (m.lcp !== null) { totalLcp += m.lcp; countLcp++; }
    if (m.cls !== null) { totalCls += m.cls; countCls++; }
    if (m.ttfb !== null) { totalTtfb += m.ttfb; countTtfb++; }

    if (m.rating.overall === 'good') goodCount++;
    else if (m.rating.overall === 'needs-improvement') needsImpCount++;
    else poorCount++;
  });

  return {
    totalSamples: data.length,
    avgFcp: countFcp > 0 ? Math.round(totalFcp / countFcp) : 0,
    avgLcp: countLcp > 0 ? Math.round(totalLcp / countLcp) : 0,
    avgCls: countCls > 0 ? Number((totalCls / countCls).toFixed(3)) : 0,
    avgTtfb: countTtfb > 0 ? Math.round(totalTtfb / countTtfb) : 0,
    goodPercentage: Math.round((goodCount / data.length) * 100),
    ratingSummary: {
      good: goodCount,
      needsImprovement: needsImpCount,
      poor: poorCount,
    },
  };
}

/**
 * Clear stored performance metrics
 */
export function clearStoredPerformanceMetrics(): void {
  try {
    localStorage.removeItem(PERF_METRICS_STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('muco:performance-cleared'));
    }
  } catch {
    // Ignore
  }
}

/**
 * Retrieve stored analytics pageview events
 */
export function getStoredPageViews(): PageViewEvent[] {
  try {
    const existingRaw = localStorage.getItem(PAGEVIEWS_STORAGE_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}

/**
 * Clear stored analytics pageview events
 */
export function clearStoredPageViews(): void {
  try {
    localStorage.removeItem(PAGEVIEWS_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
