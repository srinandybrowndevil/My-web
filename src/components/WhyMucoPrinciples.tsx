import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, Cpu, Layers, Trophy, Check, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface Principle {
  number: string;
  title: string;
  statement: string;
  explanation: string;
  icon: React.ElementType;
}

const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'Strategy before technology',
    statement: 'We never write a line of code until we understand your commercial engine.',
    explanation: 'Choosing frameworks and tools is secondary to diagnosing the exact customer friction, lead funnel bottlenecks, and monetization pathways that drive revenue.',
    icon: Compass
  },
  {
    number: '02',
    title: 'Design before development',
    statement: 'Aesthetics and usability dictate conversion rate before code is executed.',
    explanation: 'We craft mathematical spacing, typography hierarchy, and click-tested Figma systems so users immediately understand value and take decisive action.',
    icon: Palette
  },
  {
    number: '03',
    title: 'Automation before repetition',
    statement: 'If a human has to copy-paste data twice, a system should do it forever.',
    explanation: 'We eliminate manual operational friction by weaving autonomous LLMs, webhooks, and background event listeners that execute without human fatigue.',
    icon: Cpu
  },
  {
    number: '04',
    title: 'Systems before isolated tools',
    statement: 'Standalone tools create fragmented silos; connected systems compound leverage.',
    explanation: 'Your website, mobile application, CRM, payment gateway, and WhatsApp bot must share real-time state and intelligence as a unified machine.',
    icon: Layers
  },
  {
    number: '05',
    title: 'Results before vanity',
    statement: 'We measure success in qualified leads, sub-second latencies, and real revenue.',
    explanation: 'No arbitrary buzzwords or cosmetic fluff. Every system we deploy comes with measurable SLAs, conversion tracking, and documented business ROI.',
    icon: Trophy
  }
];

interface WhyMucoPrinciplesProps {
  onNavigate?: (page: PageId, customMsg?: string) => void;
}

export const WhyMucoPrinciples: React.FC<WhyMucoPrinciplesProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-cyan-500" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-500 uppercase">
              OUR OPERATING PRINCIPLES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Ambitious Teams Choose MUCO.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Five non-negotiable engineering disciplines that separate true digital operating systems from generic agency templates.
        </p>
      </div>

      {/* 5 Principles Vertical Stack */}
      <div className="space-y-4">
        {PRINCIPLES.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.number}
              className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-slate-950/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Number & Icon (3 cols) */}
                <div className="lg:col-span-4 flex items-center gap-4">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-cyan-500/60 dark:text-cyan-400/80">
                    {p.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    {p.title}
                  </h3>
                </div>

                {/* Core Statement (4 cols) */}
                <div className="lg:col-span-4">
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-cyan-300 leading-snug">
                    "{p.statement}"
                  </p>
                </div>

                {/* Deep Explanation (4 cols) */}
                <div className="lg:col-span-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {p.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
