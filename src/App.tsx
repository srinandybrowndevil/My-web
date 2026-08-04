import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Pricing } from './pages/Pricing';
import { Portfolio } from './pages/Portfolio';
import { AppStudio } from './pages/AppStudio';
import { Maintenance } from './pages/Maintenance';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  const handleNavigate = (page: PageId, customMsg?: string) => {
    if (customMsg) {
      setContactInitialMessage(customMsg);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToContactWithItem = (itemTitle: string) => {
    setContactInitialMessage(itemTitle);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Bento Grid Ambient Radial Overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_#1e40af_0%,_transparent_40%)] opacity-0 dark:opacity-30 pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-full h-[400px] bg-[radial-gradient(ellipse_at_bottom,_#1e3a8a_0%,_transparent_60%)] opacity-0 dark:opacity-20 pointer-events-none z-0" />

      {/* Sticky Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Area */}
      <main className="flex-1 relative z-10">
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
        {currentPage === 'contact' && (
          <Contact initialMessage={contactInitialMessage} />
        )}
        {currentPage === 'faq' && <FAQ onNavigate={handleNavigate} />}
      </main>

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
