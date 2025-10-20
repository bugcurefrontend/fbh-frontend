"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import HFNAuthComponent from "./HFNAuthComponent";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { logout } = useAuth();

  const handleUserLoggedOut = async () => {
    await logout();
  };

  return (
    <>
      <HFNAuthComponent onUserLoggedOut={handleUserLoggedOut} />
      {children}
    </>
  );
}
