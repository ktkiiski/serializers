import ValidationException from '../errors/ValidationException';
import type Field from './Field';

function ensureString(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  throw new ValidationException('invalidString', `Invalid string value`);
}

interface TextFieldOptions {
  minLength?: number;
  maxLength?: number;
}

export default class TextField<I extends string = string> implements Field<I> {
  public readonly type: string = 'text';

  public readonly minLength: number;

  public readonly maxLength: number;

  constructor(options?: TextFieldOptions) {
    this.minLength = options?.minLength ?? 0;
    this.maxLength = options?.maxLength ?? Infinity;
  }

  public validate(value: string): I {
    return this.validateString(ensureString(value));
  }

  public deserialize(value: unknown): I {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return this.validateString(String(value));
    }
    return this.validateString(ensureString(value));
  }

  public serialize(value: string): I {
    return this.validateString(ensureString(value));
  }

  public encode(value: string): string {
    return this.validateString(ensureString(value));
  }

  public decode(value: string): I {
    return this.validateString(value);
  }

  protected validateString(value: string): I {
    const { minLength, maxLength } = this;
    if (value.length < minLength) {
      throw new ValidationException(
        'tooShort',
        minLength === 1 ? 'String cannot be blank' : `String cannot be shorter than ${minLength} characters`,
      );
    }
    if (value.length > maxLength) {
      throw new ValidationException(
        'tooLong',
        `String cannot be longer than ${maxLength} ${maxLength === 1 ? 'character' : 'characters'}`,
      );
    }
    return value as I;
  }
}
