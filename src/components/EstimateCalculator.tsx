import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  Copy, 
  CheckCheck, 
  Bookmark, 
  CreditCard,
  RefreshCw 
} from 'lucide-react';
import { PageId } from '../types';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { saveEstimatorSession } from '../services/firebase';

interface EstimateCalculatorProps {
  onNavigateToContact: (customMessage?: string) => void;
}

interface SelectableOption {
  id: string;
  category: string;
  name: string;
  baseCost: number;
  period?: string;
}

const ESTIMATE_OPTIONS: SelectableOption[] = [
  // Web & Mobile
  { id: 'opt-web-basic', category: 'Web & App', name: 'Basic Website', baseCost: 14999 },
  { id: 'opt-web-biz', category: 'Web & App', name: 'Business Website', baseCost: 24999 },
  { id: 'opt-web-ecom', category: 'Web & App', name: 'E-Commerce Website', baseCost: 39999 },
  { id: 'opt-app-basic', category: 'Web & App', name: 'Basic Mobile App', baseCost: 49999 },
  { id: 'opt-app-biz', category: 'Web & App', name: 'Business Mobile App', baseCost: 99999 },
  { id: 'opt-saas-mvp', category: 'Web & App', name: 'SaaS MVP Development', baseCost: 149999 },

  // AI & Automation
  { id: 'opt-ai-bot', category: 'AI Services', name: 'AI Chatbot (Website & WhatsApp)', baseCost: 24999 },
  { id: 'opt-ai-auto', category: 'AI Services', name: 'AI Workflow Automation', baseCost: 49999 },

  // Digital Marketing
  { id: 'opt-mkt-pro', category: 'Marketing', name: 'Digital Marketing (Monthly)', baseCost: 24999, period: '/mo' },
  { id: 'opt-seo-pro', category: 'Marketing', name: 'SEO Professional (Monthly)', baseCost: 14999, period: '/mo' },
  { id: 'opt-gads-setup', category: 'Marketing', name: 'Google Ads Setup', baseCost: 7999 },

  // Maintenance
  { id: 'opt-maint-web', category: 'Maintenance', name: 'Website Maintenance', baseCost: 2999, period: '/mo' },
  { id: 'opt-maint-app', category: 'Maintenance', name: 'Mobile App Maintenance', baseCost: 7999, period: '/mo' }
];

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({ onNavigateToContact }) => {
  const { showToast } = useToast();
  const { currentUser, openAuthModal } = useAuth();
  const { t, language } = useLanguage();

  const [selectedIds, setSelectedIds] = useState<string[]>(['opt-web-biz', 'opt-ai-bot']);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedOptions = ESTIMATE_OPTIONS.filter((opt) => selectedIds.includes(opt.id));

  const totalOneTime = selectedOptions
    .filter((o) => !o.period)
    .reduce((sum, o) => sum + o.baseCost, 0);

  const totalMonthly = selectedOptions
    .filter((o) => o.period)
    .reduce((sum, o) => sum + o.baseCost, 0);

  const formatRupee = (amount: number) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  const generateEstimateText = () => {
    if (selectedOptions.length === 0) return '';
    const names = selectedOptions.map((o) => `• ${o.name} (${formatRupee(o.baseCost)}${o.period || ''})`).join('\n');
    return `MUCO LABS - PROJECT ESTIMATE\n----------------------------\nSelected Services:\n${names}\n\nEstimated One-Time: ${formatRupee(totalOneTime)}\nEstimated Recurring: ${formatRupee(totalMonthly)}/mo\nDate: ${new Date().toLocaleDateString('en-IN')}\n\nCommercial Terms: Unless otherwise agreed in the written project proposal or agreement, custom projects require a 50% advance payment before project commencement, with the remaining balance billed according to agreed milestones.\n\nReach out to MUCO Labs (Erode, TN) at +91 6381809844 or contact@mucolabs.in`;
  };

  const handleCopyBreakdown = () => {
    const text = generateEstimateText();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast('Itemized estimate copied to clipboard!', 'success', 'Copied');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSaveToAccount = async () => {
    if (!currentUser) {
      showToast('Please sign in to save your quote to your account.', 'info', 'Sign In Required');
      openAuthModal('signin');
      return;
    }

    setIsSaving(true);
    try {
      const summary = selectedOptions.map((o) => `${o.name} (${formatRupee(o.baseCost)}${o.period || ''})`).join(', ');
      await saveEstimatorSession({
        userId: currentUser.uid,
        selectedOptions: summary,
        totalOneTime,
        totalMonthly,
        notes: `Saved on ${new Date().toLocaleDateString('en-IN')}`
      });
      showToast('Quote saved to your MUCO account dashboard!', 'success', 'Saved');
    } catch (err: unknown) {
      showToast('Could not save quote. Please try again.', 'error', 'Error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrintQuote = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const itemsHtml = selectedOptions
      .map(
        (o) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">${o.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${o.category}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 700;">${formatRupee(o.baseCost)}${o.period || ''}</td>
      </tr>
    `
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>MUCO Labs - Quotation Estimate</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: auto; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #0f172a; }
          .badge { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { text-align: left; padding: 12px; background: #f8fafc; border-bottom: 2px solid #cbd5e1; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .totals { background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 30px; }
          .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 16px; }
          .grand-total { font-size: 20px; font-weight: 800; border-top: 1px solid #cbd5e1; padding-top: 10px; margin-top: 6px; color: #c2410c; }
          .commercial-notice { font-size: 12px; line-height: 1.6; background: #fff7ed; border: 1px solid #fed7aa; padding: 12px; border-radius: 8px; margin-bottom: 20px; color: #9a3412; }
          .footer { font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">MUCO LABS</div>
            <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Software • Web • AI • Cloud Engineering</div>
            <div style="font-size: 12px; color: #64748b;">Erode, Tamil Nadu, India | +91 63818 09844</div>
          </div>
          <div style="text-align: right;">
            <span class="badge">OFFICIAL ESTIMATE</span>
            <div style="font-size: 12px; color: #64748b; margin-top: 6px;">Ref: ML-EST-${Date.now().toString().slice(-6)}</div>
            <div style="font-size: 12px; color: #64748b;">Date: ${new Date().toLocaleDateString('en-IN')}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Selected Module / Service</th>
              <th>Category</th>
              <th style="text-align: right;">Estimated Investment</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>One-Time Project Delivery:</span>
            <strong>${formatRupee(totalOneTime)}</strong>
          </div>
          ${
            totalMonthly > 0
              ? `
          <div class="total-row">
            <span>Recurring AMC & Cloud Support:</span>
            <strong>${formatRupee(totalMonthly)}/month</strong>
          </div>
          `
              : ''
          }
          <div class="total-row grand-total">
            <span>Estimated Total:</span>
            <span>${formatRupee(totalOneTime)} ${totalMonthly > 0 ? `+ ${formatRupee(totalMonthly)}/mo` : ''}</span>
          </div>
        </div>

        <div class="commercial-notice">
          <strong>Commercial Terms:</strong> Unless otherwise agreed in the written project proposal or agreement, custom projects require a 50% advance payment before project commencement, with the remaining balance billed according to agreed milestones.
        </div>

        <div class="footer">
          This estimate is for planning purposes based on client requirements. Official SLA and scope document will be provided upon onboarding.<br/>
          <strong>MUCO Labs</strong> &bull; contact@mucolabs.in &bull; mucolabs.in
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateEstimateText() || 'Hi MUCO Labs, I would like a custom project estimate.');
    window.open(`https://wa.me/916381809844?text=${text}`, '_blank');
  };

  const handleSendToForm = () => {
    onNavigateToContact(generateEstimateText());
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>{t.sections.estimatorTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Instant Project Estimator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {t.sections.estimatorSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700/80 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300 font-semibold">Guaranteed Upfront Pricing</span>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {ESTIMATE_OPTIONS.map((opt) => {
            const isSelected = selectedIds.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-500/10 ring-1 ring-orange-500/50'
                    : 'bg-slate-800/50 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-0.5">
                    {opt.category}
                  </span>
                  <span className="text-xs font-bold block text-white">{opt.name}</span>
                  <span className="text-xs font-extrabold text-orange-300 mt-1 block">
                    {formatRupee(opt.baseCost)}
                    {opt.period}
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-orange-500 border-orange-400 text-white' : 'border-slate-600 bg-slate-900/60'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* 50% Advance Commercial Callout */}
        <div className="p-4 rounded-2xl bg-orange-950/30 border border-orange-500/30 flex items-start gap-3 mb-6">
          <CreditCard className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-200 leading-relaxed">
            <strong className="text-orange-400">Payment Standard:</strong> {t.common.paymentTermNotice}
          </p>
        </div>

        {/* Summary Footer */}
        <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-center md:text-left w-full md:w-auto">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Estimated One-Time
              </span>
              <span className="text-2xl font-black text-white">{formatRupee(totalOneTime)}</span>
            </div>
            {totalMonthly > 0 && (
              <div className="border-l border-slate-700 pl-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Estimated Recurring
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  {formatRupee(totalMonthly)}
                  <span className="text-xs text-slate-400 font-normal">/mo</span>
                </span>
              </div>
            )}
            <div className="hidden lg:block border-l border-slate-700 pl-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Selected Items
              </span>
              <span className="text-sm font-semibold text-orange-300">
                {selectedOptions.length} Service{selectedOptions.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={handleSaveToAccount}
              disabled={selectedOptions.length === 0 || isSaving}
              title="Save quote to your account dashboard"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-700/80 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold text-xs py-3 px-3.5 rounded-xl transition-all border border-slate-600 cursor-pointer"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin text-orange-400" /> : <Bookmark className="w-4 h-4 text-orange-400" />}
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={handleCopyBreakdown}
              disabled={selectedOptions.length === 0}
              title="Copy estimate breakdown to clipboard"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-700/80 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold text-xs py-3 px-3.5 rounded-xl transition-all border border-slate-600 cursor-pointer"
            >
              {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrintQuote}
              disabled={selectedOptions.length === 0}
              title="Download or print formal quotation PDF"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-700/80 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold text-xs py-3 px-3.5 rounded-xl transition-all border border-slate-600 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-orange-400" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={selectedOptions.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleSendToForm}
              disabled={selectedOptions.length === 0}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-50 text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{t.common.sendRfp}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
