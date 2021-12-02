/* eslint-disable no-bitwise */
import ValidationException from '../errors/ValidationException';
import type Field from './Field';

export interface NumberFieldOptions {
  min?: number;
  max?: number;
}

const { POSITIVE_INFINITY, NEGATIVE_INFINITY } = Number;

export default class NumberField implements Field<number> {
  public readonly min: number;

  public readonly max: number;

  public readonly type: string = 'double precision';

  constructor(options?: NumberFieldOptions) {
    this.min = options?.min ?? NEGATIVE_INFINITY;
    this.max = options?.max ?? POSITIVE_INFINITY;
  }

  public validate(value: number): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
      const { min, max } = this;
      if (value < min) {
        throw new ValidationException('lessThanMin', `Value cannot be less than ${min}`);
      }
      if (value > max) {
        throw new ValidationException('moreThanMax', `Value cannot be greater than ${max}`);
      }
      return value;
    }
    throw new ValidationException('invalidNumber', `Invalid number value`);
  }

  public serialize(value: number): number {
    return this.validate(value);
  }

  public deserialize(value: unknown): number {
    if (value == null) {
      throw new ValidationException('invalidNumber', `Missing number value`);
    }
    // Try to parse from a string to a number
    if (typeof value === 'string') {
      return this.decode(value);
    }
    if (typeof value === 'number') {
      return this.validate(value);
    }
    throw new ValidationException('invalidNumber', `Invalid number value`);
  }

  public encode(value: number): string {
    return this.serialize(value).toString();
  }

  public decode(value: string): number {
    return this.validate(parseFloat(value));
  }
}
