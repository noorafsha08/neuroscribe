import React from 'react';

const NotesSkeletonLoader = ({ count = 6, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg shadow-soft p-4 animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
            </div>
            <div className="h-6 bg-muted rounded-full w-16 ml-3"></div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-2 mb-3">
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
            <div className="h-3 bg-muted rounded w-4/6"></div>
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-5 bg-muted rounded-full w-12"></div>
              <div className="h-5 bg-muted rounded-full w-16"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 bg-muted rounded w-16"></div>
              <div className="h-3 bg-muted rounded w-3"></div>
            </div>
          </div>

          {/* Emotion intensity bar skeleton */}
          <div className="h-1 bg-muted rounded mt-4"></div>
        </div>
      ))}
    </div>
  );
};

export default NotesSkeletonLoader;