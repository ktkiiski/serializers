import ValidationException from '../errors/ValidationException.js';

const dateRegexp = /^(\d{4})-(\d{2})-(\d{2})$/;

export default function deserializeDate(value: unknown): Date {
  if (typeof value !== 'string') {
    throw new ValidationException('invalidString', `Date must be a string`);
  }
  // Try to parse the date from the string
  const match = dateRegexp.exec(value);
  if (!match) {
    throw new ValidationException('invalidDateFormat', `Invalid date format`);
  }
  const [, yearStr, monthStr, dateStr] = match;
  return new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, parseInt(dateStr, 10));
}
