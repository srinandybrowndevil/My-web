import React, { useMemo } from 'react';

export const GlobalBackgroundLayer: React.FC = React.memo(() => {
  // Memoize floating particle coordinates so they never trigger recalculations on re-render
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: (i % 3) + 2, // 2px to 4px
      left: `${(i * 8 + 4) % 94}%`,
      top: `${(i * 13 + 7) % 88}%`,
      delay: `${(i % 4) * 1.5}s`,
      duration: `${14 + (i % 3) * 5}s`,
      color: i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-blue-500' : 'bg-amber-400'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transform-gpu will-change-transform">
      {/* High-Performance GPU-Accelerated Subtle Glowing Gradient Backgrounds */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent dark:from-blue-600/20 dark:via-cyan-500/10 blur-2xl transform-gpu animate-pulse duration-[10s]" />

      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-indigo-600/10 via-purple-500/10 to-transparent dark:from-indigo-600/15 dark:via-purple-500/10 blur-2xl transform-gpu animate-pulse duration-[14s]" />

      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-transparent dark:from-cyan-500/10 dark:via-blue-600/15 blur-2xl transform-gpu animate-pulse duration-[12s]" />

      {/* Modern Engineering Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] dark:bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.10] dark:opacity-[0.15]" />

      {/* Geometric Tech Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* Lightweight GPU Floating Particles */}
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
            className={`${p.color} rounded-full opacity-50 transform-gpu animate-pulse`}
          />
        ))}
      </div>

      {/* Low-Opacity Futuristic Enterprise HUD Decals */}
      <div className="absolute top-12 right-12 opacity-[0.03] dark:opacity-[0.06] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col items-end space-y-1">
        <span>MUCO_CORE_V4.2</span>
        <span>SYS_STATUS // ACTIVE</span>
        <span>LATENCY &lt; 12MS</span>
      </div>

      <div className="absolute bottom-16 left-12 opacity-[0.03] dark:opacity-[0.06] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col space-y-1">
        <span>CLOUD_NODE_01 // SECURE</span>
        <span>AI_AGENT_PIPELINE // OK</span>
      </div>

      {/* Concentric Tech SVG Rings */}
      <svg className="absolute top-1/4 left-10 w-80 h-80 opacity-[0.02] dark:opacity-[0.04] text-cyan-500" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" strokeWidth="1" />
      </svg>
    </div>
  );
});

GlobalBackgroundLayer.displayName = 'GlobalBackgroundLayer';

