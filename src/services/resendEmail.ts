import { ContactFormData } from '../types';
import { adminHeaders } from '../utils/adminClient';

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
  data?: Record<string, unknown>;
  warning?: string;
}

export async function getResendStatus(): Promise<EmailStatus> {
  try {
    const res = await fetch('/api/email/status', { headers: await adminHeaders() });
    if (!res.ok) throw new Error('Failed to fetch status');
    return await res.json();
  } catch {
    return {
      configured: false,
      provider: 'resend',
      fromEmail: 'MUCO Labs <onboarding@resend.dev>',
      toEmail: 'contact@mucolabs.in'
    };
  }
}

export async function sendInquiryEmail(formData: ContactFormData): Promise<EmailSendResult> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok || data.success === false) {
      return {
        success: false,
        status: res.status,
        text: data.error || 'Failed to dispatch inquiry via Resend.',
        isSimulated: false
      };
    }

    return {
      success: true,
      status: res.status,
      text: data.message || 'Inquiry successfully processed by MUCO Labs.',
      isSimulated: Boolean(data.isSimulated),
      data: data.data,
      warning: data.warning
    };
  } catch (err: unknown) {
    return {
      success: false,
      status: 500,
      text: 'Unable to reach the inquiry server. Please try again or use WhatsApp.',
      isSimulated: false
    };
  }
}

export async function sendTestEmail(toEmail?: string): Promise<EmailSendResult> {
  try {
    const res = await fetch('/api/email/test', {
      method: 'POST',
      headers: await adminHeaders(),
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
  } catch (err: unknown) {
    return {
      success: false,
      status: 500,
      text: err instanceof Error ? err.message : 'Failed to reach Resend test endpoint',
      isSimulated: false
    };
  }
}
