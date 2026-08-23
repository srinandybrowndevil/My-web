import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Bot, 
  Database, 
  Mail, 
  Calendar, 
  BellRing, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Terminal
} from 'lucide-react';
import { PageId } from '../types';

interface WorkflowStep {
  id: string;
  number: string;
  title: string;
  action: string;
  icon: React.ElementType;
  outputPayload: {
    status: string;
    executionTime: string;
    data: Record<string, string>;
  };
  details: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Lead Arrives',
    action: 'Multi-Channel Ingestion',
    icon: UserPlus,
    outputPayload: {
      status: 'CAPTURED',
      executionTime: '4ms',
      data: {
        source: 'Website Form / WhatsApp API',
        contact: 'Enterprise Lead (Tech Co.)',
        budgetTier: 'Custom Enterprise Suite'
      }
    },
    details: 'Customer submits a quote request or initiates a WhatsApp conversation. Payload is instantly validated and signed.'
  },
  {
    id: 'step-2',
    number: '02',
    title: 'AI Qualifies Lead',
    action: 'Neural Intent Extraction',
    icon: Bot,
    outputPayload: {
      status: 'QUALIFIED_HIGH_PRIORITY',
      executionTime: '24ms',
      data: {
        fitScore: '98.5%',
        intent: 'Enterprise AI & Web App Modernization',
        extractedRequirements: 'Next.js Frontend, RAG Vector Search, Cloud SQL'
      }
    },
    details: 'Custom LLM classifies business intent, calculates lead score, extracts technical scope, and determines optimal routing.'
  },
  {
    id: 'step-3',
    number: '03',
    title: 'CRM Updated',
    action: 'Autonomous Record Sync',
    icon: Database,
    outputPayload: {
      status: 'RECORD_PERSISTED',
      executionTime: '12ms',
      data: {
        crmId: 'MUCO-DEAL-84920',
        stage: 'Qualified Opportunity',
        owner: 'Srinivash M. (Lead Architect)'
      }
    },
    details: 'Cloud database automatically provisions client workspace, updates Google Sheets ledger, and tags customer lifecycle state.'
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Proposal Generated',
    action: 'Context-Aware AI Drafting',
    icon: Mail,
    outputPayload: {
      status: 'DRAFT_RENDERED',
      executionTime: '38ms',
      data: {
        template: 'Custom Tech Architecture Scope',
        estimatedTimeline: '3 Weeks Delivery',
        deliveryFormat: 'Interactive PDF + Client Portal'
      }
    },
    details: 'Intelligence engine drafts a bespoke scope summary, technical roadmap, and pricing estimate ready for instant transmission.'
  },
  {
    id: 'step-5',
    number: '05',
    title: 'Meeting Scheduled',
    action: 'Calendar Intelligence',
    icon: Calendar,
    outputPayload: {
      status: 'CALENDAR_SLOT_HELD',
      executionTime: '8ms',
      data: {
        channel: 'Google Meet / WhatsApp Video',
        availableSlots: 'Tomorrow 10:30 AM / 3:00 PM IST',
        calendarInvite: 'Sent & Synchronized'
      }
    },
    details: 'Calendar bot dynamically correlates stakeholder availability and generates personalized direct-booking links.'
  },
  {
    id: 'step-6',
    number: '06',
    title: 'Team Notified',
    action: 'Omnichannel Dispatch',
    icon: BellRing,
    outputPayload: {
      status: 'DISPATCH_COMPLETE',
      executionTime: '6ms',
      data: {
        slackWebhook: 'Channel #enterprise-deals pinged',
        whatsappNotification: 'Founder WhatsApp alerted',
        overallLatency: '92ms End-to-End'
      }
    },
    details: 'Instant alerts sent to leadership with complete lead dossier, proposal link, and scheduled call briefing.'
  }
];

interface InteractiveAutomationWorkflowProps {
  onNavigate?: (page: PageId, customMsg?: string) => void;
}

export const InteractiveAutomationWorkflow: React.FC<InteractiveAutomationWorkflowProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < WORKFLOW_STEPS.length) {
        setActiveStepIndex(current);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1100);
  };

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>AUTONOMOUS ENGINE IN ACTION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How MUCO Systems Work.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
          From incoming customer touchpoint to autonomous qualification, CRM sync, and proposal dispatch in under 100ms. Click any stage or run the live simulation.
        </p>

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-center gap-4">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              isSimulating
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 cursor-wait'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25 cursor-pointer transform hover:-translate-y-0.5'
            }`}
          >
            {isSimulating ? (
              <>
                <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>Simulating Autonomous Run...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Interactive Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveStepIndex(0)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 6-Step Horizontal Progression Bar */}
      <div className="relative mb-12">
        {/* Connecting Background Line */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0" />
        
        {/* Animated Active Progress Line */}
        <div
          className="hidden lg:block absolute top-1/2 left-8 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${(activeStepIndex / (WORKFLOW_STEPS.length - 1)) * 88}%`,
          }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (!isSimulating) setActiveStepIndex(idx);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-105 z-20'
                    : isCompleted
                    ? 'bg-slate-950/90 border-cyan-500/40 text-slate-300'
                    : 'bg-white/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-cyan-500 text-slate-950' : isCompleted ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                    {step.number}
                  </span>
                </div>

                <h3 className={`text-xs font-bold tracking-tight block ${isActive ? 'text-white' : 'text-slate-800 dark:text-slate-300'}`}>
                  {step.title}
                </h3>
                <span className="text-[10px] font-mono text-slate-500 block truncate">
                  {step.action}
                </span>

                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rotate-45 rounded-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Live Payload & Narrative Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl text-slate-100"
        >
          {/* Left Description (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                STAGE {activeStep.number} OF 06
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {activeStep.outputPayload.status}
              </span>
            </div>

            <h3 className="text-2xl font-black text-white">{activeStep.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{activeStep.details}</p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Latency: <strong className="text-cyan-400">{activeStep.outputPayload.executionTime}</strong></span>
              <span>•</span>
              <span>Reliability: <strong className="text-emerald-400">99.99%</strong></span>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('contact', `I want to automate: ${activeStep.title} & ${activeStep.action}`)}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Automate this workflow for your company</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Live JSON Payload Telemetry Terminal (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-[#070c18] border border-slate-800 p-4 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>telemetry_stream.json</span>
              </div>
              <span className="text-cyan-400 font-bold">{activeStep.outputPayload.executionTime}</span>
            </div>

            <pre className="text-slate-300 leading-relaxed text-[11px] overflow-x-auto">
              <code>
{`{
  "step": "${activeStep.number}",
  "node": "${activeStep.title}",
  "event": "${activeStep.action}",
  "status": "${activeStep.outputPayload.status}",
  "latency": "${activeStep.outputPayload.executionTime}",
  "payload": ${JSON.stringify(activeStep.outputPayload.data, null, 2)}
}`}
              </code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
