import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Palette, 
  Code2, 
  Rocket, 
  TrendingUp, 
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
    description: 'We audit operational bottlenecks, commercial workflows, and user friction to define precise engineering specifications.',
    icon: Search
  },
  {
    step: '02',
    name: 'DESIGN',
    description: 'We craft high-fidelity Figma design systems, mathematical layout tokens, and conversion-tested user interfaces.',
    icon: Palette
  },
  {
    step: '03',
    name: 'BUILD',
    description: 'We engineer hardened TypeScript codebases, scalable APIs, AI automation pipelines, and secure cloud databases.',
    icon: Code2
  },
  {
    step: '04',
    name: 'LAUNCH',
    description: 'We execute zero-downtime deployment, global edge CDN caching, and automated testing across devices.',
    icon: Rocket
  },
  {
    step: '05',
    name: 'GROW',
    description: 'We ensure long-term stability with 24/7 proactive monitoring, SEO search indexing, and continuous performance tuning.',
    icon: TrendingUp
  }
];

export const ProcessPreviewSection: React.FC<ProcessPreviewSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 font-mono font-bold text-xs uppercase tracking-widest">
            <GitCommit className="w-3.5 h-3.5" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            PRECISION METHODOLOGY.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            From initial commercial discovery to battle-tested scale in structured milestone sprints.
          </p>
        </div>

        <button
          onClick={() => onNavigate('process')}
          className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-500 font-bold text-xs sm:text-sm tracking-wide group transition-colors self-start md:self-auto cursor-pointer"
        >
          <span>Explore 8-Step Deep Process</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5 Steps Horizontal / Vertical Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
        {PREVIEW_STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl bg-white dark:bg-[#0e131f] border border-slate-200/80 dark:border-white/10 p-6 flex flex-col justify-between space-y-6 hover:border-orange-500/40 transition-all duration-300 shadow-sm hover:shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md border border-orange-500/20">
                    {s.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 group-hover:text-orange-500 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  {s.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-2">
                <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-500" 
                    style={{ width: `${(idx + 1) * 20}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
