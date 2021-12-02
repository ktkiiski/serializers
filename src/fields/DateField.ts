import deserializeDate from '../datetime/deserializeDate';
import serializeDate from '../datetime/serializeDate';
import ValidationException from '../errors/ValidationException';
import type Field from './Field';

export default class DateField implements Field<Date, string> {
  public readonly type: string = 'date';

  public validate(value: Date): Date {
    if (Number.isNaN(value.getTime())) {
      throw new ValidationException('invalidDate', 'Invalid date value');
    }
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  public serialize = serializeDate;

  public deserialize = deserializeDate;

  public encode(value: Date): string {
    return this.serialize(value);
  }

  public decode(value: string): Date {
    return this.deserialize(value);
  }
}
