import type { DualEntryErrorBody } from "./types.js";

/**
 * Base error class for all DualEntry SDK errors.
 */
class DualEntryError extends Error {
  public readonly statusCode: number;
  public readonly response: DualEntryErrorBody | null;

  constructor(
    message: string,
    statusCode: number,
    response: DualEntryErrorBody | null = null,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.response = response;
    if ("captureStackTrace" in Error) {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Thrown when the API returns 401 (missing key) or 403 (invalid key).
 */
class DualEntryAuthError extends DualEntryError {
  constructor(
    message = "Authentication failed",
    statusCode = 401,
    response: DualEntryErrorBody | null = null,
  ) {
    super(message, statusCode, response);
  }
}

/**
 * Thrown when the API returns 404 Not Found.
 */
class DualEntryNotFoundError extends DualEntryError {
  constructor(
    message = "Resource not found",
    response: DualEntryErrorBody | null = null,
  ) {
    super(message, 404, response);
  }
}

/**
 * Thrown when the API returns 422 Unprocessable Entity.
 * The `errors` property contains the field-level validation messages.
 */
class DualEntryValidationError extends DualEntryError {
  public readonly errors: Record<string, string[]>;

  constructor(
    message = "Validation error",
    response: DualEntryErrorBody | null = null,
  ) {
    super(message, 422, response);
    this.errors = response?.errors ?? {};
  }
}

/**
 * Thrown when the API returns 429 Too Many Requests.
 */
class DualEntryRateLimitError extends DualEntryError {
  constructor(
    message = "Rate limit exceeded",
    response: DualEntryErrorBody | null = null,
  ) {
    super(message, 429, response);
  }
}

/**
 * Thrown when the API returns 500 or 503.
 */
class DualEntryServerError extends DualEntryError {
  constructor(
    message = "Server error",
    statusCode = 500,
    response: DualEntryErrorBody | null = null,
  ) {
    super(message, statusCode, response);
  }
}

export {
  DualEntryErrorBody,
  DualEntryError,
  DualEntryAuthError,
  DualEntryNotFoundError,
  DualEntryValidationError,
  DualEntryRateLimitError,
  DualEntryServerError,
};
