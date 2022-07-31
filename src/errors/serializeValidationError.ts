import type ValidationError from './ValidationError.js';

export default function serializeValidationError(error: ValidationError): ValidationError {
  const { code, message, errors } = error;
  return { code, message, errors };
}
