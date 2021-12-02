import ValidationException from '../errors/ValidationException';
import type Field from './Field';

export default class BooleanField implements Field<boolean> {
  public readonly type: string = 'boolean';

  public validate(value: boolean): boolean {
    return value;
  }

  public deserialize(value: unknown): boolean {
    if (typeof value === 'boolean') {
      return value;
    }
    throw new ValidationException('invalidBoolean', `Invalid boolean value`);
  }

  public serialize(value: boolean): boolean {
    return value;
  }

  public encode(value: boolean): 'true' | 'false' {
    return value ? 'true' : 'false';
  }

  public decode(value: string): boolean {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    throw new ValidationException('invalidBoolean', `Invalid encoded boolean value`);
  }
}
