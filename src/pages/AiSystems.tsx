import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Lock,
  Workflow,
  Server
} from 'lucide-react';
import { PageId } from '../types';
import { HeroIntelligenceSystem } from '../components/HeroIntelligenceSystem';
import { InteractiveAutomationWorkflow } from '../components/InteractiveAutomationWorkflow';
import { MoseyRoleSelector } from '../components/MoseyRoleSelector';

interface AiSystemsProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

export const AiSystems: React.FC<AiSystemsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'agents' | 'rag' | 'security'>('agents');

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
          <Cpu className="w-3.5 h-3.5" />
          <span>PROPRIETARY INTELLIGENCE STACK</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
          Autonomous AI & <br />
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Neural Workflow Systems.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          We architect private LLM orchestrations, RAG vector search engines, and self-healing autonomous agent fleets that integrate directly into your existing databases and enterprise software.
        </p>

        {/* Live Interactive Hero Canvas */}
        <div className="pt-8">
          <HeroIntelligenceSystem />
        </div>
      </section>

      {/* Role Selector Matrix */}
      <MoseyRoleSelector onNavigate={onNavigate} variant="full" />

      {/* Live Automation Simulation Showcase */}
      <InteractiveAutomationWorkflow onNavigate={onNavigate} />

      {/* Architecture Deep Dive Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            CORE SYSTEM MODULES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered For Zero Data Leakage.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'agents'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            01 // Autonomous Agents
          </button>
          <button
            onClick={() => setActiveTab('rag')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rag'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            02 // Hybrid RAG & Vector
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            03 // Private VPC Security
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-cyan-500/30 text-slate-200 space-y-6">
          {activeTab === 'agents' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">Multi-Agent Swarm Orchestration</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Rather than relying on a single generic prompt, MUCO deploys specialized micro-agents: Ingestion Worker, Classifier Agent, Extraction Agent, and Verification Agent. If one step fails, the system auto-recovers without human intervention.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Real-time WhatsApp & Webhook event listeners</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Self-correcting JSON extraction schemas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Automated fallback to human supervisor when confidence &lt; 90%</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#060913] border border-slate-800 font-mono text-xs text-cyan-300 space-y-2">
                <span className="text-slate-500">// AGENT ORCHESTRATION PIPELINE</span>
                <p>➔ POST /api/v1/webhook/event [CAPTURED]</p>
                <p>➔ IntentClassifier.eval(payload) → 'ENTERPRISE_QUOTE' [18ms]</p>
                <p>➔ SchemaValidator.enforce(data) → OK [4ms]</p>
                <p>➔ DatabaseWorker.sync() → SQLite + Cloud SQL [12ms]</p>
                <p className="text-emerald-400">✔ PIPELINE STATUS: 100% SUCCESSFUL</p>
              </div>
            </div>
          )}

          {activeTab === 'rag' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">Hybrid Semantic RAG & Vector Memory</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We index your internal company documents, PDF catalogs, order histories, and technical specifications into high-dimensional vector embeddings with sub-5ms cosine similarity lookups.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Zero hallucinations: Answers grounded exclusively in verified docs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Dynamic chunking and multi-query retrieval strategies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Direct citation linking with exact source page numbers</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#060913] border border-slate-800 font-mono text-xs text-cyan-300 space-y-2">
                <span className="text-slate-500">// VECTOR RETRIEVAL TEST BENCH</span>
                <p>➔ Embedding: text-embedding-004 (768 dimensions)</p>
                <p>➔ Query: "Warranty policy for textile motor model 800X"</p>
                <p>➔ Matches: 3 chunks retrieved (Similarity: 0.942, 0.918, 0.884)</p>
                <p className="text-emerald-400">✔ Grounded Context Verified. Hallucination Risk: 0.00%</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">Private VPC & Zero Data Retention</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your company's proprietary data is never used to train public foundation models. We deploy on isolated Virtual Private Clouds (VPC) with AES-256 encryption at rest and in transit.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Zero-retention agreements with AI cloud providers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Role-Based Access Control (RBAC) & audit logging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>On-premise or dedicated private cloud deployment options</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#060913] border border-slate-800 font-mono text-xs text-emerald-400 space-y-2">
                <span className="text-slate-500">// SECURITY AUDIT LOG</span>
                <p>✔ TLS 1.3 End-to-End Encryption: ACTIVE</p>
                <p>✔ IAM Role Validation: PASSED (Zero Unauthorized Leaks)</p>
                <p>✔ Model Training Opt-Out: ENFORCED</p>
                <p className="text-cyan-300">✔ ISO/SOC2 Compliance Ready Infrastructure</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Deploy Custom Intelligence For Your Enterprise.
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Schedule a 30-minute architecture review with our AI engineering team.
        </p>
        <button
          onClick={() => onNavigate('contact', 'Request Enterprise AI Architecture Consultation')}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-xl shadow-cyan-500/25 hover:from-cyan-400 cursor-pointer"
        >
          <span>Schedule Architecture Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
