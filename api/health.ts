import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleHealth } from '../src/server/contactApi';
import { mapVercel } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const mapped = mapVercel(req, res);
  return handleHealth(mapped.req, mapped.res);
}
