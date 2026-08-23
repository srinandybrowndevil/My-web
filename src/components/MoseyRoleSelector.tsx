import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserRole } from '../context/RoleContext';
import { USER_ROLES, UserRoleId } from '../data/rolesData';
import { PageId } from '../types';
import {
  Building2,
  ShoppingBag,
  Compass,
  Zap,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Layers,
  ChevronRight
} from 'lucide-react';

interface MoseyRoleSelectorProps {
  variant?: 'full' | 'compact' | 'card';
  onNavigate?: (page: PageId) => void;
  className?: string;
}

const ROLE_ICONS: Record<UserRoleId, React.ElementType> = {
  'business-owner': Building2,
  'ecommerce-merchant': ShoppingBag,
  'industrial-engineer': Compass,
  'tech-startup': Zap,
  'growth-marketer': TrendingUp,
  'student-aspirant': GraduationCap
};

export const MoseyRoleSelector: React.FC<MoseyRoleSelectorProps> = ({
  variant = 'full',
  onNavigate,
  className = ''
}) => {
  const { currentRole, roleData, setRole } = useUserRole();

  const handleWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/916381809844?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleServiceClick = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = page;
    }
  };

  // Compact bar version for top-of-page or sub-header embedding
  if (variant === 'compact') {
    return (
      <div className={`w-full bg-gray-900/60 dark:bg-gray-950/80 backdrop-blur-md border-y border-white/10 py-3 px-4 ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Tailor Experience for Your Role:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
            {USER_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.id];
              const isSelected = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setRole(role.id)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-500/20'
                      : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                  <span>{role.label.split('&')[0].trim()}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="compact-role-indicator"
                      className="absolute inset-0 rounded-full border border-emerald-400/50 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`relative w-full ${className}`}>
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Prompt */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Role Selector</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            How Can MUCO Labs Accelerate Your Goals?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Select your role to explore tailor-made solutions, custom engineering stacks, and verified business outcomes.
          </p>
        </div>

        {/* Tactile Role Selection Segmented Control */}
        <div className="bg-gray-100 dark:bg-gray-900/90 p-1.5 sm:p-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-inner max-w-5xl mx-auto mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
            {USER_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.id];
              const isSelected = currentRole === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => setRole(role.id)}
                  id={`role-btn-${role.id}`}
                  className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl text-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="mosey-active-role-bg"
                      className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 rounded-xl shadow-lg shadow-emerald-600/25 z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex flex-col items-center gap-1.5">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className="text-xs font-semibold leading-tight line-clamp-2">
                      {role.label}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}>
                      {role.badge}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Role Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden max-w-5xl mx-auto"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Top Row: Hero Title & Key Metric */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Curated Roadmap for {roleData.label}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {roleData.heroTitle}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {roleData.heroTagline}
                  </p>
                </div>

                {/* Impact Metric Pill */}
                <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent dark:from-emerald-500/20 dark:via-teal-500/20 p-4 sm:p-5 rounded-2xl border border-emerald-500/20 shrink-0 text-center lg:text-right">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    {roleData.keyMetric.value}
                  </div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1 max-w-[160px]">
                    {roleData.keyMetric.label}
                  </div>
                </div>
              </div>

              {/* Middle Row: Pain Point vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-50/60 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Common Bottleneck</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {roleData.painPoint}
                  </p>
                </div>

                <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>The MUCO Engineering Advantage</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {roleData.solutionHighlight}
                  </p>
                </div>
              </div>

              {/* Recommended Services Grid */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <span>Recommended Core Services for Your Role</span>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    1-Click Fast Track
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {roleData.recommendedServices.map((service, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleServiceClick(service.targetPage)}
                      className="group text-left p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 hover:bg-emerald-50/50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 mb-2">
                          {service.tag}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {service.title}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                        <span>Explore Offering</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Action Strip: Tech Stack + WhatsApp / Contact */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1">
                  <span className="text-xs font-semibold text-gray-400 shrink-0">Tech Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {roleData.featuredTech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => handleWhatsApp(roleData.whatsappMessage)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{roleData.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
