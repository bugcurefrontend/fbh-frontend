"use client";

import { useAuth } from "@/lib/auth-context";
import HFNAuthComponent from "./HFNAuthComponent";
import ErrorBoundary from "./ErrorBoundary";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { logout } = useAuth();

  const handleUserLoggedOut = async () => {
    await logout();
  };

  return (
    <ErrorBoundary>
      <HFNAuthComponent onUserLoggedOut={handleUserLoggedOut} />
      {children}
    </ErrorBoundary>
  );
}
