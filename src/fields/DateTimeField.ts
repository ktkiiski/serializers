import deserializeDateTime from '../datetime/deserializeDateTime';
import serializeDateTime from '../datetime/serializeDateTime';
import ValidationException from '../errors/ValidationException';
import type Field from './Field';

function ensureDateTime(value: unknown): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }
  throw new ValidationException('invalidDateTime', 'Invalid date/time value');
}

export default class DateTimeField implements Field<Date, string> {
  public readonly type: string = 'timestamptz';

  public validate(value: Date): Date {
    return ensureDateTime(value);
  }

  public serialize(value: Date): string {
    return serializeDateTime(ensureDateTime(value));
  }

  public deserialize(value: unknown): Date {
    return ensureDateTime(value instanceof Date ? value : deserializeDateTime(value));
  }

  public encode(value: Date): string {
    return serializeDateTime(ensureDateTime(value));
  }

  public decode(value: string): Date {
    return ensureDateTime(deserializeDateTime(value));
  }
}
