import ValidationException from '../errors/ValidationException';

export default function deserializeDateTime(value: unknown): Date {
  // Try to parse the date from the string
  const date = typeof value === 'string' ? Date.parse(value) : value;
  if (typeof date !== 'number') {
    throw new ValidationException('invalidValue', `Invalid string or integer type`);
  }
  if (Number.isFinite(date)) {
    // Accept the number of milliseconds from epoch
    return new Date(date);
  }
  throw new ValidationException('invalidDateTimeFormat', `Invalid date/time format`);
}
