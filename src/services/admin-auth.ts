/**
 * Admin Authentication Service
 * Works with static export by authenticating directly against Strapi.
 */

import { getStrapiURL } from "./api";
import { logger } from "@/lib/logger";

export interface AdminLoginRequest {
    identifier: string; // email or username
    password: string;
}

export interface AdminLoginResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        role: {
            id: number;
            name: string;
            description: string;
            type: string;
        };
    };
}

export interface AdminAuthError {
    error: {
        status: number;
        name: string;
        message: string;
    };
}

/**
 * Login admin user via Strapi users-permissions endpoint.
 */
export async function adminLogin(
    identifier: string,
    password: string
): Promise<AdminLoginResponse> {
    const url = getStrapiURL("/api/auth/local");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identifier,
            password,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        logger.error("Admin login failed", response.status);

        try {
            const errorData: AdminAuthError = JSON.parse(errorText);
            throw new Error(
                errorData.error?.message || "Login failed. Please check your credentials."
            );
        } catch {
            throw new Error(`Login failed: ${errorText || response.statusText}`);
        }
    }

    return (await response.json()) as AdminLoginResponse;
}

/**
 * Login admin user and persist local auth state.
 */
export async function loginAdmin(
    identifier: string,
    password: string
): Promise<AdminLoginResponse["user"]> {
    const data = await adminLogin(identifier, password);
    storeAdminAuth(data.jwt, data.user);
    return data.user;
}

/**
 * Logout admin user.
 */
export async function logoutAdmin(): Promise<void> {
    clearAdminAuth();
}

/**
 * Get stored admin user data from localStorage.
 */
export function getAdminUser(): AdminLoginResponse["user"] | null {
    if (typeof window === "undefined") return null;

    const userData = localStorage.getItem("adminUser");
    if (!userData) return null;

    try {
        return JSON.parse(userData) as AdminLoginResponse["user"];
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated as admin.
 */
export function isAdminAuthenticated(): boolean {
    return getAdminUser() !== null && getAdminToken() !== null;
}

/**
 * Verify admin authentication with backend using stored token.
 */
export async function verifyAdminAuth(): Promise<boolean> {
    try {
        const token = getAdminToken();
        if (!token) return false;

        const response = await fetch(getStrapiURL("/api/admin/dashboard/metrics/"), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Store admin authentication data in localStorage.
 */
export function storeAdminAuth(jwt: string, user: AdminLoginResponse["user"]) {
    if (typeof window === "undefined") return;
    localStorage.setItem("adminToken", jwt);
    localStorage.setItem("adminUser", JSON.stringify(user));
}

/**
 * Get stored admin token.
 */
export function getAdminToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
}

/**
 * Clear admin authentication data.
 */
export function clearAdminAuth() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
}
