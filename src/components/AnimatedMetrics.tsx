import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Sparkles, TrendingUp, Cpu, Award } from 'lucide-react';

interface MetricItem {
  id: string;
  targetValue: number;
  prefix?: string;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const METRICS_DATA: MetricItem[] = [
  {
    id: 'projects',
    targetValue: 50,
    suffix: '+',
    label: 'Enterprise Deliveries',
    sublabel: 'Full-stack platforms & mobile apps',
    icon: Sparkles
  },
  {
    id: 'ai-systems',
    targetValue: 10,
    suffix: '+',
    label: 'Autonomous AI Systems',
    sublabel: 'Production LLMs & agent networks',
    icon: Cpu
  },
  {
    id: 'uptime',
    targetValue: 99.4,
    suffix: '%',
    label: 'Infrastructure SLA',
    sublabel: 'Sub-second global Edge availability',
    icon: ShieldCheck
  },
  {
    id: 'roi',
    targetValue: 3.8,
    suffix: 'x',
    label: 'Operational Efficiency',
    sublabel: 'Average client workflow acceleration',
    icon: TrendingUp
  }
];

export const AnimatedMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounters(METRICS_DATA.map((m) => m.targetValue));
      return;
    }

    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCounters = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      setCounters(
        METRICS_DATA.map((m) => {
          const val = m.targetValue * easeOut;
          return m.targetValue % 1 !== 0
            ? parseFloat(val.toFixed(1))
            : Math.floor(val);
        })
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        setCounters(METRICS_DATA.map((m) => m.targetValue));
      }
    };

    requestAnimationFrame(updateCounters);
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-950/95 dark:bg-[#070b16] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient Backlight */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* Eyebrow */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-1">
                SYSTEM METRICS // VERIFIED IMPACT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Architected for Concrete Business Outcomes.
              </h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shrink-0">
              <Award className="w-3.5 h-3.5" />
              <span>100% PRODUCTION VERIFIED</span>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS_DATA.map((item, idx) => {
              const Icon = item.icon;
              const displayVal = counters[idx] !== undefined ? counters[idx] : item.targetValue;

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex items-baseline gap-1 mb-2 font-mono">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {item.prefix}
                      {displayVal}
                    </span>
                    <span className="text-2xl font-black text-cyan-400">
                      {item.suffix}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 mb-1">{item.label}</h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">{item.sublabel}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
