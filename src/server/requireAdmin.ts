import { getAdminAuth, isFirebaseAdminUser } from '../../server-firebase';

export interface IncomingHeaders {
  [key: string]: string | string[] | undefined;
}

function header(headers: IncomingHeaders, name: string): string {
  const value = headers[name] ?? headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

export async function authorizeAdmin(headers: IncomingHeaders): Promise<{ ok: true; via: string } | { ok: false; status: number; error: string }> {
  const adminKey = process.env.ADMIN_API_KEY;
  const providedKey = header(headers, 'x-admin-key');
  if (adminKey && providedKey && providedKey === adminKey) {
    return { ok: true, via: 'api-key' };
  }

  const authorization = header(headers, 'authorization');
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  if (!token) {
    return { ok: false, status: 401, error: 'Admin authentication required.' };
  }

  const auth = getAdminAuth();
  if (!auth) {
    return { ok: false, status: 503, error: 'Admin auth is not configured on the server.' };
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    const allowlist = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    if (decoded.email && allowlist.includes(decoded.email.toLowerCase())) {
      return { ok: true, via: 'email-allowlist' };
    }

    if (await isFirebaseAdminUser(decoded.uid)) {
      return { ok: true, via: 'firebase-admin' };
    }

    return { ok: false, status: 403, error: 'Authenticated user is not an admin.' };
  } catch {
    return { ok: false, status: 401, error: 'Invalid or expired admin token.' };
  }
}
