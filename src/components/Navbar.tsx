import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { MucoLogo } from './MucoLogo';
import { CORE_SERVICES } from '../data/servicesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Command,
  FileText,
  Globe,
  Briefcase,
  Cpu,
  Cloud,
  Code2,
  Smartphone,
  Server,
  Zap,
  Layout,
  Layers,
  Database,
  ShoppingBag,
  BarChart3,
  AppWindow
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

interface DropdownItem {
  title: string;
  desc: string;
  icon: React.ElementType;
  tag?: string;
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
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'apps' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'services' | 'portfolio' | 'pages'>('all');
  
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Services Submenu Items
  const servicesDropdownItems: DropdownItem[] = [
    { title: 'Artificial Intelligence', desc: 'Custom LLMs, Agents & Neural Automation', icon: Cpu, tag: 'Hot' },
    { title: 'Cloud Engineering', desc: 'AWS, Azure & Google Cloud Architectures', icon: Cloud },
    { title: 'Web Development', desc: 'Next.js, React 19 & High-Perf Web Apps', icon: Code2 },
    { title: 'Mobile Development', desc: 'iOS & Android Native & Flutter Solutions', icon: Smartphone },
    { title: 'Enterprise Software', desc: 'Custom CRM, ERP & Workflow Engines', icon: Server },
    { title: 'DevOps', desc: 'CI/CD Pipelines, Kubernetes & IaC', icon: Zap },
    { title: 'Automation', desc: 'RPA & Intelligent Business Workflows', icon: Layers },
    { title: 'UI/UX', desc: 'Human-Centered Design & Design Systems', icon: Layout },
    { title: 'Digital Transformation', desc: 'Legacy Modernization & Tech Audits', icon: Globe }
  ];

  // Publish Apps Submenu Items
  const publishAppsDropdownItems: DropdownItem[] = [
    { title: 'CRM Solutions', desc: 'Omnichannel Client Management Apps', icon: Database, tag: 'Popular' },
    { title: 'ERP Systems', desc: 'Integrated Resource Planning Platforms', icon: AppWindow },
    { title: 'E-Commerce Platforms', desc: 'Scalable Online Storefronts & Gateways', icon: ShoppingBag },
    { title: 'Business App Studio', desc: 'Custom Android & iOS Enterprise Publishing', icon: Smartphone },
    { title: 'Enterprise Dashboards', desc: 'Real-Time Executive Analytics Suites', icon: BarChart3 }
  ];

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileDrawerOpen(false);
        setActiveDropdown(null);
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

  // Dropdown Hover Delay Handling
  const handleMouseEnter = (dropdown: 'services' | 'apps') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setActiveDropdown(null);
    setIsMobileDrawerOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const indexedProjects: SearchItem[] = INITIAL_PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    type: 'portfolio',
    title: p.title,
    subtitle: `${p.client} • ${p.description}`,
    category: p.category,
    targetPage: 'portfolio',
    tags: p.techStack
  }));

  const mainNavPages: { id: PageId; label: string; desc: string }[] = [
    { id: 'home', label: 'Home', desc: 'Main landing page & core overview' },
    { id: 'about', label: 'About', desc: 'Company vision, mission & team' },
    { id: 'services', label: 'Services', desc: 'Engineering & software development solutions' },
    { id: 'portfolio', label: 'Portfolio', desc: 'Client success stories & live projects' },
    { id: 'apps', label: 'Publish Apps', desc: 'App Store & Play Store publishing' },
    { id: 'pricing', label: 'Pricing', desc: 'Transparent package plans & custom quotes' },
    { id: 'maintenance', label: 'Maintenance', desc: 'AMC & cloud infrastructure support' },
    { id: 'gallery', label: 'Our Team', desc: 'MUCO Labs executive leadership & digital specialists' },
    { id: 'blog', label: 'Blog', desc: 'Tech insights & software engineering articles' },
    { id: 'faq', label: 'FAQ', desc: 'Frequently asked questions' },
    { id: 'contact', label: 'Contact', desc: 'Get in touch & request custom proposals' }
  ];

  const indexedPages: SearchItem[] = mainNavPages.map((n) => ({
    id: `page-${n.id}`,
    type: 'page',
    title: n.label,
    subtitle: n.desc,
    category: 'Navigation',
    targetPage: n.id
  }));

  const allSearchItems = [...indexedServices, ...indexedProjects, ...indexedPages];

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

  const popularSearches = ['AI & Machine Learning', 'Cloud Infrastructure', 'Custom ERP', 'App Store Publishing', 'Pricing Cards'];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-[80px] transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-slate-950/85 dark:bg-slate-950/90 backdrop-blur-[20px] border-white/10 shadow-2xl shadow-blue-950/20'
            : 'bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-[16px] border-white/[0.08] shadow-lg'
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* LEFT SIDE: MUCO Labs Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center focus:outline-none shrink-0"
            aria-label="MUCO Labs Homepage"
          >
            <MucoLogo variant="full" size="md" showTagline={true} />
          </button>

          {/* CENTER MENU: Enterprise Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* Home */}
            <NavItem
              label="Home"
              isActive={currentPage === 'home'}
              onClick={() => handleNavClick('home')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'home' : null)}
            />

            {/* About */}
            <NavItem
              label="About"
              isActive={currentPage === 'about'}
              onClick={() => handleNavClick('about')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'about' : null)}
            />

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('services')}
                className={`relative px-3 py-2 text-xs xl:text-sm font-semibold transition-colors duration-200 flex items-center gap-1 focus:outline-none ${
                  currentPage === 'services' || activeDropdown === 'services'
                    ? 'text-cyan-400 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                  }`}
                />

                {/* Hover / Active Underline */}
                <NavUnderline
                  isActive={currentPage === 'services'}
                  isHovered={activeDropdown === 'services'}
                />
              </button>

              {/* Services Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-slate-900/95 border border-white/10 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl shadow-blue-950/50 z-50 grid grid-cols-2 gap-2"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Core Engineering Solutions
                      </span>
                      <button
                        onClick={() => handleNavClick('services')}
                        className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>View All Services</span>
                        <ChevronRight className="w-3 h-3 text-cyan-400" />
                      </button>
                    </div>

                    {servicesDropdownItems.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => handleNavClick('services')}
                          className="group p-2.5 rounded-xl text-left hover:bg-white/[0.06] transition-all duration-200 flex items-start gap-3 border border-transparent hover:border-white/10"
                        >
                          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shrink-0">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                {item.title}
                              </span>
                              {item.tag && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Portfolio */}
            <NavItem
              label="Portfolio"
              isActive={currentPage === 'portfolio'}
              onClick={() => handleNavClick('portfolio')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'portfolio' : null)}
            />

            {/* Publish Apps Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('apps')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('apps')}
                className={`relative px-3 py-2 text-xs xl:text-sm font-semibold transition-colors duration-200 flex items-center gap-1 focus:outline-none ${
                  currentPage === 'apps' || activeDropdown === 'apps'
                    ? 'text-cyan-400 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                aria-expanded={activeDropdown === 'apps'}
              >
                <span>Publish Apps</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'apps' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                  }`}
                />

                <NavUnderline
                  isActive={currentPage === 'apps'}
                  isHovered={activeDropdown === 'apps'}
                />
              </button>

              {/* Publish Apps Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === 'apps' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-slate-900/95 border border-white/10 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl shadow-blue-950/50 z-50 space-y-1.5"
                  >
                    <div className="pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <AppWindow className="w-3.5 h-3.5" /> App Studio & Publishing
                      </span>
                      <button
                        onClick={() => handleNavClick('apps')}
                        className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Explore Studio</span>
                        <ChevronRight className="w-3 h-3 text-cyan-400" />
                      </button>
                    </div>

                    {publishAppsDropdownItems.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => handleNavClick('apps')}
                          className="w-full group p-2.5 rounded-xl text-left hover:bg-white/[0.06] transition-all duration-200 flex items-center justify-between border border-transparent hover:border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shrink-0">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                  {item.title}
                                </span>
                                {item.tag && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                                    {item.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-snug">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing */}
            <NavItem
              label="Pricing"
              isActive={currentPage === 'pricing'}
              onClick={() => handleNavClick('pricing')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'pricing' : null)}
            />

            {/* Maintenance */}
            <NavItem
              label="Maintenance"
              isActive={currentPage === 'maintenance'}
              onClick={() => handleNavClick('maintenance')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'maintenance' : null)}
            />

            {/* Our Team */}
            <NavItem
              label="Our Team"
              isActive={currentPage === 'gallery'}
              onClick={() => handleNavClick('gallery')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'gallery' : null)}
            />

            {/* Blog */}
            <NavItem
              label="Blog"
              isActive={currentPage === 'blog'}
              onClick={() => handleNavClick('blog')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'blog' : null)}
            />

            {/* FAQ */}
            <NavItem
              label="FAQ"
              isActive={currentPage === 'faq'}
              onClick={() => handleNavClick('faq')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'faq' : null)}
            />

            {/* Contact */}
            <NavItem
              label="Contact"
              isActive={currentPage === 'contact'}
              onClick={() => handleNavClick('contact')}
              onHoverChange={(hovered) => setHoveredNav(hovered ? 'contact' : null)}
            />
          </nav>

          {/* RIGHT SIDE: Search, Theme Toggle, Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-white/10 text-xs font-semibold transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              title="Search services & pages (Ctrl+K)"
              aria-label="Open Search"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Search...</span>
              <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800 text-slate-400 rounded border border-slate-700">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Primary CTA: Gradient Button (Blue → Cyan) */}
            <button
              onClick={() => handleNavClick('contact')}
              className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs sm:text-sm py-2.5 px-4.5 sm:px-5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="p-2.5 rounded-xl text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 lg:hidden focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileDrawerOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE LEFT SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[300px] sm:w-[340px] bg-slate-950/95 border-r border-white/10 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <MucoLogo variant="full" size="sm" showTagline={false} />
                  <button
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/10"
                    aria-label="Close Drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Search trigger inside mobile drawer */}
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 rounded-xl text-xs font-semibold text-slate-300 border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan-400" />
                    Search MUCO Labs...
                  </span>
                  <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800 text-slate-400 rounded">
                    ⌘K
                  </kbd>
                </button>

                {/* Mobile Navigation List */}
                <div className="space-y-1">
                  {mainNavPages.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                            : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Callout */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <a
                  href="tel:+916381809844"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 rounded-xl border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+91 6381809844</span>
                </a>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <div
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
            >
              {/* Input Bar */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-slate-950/60">
                <Search className="w-5 h-5 text-cyan-400 shrink-0" />
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

              {/* Filter Tabs */}
              <div className="px-4 py-2.5 bg-slate-900 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
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
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Results List */}
              <div className="p-4 overflow-y-auto space-y-2 flex-1">
                {!searchQuery && (
                  <div className="mb-4 p-3 bg-slate-950/40 rounded-2xl border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
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
                    className="group p-3.5 bg-slate-950/50 hover:bg-slate-800/80 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        item.type === 'service'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
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
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
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

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
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

              {/* Footer info */}
              <div className="px-4 py-2.5 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Showing {filteredSearchItems.length} matching items</span>
                <span className="text-cyan-400 font-semibold">Press ESC or click outside to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

/* Helper Sub-Component for Navigation Links */
interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  onHoverChange: (hovered: boolean) => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive, onClick, onHoverChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange(false);
      }}
      className={`relative px-3 py-2 text-xs xl:text-sm font-semibold transition-colors duration-200 focus:outline-none ${
        isActive ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'
      }`}
    >
      <span>{label}</span>
      <NavUnderline isActive={isActive} isHovered={isHovered} />
    </button>
  );
};

/* Helper 3px Animated Underline Component */
interface NavUnderlineProps {
  isActive: boolean;
  isHovered: boolean;
}

const NavUnderline: React.FC<NavUnderlineProps> = ({ isActive, isHovered }) => {
  const shouldShow = isActive || isHovered;

  return (
    <motion.div
      initial={false}
      animate={{ scaleX: shouldShow ? 1 : 0, opacity: shouldShow ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 origin-center ${
        isActive ? 'shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''
      }`}
    />
  );
};
