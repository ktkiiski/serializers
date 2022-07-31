import deserializeDate from '../datetime/deserializeDate.js';
import serializeDate from '../datetime/serializeDate.js';
import ValidationException from '../errors/ValidationException.js';
import type Field from './Field.js';

function ensureDate(value: unknown): Date {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    throw new ValidationException('invalidDate', 'Invalid date value');
  }
  if (value.getHours() !== 0 || value.getMinutes() !== 0 || value.getSeconds() !== 0 || value.getMilliseconds() !== 0) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
  return value;
}

export default class DateField implements Field<Date, string> {
  public readonly type: string = 'date';

  public validate(value: Date): Date {
    return ensureDate(value);
  }

  public serialize(value: Date): string {
    return serializeDate(ensureDate(value));
  }

  public deserialize(value: unknown): Date {
    return ensureDate(value instanceof Date ? value : deserializeDate(value));
  }

  public encode(value: Date): string {
    return serializeDate(ensureDate(value));
  }

  public decode(value: string): Date {
    return ensureDate(deserializeDate(value));
  }
}
