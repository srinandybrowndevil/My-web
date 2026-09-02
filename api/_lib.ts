import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { ApiRequest, ApiResponse } from '../src/server/http';

export function mapVercel(req: VercelRequest, res: VercelResponse): { req: ApiRequest; res: ApiResponse } {
  const id = typeof req.query.id === 'string' ? req.query.id : Array.isArray(req.query.id) ? req.query.id[0] : undefined;
  return {
    req: {
      method: req.method,
      headers: req.headers as ApiRequest['headers'],
      body: req.body,
      query: req.query as ApiRequest['query'],
      params: { id },
      socket: { remoteAddress: req.socket?.remoteAddress }
    },
    res: res as unknown as ApiResponse
  };
}
