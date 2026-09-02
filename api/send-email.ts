import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleSendEmail } from '../src/server/contactApi';
import { mapVercel } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  const mapped = mapVercel(req, res);
  return handleSendEmail(mapped.req, mapped.res);
}
