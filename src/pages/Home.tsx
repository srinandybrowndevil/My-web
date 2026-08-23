import React from 'react';
import { motion } from 'framer-motion';
import { PageId } from '../types';
import { HeroIntelligenceSystem } from '../components/HeroIntelligenceSystem';
import { EditorialIntro } from '../components/EditorialIntro';
import { InteractiveServiceList } from '../components/InteractiveServiceList';
import { InteractiveAutomationWorkflow } from '../components/InteractiveAutomationWorkflow';
import { AnimatedMetrics } from '../components/AnimatedMetrics';
import { InteractiveProcessTimeline } from '../components/InteractiveProcessTimeline';
import { WhyMucoPrinciples } from '../components/WhyMucoPrinciples';
import { EditorialTestimonials } from '../components/EditorialTestimonials';
import { ClosingCta } from '../components/ClosingCta';
import { MoseyRoleSelector } from '../components/MoseyRoleSelector';
import { TrustIndicatorsStrip } from '../components/TrustIndicatorsStrip';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { EstimateCalculator } from '../components/EstimateCalculator';
import { AuthenticCompanyVisuals } from '../components/AuthenticCompanyVisuals';
import { RegionalHubsShowcase } from '../components/RegionalHubsShowcase';
import { MucoLogo } from '../components/MucoLogo';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Code2, 
  Cpu, 
  Bot 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
  isScrolledPastHero?: boolean;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, isScrolledPastHero = false }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden font-sans">
      {/* 1. CINEMATIC HERO SECTION (Mosey-Inspired Product UX) */}
      <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col items-center justify-center pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden text-center">
        {/* Ambient background glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[350px] sm:h-[800px] rounded-full pointer-events-none opacity-40 dark:opacity-60"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.16) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 70%)'
          }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3341551a_1px,transparent_1px),linear-gradient(to_bottom,#3341551a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-cyan-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>MUCO AI STUDIO • INTELLIGENT DIGITAL SYSTEMS</span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white text-center leading-[1.05]"
          >
            WE BUILD INTELLIGENT <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              DIGITAL SYSTEMS.
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg md:text-xl max-w-3xl leading-relaxed font-normal px-2 text-center"
          >
            AI products, autonomous automation workflows, high-speed web platforms, and native mobile apps engineered to move ambitious businesses forward.
          </motion.p>

          {/* HERO ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              onClick={() => onNavigate('contact', 'Start a New Project with MUCO AI Studio')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('systems')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-850 font-bold text-sm border border-slate-700/80 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore AI Systems</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
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

      {/* 2. TRUST INDICATORS & VERIFIED TECHNOLOGIES STRIP */}
      <TrustIndicatorsStrip />

      {/* 3. LARGE EDITORIAL INTRODUCTION STATEMENT */}
      <EditorialIntro onNavigate={onNavigate} />

      {/* 4. AWWWARDS MOSEY-STYLE INTERACTIVE ROLE SELECTION MATRIX */}
      <MoseyRoleSelector onNavigate={onNavigate} variant="full" />

      {/* 5. INTERACTIVE SERVICES & TECHNICAL INSPECTOR */}
      <InteractiveServiceList onNavigate={onNavigate} />

      {/* 6. INTERACTIVE AUTOMATION WORKFLOW SIMULATION */}
      <InteractiveAutomationWorkflow onNavigate={onNavigate} />

      {/* 7. FEATURED PRODUCTION CASE STUDIES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedProjects onNavigate={onNavigate} />
      </div>

      {/* 8. ANIMATED TELEMETRY METRICS SECTION */}
      <AnimatedMetrics />

      {/* 9. INTERACTIVE 6-STEP DELIVERY PROCESS */}
      <InteractiveProcessTimeline onNavigate={onNavigate} />

      {/* 10. WHY MUCO OPERATING PRINCIPLES */}
      <WhyMucoPrinciples onNavigate={onNavigate} />

      {/* 11. EDITORIAL CLIENT TESTIMONIALS & OUTCOMES */}
      <EditorialTestimonials />

      {/* 12. AUTHENTIC COMPANY VISUALS & TEAM WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AuthenticCompanyVisuals />
      </div>

      {/* 13. REGIONAL HUBS & GLOBAL CONNECTIVITY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RegionalHubsShowcase onNavigate={onNavigate} />
      </div>

      {/* 14. INTERACTIVE PROJECT ESTIMATE CALCULATOR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EstimateCalculator onNavigate={onNavigate} />
      </div>

      {/* 15. HIGH-IMPACT CLOSING CALL-TO-ACTION */}
      <ClosingCta onNavigate={onNavigate} />
    </div>
  );
};
