import ValidationException from '../errors/ValidationException';
import type Field from './Field';

export default class TextField implements Field<string> {
  public readonly type: string = 'text';

  public validate(value: string): string {
    return value;
  }

  public deserialize(value: unknown): string {
    if (value == null) {
      throw new ValidationException('invalidString', `Missing string value`);
    }
    if (typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value))) {
      return this.validate(String(value));
    }
    throw new ValidationException('invalidString', `Invalid string value`);
  }

  public serialize(value: string): string {
    return this.validate(value);
  }

  public encode(value: string): string {
    return this.validate(value);
  }

  public decode(value: string): string {
    return this.validate(value);
  }

  public encodeSortable(value: string): string {
    return this.encode(value);
  }

  public decodeSortable(value: string): string {
    return this.decode(value);
  }
}
