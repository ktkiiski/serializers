/* eslint-disable no-bitwise */
import ValidationException from '../errors/ValidationException';
import type Field from './Field';

export interface NumberFieldOptions {
  min?: number;
  max?: number;
}

const { POSITIVE_INFINITY, NEGATIVE_INFINITY } = Number;

function ensureNumber(value: unknown): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new ValidationException('invalidNumber', 'Invalid number value');
  }
  return value;
}

function parseNumber(value: unknown): number {
  if (typeof value === 'string' && value !== '') {
    return ensureNumber(+value);
  }
  return ensureNumber(value);
}

export default class FloatField<Value extends number = number> implements Field<Value> {
  public readonly min: number;

  public readonly max: number;

  public readonly type: string = 'double precision';

  constructor(options?: NumberFieldOptions) {
    this.min = options?.min ?? NEGATIVE_INFINITY;
    this.max = options?.max ?? POSITIVE_INFINITY;
  }

  public validate(value: Value): Value {
    return this.validateNumber(ensureNumber(value));
  }

  public serialize(value: Value): Value {
    return this.validateNumber(ensureNumber(value));
  }

  public deserialize(value: unknown): Value {
    return this.validateNumber(parseNumber(value));
  }

  public encode(value: Value): string {
    return this.validateNumber(ensureNumber(value)).toString();
  }

  public decode(value: string): Value {
    return this.validateNumber(parseNumber(value));
  }

  protected validateNumber(value: number): Value {
    if (Number.isNaN(value)) {
      throw new ValidationException('invalidNumber', 'Invalid number value');
    }
    if (!Number.isFinite(value)) {
      throw new ValidationException('invalidNumber', 'Number value cannot be infinite');
    }
    const { min, max } = this;
    if (value < min) {
      throw new ValidationException('lessThanMin', `Value cannot be less than ${min}`);
    }
    if (value > max) {
      throw new ValidationException('moreThanMax', `Value cannot be greater than ${max}`);
    }
    return value as Value;
  }
}
