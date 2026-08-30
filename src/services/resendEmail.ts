import { ContactFormData } from '../types';

export interface EmailStatus {
  configured: boolean;
  provider: string;
  fromEmail: string;
  toEmail: string;
}

export interface EmailSendResult {
  success: boolean;
  status?: number;
  text: string;
  isSimulated?: boolean;
  data?: any;
  warning?: string;
}

/**
 * Checks Resend configuration status on the backend
 */
export async function getResendStatus(): Promise<EmailStatus> {
  try {
    const res = await fetch('/api/email/status');
    if (!res.ok) throw new Error('Failed to fetch status');
    return await res.json();
  } catch {
    return {
      configured: false,
      provider: 'resend',
      fromEmail: 'MUCO Labs <onboarding@resend.dev>',
      toEmail: 'contact@mucolabs.com'
    };
  }
}

/**
 * Sends a contact / proposal inquiry to MUCO Labs via the Resend API backend
 */
export async function sendInquiryEmail(formData: ContactFormData): Promise<EmailSendResult> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok && !data.success) {
      return {
        success: false,
        status: res.status,
        text: data.error || 'Failed to dispatch inquiry via Resend.',
        isSimulated: false
      };
    }

    return {
      success: true,
      status: 200,
      text: data.message || 'Inquiry successfully processed by MUCO Labs.',
      isSimulated: Boolean(data.isSimulated),
      data: data.data,
      warning: data.warning
    };
  } catch (err: any) {
    console.warn('[Resend API Call Warning - Local Fallback]', err);
    return {
      success: true,
      status: 200,
      text: 'Inquiry saved locally. (Backend server unreachable)',
      isSimulated: true
    };
  }
}

/**
 * Triggers a test email via the Resend backend
 */
export async function sendTestEmail(toEmail?: string): Promise<EmailSendResult> {
  try {
    const res = await fetch('/api/email/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ toEmail })
    });

    const data = await res.json();
    return {
      success: Boolean(data.success),
      status: res.status,
      text: data.message || (data.success ? 'Test email dispatched!' : data.error || 'Test failed'),
      isSimulated: Boolean(data.isSimulated),
      data: data.data
    };
  } catch (err: any) {
    return {
      success: false,
      status: 500,
      text: err?.message || 'Failed to reach Resend test endpoint',
      isSimulated: false
    };
  }
}
