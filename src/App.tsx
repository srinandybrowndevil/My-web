import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ModernLoadingScreen } from './components/ModernLoadingScreen';
import { GlobalBackgroundLayer } from './components/GlobalBackgroundLayer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { RoleProvider } from './context/RoleContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { RoleQuickSwitcher } from './components/RoleQuickSwitcher';
import { updatePageSEO, syncUrlSEO } from './utils/seo';
import { usePageMetaTags } from './utils/pageMetaTags';
import { usePageViewLogger } from './hooks/usePageViewLogger';
import { PagePerformanceTracker } from './components/PagePerformanceTracker';
import { MobileQuickActionBar } from './components/MobileQuickActionBar';
import { openWhatsApp } from './utils/whatsapp';
import { Home } from './pages/Home';
import { GeneralPageSkeleton } from './components/skeletons/GeneralPageSkeleton';
import { ServicesSkeleton } from './components/skeletons/ServicesSkeleton';
import { PortfolioSkeleton } from './components/skeletons/PortfolioSkeleton';

// Resilient lazy import wrapper with automatic retry for network resiliency
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retries = 2,
  interval = 800
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    let currentRetries = retries;
    let currentInterval = interval;
    while (true) {
      try {
        return await factory();
      } catch (error) {
        if (currentRetries <= 0) {
          throw error;
        }
        currentRetries -= 1;
        await new Promise((resolve) => setTimeout(resolve, currentInterval));
        currentInterval *= 1.5;
      }
    }
  });
}

// Lazy-loaded interactive modals & diagnostics for minimal initial bundle
const AuthModal = lazyWithRetry(() => import('./components/AuthModal').then((m) => ({ default: m.AuthModal })));
const ScheduleCallModal = lazyWithRetry(() => import('./components/ScheduleCallModal').then((m) => ({ default: m.ScheduleCallModal })));
const CommandPalette = lazyWithRetry(() => import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette })));
const WhatsAppDiagnosticsModal = lazyWithRetry(() => import('./components/WhatsAppDiagnosticsModal').then((m) => ({ default: m.WhatsAppDiagnosticsModal })));
const PerformanceMonitor = lazyWithRetry(() => import('./components/PerformanceMonitor').then((m) => ({ default: m.PerformanceMonitor })));

// Lazy-loaded route page components with resilient retries
const About = lazyWithRetry(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazyWithRetry(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const AiSystems = lazyWithRetry(() => import('./pages/AiSystems').then((m) => ({ default: m.AiSystems })));
const Process = lazyWithRetry(() => import('./pages/Process').then((m) => ({ default: m.Process })));
const Courses = lazyWithRetry(() => import('./pages/Courses').then((m) => ({ default: m.Courses })));
const Pricing = lazyWithRetry(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })));
const Portfolio = lazyWithRetry(() => import('./pages/Portfolio').then((m) => ({ default: m.Portfolio })));
const AppStudio = lazyWithRetry(() => import('./pages/AppStudio').then((m) => ({ default: m.AppStudio })));
const Maintenance = lazyWithRetry(() => import('./pages/Maintenance').then((m) => ({ default: m.Maintenance })));
const Gallery = lazyWithRetry(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const Contact = lazyWithRetry(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const FAQ = lazyWithRetry(() => import('./pages/FAQ').then((m) => ({ default: m.FAQ })));
const GoogleSheetsManager = lazyWithRetry(() => import('./pages/GoogleSheetsManager').then((m) => ({ default: m.GoogleSheetsManager })));
const Blog = lazyWithRetry(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const Locations = lazyWithRetry(() => import('./pages/Locations').then((m) => ({ default: m.Locations })));
const Terms = lazyWithRetry(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const Privacy = lazyWithRetry(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));
const NotFound = lazyWithRetry(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState<boolean>(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isWhatsAppDiagOpen, setIsWhatsAppDiagOpen] = useState<boolean>(false);
  const [isIntroReplayOpen, setIsIntroReplayOpen] = useState<boolean>(false);

  // Listen to global events
  useEffect(() => {
    const handleOpenSearch = () => setIsCommandPaletteOpen(true);
    const handleOpenWhatsAppDiag = () => setIsWhatsAppDiagOpen(true);
    const handleOpenScheduleCall = () => setIsScheduleCallOpen(true);
    const handleReplayIntro = () => setIsIntroReplayOpen(true);
    const handleOpenWhatsAppChat = () => {
      openWhatsApp({ pageName: currentPage });
    };

    window.addEventListener('openSearchModal', handleOpenSearch);
    window.addEventListener('muco:open_whatsapp_diag', handleOpenWhatsAppDiag);
    window.addEventListener('muco:open_whatsapp_chat', handleOpenWhatsAppChat);
    window.addEventListener('muco:open_schedule_call', handleOpenScheduleCall);
    window.addEventListener('openScheduleCallModal', handleOpenScheduleCall);
    window.addEventListener('muco:replay_intro', handleReplayIntro);

    return () => {
      window.removeEventListener('openSearchModal', handleOpenSearch);
      window.removeEventListener('muco:open_whatsapp_diag', handleOpenWhatsAppDiag);
      window.removeEventListener('muco:open_whatsapp_chat', handleOpenWhatsAppChat);
      window.removeEventListener('muco:open_schedule_call', handleOpenScheduleCall);
      window.removeEventListener('openScheduleCallModal', handleOpenScheduleCall);
      window.removeEventListener('muco:replay_intro', handleReplayIntro);
    };
  }, [currentPage]);

  // Parse valid page from hash or pathname
  const parsePageFromUrl = (): PageId | null => {
    const validPages: PageId[] = [
      'home',
      'about',
      'services',
      'systems',
      'process',
      'courses',
      'pricing',
      'portfolio',
      'apps',
      'maintenance',
      'gallery',
      'contact',
      'faq',
      'sheets',
      'blog',
      'locations',
      'terms',
      'privacy'
    ];

    // Check hash first (e.g. #services, #locations)
    const hash = window.location.hash;
    if (hash) {
      const rawHash = hash.replace(/^#\/?/, '').split('?')[0].split('/')[0].toLowerCase();
      if (validPages.includes(rawHash as PageId)) {
        return rawHash as PageId;
      }
    }

    // Check pathname (e.g. /services, /locations, /courses)
    const pathname = window.location.pathname;
    if (pathname && pathname !== '/') {
      const rawPath = pathname.replace(/^\/+/, '').split('/')[0].toLowerCase();
      if (validPages.includes(rawPath as PageId)) {
        return rawPath as PageId;
      }
    }

    return null;
  };

  // Sync initial URL on mount & listen to popstate and hashchange
  useEffect(() => {
    const handleUrlSync = () => {
      const parsed = parsePageFromUrl();
      if (parsed) {
        setCurrentPage(parsed);
      }
      syncUrlSEO(window.location.hash, parsed || 'home');
    };

    handleUrlSync();

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
      } else {
        const parsed = parsePageFromUrl();
        setCurrentPage(parsed || 'home');
      }
      syncUrlSEO(window.location.hash);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // Log page view events on route changes
  usePageViewLogger(currentPage);

  // Update page meta tags on route changes
  usePageMetaTags(currentPage);

  useEffect(() => {
    syncUrlSEO(window.location.hash, currentPage);
  }, [currentPage]);

  // Optimized scroll listener & IntersectionObserver to detect when user scrolls past Home Hero
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let observer: IntersectionObserver | null = null;

    const handleScroll = () => {
      if (timeoutId !== null) return;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        const heroThreshold = 350;
        const isPast = window.scrollY > heroThreshold;
        setIsScrolledPastHero((prev) => (prev !== isPast ? isPast : prev));
      }, 40);
    };

    const heroElement = document.getElementById('hero-section') || document.querySelector('main section');
    if (heroElement && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const isPast = !entry.isIntersecting;
          setIsScrolledPastHero((prev) => (prev !== isPast ? isPast : prev));
        },
        { root: null, rootMargin: '-300px 0px 0px 0px', threshold: 0 }
      );
      observer.observe(heroElement);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId !== null) clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll();

  const handleNavigate = (page: PageId, customMsg?: string, hash?: string) => {
    if (customMsg) {
      setContactInitialMessage(customMsg);
    }

    const targetHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : `#${page}`;
    try {
      window.history.pushState({ page }, '', targetHash);
    } catch {
      window.location.hash = targetHash;
    }

    if (page !== currentPage) {
      setCurrentPage(page);
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 95;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToContactWithItem = (itemTitle: string) => {
    setContactInitialMessage(itemTitle);
    handleNavigate('contact');
  };

  const getPageSuspenseFallback = (page: PageId) => {
    switch (page) {
      case 'services':
        return <ServicesSkeleton />;
      case 'portfolio':
        return <PortfolioSkeleton />;
      default:
        return <GeneralPageSkeleton />;
    }
  };

  return (
    <ToastProvider>
      <LanguageProvider>
        <AuthProvider>
          <RoleProvider>
            <div className="min-h-screen bg-[#fcfcf9] dark:bg-[#080b11] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-orange-500 selection:text-white relative overflow-x-hidden pb-16 lg:pb-0">
            
            {/* Luxury Scroll Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 z-[100] origin-left shadow-[0_0_12px_rgba(249,115,22,0.8)]"
              style={{ scaleX: scrollYProgress }}
            />

            {/* Global Futuristic Enterprise Background Layer */}
            <GlobalBackgroundLayer />

            {/* Floating Navigation & Header Controls */}
            <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

            {/* Main Page Area with AnimatePresence transition and instant Suspense fallback */}
            <main className="flex-1 relative z-10 pt-16 sm:pt-20 transition-all duration-300">
              <ErrorBoundary>
                <Suspense fallback={getPageSuspenseFallback(currentPage)}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {currentPage === 'home' && (
                        <Home onNavigate={handleNavigate} isScrolledPastHero={isScrolledPastHero} />
                      )}
                      {currentPage === 'about' && <About onNavigate={handleNavigate} />}
                      {currentPage === 'services' && <Services onNavigate={handleNavigate} />}
                      {currentPage === 'systems' && <AiSystems onNavigate={handleNavigate} />}
                      {currentPage === 'process' && <Process onNavigate={handleNavigate} />}
                      {currentPage === 'courses' && <Courses onNavigate={handleNavigate} />}
                      {currentPage === 'pricing' && (
                        <Pricing
                          onNavigateToContactWithItem={handleNavigateToContactWithItem}
                          onNavigateToMaintenance={() => handleNavigate('maintenance')}
                        />
                      )}
                      {currentPage === 'portfolio' && (
                        <Portfolio onNavigate={handleNavigate} />
                      )}
                      {currentPage === 'apps' && (
                        <AppStudio
                          onNavigateToContactWithItem={handleNavigateToContactWithItem}
                          onNavigate={handleNavigate}
                        />
                      )}
                      {currentPage === 'maintenance' && (
                        <Maintenance onNavigateToContactWithItem={handleNavigateToContactWithItem} />
                      )}
                      {currentPage === 'gallery' && (
                        <Gallery onNavigate={handleNavigate} />
                      )}
                      {currentPage === 'sheets' && (
                        <GoogleSheetsManager onNavigate={handleNavigate} />
                      )}
                      {currentPage === 'contact' && (
                        <Contact initialMessage={contactInitialMessage} onNavigate={handleNavigate} />
                      )}
                      {currentPage === 'faq' && <FAQ onNavigate={handleNavigate} />}
                      {currentPage === 'blog' && <Blog onNavigate={handleNavigate} />}
                      {currentPage === 'locations' && <Locations onNavigate={handleNavigate} />}
                      {currentPage === 'terms' && <Terms onNavigate={handleNavigate} />}
                      {currentPage === 'privacy' && <Privacy onNavigate={handleNavigate} />}
                      {currentPage === 'notfound' && <NotFound onNavigate={handleNavigate} />}
                    </motion.div>
                  </AnimatePresence>
                </Suspense>
              </ErrorBoundary>
            </main>

            {/* Global User Authentication Modal */}
            <Suspense fallback={null}>
              <AuthModal onNavigate={handleNavigate} />
            </Suspense>

            {/* Floating Quick Role Switcher */}
            <RoleQuickSwitcher onNavigate={handleNavigate} />

            {/* Mobile Sticky Quick Action Bar */}
            <MobileQuickActionBar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onOpenSchedule={() => setIsScheduleCallOpen(true)}
            />

            {/* Schedule 1-on-1 Discovery Call Modal */}
            <Suspense fallback={null}>
              <ScheduleCallModal
                isOpen={isScheduleCallOpen}
                onClose={() => setIsScheduleCallOpen(false)}
                currentPage={currentPage}
              />
            </Suspense>

            {/* Global Command Palette (Cmd + K / Spotlight Search) */}
            <Suspense fallback={null}>
              <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
                onNavigate={handleNavigate}
              />
            </Suspense>

            {/* Global WhatsApp Diagnostics Modal */}
            <Suspense fallback={null}>
              <WhatsAppDiagnosticsModal
                isOpen={isWhatsAppDiagOpen}
                onClose={() => setIsWhatsAppDiagOpen(false)}
              />
            </Suspense>

            {/* Floating WhatsApp Action */}
            <FloatingWhatsApp currentPage={currentPage} />

            {/* Scroll To Top Action Button */}
            <ScrollToTopButton />

            {/* Real-world Web Vitals & Performance Telemetry Tracker */}
            <PagePerformanceTracker currentPage={currentPage} />

            {/* Internal Web Vitals Performance Monitor */}
            <Suspense fallback={null}>
              <PerformanceMonitor />
            </Suspense>

            {/* Footer */}
            <Footer onNavigate={handleNavigate} />

            {/* Awwwards-Inspired Cinematic Intro Replay Overlay */}
            <AnimatePresence>
              {isIntroReplayOpen && (
                <ModernLoadingScreen
                  fullScreenOverlay={true}
                  size="fullscreen"
                  label="MUCO LABS ARCHITECTURE"
                  sublabel="HIGH-PRECISION DIGITAL SYSTEMS // READY"
                  autoDismissTimeoutMs={1800}
                  onDismiss={() => setIsIntroReplayOpen(false)}
                  onComplete={() => setIsIntroReplayOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
          </RoleProvider>
        </AuthProvider>
      </LanguageProvider>
    </ToastProvider>
  );
}
