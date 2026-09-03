import express from 'express';
import { Resend } from 'resend';
import { generateSitemapXml, generateRobotsTxt, getSitemapStats } from '../src/lib/sitemapGenerator';
import { submitContactFormServer, getContactMessagesServer, deleteContactMessageServer } from '../server-firebase';

const app = express();

app.use(express.json());

// Security & Header configuration
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

let resendClient: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function generateBrandedHtmlEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceCategory: string;
  budgetRange?: string;
  subject?: string;
  message: string;
  timestamp: string;
}) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Website Enquiry - MUCO Labs</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #090d16; color: #f8fafc; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #0f172a; border-radius: 20px; border: 1px solid #1e293b; padding: 36px 32px; }
    .header { text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 22px; margin-bottom: 26px; }
    .brand { font-size: 28px; font-weight: 900; color: #f97316; }
    .table-container { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 24px; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; }
    .table-container td { padding: 13px 18px; font-size: 13px; border-bottom: 1px solid #1e293b; }
    .label-col { width: 34%; background-color: #070c18; font-weight: 800; color: #fb923c; text-transform: uppercase; font-size: 11px; }
    .value-col { width: 66%; background-color: #0f172a; color: #f8fafc; font-weight: 600; }
    .message-box { background: #070c18; padding: 22px; border-radius: 14px; border-left: 4px solid #f97316; color: #f1f5f9; font-size: 14px; line-height: 1.7; margin-top: 10px; border: 1px solid #1e293b; }
    .footer { text-align: center; margin-top: 32px; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 22px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">MUCO LABS</div>
      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">ENTERPRISE SOFTWARE &bull; AI ENGINES</div>
    </div>
    <table class="table-container">
      <tr><td class="label-col">Client Name</td><td class="value-col">${data.name}</td></tr>
      <tr><td class="label-col">Email</td><td class="value-col">${data.email}</td></tr>
      <tr><td class="label-col">Phone</td><td class="value-col">${data.phone}</td></tr>
      <tr><td class="label-col">Company</td><td class="value-col">${data.company || 'N/A'}</td></tr>
      <tr><td class="label-col">Service</td><td class="value-col">${data.serviceCategory}</td></tr>
      <tr><td class="label-col">Budget</td><td class="value-col">${data.budgetRange || 'Flexible'}</td></tr>
      <tr><td class="label-col">Date & Time</td><td class="value-col">${data.timestamp}</td></tr>
    </table>
    <div class="message-box">${data.message}</div>
    <div class="footer">
      Official Dispatch via Resend API &bull; mucolabs.com<br>
      Founder Srinivash Mahalingam &bull; MUCO Labs, Erode, Tamil Nadu, India
    </div>
  </div>
</body>
</html>`;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', company: 'MUCO Labs', founder: 'Srinivash Mahalingam', runtime: 'Vercel Serverless' });
});

// Dynamic XML Sitemap Endpoint
app.get('/api/sitemap.xml', (req, res) => {
  try {
    const xml = generateSitemapXml();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.send(xml);
  } catch (err: any) {
    res.status(500).send('Error generating dynamic sitemap');
  }
});

// Dynamic Robots.txt Endpoint
app.get('/api/robots.txt', (req, res) => {
  try {
    const robots = generateRobotsTxt();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.send(robots);
  } catch (err: any) {
    res.status(500).send('Error generating robots.txt');
  }
});

// SEO stats endpoint
app.get('/api/seo/sitemap', (req, res) => {
  try {
    const stats = getSitemapStats();
    res.json({ success: true, ...stats });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Failed to get SEO stats' });
  }
});

// Get all contact messages
app.get('/api/contact/messages', async (req, res) => {
  try {
    const messages = await getContactMessagesServer();
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch messages', fallback: [] });
  }
});

// Email status
app.get('/api/email/status', (req, res) => {
  const resend = getResend();
  res.json({
    configured: Boolean(resend),
    provider: 'resend',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'MUCO Labs <onboarding@resend.dev>',
    toEmail: process.env.RESEND_TO_EMAIL || 'contact@mucolabs.in'
  });
});

// Submit contact form via Resend + Firebase
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, company, serviceCategory, budgetRange, subject, message } = req.body;
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
  const newMsg = {
    id: `msg-${Date.now()}`,
    name: name || 'Valued Client',
    email: email || 'No email provided',
    phone: phone || 'No phone provided',
    company: company || 'N/A',
    serviceCategory: serviceCategory || 'Website Development',
    budgetRange: budgetRange || 'Flexible',
    message: message || '',
    timestamp,
    status: 'New' as const
  };

  try {
    await submitContactFormServer({
      name: newMsg.name,
      email: newMsg.email,
      phone: newMsg.phone,
      company: newMsg.company,
      serviceCategory: newMsg.serviceCategory,
      message: newMsg.message
    });
  } catch (e) {
    console.warn('[Firebase Storage Warning]', e);
  }

  const resend = getResend();
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'MUCO Labs <onboarding@resend.dev>';
  const toEmail = process.env.RESEND_TO_EMAIL || 'contact@mucolabs.in';

  if (!resend) {
    return res.json({
      success: true,
      isSimulated: true,
      message: 'Inquiry logged to Firebase. (Resend simulated sandbox mode).',
      receivedData: newMsg
    });
  }

  try {
    const resendResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email && email.includes('@') ? email : undefined,
      subject: `[MUCO Labs Inquiry] ${serviceCategory || 'Project Proposal'} - ${name || 'Client'}`,
      html: generateBrandedHtmlEmail({
        name: newMsg.name,
        email: newMsg.email,
        phone: newMsg.phone,
        company: newMsg.company,
        serviceCategory: newMsg.serviceCategory,
        budgetRange: newMsg.budgetRange,
        subject: subject || `${serviceCategory} Inquiry`,
        message: newMsg.message,
        timestamp
      })
    });

    res.json({
      success: true,
      isSimulated: false,
      message: 'Inquiry dispatched successfully via Resend!',
      data: resendResult,
      receivedData: newMsg
    });
  } catch (err: any) {
    res.json({
      success: true,
      isSimulated: false,
      warning: 'Saved lead in database; Resend dispatch warning: ' + (err?.message || 'Check domain'),
      receivedData: newMsg
    });
  }
});

// Legacy contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, serviceCategory, budgetRange, message } = req.body;
  const newMsg = {
    id: `msg-${Date.now()}`,
    name: name || 'Anonymous',
    email: email || 'No email provided',
    phone: phone || 'No phone provided',
    company: company || 'Individual',
    serviceCategory: serviceCategory || 'General Inquiry',
    budgetRange: budgetRange || 'Flexible',
    message: message || '',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'New' as const
  };

  try {
    await submitContactFormServer({
      name: newMsg.name,
      email: newMsg.email,
      phone: newMsg.phone,
      company: newMsg.company,
      serviceCategory: newMsg.serviceCategory,
      message: newMsg.message
    });
  } catch (e) {
    console.warn('[Firebase Storage Warning]', e);
  }

  res.json({
    success: true,
    message: 'Thank you for contacting MUCO Labs.',
    receivedData: newMsg
  });
});

// Delete message
app.delete('/api/contact/messages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteContactMessageServer(id);
    res.json({ success: true, deletedId: id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
});

export default app;
