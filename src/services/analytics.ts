import { PageId } from '../types';

export interface PageViewEvent {
  id: string;
  page: PageId;
  timestamp: string;
  path: string;
  title: string;
  referrer: string;
  userAgent: string;
  meta?: Record<string, any>;
}

const STORAGE_KEY = 'muco_analytics_pageviews';
const MAX_LOGS = 100;

/**
 * Logs a PageView event when a user navigates between routes.
 * Stores in localStorage for audit & dispatches custom DOM event.
 */
export function logPageView(page: PageId, extraMeta?: Record<string, any>): PageViewEvent {
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
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: PageViewEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [event, ...existing].slice(0, MAX_LOGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage unavailable for analytics logging:', e);
  }

  // Dispatch custom DOM event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('muco:pageview', { detail: event }));
  }

  // Console telemetry logging
  console.log(
    `%c[MUCO Analytics] PageView Logged ➔ %c${page.toUpperCase()}`,
    'color: #f59e0b; font-weight: bold; background: #0f172a; padding: 2px 6px; border-radius: 4px;',
    'color: #38bdf8; font-weight: bold;',
    event
  );

  return event;
}

/**
 * Retrieve stored analytics pageview events
 */
export function getStoredPageViews(): PageViewEvent[] {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
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
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
