import { clip } from './html';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceCategory: string;
  budgetRange: string;
  subject: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{10,20}$/;

export function parseContactPayload(body: Record<string, unknown>): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  const name = clip(body.name, 100);
  const email = clip(body.email, 150);
  const phone = clip(body.phone, 20);
  const company = clip(body.company, 120);
  const serviceCategory = clip(body.serviceCategory, 80) || 'General Inquiry';
  const budgetRange = clip(body.budgetRange, 80) || 'Flexible';
  const subject = clip(body.subject, 120);
  const message = clip(body.message, 3000);

  if (name.length < 2) return { ok: false, error: 'Name must be at least 2 characters.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'A valid email address is required.' };
  if (phone && !PHONE_RE.test(phone)) return { ok: false, error: 'Phone number format is invalid.' };
  if (message.length < 5) return { ok: false, error: 'Message must be at least 5 characters.' };

  return {
    ok: true,
    data: { name, email, phone, company, serviceCategory, budgetRange, subject, message }
  };
}
