import React from 'react';
import { motion } from 'framer-motion';
import { PageId } from '../types';
import { HeroIntelligenceSystem } from '../components/HeroIntelligenceSystem';
import { TrustIndicatorsStrip } from '../components/TrustIndicatorsStrip';
import { WhatMucoBuilds } from '../components/WhatMucoBuilds';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { WhyMucoPrinciples } from '../components/WhyMucoPrinciples';
import { ProcessPreviewSection } from '../components/ProcessPreviewSection';
import { FounderSection } from '../components/FounderSection';
import { AnimatedMetrics } from '../components/AnimatedMetrics';
import { EditorialTestimonials } from '../components/EditorialTestimonials';
import { ClosingCta } from '../components/ClosingCta';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
  isScrolledPastHero?: boolean;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, isScrolledPastHero = false }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col items-center justify-center pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden text-center">
        {/* Subtle Warm Amber/Orange Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full pointer-events-none opacity-20 dark:opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.25) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 70%)'
          }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>MUCO LABS • SYSTEMS & AI ENGINEERING</span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white text-center leading-[1.05]"
          >
            We build digital systems, <br className="hidden sm:inline" />
            <span className="text-orange-600 dark:text-orange-400">
              custom software & AI.
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg md:text-xl max-w-3xl leading-relaxed font-normal px-2 text-center"
          >
            Intelligent systems engineering, web & mobile applications, autonomous AI agents, and business automation built for forward-thinking enterprises.
          </motion.p>

          {/* HERO ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              onClick={() => onNavigate('contact', 'Start a New Project with MUCO Labs')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold text-sm border border-slate-200 dark:border-white/10 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ChevronRight className="w-4 h-4 text-orange-500" />
            </button>
          </motion.div>

          {/* LIVE INTELLIGENCE SYSTEM INTERACTIVE VISUAL */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full pt-8 sm:pt-12"
          >
            <HeroIntelligenceSystem />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. TRUST INDICATORS STRIP */}
      <TrustIndicatorsStrip />

      {/* 3. SECTION 02: THREE CORE CAPABILITIES (BUILD, AUTOMATE, GROW) */}
      <WhatMucoBuilds onNavigate={onNavigate} />

      {/* 4. SECTION 03: SELECTED WORK & CASE STUDIES */}
      <FeaturedProjects onNavigate={onNavigate} />

      {/* 5. SECTION 04: WHY MUCO PRINCIPLES */}
      <WhyMucoPrinciples onNavigate={onNavigate} />

      {/* 6. SECTION 05: HOW WE WORK (5-STEP PROCESS) */}
      <ProcessPreviewSection onNavigate={onNavigate} />

      {/* 7. SECTION 06: FOUNDER & LEADERSHIP */}
      <FounderSection onNavigate={onNavigate} />

      {/* 8. PROOF: ANIMATED METRICS & TESTIMONIALS */}
      <AnimatedMetrics />
      <EditorialTestimonials />

      {/* 9. SECTION 07: FINAL CTA */}
      <ClosingCta onNavigate={onNavigate} />
    </div>
  );
};
