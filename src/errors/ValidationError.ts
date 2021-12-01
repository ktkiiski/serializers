import type KeyValidationErrorList from './KeyValidationErrorList';

export default interface ValidationError {
  code: string;
  message: string;
  errors: KeyValidationErrorList;
}
