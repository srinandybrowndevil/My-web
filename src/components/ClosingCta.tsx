import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { PageId } from '../types';

interface ClosingCtaProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-16 rounded-3xl bg-white dark:bg-[#0e131f] border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-2xl relative overflow-hidden text-center space-y-8">
        {/* Subtle Warm Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-20 dark:opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, transparent 70%)'
          }}
        />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START A PROJECT</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] max-w-3xl mx-auto">
          Have a system worth building?
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Tell us about your technical roadmap, product specifications, or automation needs. We'll deliver a comprehensive architectural blueprint and milestone estimate.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate('contact', 'Start a New Project Consultation')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-orange-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('pricing')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>View Pricing & Tiers</span>
          </button>
        </div>

        {/* Guarantees & Response Time */}
        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>Guaranteed Response &lt; 4 Hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
            <span>Strict NDA & 100% IP Transfer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
            <span>Milestone Sprint Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};
