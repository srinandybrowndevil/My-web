import React from 'react';
import { MessageCircle, PhoneCall, Calculator, Search } from 'lucide-react';
import { PageId } from '../types';
import { openWhatsApp } from '../utils/whatsapp';

interface MobileQuickActionBarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
  onOpenSchedule?: () => void;
  onOpenScheduleCall?: () => void;
}

export const MobileQuickActionBar: React.FC<MobileQuickActionBarProps> = ({
  currentPage,
  onNavigate,
  onOpenSchedule,
  onOpenScheduleCall
}) => {
  const handleWhatsAppClick = () => {
    openWhatsApp({
      customMessage:
        'Hi MUCO Labs! I am browsing your website on mobile and would like to discuss a new software/web/AI project.'
    });
  };

  const handleSearchClick = () => {
    // Trigger the Cmd+K event
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true
      })
    );
  };

  const triggerScheduleModal = onOpenSchedule || onOpenScheduleCall;

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 px-3 py-2 shadow-2xl safe-area-pb"
    >
      <div className="flex items-center justify-around gap-1.5 max-w-md mx-auto">
        {/* WhatsApp Quick Connect */}
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 active:scale-95 transition-all text-[11px] font-semibold"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span>WhatsApp</span>
        </button>

        {/* Book Consultation Call */}
        <button
          onClick={() => {
            if (triggerScheduleModal) {
              triggerScheduleModal();
            } else {
              onNavigate('contact', 'I would like to schedule a 15-minute consultation call.');
            }
          }}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-400 hover:bg-blue-900/50 active:scale-95 transition-all text-[11px] font-semibold"
          aria-label="Schedule Consultation Call"
        >
          <PhoneCall className="w-4 h-4 mb-0.5" />
          <span>Book Call</span>
        </button>

        {/* Instant Estimate */}
        <button
          onClick={() => onNavigate('pricing', undefined, '#calculator')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 hover:bg-amber-900/50 active:scale-95 transition-all text-[11px] font-semibold"
          aria-label="Calculate Estimate"
        >
          <Calculator className="w-4 h-4 mb-0.5" />
          <span>Estimate</span>
        </button>

        {/* Quick Search */}
        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white active:scale-95 transition-all text-[11px] font-semibold"
          aria-label="Search Services & Projects"
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span>Search</span>
        </button>
      </div>
    </aside>
  );
};
