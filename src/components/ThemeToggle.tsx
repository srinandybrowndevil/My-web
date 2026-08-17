import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative group p-2 rounded-xl transition-all duration-300 bg-slate-900/90 dark:bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 flex items-center justify-center overflow-hidden"
      title={isDark ? 'Switch to Titanium Light Theme' : 'Switch to Obsidian Dark Theme'}
      aria-label="Toggle Theme"
    >
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transform group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-400 transform group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

