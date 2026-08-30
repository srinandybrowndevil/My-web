import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Copy, X, Key, Sparkles, Send, ShieldCheck, ExternalLink, Code2, Server, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { getResendStatus, sendTestEmail, EmailStatus } from '../services/resendEmail';
import { useToast } from '../context/ToastContext';

interface ResendSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResendSettingsModal: React.FC<ResendSettingsModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [status, setStatus] = useState<EmailStatus>({
    configured: false,
    provider: 'resend',
    fromEmail: 'MUCO Labs <onboarding@resend.dev>',
    toEmail: 'contact@mucolabs.com'
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatus = async () => {
    setIsLoading(true);
    const data = await getResendStatus();
    setStatus(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEnv = () => {
    const envSnippet = `# RESEND CONFIGURATION (Server-Side Secrets)
# Get your API key at https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=MUCO Labs <onboarding@resend.dev>
RESEND_TO_EMAIL=contact@mucolabs.com`;

    navigator.clipboard.writeText(envSnippet);
    setCopiedCode(true);
    showToast('.env snippet copied to clipboard!', 'success', 'Copied');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSendTestEmail = async () => {
    setIsTesting(true);
    setTestResult(null);

    const result = await sendTestEmail();
    setIsTesting(false);
    setTestResult({
      success: result.success,
      message: result.text
    });

    if (result.success) {
      showToast(
        result.isSimulated
          ? 'Resend simulated test payload verified!'
          : 'Live Resend test email dispatched!',
        'success',
        result.isSimulated ? 'Sandbox Verified' : 'Live Email Dispatched'
      );
    } else {
      showToast(`Resend Test Error: ${result.text}`, 'error', 'Dispatch Error');
    }
  };

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
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full bg-slate-100 dark:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                Resend Email Architecture
              </h3>
              {status.configured ? (
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Live Resend Active</span>
                </span>
              ) : (
                <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Sandbox Simulation Mode</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Zero-client leak, server-side transactional email routing via <strong className="text-orange-500">Resend</strong>.
            </p>
          </div>
        </div>

        {/* Status card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-orange-500" />
              <span>Server-Side Status:</span>
            </span>
            <button
              onClick={fetchStatus}
              disabled={isLoading}
              className="text-[11px] text-orange-500 hover:text-orange-600 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Active Provider</span>
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Resend (SDK v4)
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">API Key Status</span>
              <span className={`font-bold ${status.configured ? 'text-emerald-500' : 'text-amber-400'}`}>
                {status.configured ? '✓ RESEND_API_KEY Configured' : '○ Missing (Sandbox Mode)'}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Verified Sender</span>
              <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate block">
                {status.fromEmail}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Inquiry Recipient</span>
              <span className="font-mono text-[11px] text-orange-500 font-semibold truncate block">
                {status.toEmail}
              </span>
            </div>
          </div>
        </div>

        {/* How to configure Resend */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-orange-500" />
              <span>How to Configure Resend</span>
            </h4>
            <a
              href="https://resend.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1"
            >
              <span>Get Resend Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Resend runs securely on our Express server (preventing your API key from ever leaking to client browsers). To activate live deliveries, configure the key in your environment variables:
          </p>

          <div className="relative">
            <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto border border-slate-800">
{`# .env
RESEND_API_KEY=re_123456789abcdef
RESEND_FROM_EMAIL=MUCO Labs <onboarding@resend.dev>
RESEND_TO_EMAIL=contact@mucolabs.com`}
            </pre>
            <button
              onClick={handleCopyEnv}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-semibold"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Test Dispatch Button */}
        <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">Verify Resend Dispatch</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Dispatches a verification test payload through the backend API.
              </p>
            </div>
            <button
              onClick={handleSendTestEmail}
              disabled={isTesting}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>{isTesting ? 'Sending...' : 'Send Test'}</span>
            </button>
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testResult.success 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400'
            }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Server-side Protected &bull; Zero Client Secret Exposure</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
