/**
 * MUCO Labs WhatsApp Business Integration Utility
 * Phone: +91 6381809844
 */

export const WHATSAPP_NUMBER = '916381809844';

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

/**
 * Generates a pre-filled, dynamically encoded WhatsApp deep link URL based on the user's active context or lead data.
 */
export function getWhatsAppLink(context?: WhatsAppContext | LeadCaptureFormData): string {
  let message = 'Hello MUCO Labs! 👋 I am interested in your software engineering & AI services.';

  // Determine if context includes leadData object or is a direct lead data object
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

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Direct WhatsApp trigger function that opens the pre-filled WhatsApp web/app link in a new browser tab.
 */
export function openWhatsApp(context?: WhatsAppContext | LeadCaptureFormData): void {
  const url = getWhatsAppLink(context);
  window.open(url, '_blank', 'noopener,noreferrer');
}

