import { logger } from "@/lib/logger";

export function serviceErrorFallback<T>(scope: string, error: unknown, fallback: T): T {
  logger.error(scope, error);
  return fallback;
}

