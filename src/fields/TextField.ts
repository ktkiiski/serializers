import ValidationException from '../errors/ValidationException';
import type Field from './Field';

function ensureString(value: unknown): string {
  if (typeof value === 'string') {
    return String(value);
  }
  throw new ValidationException('invalidString', `Invalid string value`);
}

export default class TextField<I extends string = string> implements Field<I> {
  public readonly type: string = 'text';

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
    return value as I;
  }
}
