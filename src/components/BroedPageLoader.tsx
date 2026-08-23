import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

interface BroedPageLoaderProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum ms to display loader
  autoPlay?: boolean;
}

const BROED_STATEMENTS = [
  'MUCO LABS — INNOVATION STUDIO',
  'DIGITAL ARCHITECTURE & CLOUD INFRA',
  'CRAFTING HIGH-IMPACT EXPERIENCES',
  'ENGINEERING AT THE EDGE OF DESIGN',
  'EXPERIENCE READY // ENTER'
];

export const BroedPageLoader: React.FC<BroedPageLoaderProps> = ({
  onComplete,
  minDuration = 4200, // Cinematic 4.2s pacing so users can fully absorb the animation
  autoPlay = true
}) => {
  const [progress, setProgress] = useState(0);
  const [statementIndex, setStatementIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const startTime = performance.now();
    let animFrame: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / minDuration);
      
      // Smooth, deliberate S-curve progression for elegant slow counting
      // Using smooth cubic ease-in-out curve
      const easeProgress = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      
      const calculatedProgress = Math.min(100, Math.floor(easeProgress * 100));
      setProgress(calculatedProgress);

      // Statement switching based on progress milestones
      if (calculatedProgress < 22) {
        setStatementIndex(0);
      } else if (calculatedProgress < 48) {
        setStatementIndex(1);
      } else if (calculatedProgress < 74) {
        setStatementIndex(2);
      } else if (calculatedProgress < 96) {
        setStatementIndex(3);
      } else {
        setStatementIndex(4);
      }

      if (rawProgress < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setIsFinished(true);
        // Generous, deliberate pause at 100% so everyone can enjoy the completed state
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1200);
        }, 600);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animFrame);
  }, [autoPlay, minDuration, onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsFinished(true);
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  const columns = [0, 1, 2, 3, 4];

  return (
    <AnimatePresence>
      {!isExiting && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden font-sans">
          {/* Staggered Vertical Curtain Columns (Broed Split Architecture) */}
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
            {columns.map((colIndex) => (
              <motion.div
                key={colIndex}
                initial={{ y: '0%' }}
                animate={isExiting ? { y: '-100%' } : { y: '0%' }}
                transition={{
                  duration: 1.15,
                  ease: [0.76, 0, 0.24, 1],
                  delay: colIndex * 0.08
                }}
                className="h-full w-full bg-[#080b12] border-r border-white/[0.04] relative overflow-hidden"
              >
                {/* Subtle vertical architectural grid texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
              </motion.div>
            ))}
          </div>

          {/* Loader Overlay Contents */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 text-white pointer-events-auto"
          >
            {/* Top Bar: Brand, Year, and Coordinates */}
            <div className="flex items-center justify-between text-xs tracking-widest uppercase font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="font-extrabold text-white">MUCO LABS</span>
                <span className="hidden sm:inline text-slate-600">//</span>
                <span className="hidden sm:inline text-slate-500">DIGITAL ARCHITECTURE</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:flex items-center gap-1.5 text-slate-400">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>43.6532° N, 79.3832° W</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-cyan-300 font-bold">
                  2026 EDITION
                </span>
              </div>
            </div>

            {/* Center Typographic Display & Massive Counter (Broed Aesthetic) */}
            <div className="max-w-5xl mx-auto w-full text-center space-y-6 sm:space-y-8 my-auto">
              {/* Kinetic Statement Mask (Rotating Phrases) */}
              <div className="h-8 sm:h-10 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={statementIndex}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-extrabold tracking-[0.25em] uppercase text-cyan-400"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{BROED_STATEMENTS[statementIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Giant Numeric Counter (Broed Big Display Numerals) */}
              <div className="relative flex items-center justify-center">
                {/* Soft ambient center glow */}
                <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-amber-500/10 blur-[100px] pointer-events-none" />

                <div className="relative font-mono font-black text-7xl sm:text-9xl md:text-[14rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 select-none drop-shadow-2xl">
                  {progress < 10 ? `0${progress}` : progress}
                  <span className="text-3xl sm:text-5xl md:text-7xl text-cyan-400 ml-1 font-sans font-light">
                    %
                  </span>
                </div>
              </div>

              {/* High-Precision Linear Progress Track */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 shadow-[0_0_12px_#38bdf8]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>KERNEL INITIALIZATION</span>
                  </span>
                  <span className="text-cyan-400 font-bold tracking-wider">
                    {progress === 100 ? 'READY' : 'STREAMING...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: System Status & Interactive Skip Action */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">SYSTEM ARCHITECTURE:</span>
                <span className="text-white font-bold">V3.8 // ACTIVE</span>
              </div>

              <button
                type="button"
                onClick={handleSkip}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all text-[11px]"
              >
                <span>{isFinished ? 'Enter Studio' : 'Skip Intro'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
