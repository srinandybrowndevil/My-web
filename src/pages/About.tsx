import React from 'react';
import { PageId } from '../types';
import {
  Building2,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Code2,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  Award
} from 'lucide-react';

interface AboutProps {
  onNavigate: (page: PageId) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="relative pt-12 pb-16 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs mb-4">
          <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>About MUCO Labs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Your Vision. Our Technology.
        </h1>
        <p className="text-sm sm:text-base text-slate-900 dark:text-slate-200 mt-4 leading-relaxed font-medium">
          MUCO Labs is a forward-thinking software engineering and digital agency founded in 2026 in Erode, Tamil Nadu. We specialize in building enterprise-grade web applications, cross-platform mobile apps, custom SaaS architectures, AI automations, and ROI-driven digital marketing.
        </p>
      </section>

      {/* Quick Facts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              title: 'Founder & MD',
              value: 'Srinivash Mahalingam',
              sub: 'Direct Leadership & Tech Guidance'
            },
            {
              icon: <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              title: 'Founded',
              value: '2026',
              sub: 'Next-Generation Tech Agency'
            },
            {
              icon: <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              title: 'Headquarters',
              value: 'Erode, Tamil Nadu',
              sub: 'Serving Global Clients'
            },
            {
              icon: <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              title: 'Official Portal',
              value: 'mucolabs.in',
              sub: 'Phone: +91 6381809844'
            }
          ].map((fact, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900/40">
                {fact.icon}
              </div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-400">{fact.title}</p>
              <h3 className="text-lg font-black text-slate-950 dark:text-white mt-0.5">{fact.value}</h3>
              <p className="text-xs text-slate-900 dark:text-slate-300 mt-1 font-medium">{fact.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder's Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">
              Founder Statement
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Driven By Engineering Craft & Transparent Value
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "When I established MUCO Labs in 2026 in Erode, Tamil Nadu, the core goal was clear: bridge the gap between ambitious business visions and production-grade software execution. Too many businesses suffer from vague estimates, delayed delivery, and opaque codebases. At MUCO Labs, every project has upfront pricing, strict SLA commitments, and clean, high-performance code."
            </p>
            <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
              <div>
                <p className="font-extrabold text-white text-base">Srinivash Mahalingam</p>
                <p className="text-xs text-blue-400 font-medium">Founder & Managing Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
            Our Guiding Philosophy
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            How We Execute Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '1. Upfront & Transparent Pricing',
              desc: 'No hidden surprise fees. We publish exact prices for Website, Mobile App, Software, SaaS, AI, Marketing, and Maintenance plans.'
            },
            {
              title: '2. Modern Production Tech',
              desc: 'We build with React 19, Next.js 15, TypeScript, Tailwind CSS, Express, Python, Docker, and Gemini AI for maximum security and longevity.'
            },
            {
              title: '3. Complete IP & Code Ownership',
              desc: 'Upon completion, 100% of the repository, source code, database access, and design assets belong to your organization.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-blue-50 dark:bg-slate-900/80 p-8 sm:p-12 rounded-3xl border border-blue-200/80 dark:border-slate-800 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Let's Bring Your Vision To Life
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Get in touch with founder Srinivash Mahalingam and the MUCO Labs team in Erode, Tamil Nadu.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all"
            >
              Contact MUCO Labs
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 font-bold text-xs py-3 px-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-all"
            >
              Explore Pricing Cards
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
