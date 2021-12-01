import type ValidationError from './ValidationError';

export default interface KeyValidationError<Key extends string | number> extends ValidationError {
  key: Key;
}
