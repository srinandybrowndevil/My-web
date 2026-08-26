import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  Brain, 
  Cpu, 
  Wrench, 
  Zap, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  Pause, 
  ArrowRight,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';
import { PageId } from '../types';

interface AiSystemFlowDiagramProps {
  onNavigate?: (page: PageId, customMsg?: string) => void;
}

interface FlowNode {
  id: string;
  step: string;
  label: string;
  title: string;
  role: string;
  icon: React.ElementType;
  color: string;
  activeBorder: string;
  bgGlow: string;
  description: string;
  inputPayload: string;
  operation: string;
  outputArtifact: string;
  telemetry: { label: string; value: string };
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'idea',
    step: '01',
    label: 'IDEA',
    title: 'Business Opportunity & Raw Input',
    role: 'Raw Unstructured Signal',
    icon: Lightbulb,
    color: 'text-amber-400',
    activeBorder: 'border-amber-500/80',
    bgGlow: 'from-amber-500/20 to-transparent',
    description: 'Incoming customer request, market demand, support ticket, or new operational requirement received across web, app, or WhatsApp.',
    inputPayload: '{ "source": "web_lead", "intent": "enterprise_automation", "budget": "tier_3" }',
    operation: 'Ingest raw intent via webhook & validate schema token payload.',
    outputArtifact: 'Validated Structured Event Payload',
    telemetry: { label: 'Ingest Rate', value: '1.2k req/sec' }
  },
  {
    id: 'intelligence',
    step: '02',
    label: 'INTELLIGENCE',
    title: 'Domain Intent & Context Parsing',
    role: 'Semantic Context Layer',
    icon: Brain,
    color: 'text-cyan-400',
    activeBorder: 'border-cyan-500/80',
    bgGlow: 'from-cyan-500/20 to-transparent',
    description: 'Semantic classification engine analyzes historical customer data, vectors, and domain constraints to determine the exact action protocol.',
    inputPayload: '{ "intent_vector": [0.892, 0.412, -0.103], "confidence": 0.994 }',
    operation: 'Vector cosine similarity match against private enterprise knowledge graph.',
    outputArtifact: 'Contextual Vector Match & Action Plan',
    telemetry: { label: 'Embedding Latency', value: '14ms' }
  },
  {
    id: 'ai-engine',
    step: '03',
    label: 'AI ENGINE',
    title: 'Neural Reasoning & Decision Logic',
    role: 'Multi-Agent LLM Core',
    icon: Cpu,
    color: 'text-blue-400',
    activeBorder: 'border-blue-500/80',
    bgGlow: 'from-blue-500/20 to-transparent',
    description: 'Multi-agent LLM cluster reasons over constraints, generates structured function call arguments, and performs strict safety validation.',
    inputPayload: '{ "agent": "finance_router_v3", "prompt_tokens": 482, "safety_score": 1.0 }',
    operation: 'Executes chain-of-thought verification with zero-data-retention security.',
    outputArtifact: 'Verified Deterministic Function Calls',
    telemetry: { label: 'Inference Speed', value: '92 tok/sec' }
  },
  {
    id: 'tools-apis',
    step: '04',
    label: 'TOOLS / APIS',
    title: 'API Tool Orchestration',
    role: 'External Microservice Connectors',
    icon: Wrench,
    color: 'text-indigo-400',
    activeBorder: 'border-indigo-500/80',
    bgGlow: 'from-indigo-500/20 to-transparent',
    description: 'Secure execution of third-party APIs, database transactions, OAuth services, and webhook triggers with automated retry logic.',
    inputPayload: '{ "tools": ["postgres_write", "stripe_invoice_gen", "sendgrid_api"] }',
    operation: 'Parallel dispatch across authenticated microservice connectors.',
    outputArtifact: 'Synchronized Transaction Receipts',
    telemetry: { label: 'API Success Rate', value: '99.98%' }
  },
  {
    id: 'automation',
    step: '05',
    label: 'AUTOMATION',
    title: 'Autonomous Execution Pipeline',
    role: 'Event-Driven Workflows',
    icon: Zap,
    color: 'text-emerald-400',
    activeBorder: 'border-emerald-500/80',
    bgGlow: 'from-emerald-500/20 to-transparent',
    description: 'Background cron and event listeners orchestrate document generation, CRM updates, customer notifications, and automated follow-ups.',
    inputPayload: '{ "pipeline_state": "executed", "lead_scored": 98, "calendar_booked": true }',
    operation: 'Self-healing asynchronous job queue with sub-50ms execution.',
    outputArtifact: 'Completed End-to-End Workflow Job',
    telemetry: { label: 'Workflow Duration', value: '62ms' }
  },
  {
    id: 'business-system',
    step: '06',
    label: 'BUSINESS SYSTEM',
    title: 'Internal Ledger & Core Database',
    role: 'Enterprise Core Integration',
    icon: Building2,
    color: 'text-purple-400',
    activeBorder: 'border-purple-500/80',
    bgGlow: 'from-purple-500/20 to-transparent',
    description: 'Data lands seamlessly in PostgreSQL, custom ERP, Google Sheets, or internal dashboards with audit logs and RBAC protection.',
    inputPayload: '{ "database": "cloud_sql_prod", "record_id": "MUCO-SYS-994", "status": "synced" }',
    operation: 'Atomic ACID transaction committed with immutable telemetry logging.',
    outputArtifact: 'Updated Single-Source-of-Truth Database',
    telemetry: { label: 'Storage Sync', value: 'Sub-second' }
  },
  {
    id: 'outcome',
    step: '07',
    label: 'OUTCOME',
    title: 'Commercial Value & Scaled Growth',
    role: 'Business Transformation Impact',
    icon: TrendingUp,
    color: 'text-green-400',
    activeBorder: 'border-green-500/80',
    bgGlow: 'from-green-500/20 to-transparent',
    description: 'Zero manual human data entry, instant customer response, increased conversion rates, and lower operational overhead.',
    inputPayload: '{ "hours_saved_weekly": 38.5, "conversion_lift": "+340%", "roi_multiple": "8.4x" }',
    operation: 'Real-time ROI realization and accelerated operational velocity.',
    outputArtifact: 'Verified Business Value & Measurable ROI',
    telemetry: { label: 'ROI Multiple', value: '8.4x' }
  }
];

export const AiSystemFlowDiagram: React.FC<AiSystemFlowDiagramProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % FLOW_NODES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeNode = FLOW_NODES[activeStepIndex];
  const ActiveIcon = activeNode.icon;

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
          <Activity className="w-3.5 h-3.5" />
          <span>SIGNATURE ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          THE INTELLIGENCE FLOW
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          How MUCO bridges raw business intent into autonomous software execution. Every step in the pipeline is engineered for sub-second speed, zero data leakage, and verified reliability.
        </p>
      </div>

      {/* Interactive System Flow Container */}
      <div className="bg-slate-900 dark:bg-[#070b16] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 blur-3xl pointer-events-none" />

        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM SIMULATION:
            </span>
            <span className="text-slate-300 font-semibold">
              Step {activeNode.step} of 07 — {activeNode.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? 'Pause Auto-Run' : 'Resume Auto-Run'}</span>
            </button>
          </div>
        </div>

        {/* FLOW TIMELINE STRIP (7 Interactive Nodes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {FLOW_NODES.map((node, index) => {
            const Icon = node.icon;
            const isActive = index === activeStepIndex;

            return (
              <button
                key={node.id}
                onClick={() => {
                  setActiveStepIndex(index);
                  setIsPlaying(false);
                }}
                className={`relative p-3.5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between h-28 group cursor-pointer border ${
                  isActive
                    ? `bg-slate-800/90 ${node.activeBorder} shadow-lg shadow-cyan-500/10 -translate-y-1`
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {node.step}
                  </span>
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? node.color : 'text-slate-400'}`} />
                </div>

                <div>
                  <span className={`text-[11px] font-black tracking-tight block ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {node.label}
                  </span>
                  <span className="text-[9px] text-slate-400 line-clamp-1">
                    {node.role}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeFlowIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b-2xl"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE NODE DEEP-DIVE INSPECTOR */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 items-stretch"
          >
            {/* Left Column: Architectural Explanation */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
                    <ActiveIcon className={`w-6 h-6 ${activeNode.color}`} />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                      STEP {activeNode.step} • {activeNode.label}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {activeNode.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeNode.description}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Core Pipeline Operation:
                    </span>
                    <p className="text-xs text-cyan-300 font-medium">
                      {activeNode.operation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
                    <span className="text-slate-400">Output Artifact:</span>
                    <span className="font-bold text-emerald-400 font-mono">{activeNode.outputArtifact}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>{activeNode.telemetry.label}:</span>
                  <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">{activeNode.telemetry.value}</span>
                </div>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('systems')}
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold text-xs group cursor-pointer"
                  >
                    <span>Deep Dive on AI Systems</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Real-Time JSON Telemetry Inspector */}
            <div className="lg:col-span-5 bg-black/80 rounded-2xl p-6 border border-cyan-500/30 flex flex-col justify-between font-mono text-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-[11px]">
                    <Terminal className="w-4 h-4" />
                    <span>EVENT_BUS_PAYLOAD.json</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    VERIFIED
                  </span>
                </div>

                <pre className="text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-900 overflow-x-auto text-[11px] leading-relaxed">
                  <code>{activeNode.inputPayload}</code>
                </pre>

                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Protocol:</span>
                    <span className="text-slate-200">gRPC / Sub-100ms TLS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security:</span>
                    <span className="text-emerald-400">Zero Data Retention (ZDR)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orchestration:</span>
                    <span className="text-cyan-400">Distributed Event Broker</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
                <span>MUCO AI STUDIO KERNEL v4.2</span>
                <span className="text-emerald-400">● LIVE RUNTIME</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
