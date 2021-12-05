import ValidationException from '../errors/ValidationException';
import type Field from './Field';

function transform(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  throw new ValidationException('invalidBoolean', `Invalid boolean value`);
}

export default class BooleanField implements Field<boolean> {
  public readonly type: string = 'boolean';

  public validate = transform;

  public deserialize = transform;

  public serialize = transform;

  public encode(value: boolean): 'true' | 'false' {
    return transform(value) ? 'true' : 'false';
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
