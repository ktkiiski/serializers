/* eslint-disable no-param-reassign */
import ValidationException from '../errors/ValidationException';
import type Field from './Field';
import NumberField from './NumberField';

const MAX_INTEGER = Math.min(Number.MAX_SAFE_INTEGER, +2147483647);
const MIN_INTEGER = Math.max(Number.MIN_SAFE_INTEGER, -2147483648);

export default class IntegerField<Value extends number> extends NumberField<Value> implements Field<Value> {
  public readonly type: string = 'integer';

  protected validateNumber(value: number): Value {
    const number = super.validateNumber(value);
    if (number > MAX_INTEGER) {
      throw new ValidationException('greaterThanMax', `Integer value cannot be greater than ${MAX_INTEGER}`);
    }
    if (number < MIN_INTEGER) {
      throw new ValidationException('lessThanMin', `Integer value cannot be less than ${MIN_INTEGER}`);
    }
    return Math.trunc(number) as Value;
  }
}
