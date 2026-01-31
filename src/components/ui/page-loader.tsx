import React from 'react';
import { LoadingSpinner } from './loading-spinner';

export interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export function PageLoader({ message = 'Loading...', fullScreen = true }: PageLoaderProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="xl" />
          {message && (
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        {message && (
          <p className="text-base font-medium text-gray-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
