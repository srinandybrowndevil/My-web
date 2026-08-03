import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '916381809844';
  const defaultMessage = encodeURIComponent('Hi MUCO Labs, I would like to inquire about your software and marketing services.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Quick Chat Popup Tooltip */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  ML
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
              </div>
              <div>
                <p className="font-semibold text-xs leading-none text-slate-900 dark:text-white">MUCO Labs Team</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">Online | Erode, TN</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            👋 Hello! Have a question about pricing, web development, or AI solutions? Chat directly with founder Srinivash Mahalingam on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-2.5 px-4 rounded-xl shadow-md transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 focus:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
        <span className="sr-only">Chat on WhatsApp</span>
      </button>
    </div>
  );
};
