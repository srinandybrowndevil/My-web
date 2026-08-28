import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, ArrowRight, CheckCircle2, AlertCircle, Scale, CreditCard, Lock, Clock } from 'lucide-react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TermsProps {
  onNavigate: (page: PageId) => void;
}

export const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500 selection:text-white pt-24 pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-orange-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono tracking-wider uppercase">
            <Scale className="w-3.5 h-3.5" />
            <span>Commercial & Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t.legal.termsTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.legal.termsSubtitle}
          </p>
          <div className="text-xs text-slate-500 font-mono">
            {t.legal.lastUpdated} &bull; Document ID: MUCO-MSA-2026
          </div>
        </div>

        {/* Highlight Banner: 50% Advance Commercial Rule */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-950/40 via-slate-900 to-slate-900 border-2 border-orange-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <CreditCard className="w-40 h-40 text-orange-500" />
          </div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2.5 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
              <CreditCard className="w-4 h-4" />
              <span>Section 1.0 &bull; Core Commercial Billing Rule</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              50% Advance & Milestone Payment Structure
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20">
              &ldquo;{t.legal.advancePaymentClause}&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              This milestone-driven framework guarantees dedicated engineering allocation, rapid staging environments, and priority server provisioning for every client project.
            </p>
          </div>
        </div>

        {/* Structured Sections */}
        <div className="space-y-8">
          {/* Section 2: Engagement & SOW */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <FileCheck className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">2. Scope of Work & Project Kickoff</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                Each project begins with a formal Statement of Work (SOW) or architectural proposal specifying deliverables, technical stack, timeline, and milestone checkpoints.
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-400 pl-2">
                <li><strong className="text-slate-200">Engineering Kickoff:</strong> Commences immediately upon receipt of the 50% advance deposit and client prerequisite assets.</li>
                <li><strong className="text-slate-200">Scope Changes:</strong> Any request outside the approved SOW will be itemized as a separate Change Order with transparent hourly or fixed pricing.</li>
                <li><strong className="text-slate-200">Client Feedback Cycles:</strong> Standard feedback windows are 3 business days per sprint review to maintain projected timelines.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Intellectual Property */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <Lock className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">3. Intellectual Property (IP) Ownership</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                MUCO Labs adheres to 100% transparent IP transfer. Upon receipt of full and final milestone payment:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-400 pl-2">
                <li>The client receives complete, unencumbered ownership of all custom source code, design assets, schemas, and deployed instances.</li>
                <li>Third-party open-source libraries (e.g. React, Tailwind, Vite) remain licensed under their respective permissive licenses (MIT, Apache 2.0).</li>
                <li>MUCO Labs reserves the right to showcase non-confidential visual case studies unless an explicit Non-Disclosure Agreement (NDA) has been executed.</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Maintenance & SLAs */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <Clock className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">4. Warranty, Maintenance & Service Level Agreements (SLA)</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                We stand firmly behind our code with guaranteed warranty coverage:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-400 pl-2">
                <li><strong className="text-slate-200">30-Day Post-Launch Warranty:</strong> All critical bugs and defects directly attributable to the agreed scope are patched at zero additional cost.</li>
                <li><strong className="text-slate-200">Monthly Maintenance Retainers:</strong> Include continuous security updates, dependency patches, database backups, and guaranteed uptime monitoring.</li>
                <li><strong className="text-slate-200">Response SLA:</strong> Critical severity issues receive a 4-hour response window during business hours.</li>
              </ul>
            </div>
          </div>

          {/* Section 5: Governing Law */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">5. Governing Law & Jurisdiction</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              These Terms and any project contracts executed with MUCO Labs are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Erode / Chennai, Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Navigation & CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <button
            onClick={() => onNavigate('privacy')}
            className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <span>Read DPDP Privacy Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-black shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Questions? Talk to Engineering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
