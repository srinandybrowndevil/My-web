import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  animation = 'wave'
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded-md h-3.5';
      case 'rectangular':
        return 'rounded-none';
      case 'rounded':
      default:
        return 'rounded-xl';
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/50 ${getVariantClass()} ${className}`}
    >
      {animation === 'wave' && (
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent"
          style={{
            animation: 'shimmer 1.8s infinite'
          }}
        />
      )}
      {animation === 'pulse' && (
        <div className="absolute inset-0 animate-pulse bg-slate-300/30 dark:bg-slate-700/30" />
      )}
    </div>
  );
};
