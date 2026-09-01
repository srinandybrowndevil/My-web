import React from 'react';
import { Skeleton } from './SkeletonBase';

export const GeneralPageSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in duration-200">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
        <Skeleton className="w-32 h-6" variant="rounded" />
        <Skeleton className="w-3/4 h-10 sm:h-12" variant="rounded" />
        <Skeleton className="w-full h-4" variant="text" />
        <Skeleton className="w-4/5 h-4" variant="text" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/10 space-y-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10" variant="circular" />
              <div className="space-y-2 flex-1">
                <Skeleton className="w-3/4 h-4" variant="text" />
                <Skeleton className="w-1/2 h-3" variant="text" />
              </div>
            </div>
            <Skeleton className="w-full h-20" variant="rounded" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="w-20 h-4" variant="text" />
              <Skeleton className="w-16 h-8" variant="rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
