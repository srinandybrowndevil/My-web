import { auth } from '../services/firebase';

export async function adminHeaders(): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  const user = auth.currentUser;
  if (user) {
    headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }

  return headers;
}

export function isAdminProfile(role?: string | null, email?: string | null): boolean {
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') return true;
  const allow = String(import.meta.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email && allow.includes(email.toLowerCase()));
}
