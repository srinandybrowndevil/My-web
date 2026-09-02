import { escapeHtml } from './html';
import type { ContactPayload } from './contactPayload';

export function brandedInquiryHtml(data: ContactPayload & { timestamp: string }): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const company = escapeHtml(data.company || 'N/A');
  const service = escapeHtml(data.serviceCategory);
  const budget = escapeHtml(data.budgetRange || 'Flexible');
  const subject = escapeHtml(data.subject || 'Website Inquiry');
  const message = escapeHtml(data.message);
  const timestamp = escapeHtml(data.timestamp);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry - MUCO Labs</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#090d16;color:#f8fafc;margin:0;padding:24px;">
  <div style="max-width:620px;margin:0 auto;background:#0f172a;border-radius:20px;border:1px solid #1e293b;padding:36px 32px;">
    <div style="text-align:center;border-bottom:2px solid #ea580c;padding-bottom:22px;margin-bottom:26px;">
      <div style="font-size:28px;font-weight:900;color:#f97316;">MUCO LABS</div>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td>Client Name</td><td>${name}</td></tr>
      <tr><td>Email</td><td>${email}</td></tr>
      <tr><td>Phone</td><td>${phone}</td></tr>
      <tr><td>Company</td><td>${company}</td></tr>
      <tr><td>Service</td><td>${service}</td></tr>
      <tr><td>Budget Range</td><td>${budget}</td></tr>
      <tr><td>Subject</td><td>${subject}</td></tr>
      <tr><td>Date &amp; Time</td><td>${timestamp}</td></tr>
    </table>
    <div style="white-space:pre-wrap;">${message}</div>
  </div>
</body>
</html>`;
}

export function clientAutoReplyHtml(name: string, serviceCategory: string): string {
  const safeName = escapeHtml(name);
  const safeService = escapeHtml(serviceCategory);
  return `<!DOCTYPE html>
<html><body>
  <p>Thank you for reaching out, ${safeName}!</p>
  <p>We received your inquiry regarding <strong>${safeService}</strong>.</p>
</body></html>`;
}
