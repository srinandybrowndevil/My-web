import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Gauge, Zap, Cpu, HardDrive, RefreshCw, X, ChevronUp, ChevronDown, CheckCircle2, AlertTriangle, Info, Terminal } from 'lucide-react';

export interface WebVitalsData {
  ttfb: number | null; // ms
  fcp: number | null;  // ms
  lcp: number | null;  // ms
  cls: number | null;  // score
  domLoad: number | null; // ms
  pageLoad: number | null; // ms
  resourcesCount: number;
  totalTransferKB: number;
  jsHeapUsedMB: number | null;
  jsHeapTotalMB: number | null;
}

export const PerformanceMonitor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [vitals, setVitals] = useState<WebVitalsData>({
    ttfb: null,
    fcp: null,
    lcp: null,
    cls: 0,
    domLoad: null,
    pageLoad: null,
    resourcesCount: 0,
    totalTransferKB: 0,
    jsHeapUsedMB: null,
    jsHeapTotalMB: null,
  });
  const [lastRouteTime, setLastRouteTime] = useState<number | null>(null);

  const frameCount = useRef<number>(0);
  const lastFpsCheck = useRef<number>(performance.now());
  const animFrameId = useRef<number | null>(null);

  // Measure Realtime FPS
  useEffect(() => {
    const calcFps = () => {
      const now = performance.now();
      frameCount.current++;

      if (now - lastFpsCheck.current >= 1000) {
        const calculated = Math.round((frameCount.current * 1000) / (now - lastFpsCheck.current));
        setFps(calculated);
        frameCount.current = 0;
        lastFpsCheck.current = now;
      }

      animFrameId.current = requestAnimationFrame(calcFps);
    };

    animFrameId.current = requestAnimationFrame(calcFps);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  // Gather Navigation & Performance Observer Web Vitals
  const collectPerformanceMetrics = () => {
    if (typeof window === 'undefined' || !window.performance) return;

    let ttfb: number | null = null;
    let domLoad: number | null = null;
    let pageLoad: number | null = null;

    // Navigation Timing API
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries && navEntries.length > 0) {
      const nav = navEntries[0];
      ttfb = Math.round(nav.responseStart - nav.requestStart);
      domLoad = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
      pageLoad = Math.round(nav.loadEventEnd - nav.startTime);
    }

    // Paint Timing (FCP)
    let fcp: number | null = null;
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((e) => e.name === 'first-contentful-paint');
    if (fcpEntry) {
      fcp = Math.round(fcpEntry.startTime);
    }

    // Resource metrics
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let totalBytes = 0;
    resources.forEach((r) => {
      if (r.transferSize) {
        totalBytes += r.transferSize;
      }
    });

    // Memory API (Chromium feature)
    let jsHeapUsedMB: number | null = null;
    let jsHeapTotalMB: number | null = null;
    const perfMemory = (performance as any).memory;
    if (perfMemory) {
      jsHeapUsedMB = Math.round(perfMemory.usedJSHeapSize / (1024 * 1024));
      jsHeapTotalMB = Math.round(perfMemory.totalJSHeapSize / (1024 * 1024));
    }

    setVitals((prev) => ({
      ...prev,
      ttfb: ttfb && ttfb >= 0 ? ttfb : prev.ttfb,
      fcp: fcp || prev.fcp,
      domLoad: domLoad && domLoad >= 0 ? domLoad : prev.domLoad,
      pageLoad: pageLoad && pageLoad >= 0 ? pageLoad : prev.pageLoad,
      resourcesCount: resources.length,
      totalTransferKB: Math.round(totalBytes / 1024),
      jsHeapUsedMB,
      jsHeapTotalMB,
    }));
  };

  useEffect(() => {
    collectPerformanceMetrics();

    // Setup Performance Observer for LCP & CLS
    if (typeof PerformanceObserver !== 'undefined') {
      // Observer for LCP
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            setVitals((prev) => ({
              ...prev,
              lcp: Math.round(lastEntry.startTime),
            }));
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // Observer type not supported in this environment
      }

      // Observer for CLS
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setVitals((prev) => ({
                ...prev,
                cls: Number(clsValue.toFixed(3)),
              }));
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // Observer type not supported
      }
    }

    // Listen for page transition event
    const handlePageView = (e: CustomEvent) => {
      collectPerformanceMetrics();
      if (e.detail?.timestamp) {
        setLastRouteTime(Date.now());
      }
    };

    window.addEventListener('muco:pageview' as any, handlePageView);
    return () => {
      window.removeEventListener('muco:pageview' as any, handlePageView);
    };
  }, []);

  // Keyboard shortcut Ctrl+Shift+P or Cmd+Shift+P to toggle monitor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Rating utilities
  const getFpsColor = (fpsVal: number) => {
    if (fpsVal >= 55) return 'text-emerald-400';
    if (fpsVal >= 30) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getLcpBadge = (lcpVal: number | null) => {
    if (lcpVal === null) return { text: 'Measuring...', class: 'text-slate-400 bg-slate-800' };
    if (lcpVal <= 2500) return { text: `${(lcpVal / 1000).toFixed(2)}s Good`, class: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' };
    if (lcpVal <= 4000) return { text: `${(lcpVal / 1000).toFixed(2)}s Needs Imp`, class: 'text-amber-400 bg-amber-950/80 border-amber-800' };
    return { text: `${(lcpVal / 1000).toFixed(2)}s Poor`, class: 'text-rose-400 bg-rose-950/80 border-rose-800' };
  };

  const getClsBadge = (clsVal: number | null) => {
    if (clsVal === null) return { text: '0.000', class: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' };
    if (clsVal <= 0.1) return { text: `${clsVal} Good`, class: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' };
    if (clsVal <= 0.25) return { text: `${clsVal} Moderate`, class: 'text-amber-400 bg-amber-950/80 border-amber-800' };
    return { text: `${clsVal} High Shift`, class: 'text-rose-400 bg-rose-950/80 border-rose-800' };
  };

  return (
    <div className="fixed bottom-3 left-3 z-30 select-none font-sans hidden sm:block">
      {/* Collapsed Pill Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.9, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          title="Internal Web Vitals Monitor (Press Ctrl+Shift+P)"
          className="bg-slate-950/90 hover:bg-slate-900 border border-amber-500/40 text-white px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-mono group cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold text-[11px] text-slate-200">
            {fps} <span className="text-[9px] text-slate-400">FPS</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-[10px] text-amber-400 font-semibold">
            {vitals.lcp ? `${(vitals.lcp / 1000).toFixed(2)}s LCP` : 'Vitals'}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
        </motion.button>
      )}

      {/* Expanded Performance Monitor Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-80 sm:w-96 bg-slate-950/95 border border-amber-500/30 text-slate-100 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs border-slate-800"
          >
            {/* Header */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-xs tracking-tight font-sans">
                  Web Vitals & Performance API
                </span>
                <span className="text-[9px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                  Debug
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => collectPerformanceMetrics()}
                  title="Recalculate performance metrics"
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metrics Content */}
            <div className="p-4 space-y-3.5 text-[11px]">
              {/* FPS & Memory Row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-amber-400" /> Frame Rate
                    </span>
                    <span className="text-[9px] text-slate-500">60Hz</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-xl font-extrabold ${getFpsColor(fps)}`}>
                      {fps}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">FPS</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3 text-blue-400" /> JS Memory
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-extrabold text-blue-400">
                      {vitals.jsHeapUsedMB !== null ? `${vitals.jsHeapUsedMB}` : 'N/A'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">
                      {vitals.jsHeapTotalMB !== null ? `/ ${vitals.jsHeapTotalMB} MB` : 'MB'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Web Vitals Breakdown */}
              <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1 font-sans">
                  <Zap className="w-3 h-3" /> Core Web Vitals (Google Standards)
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                  {/* LCP */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">LCP (Largest Paint):</span>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${getLcpBadge(vitals.lcp).class}`}>
                      {getLcpBadge(vitals.lcp).text}
                    </span>
                  </div>

                  {/* CLS */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">CLS (Layout Shift):</span>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${getClsBadge(vitals.cls).class}`}>
                      {getClsBadge(vitals.cls).text}
                    </span>
                  </div>

                  {/* FCP */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">FCP (First Paint):</span>
                    <span className="text-slate-200 font-bold">
                      {vitals.fcp ? `${vitals.fcp}ms` : 'Measuring'}
                    </span>
                  </div>

                  {/* TTFB */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">TTFB (Server Resp):</span>
                    <span className="text-slate-200 font-bold">
                      {vitals.ttfb ? `${vitals.ttfb}ms` : 'Measuring'}
                    </span>
                  </div>
                </div>
              </div>

              {/* DOM & Asset Stats */}
              <div className="space-y-1.5 text-slate-300 pt-0.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">DOM Content Loaded:</span>
                  <span className="font-bold text-slate-200">{vitals.domLoad ? `${vitals.domLoad}ms` : 'Instant'}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Total Page Assets:</span>
                  <span className="font-bold text-slate-200">{vitals.resourcesCount} requests ({vitals.totalTransferKB} KB)</span>
                </div>
                {lastRouteTime && (
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Last Navigation:</span>
                    <span className="text-emerald-400 font-bold">Client-side split</span>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500 font-sans">
                <span>Shortcut: <kbd className="px-1 bg-slate-800 rounded text-slate-300">Ctrl+Shift+P</kbd></span>
                <span className="text-slate-400">MUCO Perf Audit v1.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
