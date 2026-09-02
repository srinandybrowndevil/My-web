import { getApps, initializeApp, cert, applicationDefault, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import firebaseConfig from './firebase-applet-config.json';

let adminApp: App | null = null;
let initAttempted = false;

function parseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    console.error('[Firebase Admin] FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON');
    return null;
  }
}

export function getFirebaseAdminApp(): App | null {
  if (adminApp) return adminApp;
  if (initAttempted) return getApps()[0] ?? null;
  initAttempted = true;

  try {
    if (getApps().length > 0) {
      adminApp = getApps()[0];
      return adminApp;
    }

    const serviceAccount = parseServiceAccount();
    const projectId = process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId;

    if (serviceAccount) {
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || projectId
      });
      return adminApp;
    }

    adminApp = initializeApp({
      credential: applicationDefault(),
      projectId
    });
    return adminApp;
  } catch (error) {
    console.warn('[Firebase Admin] Not initialized. Set FIREBASE_SERVICE_ACCOUNT_JSON for server reads/writes.', error);
    adminApp = null;
    return null;
  }
}

export function getAdminDb() {
  const app = getFirebaseAdminApp();
  return app ? getFirestore(app) : null;
}

export function getAdminAuth() {
  const app = getFirebaseAdminApp();
  return app ? getAuth(app) : null;
}

export async function submitContactFormServer(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceCategory?: string;
  message: string;
}): Promise<string> {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Firebase Admin is not configured');
  }

  const docRef = await db.collection('contact_submissions').add({
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company || '',
    serviceCategory: data.serviceCategory || 'General Inquiry',
    message: data.message,
    status: 'unread',
    createdAt: FieldValue.serverTimestamp()
  });
  return docRef.id;
}

export async function getContactMessagesServer() {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Firebase Admin is not configured');
  }

  const snapshot = await db.collection('contact_submissions').orderBy('createdAt', 'desc').limit(200).get();

  return snapshot.docs.map((item) => {
    const data = item.data();
    const createdAt = data.createdAt?.toDate?.() as Date | undefined;
    return {
      id: item.id,
      ...data,
      timestamp: createdAt
        ? createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        : 'N/A'
    };
  });
}

export async function deleteContactMessageServer(id: string) {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Firebase Admin is not configured');
  }
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) {
    throw new Error('Invalid message id');
  }
  await db.collection('contact_submissions').doc(id).delete();
  return true;
}

export async function isFirebaseAdminUser(uid: string): Promise<boolean> {
  const db = getAdminDb();
  if (!db) return false;
  const snap = await db.collection('admins').doc(uid).get();
  if (snap.exists) return true;
  const userSnap = await db.collection('users').doc(uid).get();
  const role = userSnap.data()?.role;
  return role === 'ADMIN' || role === 'SUPER_ADMIN';
}
