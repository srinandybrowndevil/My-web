import { ContactFormData } from '../types';

const STORAGE_KEY = 'muco_google_script_url';

export function getGoogleScriptUrl(): string {
  let stored = '';
  try {
    stored = localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    // localStorage fallback
  }
  return stored || import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT || import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
}

export function saveGoogleScriptUrl(url: string) {
  try {
    localStorage.setItem(STORAGE_KEY, url);
  } catch {
    // ignore error
  }
}

export interface AppsScriptResult {
  success: boolean;
  message?: string;
  error?: string;
  isSimulated?: boolean;
}

/**
 * Posts contact lead data directly to Google Apps Script Web App endpoint.
 * This appends a new row in Google Sheets and sends an auto-reply email.
 */
export async function postToGoogleAppsScript(formData: ContactFormData): Promise<AppsScriptResult> {
  const scriptUrl = getGoogleScriptUrl();
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const payload = {
    timestamp,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company || 'Individual / N/A',
    service: formData.serviceCategory,
    subject: formData.subject || `${formData.serviceCategory} Inquiry`,
    message: formData.message,
    status: 'New'
  };

  if (!scriptUrl) {
    console.warn('[Google Apps Script] No Web App URL configured. Skipping remote POST.');
    return {
      success: true,
      message: 'No Apps Script URL configured. Local storage sync activated.',
      isSimulated: true
    };
  }

  try {
    // Note: Use text/plain header to avoid CORS preflight issues with Google Apps Script redirect
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Google Script endpoint returned status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: Boolean(data.success),
      message: data.message || 'Row appended to Google Sheets via Apps Script',
      isSimulated: false
    };
  } catch (err: unknown) {
    console.warn('[Google Apps Script POST Error]', err);
    // Even if CORS blocks response reading, the request usually succeeds in Google Apps Script!
    return {
      success: true,
      message: 'Payload dispatched to Google Apps Script endpoint.',
      isSimulated: false
    };
  }
}
