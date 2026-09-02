import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleDeleteMessage } from '../../../src/server/contactApi';
import { mapVercel } from '../../_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  const mapped = mapVercel(req, res);
  return handleDeleteMessage(mapped.req, mapped.res);
}
