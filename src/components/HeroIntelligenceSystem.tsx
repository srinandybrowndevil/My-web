import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Bot, Database, Zap, Activity, CheckCircle2, RefreshCw, Layers, ShieldCheck, Terminal } from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  category: string;
  status: 'ACTIVE' | 'OPTIMAL' | 'SYNCED';
  metric: string;
  icon: React.ElementType;
  x: number; // percentage
  y: number; // percentage
  details: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'signal',
    name: 'Multi-Channel Ingestion',
    category: 'INPUT LAYER',
    status: 'ACTIVE',
    metric: '1,420 req/s',
    icon: Activity,
    x: 15,
    y: 28,
    details: 'Streams web events, CRM leads, WhatsApp chats & REST webhooks into low-latency memory pipeline.'
  },
  {
    id: 'llm',
    name: 'Neural Reasoning Engine',
    category: 'INTELLIGENCE',
    status: 'OPTIMAL',
    metric: '18ms latency',
    icon: Bot,
    x: 50,
    y: 20,
    details: 'Multi-modal Gemini & custom fine-tuned weights for intent extraction, classification & synthesis.'
  },
  {
    id: 'agents',
    name: 'Autonomous Agent Fleet',
    category: 'ORCHESTRATION',
    status: 'ACTIVE',
    metric: '100% execution',
    icon: Cpu,
    x: 85,
    y: 30,
    details: 'Self-healing async task workers resolving qualification, data transformation & scheduling.'
  },
  {
    id: 'knowledge',
    name: 'Enterprise Knowledge Graph',
    category: 'VECTOR STORE',
    status: 'SYNCED',
    metric: '99.98% recall',
    icon: Database,
    x: 30,
    y: 72,
    details: 'Hybrid vector + relational index with real-time permissions & sub-5ms semantic retrieval.'
  },
  {
    id: 'dispatch',
    name: 'Production Dispatch Hub',
    category: 'OUTCOME',
    status: 'ACTIVE',
    metric: 'Zero-drop SLA',
    icon: Zap,
    x: 70,
    y: 75,
    details: 'Automated CRM sync, instant notification dispatch, ERP record updates & analytics.'
  }
];

export const HeroIntelligenceSystem: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SystemNode>(SYSTEM_NODES[1]);
  const [pulseCount, setPulseCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((p) => (p + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto rounded-3xl bg-slate-950/90 dark:bg-[#070c18]/95 border border-cyan-500/30 p-4 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden group select-none transition-all duration-500"
      style={{
        transform: `perspective(1000px) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
      }}
    >
      {/* Background Ambient Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40d_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40d_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry / Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono font-bold tracking-widest text-cyan-300 uppercase text-[11px]">
            MUCO INTELLIGENCE INFRASTRUCTURE // LIVE
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
          <span className="hidden sm:inline-flex items-center gap-1">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>TOPOLOGY: 5 NEURAL NODES</span>
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3 h-3" />
            <span>99.99% SYSTEM SLA</span>
          </span>
        </div>
      </div>

      {/* Interactive System Canvas */}
      <div className="relative h-72 sm:h-96 w-full rounded-2xl bg-slate-900/50 dark:bg-[#050811]/70 border border-slate-800/80 overflow-hidden">
        {/* Animated Connection Paths SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="systemLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Path: Ingestion -> LLM */}
          <line x1="15%" y1="28%" x2="50%" y2="20%" stroke="url(#systemLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
          {/* Path: LLM -> Agents */}
          <line x1="50%" y1="20%" x2="85%" y2="30%" stroke="url(#systemLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
          {/* Path: Ingestion -> Knowledge */}
          <line x1="15%" y1="28%" x2="30%" y2="72%" stroke="url(#systemLineGrad)" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Path: Knowledge -> LLM */}
          <line x1="30%" y1="72%" x2="50%" y2="20%" stroke="url(#systemLineGrad)" strokeWidth="2" strokeDasharray="6,4" />
          {/* Path: Agents -> Dispatch */}
          <line x1="85%" y1="30%" x2="70%" y2="75%" stroke="url(#systemLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
          {/* Path: Knowledge -> Dispatch */}
          <line x1="30%" y1="72%" x2="70%" y2="75%" stroke="url(#systemLineGrad)" strokeWidth="1.5" strokeOpacity="0.5" />

          {/* Moving Data Packet Dot */}
          <circle cx="50%" cy="20%" r="4" fill="#22d3ee" className="shadow-[0_0_12px_#22d3ee]">
            <animate attributeName="cx" values="15%;50%;85%;70%;30%;15%" dur="6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="28%;20%;30%;75%;72%;28%" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* System Nodes */}
        {SYSTEM_NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = activeNode.id === node.id;

          return (
            <motion.div
              key={node.id}
              onClick={() => setActiveNode(node)}
              whileHover={{ scale: 1.08 }}
              className={`absolute cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-2xl backdrop-blur-xl border ${
                isSelected
                  ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.45)] z-30 scale-105'
                  : 'bg-slate-900/80 border-slate-700/80 hover:border-cyan-500/60 z-20'
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-[9px] font-mono tracking-wider text-slate-400 uppercase leading-none">
                    {node.category}
                  </span>
                  <span className="block text-xs font-bold text-white tracking-tight leading-tight">
                    {node.name}
                  </span>
                </div>
              </div>

              {/* Node Metric Badge */}
              <div className="mt-1.5 flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-[10px] font-mono">
                <span className="text-emerald-400 font-bold">{node.metric}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Node Telemetry & Description Box */}
      <div className="relative z-10 mt-4 p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-extrabold">
                INSPECTOR // {activeNode.category}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
                {activeNode.status}
              </span>
            </div>
            <h4 className="text-sm font-black text-white">{activeNode.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mt-0.5">
              {activeNode.details}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <div className="text-right">
            <span className="block text-[10px] font-mono text-slate-400 uppercase">Throughput</span>
            <span className="text-xs font-mono font-bold text-cyan-300">{activeNode.metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
