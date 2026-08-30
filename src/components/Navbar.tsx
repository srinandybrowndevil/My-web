import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { MucoLogo } from './MucoLogo';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CORE_SERVICES } from '../data/servicesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { COURSES_DATA } from '../data/coursesData';
import { ALL_LOCATIONS } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import {
  Home,
  Building,
  Layers,
  GraduationCap,
  Layout,
  Smartphone,
  Tag,
  ShieldCheck,
  Users,
  FileText,
  HelpCircle,
  Send,
  Search,
  X,
  Menu,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Globe,
  User,
  Shield,
  Scale,
  GitCommit
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

interface SearchItem {
  id: string;
  type: 'service' | 'portfolio' | 'page';
  title: string;
  subtitle: string;
  category: string;
  targetPage: PageId;
  tags?: string[];
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLanguage();
  const { currentUser, userProfile, openAuthModal } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'services' | 'portfolio' | 'pages'>('all');

  // Pop-up Navbar Cursor & Scroll Interaction States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCursorNearTop, setIsCursorNearTop] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll and cursor position to trigger pop-up
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 70) {
        setIsCursorNearTop(true);
      } else if (e.clientY > 110 && !isMoreMenuOpen && !isSearchOpen) {
        setIsCursorNearTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMoreMenuOpen, isSearchOpen]);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard Shortcuts (Cmd/Ctrl + K to search, ESC to close menu/search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsMoreMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus Search Input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Primary desktop navbar links
  const primaryNavLinks: { id: PageId; label: string; icon: React.ElementType }[] = [
    { id: 'portfolio', label: t.nav.work, icon: Layout },
    { id: 'services', label: t.nav.services, icon: Layers },
    { id: 'systems', label: t.nav.systems, icon: Sparkles },
    { id: 'process', label: t.nav.process, icon: GitCommit },
    { id: 'about', label: t.nav.about, icon: Building },
    { id: 'courses', label: t.nav.learn, icon: GraduationCap },
    { id: 'pricing', label: t.nav.pricing, icon: Tag }
  ];

  // Secondary "More" links for desktop
  const secondaryNavLinks: { id: PageId; label: string; desc: string; icon: React.ElementType }[] = [
    { id: 'apps', label: t.nav.apps, desc: 'iOS App Store & Google Play publishing', icon: Smartphone },
    { id: 'maintenance', label: t.nav.maintenance, desc: '24/7 server health & dedicated support', icon: ShieldCheck },
    { id: 'locations', label: t.nav.locations, desc: 'Erode & Tamil Nadu industrial technology hubs', icon: Globe },
    { id: 'blog', label: t.nav.blog, desc: 'Insights, tech breakdowns & tutorials', icon: FileText },
    { id: 'faq', label: t.nav.faq, desc: 'Common answers & project queries', icon: HelpCircle },
    { id: 'terms', label: t.nav.terms, desc: 'Master Service Agreement & 50% advance terms', icon: Scale },
    { id: 'privacy', label: t.nav.privacy, desc: 'DPDP Act 2023 compliance & data rights', icon: Shield }
  ];

  // All navigation routes for mobile drawer and search
  const allNavItems: { id: PageId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: t.nav.home, icon: Home },
    ...primaryNavLinks,
    ...secondaryNavLinks.map((s) => ({ id: s.id, label: s.label, icon: s.icon })),
    { id: 'contact', label: t.nav.startProject, icon: Send }
  ];

  // Search Index Data
  const indexedServices: SearchItem[] = CORE_SERVICES.map((s) => ({
    id: `service-${s.id}`,
    type: 'service',
    title: s.title,
    subtitle: s.tagline,
    category: s.category,
    targetPage: 'services',
    tags: s.technologies
  }));

  const indexedCourses: SearchItem[] = COURSES_DATA.map((c) => ({
    id: `course-${c.id}`,
    type: 'service',
    title: c.title,
    subtitle: `${c.duration} • ${c.tagline}`,
    category: `Course (${c.category})`,
    targetPage: 'courses',
    tags: c.technologies
  }));

  const indexedProjects: SearchItem[] = INITIAL_PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    type: 'portfolio',
    title: p.title,
    subtitle: `${p.client} • ${p.description}`,
    category: p.category,
    targetPage: 'portfolio',
    tags: p.techStack
  }));

  const indexedPages: SearchItem[] = allNavItems.map((n) => ({
    id: `page-${n.id}`,
    type: 'page',
    title: n.label,
    subtitle: `Navigate to ${n.label} section`,
    category: 'Navigation',
    targetPage: n.id
  }));

  const indexedLocations: SearchItem[] = ALL_LOCATIONS.map((loc) => ({
    id: `loc-${loc.id}`,
    type: 'page',
    title: `${loc.name} Technology Hub`,
    subtitle: `${loc.district}, Tamil Nadu • ${loc.tagline}`,
    category: 'Regional Hubs',
    targetPage: 'locations',
    tags: [loc.name, loc.district, loc.pincode, ...loc.majorIndustries.map((i) => i.name)]
  }));

  const indexedCombos: SearchItem[] = SERVICE_LOCATIONS_DATA.map((combo) => ({
    id: `combo-${combo.id}`,
    type: 'service',
    title: `${combo.serviceName} in ${combo.locationName}`,
    subtitle: `${combo.startingPrice} • ${combo.localizedSummary}`,
    category: `${combo.locationName} Service`,
    targetPage: 'locations',
    tags: [combo.locationName, combo.serviceName, ...combo.technologies]
  }));

  const allSearchItems = [
    ...indexedServices,
    ...indexedCourses,
    ...indexedProjects,
    ...indexedLocations,
    ...indexedCombos,
    ...indexedPages
  ];

  const filteredSearchItems = allSearchItems.filter((item) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'services' && item.type === 'service') ||
      (activeFilter === 'portfolio' && item.type === 'portfolio') ||
      (activeFilter === 'pages' && item.type === 'page');

    if (!searchQuery.trim()) return matchesFilter;

    const q = searchQuery.toLowerCase();
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

    return matchesFilter && matchesQuery;
  });

  const popularSearches = ['AI Chatbots', 'Cloud Architecture', 'Mobile Apps', 'App Store Publishing', 'Pricing Packages'];

  return (
    <>
      {/* FIXED TOP NAVIGATION BAR */}
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 h-16 sm:h-20 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#fcfcf9]/95 dark:bg-[#080b11]/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-2xl'
            : 'bg-[#fcfcf9]/80 dark:bg-[#080b11]/80 backdrop-blur-xl border-b border-slate-200/40 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">
          
          {/* LEFT: BRAND LOGO */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
            aria-label="Go to MUCO Labs homepage"
          >
            <MucoLogo variant="full" size="sm" showTagline={false} />
          </button>

          {/* CENTER: DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {primaryNavLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-orange-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                  secondaryNavLinks.some((s) => s.id === currentPage)
                    ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-orange-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <span>{t.nav.more}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180 text-orange-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-[#0e131f] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1"
                  >
                    {secondaryNavLinks.map((sec) => {
                      const Icon = sec.icon;
                      const isSecActive = currentPage === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => handleNavClick(sec.id)}
                          className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors cursor-pointer ${
                            isSecActive
                              ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-orange-500 shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 dark:text-white">
                              {sec.label}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {sec.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* RIGHT: SEARCH, LANGUAGE SWITCHER, AUTH, THEME, ESTIMATE CTA & MOBILE TOGGLE */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-all cursor-pointer text-xs"
              aria-label="Open search dialog"
            >
              <Search className="w-4 h-4 text-orange-500" />
              <span className="hidden md:inline font-medium">Search</span>
              <kbd className="hidden md:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* User Auth Trigger */}
            {currentUser ? (
              <button
                onClick={() => openAuthModal('profile')}
                className="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:bg-orange-500/20"
                title="Account Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">
                  {currentUser.displayName?.split(' ')[0] || 'Account'}
                </span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">{t.nav.signIn}</span>
              </button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Start a Project CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t.nav.startProject}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger Button (< lg screen) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-orange-500" />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE SLIDE-IN DRAWER MENU (< lg screen) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[80]"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-[#070b16] border-r border-slate-200 dark:border-slate-800 backdrop-blur-3xl z-[90] p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* DRAWER HEADER */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                  <MucoLogo variant="full" size="sm" showTagline={false} />

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* SEARCH BAR IN DRAWER */}
                <div className="mb-4">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-orange-500" />
                      <span>{t.nav.searchPlaceholder.slice(0, 18)}...</span>
                    </span>
                    <span className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">⌘K</span>
                  </button>
                </div>

                {/* USER AUTH IN DRAWER */}
                <div className="mb-4">
                  {currentUser ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal('profile');
                      }}
                      className="w-full p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold">
                          {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {currentUser.displayName || 'Client Account'}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-orange-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal('signin');
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4 text-orange-500" />
                      <span>{t.nav.signIn} / {t.nav.signUp}</span>
                    </button>
                  )}
                </div>

                {/* DRAWER NAVIGATION LIST */}
                <nav className="space-y-1">
                  {allNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30'
                            : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>

                        {isActive && <ChevronRight className="w-4 h-4 text-orange-500" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* DRAWER FOOTER */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer"
                >
                  <span>{t.nav.startProject}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY MODAL (CMD + K) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-950 backdrop-blur-2xl border border-slate-200 dark:border-orange-500/30 rounded-3xl shadow-2xl shadow-orange-950/40 overflow-hidden z-10 flex flex-col max-h-[80vh]"
            >
              {/* Top Specular Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-400/60 to-transparent pointer-events-none" />

              {/* Search Header Input */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
                <Search className="w-5 h-5 text-orange-500 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.nav.searchPlaceholder}
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-white/5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-2.5 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
                {(['all', 'services', 'portfolio', 'pages'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 rounded-full font-extrabold capitalize transition-all cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-200/60 dark:bg-white/5'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Results List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.targetPage)}
                      className="w-full text-left p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/5 hover:border-orange-500/30 transition-all group flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            item.type === 'service'
                              ? 'bg-blue-500/20 text-blue-500 dark:text-blue-400 border border-blue-500/30'
                              : item.type === 'portfolio'
                              ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30'
                              : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          }`}>
                            {item.type}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{item.category}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5 font-normal">
                          {item.subtitle}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No direct matches found for "{searchQuery}"</p>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      <span className="text-xs text-slate-400 w-full mb-1 font-bold">Popular searches:</span>
                      {popularSearches.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="text-xs text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full hover:bg-orange-500/20 transition-all font-semibold cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                MUCO Labs Instant Search &bull; Click any item to navigate directly
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
