import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { ModernLoadingScreen } from './components/ModernLoadingScreen';
import { BroedPageLoader } from './components/BroedPageLoader';
import { GlobalBackgroundLayer } from './components/GlobalBackgroundLayer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { RoleProvider } from './context/RoleContext';
import { RoleQuickSwitcher } from './components/RoleQuickSwitcher';
import { updatePageSEO, syncUrlSEO } from './utils/seo';
import { usePageViewLogger } from './hooks/usePageViewLogger';
import { PagePerformanceTracker } from './components/PagePerformanceTracker';
import { MobileQuickActionBar } from './components/MobileQuickActionBar';
import { ScheduleCallModal } from './components/ScheduleCallModal';
import { CommandPalette } from './components/CommandPalette';
import { WhatsAppDiagnosticsModal } from './components/WhatsAppDiagnosticsModal';
import { openWhatsApp } from './utils/whatsapp';
import { ServicesSkeleton } from './components/skeletons/ServicesSkeleton';
import { PortfolioSkeleton } from './components/skeletons/PortfolioSkeleton';
import { CustomCursor } from './components/CustomCursor';

// Lazy-loaded route page components for optimal bundle splitting
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const AiSystems = lazy(() => import('./pages/AiSystems').then((m) => ({ default: m.AiSystems })));
const Courses = lazy(() => import('./pages/Courses').then((m) => ({ default: m.Courses })));
const Pricing = lazy(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })));
const Portfolio = lazy(() => import('./pages/Portfolio').then((m) => ({ default: m.Portfolio })));
const AppStudio = lazy(() => import('./pages/AppStudio').then((m) => ({ default: m.AppStudio })));
const Maintenance = lazy(() => import('./pages/Maintenance').then((m) => ({ default: m.Maintenance })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const FAQ = lazy(() => import('./pages/FAQ').then((m) => ({ default: m.FAQ })));
const GoogleSheetsManager = lazy(() => import('./pages/GoogleSheetsManager').then((m) => ({ default: m.GoogleSheetsManager })));
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const Locations = lazy(() => import('./pages/Locations').then((m) => ({ default: m.Locations })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState<boolean>(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isWhatsAppDiagOpen, setIsWhatsAppDiagOpen] = useState<boolean>(false);
  const [showIntroLoader, setShowIntroLoader] = useState<boolean>(true);

  // Listen to global events
  useEffect(() => {
    const handleOpenSearch = () => setIsCommandPaletteOpen(true);
    const handleOpenWhatsAppDiag = () => setIsWhatsAppDiagOpen(true);
    const handleOpenWhatsAppChat = () => {
      openWhatsApp({ pageName: currentPage });
    };
    const handleReplayIntro = () => setShowIntroLoader(true);

    window.addEventListener('openSearchModal', handleOpenSearch);
    window.addEventListener('muco:open_whatsapp_diag', handleOpenWhatsAppDiag);
    window.addEventListener('muco:open_whatsapp_chat', handleOpenWhatsAppChat);
    window.addEventListener('muco:replay_intro', handleReplayIntro);

    return () => {
      window.removeEventListener('openSearchModal', handleOpenSearch);
      window.removeEventListener('muco:open_whatsapp_diag', handleOpenWhatsAppDiag);
      window.removeEventListener('muco:open_whatsapp_chat', handleOpenWhatsAppChat);
      window.removeEventListener('muco:replay_intro', handleReplayIntro);
    };
  }, [currentPage]);

  // Parse valid page from hash
  const parsePageFromHash = (hash: string): PageId | null => {
    const raw = hash.replace(/^#\/?/, '').split('/')[0].toLowerCase();
    const validPages: PageId[] = [
      'home',
      'about',
      'services',
      'systems',
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
      'locations'
    ];
    return validPages.includes(raw as PageId) ? (raw as PageId) : null;
  };

  // Sync initial URL hash on mount & listen to popstate and hashchange
  useEffect(() => {
    const handleUrlSync = () => {
      const hash = window.location.hash;
      if (hash) {
        const parsed = parsePageFromHash(hash);
        if (parsed) {
          setCurrentPage(parsed);
        }
      }
      syncUrlSEO(hash);
    };

    handleUrlSync();

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
      } else if (window.location.hash) {
        const parsed = parsePageFromHash(window.location.hash);
        if (parsed) setCurrentPage(parsed);
      } else {
        setCurrentPage('home');
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

  useEffect(() => {
    syncUrlSEO(window.location.hash, currentPage);
  }, [currentPage]);

  // Optimized scroll listener & IntersectionObserver to detect when user scrolls past Home Hero
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let observer: IntersectionObserver | null = null;

    // Debounced scroll handler to prevent excessive re-renders during high-frequency scrolling
    const handleScroll = () => {
      if (timeoutId !== null) return;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        const heroThreshold = 350;
        const isPast = window.scrollY > heroThreshold;
        setIsScrolledPastHero((prev) => (prev !== isPast ? isPast : prev));
      }, 40); // 40ms throttle/debounce frame
    };

    // IntersectionObserver for efficient viewport detection when hero element exists
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

    // Instant page transition without artificial delays or preloader overlays
    if (page !== currentPage) {
      setCurrentPage(page);
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      // If already on target page, scroll directly to target ID element
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

  // Suspense fallback tailored per active page
  const getPageSuspenseFallback = (page: PageId) => {
    switch (page) {
      case 'services':
        return <ServicesSkeleton />;
      case 'portfolio':
        return <PortfolioSkeleton />;
      case 'courses':
        return (
          <div className="min-h-[55vh] flex items-center justify-center p-8">
            <ModernLoadingScreen label="Loading Way2Me Mastery Academy..." sublabel="SYNCHRONIZING CURRICULUM & MENTORSHIP MODULES" size="md" />
          </div>
        );
      case 'sheets':
        return (
          <div className="min-h-[55vh] flex items-center justify-center p-8">
            <ModernLoadingScreen label="Connecting Google Sheets & Drive Hub..." sublabel="ESTABLISHING CLOUD OAUTH CHANNELS" size="md" />
          </div>
        );
      default:
        return (
          <div className="min-h-[55vh] flex items-center justify-center p-8">
            <ModernLoadingScreen label="Loading MUCO Architecture..." size="md" />
          </div>
        );
    }
  };

  return (
    <ToastProvider>
      <RoleProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden pb-16 lg:pb-0">
        
        {/* Awwwards Broed-Style Page Load Reveal Animation */}
        {showIntroLoader && (
          <BroedPageLoader onComplete={() => setShowIntroLoader(false)} />
        )}

        {/* Luxury Custom Physics Cursor System */}
        <CustomCursor />

        {/* Luxury Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-400 z-[100] origin-left shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Global Futuristic Enterprise Background Layer */}
        <GlobalBackgroundLayer />

        {/* Floating Navigation & Header Controls */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Main Page Area with AnimatePresence transition and instant Suspense fallback */}
        <main className="flex-1 relative z-10 lg:pl-64 pt-16 lg:pt-0 transition-all duration-300">
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
                  {currentPage === 'notfound' && <NotFound onNavigate={handleNavigate} />}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Floating Quick Role Switcher (Mosey Awwwards Experience on all pages) */}
        <RoleQuickSwitcher onNavigate={handleNavigate} />

        {/* Mobile Sticky Quick Action Bar */}
        <MobileQuickActionBar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenSchedule={() => setIsScheduleCallOpen(true)}
        />

        {/* Schedule 1-on-1 Discovery Call Modal */}
        <ScheduleCallModal
          isOpen={isScheduleCallOpen}
          onClose={() => setIsScheduleCallOpen(false)}
          currentPage={currentPage}
        />

        {/* Global Command Palette (Cmd + K / Spotlight Search) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={handleNavigate}
        />

        {/* Global WhatsApp Diagnostics Modal */}
        <WhatsAppDiagnosticsModal
          isOpen={isWhatsAppDiagOpen}
          onClose={() => setIsWhatsAppDiagOpen(false)}
        />

        {/* Floating WhatsApp Action */}
        <FloatingWhatsApp currentPage={currentPage} />

        {/* Scroll To Top Action Button */}
        <ScrollToTopButton />

        {/* Real-world Web Vitals & Performance Telemetry Tracker */}
        <PagePerformanceTracker currentPage={currentPage} />

        {/* Internal Web Vitals Performance Monitor */}
        <PerformanceMonitor />

        {/* Footer */}
        <div className="lg:pl-64 transition-all duration-300">
          <Footer onNavigate={handleNavigate} />
        </div>
      </div>
      </RoleProvider>
    </ToastProvider>
  );
}

