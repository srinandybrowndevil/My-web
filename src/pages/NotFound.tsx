import React from 'react';
import { Home, ArrowLeft, Search, ShieldAlert, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { MoseyRoleSelector } from '../components/MoseyRoleSelector';

interface NotFoundProps {
  onNavigate: (page: PageId) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 space-y-8 max-w-7xl mx-auto">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-amber-500 tracking-tight">404</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            The requested page or resource could not be found on MUCO Labs. It may have been moved or updated.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs py-3 px-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-amber-500" />
            <span>Explore Engineering Services</span>
          </button>
        </div>
      </div>
    </div>
  );
};

