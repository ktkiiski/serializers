import type KeyValidationErrorList from './KeyValidationErrorList.js';

export default interface ValidationError {
  code: string;
  message: string;
  errors: KeyValidationErrorList;
}
