import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Cpu, 
  Cloud, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Zap,
  Layers,
  Award
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: 'cloud-ai' | 'fullstack' | 'security-data' | 'mobile-edge';
  categoryLabel: string;
  role: string;
  color: string;
  accentBg: string;
  badge: string;
  svgIcon: React.ReactNode;
}

export const TrustIndicatorsStrip: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const technologies: TechItem[] = [
    {
      id: 'gemini',
      name: 'Google Gemini',
      category: 'cloud-ai',
      categoryLabel: 'AI & Intelligence',
      role: 'LLM & Multimodal AI Core',
      color: 'text-cyan-400 group-hover:text-cyan-300',
      accentBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20 border-cyan-500/30',
      badge: 'Certified Partner Tier',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Google Gemini">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      )
    },
    {
      id: 'gcp',
      name: 'Google Cloud',
      category: 'cloud-ai',
      categoryLabel: 'Cloud Infrastructure',
      role: 'Cloud Run & Vertex AI Scaling',
      color: 'text-blue-400 group-hover:text-blue-300',
      accentBg: 'bg-blue-500/10 group-hover:bg-blue-500/20 border-blue-500/30',
      badge: 'Enterprise Ingress',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Google Cloud">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      )
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'fullstack',
      categoryLabel: 'Language Architecture',
      role: 'Strict Type-Safety & Contracts',
      color: 'text-sky-400 group-hover:text-sky-300',
      accentBg: 'bg-sky-500/10 group-hover:bg-sky-500/20 border-sky-500/30',
      badge: 'Zero Any Policy',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="TypeScript">
          <path d="M1.5 0h21l1.5 1.5v21l-1.5 1.5h-21L0 22.5v-21L1.5 0zm10.74 15.22c-.37-.21-.76-.32-1.18-.32-.61 0-1.07.19-1.39.57-.32.38-.48.91-.48 1.59 0 .66.16 1.18.49 1.55.33.37.79.56 1.38.56.45 0 .86-.11 1.23-.33v2.09c-.43.19-.94.33-1.53.43-.59.1-1.22.15-1.9.15-1.4 0-2.48-.41-3.24-1.23-.76-.82-1.14-1.95-1.14-3.39 0-1.46.39-2.62 1.17-3.48.78-.86 1.88-1.29 3.3-1.29.62 0 1.22.06 1.79.18.57.12 1.07.31 1.5.57v2.33zm10.02 4.41c-.42.71-1.03 1.25-1.83 1.62-.8.37-1.74.55-2.82.55-.99 0-1.88-.16-2.67-.47-.79-.31-1.39-.77-1.8-1.37-.41-.6-.62-1.34-.62-2.22 0-.82.19-1.51.57-2.07.38-.56.9-.99 1.56-1.29.66-.3 1.41-.49 2.25-.57l1.96-.2c.48-.05.84-.14 1.08-.27.24-.13.36-.35.36-.66 0-.39-.14-.7-.42-.93-.28-.23-.69-.34-1.23-.34-.52 0-.94.12-1.26.36-.32.24-.5.59-.54 1.05h-2.52c.07-.97.46-1.73 1.17-2.28.71-.55 1.76-.82 3.15-.82 1.39 0 2.45.29 3.18.87.73.58 1.1 1.41 1.1 2.49v6.34h-2.11v-1.06zm-2.42-3.15l-1.35.15c-.45.05-.81.16-1.08.33-.27.17-.41.43-.41.78 0 .34.12.61.36.81.24.2.58.3 1.02.3.56 0 1.01-.16 1.35-.48.34-.32.51-.76.51-1.32v-.57z" />
        </svg>
      )
    },
    {
      id: 'react',
      name: 'React 18+',
      category: 'fullstack',
      categoryLabel: 'Frontend Architecture',
      role: 'Reactive 60FPS UI Pipelines',
      color: 'text-cyan-400 group-hover:text-cyan-300',
      accentBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20 border-cyan-500/30',
      badge: 'Concurrent Engine',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="React">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'firebase',
      name: 'Firebase & Firestore',
      category: 'cloud-ai',
      categoryLabel: 'Database & Auth',
      role: 'Realtime NoSQL & Auth Bridge',
      color: 'text-amber-400 group-hover:text-amber-300',
      accentBg: 'bg-amber-500/10 group-hover:bg-amber-500/20 border-amber-500/30',
      badge: '99.99% Availability',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Firebase">
          <path d="M3.89 15.67L6.2 1.34c.08-.5.7-.72 1.05-.37l3.87 3.87L3.89 15.67zm16.22 0l-2.07-12.8c-.08-.49-.69-.7-1.04-.36l-8.12 8.12 11.23 5.04zM12.92 9.47l-2.61-5.18c-.24-.48-.93-.48-1.17 0L2.1 18.52l9.92 5.56c.61.34 1.35.34 1.96 0l7.92-4.44L12.92 9.47z" />
        </svg>
      )
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL / SQL',
      category: 'security-data',
      categoryLabel: 'Relational DB',
      role: 'ACID Transactions & High Scale',
      color: 'text-indigo-400 group-hover:text-indigo-300',
      accentBg: 'bg-indigo-500/10 group-hover:bg-indigo-500/20 border-indigo-500/30',
      badge: 'Zero Data Loss',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="PostgreSQL">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V19h-2v-.07c-3.39-.49-6-3.4-6-6.93 0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.53-2.61 6.44-6 6.93z" />
        </svg>
      )
    },
    {
      id: 'docker',
      name: 'Docker Containers',
      category: 'security-data',
      categoryLabel: 'Containerization',
      role: 'Isolated Microservices & Cold Starts',
      color: 'text-blue-400 group-hover:text-blue-300',
      accentBg: 'bg-blue-500/10 group-hover:bg-blue-500/20 border-blue-500/30',
      badge: 'OCI Compliant',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Docker">
          <path d="M13.98 11.08h2.15v2.15h-2.15v-2.15zm-2.83 0h2.15v2.15h-2.15v-2.15zm-2.84 0h2.15v2.15H8.31v-2.15zm-2.84 0h2.15v2.15H5.47v-2.15zm11.34-2.84h2.15v2.15h-2.15V8.24zm-2.83 0h2.15v2.15h-2.15V8.24zm-2.84 0h2.15v2.15h-2.15V8.24zm-2.84 0h2.15v2.15H8.31V8.24zm8.51-2.84h2.15v2.15h-2.15V5.4zM23.95 13c-.32-1.39-1.44-1.92-2.48-1.92-.12 0-.25.01-.37.03-.4-1.4-1.63-2.31-3.08-2.31h-.35V8.24h-3.41V5.4h-3.41v2.84H7.43v2.84H4.02C2.15 11.08.5 12.5.06 14.38c-.46 2 .46 4.14 2.29 5.33 1.83 1.19 4.23 1.49 6.35.8 4.21-.29 8.16-2.58 10.74-5.91 1.77.16 3.44-.45 4.51-1.6z" />
        </svg>
      )
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'fullstack',
      categoryLabel: 'Design System',
      role: 'Mathematical UI Utility Engine',
      color: 'text-teal-400 group-hover:text-teal-300',
      accentBg: 'bg-teal-500/10 group-hover:bg-teal-500/20 border-teal-500/30',
      badge: 'Zero Runtime CSS',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Tailwind CSS">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      )
    },
    {
      id: 'android',
      name: 'Android / Kotlin',
      category: 'mobile-edge',
      categoryLabel: 'Mobile Systems',
      role: 'Native Android & Play Store Packaging',
      color: 'text-emerald-400 group-hover:text-emerald-300',
      accentBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20 border-emerald-500/30',
      badge: 'Material 3 Ready',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Android">
          <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM9 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      )
    },
    {
      id: 'cloudflare',
      name: 'Cloudflare / Edge',
      category: 'mobile-edge',
      categoryLabel: 'Security & CDN',
      role: 'Global Edge Caching & DDoS Defense',
      color: 'text-orange-400 group-hover:text-orange-300',
      accentBg: 'bg-orange-500/10 group-hover:bg-orange-500/20 border-orange-500/30',
      badge: 'Under 10ms CDN',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Cloudflare">
          <path d="M19.41 12.58c-.12-.04-.26-.06-.39-.06-.3 0-.58.11-.8.3-.23.2-.38.48-.41.79-.17 1.34-.84 2.5-1.85 3.23-.97.71-2.17 1.05-3.37.97-.24-.02-.49-.06-.72-.14-.28-.09-.58-.08-.85.03-.27.11-.49.32-.61.59-.22.51.01 1.1.52 1.32.44.18.91.27 1.38.3.36.03.73.04 1.09.04 1.95 0 3.84-.66 5.37-1.87 1.57-1.24 2.58-3.05 2.82-5.04.06-.55-.33-1.05-.88-1.12-.04-.01-.07-.01-.11-.04zm-14.82 2.6c.15-.3.17-.65.06-.96-.11-.32-.34-.57-.65-.69-1.2-.49-2.03-1.58-2.17-2.87-.16-1.46.54-2.88 1.77-3.61 1.19-.71 2.63-.73 3.84-.06.27.15.58.19.88.11.3-.08.56-.27.72-.53 1.08-1.78 2.97-2.87 5.06-2.9 2.14-.03 4.1 1.05 5.17 2.86.27.46.85.64 1.33.4 1.37-.67 2.99-.54 4.23.34.46.33 1.1.22 1.43-.24.33-.46.22-1.1-.24-1.43-1.78-1.26-4.1-1.45-6.07-.49C17.65 2.89 15.02 1.6 12.22 1.63c-2.73.04-5.21 1.46-6.63 3.79-1.67-.84-3.66-.78-5.28.18-1.72 1.02-2.7 2.99-2.48 5.02.2 1.8 1.36 3.32 3.03 4.01.12.05.25.08.38.08.43 0 .83-.24.99-.65z" />
        </svg>
      )
    },
    {
      id: 'security-standard',
      name: 'Zero-Trust Security',
      category: 'security-data',
      categoryLabel: 'Security Posture',
      role: 'AES-256 Payload Encryption & RBAC',
      color: 'text-rose-400 group-hover:text-rose-300',
      accentBg: 'bg-rose-500/10 group-hover:bg-rose-500/20 border-rose-500/30',
      badge: 'Hardened Rules',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="Security Standard">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      )
    },
    {
      id: 'iso-standard',
      name: 'SOC-2 / ISO Aligned',
      category: 'security-data',
      categoryLabel: 'Enterprise Standards',
      role: 'Deterministic Audit Trails & SLAs',
      color: 'text-emerald-400 group-hover:text-emerald-300',
      accentBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20 border-emerald-500/30',
      badge: 'Audit Verified',
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-label="ISO Compliance">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      )
    }
  ];

  const filteredTechnologies = activeCategory === 'all'
    ? technologies
    : technologies.filter(t => t.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Tech & Certifications' },
    { id: 'cloud-ai', label: 'Cloud & AI' },
    { id: 'fullstack', label: 'Full-Stack Architecture' },
    { id: 'security-data', label: 'Security & Databases' },
    { id: 'mobile-edge', label: 'Mobile & Edge' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Strip Container with Refined Glassmorphism & High-Contrast Light/Dark Theming */}
      <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-slate-900/90 dark:bg-[#070c18]/95 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6 relative overflow-hidden">
        
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Header Strip: Title, Active Filter Chips & Live Telemetry Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">
                MUCO Labs Verified Technology Matrix
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Hardened engineering foundations, verified enterprise cloud standards, and production-tested AI frameworks.
            </p>
          </div>

          {/* Quick Filter Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-sm'
                    : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOGO GRID WITH GRAYSCALE-TO-COLOR HOVER EFFECT */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredTechnologies.map((tech) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl hover:shadow-cyan-500/5"
            >
              {/* Top Row: SVG Logo (Grayscale to Color on Hover) & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div 
                  className={`p-2 rounded-xl border border-slate-800 transition-all duration-300 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 ${tech.accentBg} ${tech.color}`}
                >
                  {tech.svgIcon}
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-amber-400 transition-colors uppercase tracking-wider">
                  {tech.badge}
                </span>
              </div>

              {/* Bottom Row: Name & Role */}
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-black text-slate-300 group-hover:text-white transition-colors">
                  {tech.name}
                </h4>
                <p className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-1">
                  {tech.role}
                </p>
              </div>

              {/* Subtle Corner Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ring-1 ring-inset ring-cyan-500/30" />
            </motion.div>
          ))}
        </div>

        {/* Live Hover Inspection Details Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-slate-300">
              {hoveredTech ? (
                <>
                  <strong className="text-white font-black">{hoveredTech.name}</strong> • {hoveredTech.role} ({hoveredTech.categoryLabel})
                </>
              ) : (
                'Hover any framework or standard to inspect MUCO Labs architectural role'
              )}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>AES-256 Bit Security</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Edge-Cached APIs</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
