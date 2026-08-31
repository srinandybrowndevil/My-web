/**
 * API Security Utilities for MUCO Labs
 * Ensures sensitive API operations are handled server-side
 */

// Client-side API calls that should be proxied through server
export const SERVER_ONLY_ENDPOINTS = [
  '/api/send-email',
  '/api/contact',
  '/api/email/test',
  '/api/contact/messages'
];

// Validate that an endpoint should be called from client-side
export function isClientSafeEndpoint(endpoint: string): boolean {
  return !SERVER_ONLY_ENDPOINTS.some(protectedEndpoint => 
    endpoint.includes(protectedEndpoint)
  );
}

// Sanitize user input to prevent injection attacks
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (basic validation for Indian numbers)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-()]{10,20}$/;
  return phoneRegex.test(phone);
}

// Rate limiting in-memory store (for development)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetTime: record.resetTime 
    };
  }

  record.count++;
  return { 
    allowed: true, 
    remaining: maxRequests - record.count, 
    resetTime: record.resetTime 
  };
}

// CSRF token generation (simplified for demo)
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Validate environment variable is set
export function requireEnvVar(varName: string): string {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Required environment variable ${varName} is not set`);
  }
  return value;
}

// Safe localStorage wrapper with error handling
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
};