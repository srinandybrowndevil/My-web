import React from 'react';
import { motion } from 'framer-motion';
import { FOUNDER_INFO } from '../data/galleryData';
import { PageId } from '../types';
import { ArrowRight, Quote, ShieldCheck, Code2, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

interface FounderSectionProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-white dark:bg-[#0e131f] border border-slate-200/80 dark:border-white/10 p-8 sm:p-12 lg:p-16 shadow-sm dark:shadow-2xl overflow-hidden">
        {/* Subtle decorative background glow */}
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 dark:opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, transparent 70%)'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: FOUNDER PORTRAIT (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col items-center sm:items-start"
          >
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 shadow-xl">
              <img
                src={FOUNDER_INFO.image}
                alt={FOUNDER_INFO.name}
                className="w-full h-full object-cover object-top contrast-105 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="font-bold text-sm sm:text-base tracking-tight">
                  {FOUNDER_INFO.name}
                </div>
                <div className="text-xs text-orange-400 font-mono">
                  {FOUNDER_INFO.role}
                </div>
              </div>
            </div>

            {/* Quick credentials strip */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5">
                <MapPin className="w-3 h-3 text-orange-500" />
                <span>{FOUNDER_INFO.location}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5">
                <ShieldCheck className="w-3 h-3 text-orange-500" />
                <span>Founder & Tech Lead</span>
              </span>
            </div>
          </motion.div>

          {/* RIGHT: STORY & PHILOSOPHY (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 font-mono font-bold text-xs uppercase tracking-widest">
              <Quote className="w-3.5 h-3.5" />
              <span>LEADERSHIP & VISION</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              "Technology is our tool. Innovation is our language. MUCO Labs is our commitment to engineering excellence."
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Founded by Srinivash Mahalingam (srinandy), MUCO Labs operates with a singular focus: architecting production-grade digital systems, custom enterprise software, mobile platforms, and AI automation that empower businesses globally.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1">
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-orange-500" />
                  <span>Hands-On Engineering</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every architecture is designed directly with our core engineering team for maximum type-safety and performance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1">
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>AI-Native Mindset</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Integrating modern LLM function calling and multi-agent workflows directly into operational pathways.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer group"
              >
                <span>Meet the Full Team</span>
                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact', 'Discussion with Founder Srinivash Mahalingam')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
              >
                <span>Schedule a Direct Call</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
