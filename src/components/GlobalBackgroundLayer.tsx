import React from 'react';
import { motion } from 'framer-motion';

export const GlobalBackgroundLayer: React.FC = () => {
  // Generate 14 floating particle specs for subtle movement
  const particles = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 4) + 2, // 2px to 5px
    left: `${(i * 7 + 3) % 95}%`,
    top: `${(i * 11 + 5) % 90}%`,
    duration: 12 + (i % 5) * 4, // 12s to 28s
    delay: (i % 4) * 2,
    color: i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-blue-500' : 'bg-amber-400'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Animated Glowing Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent dark:from-blue-600/25 dark:via-cyan-500/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-indigo-600/10 via-purple-500/10 to-transparent dark:from-indigo-600/20 dark:via-purple-500/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.1, 0.95, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -bottom-32 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-transparent dark:from-cyan-500/15 dark:via-blue-600/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -25, 25, 0],
          y: [0, 25, -25, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-amber-500/10 via-orange-500/5 to-transparent dark:from-amber-500/10 dark:via-amber-600/10 blur-3xl"
      />

      {/* Modern Engineering Tech Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] dark:bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.12] dark:opacity-[0.18]" 
      />

      {/* Geometric Tech Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* Floating Futuristic Energy Nodes / Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              y: [-15, 15, -15],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
            className={`${p.color} rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)] opacity-60`}
          />
        ))}
      </div>

      {/* Subtle Low-Opacity Technology Decals */}
      <div className="absolute top-12 right-12 opacity-[0.03] dark:opacity-[0.07] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col items-end space-y-1">
        <span>MUCO_CORE_V4.2</span>
        <span>SYS_STATUS // ACTIVE</span>
        <span>LATENCY &lt; 12MS</span>
      </div>

      <div className="absolute bottom-16 left-12 opacity-[0.03] dark:opacity-[0.07] font-mono text-[10px] tracking-widest text-slate-900 dark:text-cyan-400 flex flex-col space-y-1">
        <span>CLOUD_NODE_01 // SECURE</span>
        <span>AI_AGENT_PIPELINE // OK</span>
        <span>ENCRYPTION // AES-256</span>
      </div>

      {/* Concentric Tech Rings (Top Center & Bottom Right) */}
      <svg className="absolute top-1/4 left-10 w-96 h-96 opacity-[0.02] dark:opacity-[0.05] text-cyan-500" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" strokeWidth="1" />
        <circle cx="100" cy="100" r="40" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>

      <svg className="absolute bottom-1/3 right-10 w-80 h-80 opacity-[0.02] dark:opacity-[0.05] text-blue-500" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="85" strokeWidth="1" />
        <circle cx="100" cy="100" r="60" strokeWidth="1" strokeDasharray="6 6" />
      </svg>
    </div>
  );
};
