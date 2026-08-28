import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Calculator, 
  LogOut, 
  ShieldCheck, 
  Globe,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchUserProjectRequests, fetchUserEstimates } from '../services/firebase';
import { PageId } from '../types';

interface AuthModalProps {
  onNavigate?: (page: PageId) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onNavigate }) => {
  const { 
    currentUser, 
    userProfile, 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    openAuthModal, 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    resetPassword, 
    resendVerificationEmail,
    signOut 
  } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Profile data
  const [activeProfileTab, setActiveProfileTab] = useState<'profile' | 'requests' | 'estimates'>('profile');
  const [userRequests, setUserRequests] = useState<any[]>([]);
  const [userEstimates, setUserEstimates] = useState<any[]>([]);
  const [isLoadingProfileData, setIsLoadingProfileData] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMsg('');
      setSuccessMsg('');
      if (currentUser && authModalMode === 'profile') {
        loadUserData();
      }
    }
  }, [isAuthModalOpen, currentUser, authModalMode]);

  const loadUserData = async () => {
    if (!currentUser) return;
    setIsLoadingProfileData(true);
    try {
      const [reqs, ests] = await Promise.all([
        fetchUserProjectRequests(currentUser.uid),
        fetchUserEstimates(currentUser.uid)
      ]);
      setUserRequests(reqs);
      setUserEstimates(ests);
    } catch (e) {
      console.warn('Error loading user dashboard data:', e);
    } finally {
      setIsLoadingProfileData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (authModalMode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please accept the Terms & Conditions and acknowledge Privacy Policy.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (authModalMode === 'signin') {
        await signInWithEmail(email, password);
      } else if (authModalMode === 'signup') {
        await signUpWithEmail(fullName, email, password, language);
      } else if (authModalMode === 'forgot') {
        await resetPassword(email);
        setSuccessMsg(t.auth.resetLinkSent);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white dark:bg-[#0e131f] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Accent Header Glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* CONTENT: PROFILE DASHBOARD VIEW */}
          {currentUser && authModalMode === 'profile' ? (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    (currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    {currentUser.displayName || 'MUCO Enterprise Client'}
                    {currentUser.emailVerified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" title="Verified Account" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{currentUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      {userProfile?.role || 'USER'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ID: {currentUser.uid.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <button
                  onClick={() => setActiveProfileTab('profile')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeProfileTab === 'profile'
                      ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-orange-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveProfileTab('requests')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeProfileTab === 'requests'
                      ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-orange-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  My Requests ({userRequests.length})
                </button>
                <button
                  onClick={() => setActiveProfileTab('estimates')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeProfileTab === 'estimates'
                      ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-orange-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Saved Quotes ({userEstimates.length})
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeProfileTab === 'profile' && (
                <div className="space-y-4 text-xs">
                  {!currentUser.emailVerified && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-amber-700 dark:text-amber-300">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Email not yet verified.</span>
                      </div>
                      <button
                        onClick={resendVerificationEmail}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
                      >
                        Resend Link
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Language Preference</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setLanguage('en')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            language === 'en'
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => setLanguage('ta')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            language === 'ta'
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          தமிழ்
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Standard Payment SLA</span>
                      <span className="font-bold text-slate-900 dark:text-white">50% Advance / Milestone</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-1">
                      <ShieldCheck className="w-4 h-4 text-orange-500" />
                      <span>DPDP Data Privacy Protected</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Your data is handled under strict purpose limitation and encrypted storage in alignment with the Digital Personal Data Protection Act, 2023.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Requests */}
              {activeProfileTab === 'requests' && (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {isLoadingProfileData ? (
                    <div className="text-center py-6 text-slate-400 text-xs">Loading requests...</div>
                  ) : userRequests.length > 0 ? (
                    userRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">{req.projectType || 'Project Inquiry'}</span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-500">
                            {req.status || 'new'}
                          </span>
                        </div>
                        <p className="text-slate-500 line-clamp-2">{req.message}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                          <span>Budget: {req.budget || 'Custom'}</span>
                          <span>Timeline: {req.timeline || 'Flexible'}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 space-y-2">
                      <FileText className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
                      <p className="text-xs text-slate-400">No project requests submitted yet.</p>
                      {onNavigate && (
                        <button
                          onClick={() => {
                            closeAuthModal();
                            onNavigate('contact');
                          }}
                          className="text-xs font-bold text-orange-500 hover:underline"
                        >
                          Submit a New Project Request →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Estimates */}
              {activeProfileTab === 'estimates' && (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {isLoadingProfileData ? (
                    <div className="text-center py-6 text-slate-400 text-xs">Loading estimates...</div>
                  ) : userEstimates.length > 0 ? (
                    userEstimates.map((est) => (
                      <div
                        key={est.id}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            ₹{Number(est.totalOneTime).toLocaleString('en-IN')}
                          </span>
                          {est.totalMonthly > 0 && (
                            <span className="text-[10px] text-emerald-500 font-bold">
                              + ₹{Number(est.totalMonthly).toLocaleString('en-IN')}/mo
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{est.selectedOptions}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 space-y-2">
                      <Calculator className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
                      <p className="text-xs text-slate-400">No saved estimates yet.</p>
                      {onNavigate && (
                        <button
                          onClick={() => {
                            closeAuthModal();
                            onNavigate('pricing');
                          }}
                          className="text-xs font-bold text-orange-500 hover:underline"
                        >
                          Use Estimate Calculator →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Sign Out Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    signOut();
                    closeAuthModal();
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.nav.signOut}</span>
                </button>
                <button
                  onClick={closeAuthModal}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          ) : (
            /* CONTENT: SIGN IN / SIGN UP / FORGOT PASSWORD */
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {authModalMode === 'signin'
                    ? t.auth.signInTitle
                    : authModalMode === 'signup'
                    ? t.auth.signUpTitle
                    : t.auth.resetPassword}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  {authModalMode === 'signin'
                    ? t.auth.signInSubtitle
                    : authModalMode === 'signup'
                    ? t.auth.signUpSubtitle
                    : 'Enter your email address to receive password reset instructions.'}
                </p>
              </div>

              {/* Google Sign In Button */}
              {authModalMode !== 'forgot' && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{t.auth.signInWithGoogle}</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                      {t.auth.orWithEmail}
                    </span>
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {errorMsg && (
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {authModalMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {t.auth.fullNameLabel} <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.auth.emailLabel} <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@enterprise.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {authModalMode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        {t.auth.passwordLabel} <span className="text-orange-500">*</span>
                      </label>
                      {authModalMode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => openAuthModal('forgot')}
                          className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                        >
                          {t.auth.forgotPassword}
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {authModalMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t.auth.confirmPasswordLabel} <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* DPDP Consent & Terms Checkbox */}
                    <div className="pt-1 space-y-2">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-orange-600 focus:ring-orange-500"
                        />
                        <span>
                          {t.auth.agreeToTerms}{' '}
                          {onNavigate && (
                            <span className="inline-flex gap-1 text-orange-600 dark:text-orange-400 font-bold">
                              <span
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  closeAuthModal();
                                  onNavigate('terms' as PageId);
                                }}
                                className="hover:underline cursor-pointer"
                              >
                                {t.auth.termsAndConditions}
                              </span>
                              &bull;
                              <span
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  closeAuthModal();
                                  onNavigate('privacy' as PageId);
                                }}
                                className="hover:underline cursor-pointer"
                              >
                                {t.auth.privacyPolicy}
                              </span>
                            </span>
                          )}
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-500 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-orange-600 focus:ring-orange-500"
                        />
                        <span>{t.auth.marketingConsent}</span>
                      </label>
                    </div>
                  </>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-50 text-white font-black text-xs shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {authModalMode === 'signin'
                          ? t.nav.signIn
                          : authModalMode === 'signup'
                          ? t.nav.signUp
                          : t.auth.sendResetLink}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Switchers */}
              <div className="pt-3 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                {authModalMode === 'signin' ? (
                  <p>
                    {t.auth.dontHaveAccount}{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('signup')}
                      className="font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                    >
                      {t.nav.signUp}
                    </button>
                  </p>
                ) : authModalMode === 'signup' ? (
                  <p>
                    {t.auth.alreadyHaveAccount}{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('signin')}
                      className="font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                    >
                      {t.nav.signIn}
                    </button>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                  >
                    Back to {t.nav.signIn}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
