import React, { useMemo } from 'react';

export const GlobalBackgroundLayer: React.FC = React.memo(() => {
  // Memoize floating particle coordinates so they never trigger recalculations on re-render
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      size: (i % 3) + 2, // 2px to 4px
      left: `${(i * 7 + 3) % 96}%`,
      top: `${(i * 11 + 5) % 92}%`,
      delay: `${(i % 5) * 1.2}s`,
      duration: `${12 + (i % 4) * 4}s`,
      color: i % 4 === 0 ? 'bg-cyan-400' : i % 4 === 1 ? 'bg-blue-500' : i % 4 === 2 ? 'bg-purple-400' : 'bg-amber-400'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transform-gpu will-change-transform">
      {/* High-Performance GPU-Accelerated Dynamic Glowing Aurora Glass Backgrounds */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-purple-600/10 dark:from-cyan-500/25 dark:via-blue-600/20 dark:to-purple-600/15 blur-[120px] transform-gpu animate-pulse duration-[10s]" />

      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-indigo-500/20 via-purple-500/15 to-pink-500/10 dark:from-indigo-500/25 dark:via-purple-500/20 dark:to-pink-500/15 blur-[130px] transform-gpu animate-pulse duration-[14s]" />

      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-emerald-500/15 to-blue-600/20 dark:from-cyan-500/20 dark:via-emerald-500/15 dark:to-blue-600/25 blur-[120px] transform-gpu animate-pulse duration-[12s]" />

      {/* Cyber Glass Ambient Center Refraction Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 via-cyan-400/10 to-indigo-500/5 blur-[140px] transform-gpu pointer-events-none" />

      {/* Modern Engineering Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] dark:bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.09] dark:opacity-[0.14]" />

      {/* Geometric Tech Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* Lightweight GPU Floating Glass Micro-Prism Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
            className={`${p.color} rounded-full opacity-60 transform-gpu animate-pulse shadow-[0_0_8px_currentColor]`}
          />
        ))}
      </div>

      {/* Low-Opacity Futuristic Enterprise HUD Decals */}
      <div className="absolute top-12 right-12 opacity-[0.03] dark:opacity-[0.06] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col items-end space-y-1">
        <span>MUCO_GLASS_CORE_V4.4</span>
        <span>SYS_STATUS // ACTIVE</span>
        <span>OPTICAL_DEPTH // ENHANCED</span>
      </div>

      <div className="absolute bottom-16 left-12 opacity-[0.03] dark:opacity-[0.06] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col space-y-1">
        <span>FROST_PRISM // 28PX_BLUR</span>
        <span>AI_AGENT_PIPELINE // OK</span>
      </div>

      {/* Concentric Tech SVG Rings */}
      <svg className="absolute top-1/4 left-10 w-80 h-80 opacity-[0.02] dark:opacity-[0.05] text-cyan-400" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" strokeWidth="1" />
      </svg>
    </div>
  );
});

GlobalBackgroundLayer.displayName = 'GlobalBackgroundLayer';

