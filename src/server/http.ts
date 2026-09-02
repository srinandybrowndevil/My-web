export interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  params?: Record<string, string | undefined>;
  socket?: { remoteAddress?: string };
}

export interface ApiResponse {
  status(code: number): ApiResponse;
  json(payload: unknown): unknown;
  setHeader(name: string, value: string): void;
}

export function jsonBody(req: ApiRequest): Record<string, unknown> {
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    return req.body as Record<string, unknown>;
  }
  return {};
}

export function queryValue(req: ApiRequest, key: string): string {
  const value = req.query?.[key] ?? req.params?.[key];
  return Array.isArray(value) ? value[0] || '' : value || '';
}
