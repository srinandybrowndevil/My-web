import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Layout,
  Code2,
  Rocket,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { PageId } from '../types';

interface ProjectDeliveryRoadmapProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

interface RoadmapStage {
  step: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
  deliverables: string[];
  clientRole: string;
  techHighlights: string[];
}

export const ProjectDeliveryRoadmap: React.FC<ProjectDeliveryRoadmapProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stages: RoadmapStage[] = [
    {
      step: '01',
      title: 'Discovery & System Blueprint',
      subtitle: 'Requirements scoping, technical feasibility, architecture design & SLA timeline commitment.',
      duration: 'Days 1 – 3',
      icon: <Compass className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-400',
      deliverables: [
        'Comprehensive Technical Requirement Document (TRD)',
        'Database Schema & API Architecture Diagram',
        'Transparent Milestone Breakdown & Fixed Quote',
        'Signed NDA & Intellectual Property Ownership Guarantee'
      ],
      clientRole: 'Share business objectives, brand assets, and reference designs during a 30-min discovery session.',
      techHighlights: ['System Architecture Modeling', 'Security Planning', 'Cloud Cost Estimation']
    },
    {
      step: '02',
      title: 'UI/UX & Interactive Prototype',
      subtitle: 'High-fidelity Figma prototypes, intuitive user flows, and responsive design systems.',
      duration: 'Days 4 – 8',
      icon: <Layout className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-400',
      deliverables: [
        'Complete High-Fidelity UI/UX Screens (Mobile & Desktop)',
        'Interactive Clickable Figma Prototype',
        'Design System (Color Palette, Typography, Component Library)',
        'Iterative Feedback & Refinement Revisions'
      ],
      clientRole: 'Review interactive prototype and provide feedback on layout, user flows, and aesthetic preference.',
      techHighlights: ['Tailwind CSS System', 'Micro-Interactions', 'WCAG AAA Accessibility']
    },
    {
      step: '03',
      title: 'Agile Engineering & AI Integration',
      subtitle: 'Production code development, custom LLM fine-tuning, REST/GraphQL APIs, and weekly test builds.',
      duration: 'Weeks 2 – 4',
      icon: <Code2 className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-400',
      deliverables: [
        'Production React / Next.js / Flutter Codebase',
        'Custom AI Agent, RAG Pipeline & Vector DB Setup',
        'Secure Backend APIs & Payment Gateway (Razorpay/Stripe)',
        'Live Staging Link for Real-Time Client Testing'
      ],
      clientRole: 'Test weekly staging builds, test real user scenarios, and approve sprint milestones.',
      techHighlights: ['Clean Modular TypeScript', 'Sub-second Load Times', 'End-to-End Encryption']
    },
    {
      step: '04',
      title: 'QA, Security Audit & Cloud Launch',
      subtitle: 'Lighthouse 95+ optimization, cross-device testing, DNS setup, and App Store publishing.',
      duration: 'Days 25 – 30',
      icon: <Rocket className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-400',
      deliverables: [
        'Production Deployment to AWS / Google Cloud Run / Vercel',
        'Google Play Store & Apple App Store Publishing Support',
        'Automated CI/CD Pipelines & Daily Cloud Backups',
        '100% Full Source Code Handover + Documentation'
      ],
      clientRole: 'Final sign-off, domain DNS pointing, and receiving complete administrator keys and repositories.',
      techHighlights: ['99.9% Cloud Uptime SLA', 'Full Code Ownership', '30-Day Free Post-Launch Warranty']
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Transparent Delivery Framework</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Our 4-Stage Engineering & Deployment Lifecycle
        </h3>
        <p className="text-sm sm:text-base text-slate-400">
          From concept blueprint to production launch—how MUCO Labs guarantees on-time, enterprise-grade delivery.
        </p>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stages.map((stage, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={stage.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-slate-800/90 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Stage {stage.step}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{stage.duration}</span>
              </div>
              <h4 className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {stage.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Stage Details Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
                  Stage {stages[activeStep].step}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {stages[activeStep].duration}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {stages[activeStep].title}
              </h4>
              <p className="text-sm text-slate-400">
                {stages[activeStep].subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {stages[activeStep].techHighlights.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] font-semibold text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Key Deliverables */}
            <div className="md:col-span-7 space-y-3">
              <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Guaranteed Deliverables in this Stage
              </h5>
              <div className="space-y-2.5">
                {stages[activeStep].deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Collaboration & SLA */}
            <div className="md:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
              <div>
                <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Client Collaboration Checkpoint
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stages[activeStep].clientRole}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Ready to discuss your project?</span>
                <button
                  onClick={() => onNavigate('contact', `I'm interested in starting Stage 1 Discovery with MUCO Labs.`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Book Discovery Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
