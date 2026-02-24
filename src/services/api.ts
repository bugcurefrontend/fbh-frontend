// Django API URL with fallback
import { logger } from "@/lib/logger";

const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || 'https://api-django.fbh.dev.heartfulness.org';

export class ApiRequestError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Get API URL based on path
 * Routes to Django for business logic, Strapi for content
 */
export function getStrapiURL(path: string): string {
  // Check if path is for Django backend
  const isDjangoPath =
    path.startsWith('/api/allocations') ||
    path.startsWith('/api/donations') ||
    path.startsWith('/api/donors') ||
    path.startsWith('/api/admin') ||
    path.startsWith('/api/certificates') ||
    path.startsWith('/api/users');

  if (isDjangoPath) {
    return `${DJANGO_API_URL}${path}`;
  }

  if (!process.env.NEXT_PUBLIC_FBH_API_URL) {
    logger.warn("Please provide Strapi URL in env (NEXT_PUBLIC_FBH_API_URL)");
  }
  return `${process.env.NEXT_PUBLIC_FBH_API_URL}${path}`;
}

/**
 * Stringify params for Strapi query string
 * Handles nested objects and arrays
 */
export function stringifyParams(
  params: Record<string, unknown>,
  parentKey: string | null = null
): string {
  return Object.entries(params)
    .map(([key, value]) => {
      const encodedKey = parentKey
        ? `${parentKey}[${encodeURIComponent(key)}]`
        : encodeURIComponent(key);

      if (Array.isArray(value)) {
        return value
          .map((item, index) => `${encodedKey}[${index}]=${encodeURIComponent(String(item))}`)
          .join("&");
      } else if (typeof value === "object" && value !== null) {
        return stringifyParams(value as Record<string, unknown>, encodedKey);
      }

      return `${encodedKey}=${encodeURIComponent(String(value))}`;
    })
    .join("&");
}

/**
 * Generic fetch function for Strapi API
 * @param path - API path (e.g., "/species", "/articles")
 * @param urlParamsObject - Query parameters object
 * @param options - Fetch options
 */
export async function fetchAPI<T = any>(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
): Promise<T> {
  const token = process.env.NEXT_PUBLIC_FBH_API_TOKEN;

  // Check if this is an admin API call and get admin token from localStorage
  const isAdminPath = path.startsWith('/admin');
  let authToken = token;

  if (isAdminPath && typeof window !== 'undefined') {
    const adminToken = localStorage.getItem('adminToken'); // Fixed: was 'accessToken'
    if (adminToken) {
      authToken = adminToken;
    }
  }

  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...options,
  };

  const queryString = stringifyParams(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      const respText = await response.text();
      let payload: unknown = respText;

      try {
        payload = respText ? JSON.parse(respText) : undefined;
      } catch {
        // Keep raw text payload when response isn't JSON.
      }

      const payloadMessage =
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof (payload as { message?: unknown }).message === "string"
          ? (payload as { message: string }).message
          : `Failed to fetch data. Status: ${response.status}`;

      // 4xx responses are often business validation errors and should be handled by callers.
      if (response.status >= 500) {
        logger.error(`API request failed with server error ${response.status}`);
      }

      throw new ApiRequestError(payloadMessage, response.status, payload);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error;
    }

    if (error instanceof Error) {
      logger.error(`Network/API request error: ${error.message}`);
      throw new Error(`Something went wrong during API request: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Helper to check if value is not empty
 */
export function isNotEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return false;
}
