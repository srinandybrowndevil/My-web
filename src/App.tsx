import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LuxurySpinner } from './components/LuxurySpinner';
import { ToastProvider } from './context/ToastContext';
import { updatePageSEO } from './utils/seo';

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  useEffect(() => {
    updatePageSEO(currentPage);
  }, [currentPage]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavigate = (page: PageId, customMsg?: string) => {
    if (customMsg) {
      setContactInitialMessage(customMsg);
    }
    
    // Trigger brief luxury spinner overlay transition for smooth perceived performance
    if (page !== currentPage) {
      setIsNavigating(true);
      setTimeout(() => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsNavigating(false), 250);
      }, 200);
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
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Luxury Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 z-[100] origin-left shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        style={{ scaleX }}
      />

      {/* Luxury Ambient Radial Overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_#78350f_0%,_transparent_35%)] opacity-0 dark:opacity-25 pointer-events-none z-0" />
      <div className="fixed top-1/4 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_#1e1b4b_0%,_transparent_70%)] opacity-0 dark:opacity-30 pointer-events-none z-0 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,_#451a03_0%,_transparent_60%)] opacity-0 dark:opacity-20 pointer-events-none z-0" />

      {/* Sticky Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Luxury Page Transition Loading Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <LuxurySpinner fullScreenOverlay label="Loading MUCO Architecture..." />
        )}
      </AnimatePresence>

      {/* Main Page Area with AnimatePresence luxury transition and Suspense fallback */}
      <main className="flex-1 relative z-10">
        <Suspense fallback={<LuxurySpinner fullScreenOverlay label="Loading MUCO Architecture..." />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 14, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.995 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
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
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
    </ToastProvider>
  );
}

