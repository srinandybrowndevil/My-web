import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Palette, 
  Code2, 
  Cpu, 
  Rocket, 
  ArrowRight, 
  ChevronRight,
  GitCommit
} from 'lucide-react';
import { PageId } from '../types';

interface ProcessPreviewSectionProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

const PREVIEW_STEPS = [
  {
    step: '01',
    name: 'DISCOVER',
    description: 'We audit bottlenecks, data structures, and business goals to architect a precise technical blueprint.',
    icon: Search,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30'
  },
  {
    step: '02',
    name: 'DESIGN',
    description: 'We craft high-fidelity Figma design systems, mathematical layout tokens, and conversion-tested UX.',
    icon: Palette,
    color: 'text-blue-400',
    border: 'border-blue-500/30'
  },
  {
    step: '03',
    name: 'ENGINEER',
    description: 'We build high-performance React/Next.js code, robust APIs, and ultra-secure cloud databases.',
    icon: Code2,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30'
  },
  {
    step: '04',
    name: 'AUTOMATE',
    description: 'We integrate custom AI agents, automated WhatsApp bots, and background webhook workflows.',
    icon: Cpu,
    color: 'text-purple-400',
    border: 'border-purple-500/30'
  },
  {
    step: '05',
    name: 'LAUNCH',
    description: 'We execute zero-downtime deployment, global edge CDN caching, and comprehensive SLA monitoring.',
    icon: Rocket,
    color: 'text-amber-400',
    border: 'border-amber-500/30'
  }
];

export const ProcessPreviewSection: React.FC<ProcessPreviewSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
            <GitCommit className="w-3.5 h-3.5" />
            <span>HOW WE DELIVER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            OUR PROCESS
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            From initial concept to scalable production in structured milestone sprints. No guesswork, no communication gaps.
          </p>
        </div>

        <button
          onClick={() => onNavigate('process')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 font-bold text-xs sm:text-sm border border-slate-700 shadow-lg group transition-all self-start md:self-auto cursor-pointer"
        >
          <span>View Complete 8-Step Process</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5 Steps Horizontal / Vertical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
        {PREVIEW_STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between space-y-6 hover:border-cyan-500/50 transition-all shadow-md group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg">
                    {s.step}
                  </span>
                  <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-900 ${s.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {s.name}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Phase {idx + 1}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
