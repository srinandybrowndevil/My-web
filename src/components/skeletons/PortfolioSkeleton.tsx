import React from 'react';
import { Skeleton } from './SkeletonBase';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="glass-morphism-card rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      {/* Top Image Banner Skeleton */}
      <div className="relative h-48 bg-slate-900 overflow-hidden">
        <Skeleton variant="rectangular" className="w-full h-full" />
        {/* Status Badge in top-left */}
        <div className="absolute top-3 left-3">
          <Skeleton variant="rounded" className="w-28 h-6 rounded-full bg-slate-800/90" />
        </div>
        {/* Overlay texts at bottom */}
        <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
          <Skeleton variant="text" className="w-32 h-2.5 bg-slate-700/80" />
          <Skeleton variant="text" className="w-3/4 h-4 bg-slate-700/80" />
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Client / Sector row */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Skeleton variant="text" className="w-20 h-3" />
            <Skeleton variant="text" className="w-28 h-3.5" />
          </div>

          {/* Description lines */}
          <div className="space-y-1.5 pt-1">
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-11/12 h-3" />
            <Skeleton variant="text" className="w-4/5 h-3" />
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {[1, 2, 3, 4].map((t) => (
              <Skeleton key={t} variant="rounded" className="w-14 h-5 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <Skeleton variant="text" className="w-20 h-4" />
          <Skeleton variant="rounded" className="w-32 h-8 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* Top Breadcrumb Trail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center gap-2">
          <Skeleton variant="text" className="w-16 h-4" />
          <span className="text-slate-400">/</span>
          <Skeleton variant="text" className="w-32 h-4" />
        </div>
      </div>

      {/* Header Banner */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-4">
        {/* Pill Badge */}
        <div className="inline-block mx-auto">
          <Skeleton variant="rounded" className="w-64 h-7 rounded-full mx-auto" />
        </div>

        {/* Main H1 Title */}
        <div className="flex justify-center">
          <Skeleton variant="text" className="w-4/5 max-w-md h-10 sm:h-12" />
        </div>

        {/* Subtitle */}
        <div className="space-y-2 max-w-xl mx-auto pt-1">
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-4/5 h-4 mx-auto" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Skeleton variant="rounded" className="w-40 h-11 rounded-xl" />
          <Skeleton variant="rounded" className="w-48 h-11 rounded-xl" />
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {/* Search Input Box */}
          <Skeleton variant="rounded" className="w-full lg:w-80 h-10 rounded-xl" />

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 w-full lg:w-auto">
            {[1, 2, 3, 4, 5, 6].map((c) => (
              <Skeleton key={c} variant="rounded" className="w-24 h-8 rounded-xl shrink-0" />
            ))}
          </div>
        </div>

        {/* Tech Stack Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-1">
          <Skeleton variant="text" className="w-14 h-3.5 shrink-0" />
          {[1, 2, 3, 4, 5, 6, 7].map((tech) => (
            <Skeleton key={tech} variant="rounded" className="w-16 h-6 rounded-lg shrink-0" />
          ))}
        </div>
      </section>

      {/* 6 Bento Grid Project Card Skeletons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <ProjectCardSkeleton key={item} />
          ))}
        </div>
      </section>

      {/* Client Success Stories Strip Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div className="space-y-2 text-center max-w-md mx-auto">
            <Skeleton variant="text" className="w-40 h-5 mx-auto" />
            <Skeleton variant="text" className="w-64 h-3.5 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="p-5 bg-slate-950/40 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton variant="text" className="w-24 h-3.5" />
                    <Skeleton variant="text" className="w-16 h-2.5" />
                  </div>
                </div>
                <Skeleton variant="text" className="w-full h-3" />
                <Skeleton variant="text" className="w-5/6 h-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
