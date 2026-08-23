import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Activity, Terminal, Zap, Sparkles, Compass } from 'lucide-react';

export interface ModernLoadingScreenProps {
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  fullScreenOverlay?: boolean;
  showTelemetry?: boolean;
  showProgress?: boolean;
  variant?: 'broed' | 'cyber' | 'minimal' | 'glass';
  className?: string;
}

const BROED_CYBER_MESSAGES = [
  'MUCO ARCHITECTURE // INITIALIZING',
  'SYNCHRONIZING DISTRIBUTED CLOUD EDGE',
  'CRAFTING HIGH-IMPACT EXPERIENCES',
  'OPTIMIZING CLIENT GRAPHICS RUNTIME',
  'EXPERIENCE READY // ENTERING'
];

export const ModernLoadingScreen: React.FC<ModernLoadingScreenProps> = ({
  label = 'Loading MUCO Architecture...',
  sublabel,
  size = 'md',
  fullScreenOverlay = false,
  showTelemetry = true,
  showProgress = true,
  variant = 'broed',
  className = '',
}) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(14);

  // Smooth numeric counter progression & statement cycling
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % BROED_CYBER_MESSAGES.length);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 24;
        const jump = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + jump, 99);
      });
    }, 600);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // Inline Compact Spinner for small containers (e.g. data tables, buttons)
  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* Outer glowing cyan ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-500/40"
          />
          {/* Inner pulsating core */}
          <motion.div
            animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          />
        </div>
        {label && (
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide font-mono">
            {label}
          </span>
        )}
      </div>
    );
  }

  // Broed-Inspired Editorial Visual Loader (Awwwards Style)
  const isBroedStyle = variant === 'broed' || size === 'lg' || size === 'fullscreen';

  const spinnerVisual = isBroedStyle ? (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Top Architectural Coordinate Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-slate-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span>MUCO LABS</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 dark:text-slate-400 font-mono">SOTD EDITION</span>
      </div>

      {/* Giant Typography Counter Display */}
      <div className="relative my-2 sm:my-3">
        <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />
        <div className="relative font-mono font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
          {progress < 10 ? `0${progress}` : progress}
          <span className="text-2xl sm:text-4xl text-cyan-500 dark:text-cyan-400 ml-1 font-sans font-light">
            %
          </span>
        </div>
      </div>

      {/* Kinetic Word/Statement Mask (Broed Typography Animation) */}
      <div className="h-6 sm:h-7 overflow-hidden flex items-center justify-center my-1.5 max-w-sm px-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={sublabel || msgIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{sublabel || BROED_CYBER_MESSAGES[msgIndex]}</span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Label */}
      <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 tracking-wide mt-1">
        {label}
      </h3>

      {/* Minimal Precision Progress Bar */}
      {showProgress && (
        <div className="w-full max-w-xs mx-auto space-y-1.5 pt-3">
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-300/40 dark:border-slate-700/60 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut', duration: 0.35 }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 px-0.5">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              DYNAMIC STREAM
            </span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{progress}%</span>
          </div>
        </div>
      )}

      {/* Telemetry Status Strip (for large views) */}
      {showTelemetry && (size === 'lg' || size === 'fullscreen') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pt-5 grid grid-cols-3 gap-2 text-left max-w-sm w-full"
        >
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
              <Cpu className="w-3 h-3 text-blue-400" />
              Latency
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">10ms Fast</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Security
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">TLS 1.3</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
              <Compass className="w-3 h-3 text-purple-400" />
              Node
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">Edge 01</span>
          </div>
        </motion.div>
      )}
    </div>
  ) : (
    /* Standard Modern Cyber Spinner */
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-36 h-36 rounded-full bg-cyan-500/20 blur-xl pointer-events-none animate-pulse" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          className="w-20 h-20 rounded-full border border-dashed border-cyan-500/40 dark:border-cyan-400/30 flex items-center justify-center"
        >
          <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          className="absolute w-14 h-14 rounded-full border-2 border-transparent border-t-cyan-400 border-b-blue-500 shadow-sm"
        />
        <div className="absolute w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs">
          M
        </div>
      </div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{label}</h3>
      {sublabel && (
        <p className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-1 uppercase">
          {sublabel}
        </p>
      )}
    </div>
  );

  // Full Screen Glassmorphic Backdrop Overlay
  if (fullScreenOverlay) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-2xl px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative max-w-md w-full p-8 sm:p-10 rounded-3xl bg-slate-900/90 dark:bg-[#080d1a]/95 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.18)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          {spinnerVisual}
        </motion.div>
      </motion.div>
    );
  }

  return spinnerVisual;
};

// Aliased export for 100% backward compatibility
export const LuxurySpinner = ModernLoadingScreen;
