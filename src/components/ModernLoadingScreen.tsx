import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Activity, Terminal, Zap, Sparkles } from 'lucide-react';

export interface ModernLoadingScreenProps {
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  fullScreenOverlay?: boolean;
  showTelemetry?: boolean;
  showProgress?: boolean;
  variant?: 'cyber' | 'minimal' | 'glass';
  className?: string;
}

const CYBER_MESSAGES = [
  'INITIALIZING SYSTEM ARCHITECTURE',
  'ESTABLISHING SECURE QUANTUM HANDSHAKE',
  'SYNCHRONIZING DISTRIBUTED EDGE NODES',
  'OPTIMIZING HIGH-PERFORMANCE ASSETS',
  'ENGINEERING EXPERIENCES TO PERFECTION'
];

export const ModernLoadingScreen: React.FC<ModernLoadingScreenProps> = ({
  label = 'Loading MUCO Architecture...',
  sublabel,
  size = 'md',
  fullScreenOverlay = false,
  showTelemetry = true,
  showProgress = true,
  className = '',
}) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(18);

  // Cycle through futuristic status telemetry messages
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % CYBER_MESSAGES.length);
    }, 2200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return 24;
        const jump = Math.floor(Math.random() * 14) + 6;
        return Math.min(prev + jump, 98);
      });
    }, 450);

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
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
            {label}
          </span>
        )}
      </div>
    );
  }

  // Medium / Large / Fullscreen Core Visual Engine
  const spinnerVisual = (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Central Quantum Reactor Hologram */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Ambient Radial Soft Glow */}
        <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-indigo-500/20 blur-2xl pointer-events-none animate-pulse" />

        {/* Outer Orbit HUD Ring - Segmented Dashed with Clockwise Rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className={`${
            size === 'lg' || size === 'fullscreen' ? 'w-32 h-32' : 'w-24 h-24'
          } rounded-full border border-dashed border-cyan-500/40 dark:border-cyan-400/30 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.15)]`}
        >
          {/* Orbital Satellite Node 1 */}
          <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          {/* Orbital Satellite Node 2 */}
          <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
        </motion.div>

        {/* Mid Ring - Counter-Clockwise High-Velocity Arc */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className={`absolute ${
            size === 'lg' || size === 'fullscreen' ? 'w-24 h-24' : 'w-18 h-18'
          } rounded-full border-2 border-transparent border-t-cyan-400 border-l-blue-500/60 border-b-indigo-500/30 shadow-[0_0_20px_rgba(34,211,238,0.35)]`}
        />

        {/* Inner Geometric Circuit Shield */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          className={`absolute ${
            size === 'lg' || size === 'fullscreen' ? 'w-16 h-16' : 'w-12 h-12'
          } rounded-xl border border-cyan-400/40 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center shadow-inner`}
        />

        {/* Central Pulsing MUCO Quantum Hub */}
        <motion.div
          animate={{
            scale: [0.92, 1.08, 0.92],
            boxShadow: [
              '0 0 15px rgba(6,182,212,0.4)',
              '0 0 35px rgba(6,182,212,0.8)',
              '0 0 15px rgba(6,182,212,0.4)'
            ]
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute z-10 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 flex items-center justify-center border border-cyan-200/60"
        >
          {/* Authentic MUCO Node Circuit Symbol */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-slate-950 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round"
          >
            <circle cx="12" cy="12" r="3" className="fill-slate-950 text-cyan-200" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
            <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Floating Sparkle Micro-Nodes */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute -top-3 -right-2 pointer-events-none"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.2, 0.9, 0.2], y: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute -bottom-2 -left-2 pointer-events-none"
        >
          <Zap className="w-3.5 h-3.5 text-blue-400" />
        </motion.div>
      </div>

      {/* Modern High-Tech Brand & Status Typography */}
      <div className="text-center space-y-3 max-w-sm px-4">
        {/* Brand pill with live ping node */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-slate-950/80 border border-cyan-500/30 text-cyan-400 text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span>MUCO LABS CORE</span>
          <span className="text-slate-500 dark:text-slate-600">•</span>
          <span className="text-slate-300 dark:text-slate-400 font-mono text-[10px]">v2.6.0</span>
        </div>

        {/* Main Title Label */}
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
          {label}
        </h3>

        {/* Dynamic Telemetry Cycling Status Subtitle */}
        <div className="h-5 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={sublabel || msgIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400/90 uppercase"
            >
              {sublabel || CYBER_MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Sleek Gradient Micro Progress Bar */}
        {showProgress && (
          <div className="w-full max-w-xs mx-auto space-y-1.5 pt-1">
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-300/40 dark:border-slate-700/60 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeInOut', duration: 0.4 }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 px-0.5">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                EDGE STREAM
              </span>
              <span className="font-bold text-cyan-500 dark:text-cyan-400">{progress}%</span>
            </div>
          </div>
        )}

        {/* Telemetry Status Strip (for large & fullscreen views) */}
        {showTelemetry && (size === 'lg' || size === 'fullscreen') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4 grid grid-cols-3 gap-2 text-left"
          >
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                <Cpu className="w-3 h-3 text-blue-400" />
                Latency
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">12ms Edge</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Security
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">256-Bit TLS</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                <Terminal className="w-3 h-3 text-purple-400" />
                Cluster
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">99.98% SLA</span>
            </div>
          </motion.div>
        )}
      </div>
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-2xl px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative max-w-md w-full p-8 sm:p-10 rounded-3xl bg-slate-900/90 dark:bg-[#080d1a]/95 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.18)] overflow-hidden"
        >
          {/* Top Decorative Border Accent */}
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
