/* eslint-disable no-param-reassign */
import ValidationException from '../errors/ValidationException';
import type Field from './Field';
import NumberField from './FloatField';

const MAX_INTEGER = Math.min(Number.MAX_SAFE_INTEGER, +2147483647);
const MIN_INTEGER = Math.max(Number.MIN_SAFE_INTEGER, -2147483648);

export default class IntegerField extends NumberField implements Field<number> {
  public readonly type: string = 'integer';

  public validate(value: number): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
      if (value > MAX_INTEGER) {
        throw new ValidationException('greaterThanMax', `Integer value cannot be greater than ${MAX_INTEGER}`);
      }
      if (value < MIN_INTEGER) {
        throw new ValidationException('lessThanMin', `Integer value cannot be less than ${MIN_INTEGER}`);
      }
      return Math.trunc(super.validate(value));
    }
    throw new ValidationException('invalidInteger', `Invalid integer value`);
  }

  public deserialize(value: unknown): number {
    if (value == null) {
      throw new ValidationException('invalidInteger', `Missing integer value`);
    }
    // Try to parse from a string to an integer
    if (typeof value === 'string') {
      // If starting with special character '!', then it is a sortable encoding
      if (value[0] === '!') {
        value = parseInt(value.slice(1), 10) + Number.MIN_SAFE_INTEGER;
      } else {
        value = parseInt(value, 10);
      }
    }
    if (typeof value === 'number') {
      return this.validate(value);
    }
    throw new ValidationException('invalidInteger', `Invalid integer value`);
  }

  public encode(value: number): string {
    return this.serialize(value).toFixed(0);
  }

  public decode(value: string): number {
    return this.deserialize(value);
  }
}
