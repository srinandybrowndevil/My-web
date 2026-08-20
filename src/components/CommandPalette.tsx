import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowRight,
  Globe,
  Smartphone,
  Cpu,
  Bot,
  Layers,
  FileText,
  DollarSign,
  Briefcase,
  HelpCircle,
  Mail,
  Sparkles,
  Command,
  CornerDownLeft,
  Activity,
  MessageCircle
} from 'lucide-react';
import { PageId } from '../types';
import { CORE_SERVICES } from '../data/servicesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { FAQ_DATA } from '../data/faqData';
import { BLOG_POSTS } from '../data/blogData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  category: 'Service' | 'Portfolio Project' | 'Navigation Page' | 'Pricing & Plan' | 'Blog & Insights' | 'FAQ' | 'Diagnostic Tool' | 'Direct Contact';
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by caller or global listener
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate all searchable items
  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Navigation Pages
    const pages: { id: PageId; name: string; desc: string }[] = [
      { id: 'home', name: 'Home - MUCO Labs Overview', desc: 'Main landing page, technology capabilities & client showcase' },
      { id: 'services', name: 'Services & Enterprise Solutions', desc: 'Web apps, mobile apps, SaaS ERP, AI agents & cloud systems' },
      { id: 'portfolio', name: 'Client Case Studies & Portfolio', desc: 'Live deployments, architecture breakdowns & performance metrics' },
      { id: 'pricing', name: 'Transparent Pricing & Cost Calculator', desc: 'Fixed-price packages, custom software estimates & AMC tiers' },
      { id: 'apps', name: 'App Studio & Play Store Deployments', desc: 'Published Android applications, APK builds & store listings' },
      { id: 'maintenance', name: 'AMC & Cloud SLA Support', desc: '24/7 server monitoring, security patching & database optimization' },
      { id: 'gallery', name: 'Team, Leadership & Office Lab', desc: 'Founder Srinivash Mahalingam, core engineers & engineering culture' },
      { id: 'blog', name: 'Engineering Blog & Tech Insights', desc: 'Articles on Next.js, LLM fine-tuning, Cloud APIs & digital strategy' },
      { id: 'faq', name: 'Frequently Asked Questions (FAQ)', desc: 'Answers on timelines, IP ownership, pricing, and NDA contracts' },
      { id: 'contact', name: 'Contact & Inquiry Form', desc: 'Get in touch, request an RFP, or schedule a discovery call' }
    ];

    pages.forEach((p) => {
      items.push({
        id: `page-${p.id}`,
        title: p.name,
        category: 'Navigation Page',
        description: p.desc,
        icon: <Layers className="w-4 h-4 text-blue-400" />,
        action: () => {
          onNavigate(p.id);
          onClose();
        }
      });
    });

    // 2. Services
    CORE_SERVICES.forEach((s) => {
      items.push({
        id: `service-${s.id}`,
        title: s.title,
        category: 'Service',
        description: `${s.tagline} • Starts at ${s.startingPrice}`,
        icon: <Cpu className="w-4 h-4 text-cyan-400" />,
        action: () => {
          onNavigate('services', undefined, `#${s.id}`);
          onClose();
        }
      });
    });

    // 3. Projects
    INITIAL_PROJECTS.forEach((p) => {
      items.push({
        id: `project-${p.id}`,
        title: `${p.title} (${p.client})`,
        category: 'Portfolio Project',
        description: `${p.category} • Stack: ${p.techStack.slice(0, 3).join(', ')}`,
        icon: <Briefcase className="w-4 h-4 text-amber-400" />,
        action: () => {
          onNavigate('portfolio', undefined, `#${p.id}`);
          onClose();
        }
      });
    });

    // 4. Blog Posts
    BLOG_POSTS.forEach((b) => {
      items.push({
        id: `blog-${b.id}`,
        title: b.title,
        category: 'Blog & Insights',
        description: b.excerpt,
        icon: <FileText className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onNavigate('blog', undefined, `#${b.slug}`);
          onClose();
        }
      });
    });

    // 5. FAQs
    FAQ_DATA.forEach((f) => {
      items.push({
        id: `faq-${f.id}`,
        title: f.question,
        category: 'FAQ',
        description: f.answer,
        icon: <HelpCircle className="w-4 h-4 text-purple-400" />,
        action: () => {
          onNavigate('faq', undefined, `#${f.id}`);
          onClose();
        }
      });
    });

    // 6. Quick Utilities & Developer Diagnostics
    items.push({
      id: 'tool-whatsapp-diag',
      title: 'WhatsApp Error Logger & Deep-Link Diagnostics',
      category: 'Diagnostic Tool',
      description: 'View real-time WhatsApp error logs, URL length tests, and error feedback',
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        window.dispatchEvent(new CustomEvent('muco:open_whatsapp_diag'));
      }
    });

    items.push({
      id: 'tool-whatsapp-chat',
      title: 'Chat Directly on WhatsApp (+91 6381809844)',
      category: 'Direct Contact',
      description: 'Instant technical consultation with Founder Srinivash Mahalingam',
      icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        window.dispatchEvent(new CustomEvent('muco:open_whatsapp_chat'));
      }
    });

    return items;
  }, [onNavigate, onClose]);

  // Filter items by query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 8); // Default suggested items
    }
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
          {/* Header Search Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search services, apps, tech stack, pricing, blog..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 rounded-md">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div ref={listRef} className="overflow-y-auto p-2 space-y-1 flex-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border border-blue-500/50 text-white'
                        : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white truncate">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            item.category === 'Service'
                              ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                              : item.category === 'Portfolio Project'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : item.category === 'Pricing & Plan'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="flex items-center text-xs text-blue-400 font-semibold gap-1 shrink-0 self-center">
                        <span className="hidden sm:inline">Jump</span>
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 px-4 space-y-2">
                <Search className="w-8 h-8 text-slate-500 mx-auto opacity-50" />
                <p className="text-sm font-semibold text-slate-300">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-500">
                  Try searching for keywords like &ldquo;AI&rdquo;, &ldquo;React&rdquo;, &ldquo;Pricing&rdquo;, &ldquo;Mobile&rdquo;, or &ldquo;Maintenance&rdquo;.
                </p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">↵</kbd>
                <span>Select</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>MUCO Labs Spotlight Search</span>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
