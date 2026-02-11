import AdminDashboard from "@/components/AdminDashboard";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Suspense } from "react";

export default function page() {
  return (
    <AdminProtectedRoute>
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
    </AdminProtectedRoute>
  );
}
