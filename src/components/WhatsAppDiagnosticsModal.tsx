import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Trash2,
  Download,
  Copy,
  ExternalLink,
  X,
  Play,
  FileCode,
  Info,
  Clock
} from 'lucide-react';
import {
  getWhatsAppLogs,
  clearWhatsAppLogs,
  exportWhatsAppLogsJSON,
  subscribeToWhatsAppLogs,
  WhatsAppLogEntry,
  notifyUser
} from '../utils/whatsappLogger';
import {
  openWhatsApp,
  generateSafeWhatsAppUrl,
  WHATSAPP_NUMBER,
  MAX_SAFE_URL_LENGTH
} from '../utils/whatsapp';

interface WhatsAppDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppDiagnosticsModal: React.FC<WhatsAppDiagnosticsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [logs, setLogs] = useState<WhatsAppLogEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<WhatsAppLogEntry | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLogs(getWhatsAppLogs());
    }

    const unsubscribe = subscribeToWhatsAppLogs((newLog) => {
      setLogs((prev) => [newLog, ...prev.filter((l) => l.id !== newLog.id)]);
    });

    return unsubscribe;
  }, [isOpen]);

  const handleClear = () => {
    clearWhatsAppLogs();
    setLogs([]);
    setSelectedLog(null);
    notifyUser('WhatsApp diagnostic logs cleared.', 'info', 'Logs Cleared');
  };

  const handleCopyLogs = () => {
    const json = exportWhatsAppLogsJSON();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(json);
      setCopied(true);
      notifyUser('Diagnostic logs copied to clipboard as JSON.', 'success', 'Logs Copied');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const runTestStandard = () => {
    notifyUser('Running Standard WhatsApp Link Test...', 'info', 'Test Started');
    openWhatsApp({
      serviceName: 'Enterprise AI & Full-Stack Platform',
      projectBudget: '₹1,50,000 - ₹3,00,000',
      customMessage: 'Automated diagnostic test of standard MUCO Labs WhatsApp routing.'
    });
  };

  const runTestExtremeLength = () => {
    notifyUser('Generating 3,000+ character stress-test payload...', 'warning', 'Stress Test');
    const extremeText =
      'PROJECT REQUIREMENTS SPECIFICATION:\n' +
      '1. High performance custom e-commerce engine with multi-currency checkout.\n' +
      '2. Real-time inventory sync across 14 warehouse locations across Tamil Nadu and Bangalore.\n' +
      '3. Custom CRM integrations, Automated WhatsApp Bot, Telegram Alerts, and Gemini AI search.\n' +
      '4. Detailed compliance documentation for HIPAA and ISO 27001 security standards.\n' +
      '5. Custom microservices architecture deployed on Kubernetes with auto-scaling.\n' +
      '6. ' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(45);

    openWhatsApp({
      serviceName: 'Stress Test Service Payload',
      customMessage: extremeText
    });
  };

  const runTestMalformedSurrogates = () => {
    notifyUser('Testing surrogate pair sanitation...', 'info', 'Sanitation Test');
    // Test potentially broken string with dangling surrogate
    const trickyString = 'Testing emoji characters 🚀 ⚡ 💻 \uD800 \uDFFF \uD83D testing recovery!';
    openWhatsApp({
      serviceName: 'Unicode & Emoji Sanitation Test',
      customMessage: trickyString
    });
  };

  const filteredLogs = logs.filter((log) => {
    if (filterLevel === 'all') return true;
    return log.level === filterLevel;
  });

  const errorCount = logs.filter((l) => l.level === 'error').length;
  const warningCount = logs.filter((l) => l.level === 'warning').length;
  const successCount = logs.filter((l) => l.level === 'success').length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">
                    WhatsApp Error Logger & Deep-Link Diagnostics
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                    +{WHATSAPP_NUMBER}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Real-time telemetry, URL length checks, and automated error feedback.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLogs}
                disabled={logs.length === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-40"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
              </button>

              <button
                onClick={handleClear}
                disabled={logs.length === 0}
                className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 text-rose-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 border-b border-slate-800 text-xs">
            <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Events
              </span>
              <span className="text-lg font-black text-white">{logs.length}</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Dispatches
              </span>
              <span className="text-lg font-black text-emerald-400">{successCount}</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Warnings / Truncations
              </span>
              <span className="text-lg font-black text-amber-400">{warningCount}</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                Errors Intercepted
              </span>
              <span className="text-lg font-black text-rose-400">{errorCount}</span>
            </div>
          </div>

          {/* Testing Suite Trigger Bar */}
          <div className="p-4 bg-slate-950/30 border-b border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Interactive Safety & Error Logging Verification:</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Max Safe URL: {MAX_SAFE_URL_LENGTH} chars
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={runTestStandard}
                className="px-3 py-2 bg-slate-800/90 hover:bg-emerald-950/40 hover:border-emerald-500/50 border border-slate-700/80 rounded-xl text-left text-xs font-bold text-slate-200 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="block text-emerald-400 text-[11px]">1. Standard Link</span>
                  <span className="text-[10px] text-slate-400 font-normal">Validates clean routing</span>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
              </button>

              <button
                onClick={runTestExtremeLength}
                className="px-3 py-2 bg-slate-800/90 hover:bg-amber-950/40 hover:border-amber-500/50 border border-slate-700/80 rounded-xl text-left text-xs font-bold text-slate-200 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="block text-amber-400 text-[11px]">2. Stress URL (&gt;2.5k Chars)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Tests auto-trim & toast</span>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
              </button>

              <button
                onClick={runTestMalformedSurrogates}
                className="px-3 py-2 bg-slate-800/90 hover:bg-cyan-950/40 hover:border-cyan-500/50 border border-slate-700/80 rounded-xl text-left text-xs font-bold text-slate-200 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="block text-cyan-400 text-[11px]">3. Unicode / Emoji Check</span>
                  <span className="text-[10px] text-slate-400 font-normal">Sanitizes surrogate pairs</span>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Logs List & Details */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Filter:
              </span>
              {(['all', 'error', 'warning', 'success', 'info'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                    filterLevel === level
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'bg-slate-800/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {filteredLogs.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-emerald-400/60 mx-auto" />
                <p className="text-xs font-bold text-slate-300">
                  No WhatsApp errors logged in this session
                </p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Click one of the test buttons above or click any WhatsApp button across the site to generate telemetry.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      log.level === 'error'
                        ? 'bg-rose-950/20 border-rose-800/50 hover:bg-rose-950/30'
                        : log.level === 'warning'
                        ? 'bg-amber-950/20 border-amber-800/50 hover:bg-amber-950/30'
                        : log.level === 'success'
                        ? 'bg-emerald-950/20 border-emerald-800/50 hover:bg-emerald-950/30'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0">
                          {log.level === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                          {log.level === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                          {log.level === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {log.level === 'info' && <Info className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{log.title}</span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                              {log.code}
                            </span>
                            {log.urlLength && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({log.urlLength} chars)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">{log.message}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        {log.recoveryAction && (
                          <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded mt-1 inline-block">
                            {log.recoveryAction}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {selectedLog?.id === log.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-400 bg-slate-950/60 p-3 rounded-xl"
                      >
                        <p>
                          <strong className="text-slate-300">Log ID:</strong> {log.id}
                        </p>
                        <p>
                          <strong className="text-slate-300">Timestamp:</strong> {log.timestamp}
                        </p>
                        <p>
                          <strong className="text-slate-300">User Agent:</strong> {log.userAgent}
                        </p>
                        {log.urlPreview && (
                          <p className="break-all">
                            <strong className="text-slate-300">URL Preview:</strong> {log.urlPreview}
                          </p>
                        )}
                        {log.details && (
                          <pre className="bg-slate-900 p-2 rounded border border-slate-800 overflow-x-auto text-emerald-300">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              MUCO Labs WhatsApp Error Interceptor active on all client inquiry touchpoints.
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
