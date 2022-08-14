import isValidationError from '../errors/isValidationError.js';
import type Field from './Field.js';

/**
 * Makes the given field nullable, allowing null values for it.
 */
export default class NullableField<I, O> implements Field<I | null, O | null> {
  public readonly type: string;

  constructor(public readonly field: Field<I, O>) {
    this.type = field.type;
  }

  public validate(value: I | null): I | null {
    return nullify(value, this.field, 'validate');
  }

  public serialize(value: I | null): O | null {
    return nullify(value, this.field, 'serialize');
  }

  public deserialize(value: unknown): I | null {
    return nullify(value, this.field, 'deserialize');
  }

  public encode(value: I | null): string {
    return nullify(value, this.field, 'encode') ?? '';
  }

  public decode(value: string): I | null {
    return !value ? null : this.field.decode(value);
  }
}

function nullify(value: unknown, obj: any, method: string): any {
  if (value == null) {
    return null;
  }
  if ((value as unknown) !== '') {
    return obj[method](value);
  }
  try {
    return obj[method](value);
  } catch (error) {
    if (isValidationError(error) && error.code === 'tooShort') {
      return null;
    }
    throw error;
  }
}
