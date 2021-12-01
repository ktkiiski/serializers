import type KeyValidationErrorList from './KeyValidationErrorList';
import type ValidationError from './ValidationError';

class ValidationException extends Error implements ValidationError {
  public name = 'ValidationException';

  constructor(public readonly code: string, message: string, public readonly errors: KeyValidationErrorList = []) {
    super(message);
  }
}

export default ValidationException;
