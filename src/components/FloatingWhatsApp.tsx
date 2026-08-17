import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Settings2, Check, Phone } from 'lucide-react';
import { PageId } from '../types';
import { openWhatsApp, WHATSAPP_NUMBER } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  currentPage: PageId;
}

type ButtonTheme = 'emerald' | 'cyan' | 'amber' | 'indigo';

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customText, setCustomText] = useState('');

  // Persist theme choice in localStorage
  const [theme, setTheme] = useState<ButtonTheme>(() => {
    try {
      const saved = localStorage.getItem('muco_whatsapp_theme');
      if (saved && ['emerald', 'cyan', 'amber', 'indigo'].includes(saved)) {
        return saved as ButtonTheme;
      }
    } catch (e) {
      console.error('Failed to read whatsapp theme from localStorage:', e);
    }
    return 'emerald';
  });

  // Persist label visibility preference in localStorage
  const [showLabel, setShowLabel] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('muco_whatsapp_show_label');
      if (saved !== null) {
        return saved === 'true';
      }
    } catch (e) {
      console.error('Failed to read whatsapp label state from localStorage:', e);
    }
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem('muco_whatsapp_theme', theme);
    } catch (e) {
      console.error('Failed to save whatsapp theme to localStorage:', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('muco_whatsapp_show_label', String(showLabel));
    } catch (e) {
      console.error('Failed to save whatsapp label state to localStorage:', e);
    }
  }, [showLabel]);

  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'services': return 'Software Services';
      case 'pricing': return 'Pricing & Estimates';
      case 'portfolio': return 'Client Portfolio';
      case 'about': return 'About MUCO Labs';
      case 'contact': return 'Contact & Proposals';
      case 'blog': return 'Blog & Tech Articles';
      case 'apps': return 'App Studio & Publishing';
      case 'maintenance': return 'Cloud & AMC Maintenance';
      default: return 'General Inquiries';
    }
  };

  const pageTitle = getPageTitle(currentPage);

  const handleQuickSend = (serviceName?: string) => {
    openWhatsApp({
      pageName: pageTitle,
      serviceName: serviceName,
      customMessage: customText.trim() ? customText : undefined
    });
    setIsOpen(false);
    setCustomText('');
  };

  // Theme styling configurations
  const themeStyles = {
    emerald: {
      bg: 'bg-emerald-500 hover:bg-emerald-400',
      shadow: 'hover:shadow-emerald-500/40',
      badge: 'bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/80',
      btnSubmit: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
    },
    cyan: {
      bg: 'bg-cyan-500 hover:bg-cyan-400',
      shadow: 'hover:shadow-cyan-500/40',
      badge: 'bg-cyan-400',
      text: 'text-cyan-600 dark:text-cyan-400',
      accentBg: 'bg-cyan-50 dark:bg-cyan-950/40',
      border: 'border-cyan-200 dark:border-cyan-800/80',
      btnSubmit: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20'
    },
    amber: {
      bg: 'bg-amber-500 hover:bg-amber-400',
      shadow: 'hover:shadow-amber-500/40',
      badge: 'bg-amber-400',
      text: 'text-amber-600 dark:text-amber-400',
      accentBg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/80',
      btnSubmit: 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
    },
    indigo: {
      bg: 'bg-indigo-600 hover:bg-indigo-500',
      shadow: 'hover:shadow-indigo-500/40',
      badge: 'bg-indigo-400',
      text: 'text-indigo-600 dark:text-indigo-400',
      accentBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-800/80',
      btnSubmit: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Quick Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-fadeIn">
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-2xl ${currentTheme.bg} text-white flex items-center justify-center font-black text-sm shadow-md`}>
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 ${currentTheme.badge} border-2 border-white dark:border-slate-900 rounded-full animate-pulse`} />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>MUCO Labs WhatsApp</span>
                  <span className={`text-[10px] bg-slate-100 dark:bg-slate-800 ${currentTheme.text} font-bold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700`}>Online</span>
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Instant Support • Founder Srinivash M.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 ${showSettings ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'} rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
                title="Customize Button Theme & Layout"
              >
                <Settings2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Button Customizer Panel */}
          {showSettings ? (
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Customize Floating Button</span>
                </span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-[10px] text-blue-600 dark:text-cyan-400 font-bold hover:underline"
                >
                  Done
                </button>
              </div>

              {/* Theme Selector */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Button Theme Accent:
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['emerald', 'cyan', 'amber', 'indigo'] as ButtonTheme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`py-1.5 px-2 rounded-xl text-[10px] font-bold capitalize flex items-center justify-center gap-1 border transition-all ${
                        theme === t
                          ? 'bg-white dark:bg-slate-900 border-slate-900 dark:border-white shadow-sm text-slate-900 dark:text-white'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {theme === t && <Check className="w-3 h-3 text-emerald-500" />}
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Label Toggle */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Show "Quick Chat" Label Pill
                </span>
                <button
                  onClick={() => setShowLabel(!showLabel)}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    showLabel ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      showLabel ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Context Prompt */}
              <div className={`${currentTheme.accentBg} p-3.5 rounded-2xl border ${currentTheme.border} space-y-1.5`}>
                <div className={`flex items-center gap-1.5 text-xs font-bold ${currentTheme.text}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Current Context: {pageTitle}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  Clicking below will launch WhatsApp with a pre-formatted message tailored to <strong>{pageTitle}</strong>.
                </p>
              </div>

              {/* Quick Templates */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Quick Inquiry Templates:
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    `Website Development Inquiry`,
                    `Mobile App Development Quote`,
                    `AI Chatbot & Automation Demo`,
                    `Cloud Service Management / AMC`
                  ].map((template) => (
                    <button
                      key={template}
                      onClick={() => handleQuickSend(template)}
                      className="text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
                    >
                      <span>{template}</span>
                      <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message Field */}
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type your custom query..."
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleQuickSend();
                  }}
                />
                <button
                  onClick={() => handleQuickSend()}
                  className={`w-full ${currentTheme.btnSubmit} text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2`}
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  <span>Start WhatsApp Chat</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <motion.div 
        initial={{ y: 40, opacity: 0, scale: 0.6 }}
        animate={{ y: [0, -6, 0], opacity: 1, scale: 1 }}
        transition={{
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
          scale: { type: 'spring', stiffness: 300, damping: 18, delay: 0.2 },
          opacity: { duration: 0.4 }
        }}
        className="flex items-center gap-2"
      >
        {showLabel && !isOpen && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-xl hover:border-emerald-500/50 transition-all"
          >
            <span className={`w-2 h-2 rounded-full ${currentTheme.badge} animate-pulse`} />
            <span>Chat with Founder</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative ${currentTheme.bg} text-white p-4 rounded-full shadow-2xl ${currentTheme.shadow} transition-all duration-300 flex items-center justify-center border-2 border-white dark:border-slate-900`}
          title="Chat on WhatsApp with MUCO Labs (Click to Customize)"
        >
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 ${currentTheme.badge} border-2 border-white dark:border-slate-900 rounded-full animate-ping`} />
          <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 ${currentTheme.badge} border-2 border-white dark:border-slate-900 rounded-full`} />
        </motion.button>
      </motion.div>
    </div>
  );
};

