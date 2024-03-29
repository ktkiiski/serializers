import type ValidationError from './ValidationError.js';
import isValidationError from './isValidationError.js';

/**
 * Helper that asserts that the given parameter is a valid
 * validation error, narrowing down its type for following lines in TypeScript.
 * If the parameter is not a valid validation error, it is (re)thrown.
 * @param error an error object to validate
 */
export default function assertValidationError(error: unknown): asserts error is ValidationError {
  if (!isValidationError(error)) {
    throw error;
  }
}
