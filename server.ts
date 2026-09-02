import 'dotenv/config';
import express from 'express';
import path from 'path';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { generateSitemapXml, generateRobotsTxt, getSitemapStats } from './src/lib/sitemapGenerator';
import {
  handleDeleteMessage,
  handleEmailStatus,
  handleEmailTest,
  handleHealth,
  handleListMessages,
  handleSendEmail
} from './src/server/contactApi';
import type { ApiRequest, ApiResponse } from './src/server/http';

function asApi(req: express.Request, res: express.Response): { req: ApiRequest; res: ApiResponse } {
  return { req: req as unknown as ApiRequest, res: res as unknown as ApiResponse };
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(compression());
  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));

  app.use((req, res, next) => {
    const host = req.headers.host || '';
    if (host.startsWith('www.mucolabs.in')) {
      return res.redirect(301, `https://mucolabs.in${req.originalUrl}`);
    }
    next();
  });

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }
    next();
  });

  app.get('/api/health', (req, res) => {
    const mapped = asApi(req, res);
    return handleHealth(mapped.req, mapped.res);
  });
  app.get('/api/email/status', (req, res) => {
    const mapped = asApi(req, res);
    return handleEmailStatus(mapped.req, mapped.res);
  });
  app.post('/api/email/test', (req, res) => {
    const mapped = asApi(req, res);
    return handleEmailTest(mapped.req, mapped.res);
  });
  app.post('/api/send-email', (req, res) => {
    const mapped = asApi(req, res);
    return handleSendEmail(mapped.req, mapped.res);
  });
  app.post('/api/contact', (req, res) => {
    const mapped = asApi(req, res);
    return handleSendEmail(mapped.req, mapped.res);
  });
  app.get('/api/contact/messages', (req, res) => {
    const mapped = asApi(req, res);
    return handleListMessages(mapped.req, mapped.res);
  });
  app.delete('/api/contact/messages/:id', (req, res) => {
    const mapped = asApi(req, res);
    mapped.req.params = req.params;
    return handleDeleteMessage(mapped.req, mapped.res);
  });

  app.get('/sitemap.xml', (_req, res) => {
    try {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      res.send(generateSitemapXml());
    } catch (err) {
      console.error('[SEO Sitemap Error]', err);
      res.status(500).send('Error generating dynamic sitemap');
    }
  });

  app.get('/robots.txt', (_req, res) => {
    try {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      res.send(generateRobotsTxt());
    } catch (err) {
      console.error('[SEO Robots.txt Error]', err);
      res.status(500).send('Error generating robots.txt');
    }
  });

  app.get('/api/seo/sitemap', (_req, res) => {
    try {
      res.json({ success: true, ...getSitemapStats() });
    } catch (err: unknown) {
      res.status(500).json({ success: false, error: err instanceof Error ? err.message : 'Failed to get SEO stats' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
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
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MUCO Labs server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
