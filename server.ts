import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', company: 'MUCO Labs', founder: 'Srinivash Mahalingam' });
  });

  app.post('/api/contact', (req, res) => {
    const { name, email, phone, company, serviceCategory, budgetRange, message } = req.body;
    console.log('[MUCO Labs Lead Received]', { name, email, phone, company, serviceCategory, budgetRange, message });

    res.json({
      success: true,
      message: 'Thank you for contacting MUCO Labs. Founder Srinivash Mahalingam or an engineer will get back to you shortly.',
      receivedData: { name, email, phone, serviceCategory }
    });
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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MUCO Labs server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
