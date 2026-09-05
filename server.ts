import express from 'express';
import path from 'path';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import { generateSitemapXml, generateRobotsTxt, getSitemapStats } from './src/lib/sitemapGenerator';
import { submitContactFormServer, getContactMessagesServer, deleteContactMessageServer } from './server-firebase';

// Lazy initialized Resend client to avoid startup crashes if API key is not yet set
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry - MUCO Labs</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090d16; color: #f8fafc; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #0f172a; border-radius: 20px; border: 1px solid #1e293b; padding: 36px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
    .header { text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 22px; margin-bottom: 26px; }
    .brand { font-size: 28px; font-weight: 900; color: #f97316; letter-spacing: -0.5px; }
    .tagline { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2.5px; margin-top: 5px; }
    .badge { display: inline-block; background: linear-gradient(135deg, #ea580c, #d97706); color: #ffffff; font-size: 11px; font-weight: 800; padding: 6px 18px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 22px; letter-spacing: 1px; }
    .table-container { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 24px; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; }
    .table-container td { padding: 13px 18px; font-size: 13px; border-bottom: 1px solid #1e293b; }
    .table-container tr:last-child td { border-bottom: none; }
    .label-col { width: 34%; background-color: #070c18; font-weight: 800; color: #fb923c; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
    .value-col { width: 66%; background-color: #0f172a; color: #f8fafc; font-weight: 600; }
    .message-box { background: #070c18; padding: 22px; border-radius: 14px; border-left: 4px solid #f97316; color: #f1f5f9; font-size: 14px; line-height: 1.7; white-space: pre-wrap; margin-top: 10px; border: 1px solid #1e293b; }
    .section-title { font-size: 12px; font-weight: 800; color: #fb923c; text-transform: uppercase; letter-spacing: 1.2px; margin-top: 22px; margin-bottom: 8px; }
    .footer { text-align: center; margin-top: 32px; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 22px; line-height: 1.6; }
    .footer a { color: #f97316; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">MUCO LABS</div>
      <div class="tagline">ENTERPRISE SOFTWARE &bull; AI ENGINES &bull; CLOUD</div>
    </div>

    <div style="text-align: center;">
      <span class="badge">NEW CLIENT PROPOSAL INQUIRY</span>
    </div>

    <table class="table-container">
      <tr>
        <td class="label-col">Client Name</td>
        <td class="value-col">${data.name}</td>
      </tr>
      <tr>
        <td class="label-col">Email</td>
        <td class="value-col"><a href="mailto:${data.email}" style="color: #fb923c; text-decoration: none;">${data.email}</a></td>
      </tr>
      <tr>
        <td class="label-col">Phone</td>
        <td class="value-col"><a href="tel:${data.phone}" style="color: #fb923c; text-decoration: none;">${data.phone}</a></td>
      </tr>
      <tr>
        <td class="label-col">Company</td>
        <td class="value-col">${data.company || 'N/A'}</td>
      </tr>
      <tr>
        <td class="label-col">Service</td>
        <td class="value-col" style="color: #fdba74;">${data.serviceCategory}</td>
      </tr>
      <tr>
        <td class="label-col">Budget Range</td>
        <td class="value-col">${data.budgetRange || 'Flexible'}</td>
      </tr>
      <tr>
        <td class="label-col">Subject</td>
        <td class="value-col">${data.subject || 'Website Inquiry'}</td>
      </tr>
      <tr>
        <td class="label-col">Date & Time</td>
        <td class="value-col">${data.timestamp}</td>
      </tr>
    </table>

    <div class="section-title">Message / Project Scope</div>
    <div class="message-box">${data.message}</div>

    <div class="footer">
      Official Dispatch via <strong>Resend API</strong> &bull; <a href="https://mucolabs.com">mucolabs.com</a><br>
      Founder Srinivash Mahalingam &bull; Direct Phone: +91 63818 09844<br>
      MUCO Labs, Erode, Tamil Nadu, India
    </div>
  </div>
</body>
</html>`;
}

function generateClientAutoReplyHtml(name: string, serviceCategory: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .logo { font-size: 22px; font-weight: 900; color: #ea580c; }
    .title { font-size: 18px; font-weight: 800; margin-top: 16px; color: #0f172a; }
    .text { font-size: 14px; line-height: 1.6; color: #334155; margin-top: 12px; }
    .highlight { background: #fff7ed; border-left: 4px solid #ea580c; padding: 14px 18px; border-radius: 8px; font-size: 13px; color: #9a3412; margin-top: 18px; }
    .footer { font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 18px; margin-top: 24px; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">MUCO LABS</div>
    <div class="title">Thank you for reaching out, ${name}!</div>
    <p class="text">We have successfully received your project inquiry regarding <strong>${serviceCategory}</strong>.</p>
    <p class="text">Our founder Srinivash Mahalingam and engineering team will review your specifications and get back to you within 24 hours with next steps and a customized technical scope.</p>
    
    <div class="highlight">
      <strong>Commercial Milestone Standard:</strong> Unless otherwise agreed, custom software projects operate on our standard 50% advance milestone framework.
    </div>

    <p class="text" style="margin-top: 20px;">
      Warm regards,<br>
      <strong>MUCO Labs Team</strong><br>
      Erode, Tamil Nadu, India | <a href="https://mucolabs.com" style="color: #ea580c;">mucolabs.com</a>
    </p>

    <div class="footer">
      This is an automated acknowledgment from MUCO Labs. You can also chat directly on WhatsApp at +91 63818 09844.
    </div>
  </div>
</body>
</html>`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable Gzip/Brotli HTTP compression for optimal network speed
  app.use(compression());

  // Canonical host enforcement for local/Express deployments.
  app.use((req, res, next) => {
    const host = (req.headers.host || '').split(':')[0].toLowerCase();
    const legacyHosts = new Set(['www.mucolabs.com', 'mucolabs.in', 'www.mucolabs.in']);
    if (legacyHosts.has(host)) {
      return res.redirect(301, `https://mucolabs.com${req.originalUrl}`);
    }
    next();
  });

  // Performance & Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Search Engine De-indexing Middleware for Preview / Staging / ai.studio hosts
  // Instructs Googlebot and all search engines to completely remove this host from Google Search results
  app.use((req, res, next) => {
    const rawHost = (req.headers.host || '').split(':')[0].toLowerCase();
    const isOfficialProduction = rawHost === 'mucolabs.com' || rawHost === 'www.mucolabs.com';

    // If accessed on mucolabs.ai.studio, *.ai.studio, *.run.app, or any preview/staging environment:
    if (!isOfficialProduction || rawHost.includes('ai.studio') || rawHost.includes('run.app')) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
      res.setHeader('Link', `<https://mucolabs.com${req.originalUrl || '/'}>; rel="canonical"`);
    }
    next();
  });

  app.use(express.json());

  // Firebase-based persistent storage for contact messages
  // Messages are now stored in Firestore instead of in-memory

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', company: 'MUCO Labs', founder: 'Srinivash Mahalingam' });
  });

  // Dynamic XML Sitemap Endpoint for Search Engine Bots & Audits
  app.get('/sitemap.xml', (req, res) => {
    try {
      const host = (req.headers.host || '').split(':')[0].toLowerCase();
      const isOfficialProduction = host === 'mucolabs.com' || host === 'www.mucolabs.com';

      if (!isOfficialProduction && (host.includes('ai.studio') || host.includes('run.app'))) {
        res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
        return res.status(404).send('Sitemap is only available on the official production domain: https://mucolabs.com/sitemap.xml');
      }

      const xml = generateSitemapXml();
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      res.send(xml);
    } catch (err: any) {
      console.error('[SEO Sitemap Error]', err);
      res.status(500).send('Error generating dynamic sitemap');
    }
  });

  // Dynamic Robots.txt Endpoint
  app.get('/robots.txt', (req, res) => {
    try {
      const host = (req.headers.host || '').split(':')[0].toLowerCase();
      const robots = generateRobotsTxt(host);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');

      const isOfficialProduction = host === 'mucolabs.com' || host === 'www.mucolabs.com';
      if (!isOfficialProduction || host.includes('ai.studio') || host.includes('run.app')) {
        res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
      }
      res.send(robots);
    } catch (err: any) {
      console.error('[SEO Robots.txt Error]', err);
      res.status(500).send('Error generating robots.txt');
    }
  });

  // SEO Info API endpoint (for frontend inspection & testing)
  app.get('/api/seo/sitemap', (req, res) => {
    try {
      const stats = getSitemapStats();
      res.json({ success: true, ...stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Failed to get SEO stats' });
    }
  });

  // Get all submitted contact messages (now from Firebase)
  app.get('/api/contact/messages', async (req, res) => {
    try {
      const messages = await getContactMessagesServer();
      res.json({ success: true, count: messages.length, messages });
    } catch (error) {
      console.error('[Firebase Messages Error]', error);
      res.status(500).json({ success: false, error: 'Failed to fetch messages from Firebase', fallback: [] });
    }
  });

  // Resend Email Integration Status
  app.get('/api/email/status', (req, res) => {
    const resend = getResend();
    res.json({
      configured: Boolean(resend),
      provider: 'resend',
      fromEmail: process.env.RESEND_FROM_EMAIL || 'MUCO Labs <onboarding@resend.dev>',
      toEmail: process.env.RESEND_TO_EMAIL || 'contact@mucolabs.in'
    });
  });

  // Test Resend Email Dispatch
  app.post('/api/email/test', async (req, res) => {
    const resend = getResend();
    const toEmail = req.body?.toEmail || process.env.RESEND_TO_EMAIL || 'contact@mucolabs.in';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'MUCO Labs <onboarding@resend.dev>';

    if (!resend) {
      return res.json({
        success: true,
        isSimulated: true,
        message: 'Resend API key is not configured yet in environment variables. Test email simulated successfully.',
        details: {
          to: toEmail,
          from: fromEmail,
          note: 'Add RESEND_API_KEY to your environment variables or .env to dispatch live emails via Resend.'
        }
      });
    }

    try {
      const response = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: 'MUCO Labs - Resend Integration Verification Test',
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #0f172a; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #ea580c; margin-top: 0;">MUCO Labs Resend Test</h2>
            <p>Your <strong>Resend</strong> email service is configured and operating correctly!</p>
            <p style="font-size: 12px; color: #64748b;">Timestamp: ${new Date().toISOString()}</p>
          </div>
        `
      });

      res.json({
        success: true,
        isSimulated: false,
        message: 'Live test email dispatched successfully via Resend!',
        data: response
      });
    } catch (err: any) {
      console.error('[Resend Test Error]', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Failed to dispatch email via Resend'
      });
    }
  });

  // Primary Email Inquiry Dispatch via Resend with Firebase persistence
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

    // Store lead in Firebase for persistence
    try {
      await submitContactFormServer({
        name: newMsg.name,
        email: newMsg.email,
        phone: newMsg.phone,
        company: newMsg.company,
        serviceCategory: newMsg.serviceCategory,
        message: newMsg.message
      });
      console.log('[MUCO Labs Lead Received via Firebase + Resend pipeline]', newMsg);
    } catch (firebaseError) {
      console.warn('[Firebase Storage Warning]', firebaseError);
      // Continue with email dispatch even if Firebase fails
    }

    const resend = getResend();
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'MUCO Labs <onboarding@resend.dev>';
    const toEmail = process.env.RESEND_TO_EMAIL || 'contact@mucolabs.in';

    if (!resend) {
      return res.json({
        success: true,
        isSimulated: true,
        message: 'Inquiry received and logged to Firebase. (Resend simulated sandbox mode - add RESEND_API_KEY to send live emails).',
        receivedData: newMsg
      });
    }

    try {
      // 1. Send inquiry notification to MUCO Labs team
      const primaryEmailPromise = resend.emails.send({
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

      // 2. Send auto-reply to client if a valid client email is provided
      let autoReplyPromise = Promise.resolve();
      if (email && email.includes('@')) {
        autoReplyPromise = resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: `Thank you for contacting MUCO Labs - ${serviceCategory || 'Inquiry'}`,
          html: generateClientAutoReplyHtml(newMsg.name, newMsg.serviceCategory)
        }).catch((err) => {
          console.warn('[Resend Client Auto-Reply Error]', err?.message);
        }) as any;
      }

      const [resendResult] = await Promise.all([primaryEmailPromise, autoReplyPromise]);

      res.json({
        success: true,
        isSimulated: false,
        message: 'Your inquiry has been successfully sent to MUCO Labs via Resend and stored in Firebase!',
        data: resendResult,
        receivedData: newMsg
      });
    } catch (err: any) {
      console.error('[Resend Dispatch Error]', err);
      // Return a graceful response with error info so client flow is not broken
      res.json({
        success: true,
        isSimulated: false,
        warning: 'Saved lead in Firebase database, but Resend API returned an error: ' + (err?.message || 'Check sender domain'),
        receivedData: newMsg
      });
    }
  });

  // Save new contact message (legacy endpoint compatibility - now uses Firebase)
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

    // Store in Firebase for persistence
    try {
      await submitContactFormServer({
        name: newMsg.name,
        email: newMsg.email,
        phone: newMsg.phone,
        company: newMsg.company,
        serviceCategory: newMsg.serviceCategory,
        message: newMsg.message
      });
      console.log('[MUCO Labs Lead Received via Firebase]', newMsg);
    } catch (firebaseError) {
      console.warn('[Firebase Storage Warning]', firebaseError);
    }

    res.json({
      success: true,
      message: 'Thank you for contacting MUCO Labs. Founder Srinivash Mahalingam or an engineer will get back to you shortly.',
      receivedData: newMsg
    });
  });

  // Clear or delete a message (now from Firebase)
  app.delete('/api/contact/messages/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await deleteContactMessageServer(id);
      res.json({ success: true, deletedId: id });
    } catch (error) {
      console.error('[Firebase Delete Error]', error);
      res.status(500).json({ success: false, error: 'Failed to delete message from Firebase' });
    }
  });

  // Direct static serving for public assets and image directories
  app.use('/assets/images', express.static(path.join(process.cwd(), 'public/assets/images')));
  app.use('/asset/images', express.static(path.join(process.cwd(), 'public/asset/images')));

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MUCO Labs server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
