import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { MucoLogo } from './MucoLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'apps', label: 'Publish Apps' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left focus:outline-none"
          >
            <MucoLogo variant="full" size="md" showTagline={true} />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+916381809844"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-xl transition-colors"
              title="Call MUCO Labs"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>+91 6381809844</span>
            </a>

            <ThemeToggle />

            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5 mb-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              <a
                href="tel:+916381809844"
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
              >
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Call +91 6381809844
              </a>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-xs py-3 rounded-xl shadow-md"
              >
                Request Custom Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
