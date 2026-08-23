import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Palette, 
  Code2, 
  Cpu, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { PageId } from '../types';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: React.ElementType;
  outputArtifact: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'System Audit & Domain Architecture',
    description: 'We dissect your existing operational bottlenecks, database structures, customer touchpoints, and commercial goals to architect a comprehensive engineering blueprint.',
    deliverables: ['Technical Architecture Blueprint', 'Data Flow & Schema Specification', 'API & Integration Mapping', 'Project Milestone Roadmap'],
    duration: 'Week 1',
    icon: Search,
    outputArtifact: 'System Architecture Specification (SAS)'
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'High-Fidelity Interface & Token System',
    description: 'We construct exhaustive Figma design systems, mathematical layout tokens, responsive viewport hierarchies, and click-through interactive micro-interaction prototypes.',
    deliverables: ['Full Design System & UI Library', 'High-Fidelity Figma Prototype', 'Micro-Interaction Motion Specs', 'UX Usability & Accessibility Audit'],
    duration: 'Week 2',
    icon: Palette,
    outputArtifact: 'Interactive Design System & Token Library'
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'Full-Stack Development & Clean Code',
    description: 'Our engineers implement modular Next.js / React components, TypeScript type safety, secure REST/GraphQL backends, and low-latency database queries.',
    deliverables: ['Production Next.js / React Codebase', 'Cloud SQL / PostgreSQL Data Layer', 'Authentication & RBAC Security', 'Sub-Second Page Load Optimization'],
    duration: 'Weeks 2–3',
    icon: Code2,
    outputArtifact: 'Production-Ready Application Build'
  },
  {
    number: '04',
    title: 'Automate',
    subtitle: 'AI Agent Swarms & Workflow Pipelines',
    description: 'We weave custom Gemini LLMs, vector memory stores, automated WhatsApp APIs, and webhook event listeners into an autonomous background engine.',
    deliverables: ['Custom LLM Prompt & Tool Orchestration', 'Self-Healing Webhook Handlers', 'WhatsApp API Automated Chatbots', 'CRM & Spreadsheet Ledger Sync'],
    duration: 'Week 3',
    icon: Cpu,
    outputArtifact: 'Autonomous AI & Workflow Engine'
  },
  {
    number: '05',
    title: 'Launch',
    subtitle: 'Zero-Downtime Production Deployment',
    description: 'We configure custom domains, SSL certificates, global CDN edge caching, SEO sitemaps, structured schema data, and analytics pipelines for a flawless go-live.',
    deliverables: ['Global Edge CDN Distribution', 'SEO Schema & Sitemap Indexing', 'Core Web Vitals Perfection (100/100)', 'DNS & SSL Zero-Downtime Switch'],
    duration: 'Week 4',
    icon: Rocket,
    outputArtifact: 'Live Production Platform'
  },
  {
    number: '06',
    title: 'Optimize',
    subtitle: 'SLA Monitoring & Continuous Enhancement',
    description: 'Continuous monitoring of uptime, LLM hallucination checks, automated security backups, conversion rate optimization, and ongoing feature releases.',
    deliverables: ['24/7 Infrastructure Health Monitoring', 'Automated Daily Cloud Backups', 'Monthly Performance & SEO Reports', 'Dedicated Engineering SLA Support'],
    duration: 'Ongoing',
    icon: TrendingUp,
    outputArtifact: 'Enterprise SLA & Monthly Optimization'
  }
];

interface InteractiveProcessTimelineProps {
  onNavigate?: (page: PageId, customMsg?: string) => void;
}

export const InteractiveProcessTimeline: React.FC<InteractiveProcessTimelineProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = PROCESS_STEPS[activeStepIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-cyan-500" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-500 uppercase">
              DELIVERY METHODOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How We Build.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          A disciplined 6-stage lifecycle engineered for predictability, transparency, and sub-second quality execution.
        </p>
      </div>

      {/* Interactive Process Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Step Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {PROCESS_STEPS.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            const Icon = step.icon;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/15 translate-x-2'
                    : 'bg-white/40 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className={`text-base font-black tracking-tight ${isCurrent ? 'text-white' : 'text-slate-900 dark:text-slate-200'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs font-mono truncate max-w-[200px] sm:max-w-xs ${isCurrent ? 'text-cyan-300' : 'text-slate-400'}`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold shrink-0 ${
                  isCurrent ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step.duration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Active Step Deep-Dive Inspector (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.number}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-cyan-500/40 shadow-2xl text-slate-100 space-y-6"
            >
              {/* Step Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold block">
                      STAGE {activeStep.number} // {activeStep.duration}
                    </span>
                    <h3 className="text-2xl font-black text-white">{activeStep.title}</h3>
                  </div>
                </div>

                <span className="hidden sm:block px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                  {activeStep.outputArtifact}
                </span>
              </div>

              {/* Narrative */}
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {activeStep.description}
              </p>

              {/* Deliverables */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase block">
                  Key Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStep.deliverables.map((deliv) => (
                    <div key={deliv} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              {onNavigate && (
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Ready to begin with Stage 01?
                  </span>
                  <button
                    onClick={() => onNavigate('contact', `Starting project with ${activeStep.title} Phase`)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transform hover:-translate-y-0.5 transition-all"
                  >
                    <span>Start Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
