"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const AccountPageSkeleton = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-8 pt-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </main>
  );
};
