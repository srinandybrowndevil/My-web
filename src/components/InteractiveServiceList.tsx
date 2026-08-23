import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Globe, 
  Smartphone, 
  Palette, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  Terminal,
  Zap
} from 'lucide-react';
import { PageId } from '../types';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  icon: React.ElementType;
  accentColor: string;
  pricingStarting: string;
  outcomeMetric: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-dev',
    number: '01',
    title: 'AI DEVELOPMENT',
    category: 'CUSTOM LLMS & NEURAL SYSTEMS',
    tagline: 'Proprietary intelligence models built specifically for your domain.',
    description: 'We train, fine-tune, and deploy custom LLM pipelines, semantic RAG vector architectures, and multi-modal neural engines directly into your private enterprise infrastructure.',
    capabilities: ['Private LLM Fine-Tuning', 'Enterprise RAG Vector Stores', 'Document & Vision Intelligence', 'Low-Latency Inference APIs'],
    technologies: ['Gemini 2.5', 'LangChain', 'Pinecone', 'PyTorch', 'Python', 'FastAPI'],
    icon: Bot,
    accentColor: '#06b6d4',
    pricingStarting: '₹24,999',
    outcomeMetric: '99.4% Extraction Precision'
  },
  {
    id: 'ai-auto',
    number: '02',
    title: 'AI AUTOMATION',
    category: 'AUTONOMOUS WORKFLOWS & AGENTS',
    tagline: 'Turn manual operational bottlenecks into autonomous background systems.',
    description: 'Self-governing agent networks that handle lead qualification, automated WhatsApp support, CRM syncing, invoice parsing, and multi-system orchestrations around the clock.',
    capabilities: ['Autonomous Agent Swarms', 'Official WhatsApp AI Bots', 'Automated CRM Pipeline Sync', 'Self-Healing Event Handlers'],
    technologies: ['Make.com', 'n8n', 'OpenAI Functions', 'WhatsApp Cloud API', 'Webhooks'],
    icon: Cpu,
    accentColor: '#3b82f6',
    pricingStarting: '₹49,999',
    outcomeMetric: '70% Reduction in Manual Ops'
  },
  {
    id: 'web-dev',
    number: '03',
    title: 'WEBSITE DEVELOPMENT',
    category: 'HIGH-SPEED ENTERPRISE PLATFORMS',
    tagline: 'Sub-second web applications engineered for massive conversion.',
    description: 'Next.js and React web platforms built with immaculate design discipline, dynamic SEO schema domination, edge caching, and rock-solid payment & database integrations.',
    capabilities: ['Sub-Second Next.js Platforms', 'Technical SEO Schema Architecture', 'Headless CMS & Commerce', 'Edge Compute & Serverless'],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
    icon: Globe,
    accentColor: '#10b981',
    pricingStarting: '₹14,999',
    outcomeMetric: '<400ms First Contentful Paint'
  },
  {
    id: 'app-dev',
    number: '04',
    title: 'APP DEVELOPMENT',
    category: 'NATIVE IOS & ANDROID APPS',
    tagline: 'Fluid cross-platform mobile apps published with store approval guaranteed.',
    description: 'High-performance mobile products utilizing React Native and Flutter with real-time cloud data synchronization, offline SQLite persistence, and push notification engines.',
    capabilities: ['iOS & Android Native Apps', 'Offline-First SQLite Cache', 'Biometric Auth & Deep Linking', 'Store Release Management'],
    technologies: ['Flutter', 'React Native', 'Firebase', 'GraphQL', 'Swift', 'Kotlin'],
    icon: Smartphone,
    accentColor: '#8b5cf6',
    pricingStarting: '₹49,999',
    outcomeMetric: '60 FPS Native Performance'
  },
  {
    id: 'ui-ux',
    number: '05',
    title: 'UI / UX DESIGN',
    category: 'PRODUCT SYSTEMS & INTERACTION DESIGN',
    tagline: 'Editorial aesthetics paired with mathematical usability discipline.',
    description: 'We construct exhaustive Figma design systems, micro-interaction motion guidelines, and conversion-engineered product interfaces tested against real user mental models.',
    capabilities: ['Design System Architecture', 'Interactive Motion Prototypes', 'Conversion Funnel Audit', 'Accessibility & Token Systems'],
    technologies: ['Figma', 'Framer Motion', 'Tailwind Tokens', 'Storybook'],
    icon: Palette,
    accentColor: '#f59e0b',
    pricingStarting: '₹19,999',
    outcomeMetric: '3.4x Conversion Increase'
  },
  {
    id: 'digital-trans',
    number: '06',
    title: 'DIGITAL TRANSFORMATION',
    category: 'LEGACY MODERNIZATION & CLOUD ERP',
    tagline: 'Modernize traditional business operations into scalable digital engines.',
    description: 'End-to-end modernization of legacy paper spreadsheets, manufacturing workflows, and standalone databases into unified, role-based cloud ERP portals.',
    capabilities: ['Custom Manufacturing ERP', 'Multi-Tenant Cloud Portals', 'Automated Google Sheets Hubs', 'Enterprise Security & RBAC'],
    technologies: ['Cloud SQL', 'Firebase Auth', 'Docker', 'Google Cloud Platform', 'REST APIs'],
    icon: Workflow,
    accentColor: '#ec4899',
    pricingStarting: '₹79,999',
    outcomeMetric: '100% Paperless Automation'
  }
];

interface InteractiveServiceListProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

export const InteractiveServiceList: React.FC<InteractiveServiceListProps> = ({ onNavigate }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_DATA[0].id);

  const activeService = SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-cyan-500" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-500 uppercase">
              CAPABILITIES & SERVICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered For Scale.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Explore our six core engineering disciplines. Hover over any domain to inspect technical capabilities, pricing, and outcomes.
        </p>
      </div>

      {/* Interactive Service Roster & Dynamic Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {SERVICES_DATA.map((srv) => {
            const isHovered = activeServiceId === srv.id;
            const Icon = srv.icon;

            return (
              <div
                key={srv.id}
                onMouseEnter={() => setActiveServiceId(srv.id)}
                onClick={() => onNavigate('contact', `Inquiry about ${srv.title} (${srv.category})`)}
                className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'bg-slate-900/90 dark:bg-[#090e1c] border-cyan-500/50 shadow-xl shadow-cyan-500/10 scale-[1.01]'
                    : 'bg-white/40 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Number */}
                    <span className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                      isHovered ? 'text-cyan-400' : 'text-slate-400 dark:text-slate-600'
                    }`}>
                      {srv.number}
                    </span>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className={`text-lg sm:text-xl font-black tracking-tight transition-colors ${
                        isHovered ? 'text-white' : 'text-slate-900 dark:text-slate-200'
                      }`}>
                        {srv.title}
                      </h3>
                      <p className={`text-xs font-mono tracking-wider transition-colors ${
                        isHovered ? 'text-cyan-300' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {srv.category}
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow & Starting Price */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:block text-xs font-mono text-slate-400">
                      From {srv.pricingStarting}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isHovered ? 'bg-cyan-500 text-slate-950 translate-x-1' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Mobile Expanded Preview if active */}
                <div className="block lg:hidden mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-300 space-y-2">
                  <p>{srv.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {srv.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Sticky Technical Preview Inspector (5 cols) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-slate-950/95 dark:bg-[#070b16] border border-cyan-500/40 shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-6"
            >
              {/* Top Inspector Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-cyan-300 font-bold uppercase text-[11px]">
                    INSPECTOR // {activeService.number}
                  </span>
                </div>
                <span className="font-mono text-emerald-400 text-[11px] font-bold">
                  {activeService.outcomeMetric}
                </span>
              </div>

              {/* Service Icon & Title */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                  <ActiveIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{activeService.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{activeService.tagline}</p>
                </div>
              </div>

              {/* Deep Narrative Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {activeService.description}
              </p>

              {/* Technical Capabilities Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Capabilities
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {activeService.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Tech Stack Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Production Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeService.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-900 border border-slate-800 text-cyan-300 font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Starting at</span>
                  <span className="text-lg font-black text-white font-mono">{activeService.pricingStarting}</span>
                </div>

                <button
                  onClick={() => onNavigate('contact', `Let's discuss ${activeService.title}`)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transform hover:-translate-y-0.5 transition-all"
                >
                  <span>Build This System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
