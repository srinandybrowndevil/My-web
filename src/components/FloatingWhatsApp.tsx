import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { openWhatsApp, WHATSAPP_NUMBER } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  currentPage: PageId;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');

  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'services': return 'Software Services';
      case 'pricing': return 'Pricing & Estimates';
      case 'portfolio': return 'Client Portfolio';
      case 'about': return 'About MUCO Labs';
      case 'contact': return 'Contact & Proposals';
      case 'blog': return 'Blog & Tech Articles';
      case 'apps': return 'App Studio & Publishing';
      case 'maintenance': return 'Cloud & AMC Maintenance';
      default: return 'General Inquiries';
    }
  };

  const pageTitle = getPageTitle(currentPage);

  const handleQuickSend = (serviceName?: string) => {
    openWhatsApp({
      pageName: pageTitle,
      serviceName: serviceName,
      customMessage: customText.trim() ? customText : undefined
    });
    setIsOpen(false);
    setCustomText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Quick Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-fadeIn">
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/20">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>MUCO Labs WhatsApp</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">Online</span>
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Instant Support • Founder Srinivash M.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Context Prompt */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Current Context: {pageTitle}</span>
            </div>
            <p className="text-[11px] text-emerald-700/90 dark:text-emerald-300/90 leading-snug">
              Clicking below will launch WhatsApp with a pre-formatted message tailored to <strong>{pageTitle}</strong>.
            </p>
          </div>

          {/* Quick Templates */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Quick Inquiry Templates:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                `Website Development Inquiry`,
                `Mobile App Development Quote`,
                `AI Chatbot & Automation Demo`,
                `Cloud Service Management / AMC`
              ].map((template) => (
                <button
                  key={template}
                  onClick={() => handleQuickSend(template)}
                  className="text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
                >
                  <span>{template}</span>
                  <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Field */}
          <div className="space-y-2 pt-1">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type your custom query..."
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleQuickSend();
              }}
            />
            <button
              onClick={() => handleQuickSend()}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-4 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white dark:border-slate-900"
        title="Chat on WhatsApp with MUCO Labs"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full" />
      </button>
    </div>
  );
};
