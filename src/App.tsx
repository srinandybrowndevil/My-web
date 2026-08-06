import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { LuxurySpinner } from './components/LuxurySpinner';
import { ToastProvider } from './context/ToastContext';
import { updatePageSEO } from './utils/seo';
import { usePageViewLogger } from './hooks/usePageViewLogger';

// Lazy-loaded route page components for optimal bundle splitting
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Pricing = lazy(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })));
const Portfolio = lazy(() => import('./pages/Portfolio').then((m) => ({ default: m.Portfolio })));
const AppStudio = lazy(() => import('./pages/AppStudio').then((m) => ({ default: m.AppStudio })));
const Maintenance = lazy(() => import('./pages/Maintenance').then((m) => ({ default: m.Maintenance })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const FAQ = lazy(() => import('./pages/FAQ').then((m) => ({ default: m.FAQ })));
const GoogleSheetsManager = lazy(() => import('./pages/GoogleSheetsManager').then((m) => ({ default: m.GoogleSheetsManager })));
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState<boolean>(false);

  // Log page view events on route changes
  usePageViewLogger(currentPage);

  useEffect(() => {
    updatePageSEO(currentPage);
  }, [currentPage]);

  // Scroll listener to detect when user scrolls past the Home Hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = 350; // threshold in pixels for Home Hero section
      if (window.scrollY > heroThreshold) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavigate = (page: PageId, customMsg?: string, hash?: string) => {
    if (customMsg) {
      setContactInitialMessage(customMsg);
    }

    if (hash) {
      const cleanHash = hash.startsWith('#') ? hash : `#${hash}`;
      window.location.hash = cleanHash;
    } else {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
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

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Luxury Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-400 z-[100] origin-left shadow-[0_0_12px_rgba(34,211,238,0.8)]"
        style={{ scaleX }}
      />

      {/* Luxury Ambient Radial Overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,_#0369a1_0%,_transparent_35%)] opacity-0 dark:opacity-20 pointer-events-none z-0" />
      <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_#1e1b4b_0%,_transparent_70%)] opacity-0 dark:opacity-25 pointer-events-none z-0 blur-3xl" />
      <div className="fixed bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_bottom_left,_#0f172a_0%,_transparent_60%)] opacity-0 dark:opacity-20 pointer-events-none z-0" />

      {/* Floating Navigation & Header Controls */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Area with AnimatePresence transition and instant Suspense fallback */}
      <main className="flex-1 relative z-10 lg:pl-64 pt-16 lg:pt-0 transition-all duration-300">
        <Suspense fallback={null}>
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
                <GoogleSheetsManager />
              )}
              {currentPage === 'contact' && (
                <Contact initialMessage={contactInitialMessage} />
              )}
              {currentPage === 'faq' && <FAQ onNavigate={handleNavigate} />}
              {currentPage === 'blog' && <Blog onNavigate={handleNavigate} />}
              {currentPage === 'notfound' && <NotFound onNavigate={handleNavigate} />}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp currentPage={currentPage} />

      {/* Scroll To Top Action Button */}
      <ScrollToTopButton />

      {/* Internal Web Vitals Performance Monitor */}
      <PerformanceMonitor />

      {/* Footer */}
      <div className="lg:pl-64 transition-all duration-300">
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
    </ToastProvider>
  );
}

