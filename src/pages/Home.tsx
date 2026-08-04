import React from 'react';
import { PageId } from '../types';
import { CORE_SERVICES, TECH_STACK } from '../data/servicesData';
import { FOUNDER_INFO } from '../data/galleryData';
import { DynamicIcon } from '../components/DynamicIcon';
import { EstimateCalculator } from '../components/EstimateCalculator';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2,
  Cpu,
  Bot,
  TrendingUp,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section - Bento Grid Showcase */}
      <section className="relative pt-6 pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Main Bento Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Primary Bento Item */}
            <div className="lg:col-span-5 bg-white/80 dark:bg-slate-900/60 glass-light dark:glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200/80 dark:border-white/10 shadow-xl bento-card">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Established 2026
                  </span>
                  <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> MUCO Labs
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Your Vision.<br />
                  <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text dark:text-transparent">
                    Our Technology.
                  </span>
                </h1>

                <p className="text-slate-900 dark:text-slate-200 text-xs sm:text-sm mt-4 leading-relaxed font-medium">
                  Premium software engineering, custom mobile apps, enterprise AI solutions, and digital transformation. Founded by Srinivash Mahalingam in Erode, Tamil Nadu.
                </p>

                <div className="pt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all"
                  >
                    <span>Explore Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs py-3 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    <span>Contact Us</span>
                  </button>
                </div>
              </div>

              {/* Bottom Info Bar inside Hero Card */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-900 dark:text-slate-200 font-semibold">mucolabs2026@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-900 dark:text-slate-200 font-semibold">Erode, Tamil Nadu, India</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-black text-slate-950 dark:text-white">+91 6381809844</span>
                </div>
              </div>
            </div>

            {/* Right Bento Cards Matrix */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Web Development Bento Item */}
              <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/60 glass-light dark:glass bento-card hover:border-blue-500/40 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-400 tracking-wider uppercase">
                      WEB DEV
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3">
                    Web Platforms & Apps
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Basic Business</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹14,999</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Business Pro</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹24,999</span>
                    </div>
                    <div className="flex justify-between items-center text-blue-700 dark:text-blue-400 font-medium">
                      <span>E-Commerce Portal</span>
                      <span className="font-bold text-blue-700 dark:text-blue-400">₹39,999</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Custom Web App</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹59,999+</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('pricing')}
                  className="mt-4 text-left text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  View details <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Mobile Apps Bento Item */}
              <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/60 glass-light dark:glass bento-card hover:border-cyan-500/40 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-400 tracking-wider uppercase">
                      MOBILE APPS
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3">
                    iOS & Android Development
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Starter App MVP</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹49,999</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Business Native App</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹99,999</span>
                    </div>
                    <div className="flex justify-between items-center text-cyan-700 dark:text-cyan-400 font-medium">
                      <span>E-Commerce App</span>
                      <span className="font-bold text-cyan-700 dark:text-cyan-400">₹149,999</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Enterprise Platform</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹249,999+</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('pricing')}
                  className="mt-4 text-left text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  View details <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* AI & Automation Bento Item */}
              <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/60 glass-light dark:glass bento-card hover:border-indigo-500/40 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-400 tracking-wider uppercase">
                      AI & AUTOMATION
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3">
                    AI Chatbots & Workflows
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Smart AI Chatbot</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹24,999</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Process Automation</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹49,999</span>
                    </div>
                    <div className="flex justify-between items-center text-indigo-700 dark:text-indigo-400 font-medium">
                      <span>Advanced AI Suite</span>
                      <span className="font-bold text-indigo-700 dark:text-indigo-400">₹99,999</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-300 font-medium">
                      <span>Enterprise AI System</span>
                      <span className="font-bold text-slate-950 dark:text-white">₹199,999+</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('pricing')}
                  className="mt-4 text-left text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  View details <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Maintenance Plan Bento Item - Gradient Highlight */}
              <div className="p-5 rounded-3xl accent-gradient bento-card text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-white/80 tracking-wider uppercase">
                      MAINTENANCE & SLA
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white mb-3">
                    Continuous Support Plans
                  </h3>

                  <div className="space-y-2 text-xs text-white/95">
                    <div className="flex justify-between items-center">
                      <span>Website (Basic)</span>
                      <span className="font-bold">₹2,999/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Web (Enterprise)</span>
                      <span className="font-bold">₹9,999/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mobile App SLA</span>
                      <span className="font-bold">₹14,999/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cloud Infrastructure</span>
                      <span className="font-bold">₹29,999/mo</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('maintenance')}
                  className="mt-4 text-left text-[11px] font-bold text-white hover:underline flex items-center gap-1"
                >
                  View maintenance plans <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Wide Bento Banner Item (Span 2) */}
              <div className="sm:col-span-2 p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/60 glass-light dark:glass bento-card border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black text-slate-700 dark:text-slate-400 tracking-widest uppercase">
                    CREATIVE & MARKETING
                  </span>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-300">Logo Design</span>
                      <span className="font-extrabold text-xs text-blue-700 dark:text-blue-400">₹2,999</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-300">Brand Identity</span>
                      <span className="font-extrabold text-xs text-blue-700 dark:text-blue-400">₹14,999</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-300">Meta/Google Ads</span>
                      <span className="font-extrabold text-xs text-blue-700 dark:text-blue-400">₹7,999</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-300">SEO Retainer</span>
                      <span className="font-extrabold text-xs text-blue-700 dark:text-blue-400">₹7,999/mo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20 shrink-0 text-right">
                  <p className="text-[10px] leading-tight text-blue-800 dark:text-blue-300 font-extrabold uppercase tracking-wider">
                    Enterprise Grade<br />Software Architecture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Engineering Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-300 mt-2 font-medium">
            From initial software design to production cloud deployment and digital marketing scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-blue-100 dark:border-blue-900/40">
                  <DynamicIcon name={srv.iconName} className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 tracking-wider">
                  {srv.category}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-900 dark:text-slate-200 mb-4 line-clamp-3 leading-relaxed font-normal">
                  {srv.description}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {srv.highlights.slice(0, 3).map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-900 dark:text-slate-200 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starting at</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{srv.startingPrice}</span>
                </div>

                <button
                  onClick={() => onNavigate('pricing')}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                >
                  <span>View Rates</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder & Company Profile Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Founder Image & Info */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-[240px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-300" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-xl bg-slate-950">
                  <img
                    src={FOUNDER_INFO.image}
                    alt={FOUNDER_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="p-3 bg-slate-950/90 text-center border-t border-slate-800">
                    <p className="font-extrabold text-white text-sm">{FOUNDER_INFO.name}</p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{FOUNDER_INFO.role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
                <Building className="w-3.5 h-3.5" />
                <span>Leadership & Vision</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Architecting Modern Technology From Erode to the World
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                "At MUCO Labs, we believe that software should be engineered with absolute transparent clarity, zero fluff, and raw performance. Founded in 2026, our mission is to empower visionaries and businesses with robust technology that yields tangible growth."
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800 pt-5">
                <div>
                  <p className="text-base font-extrabold text-white">{FOUNDER_INFO.name}</p>
                  <p className="text-xs text-blue-400 font-medium">Founder & Managing Director, MUCO Labs</p>
                </div>

                <button
                  onClick={() => onNavigate('gallery')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore Photo Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
            Engineered For Scale
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Our Modern Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TECH_STACK.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center hover:border-blue-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
                <DynamicIcon name={item.iconName} className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                {item.category}
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{item.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Estimate Calculator Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EstimateCalculator onNavigateToContact={(msg) => onNavigate('contact', msg)} />
      </section>

      {/* Final Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Get in touch with MUCO Labs today. Transparent pricing, guaranteed timeline, and production-grade code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-white text-blue-700 hover:bg-slate-100 font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg transition-all"
            >
              Contact Us Now
            </button>
            <a
              href="tel:+916381809844"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-xs py-3.5 px-6 rounded-xl border border-blue-400/30 transition-all"
            >
              <Phone className="w-4 h-4" />
              +91 6381809844
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
