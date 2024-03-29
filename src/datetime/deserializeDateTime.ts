import ValidationException from '../errors/ValidationException.js';

const isoRegexp = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:[+-]\d\d:\d\d|Z)$/;

export default function deserializeDateTime(value: unknown): Date {
  // Try to parse the date from the string
  // Let Date.parse(…) do the parsing but use the regexp to be more strict, i.e.
  // only accept ISO formatted date-time. This is not a date-time parsing library.
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new ValidationException('invalidValue', `Invalid string or number type`);
  }
  const date = typeof value === 'string' && isoRegexp.test(value) ? Date.parse(value) : value;
  if (Number.isFinite(date)) {
    // Accept the number of milliseconds from epoch
    return new Date(date);
  }
  throw new ValidationException('invalidDateTimeFormat', `Invalid date/time format`);
}
