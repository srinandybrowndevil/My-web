/**
 * MUCO Labs Centralized WhatsApp Diagnostic & Error Logger
 * 
 * Provides structured tracking, log persistence, automated fallback handling,
 * and user feedback integration for WhatsApp deep linking.
 */

export type WhatsAppLogLevel = 'error' | 'warning' | 'info' | 'success';

export type WhatsAppErrorCode =
  | 'URL_TOO_LONG'
  | 'MALFORMED_URL'
  | 'ENCODING_ERROR'
  | 'INVALID_PHONE'
  | 'EMPTY_PAYLOAD'
  | 'POPUP_BLOCKED'
  | 'WINDOW_OPEN_EXCEPTION'
  | 'CLIPBOARD_SUCCESS'
  | 'CLIPBOARD_FAILED'
  | 'SUCCESSFUL_LAUNCH';

export interface WhatsAppLogEntry {
  id: string;
  timestamp: string;
  level: WhatsAppLogLevel;
  code: WhatsAppErrorCode;
  title: string;
  message: string;
  urlLength?: number;
  urlPreview?: string;
  rawTextLength?: number;
  contextSummary?: string;
  recoveryAction?: string;
  userAgent: string;
  details?: Record<string, unknown>;
}

const STORAGE_KEY = 'muco_whatsapp_diagnostic_logs';
const MAX_LOG_ENTRIES = 50;

/**
 * In-memory buffer of recent logs for instant component consumption
 */
let inMemoryLogs: WhatsAppLogEntry[] = [];

/**
 * Initializes in-memory cache from localStorage
 */
function loadLogsFromStorage(): WhatsAppLogEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[WhatsApp Logger] Could not access localStorage for logs:', err);
    return [];
  }
}

// Initial sync
inMemoryLogs = loadLogsFromStorage();

/**
 * Persists in-memory logs to localStorage
 */
function saveLogsToStorage(logs: WhatsAppLogEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.slice(-MAX_LOG_ENTRIES)));
  } catch (err) {
    console.warn('[WhatsApp Logger] Failed to save logs to localStorage:', err);
  }
}

/**
 * Dispatches a toast notification to the user via the global toast event listener.
 */
export function notifyUser(
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info',
  title?: string,
  duration = 4500
): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('muco:toast', {
      detail: { message, type, title, duration }
    })
  );
}

/**
 * Centralized logging function for WhatsApp link generation and execution events.
 */
export function logWhatsAppEvent(
  entry: Omit<WhatsAppLogEntry, 'id' | 'timestamp' | 'userAgent'>
): WhatsAppLogEntry {
  const fullEntry: WhatsAppLogEntry = {
    id: `walog-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    ...entry
  };

  // Prepend to in-memory list
  inMemoryLogs = [fullEntry, ...inMemoryLogs.filter(l => l.id !== fullEntry.id)].slice(0, MAX_LOG_ENTRIES);
  saveLogsToStorage(inMemoryLogs);

  // Styled console output for debugging
  const consolePrefix = `%c[MUCO WhatsApp %c${fullEntry.code}%c]`;
  const badgeStyle = 'background: #064e3b; color: #34d399; font-weight: bold; padding: 2px 6px; border-radius: 4px;';
  const codeStyle = fullEntry.level === 'error'
    ? 'background: #7f1d1d; color: #fca5a5; font-weight: bold; padding: 2px 6px; border-radius: 4px;'
    : fullEntry.level === 'warning'
    ? 'background: #78350f; color: #fde68a; font-weight: bold; padding: 2px 6px; border-radius: 4px;'
    : 'background: #1e3a8a; color: #93c5fd; font-weight: bold; padding: 2px 6px; border-radius: 4px;';
  const resetStyle = 'color: inherit;';

  if (fullEntry.level === 'error') {
    console.error(consolePrefix, badgeStyle, codeStyle, resetStyle, fullEntry.title, fullEntry);
  } else if (fullEntry.level === 'warning') {
    console.warn(consolePrefix, badgeStyle, codeStyle, resetStyle, fullEntry.title, fullEntry);
  } else {
    console.info(consolePrefix, badgeStyle, codeStyle, resetStyle, fullEntry.title, fullEntry);
  }

  // Dispatch custom window event so reactive UI panels (like diagnostics or debug overlays) can re-render
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('muco:whatsapp_log', {
        detail: fullEntry
      })
    );
  }

  return fullEntry;
}

/**
 * Returns all active WhatsApp logs
 */
export function getWhatsAppLogs(): WhatsAppLogEntry[] {
  if (inMemoryLogs.length === 0) {
    inMemoryLogs = loadLogsFromStorage();
  }
  return [...inMemoryLogs];
}

/**
 * Clears all stored WhatsApp logs
 */
export function clearWhatsAppLogs(): void {
  inMemoryLogs = [];
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('muco:whatsapp_log_cleared'));
    } catch (e) {
      console.warn('Failed to remove logs:', e);
    }
  }
}

/**
 * Exports logs as a formatted JSON string
 */
export function exportWhatsAppLogsJSON(): string {
  const logs = getWhatsAppLogs();
  return JSON.stringify(logs, null, 2);
}

/**
 * Subscribes to new WhatsApp log events
 */
export function subscribeToWhatsAppLogs(callback: (log: WhatsAppLogEntry) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<WhatsAppLogEntry>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };

  window.addEventListener('muco:whatsapp_log', handler);
  return () => {
    window.removeEventListener('muco:whatsapp_log', handler);
  };
}
