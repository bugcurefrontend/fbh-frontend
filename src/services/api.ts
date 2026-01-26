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

  if (isDjangoPath && process.env.NEXT_PUBLIC_DJANGO_API_URL) {
    return `${process.env.NEXT_PUBLIC_DJANGO_API_URL}${path}`;
  }

  if (!process.env.NEXT_PUBLIC_FBH_API_URL) {
    console.warn("Please provide Strapi URL in env (NEXT_PUBLIC_FBH_API_URL)");
  }
  return `${process.env.NEXT_PUBLIC_FBH_API_URL}${path}`;
}

/**
 * Stringify params for Strapi query string
 * Handles nested objects and arrays
 */
export function stringifyParams(
  params: Record<string, any>,
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
        return stringifyParams(value, encodedKey);
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
export async function fetchAPI(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
): Promise<any> {
  const token = process.env.NEXT_PUBLIC_FBH_API_TOKEN;

  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const queryString = stringifyParams(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      const respText = await response.text();
      console.error(`API non-ok response: ${response.status} ${respText}`);
      throw new Error(`Failed to fetch data. Status: ${response.status} - ${respText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API request failed: ${error.message}`);
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
