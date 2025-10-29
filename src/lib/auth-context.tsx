"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { queryHFNElement, getAuthParams } from './hfnauth';
import type { AuthParams } from '../types/hfnauth-types';

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  // Add otherfield
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  const refreshAuthStatus = () => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const profile = localStorage.getItem("userProfile");

    setIsAuthenticated(authStatus === "true");
    if (profile) {
      try {
        setUserProfile(JSON.parse(profile));
      } catch (error) {
        console.error("Error parsing user profile:", error);
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refreshAuthStatus();

    // Listen for storage changes (for cross-tab synchronization)
    const handleStorageChange = () => {
      refreshAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async () => {
    try {
      if (typeof window !== "undefined") {
        // Store current page as landing page for redirect after auth
        localStorage.setItem("landingPage", window.location.pathname);
        
        // Trigger HFN Auth
        const authElement = queryHFNElement();
        if (authElement) {
          authElement.triggerAuth();
        } else {
          console.error("HFN Auth element not found");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      if (typeof window !== "undefined") {
        // Use HFN Auth logout function
        const { userLogout } = await import("hfnauth/main");
        const params = getAuthParams();
        const subPath = process.env.NEXT_PUBLIC_HFN_SUBPATH || "";
        const res = await userLogout(params, subPath);
        
        if (!res?.error) {
          // Clear local storage
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userProfile");
          localStorage.removeItem("landingPage");
          setIsAuthenticated(false);
          setUserProfile(null);
          window.location.href = "/";
        } else {
          console.error("Logout failed:", res.error);
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("landingPage");
      setIsAuthenticated(false);
      setUserProfile(null);
      window.location.href = "/";
    }
  };

  // Internal token refresh - not exposed to users
  const refreshTokenIfNeeded = async () => {
    try {
      if (typeof window !== "undefined") {
        const { getRefreshToken } = await import("hfnauth/main");
        const params = getAuthParams();

        const tokenData = await getRefreshToken(params).catch((error) => {
          console.error("Token refresh failed:", error);
          // If refresh fails, logout user
          logout();
        });
        
        if (tokenData?.access_token) {
          localStorage.setItem("accessToken", tokenData.access_token);
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  // Auto-refresh token every 30 minutes
  useEffect(() => {
    if (isAuthenticated) {
      // Read refresh interval (minutes) from env; default to 30 minutes
      const minutesEnv = process.env.NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL;
      const minutes = minutesEnv ? parseInt(minutesEnv, 10) : 30;
      const safeMinutes = Number.isFinite(minutes) && minutes > 0 ? minutes : 30;
      const intervalMs = safeMinutes * 60 * 1000;

      const interval = setInterval(refreshTokenIfNeeded, intervalMs);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const value: AuthContextType = {
    isAuthenticated,
    userProfile,
    isLoading,
    login,
    logout,
    refreshAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
