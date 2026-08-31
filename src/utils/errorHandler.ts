/**
 * Comprehensive Error Handling Utilities for MUCO Labs
 * Provides retry logic, error classification, and recovery strategies
 */

export enum ErrorType {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  NOT_FOUND = 'not_found',
  SERVER = 'server',
  UNKNOWN = 'unknown'
}

export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: ErrorType[];
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryableErrors: [ErrorType.NETWORK, ErrorType.SERVER]
};

export class AppError extends Error {
  constructor(
    message: string,
    public type: ErrorType = ErrorType.UNKNOWN,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Classify error based on error characteristics
 */
export function classifyError(error: Error | AppError | unknown): ErrorType {
  if (error instanceof AppError) {
    return error.type;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // Network errors
    if (message.includes('network') || message.includes('fetch') || message.includes('timeout')) {
      return ErrorType.NETWORK;
    }
    
    // Authentication errors
    if (message.includes('unauthorized') || message.includes('401') || message.includes('authentication')) {
      return ErrorType.AUTHENTICATION;
    }
    
    // Authorization errors
    if (message.includes('forbidden') || message.includes('403') || message.includes('permission')) {
      return ErrorType.AUTHORIZATION;
    }
    
    // Not found errors
    if (message.includes('not found') || message.includes('404')) {
      return ErrorType.NOT_FOUND;
    }
    
    // Server errors
    if (message.includes('500') || message.includes('502') || message.includes('503')) {
      return ErrorType.SERVER;
    }
  }

  return ErrorType.UNKNOWN;
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | AppError | unknown;
  let delay = config.initialDelay;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const errorType = classifyError(error);

      // Don't retry non-retryable errors
      if (!config.retryableErrors.includes(errorType)) {
        throw error;
      }

      // Don't retry if we've reached max attempts
      if (attempt === config.maxAttempts) {
        throw new AppError(
          `Operation failed after ${config.maxAttempts} attempts`,
          errorType,
          undefined,
          error instanceof Error ? error : undefined
        );
      }

      // Wait before retrying with exponential backoff
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * config.backoffMultiplier, config.maxDelay);
    }
  }

  throw lastError;
}

/**
 * Safe async wrapper with error handling
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback: T,
  errorHandler?: (error: Error) => void
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const appError = error instanceof Error ? error : new Error(String(error));
    
    if (errorHandler) {
      errorHandler(appError);
    } else {
      console.error('Async operation failed:', appError);
    }
    
    return fallback;
  }
}

/**
 * Circuit breaker pattern for preventing cascading failures
 */
export class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private isOpen = false;

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.isOpen) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.isOpen = false;
        this.failureCount = 0;
      } else {
        throw new AppError('Circuit breaker is open', ErrorType.SERVER);
      }
    }

    try {
      const result = await operation();
      this.failureCount = 0;
      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      if (this.failureCount >= this.threshold) {
        this.isOpen = true;
      }

      throw error;
    }
  }

  reset(): void {
    this.failureCount = 0;
    this.lastFailureTime = 0;
    this.isOpen = false;
  }
}

/**
 * Error recovery strategies
 */
export function getRecoveryStrategy(errorType: ErrorType): {
  canRetry: boolean;
  userMessage: string;
  suggestedAction: string;
} {
  switch (errorType) {
    case ErrorType.NETWORK:
      return {
        canRetry: true,
        userMessage: 'Network connection issue detected',
        suggestedAction: 'Please check your internet connection and try again'
      };
    case ErrorType.AUTHENTICATION:
      return {
        canRetry: false,
        userMessage: 'Authentication failed',
        suggestedAction: 'Please log in again'
      };
    case ErrorType.AUTHORIZATION:
      return {
        canRetry: false,
        userMessage: 'You don\'t have permission to perform this action',
        suggestedAction: 'Contact your administrator for access'
      };
    case ErrorType.NOT_FOUND:
      return {
        canRetry: false,
        userMessage: 'Resource not found',
        suggestedAction: 'The requested resource may have been moved or deleted'
      };
    case ErrorType.SERVER:
      return {
        canRetry: true,
        userMessage: 'Server error occurred',
        suggestedAction: 'Our team has been notified. Please try again later'
      };
    default:
      return {
        canRetry: true,
        userMessage: 'An unexpected error occurred',
        suggestedAction: 'Please try again or contact support if the problem persists'
      };
  }
}

/**
 * Global error logger (can be extended to send to external services)
 */
export function logError(error: Error | AppError, context?: Record<string, unknown>): void {
  const errorLog = {
    message: error.message,
    type: error instanceof AppError ? error.type : classifyError(error),
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context: context || {},
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
  };

  console.error('Error logged:', errorLog);

  // Here you would send to external error tracking service
  // Example: Sentry.captureException(error, { extra: errorLog });
}