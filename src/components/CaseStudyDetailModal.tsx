import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Calendar,
  Layers,
  Cpu,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  TrendingUp,
  Building
} from 'lucide-react';
import { ProjectItem, PageId } from '../types';
import { Image } from './Image';
import { openWhatsApp } from '../utils/whatsapp';

interface CaseStudyDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact: (customMessage?: string) => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onNavigateToContact
}) => {
  if (!isOpen || !project) return null;

  const handleWhatsApp = () => {
    openWhatsApp({
      customMessage: `Hi MUCO Labs! I saw your case study for "${project.title}" (${project.client}) and want to build a similar software/AI solution.`
    });
  };

  const handleBuildSimilar = () => {
    onClose();
    onNavigateToContact(
      `I am interested in building a solution similar to your case study "${project.title}" (${project.client} - ${project.category}). Please provide a technical proposal and estimate.`
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Case Study Architecture
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-medium">{project.category}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
            {/* Header Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-bold">
                  <Building className="w-3.5 h-3.5" />
                  <span>Client: {project.client} ({project.year})</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Status & Live URL */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{project.status}</span>
                  </span>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      <span>View Live Platform</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Cover Image */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  aspectRatio="16/10"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Architecture Highlights & Key Metrics */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Technical & Business Outcomes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-200"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack Grid */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Production Stack & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Full IP ownership & NDA protected delivery guaranteed.</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 font-bold py-2.5 px-4 rounded-xl transition-all text-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </button>

              <button
                onClick={handleBuildSimilar}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black py-2.5 px-5 rounded-xl transition-all shadow-md text-xs cursor-pointer active:scale-95"
              >
                <span>Build Similar Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
