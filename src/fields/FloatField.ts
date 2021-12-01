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

  public encodeSortable(value: number): string {
    // eslint-disable-next-line no-param-reassign
    value = this.validate(value);
    const bytes = Array.from(new Uint16Array(Float64Array.from([Math.abs(value)]).buffer));
    const chunks = bytes.map((byte) => (value < 0 ? 0xffff ^ byte : byte).toString(16).padStart(4, '0')).reverse();
    return `${value < 0 ? '-' : '0'}${chunks.join('')}`;
  }

  public decodeSortable(value: string): number {
    const sign = value[0];
    const byteStr = value.slice(1);
    const byteArr: number[] = [];
    for (let i = 0; i < byteStr.length; i += 4) {
      const bytes = parseInt(byteStr.slice(i, i + 4), 16);
      if (Number.isNaN(bytes)) {
        throw new ValidationException('invalidNumber', `Invalid decoded number`);
      }
      byteArr.unshift(sign === '-' ? 0xffff ^ bytes : bytes);
    }
    const float = new Float64Array(Uint16Array.from(byteArr).buffer)[0];
    return this.validate(sign === '-' ? -float : float);
  }
}
