"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { queryHFNElement, getAuthParams } from "./hfnauth";
import { actions } from "@/store/userStore";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  isLoading: boolean;
  login: () => void;
  logout: (options?: LogoutOptions) => Promise<void>;
  refreshAuthStatus: () => void;
}

interface LogoutOptions {
  redirect?: boolean;
  targetPath?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
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

  const refreshAuthStatus = () => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const profile = localStorage.getItem("userProfile");

    setIsAuthenticated(authStatus === "true");
    if (profile) {
      try {
        setUserProfile(JSON.parse(profile));
      } catch (error) {
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refreshAuthStatus();

    const handleStorageChange = () => {
      refreshAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async () => {
    try {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const landingPage = currentPath.includes("/hfnauth/authorization")
          ? "/"
          : currentPath;
        localStorage.setItem("landingPage", landingPage);

        const authElement = queryHFNElement();

        if (authElement) {
          authElement.triggerAuth();
        } else {
          setTimeout(() => {
            const retryElement = queryHFNElement();
            if (retryElement) {
              retryElement.triggerAuth();
            }
          }, 500);
        }
      }
    } catch (error) {
      // Silent error handling
    }
  };

  const logout = async (options: LogoutOptions = {}) => {
    const shouldRedirect = options.redirect ?? false;
    try {
      if (typeof window !== "undefined") {
        const { userLogout } = await import("hfnauth/main");
        const params = getAuthParams();
        const subPath = process.env.NEXT_PUBLIC_HFN_SUBPATH || "";
        const res = await userLogout(params, subPath);

        if (!res?.error) {
          actions.clearUser();
          localStorage.removeItem("landingPage");
          setIsAuthenticated(false);
          setUserProfile(null);
          if (shouldRedirect) {
            const redirectPath =
              options.targetPath ||
              localStorage.getItem("landingPage") ||
              window.location.pathname ||
              "/";
            window.location.href = redirectPath;
          }
        }
      }
    } catch (error) {
      actions.clearUser();
      localStorage.removeItem("landingPage");
      setIsAuthenticated(false);
      setUserProfile(null);
      if (typeof window !== "undefined" && shouldRedirect) {
        const redirectPath =
          options.targetPath ||
          localStorage.getItem("landingPage") ||
          window.location.pathname ||
          "/";
        window.location.href = redirectPath;
      }
    }
  };

  const refreshTokenIfNeeded = async () => {
    try {
      if (typeof window !== "undefined") {
        const { getRefreshToken } = await import("hfnauth/main");
        const params = getAuthParams();

        const tokenData = await getRefreshToken(params).catch(() => {
          logout();
        });

        if (tokenData?.access_token) {
          localStorage.setItem("accessToken", tokenData.access_token);
        }
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const minutesEnv = process.env.NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL;
      const minutes = minutesEnv ? parseInt(minutesEnv, 10) : 30;
      const safeMinutes =
        Number.isFinite(minutes) && minutes > 0 ? minutes : 30;
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
