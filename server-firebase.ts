import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Initialize Firebase for server-side operations
let app: any = null;
let db: any = null;

function initializeFirebase() {
  if (app) return app;
  
  try {
    const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    app = firebaseApp;
    db = getFirestore(firebaseApp);
    return app;
  } catch (error) {
    console.warn('[Firebase Server Init Warning]', error);
    return null;
  }
}

// Initialize on module load
initializeFirebase();

export async function submitContactFormServer(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceCategory?: string;
  message: string;
}): Promise<string> {
  if (!db) {
    console.warn('[Firebase Not Available] - Skipping server-side storage');
    return 'skipped';
  }

  try {
    const docRef = await addDoc(collection(db, 'contact_submissions'), {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: data.company || '',
      serviceCategory: data.serviceCategory || 'General Inquiry',
      message: data.message,
      status: 'unread',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('[Server Firebase Error]', error);
    throw error;
  }
}

export async function getContactMessagesServer() {
  if (!db) {
    return [];
  }

  try {
    const q = query(collection(db, 'contact_submissions'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().createdAt ? new Date(doc.data().createdAt.toDate()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'N/A'
    }));
  } catch (error) {
    console.error('[Server Firebase Fetch Error]', error);
    return [];
  }
}

export async function deleteContactMessageServer(id: string) {
  if (!db) {
    throw new Error('Firebase not available');
  }

  try {
    await deleteDoc(doc(db, 'contact_submissions', id));
    return true;
  } catch (error) {
    console.error('[Server Firebase Delete Error]', error);
    throw error;
  }
}