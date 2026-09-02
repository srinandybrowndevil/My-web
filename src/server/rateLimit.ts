type Bucket = { count: number; resetTime: number };

const store = new Map<string, Bucket>();

export function checkRateLimit(
  identifier: string,
  maxRequests = 8,
  windowMs = 60_000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    store.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}

export function clientIp(req: { headers: Record<string, unknown>; socket?: { remoteAddress?: string } }): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return String(forwarded[0]).split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}
