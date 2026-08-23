import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageSquare, ShieldCheck, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface ClosingCtaProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 dark:from-[#080e1e] dark:to-[#04060d] border border-cyan-500/40 shadow-2xl relative overflow-hidden text-center space-y-8">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR DIGITAL TRANSFORMATION</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Ready to Build What's Next?
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Tell us what you're building. We'll help turn the idea into an intelligent, high-converting digital system that scales.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate('contact', 'Start a New Project Consultation')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('pricing')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Pricing Plans</span>
          </button>
        </div>

        {/* Guarantees & Response Time */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Response within &lt; 4 hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strict NDA & Code Ownership</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Milestone-Based Escrow</span>
          </div>
        </div>
      </div>
    </section>
  );
};
