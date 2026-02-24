import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
};

export function LoadingSpinner({ size = 'md', className, label = 'Loading' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-green-600 border-t-transparent',
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
