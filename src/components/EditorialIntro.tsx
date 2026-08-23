import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Bot, Layers } from 'lucide-react';
import { PageId } from '../types';

interface EditorialIntroProps {
  onNavigate?: (page: PageId) => void;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Background ambient beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-cyan-500" />
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-500 uppercase">
            THE MUCO PHILOSOPHY
          </span>
        </div>

        {/* Large Editorial Statement */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
            Technology should not make your business more complicated.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 bg-clip-text text-transparent">
              It should make the impossible feel inevitable.
            </span>
          </h2>

          <p className="text-base sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-normal max-w-3xl leading-relaxed">
            Most digital agencies sell isolated templates and disconnected code. At MUCO, we engineer connected digital operating systems — weaving custom web architectures, proprietary LLM workflows, and automated business pipelines into one unified engine.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">01 // COHESION</span>
              <Layers className="w-4 h-4 text-cyan-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Systems Over Silos</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every website, mobile application, and database we build is architected to seamlessly exchange intelligence without manual glue.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">02 // AUTONOMY</span>
              <Bot className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Autonomous Intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Deploy AI agents that actively qualify prospects, generate proposals, execute support queries, and synchronize enterprise CRM records.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">03 // SPEED</span>
              <Zap className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sub-Second Execution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Production-grade software engineered with Next.js, Edge compute, and Redis memory caching for blistering performance.
            </p>
          </div>
        </div>

        {/* Fast Action */}
        {onNavigate && (
          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 group cursor-pointer"
            >
              <span>Explore our 6 core capabilities</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
