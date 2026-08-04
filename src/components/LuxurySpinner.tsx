import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown } from 'lucide-react';

interface LuxurySpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  fullScreenOverlay?: boolean;
}

export const LuxurySpinner: React.FC<LuxurySpinnerProps> = ({
  label = 'Loading MUCO Architecture...',
  size = 'md',
  fullScreenOverlay = false,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    fullscreen: 'w-20 h-20',
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Outer concentric golden glowing spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - Clockwise */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          className={`${sizeClasses[size]} rounded-full border-2 border-transparent border-t-amber-400 border-r-amber-600/40 border-b-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.25)]`}
        />

        {/* Inner Ring - Counter Clockwise */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-amber-300 border-l-amber-500/50 shadow-[0_0_15px_rgba(217,119,6,0.3)]"
        />

        {/* Central Pulsing Crown Core */}
        <motion.div
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/40 border border-amber-200/50">
            <Crown className="w-4 h-4 text-slate-950" />
          </div>
        </motion.div>

        {/* Ambient Sparkles around perimeter */}
        <motion.div
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300/30" />
        </motion.div>
      </div>

      {/* Luxury Label & Subtitle */}
      {label && (
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="text-center space-y-1"
        >
          <p className="text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            {label}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>MUCO Labs Enterprise</span>
          </div>
        </motion.div>
      )}
    </div>
  );

  if (fullScreenOverlay) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md"
      >
        <div className="bg-slate-900/90 border border-amber-500/30 p-8 rounded-3xl shadow-2xl shadow-amber-500/10 max-w-sm w-full mx-4 text-center border-amber-400/20">
          {spinnerContent}
        </div>
      </motion.div>
    );
  }

  return spinnerContent;
};
