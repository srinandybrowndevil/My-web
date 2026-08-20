/**
 * MUCO Labs WhatsApp Business Integration Utility
 * Direct Phone: +91 6381809844
 * 
 * Features:
 * - Robust URL length validation & smart truncation
 * - Centralized error logging & telemetry
 * - Malformed URL & surrogate pair protection
 * - Popup blocker detection & clipboard fallback
 * - Contextual user feedback & toast messaging
 */

import {
  logWhatsAppEvent,
  notifyUser,
  WhatsAppErrorCode,
  WhatsAppLogEntry
} from './whatsappLogger';

export const WHATSAPP_NUMBER = '916381809844';

// Standard maximum safe length for wa.me URL query parameters across browsers & WhatsApp Web/Mobile
export const MAX_SAFE_URL_LENGTH = 1800;

export interface LeadCaptureFormData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceCategory?: string;
  serviceName?: string;
  service?: string;
  subject?: string;
  budgetRange?: string;
  budget?: string;
  message?: string;
  sourcePage?: string;
  requirements?: string;
}

export interface WhatsAppContext {
  serviceName?: string;
  pageName?: string;
  projectBudget?: string;
  customMessage?: string;
  leadData?: LeadCaptureFormData;
}

export interface WhatsAppUrlResult {
  url: string;
  message: string;
  isTruncated: boolean;
  rawLength: number;
  urlLength: number;
  error?: string;
  errorCode?: WhatsAppErrorCode;
}

export interface WhatsAppActionResult extends WhatsAppUrlResult {
  success: boolean;
  popupBlocked?: boolean;
}

/**
 * Sanitizes raw text to prevent URI malformed exceptions from unmatched Unicode surrogates.
 */
function sanitizeUnicode(text: string): string {
  try {
    // Attempt standard encode to check validity
    encodeURIComponent(text);
    return text;
  } catch {
    // Replace broken surrogate pairs
    return text.replace(
      /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,
      ''
    );
  }
}

/**
 * Cleans phone number to ensure only international standard digits
 */
export function sanitizePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (!cleaned || cleaned.length < 7) {
    logWhatsAppEvent({
      level: 'warning',
      code: 'INVALID_PHONE',
      title: 'Suspicious WhatsApp Phone Number',
      message: `Provided phone number "${phone}" was resolved to "${cleaned}", falling back to default ${WHATSAPP_NUMBER}.`
    });
    return WHATSAPP_NUMBER;
  }
  return cleaned;
}

/**
 * Builds the textual message payload based on provided context or lead data.
 */
export function formatWhatsAppMessage(context?: WhatsAppContext | LeadCaptureFormData): string {
  let message = 'Hello MUCO Labs! 👋 I am interested in your software engineering & AI services.';

  const leadData: LeadCaptureFormData | null =
    context && 'leadData' in context && context.leadData
      ? context.leadData
      : context && ('name' in context || 'email' in context || 'serviceCategory' in context || 'service' in context || 'phone' in context)
      ? (context as LeadCaptureFormData)
      : null;

  const ctx: WhatsAppContext | undefined =
    context && !('name' in context || 'email' in context || 'serviceCategory' in context)
      ? (context as WhatsAppContext)
      : undefined;

  if (leadData) {
    const name = leadData.name?.trim();
    const email = leadData.email?.trim();
    const phone = leadData.phone?.trim();
    const company = leadData.company?.trim();
    const service = leadData.serviceCategory || leadData.serviceName || leadData.service || ctx?.serviceName;
    const budget = leadData.budgetRange || leadData.budget || ctx?.projectBudget;
    const details = leadData.message || leadData.requirements || ctx?.customMessage;

    const lines: string[] = ['Hello MUCO Labs! 👋 I am sharing my project lead inquiry:'];

    if (name) lines.push(`👤 *Name:* ${name}`);
    if (email) lines.push(`📧 *Email:* ${email}`);
    if (phone) lines.push(`📞 *Phone:* ${phone}`);
    if (company) lines.push(`🏢 *Company:* ${company}`);
    if (service) lines.push(`🛠️ *Service Required:* ${service}`);
    if (budget) lines.push(`💰 *Estimated Budget:* ${budget}`);
    if (details) lines.push(`📝 *Project Details:* ${details}`);

    message = lines.join('\n');
  } else if (ctx?.serviceName) {
    message = `Hello MUCO Labs! 👋 I am visiting your website and would like a quote and details regarding *${ctx.serviceName}*. Could you please assist me?`;
  } else if (ctx?.pageName === 'Pricing' && ctx?.projectBudget) {
    message = `Hello MUCO Labs! 👋 I am looking for a project estimate around *${ctx.projectBudget}*. Could we discuss custom software options?`;
  } else if (ctx?.pageName === 'Portfolio') {
    message = `Hello MUCO Labs! 👋 I saw your live client portfolio and would like to build a similar high-performance platform for my business.`;
  } else if (ctx?.customMessage) {
    message = ctx.customMessage;
  }

  return sanitizeUnicode(message.trim() || 'Hello MUCO Labs! 👋');
}

/**
 * Generates and validates a safe WhatsApp deep link URL.
 * Automatically catches and logs errors (malformed strings, excessive length, invalid characters).
 */
export function generateSafeWhatsAppUrl(
  context?: WhatsAppContext | LeadCaptureFormData,
  phone: string = WHATSAPP_NUMBER
): WhatsAppUrlResult {
  const cleanPhone = sanitizePhoneNumber(phone);
  let message = formatWhatsAppMessage(context);
  const rawLength = message.length;
  let isTruncated = false;

  let encodedMessage = '';
  try {
    encodedMessage = encodeURIComponent(message);
  } catch (encodeErr) {
    logWhatsAppEvent({
      level: 'error',
      code: 'ENCODING_ERROR',
      title: 'WhatsApp URI Encoding Failed',
      message: 'Failed to encode WhatsApp message with encodeURIComponent. Applying sanitized fallback.',
      rawTextLength: rawLength,
      recoveryAction: 'sanitized_characters',
      details: { error: String(encodeErr) }
    });

    // Fallback safe string
    message = message.replace(/[^\x00-\x7F]/g, '');
    encodedMessage = encodeURIComponent(message);
  }

  let fullUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  // Check URL Length limit
  if (fullUrl.length > MAX_SAFE_URL_LENGTH) {
    isTruncated = true;
    const overflowChars = fullUrl.length - MAX_SAFE_URL_LENGTH;
    const truncateNotice = '\n\n[... Note: Truncated for WhatsApp URL safety. Full specs can be shared in this chat.]';
    const targetMessageLen = Math.max(100, message.length - Math.ceil(overflowChars * 1.2) - truncateNotice.length);
    
    message = message.substring(0, targetMessageLen) + truncateNotice;
    encodedMessage = encodeURIComponent(message);
    fullUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    logWhatsAppEvent({
      level: 'warning',
      code: 'URL_TOO_LONG',
      title: 'WhatsApp URL Exceeded Safe Limits',
      message: `Generated WhatsApp URL was ${fullUrl.length + overflowChars} characters. Automatically trimmed message to prevent browser failure.`,
      urlLength: fullUrl.length,
      rawTextLength: rawLength,
      urlPreview: fullUrl.substring(0, 120) + '...',
      recoveryAction: 'truncated_payload',
      contextSummary: typeof context === 'object' ? JSON.stringify(context).substring(0, 150) : undefined
    });
  }

  // Final sanity check for valid URL syntax
  try {
    new URL(fullUrl);
  } catch (urlErr) {
    logWhatsAppEvent({
      level: 'error',
      code: 'MALFORMED_URL',
      title: 'Malformed WhatsApp URL Generated',
      message: `Resulting URL "${fullUrl}" failed standard URL parsing.`,
      urlLength: fullUrl.length,
      details: { error: String(urlErr) }
    });

    return {
      url: `https://wa.me/${cleanPhone}`,
      message,
      isTruncated,
      rawLength,
      urlLength: fullUrl.length,
      error: 'Malformed URL structure',
      errorCode: 'MALFORMED_URL'
    };
  }

  return {
    url: fullUrl,
    message,
    isTruncated,
    rawLength,
    urlLength: fullUrl.length
  };
}

/**
 * Backwards-compatible link getter
 */
export function getWhatsAppLink(context?: WhatsAppContext | LeadCaptureFormData): string {
  const result = generateSafeWhatsAppUrl(context);
  return result.url;
}

/**
 * Direct WhatsApp trigger function that safely opens WhatsApp in a new tab.
 * 
 * Includes comprehensive error handling:
 * - Catches malformed URLs and provides user feedback
 * - Detects and recovers from browser pop-up blockers
 * - Automatically copies inquiry text to clipboard if window cannot open
 * - Logs all execution details to the centralized logger
 */
export function openWhatsApp(context?: WhatsAppContext | LeadCaptureFormData): WhatsAppActionResult {
  const generated = generateSafeWhatsAppUrl(context);

  if (generated.error) {
    notifyUser(
      'Could not generate formatted WhatsApp link. Opening default WhatsApp chat.',
      'warning',
      'WhatsApp Link Warning'
    );
  } else if (generated.isTruncated) {
    notifyUser(
      'Your project message was safely formatted to fit WhatsApp link limits.',
      'info',
      'Message Formatted'
    );
  }

  let popupBlocked = false;
  let success = false;

  try {
    const newWindow = window.open(generated.url, '_blank', 'noopener,noreferrer');

    // Detect if popup blocker prevented the window from opening
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      popupBlocked = true;
      logWhatsAppEvent({
        level: 'warning',
        code: 'POPUP_BLOCKED',
        title: 'WhatsApp Pop-up Was Blocked',
        message: 'Browser popup blocker prevented automatic tab opening. Copying message to clipboard and prompting user.',
        urlLength: generated.urlLength,
        urlPreview: generated.url.substring(0, 100) + '...',
        recoveryAction: 'clipboard_copy_and_toast'
      });

      // Attempt automatic clipboard copy so user has the text ready
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(generated.message)
          .then(() => {
            logWhatsAppEvent({
              level: 'info',
              code: 'CLIPBOARD_SUCCESS',
              title: 'Inquiry Text Copied to Clipboard',
              message: 'Message copied automatically following popup blockage.'
            });
            notifyUser(
              'Pop-up was blocked. Your inquiry message has been copied to your clipboard! Click to open WhatsApp directly.',
              'warning',
              'Pop-up Blocked',
              6000
            );
          })
          .catch(() => {
            notifyUser(
              'Pop-up blocked. Please enable pop-ups for this site to chat on WhatsApp.',
              'error',
              'Pop-up Blocked'
            );
          });
      } else {
        notifyUser(
          'Pop-up was blocked by browser. Please allow popups or contact us at +91 6381809844.',
          'error',
          'Pop-up Blocked'
        );
      }
    } else {
      success = true;
      logWhatsAppEvent({
        level: 'success',
        code: 'SUCCESSFUL_LAUNCH',
        title: 'WhatsApp Launched Successfully',
        message: `Dispatched WhatsApp deep link (${generated.urlLength} chars).`,
        urlLength: generated.urlLength
      });
    }
  } catch (err) {
    logWhatsAppEvent({
      level: 'error',
      code: 'WINDOW_OPEN_EXCEPTION',
      title: 'Window Open Exception',
      message: `Failed to execute window.open: ${String(err)}`,
      details: { error: String(err) },
      recoveryAction: 'toast_error'
    });

    notifyUser(
      'Could not open WhatsApp link directly. Please contact us directly at +91 6381809844 or contact@mucolabs.com.',
      'error',
      'Connection Error'
    );
  }

  return {
    ...generated,
    success,
    popupBlocked
  };
}
