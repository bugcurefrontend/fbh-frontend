/**
 * Admin Authentication Service
 * Handles admin login via Strapi users-permissions plugin
 */

import { getStrapiURL } from "./api";

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
 * Login admin user via Strapi
 * @param identifier - Email or username
 * @param password - User password
 * @returns Login response with JWT token and user data
 */
export async function adminLogin(
    identifier: string,
    password: string
): Promise<AdminLoginResponse> {
    const url = getStrapiURL("/api/auth/local");

    console.log("🔐 Attempting login to:", url);
    console.log("📧 Identifier:", identifier);

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
        console.error("❌ Login failed with status:", response.status);
        console.error("❌ Error response:", errorText);

        try {
            const errorData: AdminAuthError = JSON.parse(errorText);
            throw new Error(
                errorData.error?.message || "Login failed. Please check your credentials."
            );
        } catch (e) {
            // If JSON parsing fails, return the text as error
            throw new Error(`Login failed: ${errorText || response.statusText}`);
        }
    }

    const data: AdminLoginResponse = await response.json();
    console.log("✅ Login successful for user:", data.user.email);
    return data;
}

/**
 * Store admin authentication data in localStorage
 * @param jwt - JWT token from Strapi
 * @param user - User data from Strapi
 */
export function storeAdminAuth(jwt: string, user: AdminLoginResponse["user"]) {
    if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", jwt);
        localStorage.setItem("adminUser", JSON.stringify(user));
    }
}

/**
 * Get stored admin token
 * @returns JWT token or null
 */
export function getAdminToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("adminToken");
    }
    return null;
}

/**
 * Get stored admin user data
 * @returns User data or null
 */
export function getAdminUser(): AdminLoginResponse["user"] | null {
    if (typeof window !== "undefined") {
        const userData = localStorage.getItem("adminUser");
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch {
                return null;
            }
        }
    }
    return null;
}

/**
 * Clear admin authentication data
 */
export function clearAdminAuth() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
    }
}

/**
 * Check if user is authenticated as admin
 * @returns true if admin token exists
 */
export function isAdminAuthenticated(): boolean {
    return getAdminToken() !== null;
}
