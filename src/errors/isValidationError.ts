import { hasOwnProperty } from 'immuton';
import type ValidationError from './ValidationError';

const keyTypes = ['string', 'number'];

function isKeyValidationError(error: unknown): error is ValidationError {
  return isValidationError(error) && hasOwnProperty(error, 'key') && keyTypes.includes(typeof error.key);
}

export default function isValidationError(error: unknown): error is ValidationError {
  return (
    hasOwnProperty(error, 'code') &&
    typeof error.code === 'string' &&
    hasOwnProperty(error, 'message') &&
    typeof error.message === 'string' &&
    hasOwnProperty(error, 'errors') &&
    Array.isArray(error.errors) &&
    error.errors.every(isKeyValidationError)
  );
}
