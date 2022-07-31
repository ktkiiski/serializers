import type KeyValidationErrorList from './KeyValidationErrorList.js';
import type ValidationError from './ValidationError.js';

class ValidationException extends Error implements ValidationError {
  public name = 'ValidationException';

  constructor(public readonly code: string, message: string, public readonly errors: KeyValidationErrorList = []) {
    super(message);
  }
}

export default ValidationException;
