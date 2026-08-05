/**
 * MUCO Labs WhatsApp Business Integration Utility
 * Phone: +91 6381809844
 */

export const WHATSAPP_NUMBER = '916381809844';

export interface WhatsAppContext {
  serviceName?: string;
  pageName?: string;
  projectBudget?: string;
  customMessage?: string;
}

/**
 * Generates a pre-filled, dynamically encoded WhatsApp deep link URL based on the user's active context.
 */
export function getWhatsAppLink(context?: WhatsAppContext): string {
  let message = 'Hello MUCO Labs! 👋 I am interested in your software engineering & AI services.';

  if (context?.serviceName) {
    message = `Hello MUCO Labs! 👋 I am visiting your website and would like a quote and details regarding *${context.serviceName}*. Could you please assist me?`;
  } else if (context?.pageName === 'Pricing' && context?.projectBudget) {
    message = `Hello MUCO Labs! 👋 I am looking for a project estimate around *${context.projectBudget}*. Could we discuss custom software options?`;
  } else if (context?.pageName === 'Portfolio') {
    message = `Hello MUCO Labs! 👋 I saw your live client portfolio and would like to build a similar high-performance platform for my business.`;
  } else if (context?.customMessage) {
    message = context.customMessage;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Direct WhatsApp trigger function that opens the pre-filled WhatsApp web/app link in a new browser tab.
 */
export function openWhatsApp(context?: WhatsAppContext): void {
  const url = getWhatsAppLink(context);
  window.open(url, '_blank', 'noopener,noreferrer');
}
