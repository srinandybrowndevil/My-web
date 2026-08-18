import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailedService } from '../data/servicesData';
import { DynamicIcon } from './DynamicIcon';
import { PageId } from '../types';
import { openWhatsApp } from '../utils/whatsapp';
import {
  X,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Tag,
  Code2
} from 'lucide-react';

interface ServiceQuickViewProps {
  service: DetailedService | null;
  onClose: () => void;
  onNavigate?: (page: PageId, customMsg?: string) => void;
}

export const ServiceQuickView: React.FC<ServiceQuickViewProps> = ({
  service,
  onClose,
  onNavigate
}) => {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [service, onClose]);

  if (!service) return null;

  const handleQuoteClick = () => {
    onClose();
    if (onNavigate) {
      onNavigate('contact', `I am interested in your ${service.title} service (${service.startingPrice}). Please provide a detailed proposal.`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl glass-morphism-card rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar / Header */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white border-b border-slate-800 flex items-start justify-between shrink-0">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                <DynamicIcon name={service.iconName} className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                  {service.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  {service.tagline}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all shrink-0 border border-white/10 relative z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed">
            {/* Overview Description */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Service Overview
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {service.description}
              </p>
            </div>

            {/* Grid for Highlights & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Key Highlights */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {service.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Deliverables */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Key Deliverables
                </h4>
                <ul className="space-y-2">
                  {service.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-extrabold text-xs px-3 py-1 rounded-xl border border-blue-200 dark:border-blue-900/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar / Action Row */}
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Starting Rate
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {service.startingPrice}
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => openWhatsApp({ serviceName: service.title })}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleQuoteClick}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
