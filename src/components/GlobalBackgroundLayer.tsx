import React, { useMemo } from 'react';

export const GlobalBackgroundLayer: React.FC = React.memo(() => {
  // Memoize floating particle coordinates so they never trigger recalculations on re-render
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: (i % 2) + 2, // 2px to 3px
      left: `${(i * 9 + 4) % 94}%`,
      top: `${(i * 13 + 7) % 90}%`,
      color: i % 3 === 0 ? 'bg-cyan-400/50' : i % 3 === 1 ? 'bg-blue-500/40' : 'bg-amber-400/40'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transform-gpu">
      {/* High-Performance Hardware-Accelerated Static Radial Gradients (0% GPU Thrash / 0 Filter Repaints) */}
      <div 
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full pointer-events-none opacity-60 dark:opacity-75"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.18) 0%, rgba(37, 99, 235, 0.10) 45%, transparent 70%)'
        }}
      />

      <div 
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-50 dark:opacity-65"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.16) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 70%)'
        }}
      />

      <div 
        className="absolute -bottom-32 left-1/4 w-[650px] h-[650px] rounded-full pointer-events-none opacity-55 dark:opacity-70"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, rgba(16, 185, 129, 0.09) 45%, transparent 70%)'
        }}
      />

      {/* Cyber Ambient Center Refraction Flare */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-40 dark:opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(37, 99, 235, 0.04) 50%, transparent 75%)'
        }}
      />

      {/* Modern Engineering Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] dark:bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.06] dark:opacity-[0.10] pointer-events-none" />

      {/* Geometric Tech Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />

      {/* Lightweight GPU Floating Glass Micro-Prism Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
            className={`${p.color} rounded-full`}
          />
        ))}
      </div>

      {/* Low-Opacity Futuristic Enterprise HUD Decals */}
      <div className="absolute top-12 right-12 opacity-[0.03] dark:opacity-[0.06] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col items-end space-y-1 pointer-events-none">
        <span>MUCO_GLASS_CORE_V4.4</span>
        <span>SYS_STATUS // ACTIVE</span>
        <span>OPTICAL_DEPTH // ENHANCED</span>
      </div>

      <div className="absolute bottom-16 left-12 opacity-[0.03] dark:opacity-[0.06] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col space-y-1 pointer-events-none">
        <span>FROST_PRISM // HIGH_PERF</span>
        <span>AI_AGENT_PIPELINE // OK</span>
      </div>

      {/* Concentric Tech SVG Rings */}
      <svg className="absolute top-1/4 left-10 w-80 h-80 opacity-[0.02] dark:opacity-[0.04] text-cyan-400 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" strokeWidth="1" />
      </svg>
    </div>
  );
});

GlobalBackgroundLayer.displayName = 'GlobalBackgroundLayer';

