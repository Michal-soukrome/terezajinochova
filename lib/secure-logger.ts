// Secure logging utility with PII redaction

interface LogData {
  [key: string]: unknown;
}

// Fields that should be redacted in logs
const SENSITIVE_FIELDS = [
  "email",
  "customer_email",
  "email_address",
  "password",
  "token",
  "api_key",
  "secret",
  "stripe_signature",
  "authorization",
  "x-stripe-signature",
  "session_id",
  "payment_intent",
  "customer_id",
  "card_number",
  "cvv",
  "expiry",
  "name",
  "first_name",
  "last_name",
  "phone",
  "address",
  "city",
  "state",
  "zip",
  "country",
];

// Email regex for additional detection
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

function redactSensitiveData(data: unknown): unknown {
  if (typeof data === "string") {
    // Redact email addresses
    return data.replace(EMAIL_REGEX, "[EMAIL_REDACTED]");
  }

  if (Array.isArray(data)) {
    return data.map(redactSensitiveData);
  }

  if (data && typeof data === "object") {
    const redacted: LogData = {};

    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();

      if (SENSITIVE_FIELDS.some((field) => lowerKey.includes(field))) {
        redacted[key] = "[REDACTED]";
      } else {
        redacted[key] = redactSensitiveData(value);
      }
    }

    return redacted;
  }

  return data;
}

export class SecureLogger {
  static info(message: string, data?: LogData): void {
    console.log(`[INFO] ${message}`, data ? redactSensitiveData(data) : "");
  }

  static warn(message: string, data?: LogData): void {
    console.warn(`[WARN] ${message}`, data ? redactSensitiveData(data) : "");
  }

  static error(message: string, error?: Error | unknown, data?: LogData): void {
    const logData = {
      ...(redactSensitiveData(data || {}) as LogData),
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : redactSensitiveData(error),
    };

    console.error(`[ERROR] ${message}`, logData);
  }

  static security(message: string, data?: LogData): void {
    console.warn(
      `[SECURITY] ${message}`,
      data ? redactSensitiveData(data) : ""
    );
  }
}
