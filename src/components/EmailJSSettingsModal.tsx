import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Copy, X, Key, Sparkles, Send, ShieldCheck, ExternalLink, Code2 } from 'lucide-react';
import { getEmailJSConfig, saveEmailJSConfig, isEmailJSConfigured, sendInquiryEmail, BRANDED_EMAILJS_HTML_TEMPLATE } from '../services/emailjs';
import { useToast } from '../context/ToastContext';

interface EmailJSSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailJSSettingsModal: React.FC<EmailJSSettingsModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [config, setConfig] = useState(getEmailJSConfig());
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'template_code' | 'test'>('config');
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailJSConfig(config);
    showToast('EmailJS configuration updated and saved!', 'success', 'EmailJS Config Saved');
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(BRANDED_EMAILJS_HTML_TEMPLATE);
    setCopiedTemplate(true);
    showToast('MUCO Labs branded HTML email template copied to clipboard!', 'success', 'Template Copied');
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const handleSendTestEmail = async () => {
    setIsTesting(true);
    const testResult = await sendInquiryEmail({
      name: 'Test Client (EmailJS Verification)',
      email: 'mucolabs2026@gmail.com',
      phone: '+91 6381809844',
      company: 'MUCO Labs Verification Suite',
      serviceCategory: 'Website Development',
      budgetRange: '₹50,000 - ₹100,000',
      message: 'This is an automated test dispatch from the MUCO Labs EmailJS integration service.'
    });
    setIsTesting(false);

    if (testResult.success) {
      showToast(
        testResult.isSimulated
          ? 'Simulated EmailJS test payload generated and verified for mucolabs2026@gmail.com!'
          : 'Live EmailJS test email successfully dispatched to mucolabs2026@gmail.com!',
        'success',
        testResult.isSimulated ? 'EmailJS Payload Verified' : 'Live Email Sent'
      );
    } else {
      showToast(
        `EmailJS Error (${testResult.status}): ${testResult.text}`,
        'error',
        'EmailJS Test Failed'
      );
    }
  };

  const configured = isEmailJSConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full bg-slate-100 dark:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                EmailJS Integration & Template Engine
              </h2>
              {configured ? (
                <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Live EmailJS Connected
                </span>
              ) : (
                <span className="bg-blue-500/20 text-blue-600 dark:text-cyan-400 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-blue-500/30">
                  Auto Email Engine Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Inquiries automatically route to <strong className="text-slate-800 dark:text-slate-200">mucolabs2026@gmail.com</strong> with MUCO Labs branded HTML styling.
            </p>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'config'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Key className="w-3.5 h-3.5 inline mr-1.5" />
            <span>API Credentials</span>
          </button>

          <button
            onClick={() => setActiveTab('template_code')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'template_code'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 inline mr-1.5" />
            <span>Branded HTML Template</span>
          </button>

          <button
            onClick={() => setActiveTab('test')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'test'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Send className="w-3.5 h-3.5 inline mr-1.5" />
            <span>Test Dispatch</span>
          </button>
        </div>

        {/* TAB 1: API CREDENTIALS CONFIG */}
        {activeTab === 'config' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/40 p-3.5 rounded-2xl border border-blue-200 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-semibold text-blue-900 dark:text-cyan-300">
                EmailJS Credentials Setup (Dashboard: dashboard.emailjs.com)
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Enter your EmailJS keys below or via <code className="text-blue-600 dark:text-cyan-400 font-mono">.env.example</code> environment variables. If left blank, form inquiries will still safely format, log, and process to your local storage and API endpoints.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Service ID (e.g. service_mucolabs)
                </label>
                <input
                  type="text"
                  value={config.serviceId}
                  onChange={(e) => setConfig({ ...config, serviceId: e.target.value })}
                  placeholder="service_xxxxxxxx"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Template ID (e.g. template_mucolabs)
                </label>
                <input
                  type="text"
                  value={config.templateId}
                  onChange={(e) => setConfig({ ...config, templateId: e.target.value })}
                  placeholder="template_xxxxxxxx"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Public Key / User Key
                </label>
                <input
                  type="text"
                  value={config.publicKey}
                  onChange={(e) => setConfig({ ...config, publicKey: e.target.value })}
                  placeholder="user_xxxxxxxxxxxx"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://dashboard.emailjs.com/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open EmailJS Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                Save Credentials
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: BRANDED HTML TEMPLATE */}
        {activeTab === 'template_code' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                MUCO Labs Branded Email Template HTML (Copy & Paste to EmailJS Template Editor)
              </p>
              <button
                onClick={handleCopyTemplate}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? 'Copied HTML!' : 'Copy HTML Template'}</span>
              </button>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-slate-300 font-mono text-[11px] h-64 overflow-y-auto leading-relaxed scrollbar-thin">
              <pre>{BRANDED_EMAILJS_HTML_TEMPLATE}</pre>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-[11px] text-slate-600 dark:text-slate-400 space-y-1 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">Template Variables Handled:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 font-mono text-[10px] text-blue-600 dark:text-cyan-400">
                <span>{"{{from_name}}"}</span>
                <span>{"{{from_email}}"}</span>
                <span>{"{{phone_number}}"}</span>
                <span>{"{{company_name}}"}</span>
                <span>{"{{service_category}}"}</span>
                <span>{"{{budget_range}}"}</span>
                <span>{"{{message_body}}"}</span>
                <span>{"{{submission_time}}"}</span>
                <span>{"{{to_email}}"}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEST DISPATCH */}
        {activeTab === 'test' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white">EmailJS Dispatch Diagnostics</h4>
              <p className="text-slate-600 dark:text-slate-300 text-xs">
                Destination Address: <strong className="text-blue-600 dark:text-cyan-400 font-mono">mucolabs2026@gmail.com</strong>
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs">
                Status:{' '}
                {configured ? (
                  <span className="text-emerald-500 font-bold">Configured with Live EmailJS Credentials</span>
                ) : (
                  <span className="text-amber-500 font-bold">Pre-configured (Local Dispatch Simulation Ready)</span>
                )}
              </p>
            </div>

            <button
              onClick={handleSendTestEmail}
              disabled={isTesting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isTesting ? 'Sending Test Inquiry...' : 'Send Test Email Inquiry to mucolabs2026@gmail.com'}</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
