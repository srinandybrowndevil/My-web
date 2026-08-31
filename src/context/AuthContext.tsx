import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, syncUserProfile, UserProfile, logActivityEvent } from '../services/firebase';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, pass: string, preferredLanguage?: 'en' | 'ta') => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup' | 'forgot' | 'profile';
  openAuthModal: (mode?: 'signin' | 'signup' | 'forgot' | 'profile') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'forgot' | 'profile'>('signin');
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const profile = await syncUserProfile(user);
          setUserProfile(profile);
          logActivityEvent('user_signin', { uid: user.uid, email: user.email });
        } catch (e) {
          console.warn('Profile sync error:', e);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' | 'forgot' | 'profile' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const profile = await syncUserProfile(cred.user);
      setUserProfile(profile);
      showToast('Signed in successfully!', 'success', 'Welcome Back');
      closeAuthModal();
    } catch (err: unknown) {
      const authErr = err as { code?: string; message?: string };
      const msg = authErr.code === 'auth/invalid-credential' || authErr.code === 'auth/wrong-password'
        ? 'Invalid email or password.'
        : authErr.code === 'auth/user-not-found'
        ? 'No account found with this email.'
        : authErr.message || 'Failed to sign in.';
      showToast(msg, 'error', 'Sign In Failed');
      throw new Error(msg);
    }
  };

  const signUpWithEmail = async (name: string, email: string, pass: string, preferredLanguage: 'en' | 'ta' = 'en') => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      await updateProfile(cred.user, { displayName: name.trim() });
      const profile = await syncUserProfile(cred.user, {
        displayName: name.trim(),
        preferredLanguage
      });
      setUserProfile(profile);

      // Attempt to send verification email
      try {
        await sendEmailVerification(cred.user);
      } catch (e) {
        console.warn('Verification email send error:', e);
      }

      logActivityEvent('user_signup', { uid: cred.user.uid, email: cred.user.email });
      showToast('Account created! Please verify your email.', 'success', 'Account Created');
      closeAuthModal();
    } catch (err: unknown) {
      const authErr = err as { code?: string; message?: string };
      const msg = authErr.code === 'auth/email-already-in-use'
        ? 'An account with this email already exists.'
        : authErr.code === 'auth/weak-password'
        ? 'Password must be at least 6 characters.'
        : authErr.message || 'Failed to create account.';
      showToast(msg, 'error', 'Sign Up Failed');
      throw new Error(msg);
    }
  };

  const signInWithGoogleAction = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const profile = await syncUserProfile(cred.user);
      setUserProfile(profile);
      showToast('Signed in with Google!', 'success', 'Welcome');
      closeAuthModal();
    } catch (err: unknown) {
      const authErr = err as { code?: string; message?: string };
      if (authErr.code !== 'auth/popup-closed-by-user') {
        showToast(authErr.message || 'Google sign-in failed.', 'error', 'Sign In Error');
      }
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      showToast('Password reset link sent to your email.', 'success', 'Check Your Inbox');
      logActivityEvent('password_reset_requested', { email });
    } catch (err: unknown) {
      const authErr = err as { code?: string; message?: string };
      const msg = authErr.code === 'auth/user-not-found'
        ? 'No account found with this email.'
        : authErr.message || 'Failed to send reset link.';
      showToast(msg, 'error', 'Reset Failed');
      throw new Error(msg);
    }
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        showToast('Verification email resent.', 'success', 'Sent');
      } catch (err: unknown) {
        showToast('Please wait a moment before requesting another email.', 'error', 'Rate Limited');
      }
    }
  };

  const signOutAction = async () => {
    try {
      await fbSignOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      logActivityEvent('user_signout');
      showToast('Signed out successfully.', 'info', 'Signed Out');
    } catch (err: unknown) {
      showToast('Error signing out.', 'error', 'Error');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle: signInWithGoogleAction,
        resetPassword,
        resendVerificationEmail,
        signOut: signOutAction,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
