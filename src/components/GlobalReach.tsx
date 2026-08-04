import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { 
  Globe, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Users, 
  Zap, 
  Award,
  ShieldCheck,
  Server
} from 'lucide-react';

interface GlobalReachProps {
  onNavigate?: (page: PageId) => void;
}

interface LocationMarker {
  id: string;
  name: string;
  region: string;
  type: string;
  x: number; // percentage coordinate on SVG map (0 - 100)
  y: number; // percentage coordinate on SVG map (0 - 100)
  projectsCount: number;
  highlight: string;
  services: string[];
}

export const GlobalReach: React.FC<GlobalReachProps> = ({ onNavigate }) => {
  const [activeMarkerId, setActiveMarkerId] = useState<string>('hq-india');

  const locations: LocationMarker[] = [
    {
      id: 'hq-india',
      name: 'Erode, Tamil Nadu (India)',
      region: 'Asia Pacific HQ',
      type: 'Global HQ & R&D Hub',
      x: 68,
      y: 48,
      projectsCount: 35,
      highlight: 'Central R&D HQ managing all web, mobile app, and AI system engineering.',
      services: ['Full-Stack SaaS', 'Mobile Apps (iOS/Android)', 'Gemini AI Engines', 'AutoCAD Engineering']
    },
    {
      id: 'uae-dubai',
      name: 'Dubai (UAE)',
      region: 'Middle East & North Africa',
      type: 'Enterprise Regional Hub',
      x: 61,
      y: 42,
      projectsCount: 8,
      highlight: 'E-commerce web portals, luxury real estate platforms, and WhatsApp automation.',
      services: ['E-Commerce Websites', 'WhatsApp Business APIs', 'Real Estate Portals']
    },
    {
      id: 'singapore',
      name: 'Singapore',
      region: 'Southeast Asia',
      type: 'Fintech & AI Solutions',
      x: 77,
      y: 54,
      projectsCount: 6,
      highlight: 'AI chatbots, automated CRM pipelines, and cross-border payment integration.',
      services: ['AI Chatbot Assistants', 'CRM Development', 'Razorpay & Stripe Integration']
    },
    {
      id: 'uk-london',
      name: 'London (United Kingdom)',
      region: 'Europe',
      type: 'Corporate SaaS & ERP',
      x: 48,
      y: 28,
      projectsCount: 7,
      highlight: 'Custom ERP systems, cloud migration audits, and healthcare management portals.',
      services: ['ERP Systems', 'Technology Consulting', 'Security & SLA Retainers']
    },
    {
      id: 'usa-ny',
      name: 'New York (United States)',
      region: 'North America',
      type: 'Tech & Cloud Expansion',
      x: 28,
      y: 32,
      projectsCount: 12,
      highlight: 'Cross-platform mobile apps, high-throughput web apps, and custom AI agents.',
      services: ['React/Node Web Apps', 'iOS & Android Native Apps', 'AI Business Agents']
    },
    {
      id: 'aus-sydney',
      name: 'Sydney (Australia)',
      region: 'Oceania',
      type: 'CAD & Architectural Hub',
      x: 88,
      y: 74,
      projectsCount: 5,
      highlight: 'Architectural 2D/3D AutoCAD drafting, structural plans, and mechanical drawings.',
      services: ['AutoCAD 2D/3D Plans', 'Building Elevation', 'Structural CAD Drafting']
    }
  ];

  const activeLocation = locations.find((loc) => loc.id === activeMarkerId) || locations[0];

  return (
    <section id="global-reach" className="py-10 space-y-10">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 font-extrabold text-xs">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>International Footprint & Client Deliveries</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Global Reach, <span className="gold-text-gradient">Local Excellence</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          From our headquarters in Erode, Tamil Nadu, MUCO Labs delivers enterprise software engineering, mobile apps, AI automation, and AutoCAD drafting to clients worldwide.
        </p>
      </div>

      {/* Main Map Visual & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Vector Map Container */}
        <div className="lg:col-span-8 glass-luxury rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl relative overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Map Top Bar */}
          <div className="flex items-center justify-between gap-4 z-10 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Live Global Client Deployment Map
              </span>
            </div>

            <span className="text-[11px] font-bold text-slate-400 hidden sm:inline-block">
              Click markers to view location specs
            </span>
          </div>

          {/* SVG Stylized World Map Grid Stage */}
          <div className="relative w-full h-[280px] sm:h-[320px] my-auto flex items-center justify-center">
            {/* Background SVG Grid World Outline */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full opacity-35 text-amber-500/30 select-none pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              {/* World Map Continent Outlines (Stylized) */}
              {/* North America */}
              <path d="M150,120 Q200,90 280,100 T360,180 T260,260 T140,200 Z" fill="rgba(245,158,11,0.03)" strokeDasharray="3 3" />
              {/* South America */}
              <path d="M290,280 Q340,300 320,420 T260,450 T240,340 Z" fill="rgba(245,158,11,0.03)" strokeDasharray="3 3" />
              {/* Europe */}
              <path d="M460,100 Q520,80 560,120 T520,190 T450,160 Z" fill="rgba(245,158,11,0.03)" strokeDasharray="3 3" />
              {/* Africa */}
              <path d="M470,200 Q550,210 570,320 T500,400 T440,270 Z" fill="rgba(245,158,11,0.03)" strokeDasharray="3 3" />
              {/* Asia */}
              <path d="M570,90 Q720,70 820,140 T780,270 T620,220 Z" fill="rgba(245,158,11,0.03)" strokeDasharray="3 3" />
              {/* Australia */}
              <path d="M780,340 Q860,330 880,420 T800,440 T760,380 Z" fill="rgba(245,158,11,0.03)" strokeDasharray="3 3" />

              {/* Grid Lines */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
            </svg>

            {/* Interactive Pulse Markers */}
            {locations.map((loc) => {
              const isActive = activeMarkerId === loc.id;
              const isHq = loc.id === 'hq-india';

              return (
                <div
                  key={loc.id}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onClick={() => setActiveMarkerId(loc.id)}
                >
                  {/* Outer Pulsing Aura Ring */}
                  <motion.div
                    className={`absolute -inset-3 rounded-full ${
                      isHq
                        ? 'bg-amber-400/40'
                        : isActive
                        ? 'bg-blue-400/40'
                        : 'bg-indigo-500/20 group-hover:bg-amber-400/30'
                    }`}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0.1, 0.7] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Marker Pin */}
                  <div
                    className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-600 border-white text-slate-950 shadow-lg shadow-amber-500/40 scale-110'
                        : isHq
                        ? 'bg-amber-500 border-amber-300 text-slate-950 font-black'
                        : 'bg-slate-900 border-slate-700 text-amber-400 hover:border-amber-400'
                    }`}
                  >
                    {isHq ? (
                      <Sparkles className="w-3.5 h-3.5" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Tooltip Label */}
                  <span
                    className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black px-2.5 py-0.5 rounded-full border transition-all pointer-events-none ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    {loc.name.split(' (')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Map Footer Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 z-10 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                Engineering HQ
              </span>
              <span className="flex items-center gap-1.5 font-bold text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                Global Deployments
              </span>
            </div>

            <span className="font-semibold text-slate-400">
              100% Upfront Transparent Pricing • Zero Hidden Fees
            </span>
          </div>
        </div>

        {/* Selected Location Detail Card */}
        <div className="lg:col-span-4 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 border border-amber-500/30 shadow-2xl space-y-5"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  {activeLocation.region}
                </span>
                <h3 className="text-xl font-black text-white flex items-center justify-between">
                  <span>{activeLocation.name}</span>
                  <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-full font-bold">
                    {activeLocation.projectsCount}+ Projects
                  </span>
                </h3>
                <p className="text-xs font-bold text-slate-400">
                  {activeLocation.type}
                </p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                  Regional Focus & Case Study
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  "{activeLocation.highlight}"
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 block">
                  Delivered Solutions:
                </span>
                <div className="space-y-1.5">
                  {activeLocation.services.map((serv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{serv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {onNavigate && (
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Start Project from {activeLocation.name.split(' (')[0]}</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Global Stats Mini-Grid */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-0.5">
              <span className="text-xl font-black gold-text-gradient block">6+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Countries Served</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-0.5">
              <span className="text-xl font-black text-emerald-400 block">24/7</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">SLA Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
