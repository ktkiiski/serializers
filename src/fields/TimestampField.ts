import deserializeDateTime from '../datetime/deserializeDateTime.js';
import ValidationException from '../errors/ValidationException.js';
import type Field from './Field.js';
import NumberField from './NumberField.js';

export default class TimestampField implements Field<Date, number> {
  public readonly type: string = 'timestamptz';

  private readonly numberField = new NumberField({});

  public validate(value: Date): Date {
    if (Number.isNaN(value.getTime())) {
      throw new ValidationException('invalidDateTime', 'Invalid date/time value');
    }
    return value;
  }

  public serialize(value: Date): number {
    return value.getTime();
  }

  public deserialize = deserializeDateTime;

  public encode(value: Date): string {
    return this.serialize(value).toString();
  }

  public decode(value: string): Date {
    const numeric = +value;
    if (Number.isNaN(numeric)) {
      return this.deserialize(value);
    }
    return new Date(numeric);
  }
}
