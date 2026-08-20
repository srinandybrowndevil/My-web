import React from 'react';
import { Skeleton } from './SkeletonBase';

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="glass-morphism-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Details */}
        <div className="lg:col-span-7 space-y-4">
          {/* Icon & Title Row */}
          <div className="flex items-center gap-3">
            <Skeleton variant="rounded" className="w-12 h-12 rounded-2xl shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <Skeleton variant="text" className="w-28 h-3" />
                <Skeleton variant="circular" className="w-1.5 h-1.5" />
                <Skeleton variant="text" className="w-20 h-3" />
              </div>
              <Skeleton variant="text" className="w-3/4 h-6" />
            </div>
          </div>

          {/* Tagline / Subtitle */}
          <Skeleton variant="text" className="w-4/5 h-4" />

          {/* Description Paragraphs */}
          <div className="space-y-2 pt-1">
            <Skeleton variant="text" className="w-full h-3.5" />
            <Skeleton variant="text" className="w-11/12 h-3.5" />
            <Skeleton variant="text" className="w-4/5 h-3.5" />
          </div>

          {/* Key Deliverables / Features Checkmarks */}
          <div className="space-y-2.5 pt-2">
            <Skeleton variant="text" className="w-40 h-3 font-semibold mb-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton variant="circular" className="w-4 h-4 shrink-0" />
                  <Skeleton variant="text" className="w-32 h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="pt-3 flex flex-wrap items-center gap-2">
            <Skeleton variant="text" className="w-20 h-3 mr-1" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="rounded" className="w-16 h-6 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Right Column: Pricing, Timeline & Action Box */}
        <div className="lg:col-span-5 bg-slate-100/70 dark:bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          {/* Header row in side box */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <Skeleton variant="text" className="w-24 h-4" />
            <Skeleton variant="rounded" className="w-20 h-5 rounded-full" />
          </div>

          {/* Scope highlights */}
          <div className="space-y-2">
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-5/6 h-3" />
            <Skeleton variant="text" className="w-4/6 h-3" />
          </div>

          {/* Estimated Timeline */}
          <div className="p-3 bg-slate-200/50 dark:bg-slate-950/60 rounded-xl flex items-center justify-between">
            <Skeleton variant="text" className="w-28 h-3" />
            <Skeleton variant="text" className="w-16 h-3.5 font-bold" />
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <Skeleton variant="rounded" className="w-full h-11 rounded-xl" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton variant="rounded" className="w-full h-9 rounded-xl" />
              <Skeleton variant="rounded" className="w-full h-9 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServicesSkeleton: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* Top Breadcrumb Trail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center gap-2">
          <Skeleton variant="text" className="w-16 h-4" />
          <span className="text-slate-400">/</span>
          <Skeleton variant="text" className="w-28 h-4" />
        </div>
      </div>

      {/* Header Banner */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-4">
        {/* Pill Badge */}
        <div className="inline-block mx-auto">
          <Skeleton variant="rounded" className="w-72 h-8 rounded-full mx-auto" />
        </div>

        {/* Main H1 Title */}
        <div className="flex justify-center">
          <Skeleton variant="text" className="w-4/5 max-w-lg h-10 sm:h-12" />
        </div>

        {/* Subtitle */}
        <div className="space-y-2 max-w-2xl mx-auto pt-1">
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-5/6 h-4 mx-auto" />
        </div>

        {/* Way2Me Academy Courses Discovery Banner Skeleton */}
        <div className="mt-6 max-w-3xl mx-auto p-4 bg-slate-900/40 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
          <Skeleton variant="rounded" className="w-9 h-9 rounded-xl shrink-0" />
          <div className="space-y-1.5 flex-1 text-left w-full">
            <Skeleton variant="text" className="w-2/3 h-3.5" />
            <Skeleton variant="text" className="w-4/5 h-3" />
          </div>
          <Skeleton variant="rounded" className="w-32 h-8 rounded-xl shrink-0" />
        </div>
      </section>

      {/* Services List - 4 Skeleton Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {[1, 2, 3, 4].map((index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </section>

      {/* Bottom Tools & Engagement Skeletons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Delivery Roadmap Skeleton */}
        <div className="bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <Skeleton variant="text" className="w-48 h-6 mx-auto" />
            <Skeleton variant="text" className="w-72 h-3.5 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800 space-y-3">
                <Skeleton variant="rounded" className="w-8 h-8 rounded-lg" />
                <Skeleton variant="text" className="w-24 h-4" />
                <Skeleton variant="text" className="w-full h-3" />
                <Skeleton variant="text" className="w-4/5 h-3" />
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator Skeleton */}
        <div className="bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-2 w-full md:w-1/2">
              <Skeleton variant="text" className="w-56 h-6" />
              <Skeleton variant="text" className="w-80 h-3.5" />
            </div>
            <Skeleton variant="rounded" className="w-40 h-10 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {[1, 2, 3].map((r) => (
              <Skeleton key={r} variant="rounded" className="h-28 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
