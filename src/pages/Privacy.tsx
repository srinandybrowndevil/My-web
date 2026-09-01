import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, UserCheck, AlertCircle, ArrowRight, Mail, Phone } from 'lucide-react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyProps {
  onNavigate: (page: PageId) => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onNavigate }) => {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Digital Personal Data Protection (DPDP) Aligned</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t.legal.privacyTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.legal.privacySubtitle}
          </p>
          <div className="text-xs text-slate-500 font-mono">
            {t.legal.lastUpdated} &bull; Compliance Standard: DPDP Act, 2023
          </div>
        </div>

        {/* DPDP Commitment Highlight */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/20 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Lock className="w-4 h-4" />
              <span>Data Protection Architecture</span>
            </div>
            <h2 className="text-xl font-black text-white">
              Purpose Limitation & Data Minimization
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.legal.dpdpNotice} We never sell, lease, or monetize client personal data, confidential architecture documents, or business telemetry to any third-party marketing network.
            </p>
          </div>
        </div>

        {/* Core Policy Sections */}
        <div className="space-y-8">
          {/* 1. Data Collected */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <Eye className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">1. Personal & Technical Data We Collect</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                We only collect data strictly necessary to provide engineering services, quote estimations, and communication:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-400 pl-2">
                <li><strong className="text-slate-200">Identity & Contact Data:</strong> Name, work email, phone number, and company name when you sign up, request a quote, or submit an RFP.</li>
                <li><strong className="text-slate-200">Account Credentials:</strong> Secure Firebase Authentication tokens, OAuth email addresses, and encrypted verification states.</li>
                <li><strong className="text-slate-200">Project Telemetry:</strong> Saved quote parameters, selected tech stack options, and feature configurations for proposal generation.</li>
                <li><strong className="text-slate-200">Technical Logs:</strong> Browser user agent, preferred language (English / Tamil), and IP address for security audits.</li>
              </ul>
            </div>
          </div>

          {/* 2. Lawful Grounds */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <UserCheck className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">2. Lawful Grounds for Processing</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                Under Section 4 and Section 6 of the DPDP Act 2023, MUCO Labs processes your personal data on the basis of:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-400 pl-2">
                <li><strong className="text-slate-200">Explicit Consent:</strong> Provided voluntarily when submitting project inquiries, registering accounts, or saving calculator quotes.</li>
                <li><strong className="text-slate-200">Contractual Execution:</strong> Necessary to draft, execute, and deliver client software development agreements and milestone deliverables.</li>
                <li><strong className="text-slate-200">Legal Compliance:</strong> Meeting statutory tax, accounting (GST), and audit regulations under Indian law.</li>
              </ul>
            </div>
          </div>

          {/* 3. Your Rights as Data Principal */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <FileText className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">3. Your Rights Under DPDP Act 2023</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                As a Data Principal, you possess statutory rights enforceable at any time:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-400 pl-2">
                <li><strong className="text-slate-200">Right to Summary:</strong> Request a full export of all personal data held about you in our databases.</li>
                <li><strong className="text-slate-200">Right to Correction & Erasure:</strong> Request immediate correction of outdated information or deletion of your account and saved quotes.</li>
                <li><strong className="text-slate-200">Right to Withdraw Consent:</strong> Revoke consent for communications at any time by updating your account settings or emailing our compliance team.</li>
                <li><strong className="text-slate-200">Right to Grievance Redressal:</strong> Direct escalation to our designated Grievance Officer.</li>
              </ul>
            </div>
          </div>

          {/* 4. Grievance Officer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/20 space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-black text-white">4. Grievance Officer & Contact Details</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In compliance with the DPDP Act 2023, MUCO Labs has appointed a designated Grievance Officer to address any data privacy concerns within 30 days of notice:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2 font-mono">
              <div className="text-white font-bold">Grievance & Privacy Officer: Srinivash S.</div>
              <div className="text-slate-400">Organization: MUCO Labs Private Limited</div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>privacy@mucolabs.in / contact@mucolabs.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>+91 63818 09844</span>
              </div>
              <div className="text-slate-500">Location: Erode &amp; Perundurai Regional Hub, Tamil Nadu, India - 638052</div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <button
            onClick={() => onNavigate('terms')}
            className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <span>Read Terms of Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Contact Privacy Office</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
