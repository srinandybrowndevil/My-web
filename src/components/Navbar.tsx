import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId } from '../types';
import { ThemeToggle } from './ThemeToggle';
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
  Compass,
  MapPin
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'services' | 'portfolio' | 'pages'>('all');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard Navigation & Shortcuts (Cmd/Ctrl + K to search, ESC to close menu or search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
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
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Main Sidebar Navigation Routes
  const mainSidebarNav: { id: PageId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Building },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'locations', label: 'Locations & Hubs', icon: MapPin },
    { id: 'courses', label: 'Courses & Learn', icon: GraduationCap },
    { id: 'portfolio', label: 'Portfolio', icon: Layout },
    { id: 'apps', label: 'Publish Apps', icon: Smartphone },
    { id: 'pricing', label: 'Pricing', icon: Tag },
    { id: 'maintenance', label: 'Maintenance', icon: ShieldCheck },
    { id: 'gallery', label: 'Our Team', icon: Users },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: Send },
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

  const indexedPages: SearchItem[] = mainSidebarNav.map((n) => ({
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
      {/* DESKTOP FIXED LEFT SIDEBAR (No company logo inside, only navigation menu) */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-64 h-screen bg-slate-950/95 dark:bg-[#070b16]/98 border-r border-slate-800/80 backdrop-blur-2xl z-40 flex-col justify-between p-4 py-6 overflow-y-auto custom-scrollbar select-none shadow-2xl">
        {/* TOP SECTION: MENU HEADER (NO LOGO) */}
        <div>
          <div className="px-3.5 py-3 rounded-2xl bg-slate-900/60 dark:bg-slate-900/40 border border-slate-800/80 mb-4 flex items-center justify-between">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase bg-gradient-to-r from-blue-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              SYSTEM PORTAL
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[9px] font-black tracking-wider text-emerald-400">ONLINE</span>
            </div>
          </div>

          {/* QUICK SEARCH TRIGGER */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openSearchModal'))}
            className="w-full mb-3.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-white flex items-center justify-between transition-all group cursor-pointer text-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Quick Search...</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 group-hover:text-cyan-300">
              ⌘K
            </kbd>
          </button>

          {/* SIDEBAR NAVIGATION LINKS */}
          <nav className="space-y-1.5">
            {mainSidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all duration-200 group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/25 via-cyan-500/20 to-transparent text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/15 translate-x-1'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/40 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="tracking-tight">{item.label}</span>
                  </div>

                  {isActive && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SIDEBAR UTILITIES & SEARCH */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800/90 hover:border-cyan-500/40 transition-all text-xs font-semibold shadow-inner group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-300 group-hover:text-white">Quick Search</span>
            </div>
            <kbd className="text-[9px] font-mono font-bold tracking-wider text-slate-400 bg-white/10 px-2 py-0.5 rounded border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Theme & Quote Action Row */}
          <div className="flex items-center justify-between gap-2">
            <ThemeToggle />

            <button
              onClick={() => handleNavClick('contact')}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 transform hover:-translate-y-0.5"
            >
              <span>Get Estimate</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR (< lg screen) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/90 z-40 px-4 flex items-center justify-between shadow-lg">
        {/* Mobile Sidebar Menu Trigger (NO LOGO) */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-extrabold text-xs shadow-sm active:scale-95 transition-transform"
        >
          <Menu className="w-4 h-4 text-cyan-400" />
          <span>Menu</span>
        </button>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openSearchModal'))}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>

          <ThemeToggle />

          <button
            onClick={() => handleNavClick('contact')}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20"
          >
            Quote
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-IN SIDEBAR DRAWER (< lg screen) */}
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
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-slate-950/98 border-r border-slate-800/80 backdrop-blur-3xl z-[90] p-5 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* DRAWER HEADER (NO LOGO) */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-cyan-400 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    MENU
                  </span>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* DRAWER MENU ITEMS */}
                <nav className="space-y-1.5">
                  {mainSidebarNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600/25 via-cyan-500/15 to-transparent text-cyan-400 border border-cyan-500/30'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                          <span>{item.label}</span>
                        </div>

                        {isActive && <ChevronRight className="w-4 h-4 text-cyan-400" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* DRAWER FOOTER */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2"
                >
                  <span>Request Custom Proposal</span>
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
              className="relative w-full max-w-2xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-white/20 dark:border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/40 overflow-hidden z-10 flex flex-col max-h-[80vh]"
            >
              {/* Top Specular Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

              {/* Search Header Input */}
              <div className="p-4 sm:p-5 border-b border-white/10 dark:border-slate-800/80 flex items-center gap-3">
                <Search className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, portfolio, pages..."
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm font-semibold focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-white rounded-full bg-white/5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-2.5 py-1 text-xs font-bold text-slate-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
                >
                  ESC
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="px-4 py-2 bg-slate-950/50 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
                {(['all', 'services', 'portfolio', 'pages'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 rounded-full font-extrabold capitalize transition-all ${
                      activeFilter === filter
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white bg-white/5'
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
                      className="w-full text-left p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-amber-500/30 transition-all group flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            item.type === 'service'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : item.type === 'portfolio'
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {item.type}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">{item.category}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 font-normal">
                          {item.subtitle}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-sm text-slate-400 font-medium">No direct matches found for "{searchQuery}"</p>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      <span className="text-xs text-slate-500 w-full mb-1 font-bold">Popular searches:</span>
                      {popularSearches.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full hover:bg-amber-500/20 transition-all font-semibold"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-950 border-t border-white/10 text-center text-[11px] text-slate-400 font-medium">
                MUCO Labs Instant Search • Click any item to navigate directly
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
