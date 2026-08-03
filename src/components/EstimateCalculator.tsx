import React, { useState } from 'react';
import { Calculator, Check, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PageId } from '../types';

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
  const [selectedIds, setSelectedIds] = useState<string[]>(['opt-web-biz', 'opt-ai-bot']);

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
    const names = selectedOptions.map((o) => `${o.name} (${formatRupee(o.baseCost)}${o.period || ''})`).join(', ');
    return `Hi MUCO Labs! I calculated an estimate on your website for: ${names}. Total One-time: ${formatRupee(totalOneTime)}, Monthly: ${formatRupee(totalMonthly)}/mo. Please provide a formal quote.`;
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
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              Interactive Quote Builder
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Instant Estimate Calculator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select the services you need to calculate an instant estimated project investment.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700/80 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300 font-semibold">Guaranteed Transparent Pricing</span>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {ESTIMATE_OPTIONS.map((opt) => {
            const isSelected = selectedIds.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-500/50'
                    : 'bg-slate-800/50 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-0.5">
                    {opt.category}
                  </span>
                  <span className="text-xs font-bold block text-white">{opt.name}</span>
                  <span className="text-xs font-extrabold text-blue-300 mt-1 block">
                    {formatRupee(opt.baseCost)}
                    {opt.period}
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-600 bg-slate-900/60'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
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
              <span className="text-sm font-semibold text-blue-300">
                {selectedOptions.length} Service{selectedOptions.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleWhatsApp}
              disabled={selectedOptions.length === 0}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              WhatsApp Estimate
            </button>
            <button
              onClick={handleSendToForm}
              disabled={selectedOptions.length === 0}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md"
            >
              <span>Submit Formal RFP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
