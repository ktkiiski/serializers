import ValidationException from '../errors/ValidationException.js';
import type Field from './Field.js';

function ensureString(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  throw new ValidationException('invalidString', `Invalid string value`);
}

export interface StringFieldOptions {
  trim?: boolean;
  minLength?: number;
  maxLength?: number | null;
}

export default class StringField<I extends string = string> implements Field<I> {
  public readonly type: string = 'text';

  public readonly trim: boolean;

  public readonly minLength: number;

  public readonly maxLength: number | null;

  constructor(options?: StringFieldOptions) {
    this.minLength = options?.minLength ?? 0;
    this.maxLength = options?.maxLength ?? null;
    this.trim = options?.trim ?? false;
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
    const { minLength, maxLength, trim } = this;
    const str = trim ? (value.trim() as I) : (value as I);
    if (str.length < minLength) {
      throw new ValidationException(
        'tooShort',
        minLength === 1 ? 'Value may not be blank' : `Value may not be shorter than ${minLength} characters`,
      );
    }
    if (maxLength != null && str.length > maxLength) {
      throw new ValidationException(
        'tooLong',
        `Value may not be longer than ${maxLength} ${maxLength === 1 ? 'character' : 'characters'}`,
      );
    }
    return str;
  }
}
