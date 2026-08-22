import express from 'express';
import path from 'path';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { generateSitemapXml, generateRobotsTxt, getSitemapStats } from './src/lib/sitemapGenerator';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable Gzip/Brotli HTTP compression for optimal network speed
  app.use(compression());

  // Performance & Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(express.json());

  // In-memory messages store for submitted leads
  let contactMessages: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    serviceCategory: string;
    budgetRange: string;
    message: string;
    timestamp: string;
    status: 'New' | 'Contacted' | 'Closed';
  }> = [
    {
      id: 'msg-sample-1',
      name: 'Anand Kumar',
      email: 'anand@texexports.com',
      phone: '+91 98421 12345',
      company: 'TexExports India',
      serviceCategory: 'Website Development',
      budgetRange: '₹50,000 - ₹1,00,000',
      message: 'Need a custom B2B web application with multi-language support and product catalog for international buyers.',
      timestamp: '2026-08-03 10:30 AM',
      status: 'New'
    },
    {
      id: 'msg-sample-2',
      name: 'Priya Sundaram',
      email: 'priya@freshmart.in',
      phone: '+91 98940 67890',
      company: 'FreshMart Supermarkets',
      serviceCategory: 'Mobile App Development',
      budgetRange: '₹1,00,000+',
      message: 'Looking for a cross-platform mobile delivery app on iOS and Play Store for grocery ordering in Erode.',
      timestamp: '2026-08-03 02:15 PM',
      status: 'Contacted'
    }
  ];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', company: 'MUCO Labs', founder: 'Srinivash Mahalingam' });
  });

  // Dynamic XML Sitemap Endpoint for Search Engine Bots & Audits
  app.get('/sitemap.xml', (req, res) => {
    try {
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
      const robots = generateRobotsTxt();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
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

  // Get all submitted contact messages
  app.get('/api/contact/messages', (req, res) => {
    res.json({ success: true, count: contactMessages.length, messages: contactMessages });
  });

  // Save new contact message
  app.post('/api/contact', (req, res) => {
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

    contactMessages.unshift(newMsg);
    console.log('[MUCO Labs Lead Received]', newMsg);

    res.json({
      success: true,
      message: 'Thank you for contacting MUCO Labs. Founder Srinivash Mahalingam or an engineer will get back to you shortly.',
      receivedData: newMsg
    });
  });

  // Clear or delete a message
  app.delete('/api/contact/messages/:id', (req, res) => {
    const { id } = req.params;
    contactMessages = contactMessages.filter((m) => m.id !== id);
    res.json({ success: true, remainingCount: contactMessages.length });
  });

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
