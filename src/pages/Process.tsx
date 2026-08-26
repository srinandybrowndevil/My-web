import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Compass, 
  Palette, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Terminal, 
  Clock, 
  FileCheck,
  Zap,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PageId } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ClosingCta } from '../components/ClosingCta';

interface ProcessProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

interface FullProcessStep {
  id: string;
  step: string;
  name: string;
  tagline: string;
  duration: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  overview: string;
  keyActivities: string[];
  deliverables: string[];
  clientInvolvement: string;
  outputArtifact: string;
}

const FULL_PROCESS_STEPS: FullProcessStep[] = [
  {
    id: 'discover',
    step: '01',
    name: 'DISCOVER',
    tagline: 'Business Problem & Requirements Scoping',
    duration: 'Week 1 (Days 1–3)',
    icon: Search,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    overview: 'We conduct in-depth engineering interviews and operational audits to uncover core bottlenecks, legacy system constraints, customer journeys, and measurable commercial goals.',
    keyActivities: [
      'Stakeholder & Operational Workflow Interviews',
      'Data Structure, API & Legacy System Audits',
      'Target Persona Journey Mapping & Friction Analysis',
      'Technical Feasibility & ROI Scoping'
    ],
    deliverables: [
      'System Architecture Blueprint (SAB)',
      'Data Flow & Schema Specification',
      'API & Third-Party Integration Matrix',
      'Project Scope & Milestone Roadmap'
    ],
    clientInvolvement: '2–3 one-hour discovery sessions with domain leads.',
    outputArtifact: 'Validated Scope & Architecture Document'
  },
  {
    id: 'strategy',
    step: '02',
    name: 'STRATEGY',
    tagline: 'Architecture & Technical Direction',
    duration: 'Week 1 (Days 4–5)',
    icon: Compass,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/50',
    overview: 'We formulate the comprehensive technical stack, database normalization schemas, API security boundaries, and LLM model selection to prevent costly rewrites.',
    keyActivities: [
      'Cloud Infrastructure & Hosting Selection (VPC/GCP/AWS)',
      'Database Schema Normalization & Query Planning',
      'LLM Model Benchmarking (Gemini / Claude / Open Source)',
      'Security, RBAC & Compliance Framework Definition'
    ],
    deliverables: [
      'Technical Stack & Repository Architecture',
      'Database Entity Relationship Diagram (ERD)',
      'Zero Data Retention Security Protocol',
      'Sprint-by-Sprint Development Schedule'
    ],
    clientInvolvement: 'Review and sign-off on technical architecture document.',
    outputArtifact: 'Signed Engineering Specification'
  },
  {
    id: 'design',
    step: '03',
    name: 'DESIGN',
    tagline: 'UX, UI & Token Design Systems',
    duration: 'Week 2',
    icon: Palette,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/50',
    overview: 'We construct exhaustive Figma design systems, mathematical layout tokens, high-contrast accessible typography, and interactive clickable prototypes.',
    keyActivities: [
      'Low-Fidelity Information Architecture & Wireframing',
      'High-Fidelity Component Library & Design Tokens',
      'Interactive Clickable Figma Prototype',
      'Micro-Interactions, Hover States & Animation Specs'
    ],
    deliverables: [
      'Complete Multi-Screen Figma File',
      'Reusable Design System Component Library',
      'Responsive Mobile, Tablet & Desktop Layouts',
      'Usability & WCAG AA Accessibility Checklist'
    ],
    clientInvolvement: '1 interactive design walkthrough & approval.',
    outputArtifact: 'Interactive Clickable Prototype'
  },
  {
    id: 'engineer',
    step: '04',
    name: 'ENGINEER',
    tagline: 'Frontend, Backend & Cloud Infrastructure',
    duration: 'Weeks 2–3',
    icon: Code2,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    overview: 'Our senior engineers write clean, modular TypeScript, performant React/Next.js components, secure microservices, and database transaction queries.',
    keyActivities: [
      'Modular TypeScript Frontend Architecture',
      'REST & GraphQL API Endpoints with Schema Validation',
      'Relational / NoSQL Database Layer & Migrations',
      'Real-Time WebSockets & Background Job Queues'
    ],
    deliverables: [
      'Production-Grade Clean Codebase (Git Repo)',
      'Staging Sandbox Environment for Client Previews',
      'Sub-Second Page Load Optimization (< 600ms)',
      'Automated CI/CD Deployment Pipelines'
    ],
    clientInvolvement: 'Weekly staging environment demo & progress check.',
    outputArtifact: 'Working Staging Application'
  },
  {
    id: 'intelligence',
    step: '05',
    name: 'INTELLIGENCE',
    tagline: 'AI Agents, Vector RAG & Autonomous Workflows',
    duration: 'Week 3',
    icon: Cpu,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/50',
    overview: 'We build domain-specific AI agents, vector embeddings for instant enterprise retrieval, automated WhatsApp pipelines, and background automation triggers.',
    keyActivities: [
      'Prompt Engineering & Structured Schema Verification',
      'Private RAG Vector Embeddings & Knowledge Graph Sync',
      'WhatsApp Business API & Customer Support Chatbots',
      'Autonomous Webhook Handlers & CRM Ledgers'
    ],
    deliverables: [
      'Custom LLM Tool & Function Calling Layer',
      'Hybrid Semantic & Keyword Search Engine',
      'Self-Healing Background Cron Automation Engine',
      'Automated Live Google Sheets Sync Hub'
    ],
    clientInvolvement: 'Sample edge-case testing & bot tone tuning.',
    outputArtifact: 'Live Intelligent Automation Core'
  },
  {
    id: 'qa',
    step: '06',
    name: 'QA & SECURITY',
    tagline: 'Rigorous Testing, Auditing & Optimization',
    duration: 'Week 4 (Days 1–2)',
    icon: ShieldCheck,
    color: 'text-teal-400',
    borderColor: 'border-teal-500/50',
    overview: 'Every feature undergoes automated end-to-end testing, responsive device matrix checks, penetration security scanning, and stress load testing.',
    keyActivities: [
      'End-to-End Cypress / Playwright Test Automation',
      'Cross-Browser & Multi-Device Responsive Testing (320px–4k)',
      'OWASP Top 10 Security & Rate Limiting Audit',
      'Lighthouse Performance & Core Web Vitals Optimization'
    ],
    deliverables: [
      'Comprehensive QA Test Matrix & Sign-Off',
      '100/100 Lighthouse Performance & SEO Scorecard',
      'Security Vulnerability & Penetration Audit Report',
      'Accessibility WCAG Compliance Certification'
    ],
    clientInvolvement: 'Final user acceptance testing (UAT) review.',
    outputArtifact: 'Signed UAT & Security Certification'
  },
  {
    id: 'launch',
    step: '07',
    name: 'LAUNCH',
    tagline: 'Zero-Downtime Deployment & Go-Live',
    duration: 'Week 4 (Days 3–4)',
    icon: Rocket,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/50',
    overview: 'We execute a zero-downtime production deployment, configure global edge CDN routing, provision SSL certificates, and submit search engine sitemaps.',
    keyActivities: [
      'Zero-Downtime DNS & SSL Certificate Provisioning',
      'Global Edge CDN Caching & Compression Setup',
      'Google Search Console & Schema JSON-LD Indexing',
      'Live Production Database Migration & Backup Check'
    ],
    deliverables: [
      'Live Production URL & App Store Releases',
      'Search Engine Sitemap Indexing Verification',
      'Production Environment Variables & Secret Vault',
      'Complete Code & Repository Ownership Handover'
    ],
    clientInvolvement: 'Official launch authorization & DNS switch confirmation.',
    outputArtifact: 'Live Scalable Production Platform'
  },
  {
    id: 'optimize',
    step: '08',
    name: 'OPTIMIZE',
    tagline: 'Continuous SLA, Observability & Scaling',
    duration: 'Ongoing / Post-Launch',
    icon: TrendingUp,
    color: 'text-green-400',
    borderColor: 'border-green-500/50',
    overview: 'We provide 24/7 uptime monitoring, error observability, daily automated cloud backups, conversion rate analytics, and iterative feature development.',
    keyActivities: [
      '24/7 Server Health, Latency & Error Observability',
      'Daily Automated Offsite Database Backups',
      'Conversion Rate Optimization (CRO) & User Heatmaps',
      'Monthly Security Patches & Framework Upgrades'
    ],
    deliverables: [
      'Monthly Infrastructure Health & Performance Reports',
      'Guaranteed < 4hr Engineering SLA Response',
      'Continuous Feature Sprint Releases',
      'Ongoing SEO & Speed Tuning'
    ],
    clientInvolvement: 'Monthly strategic roadmap & performance review call.',
    outputArtifact: 'Continuous SLA & Scale Support'
  }
];

export const Process: React.FC<ProcessProps> = ({ onNavigate }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const currentStep = FULL_PROCESS_STEPS[selectedStepIndex];
  const CurrentIcon = currentStep.icon;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden font-sans">
      {/* 1. HERO & BREADCRUMBS */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <Breadcrumbs currentPage="process" onNavigate={onNavigate} />

        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERING METHODOLOGY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            HOW WE DELIVER. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              PREDICTABLY.
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our structured 8-step delivery framework transforms complex business ideas into robust, high-performance digital systems without surprises, delays, or technical debt.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE 8-STEP TIMELINE & DEEP DIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Step Selector Horizontal Pills */}
        <div className="bg-slate-900/90 dark:bg-[#070b16] p-2 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto scrollbar-none">
          {FULL_PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = idx === selectedStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setSelectedStepIndex(idx)}
                className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 scale-102'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{step.step}</span>
                <Icon className="w-3.5 h-3.5" />
                <span>{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Breakdown Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-slate-800 p-7 sm:p-12 shadow-2xl space-y-8"
          >
            {/* Step Card Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <CurrentIcon className={`w-7 h-7 ${currentStep.color}`} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 rounded">
                      PHASE {currentStep.step} OF 08
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {currentStep.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {currentStep.name}: {currentStep.tagline}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('contact', `Inquire about Phase: ${currentStep.name}`)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
                >
                  Start with This Phase
                </button>
              </div>
            </div>

            {/* Overview */}
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {currentStep.overview}
            </p>

            {/* 3-Column Detail Grid: Activities, Deliverables, Artifact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Column 1: Activities */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Key Activities</span>
                </h3>
                <ul className="space-y-2.5">
                  {currentStep.keyActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Deliverables */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-400" />
                  <span>Deliverables</span>
                </h3>
                <ul className="space-y-2.5">
                  {currentStep.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Client Involvement & Final Artifact */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Your Involvement</span>
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStep.clientInvolvement}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                    Verified Output Artifact:
                  </span>
                  <p className="text-xs font-bold text-emerald-400 font-mono">
                    {currentStep.outputArtifact}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 3. OPERATING STANDARDS & SLA TRANSPARENCY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            OUR DELIVERY COMMITMENTS
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Every engagement at MUCO Labs is backed by strict engineering covenants and contractual safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-slate-800 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              100% IP & Code Ownership
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upon final milestone completion, you own 100% of the source code, design files, repository, and database keys. No vendor lock-in.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-slate-800 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              Milestone Escrow Billing
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Payments are tied directly to agreed milestones (Discovery, Figma Approval, Staging Demo, Production Launch). You approve each stage before release.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-slate-800 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              Sub-4h SLA Support
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Direct communication via dedicated WhatsApp & Slack channel with the engineering lead, guaranteeing swift response times and zero bureaucratic delays.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <ClosingCta onNavigate={onNavigate} />
    </div>
  );
};
