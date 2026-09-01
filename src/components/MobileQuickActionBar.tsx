import React, { useState } from 'react';
import { MessageCircle, PhoneCall, Calculator, Search, Home, Menu } from 'lucide-react';
import { PageId } from '../types';
import { openWhatsApp } from '../utils/whatsapp';

interface MobileQuickActionBarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
  onOpenSchedule?: () => void;
  onOpenScheduleCall?: () => void;
  onOpenMenu?: () => void;
}

interface QuickAction {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  bgColor: string;
  action: () => void;
  ariaLabel: string;
}

export const MobileQuickActionBar: React.FC<MobileQuickActionBarProps> = ({
  currentPage,
  onNavigate,
  onOpenSchedule,
  onOpenScheduleCall,
  onOpenMenu
}) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const triggerScheduleModal = onOpenSchedule || onOpenScheduleCall;

  // Haptic feedback for mobile devices
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // Light vibration for feedback
    }
  };

  const handleAction = (action: () => void, id: string) => {
    setActiveButton(id);
    triggerHapticFeedback();
    action();
    setTimeout(() => setActiveButton(null), 150);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-500/30 hover:bg-emerald-900/50',
      action: () => {
        openWhatsApp({
          path: currentPage,
          pageName: currentPage
        });
      },
      ariaLabel: 'Chat on WhatsApp'
    },
    {
      id: 'call',
      icon: PhoneCall,
      label: 'Book Call',
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/40 border-blue-500/30 hover:bg-blue-900/50',
      action: () => {
        if (triggerScheduleModal) {
          triggerScheduleModal();
        } else {
          onNavigate('contact', 'I would like to schedule a 15-minute consultation call.');
        }
      },
      ariaLabel: 'Schedule Consultation Call'
    },
    {
      id: 'estimate',
      icon: Calculator,
      label: 'Estimate',
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-500/30 hover:bg-amber-900/50',
      action: () => onNavigate('pricing', undefined, '#calculator'),
      ariaLabel: 'Calculate Estimate'
    },
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      color: 'text-slate-300',
      bgColor: 'bg-slate-900 border-slate-700/80 hover:bg-slate-800',
      action: () => window.dispatchEvent(new CustomEvent('openSearchModal')),
      ariaLabel: 'Search Services & Projects'
    }
  ];

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 px-2 py-2 shadow-2xl safe-area-pb"
    >
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const isActive = activeButton === action.id;
          
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action.action, action.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] rounded-xl border transition-all duration-150 ${action.bgColor} ${action.color} ${isActive ? 'scale-95' : 'active:scale-95'}`}
              aria-label={action.ariaLabel}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold leading-tight">{action.label}</span>
            </button>
          );
        })}

        {/* Home button for quick navigation */}
        <button
          onClick={() => handleAction(() => onNavigate('home'), 'home')}
          className={`flex flex-col items-center justify-center py-2 px-3 min-h-[60px] rounded-xl border transition-all duration-150 bg-slate-900 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white ${activeButton === 'home' ? 'scale-95' : 'active:scale-95'}`}
          aria-label="Go to Home"
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold leading-tight">Home</span>
        </button>

        {/* Menu button for quick access to full navigation */}
        {onOpenMenu && (
          <button
            onClick={() => handleAction(onOpenMenu, 'menu')}
            className={`flex flex-col items-center justify-center py-2 px-3 min-h-[60px] rounded-xl border transition-all duration-150 bg-orange-950/40 border-orange-500/30 text-orange-400 hover:bg-orange-900/50 ${activeButton === 'menu' ? 'scale-95' : 'active:scale-95'}`}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-semibold leading-tight">Menu</span>
          </button>
        )}
      </div>
    </aside>
  );
};
