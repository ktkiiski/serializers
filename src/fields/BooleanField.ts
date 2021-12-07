import ValidationException from '../errors/ValidationException';
import type Field from './Field';

function ensureBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  throw new ValidationException('invalidBoolean', `Invalid boolean value`);
}

export default class BooleanField implements Field<boolean> {
  public readonly type: string = 'boolean';

  public validate(value: boolean): boolean {
    return ensureBoolean(value);
  }

  public deserialize(value: unknown): boolean {
    return ensureBoolean(value);
  }

  public serialize(value: unknown): boolean {
    return ensureBoolean(value);
  }

  public encode(value: boolean): 'true' | 'false' {
    return ensureBoolean(value) ? 'true' : 'false';
  }

  public decode(value: string): boolean {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new ValidationException('invalidBoolean', `Invalid encoded boolean value`);
    }
  }
}
