import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
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

// Test Connection Helper (Exported for explicit health checks only)
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    console.warn('Firebase Firestore client is operating in fallback offline mode.');
  }
}

// Testimonial Interface
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
  createdAt?: any;
}

// Default Seed Testimonials for MUCO Labs Client Feedback
export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'seed-1',
    clientName: 'Rajesh Subramaniam',
    clientRole: 'Co-Founder & CTO',
    companyName: 'Apex HealthTech',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    content: 'MUCO Labs engineered our Next.js patient portal with flawless precision and zero lag. Srinivash and his team delivered full-stack production code in record time.',
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
  },
  {
    id: 'seed-4',
    clientName: 'Dr. Meera Vasudevan',
    clientRole: 'Founder',
    companyName: 'BioGenics India',
    companyLogo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    content: 'Srinivash Mahalingam and the team designed our modern e-commerce platform. Outstanding Apple-inspired minimal UI and blistering fast page loads.',
    projectCategory: 'E-Commerce & Web',
    verified: true
  },
  {
    id: 'seed-5',
    clientName: 'Karthik Raja',
    clientRole: 'Head of Growth',
    companyName: 'CloudScale Global',
    companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    content: 'Working with MUCO Labs is a breath of fresh air. Pure engineering craft, proactive communication, and transparent milestones from day one.',
    projectCategory: 'Cloud & Infrastructure',
    verified: true
  },
  {
    id: 'seed-6',
    clientName: 'Sarah Jenkins',
    clientRole: 'Director of Tech Innovation',
    companyName: 'Aura Digital London',
    companyLogo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    content: 'Extremely impressed with MUCO Labs global service standards. They integrated custom Gemini LLM workflows into our CRM seamlessly.',
    projectCategory: 'AI & Automation',
    verified: true
  }
];

// Fetch Testimonials from Firestore with automatic timeout fallback & background seeding
export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  const collectionPath = 'testimonials';

  const timeoutPromise = new Promise<TestimonialItem[]>((_, reject) =>
    setTimeout(() => reject(new Error('Firestore fetch timeout')), 2000)
  );

  const fetchPromise = async (): Promise<TestimonialItem[]> => {
    const q = query(collection(db, collectionPath));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Background non-blocking seeding
      Promise.allSettled(
        DEFAULT_TESTIMONIALS.map((item) => {
          const { id, ...data } = item;
          return addDoc(collection(db, collectionPath), {
            ...data,
            createdAt: serverTimestamp()
          });
        })
      ).catch((err) => console.warn('Background seeding error:', err));

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
  };

  try {
    return await Promise.race([fetchPromise(), timeoutPromise]);
  } catch (error) {
    console.warn('Firestore fetch timeout or offline mode, using default testimonials:', error);
    return DEFAULT_TESTIMONIALS;
  }
}

// Add New Testimonial to Firestore
export async function addTestimonial(data: Omit<TestimonialItem, 'id'>): Promise<string> {
  const collectionPath = 'testimonials';
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      clientName: data.clientName,
      clientRole: data.clientRole,
      companyName: data.companyName,
      companyLogo: data.companyLogo || '',
      rating: Number(data.rating),
      content: data.content,
      projectCategory: data.projectCategory,
      verified: data.verified ?? true,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
    throw error;
  }
}
