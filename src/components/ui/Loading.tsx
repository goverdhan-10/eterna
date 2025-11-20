import React from 'react';

export const TokenSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border-b border-[#1C212B] last:border-b-0 animate-pulse"
        >
          {/* Avatar skeleton */}
          <div className="w-8 h-8 rounded-full shimmer" />
          
          {/* Name/Symbol skeleton */}
          <div className="flex-1">
            <div className="h-4 w-24 shimmer rounded mb-2" />
            <div className="h-3 w-32 shimmer rounded bg-slate-700" />
          </div>

          {/* Price skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 shimmer rounded" />
            <div className="h-3 w-16 shimmer rounded bg-slate-700" />
          </div>

          {/* Volume skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 shimmer rounded" />
            <div className="h-3 w-16 shimmer rounded bg-slate-700" />
          </div>

          {/* Change skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 shimmer rounded" />
            <div className="h-3 w-12 shimmer rounded bg-slate-700" />
          </div>
        </div>
      ))}
    </>
  );
};

export const TokenRowSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 p-4 border-b border-[#1C212B] animate-pulse">
    <div className="w-10 h-10 rounded-full shimmer" />
    <div className="flex-1 flex items-center justify-between">
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 w-24 shimmer rounded" />
        <div className="h-3 w-32 shimmer rounded bg-slate-700" />
      </div>
      <div className="h-4 w-20 shimmer rounded" />
      <div className="h-4 w-20 shimmer rounded" />
      <div className="h-4 w-16 shimmer rounded" />
    </div>
  </div>
);

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-slate-700 border-t-blue-500 rounded-full animate-spin`}
      />
    </div>
  );
};
