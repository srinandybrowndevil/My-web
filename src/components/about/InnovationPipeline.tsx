/**
 * Innovation Pipeline Component for About Page
 * Displays the 5-step innovation process from problem to business impact
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Code2, Bot, Rocket, TrendingUp } from 'lucide-react';

export interface InnovationStep {
  id: string;
  step: string;
  name: string;
  title: string;
  phaseLabel: string;
  icon: React.ReactNode;
  color: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  tagline: string;
  summary: string;
  input: string;
  transformation: string;
  output: string;
  metrics: string[];
}

interface InnovationPipelineProps {
  pipeline: InnovationStep[];
  activeStep: number;
  onStepChange: (step: number) => void;
  isSimulating: boolean;
}

export const InnovationPipeline: React.FC<InnovationPipelineProps> = ({
  pipeline,
  activeStep,
  onStepChange,
  isSimulating
}) => {
  return (
    <div className="space-y-6">
      {/* Pipeline Progress Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Innovation Pipeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              5-Stage Engineering Process
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStepChange(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            ←
          </button>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {activeStep + 1}/{pipeline.length}
          </span>
          <button
            onClick={() => onStepChange(Math.min(pipeline.length - 1, activeStep + 1))}
            disabled={activeStep === pipeline.length - 1}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Pipeline Steps Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {pipeline.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepChange(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeStep === index
                ? `${step.accentBg} ${step.accentBorder} ${step.accentText} border`
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent'
            }`}
          >
            {step.step}. {step.name}
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {(() => {
            const step = pipeline[activeStep];
            return (
              <>
                {/* Step Header */}
                <div className={`p-6 rounded-2xl ${step.accentBg} ${step.accentBorder} border`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${step.accentBg} ${step.accentText}`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${step.accentText} mb-1`}>
                        {step.phaseLabel}
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Summary */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step.summary}
                  </p>
                </div>

                {/* Step Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30">
                    <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase mb-2">
                      Input
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {step.input}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
                    <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">
                      Transformation
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {step.transformation}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                      Output
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {step.output}
                    </p>
                  </div>
                </div>

                {/* Step Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {step.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center"
                    >
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {metric.split(':')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">
                        {metric.split(':')[1]}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
