import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { FOUNDER_INFO } from '../data/galleryData';
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
  Award,
  Users,
  Smartphone,
  Layout,
  Bot,
  Cloud,
  Layers,
  BarChart3,
  Palette,
  CheckCircle2,
  Briefcase,
  ChevronRight,
  Database,
  Lock,
  Cpu,
  Layers3,
  Lightbulb,
  Share2,
  Star
} from 'lucide-react';

interface AboutProps {
  onNavigate: (page: PageId, msg?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'engineer' | 'designer' | 'marketer' | 'consultant' | 'ai' | 'mobile'>('engineer');

  const servicesList = [
    { title: 'Website Development', desc: 'Enterprise-grade React & Next.js web applications, portals, and e-commerce platforms.', icon: <Code2 className="w-5 h-5 text-blue-400" /> },
    { title: 'Android App Development', desc: 'High-performance native and cross-platform Android mobile applications.', icon: <Smartphone className="w-5 h-5 text-emerald-400" /> },
    { title: 'iOS App Development', desc: 'Sleek, secure, and native-feeling iOS mobile apps for iPhone and iPad ecosystems.', icon: <Smartphone className="w-5 h-5 text-indigo-400" /> },
    { title: 'UI/UX Design', desc: 'Modern SaaS aesthetics, Apple-inspired minimal layouts, and fluid user experiences.', icon: <Layout className="w-5 h-5 text-amber-400" /> },
    { title: 'AI Development', desc: 'Smart AI chatbots, custom LLM integrations, Gemini API solutions, and automated workflows.', icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { title: 'SaaS Development', desc: 'Multi-tenant cloud platforms, subscription billing systems, and scalable SaaS engines.', icon: <Layers className="w-5 h-5 text-purple-400" /> },
    { title: 'CRM Development', desc: 'Custom customer relationship management tools designed for sales, leads, and client tracking.', icon: <Users className="w-5 h-5 text-pink-400" /> },
    { title: 'ERP Development', desc: 'Comprehensive enterprise resource planning software to streamline business operations.', icon: <Briefcase className="w-5 h-5 text-rose-400" /> },
    { title: 'Automation', desc: 'Business process automation, API integrations, and hands-free workflow optimizations.', icon: <Zap className="w-5 h-5 text-yellow-400" /> },
    { title: 'Cloud Solutions', desc: 'Google Cloud, Firebase, and Cloudflare infrastructure deployment and server management.', icon: <Cloud className="w-5 h-5 text-sky-400" /> },
    { title: 'Digital Marketing', desc: 'ROI-driven Meta & Google Ads campaigns, SEO retainers, and digital growth strategies.', icon: <BarChart3 className="w-5 h-5 text-emerald-400" /> },
    { title: 'Branding', desc: 'Complete brand positioning, identity guidelines, color palettes, and visual narratives.', icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
    { title: 'Graphic Design', desc: 'High-converting social media creatives, marketing graphics, pitch decks, and logos.', icon: <Palette className="w-5 h-5 text-violet-400" /> },
    { title: 'Custom Software Development', desc: 'Tailor-made software architectures crafted for specific business requirements.', icon: <Cpu className="w-5 h-5 text-blue-400" /> },
    { title: 'Business Consulting', desc: 'Strategic advisory for tech startups, product roadmap planning, and growth consulting.', icon: <Lightbulb className="w-5 h-5 text-teal-400" /> },
  ];

  const expertRoles = {
    engineer: {
      title: 'Senior Software Engineer',
      badge: 'Engineering & Code Standards',
      desc: 'We write clean, production-ready TypeScript code following SOLID principles, modern architecture, and scalable folder structures with zero placeholder logic.',
      bullets: [
        'Production-level, complete codebases with zero TODO stubs',
        'SOLID principles & clean modular architecture',
        'Strict type safety with TypeScript & React/Next.js',
        'Optimized performance, API calls, and security controls'
      ]
    },
    designer: {
      title: 'Senior UI/UX Designer',
      badge: 'Apple-Inspired Minimal Aesthetics',
      desc: 'Crafting clean SaaS layouts, intuitive dashboards, generous negative space, refined typography, and delightful micro-interactions.',
      bullets: [
        'Modern SaaS visual aesthetics & minimal layouts',
        'Apple-inspired visual simplicity & responsive design',
        'Pixel-perfect component hierarchy & smooth animations',
        'Strict contrast ratios and accessibility compliance'
      ]
    },
    marketer: {
      title: 'Digital Marketing Expert',
      badge: 'Growth & High ROI Campaigns',
      desc: 'Driving measurable business growth through targeted Google Ads, Meta campaigns, technical SEO retainers, and conversion rate optimization.',
      bullets: [
        'High-converting Meta & Google Ad campaigns',
        'Technical SEO retainers & organic ranking strategies',
        'Lead generation funnels & landing page conversion',
        'Data-backed analytics & performance tracking'
      ]
    },
    consultant: {
      title: 'Startup & Business Consultant',
      badge: 'Strategic Growth & Community',
      desc: 'Helping entrepreneurs validate ideas, structure scalable business models, build collaborative ecosystems, and foster startup communities.',
      bullets: [
        'Product-Market Fit & MVP roadmap planning',
        'Startup ecosystem networking (BNI & JCI inspired)',
        'Revenue model optimization & pricing strategy',
        'Long-term tech expansion & venture scaling'
      ]
    },
    ai: {
      title: 'AI Architect',
      badge: 'Gemini & Next-Gen Intelligence',
      desc: 'Architecting intelligent AI chatbots, custom workflows, automated business processes, and server-side LLM integrations.',
      bullets: [
        'Google Gemini API & custom AI agent integration',
        'Server-side key security and multi-modal handling',
        'Process automation & workflow optimization',
        'Intelligent document parsing & customer support bots'
      ]
    },
    mobile: {
      title: 'Senior Mobile App Developer',
      badge: 'iOS & Android Excellence',
      desc: 'Building cross-platform and native mobile applications with fluid 60FPS UI rendering, offline persistence, and seamless push notifications.',
      bullets: [
        'Cross-platform iOS & Android mobile development',
        'Native device feature access (Camera, GPS, Auth)',
        'Play Store & App Store deployment readiness',
        'Offline caching, local state & responsive UI'
      ]
    }
  };

  return (
    <div className="space-y-16 pb-16 text-slate-900 dark:text-slate-100">
      {/* Hero Header */}
      <section className="relative pt-10 pb-12 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-500 dark:text-amber-400 font-bold text-xs mb-4">
          <Building2 className="w-4 h-4" />
          <span>MUCO Labs & Founder Story</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Building India's Leading Technology & Startup Ecosystem
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-medium max-w-3xl mx-auto">
          Founded by <strong className="text-blue-600 dark:text-cyan-400 font-extrabold">Srinivash Mahalingam (srinandy)</strong>, MUCO Labs is a global technology and digital transformation company. We specialize in custom software engineering, cloud architecture, mobile applications, and enterprise AI automation built to empower startups and global enterprises.
        </p>
      </section>

      {/* Founder Spotlight Card (Srinivash Mahalingam / srinandy) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Founder Image & Badge */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group w-full max-w-[280px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-600 rounded-3xl blur opacity-40 group-hover:opacity-75 transition duration-300" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-950">
                  <img
                    src={FOUNDER_INFO.image}
                    alt={FOUNDER_INFO.name}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-80 object-cover object-top"
                  />
                  <div className="p-3 bg-slate-950/95 text-center border-t border-slate-800">
                    <p className="font-black text-white text-base">{FOUNDER_INFO.name}</p>
                    <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">{FOUNDER_INFO.role}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">MUCO Labs • Erode, Tamil Nadu</p>
                  </div>
                </div>
              </div>

              {/* Direct Founder Contact Actions */}
              <div className="w-full max-w-[280px] mt-4 flex items-center justify-between gap-2 text-xs font-semibold">
                <a
                  href="tel:+916381809844"
                  className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Founder</span>
                </a>
                <a
                  href="mailto:mucolabs2026@gmail.com"
                  className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Founder Biography & Vision Statement */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                <span>Founder Profile & Vision</span>
              </div>

              {/* Founder Quote */}
              <div className="bg-gradient-to-r from-amber-500/15 via-slate-950 to-amber-500/10 p-5 rounded-2xl border-l-4 border-amber-500 border-y border-r border-slate-800 shadow-xl">
                <p className="text-base sm:text-xl font-black text-amber-300 tracking-tight leading-snug italic">
                  "Technology is my tool. Innovation is my language. People are my purpose. MUCO Labs is my legacy."
                </p>
                <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">— Srinivash Mahalingam (srinandy)</p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  Hello, I am <strong className="text-white font-extrabold">Srinivash Mahalingam (srinandy)</strong>, Founder of MUCO Labs. I am actively building multiple technology products, web platforms, Android applications, AI systems, SaaS architectures, and collaborative business networks.
                </p>
                <p>
                  My long-term vision is to build MUCO Labs into one of <strong className="text-amber-400 font-bold">India's leading technology companies</strong>—a trusted innovation partner that provides high-quality, scalable digital solutions for startups and enterprises worldwide.
                </p>
                <p className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-slate-300 italic text-xs">
                  "Whenever we write code or design systems, we approach it with a Senior Software Engineer mindset. We build scalable, production-ready solutions, write clean maintainable code, eliminate placeholder logic, and guarantee transparent execution."
                </p>
              </div>

              {/* Key Vision Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Production-Ready Excellence</p>
                    <p className="text-[11px] text-slate-400">Complete codebases with clean architecture & zero stubs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Startup Community Hub</p>
                    <p className="text-[11px] text-slate-400">Connecting founders, developers & creators in an active network.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 font-medium">Headquartered in Erode, Tamil Nadu, India</span>
                </div>
                <button
                  onClick={() => onNavigate('contact', 'Direct message for Founder Srinivash Mahalingam (srinandy)')}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 text-xs shadow-lg shadow-amber-500/10"
                >
                  <span>Connect With Srinivash</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Startup Ecosystem Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500 block">
            Our Purpose & Ecosystem
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white">
            The MUCO Labs Mission
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Technology is the greatest force multiplier for modern businesses. We are building both software products and a collaborative business community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">
              1. Startup Growth Engine
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Help startups and growing businesses accelerate using technology. From initial MVP to enterprise scale, we provide complete engineering, UI design, and cloud setup.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">
              2. Collaborative Business Network
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Create a collaborative ecosystem where startups, freelancers, developers, UI/UX designers, digital marketers, and entrepreneurs work together to unlock new opportunities.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">
              3. Tech Community (BNI / JCI Vision)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Build a strong technology community similar to BNI or JCI, but focused specifically on startups, tech innovators, and digital businesses across Tamil Nadu and global markets.
            </p>
          </div>
        </div>
      </section>

      {/* 15 Core Services Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500 block">
              Complete Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              Official MUCO Labs Services (15 Solutions)
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            <span>View Full Services Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((srv, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-amber-500/40 transition-all duration-200 flex items-start gap-3.5 group"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:scale-105 transition-transform">
                {srv.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-950 dark:text-white group-hover:text-amber-500 transition-colors">
                  {srv.title}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Role Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-500 block">
            Expert Execution Standards
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white">
            How We Execute Every Project Role
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Whatever domain your project requires, MUCO Labs operates with top-tier expert standards. Click a domain to inspect our execution criteria:
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {(
            [
              { key: 'engineer', label: 'Software Engineer', icon: <Code2 className="w-3.5 h-3.5" /> },
              { key: 'designer', label: 'UI/UX Designer', icon: <Layout className="w-3.5 h-3.5" /> },
              { key: 'marketer', label: 'Digital Marketer', icon: <BarChart3 className="w-3.5 h-3.5" /> },
              { key: 'consultant', label: 'Startup Consultant', icon: <Lightbulb className="w-3.5 h-3.5" /> },
              { key: 'ai', label: 'AI Architect', icon: <Bot className="w-3.5 h-3.5" /> },
              { key: 'mobile', label: 'Mobile Developer', icon: <Smartphone className="w-3.5 h-3.5" /> },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab === tab.key
                  ? 'bg-slate-900 dark:bg-slate-800 text-amber-400 border-amber-500/40 shadow-md'
                  : 'bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active Role Card */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
                {expertRoles[activeTab].badge}
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {expertRoles[activeTab].title} Mode
              </h3>
            </div>
            <span className="text-xs text-slate-400">Strict Quality Assurance</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {expertRoles[activeTab].desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {expertRoles[activeTab].bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Technology Stack Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500 block">
            Preferred Technology Stack
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Built On Modern Battle-Tested Frameworks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-500 font-extrabold text-xs uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>Frontend Stack</span>
            </div>
            <ul className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> React 19 / Next.js 15</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> TypeScript</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Tailwind CSS v4</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Framer Motion</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-500 font-extrabold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Backend & Database</span>
            </div>
            <ul className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Node.js & Express</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> MongoDB / Cloud SQL</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> JWT & OAuth 2.0</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Firebase Auth</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-purple-500 font-extrabold text-xs uppercase tracking-wider">
              <Cloud className="w-4 h-4" />
              <span>Cloud & Storage</span>
            </div>
            <ul className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Google Cloud Platform</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Firebase & Storage</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Cloudflare CDN</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Cloudinary Media</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-500 font-extrabold text-xs uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>AI & Payments</span>
            </div>
            <ul className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Google Gemini API</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> OpenAI API Integration</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Razorpay Gateways</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Stripe International</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl space-y-5">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready To Work With MUCO Labs?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Let's Turn Your Vision Into Production-Grade Reality
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Reach out to founder Srinivash Mahalingam (srinandy) and the MUCO Labs software team in Erode, Tamil Nadu. Whether you need a web app, mobile app, AI workflow, or business consulting—we are here to build scalable solutions.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact', 'Inquiry for Founder Srinivash Mahalingam (srinandy) - MUCO Labs')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-3.5 px-7 rounded-xl shadow-xl transition-all flex items-center gap-2"
            >
              <span>Contact Founder Directly</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl border border-slate-700 transition-all"
            >
              Explore Published Pricing
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs py-3.5 px-6 rounded-xl border border-slate-700 transition-all"
            >
              View HQ Gallery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
