type LogLevel = "debug" | "info" | "warn" | "error";

const isProd = process.env.NODE_ENV === "production";

function write(level: LogLevel, message: string, ...meta: unknown[]) {
  if (level === "debug" && isProd) return;

  if (level === "debug" || level === "info") {
    console.log(`[${level}] ${message}`, ...meta);
    return;
  }

  if (level === "warn") {
    console.warn(`[warn] ${message}`, ...meta);
    return;
  }

  console.error(`[error] ${message}`, ...meta);
}

export const logger = {
  debug: (message: string, ...meta: unknown[]) => write("debug", message, ...meta),
  info: (message: string, ...meta: unknown[]) => write("info", message, ...meta),
  warn: (message: string, ...meta: unknown[]) => write("warn", message, ...meta),
  error: (message: string, ...meta: unknown[]) => write("error", message, ...meta),
};

