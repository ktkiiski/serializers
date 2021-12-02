import deserializeDateTime from '../datetime/deserializeDateTime';
import serializeDateTime from '../datetime/serializeDateTime';
import ValidationException from '../errors/ValidationException';
import type Field from './Field';

export default class DateTimeField implements Field<Date, string> {
  public readonly type: string = 'timestamptz';

  public validate(value: Date): Date {
    if (Number.isNaN(value.getTime())) {
      throw new ValidationException('invalidDateTime', 'Invalid date/time value');
    }
    return value;
  }

  public serialize = serializeDateTime;

  public deserialize = deserializeDateTime;

  public encode(value: Date): string {
    return this.serialize(value);
  }

  public decode(value: string): Date {
    return this.deserialize(value);
  }
}
