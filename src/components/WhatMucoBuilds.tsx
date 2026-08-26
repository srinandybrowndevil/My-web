import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Smartphone, 
  Database, 
  Layout, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Code2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';

interface WhatMucoBuildsProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

interface CategoryItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  targetPage: PageId;
  ctaText: string;
  icon: React.ElementType;
  accentGradient: string;
  borderHover: string;
  badge: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'ai-systems',
    number: '01',
    title: 'AI SYSTEMS',
    tagline: 'Autonomous Agents & Intelligent Workflows',
    description: 'Autonomous AI agents, domain-specific RAG vector knowledge graphs, WhatsApp conversational bots, and background decision engines that run 24/7.',
    capabilities: [
      'Multi-Agent Swarms & Autonomous Routing',
      'Hybrid RAG Vector Memory & Private Knowledge',
      'Automated WhatsApp & Customer Support Bots',
      'Sub-100ms LLM Function Calling Pipelines'
    ],
    targetPage: 'systems',
    ctaText: 'Explore AI Systems',
    icon: Bot,
    accentGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderHover: 'hover:border-cyan-500/60',
    badge: 'Core Focus'
  },
  {
    id: 'digital-products',
    number: '02',
    title: 'DIGITAL PRODUCTS',
    tagline: 'Websites, Web Apps, Mobile & SaaS',
    description: 'High-performance Next.js web applications, React Native & Flutter mobile apps, and multi-tenant cloud SaaS platforms built for sub-second page loads.',
    capabilities: [
      'Modern High-Converting Brand Websites',
      'Progressive Web Apps & Multi-Tenant SaaS',
      'iOS & Android Cross-Platform Mobile Apps',
      'App Store & Play Store Production Publishing'
    ],
    targetPage: 'portfolio',
    ctaText: 'View Selected Work',
    icon: Smartphone,
    accentGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    borderHover: 'hover:border-blue-500/60',
    badge: 'Full-Stack'
  },
  {
    id: 'business-systems',
    number: '03',
    title: 'BUSINESS SYSTEMS',
    tagline: 'CRM, ERP, Internal Tools & APIs',
    description: 'Custom internal dashboards, automated inventory ledgers, Google Sheets cloud synchronization, and REST/GraphQL APIs that eliminate repetitive manual work.',
    capabilities: [
      'Custom ERP & Inventory Management Systems',
      'Automated Lead Routing & CRM Pipelines',
      'Google Sheets & Cloud Database Live Sync',
      'Secure REST / GraphQL Microservice APIs'
    ],
    targetPage: 'services',
    ctaText: 'Explore Business Systems',
    icon: Database,
    accentGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderHover: 'hover:border-emerald-500/60',
    badge: 'Automation'
  },
  {
    id: 'digital-experience',
    number: '04',
    title: 'DIGITAL EXPERIENCE',
    tagline: 'Product Design, UI/UX & Design Systems',
    description: 'Meticulous design systems, conversion-engineered interfaces, tokenized design systems, and responsive micro-interactions that elevate brand trust.',
    capabilities: [
      'Figma Design Systems & Mathematical Tokens',
      'High-Conversion UI/UX Wireframing & Usability',
      'Interactive Micro-Interactions & Physics Motion',
      'Multi-Device Responsive Precision'
    ],
    targetPage: 'services',
    ctaText: 'Explore Experience Design',
    icon: Layout,
    accentGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderHover: 'hover:border-amber-500/60',
    badge: 'UI / UX'
  }
];

export const WhatMucoBuilds: React.FC<WhatMucoBuildsProps> = ({ onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>DISCIPLINES & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            WHAT WE BUILD
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We focus our engineering capabilities into four foundational disciplines. Every project is built as a complete, integrated system rather than isolated pieces.
          </p>
        </div>

        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-bold text-xs sm:text-sm tracking-wide group transition-colors self-start md:self-auto cursor-pointer"
        >
          <span>View Complete Service Catalogue</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 Major Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {CATEGORIES.map((cat, idx) => {
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
              className={`group relative rounded-3xl bg-white dark:bg-[#070b16] border border-slate-200/80 dark:border-slate-800 p-7 sm:p-9 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden flex flex-col justify-between ${cat.borderHover}`}
            >
              {/* Card Ambient Glow */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${cat.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Card Header */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-cyan-400 bg-slate-900 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                      {cat.number}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/50">
                      {cat.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-cyan-500 dark:text-cyan-400 text-xs sm:text-sm font-semibold mt-1">
                    {cat.tagline}
                  </p>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {cat.description}
                </p>

                {/* Capabilities List */}
                <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800/60">
                  {cat.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer CTA Button */}
              <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(cat.targetPage)}
                  className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>{cat.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#38bdf8] transition-all" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
