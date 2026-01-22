/**
 * Error Handler Utilities
 *
 * Consistent error handling utilities for CoralCSS.
 * @module utils/error-handler
 */

/**
 * Result type for operations that can fail
 * Provides a type-safe way to handle errors without exceptions
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Handle async errors consistently
 * Converts any error into a Result type with proper logging
 */
export function handleAsyncError<T>(
  operation: string,
  error: unknown,
  context?: Record<string, unknown>
): Result<T, Error> {
  const err = error instanceof Error ? error : new Error(String(error))

  // Add context to error for debugging
  if (context) {
    ;(err as unknown as { context: Record<string, unknown> }).context = context
  }

  // Log error to console
  console.error(`CoralCSS: ${operation} failed:`, err)

  return { success: false, error: err }
}

/**
 * Wrap async function with error handling
 * Returns a Result type instead of throwing exceptions
 */
export async function tryAsync<T>(
  operation: string,
  fn: () => Promise<T>,
  context?: Record<string, unknown>
): Promise<Result<T>> {
  try {
    const data = await fn()
    return { success: true, data }
  } catch (error) {
    return handleAsyncError<T>(operation, error, context)
  }
}

/**
 * Wrap sync function with error handling
 * Returns a Result type instead of throwing exceptions
 */
export function trySync<T>(
  operation: string,
  fn: () => T,
  context?: Record<string, unknown>
): Result<T> {
  try {
    const data = fn()
    return { success: true, data }
  } catch (error) {
    return handleAsyncError<T>(operation, error, context)
  }
}

/**
 * Check if a Result is successful
 */
export function isSuccess<T>(result: Result<T>): result is { success: true; data: T } {
  return result.success
}

/**
 * Check if a Result is an error
 */
export function isFailure<E extends Error>(result: Result<unknown, E>): result is { success: false; error: E } {
  return !result.success
}

/**
 * Unwrap a Result, throwing if it's an error
 * Use this when you're certain the Result is successful
 */
export function unwrap<T>(result: Result<T>): T {
  if (result.success) {
    return result.data
  }
  throw result.error
}

/**
 * Get the error from a Result, or undefined if successful
 */
export function getError<E extends Error>(result: Result<unknown, E>): E | undefined {
  return result.success ? undefined : result.error
}

/**
 * Get the data from a Result, or undefined if it failed
 */
export function getData<T>(result: Result<T>): T | undefined {
  return result.success ? result.data : undefined
}
