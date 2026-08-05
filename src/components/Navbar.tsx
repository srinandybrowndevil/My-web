import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { 
  Menu, 
  X, 
  Phone, 
  ArrowRight, 
  Search, 
  Globe, 
  Briefcase, 
  ChevronRight, 
  Sparkles,
  Command,
  FileText
} from 'lucide-react';
import { MucoLogo } from './MucoLogo';
import { CORE_SERVICES } from '../data/servicesData';
import { INITIAL_PROJECTS } from '../data/projectsData';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'services' | 'portfolio' | 'pages'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Focus input when search modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  const navItems: { id: PageId; label: string; desc: string }[] = [
    { id: 'home', label: 'Home', desc: 'Main landing page & core overview' },
    { id: 'about', label: 'About', desc: 'Company vision, mission & team' },
    { id: 'services', label: 'Services', desc: 'Engineering & software development solutions' },
    { id: 'portfolio', label: 'Portfolio', desc: 'Client success stories & live projects' },
    { id: 'apps', label: 'Publish Apps', desc: 'App Store & Play Store publishing' },
    { id: 'pricing', label: 'Pricing', desc: 'Transparent package plans & custom quotes' },
    { id: 'maintenance', label: 'Maintenance', desc: 'AMC & cloud infrastructure support' },
    { id: 'gallery', label: 'Our Team', desc: 'MUCO Labs executive leadership, software architects & digital specialists' },
    { id: 'blog', label: 'Blog', desc: 'Tech insights, AI automation trends & software engineering articles' },
    { id: 'faq', label: 'FAQ', desc: 'Frequently asked questions' },
    { id: 'contact', label: 'Contact', desc: 'Get in touch & request custom proposals' },
  ];

  // Index search items
  const indexedServices: SearchItem[] = CORE_SERVICES.map((s) => ({
    id: `service-${s.id}`,
    type: 'service',
    title: s.title,
    subtitle: s.tagline,
    category: s.category,
    targetPage: 'services',
    tags: s.technologies,
  }));

  const indexedProjects: SearchItem[] = INITIAL_PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    type: 'portfolio',
    title: p.title,
    subtitle: `${p.client} • ${p.description}`,
    category: p.category,
    targetPage: 'portfolio',
    tags: p.techStack,
  }));

  const indexedPages: SearchItem[] = navItems.map((n) => ({
    id: `page-${n.id}`,
    type: 'page',
    title: n.label,
    subtitle: n.desc,
    category: 'Navigation',
    targetPage: n.id,
  }));

  const allSearchItems = [...indexedServices, ...indexedProjects, ...indexedPages];

  const filteredSearchItems = allSearchItems.filter((item) => {
    const matchesFilter = activeFilter === 'all' || 
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

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularSearches = ['Web Application', 'Mobile App', 'ERP & Supply Chain', 'App Store Publishing', 'Pricing'];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/80 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left focus:outline-none shrink-0"
            >
              <MucoLogo variant="full" size="md" showTagline={true} />
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-full border border-slate-800 backdrop-blur-md shadow-xl">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 font-black'
                        : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Search Button Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium transition-all shadow-sm group"
                title="Search services, portfolio & pages (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline font-semibold">Search...</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded border border-slate-300 dark:border-slate-700">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </button>

              <a
                href="tel:+916381809844"
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 px-2.5 py-2 rounded-xl transition-colors"
                title="Call MUCO Labs"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>+91 6381809844</span>
              </a>

              <ThemeToggle />

              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2.5 px-4.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Mobile Actions Header */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl text-blue-600 dark:text-cyan-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none"
                aria-label="Open Search"
              >
                <Search className="w-4 h-4" />
              </button>

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
              <div className="mb-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-500" />
                    Search services or projects...
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                    Find
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-1 mb-4">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-sm'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <a
                  href="tel:+916381809844"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  Call +91 6381809844
                </a>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-md"
                >
                  Request Custom Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Global Search Modal Overlay */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-amber-500/30 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, portfolio projects, apps, or pages..."
                className="w-full bg-transparent text-white placeholder-slate-400 font-medium text-sm focus:outline-none"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
                  ESC
                </kbd>
              )}
            </div>

            {/* Filter Category Tabs */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'all', label: 'All Items' },
                  { id: 'services', label: 'Services' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'pages', label: 'Pages' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeFilter === tab.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {!searchQuery && (
                <div className="mb-4 p-3 bg-slate-950/40 rounded-2xl border border-slate-800/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3" /> Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredSearchItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavClick(item.targetPage)}
                  className="group p-3.5 bg-slate-950/50 hover:bg-slate-800/80 rounded-2xl border border-slate-800/80 hover:border-amber-500/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      item.type === 'service'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : item.type === 'portfolio'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {item.type === 'service' && <Globe className="w-4 h-4" />}
                      {item.type === 'portfolio' && <Briefcase className="w-4 h-4" />}
                      {item.type === 'page' && <FileText className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 leading-snug">
                        {item.subtitle}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}

              {filteredSearchItems.length === 0 && (
                <div className="py-12 text-center space-y-2">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-300">No results found for "{searchQuery}"</p>
                  <p className="text-[11px] text-slate-500">
                    Try searching for "Web", "Mobile", "ERP", "Pricing", or "Publish".
                  </p>
                </div>
              )}
            </div>

            {/* Footer helper */}
            <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Showing {filteredSearchItems.length} matching items</span>
              <span className="text-amber-400 font-semibold">Press ESC or click outside to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
