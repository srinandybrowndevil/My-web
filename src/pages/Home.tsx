import React from 'react';
import { motion } from 'framer-motion';
import { PageId } from '../types';
import { CORE_SERVICES, TECH_STACK } from '../data/servicesData';
import { FOUNDER_INFO } from '../data/galleryData';
import { DynamicIcon } from '../components/DynamicIcon';
import { EstimateCalculator } from '../components/EstimateCalculator';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { ClientSuccessStories } from '../components/ClientSuccessStories';
import { GlobalReach } from '../components/GlobalReach';
import { Testimonials } from '../components/Testimonials';
import { MucoLogo } from '../components/MucoLogo';
import { BeforeAfterTransformation } from '../components/BeforeAfterTransformation';
import { AuthenticCompanyVisuals } from '../components/AuthenticCompanyVisuals';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code2,
  Cpu,
  Bot,
  CheckCircle2,
  Building,
  Phone,
  ChevronRight
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
  isScrolledPastHero?: boolean;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, isScrolledPastHero = false }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* DEDICATED HOME HERO SECTION */}
      <section
        className={`relative min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col items-center justify-center pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden text-center transition-all duration-700 ease-out ${
          isScrolledPastHero
            ? 'opacity-15 scale-95 blur-xs pointer-events-none'
            : 'opacity-100 scale-100 blur-none'
        }`}
      >
        {/* Animated ambient background glows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-blue-600/15 dark:bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-1/3 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="absolute bottom-1/4 right-1/4 w-52 sm:w-80 h-52 sm:h-80 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Subtle grid pattern backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0d_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3341551a_1px,transparent_1px),linear-gradient(to_bottom,#3341551a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4"
        >
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-lg shadow-cyan-500/10 text-center"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>AI & Digital Engineering Firm • Est. 2026</span>
          </motion.div>

          {/* LARGE PREMIUM MUCO LABS LOGO IN CENTER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-1 sm:my-2 p-5 sm:p-8 rounded-3xl bg-slate-900/80 dark:bg-[#080d1a]/90 border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.3)] backdrop-blur-2xl group hover:border-cyan-400/80 transition-all duration-500 transform hover:scale-[1.03] flex items-center justify-center shrink-0"
          >
            {/* Radial backlight aura */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 via-cyan-500/30 to-amber-500/25 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
              <MucoLogo variant="mark" size="custom" customSize={120} className="w-full h-full" />
            </div>
          </motion.div>

          {/* MUCO LABS BRAND TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white text-center leading-none"
          >
            MUCO <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 bg-clip-text text-transparent">LABS</span>
          </motion.h1>

          {/* AI • Cloud • Digital Engineering SUBTITLE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[11px] sm:text-base md:text-xl font-extrabold tracking-[0.15em] sm:tracking-[0.28em] uppercase bg-gradient-to-r from-cyan-300 via-blue-400 to-amber-300 bg-clip-text text-transparent px-4 sm:px-6 py-2 rounded-full bg-slate-900/60 dark:bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-lg text-center max-w-full leading-normal"
          >
            AI • Cloud Architecture • Full-Stack Software
          </motion.div>

          {/* PROFESSIONAL TAGLINE */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-600 dark:text-slate-300 text-xs sm:text-base md:text-lg max-w-2xl leading-relaxed font-normal px-2 text-center"
          >
            Architecting intelligent enterprise software platforms, production-ready AI models, robust cloud infrastructures, and high-performance mobile applications.
          </motion.p>

          {/* LIVE TRUST & METRICS BAR */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl pt-2"
          >
            <div className="p-2.5 rounded-2xl bg-slate-900/70 dark:bg-slate-900/60 border border-slate-800 backdrop-blur-md text-center">
              <span className="block text-sm font-black text-cyan-400">99.9%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Uptime SLA</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-900/70 dark:bg-slate-900/60 border border-slate-800 backdrop-blur-md text-center">
              <span className="block text-sm font-black text-amber-400">&lt; 15ms</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">API Latency</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-900/70 dark:bg-slate-900/60 border border-slate-800 backdrop-blur-md text-center">
              <span className="block text-sm font-black text-blue-400">100+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deliveries</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-900/70 dark:bg-slate-900/60 border border-slate-800 backdrop-blur-md text-center">
              <span className="block text-sm font-black text-emerald-400">24/7</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Support</span>
            </div>
          </motion.div>

          {/* HERO ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900/90 dark:bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-850 font-extrabold text-xs sm:text-sm border border-slate-700/80 shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>View Pricing Plans</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* BENTO GRID SHOWCASE & CORE SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <section className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Web Dev Bento Card */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white bento-card hover:border-blue-500/50 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    WEB DEV
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white mb-3">
                  Web Platforms & Apps
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Basic Business</span>
                    <span className="font-bold text-white">₹14,999</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Business Pro</span>
                    <span className="font-bold text-white">₹24,999</span>
                  </div>
                  <div className="flex justify-between items-center text-blue-400 font-medium">
                    <span>E-Commerce Portal</span>
                    <span className="font-bold text-blue-400">₹39,999</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('pricing')}
                className="mt-4 text-left text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                View details <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Mobile Apps Bento Card */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white bento-card hover:border-cyan-500/50 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    MOBILE APPS
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white mb-3">
                  iOS & Android Development
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Starter App MVP</span>
                    <span className="font-bold text-white">₹49,999</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Business Native App</span>
                    <span className="font-bold text-white">₹99,999</span>
                  </div>
                  <div className="flex justify-between items-center text-cyan-400 font-medium">
                    <span>E-Commerce App</span>
                    <span className="font-bold text-cyan-400">₹149,999</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('pricing')}
                className="mt-4 text-left text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                View details <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* AI & Automation Bento Card */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white bento-card hover:border-indigo-500/50 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    AI & AUTOMATION
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white mb-3">
                  AI Chatbots & Workflows
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Smart AI Chatbot</span>
                    <span className="font-bold text-white">₹24,999</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Process Automation</span>
                    <span className="font-bold text-white">₹49,999</span>
                  </div>
                  <div className="flex justify-between items-center text-indigo-400 font-medium">
                    <span>Advanced AI Suite</span>
                    <span className="font-bold text-indigo-400">₹99,999</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('pricing')}
                className="mt-4 text-left text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
              >
                View details <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Maintenance Bento Card */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white bento-card hover:border-emerald-500/50 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    MAINTENANCE & SLA
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white mb-3">
                  Continuous Support Plans
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Website (Basic)</span>
                    <span className="font-bold text-white">₹2,999/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Web (Enterprise)</span>
                    <span className="font-bold text-white">₹9,999/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-400 font-medium">
                    <span>Mobile App SLA</span>
                    <span className="font-bold text-emerald-400">₹14,999/mo</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('maintenance')}
                className="mt-4 text-left text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                View maintenance plans <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* Services Overview Grid */}
        <section className="max-w-7xl mx-auto">
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

        {/* Featured Projects Showcase Section */}
        <section className="max-w-7xl mx-auto">
          <FeaturedProjects onNavigate={onNavigate} />
        </section>

        {/* BEFORE & AFTER DIGITAL TRANSFORMATION SHOWCASE */}
        <section className="max-w-7xl mx-auto">
          <BeforeAfterTransformation />
        </section>

        {/* Client Success Stories Carousel Section */}
        <ClientSuccessStories onNavigate={onNavigate} />

        {/* AUTHENTIC COMPANY VISUALS & BEHIND THE SCENES */}
        <section className="max-w-7xl mx-auto">
          <AuthenticCompanyVisuals />
        </section>

        {/* Global Reach Interactive Map Section */}
        <section className="max-w-7xl mx-auto">
          <GlobalReach onNavigate={onNavigate} />
        </section>

        {/* Client Testimonials Section */}
        <Testimonials />

        {/* Founder & Company Profile Spotlight */}
        <section className="max-w-7xl mx-auto">
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
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                      }}
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
                    <p className="text-xs text-blue-400 font-medium">Founder & Chairman, MUCO Labs</p>
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
        <section className="max-w-7xl mx-auto">
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
        <section className="max-w-7xl mx-auto">
          <EstimateCalculator onNavigateToContact={(msg) => onNavigate('contact', msg)} />
        </section>

        {/* Final Call To Action Banner */}
        <section className="max-w-7xl mx-auto">
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
    </div>
  );
};
