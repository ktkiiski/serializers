import type ValidationError from './ValidationError.js';

export default interface KeyValidationError<Key extends string | number> extends ValidationError {
  key: Key;
}
