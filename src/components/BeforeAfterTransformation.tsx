import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XCircle,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Server,
  Layers,
  BarChart3
} from 'lucide-react';

interface TransformationItem {
  id: string;
  category: string;
  before: {
    title: string;
    metrics: string;
    points: string[];
    statusColor: string;
  };
  after: {
    title: string;
    metrics: string;
    points: string[];
    statusColor: string;
  };
  improvementStat: string;
  impactLabel: string;
  iconName: string;
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'ai-automation',
    category: 'AI & Automation',
    iconName: 'Bot',
    before: {
      title: 'Manual & Error-Prone Workflows',
      metrics: '40+ hrs/wk spent on repetitive tasks',
      points: [
        'Slow manual data entry & document processing',
        'Inconsistent customer query response times (>24 hrs)',
        'High operational overhead and human error rates'
      ],
      statusColor: 'border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400'
    },
    after: {
      title: 'Intelligent AI Agent Workflows',
      metrics: 'Instant response & 90% time savings',
      points: [
        'Autonomous AI agents processing documents 24/7',
        'Sub-second AI customer support & inquiry response',
        'Zero manual errors with automated validation'
      ],
      statusColor: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
    },
    improvementStat: '10x Faster',
    impactLabel: 'Execution Velocity'
  },
  {
    id: 'cloud-infrastructure',
    category: 'Cloud Engineering',
    iconName: 'Cloud',
    before: {
      title: 'Monolithic On-Prem Servers',
      metrics: '98.5% uptime with frequent outages',
      points: [
        'High hardware maintenance and server costs',
        'Inability to scale during peak user demand',
        'Lack of disaster recovery & zero redundancy'
      ],
      statusColor: 'border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400'
    },
    after: {
      title: 'Serverless Multi-Cloud Architecture',
      metrics: '99.99% Guaranteed SLA Uptime',
      points: [
        'Auto-scaling Kubernetes & microservices clusters',
        'Pay-per-use cloud cost reduction up to 45%',
        'Automated real-time multi-region failover'
      ],
      statusColor: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400'
    },
    improvementStat: '99.99%',
    impactLabel: 'Global Reliability'
  },
  {
    id: 'user-experience',
    category: 'Web & App Design',
    iconName: 'Layout',
    before: {
      title: 'Cluttered & Dated User Interface',
      metrics: '6.2s load time & 68% bounce rate',
      points: [
        'Non-responsive layout breaking on mobile screens',
        'Low conversion rates due to confusing user journeys',
        'High customer drop-off at checkout & signup'
      ],
      statusColor: 'border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400'
    },
    after: {
      title: 'High-Converting Modern UX/UI',
      metrics: '0.8s load speed & 3.4x conversions',
      points: [
        'Desktop-to-mobile ultra-fluid reactive design',
        'Seamless micro-interactions with high visual trust',
        'Optimized funnel resulting in record conversion rates'
      ],
      statusColor: 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400'
    },
    improvementStat: '+340%',
    impactLabel: 'User Conversion'
  },
  {
    id: 'cybersecurity',
    category: 'Enterprise Security',
    iconName: 'Shield',
    before: {
      title: 'Basic Security & Risk Exposures',
      metrics: 'Vulnerable to zero-day threats',
      points: [
        'Unencrypted payload transmissions across APIs',
        'Manual access management without OAuth 2.0 / RBAC',
        'Compliance audit risks and security gaps'
      ],
      statusColor: 'border-orange-500/30 bg-orange-500/5 text-orange-600 dark:text-orange-400'
    },
    after: {
      title: 'Zero-Trust Cyber Defense',
      metrics: 'SOC2 & ISO Compliant Security',
      points: [
        'End-to-end AES-256 encryption for data at rest & transit',
        'Multi-factor authentication & granular role permissions',
        'Continuous AI threat detection & penetration auditing'
      ],
      statusColor: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
    },
    improvementStat: '100%',
    impactLabel: 'Data Protection'
  }
];

export const BeforeAfterTransformation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ai-automation');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const selectedTransformation = TRANSFORMATIONS.find(t => t.id === activeTab) || TRANSFORMATIONS[0];

  return (
    <div className="bg-slate-900/90 dark:bg-slate-950/90 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Proven Enterprise Impact</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          The MUCO Labs Digital Transformation
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
          See how replacing legacy systems with our AI, Cloud, and Software solutions transforms business efficiency and drives exponential revenue growth.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-10">
        {TRANSFORMATIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
            }`}
          >
            <span>{item.category}</span>
          </button>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* BEFORE CARD */}
        <motion.div
          key={`before-${selectedTransformation.id}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-red-500/30 shadow-lg relative flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                Before MUCO Labs
              </span>
              <span className="text-xs font-extrabold text-slate-400">Legacy State</span>
            </div>

            <h3 className="text-lg font-black text-white mb-2">
              {selectedTransformation.before.title}
            </h3>

            <p className="text-xs font-semibold text-red-400 mb-4 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
              ⚠️ {selectedTransformation.before.metrics}
            </p>

            <ul className="space-y-3">
              {selectedTransformation.before.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
            Hindered growth & high operational friction
          </div>
        </motion.div>

        {/* METRIC BADGE CENTER DIVIDER */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-4 py-4 lg:py-0">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-center shadow-xl border border-cyan-400/40 w-full max-w-[180px]">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-200 block mb-1">
              {selectedTransformation.impactLabel}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white block">
              {selectedTransformation.improvementStat}
            </span>
            <span className="text-[10px] text-blue-100 font-bold block mt-1">
              Accelerated Impact
            </span>
          </div>

          <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-cyan-400">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* AFTER CARD */}
        <motion.div
          key={`after-${selectedTransformation.id}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 bg-slate-950/90 rounded-2xl p-6 border border-emerald-500/40 shadow-xl relative flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                After MUCO Labs
              </span>
              <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current" /> Future Ready
              </span>
            </div>

            <h3 className="text-lg font-black text-white mb-2">
              {selectedTransformation.after.title}
            </h3>

            <p className="text-xs font-semibold text-emerald-400 mb-4 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
              🚀 {selectedTransformation.after.metrics}
            </p>

            <ul className="space-y-3">
              {selectedTransformation.after.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-emerald-400 font-extrabold">
            Automated, scalable, and built for peak performance
          </div>
        </motion.div>
      </div>

      {/* INTERACTIVE COMPARISON SLIDER SHOWCASE */}
      <div className="mt-12 pt-8 border-t border-slate-800 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Interactive Efficiency Meter
            </h4>
          </div>
          <span className="text-xs font-bold text-cyan-400">
            {sliderPosition}% Modernization
          </span>
        </div>

        {/* Custom Range Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
          <span>0% (Legacy Operational Bottlenecks)</span>
          <span>50% (Partial Digitalization)</span>
          <span className="text-cyan-400 font-bold">100% (MUCO Labs Full AI & Cloud Stack)</span>
        </div>
      </div>
    </div>
  );
};
