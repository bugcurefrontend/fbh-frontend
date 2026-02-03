import AdminDashboard from "@/components/AdminDashboard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <LoadingSpinner />
          Loading...
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
