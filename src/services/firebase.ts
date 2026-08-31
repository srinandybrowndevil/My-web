import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut as fbSignOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  setDoc,
  getDoc,
  doc, 
  query, 
  where,
  orderBy, 
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore (with databaseId if defined)
export const db = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId 
  ? getFirestore(app, (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Lazy test connection to Firestore if needed
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection notice: client is currently in offline/cached mode.');
    }
  }
}

// Operation types for standard error formatting
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User Profile Interface
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  preferredLanguage?: 'en' | 'ta';
  role: 'USER' | 'CLIENT' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'active' | 'suspended' | 'pending';
  emailVerified: boolean;
  createdAt?: string | number | Date | unknown;
  updatedAt?: string | number | Date | unknown;
  lastLoginAt?: string | number | Date | unknown;
}

// Sync/Save User Profile in Firestore
export async function syncUserProfile(user: FirebaseUser, additionalData: Partial<UserProfile> = {}): Promise<UserProfile> {
  const userDocRef = doc(db, 'users', user.uid);
  try {
    const existingSnap = await getDoc(userDocRef);
    if (existingSnap.exists()) {
      const data = existingSnap.data() as UserProfile;
      const updatedProfile: Partial<UserProfile> = {
        displayName: user.displayName || data.displayName || 'MUCO User',
        email: user.email || data.email,
        photoURL: user.photoURL || data.photoURL || '',
        emailVerified: user.emailVerified,
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        ...(additionalData.preferredLanguage ? { preferredLanguage: additionalData.preferredLanguage } : {})
      };
      await setDoc(userDocRef, updatedProfile, { merge: true });
      return { ...data, ...updatedProfile } as UserProfile;
    } else {
      const newProfile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName || additionalData.displayName || 'MUCO User',
        email: user.email || '',
        photoURL: user.photoURL || '',
        preferredLanguage: additionalData.preferredLanguage || 'en',
        role: 'USER',
        status: 'active',
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      };
      await setDoc(userDocRef, newProfile);
      return newProfile;
    }
  } catch (error) {
    console.warn('Failed to sync user profile to Firestore:', error);
    return {
      uid: user.uid,
      displayName: user.displayName || 'MUCO User',
      email: user.email || '',
      role: 'USER',
      status: 'active',
      emailVerified: user.emailVerified,
      createdAt: new Date().toISOString()
    };
  }
}

// Submit Project Request
export interface ProjectRequestData {
  userId?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  sourcePage?: string;
  language?: 'en' | 'ta';
  marketingConsent?: boolean;
}

export async function submitProjectRequest(data: ProjectRequestData): Promise<string> {
  const collectionPath = 'project_requests';
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      userId: data.userId || (auth.currentUser ? auth.currentUser.uid : 'guest'),
      name: data.name,
      email: data.email,
      company: data.company || '',
      phone: data.phone || '',
      projectType: data.projectType || 'Custom Software',
      budget: data.budget || 'Custom RFP',
      timeline: data.timeline || 'Flexible',
      message: data.message,
      sourcePage: data.sourcePage || 'contact',
      language: data.language || 'en',
      status: 'new',
      createdAt: serverTimestamp()
    });

    // Also log activity telemetry
    logActivityEvent('project_request_submitted', {
      requestId: docRef.id,
      projectType: data.projectType
    });

    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
    throw error;
  }
}

// Save Estimator Session
export interface EstimatorSessionData {
  userId?: string;
  selectedOptions: string;
  totalOneTime: number;
  totalMonthly: number;
  notes?: string;
}

export async function saveEstimatorSession(data: EstimatorSessionData): Promise<string> {
  const collectionPath = 'estimator_sessions';
  try {
    const uid = data.userId || (auth.currentUser ? auth.currentUser.uid : 'guest');
    const docRef = await addDoc(collection(db, collectionPath), {
      userId: uid,
      selectedOptions: data.selectedOptions,
      totalOneTime: Number(data.totalOneTime),
      totalMonthly: Number(data.totalMonthly || 0),
      notes: data.notes || '',
      createdAt: serverTimestamp()
    });

    logActivityEvent('estimator_saved', {
      sessionId: docRef.id,
      totalOneTime: data.totalOneTime
    });

    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
    throw error;
  }
}

// Fetch User's Saved Project Requests
export async function fetchUserProjectRequests(userId: string): Promise<Array<{ id: string; [key: string]: unknown }>> {
  const collectionPath = 'project_requests';
  try {
    const q = query(
      collection(db, collectionPath),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    const requests: Array<{ id: string; [key: string]: unknown }> = [];
    snap.forEach((docSnap) => {
      requests.push({ id: docSnap.id, ...docSnap.data() });
    });
    return requests;
  } catch (error) {
    console.warn('Could not fetch user requests:', error);
    return [];
  }
}

// Fetch User's Saved Estimator Sessions
export async function fetchUserEstimates(userId: string): Promise<Array<{ id: string; [key: string]: unknown }>> {
  const collectionPath = 'estimator_sessions';
  try {
    const q = query(
      collection(db, collectionPath),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    const estimates: Array<{ id: string; [key: string]: unknown }> = [];
    snap.forEach((docSnap) => {
      estimates.push({ id: docSnap.id, ...docSnap.data() });
    });
    return estimates;
  } catch (error) {
    console.warn('Could not fetch user estimates:', error);
    return [];
  }
}

// Submit Direct Contact Form Message
export interface ContactSubmissionData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceCategory?: string;
  message: string;
}

export async function submitContactForm(data: ContactSubmissionData): Promise<string> {
  const collectionPath = 'contact_submissions';
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: data.company || '',
      serviceCategory: data.serviceCategory || 'General Inquiry',
      message: data.message,
      status: 'unread',
      createdAt: serverTimestamp()
    });

    logActivityEvent('contact_form_submitted', { submissionId: docRef.id });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
    throw error;
  }
}

// Privacy-Conscious Product Usage Telemetry
export async function logActivityEvent(eventName: string, metadata: Record<string, any> = {}) {
  const collectionPath = 'activity_events';
  try {
    const uid = auth.currentUser ? auth.currentUser.uid : 'anonymous';
    const page = typeof window !== 'undefined' ? window.location.hash.replace('#', '') || 'home' : 'home';
    const language = typeof window !== 'undefined' ? localStorage.getItem('muco_language') || 'en' : 'en';

    await addDoc(collection(db, collectionPath), {
      eventName,
      userId: uid,
      page,
      language,
      metadata: JSON.stringify(metadata).slice(0, 1000),
      timestamp: serverTimestamp()
    });
  } catch {
    // Non-blocking telemetry fallback
  }
}

// Testimonial Interface & Fetching
export interface TestimonialItem {
  id?: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  companyLogo?: string;
  rating: number;
  content: string;
  projectCategory: string;
  verified?: boolean;
  createdAt?: string | number | Date;
}

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'seed-1',
    clientName: 'Rajesh Subramaniam',
    clientRole: 'Co-Founder & CTO',
    companyName: 'Apex HealthTech',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    content: 'MUCO Labs engineered our patient portal with flawless precision and zero lag. Srinivash and his team delivered full-stack production code in record time.',
    projectCategory: 'Enterprise SaaS',
    verified: true
  },
  {
    id: 'seed-2',
    clientName: 'Ananya Sharma',
    clientRole: 'VP of Product',
    companyName: 'FinPulse Systems',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    content: 'The custom AI chatbot and automation workflow built by MUCO Labs cut our support response times by 80%. Their clean TypeScript architecture made scaling effortless.',
    projectCategory: 'AI & Automation',
    verified: true
  },
  {
    id: 'seed-3',
    clientName: 'Vikram Kulkarni',
    clientRole: 'Managing Director',
    companyName: 'Vanguard Logistics',
    companyLogo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    content: 'MUCO Labs built our native Android fleet management app. Exceptional performance, smooth offline caching, and 100% upfront pricing clarity.',
    projectCategory: 'Mobile Apps',
    verified: true
  }
];

export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  const collectionPath = 'testimonials';
  try {
    const q = query(collection(db, collectionPath));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return DEFAULT_TESTIMONIALS;
    }
    const fetched: TestimonialItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      fetched.push({
        id: docSnap.id,
        clientName: data.clientName || 'Anonymous Client',
        clientRole: data.clientRole || 'Verified Client',
        companyName: data.companyName || 'Partner Business',
        companyLogo: data.companyLogo || '',
        rating: typeof data.rating === 'number' ? data.rating : 5,
        content: data.content || '',
        projectCategory: data.projectCategory || 'Software Development',
        verified: data.verified !== false,
        createdAt: data.createdAt
      });
    });
    return fetched.length > 0 ? fetched : DEFAULT_TESTIMONIALS;
  } catch (error) {
    console.warn('Firestore fetch timeout or offline mode, using default testimonials:', error);
    return DEFAULT_TESTIMONIALS;
  }
}

export async function addTestimonial(testimonial: Omit<TestimonialItem, 'id' | 'createdAt'>): Promise<string> {
  const collectionPath = 'testimonials';
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      ...testimonial,
      createdAt: serverTimestamp()
    });
    logActivityEvent('testimonial_added', {
      companyName: testimonial.companyName,
      rating: testimonial.rating
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
    throw error;
  }
}

