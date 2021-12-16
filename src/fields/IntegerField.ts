/* eslint-disable no-param-reassign */
import ValidationException from '../errors/ValidationException';
import type Field from './Field';
import NumberField from './NumberField';

const MAX_INTEGER = Number.MAX_SAFE_INTEGER;
const MIN_INTEGER = Number.MIN_SAFE_INTEGER;

export default class IntegerField<Value extends number> extends NumberField<Value> implements Field<Value> {
  public readonly type: string = 'integer';

  protected validateNumber(value: number): Value {
    const number = super.validateNumber(value);
    if (number > MAX_INTEGER) {
      throw new ValidationException('greaterThanSafe', `Integer value cannot be greater than ${MAX_INTEGER}`);
    }
    if (number < MIN_INTEGER) {
      throw new ValidationException('lessThanSafe', `Integer value cannot be less than ${MIN_INTEGER}`);
    }
    return Math.round(number) as Value;
  }
}
