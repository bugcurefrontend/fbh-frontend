"use client";

import { useAuth } from "@/lib/auth-context";
import HFNAuthComponent from "./HFNAuthComponent";
import ErrorBoundary from "./ErrorBoundary";
import { useEffect, useState } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { logout } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleUserLoggedOut = async () => {
    await logout();
  };

  // Always render children immediately - auth components load after
  return (
    <ErrorBoundary>
      {isHydrated && <HFNAuthComponent onUserLoggedOut={handleUserLoggedOut} />}
      {children}
    </ErrorBoundary>
  );
}
