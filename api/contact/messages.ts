import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleDeleteMessage, handleListMessages } from '../../src/server/contactApi';
import { mapVercel } from '../_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const mapped = mapVercel(req, res);
  if (req.method === 'GET') return handleListMessages(mapped.req, mapped.res);
  if (req.method === 'DELETE') return handleDeleteMessage(mapped.req, mapped.res);
  res.setHeader('Allow', 'GET, DELETE');
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
