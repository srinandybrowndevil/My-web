import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Sparkles, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type AppTheme = 'glass' | 'dark' | 'light';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as AppTheme;
      if (saved && ['glass', 'dark', 'light'].includes(saved)) {
        return saved;
      }
      if (document.documentElement.classList.contains('theme-glass')) {
        return 'glass';
      }
      if (document.documentElement.classList.contains('dark')) {
        return 'dark';
      }
      return 'dark';
    }
    return 'dark';
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-glass');

    if (theme === 'glass') {
      root.classList.add('dark', 'theme-glass');
      localStorage.setItem('theme', 'glass');
    } else if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCycleTheme = () => {
    if (theme === 'dark') setTheme('glass');
    else if (theme === 'glass') setTheme('light');
    else setTheme('dark');
  };

  const themeOptions: { id: AppTheme; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
    {
      id: 'glass',
      label: 'Cyber Glassmorphism',
      desc: 'Translucent frosted prism, aurora backlight & specular crystal',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 'dark',
      label: 'Obsidian Dark',
      desc: 'Deep high-contrast cyber dark with subtle neon accents',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      icon: <Moon className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 'light',
      label: 'Titanium Light',
      desc: 'Clean, radiant high-legibility enterprise daylight finish',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      icon: <Sun className="w-4 h-4 text-amber-400" />
    }
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Quick Toggle / Menu Trigger */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleCycleTheme}
          className="relative group p-2 rounded-xl transition-all duration-300 bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 hover:border-cyan-500/60 text-slate-300 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500/40 flex items-center justify-center overflow-hidden"
          title={`Active: ${theme === 'glass' ? 'Cyber Glassmorphism' : theme === 'dark' ? 'Obsidian Dark' : 'Titanium Light'} (Click to cycle)`}
          aria-label="Toggle Theme Mode"
        >
          <div className="relative z-10 flex items-center justify-center">
            {theme === 'glass' && (
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse transition-transform duration-300" />
            )}
            {theme === 'dark' && (
              <Moon className="w-4 h-4 text-indigo-400 transform group-hover:-rotate-12 transition-transform duration-300" />
            )}
            {theme === 'light' && (
              <Sun className="w-4 h-4 text-amber-400 transform group-hover:rotate-45 transition-transform duration-300" />
            )}
          </div>
          <span className="sr-only">Toggle theme</span>
        </button>

        {/* Dropdown chevron trigger for explicit selection */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-1.5 rounded-lg bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 hover:border-cyan-500/60 text-slate-400 hover:text-slate-200 transition-all text-[10px] flex items-center gap-0.5"
          title="Select theme preset"
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu for Explicit Theme Selection */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-slate-950/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl z-50 space-y-1.5"
          >
            <div className="px-2.5 py-1 border-b border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Theme Architecture
              </span>
              {theme === 'glass' && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Active
                </span>
              )}
            </div>

            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border border-cyan-500/40 text-white shadow-sm'
                      : 'hover:bg-slate-900 text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg border mt-0.5 ${opt.color}`}>
                    {opt.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

