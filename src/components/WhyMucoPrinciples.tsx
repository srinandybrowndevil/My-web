import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu, Layers, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { PageId } from '../types';

interface Differentiator {
  number: string;
  pillar: string;
  title: string;
  statement: string;
  explanation: string;
  icon: React.ElementType;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    number: '01',
    pillar: 'STRATEGY',
    title: 'Commercial Diagnosis First',
    statement: 'We diagnose your commercial funnel before writing a line of code.',
    explanation: 'We analyze customer friction points, manual overhead, and revenue pathways first to ensure every line of code generates measurable ROI.',
    icon: Compass
  },
  {
    number: '02',
    pillar: 'ENGINEERING',
    title: 'Enterprise Precision & Performance',
    statement: 'Strict type safety, sub-second latency, and zero runtime crashes.',
    explanation: 'We engineer hardened digital foundations using strict TypeScript, index-optimized database schemas, and clean architectural separation.',
    icon: ShieldCheck
  },
  {
    number: '03',
    pillar: 'AI-NATIVE THINKING',
    title: 'Autonomous Systems & Multi-Agents',
    statement: 'Intelligent multi-agent swarms and 24/7 continuous decision engines.',
    explanation: 'We integrate private RAG vector memory, LLM function calling, and automated WhatsApp pipelines so your business operations run autonomously.',
    icon: Cpu
  },
  {
    number: '04',
    pillar: 'LONG-TERM SYSTEMS',
    title: 'Architecture Built to Compound',
    statement: 'Unified digital ecosystems backed by proactive 24/7 SLAs.',
    explanation: 'Your website, mobile app, CRM, and cloud infrastructure share real-time state as a unified machine that compounds in value over years.',
    icon: Layers
  }
];

interface WhyMucoPrinciplesProps {
  onNavigate?: (page: PageId, customMsg?: string) => void;
}

export const WhyMucoPrinciples: React.FC<WhyMucoPrinciplesProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-orange-500" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-orange-600 dark:text-orange-400 uppercase">
              WHY AMBITIOUS TEAMS CHOOSE MUCO
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            ENGINEERED FOR SCALE & CERTAINTY.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Four non-negotiable engineering disciplines that separate true digital operating systems from generic agency templates.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {DIFFERENTIATORS.map((item, idx) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#0e131f] border border-slate-200/80 dark:border-white/10 hover:border-orange-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20">
                    {item.pillar}
                  </span>
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                    {item.number}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                  "{item.statement}"
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
