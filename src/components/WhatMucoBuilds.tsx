import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';

interface WhatMucoBuildsProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

interface CapabilityItem {
  id: string;
  number: string;
  discipline: string;
  title: string;
  tagline: string;
  description: string;
  keyPillars: string[];
  targetPage: PageId;
  ctaText: string;
  icon: React.ElementType;
  badge: string;
}

const CORE_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'build',
    number: '01',
    discipline: 'BUILD',
    title: 'Digital Products & Software',
    tagline: 'Websites, Web Apps, Mobile & Custom SaaS',
    description: 'We engineer high-performance web applications, iOS/Android mobile apps, and multi-tenant SaaS platforms built for sub-second response times, rock-solid security, and seamless usability.',
    keyPillars: [
      'High-Converting Brand Websites & Next.js Platforms',
      'Cross-Platform iOS & Android Mobile Apps',
      'Multi-Tenant SaaS & Custom Enterprise Software',
      'API Microservices & Secure Cloud Database Architecture'
    ],
    targetPage: 'portfolio',
    ctaText: 'Explore Built Systems',
    icon: Code2,
    badge: 'Core Engine'
  },
  {
    id: 'automate',
    number: '02',
    discipline: 'AUTOMATE',
    title: 'AI Systems & Workflows',
    tagline: 'Autonomous Agents, RAG & Business Automation',
    description: 'We eliminate repetitive operational overhead by deploying custom Gemini AI agents, hybrid RAG knowledge graphs, 24/7 WhatsApp customer bots, and background webhook integrations.',
    keyPillars: [
      'Multi-Agent Swarms & Autonomous Routing Engines',
      'Hybrid RAG Vector Memory & Private Enterprise Data',
      'Automated WhatsApp Conversational AI Bots',
      'ERP, CRM & Google Sheets Real-Time Sync'
    ],
    targetPage: 'systems',
    ctaText: 'Explore AI Automation',
    icon: Cpu,
    badge: 'AI-Native'
  },
  {
    id: 'grow',
    number: '03',
    discipline: 'GROW',
    title: 'Growth Systems & Infrastructure',
    tagline: 'SEO, Conversion Optimization & 24/7 SLAs',
    description: 'We build the digital infrastructure that drives commercial growth: technical search engine indexing, performance marketing engines, speed optimization, and high-availability maintenance.',
    keyPillars: [
      'Technical SEO & Programmatic Search Dominance',
      'High-Conversion Funnel & Analytics Tracking',
      'Cloud DevOps, CI/CD & Zero-Downtime Releases',
      '24/7 Proactive Server Monitoring & Guaranteed SLAs'
    ],
    targetPage: 'services',
    ctaText: 'Explore Growth Systems',
    icon: TrendingUp,
    badge: 'Scale & SLAs'
  }
];

export const WhatMucoBuilds: React.FC<WhatMucoBuildsProps> = ({ onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 font-mono font-bold text-xs uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            BUILD. AUTOMATE. GROW.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We focus our engineering capabilities into three distinct, interconnected pillars. Every project is conceived and deployed as an integrated digital system.
          </p>
        </div>

        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-500 font-bold text-xs sm:text-sm tracking-wide group transition-colors self-start md:self-auto cursor-pointer"
        >
          <span>View All Services</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Core Capability Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CORE_CAPABILITIES.map((cat, idx) => {
          const Icon = cat.icon;
          const isHovered = hoveredId === cat.id;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative rounded-3xl bg-white dark:bg-[#0e131f] border border-slate-200/80 dark:border-white/10 p-8 sm:p-9 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:border-orange-500/30 flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-white bg-slate-950 dark:bg-white/10 px-2.5 py-1 rounded-lg">
                      {cat.number}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                      {cat.discipline}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 group-hover:text-orange-500 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400/90 mt-1">
                    {cat.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cat.description}
                </p>

                {/* Key Pillars Checklist */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2.5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    Core Capabilities
                  </span>
                  <ul className="space-y-2">
                    {cat.keyPillars.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-8 mt-6 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => onNavigate(cat.targetPage)}
                  className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-900 dark:bg-white/5 dark:hover:bg-orange-600 text-slate-900 hover:text-white dark:text-slate-200 dark:hover:text-white font-bold text-xs transition-all cursor-pointer group/btn"
                >
                  <span>{cat.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-orange-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
