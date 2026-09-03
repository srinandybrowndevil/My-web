import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Settings2, Check, Phone, Calendar, Activity, FileSpreadsheet, Zap } from 'lucide-react';
import { PageId } from '../types';
import { openWhatsApp, WHATSAPP_NUMBER, getPathHeuristic } from '../utils/whatsapp';
import { logWhatsAppInquiryToGoogleSheets } from '../services/whatsAppSheetsLogger';
import { useEngagementNudge } from '../hooks/useEngagementNudge';

interface FloatingWhatsAppProps {
  currentPage: PageId;
}

export type ButtonTheme = 'emerald' | 'cyan' | 'amber' | 'indigo' | 'glass';

interface ThemeDefinition {
  id: ButtonTheme;
  name: string;
  dotColor: string;
  badgeBg: string;
  description: string;
}

const AVAILABLE_THEMES: ThemeDefinition[] = [
  { id: 'emerald', name: 'Emerald', dotColor: 'bg-emerald-500', badgeBg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', description: 'Classic WhatsApp Green' },
  { id: 'cyan', name: 'Cyan', dotColor: 'bg-cyan-500', badgeBg: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30', description: 'Cyber Neon Glow' },
  { id: 'amber', name: 'Amber', dotColor: 'bg-amber-500', badgeBg: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30', description: 'Luxury Gold Accent' },
  { id: 'indigo', name: 'Indigo', dotColor: 'bg-indigo-600', badgeBg: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30', description: 'Enterprise Violet' },
  { id: 'glass', name: 'Glass', dotColor: 'bg-gradient-to-r from-cyan-400 to-blue-500', badgeBg: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/40', description: 'Cyber Glass Prism' }
];

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false);
  const [customText, setCustomText] = useState('');

  // Dwell-time engagement hook: triggers after 45s on high-intent pages ('pricing' & 'contact')
  const { shouldNudge, dismissNudge } = useEngagementNudge(currentPage, {
    targetPages: ['pricing', 'contact'],
    durationMs: 45000,
    isOpen
  });

  // Persist theme choice in localStorage
  const [theme, setTheme] = useState<ButtonTheme>(() => {
    try {
      const saved = localStorage.getItem('muco_whatsapp_theme');
      if (saved && ['emerald', 'cyan', 'amber', 'indigo', 'glass'].includes(saved)) {
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

  const heuristic = getPathHeuristic(currentPage);
  const pageTitle = heuristic.pageTitle;
  const suggestedTemplates = heuristic.suggestedQuestions;

  const handleQuickSend = (serviceOrQuestion?: string) => {
    openWhatsApp({
      pageName: pageTitle,
      path: currentPage,
      customMessage: customText.trim()
        ? customText
        : serviceOrQuestion
        ? `Hello MUCO Labs! 👋 Regarding ${pageTitle}: I would like to ask about "${serviceOrQuestion}".`
        : undefined
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
    },
    glass: {
      bg: 'bg-cyan-500/80 backdrop-blur-xl border border-white/40 hover:bg-cyan-400/90',
      shadow: 'hover:shadow-cyan-500/50 shadow-lg',
      badge: 'bg-cyan-300',
      text: 'text-cyan-400',
      accentBg: 'bg-cyan-500/15 backdrop-blur-md',
      border: 'border-cyan-400/40',
      btnSubmit: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/30'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Quick Chat Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="whatsapp-popover"
            initial={{ opacity: 0, scale: 0.82, y: 24, originX: 0.95, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.85, 
              y: 18, 
              transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } 
            }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 24,
              mass: 0.75
            }}
            className="mb-3 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-slate-950/20 dark:shadow-cyan-950/20 space-y-4"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    key={`avatar-${theme}`}
                    initial={{ scale: 0.85, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                    className={`w-10 h-10 rounded-2xl ${currentTheme.bg} text-white flex items-center justify-center font-black text-sm shadow-md transition-colors duration-300`}
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </motion.div>
                  <motion.span
                    key={`badge-${theme}`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className={`absolute bottom-0 right-0 w-3 h-3 ${currentTheme.badge} border-2 border-white dark:border-slate-900 rounded-full animate-pulse`}
                  />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>MUCO Labs WhatsApp</span>
                    <motion.span
                      key={`online-${theme}`}
                      initial={{ scale: 0.9, opacity: 0.7 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`text-[10px] bg-slate-100 dark:bg-slate-800 ${currentTheme.text} font-bold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors duration-300`}
                    >
                      Online
                    </motion.span>
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
            <AnimatePresence mode="wait">
              {showSettings ? (
                <motion.div
                  key="settings-panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Theme Accent ({AVAILABLE_THEMES.length} options)</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const currentIndex = AVAILABLE_THEMES.findIndex((t) => t.id === theme);
                          const nextTheme = AVAILABLE_THEMES[(currentIndex + 1) % AVAILABLE_THEMES.length].id;
                          setTheme(nextTheme);
                        }}
                        className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors"
                        title="Cycle to next theme"
                      >
                        <Zap className="w-2.5 h-2.5" />
                        <span>Next Theme</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {AVAILABLE_THEMES.map((t) => {
                        const isSelected = theme === t.id;
                        return (
                          <motion.button
                            key={t.id}
                            type="button"
                            layout
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => setTheme(t.id)}
                            className="relative p-2 rounded-xl text-left border flex items-center justify-between group overflow-hidden border-slate-200 dark:border-slate-700/80"
                          >
                            {/* Smooth layout indicator moving between options */}
                            {isSelected ? (
                              <motion.div
                                layoutId="activeThemeHighlight"
                                className="absolute inset-0 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white shadow-md shadow-slate-950/10 dark:shadow-cyan-500/15 z-0"
                                transition={{
                                  type: 'spring',
                                  stiffness: 450,
                                  damping: 32
                                }}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-slate-100/80 dark:bg-slate-800/60 group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors z-0" />
                            )}

                            <div className="relative z-10 flex items-center gap-2">
                              <motion.span
                                animate={isSelected ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                                transition={{ duration: 0.28, ease: 'easeInOut' }}
                                className={`w-3.5 h-3.5 rounded-full ${t.dotColor} shrink-0 shadow-sm ${
                                  isSelected ? 'ring-2 ring-offset-1 ring-slate-400 dark:ring-slate-500' : ''
                                }`}
                              />
                              <div>
                                <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                                  {t.name}
                                </div>
                                <div className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">
                                  {t.description}
                                </div>
                              </div>
                            </div>

                            <div className="relative z-10 flex items-center">
                              <AnimatePresence mode="wait">
                                {isSelected ? (
                                  <motion.span
                                    key="selected-check"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 520, damping: 26 }}
                                    className="p-0.5 rounded-full bg-emerald-500 text-white shadow-sm shrink-0"
                                  >
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="unselected-dot"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-slate-400 shrink-0"
                                  />
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Live Preview Indicator with smooth layout animation */}
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className={`p-2.5 rounded-xl border ${currentTheme.border} ${currentTheme.accentBg} flex items-center justify-between transition-colors duration-300 shadow-sm`}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          key={`mini-${theme}`}
                          initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                          className={`w-6 h-6 rounded-lg ${currentTheme.bg} text-white flex items-center justify-center shadow-md`}
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </motion.div>
                        <span className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold">
                          Active Visual Feedback
                        </span>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`badge-text-${theme}`}
                          initial={{ opacity: 0, y: 5, scale: 0.88 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.88 }}
                          transition={{ type: 'spring', stiffness: 480, damping: 26 }}
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${currentTheme.badge} text-slate-950 capitalize shadow-sm border border-black/10`}
                        >
                          {theme} Theme Active
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
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

                  {/* Diagnostics & Error Log Viewer */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => {
                        setShowSettings(false);
                        setIsOpen(false);
                        window.dispatchEvent(new CustomEvent('muco:open_whatsapp_diag'));
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-[11px] font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-500" />
                      <span>WhatsApp Link Diagnostics & Error Logs</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat-panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="space-y-4"
                >
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
                      Suggested Questions for {pageTitle}:
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {suggestedTemplates.map((template) => (
                        <button
                          key={template}
                          onClick={() => handleQuickSend(template)}
                          className="text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
                        >
                          <span className="truncate pr-2">{template}</span>
                          <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Message Field & Action Buttons */}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => handleQuickSend()}
                        className={`w-full ${currentTheme.btnSubmit} text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95`}
                      >
                        <Send className="w-3.5 h-3.5 fill-current" />
                        <span>Chat Now</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          window.dispatchEvent(new CustomEvent('muco:open_schedule_call'));
                        }}
                        className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm group"
                      >
                        <Calendar className="w-3.5 h-3.5 text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span>Schedule 15m Call</span>
                      </button>
                    </div>

                    {/* Google Sheets Live Sync Assurance */}
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
                      <FileSpreadsheet className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>Inquiries automatically logged to Google Sheets integration</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Engagement Nudge Tooltip / Toast (Triggers when dwell > 45s on Pricing or Contact) */}
      <AnimatePresence>
        {shouldNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="mb-2 max-w-[270px] bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl text-white p-3 rounded-2xl border border-emerald-500/40 shadow-2xl shadow-emerald-950/30 flex items-start gap-2.5 cursor-pointer group"
            onClick={() => {
              dismissNudge();
              setIsOpen(true);
            }}
          >
            <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-white">
                  {currentPage === 'pricing' ? 'Questions on Pricing?' : 'Need a Custom Scope?'}
                </span>
                <span className="text-[9px] font-mono font-bold text-emerald-400">Live</span>
              </div>
              <p className="text-[10px] text-slate-300 leading-snug">
                {currentPage === 'pricing' 
                  ? 'Founder Srinivash can help calculate your exact MVP estimate.' 
                  : 'Get an instant consultation & proposal review on WhatsApp.'}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismissNudge();
              }}
              className="text-slate-500 hover:text-slate-200 p-0.5 rounded transition-colors"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
            onClick={() => {
              dismissNudge();
              setIsOpen(true);
            }}
            className={`hidden sm:flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs px-3.5 py-2 rounded-full border shadow-xl transition-all ${
              shouldNudge 
                ? 'border-emerald-500/60 ring-2 ring-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${currentTheme.badge} animate-pulse`} />
            <span>
              {shouldNudge 
                ? (currentPage === 'pricing' ? 'Questions on Pricing?' : 'Get Instant Proposal')
                : 'Chat with Founder'}
            </span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          animate={shouldNudge ? {
            rotate: [0, -6, 6, -5, 5, -3, 3, -1, 1, 0],
            x: [0, -2, 2, -2, 2, -1, 1, 0],
            scale: [1, 1.08, 1.02, 1.06, 1]
          } : {
            rotate: 0,
            x: 0,
            scale: 1
          }}
          transition={shouldNudge ? {
            duration: 0.9,
            repeat: Infinity,
            repeatDelay: 4.5,
            ease: [0.36, 0.07, 0.19, 0.97]
          } : undefined}
          onClick={() => {
            dismissNudge();
            setIsOpen(!isOpen);
          }}
          className={`group relative ${currentTheme.bg} text-white p-4 rounded-full shadow-2xl ${currentTheme.shadow} transition-all duration-300 flex items-center justify-center border-2 ${
            shouldNudge ? 'border-emerald-400 ring-4 ring-emerald-500/30' : 'border-white dark:border-slate-900'
          }`}
          title={shouldNudge ? "Need help with pricing or proposals? Chat with Srinivash" : "Chat on WhatsApp with MUCO Labs (Click to Customize)"}
        >
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 ${currentTheme.badge} border-2 border-white dark:border-slate-900 rounded-full animate-ping`} />
          <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 ${currentTheme.badge} border-2 border-white dark:border-slate-900 rounded-full`} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

