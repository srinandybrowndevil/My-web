import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserRole } from '../context/RoleContext';
import { USER_ROLES, UserRoleId } from '../data/rolesData';
import { PageId } from '../types';
import {
  Sparkles,
  X,
  Building2,
  ShoppingBag,
  Compass,
  Zap,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

interface RoleQuickSwitcherProps {
  onNavigate?: (page: PageId) => void;
}

const ROLE_ICONS: Record<UserRoleId, React.ElementType> = {
  'business-owner': Building2,
  'ecommerce-merchant': ShoppingBag,
  'industrial-engineer': Compass,
  'tech-startup': Zap,
  'growth-marketer': TrendingUp,
  'student-aspirant': GraduationCap
};

export const RoleQuickSwitcher: React.FC<RoleQuickSwitcherProps> = ({ onNavigate }) => {
  const { currentRole, roleData, setRole, isRoleModalOpen, setIsRoleModalOpen } = useUserRole();
  const ActiveIcon = ROLE_ICONS[currentRole];

  const handleWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/916381809844?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleServiceSelect = (page: PageId) => {
    setIsRoleModalOpen(false);
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = page;
    }
  };

  return (
    <>
      {/* Floating Pill Quick Switcher (Bottom-Left above WhatsApp floating button) */}
      <div className="fixed bottom-20 left-4 z-40">
        <motion.button
          onClick={() => setIsRoleModalOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-gray-900/90 dark:bg-gray-800/90 text-white backdrop-blur-md border border-emerald-500/30 shadow-lg shadow-emerald-500/10 text-xs font-semibold hover:border-emerald-400 transition-all cursor-pointer group"
          aria-label="Switch User Role Persona"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <ActiveIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors">
            Role: <strong className="text-emerald-400 font-bold">{roleData.label.split('&')[0].trim()}</strong>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
            Switch
          </span>
        </motion.button>
      </div>

      {/* Global Interactive Role Selection Modal (Mosey Experience) */}
      <AnimatePresence>
        {isRoleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRoleModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-20 cursor-pointer"
                aria-label="Close Role Selector"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personalized Experience</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    Select Your Persona
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Choose who you are to tailor all recommendations, case studies, and engineering solutions across MUCO Labs.
                  </p>
                </div>

                {/* Role Tabs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                  {USER_ROLES.map((role) => {
                    const Icon = ROLE_ICONS[role.id];
                    const isSelected = currentRole === role.id;

                    return (
                      <button
                        key={role.id}
                        onClick={() => setRole(role.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                            : 'bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-200" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight line-clamp-2">
                            {role.label}
                          </div>
                          <div className={`text-[10px] mt-1 font-medium ${isSelected ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'}`}>
                            {role.badge}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Role Preview Card */}
                <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                        Tailored Focus
                      </span>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white">
                        {roleData.heroTitle}
                      </h4>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      <span>Impact: {roleData.keyMetric.value}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    {roleData.heroTagline}
                  </p>

                  {/* 3 Recommended Services */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                    {roleData.recommendedServices.map((svc, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceSelect(svc.targetPage)}
                        className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 text-left transition-all cursor-pointer group"
                      >
                        <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                          {svc.tag}
                        </div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 truncate">
                          {svc.title}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:inline">
                      Preferences auto-saved for this session
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleWhatsApp(roleData.whatsappMessage)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat as {roleData.label.split('&')[0].trim()}</span>
                      </button>
                      <button
                        onClick={() => setIsRoleModalOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
                      >
                        Apply & Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
