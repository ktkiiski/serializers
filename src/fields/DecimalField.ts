/* eslint-disable no-param-reassign */
import ValidationException from '../errors/ValidationException.js';
import RegexpField from './RegexpField.js';

const decimalRegexp = /^\s*[+-]?\d+(?:\.\d+)?\s*$/;
const MIN_DECIMALS = -20;
const MAX_DECIMALS = 20;

export default class DecimalField extends RegexpField {
  public readonly type: string = 'numeric';

  constructor(public readonly decimals: number) {
    super(decimalRegexp, 'invalidDecimal', 'Invalid decimal string');
    if (typeof decimals !== 'number' || Number.isNaN(decimals)) {
      throw new Error('Decimal precision must be a finite number');
    }
    if (decimals < MIN_DECIMALS) {
      throw new Error(`Decimal precision cannot be less than ${MIN_DECIMALS}`);
    }
    if (decimals > MAX_DECIMALS) {
      throw new Error(`Decimal precision cannot be greater than ${MAX_DECIMALS}`);
    }
  }

  protected validateString(value: string): string {
    const decimalStr = super.validateString(value);
    // This should always become a valid number
    return this.serializeDecimal(+decimalStr);
  }

  public deserialize(value: unknown): string {
    if (typeof value === 'number') {
      if (Number.isNaN(value) || !Number.isFinite(value)) {
        throw new ValidationException('invalidNumber', 'Number value must be finite');
      }
      // Just convert the numeric value to a string
      return this.serializeDecimal(value);
    }
    if (typeof value === 'string') {
      return super.deserialize(value);
    }
    throw new ValidationException('invalidValue', 'Invalid string or number value');
  }

  private serializeDecimal(num: number): string {
    const { decimals } = this;
    if (decimals >= 0) {
      return num.toFixed(decimals);
    }
    const exp = 10 ** -decimals;
    const rounded = Math.round(num / exp) * exp;
    return rounded.toFixed(0);
  }
}
