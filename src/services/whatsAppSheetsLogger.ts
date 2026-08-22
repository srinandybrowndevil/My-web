import { ContactFormData } from '../types';
import { postToGoogleAppsScript } from './googleAppsScript';
import { appendLeadToSheet, getAccessToken } from './googleSheets';
import { logWhatsAppEvent, notifyUser } from '../utils/whatsappLogger';

export interface WhatsAppInquiryPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceCategory?: string;
  serviceName?: string;
  projectBudget?: string;
  budgetRange?: string;
  message?: string;
  customMessage?: string;
  pageName?: string;
  sourcePage?: string;
  sourceButton?: string;
}

export interface WhatsAppLogResult {
  success: boolean;
  appsScriptLogged: boolean;
  oauthSheetLogged: boolean;
  localStored: boolean;
  timestamp: string;
  messageId: string;
}

/**
 * Automatically logs a WhatsApp inquiry into the Google Sheets integration,
 * local persistent CRM storage (for Google Sheets Manager & Admin Inbox),
 * and the telemetry event tracker whenever a user initiates a WhatsApp chat.
 */
export async function logWhatsAppInquiryToGoogleSheets(
  inquiry: WhatsAppInquiryPayload,
  options?: {
    notifyUserToast?: boolean;
    customToastMessage?: string;
  }
): Promise<WhatsAppLogResult> {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  
  const messageId = `wa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // Synthesize lead details
  const name = inquiry.name?.trim() || 'WhatsApp Inquirer';
  const email = inquiry.email?.trim() || 'Not Provided (WhatsApp)';
  const phone = inquiry.phone?.trim() || '+91 6381809844';
  const company = inquiry.company?.trim() || 'Direct WhatsApp Visitor';
  const serviceCategory =
    inquiry.serviceCategory ||
    inquiry.serviceName ||
    (inquiry.pageName ? `WhatsApp - ${inquiry.pageName}` : 'WhatsApp General Inquiry');
  const budgetRange = inquiry.budgetRange || inquiry.projectBudget || 'Direct Chat';
  
  const messageBody = (
    inquiry.message ||
    inquiry.customMessage ||
    `WhatsApp inquiry clicked from ${inquiry.pageName || 'website'} (Action: ${inquiry.sourceButton || 'Chat Now'})`
  ).trim();

  // Standard Contact Form Data payload for Google Apps Script
  const contactFormData: ContactFormData = {
    name,
    email,
    phone,
    company,
    serviceCategory,
    subject: `WhatsApp Lead: ${serviceCategory} [${inquiry.sourceButton || 'Chat Now'}]`,
    budgetRange,
    message: messageBody
  };

  let localStored = false;
  let appsScriptLogged = false;
  let oauthSheetLogged = false;

  // 1. Store in Local Persistent Messages (used by Admin Messages Inbox & Google Sheets Manager)
  try {
    const existingRaw = localStorage.getItem('muco_contact_messages');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    const newRecord = {
      id: messageId,
      name,
      email,
      phone,
      company,
      serviceCategory,
      budgetRange,
      message: messageBody,
      timestamp,
      status: 'New' as const,
      source: `WhatsApp (${inquiry.sourceButton || 'Chat Now'})`
    };

    localStorage.setItem('muco_contact_messages', JSON.stringify([newRecord, ...existing]));
    localStored = true;
  } catch (err) {
    console.warn('[WhatsApp Sheets Logger] LocalStorage write error:', err);
  }

  // 2. Dispatch to Google Apps Script Web App Endpoint (Appends directly to Google Sheet)
  try {
    const appsScriptRes = await postToGoogleAppsScript(contactFormData);
    appsScriptLogged = Boolean(appsScriptRes?.success);
  } catch (err) {
    console.warn('[WhatsApp Sheets Logger] Google Apps Script dispatch notice:', err);
  }

  // 3. Dispatch to Direct Connected OAuth Google Sheet (if authenticated in Google Sheets Manager)
  try {
    const activeSheetId = localStorage.getItem('muco_active_sheets_id');
    const token = getAccessToken();

    if (activeSheetId && token) {
      const oauthRes = await appendLeadToSheet(
        activeSheetId,
        {
          name,
          email,
          phone,
          company,
          serviceCategory,
          budgetRange,
          message: messageBody,
          timestamp,
          status: 'New (WhatsApp)'
        },
        token
      );
      oauthSheetLogged = Boolean(oauthRes);
    }
  } catch (err) {
    console.warn('[WhatsApp Sheets Logger] OAuth Google Sheet append notice:', err);
  }

  // 4. Notify backend server
  try {
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...contactFormData,
        source: 'whatsapp_chat_now'
      })
    }).catch(() => {});
  } catch {
    // ignore fetch errors
  }

  // 5. Log Telemetry Event
  logWhatsAppEvent({
    level: 'info',
    code: 'SUCCESSFUL_LAUNCH',
    title: 'WhatsApp Inquiry Logged to Google Sheets',
    message: `Recorded "${serviceCategory}" inquiry to Google Sheets integration (Local: ${localStored}, Apps Script: ${appsScriptLogged}, OAuth: ${oauthSheetLogged}).`,
    contextSummary: JSON.stringify({
      service: serviceCategory,
      button: inquiry.sourceButton || 'Chat Now',
      page: inquiry.pageName
    }),
    recoveryAction: 'sheets_sync_success'
  });

  // 6. Optional subtle toast confirmation
  if (options?.notifyUserToast) {
    notifyUser(
      options.customToastMessage || 'WhatsApp inquiry logged and synced to Google Sheets integration.',
      'success',
      'Inquiry Synced to Sheets',
      3500
    );
  }

  return {
    success: localStored || appsScriptLogged || oauthSheetLogged,
    appsScriptLogged,
    oauthSheetLogged,
    localStored,
    timestamp,
    messageId
  };
}
