import { deepEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException';
import DateField from './DateField';

describe('DateField', () => {
  const field = new DateField();
  describe('validate()', () => {
    it('allows Date object', () => {
      deepEqual(field.validate(new Date(2021, 10, 7)), new Date(2021, 10, 7));
      deepEqual(field.validate(new Date(1990, 3, 5)), new Date(1990, 3, 5));
    });
    it('truncates Date precision to the date', () => {
      deepEqual(field.validate(new Date(2021, 10, 7, 3, 30, 5, 123)), new Date(2021, 10, 7));
      deepEqual(field.validate(new Date(1990, 3, 5, 0, 6)), new Date(1990, 3, 5));
    });
    it('throws on invalid Date objects', () => {
      const validationError = new ValidationException('invalidDate', 'Invalid date value');
      throws(() => field.validate(new Date('asdf')), validationError);
    });
    it('throws on non-Date values', () => {
      const validationError = new ValidationException('invalidDate', 'Invalid date value');
      throws(() => field.validate(0 as any), validationError);
      throws(() => field.validate('' as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes Date object as ISO date string', () => {
      deepEqual(field.serialize(new Date(2021, 10, 7)), '2021-11-07');
      deepEqual(field.serialize(new Date(1990, 3, 5)), '1990-04-05');
    });
    it('truncates Date precision to the date', () => {
      deepEqual(field.serialize(new Date(2021, 10, 7, 3, 30, 5, 123)), '2021-11-07');
      deepEqual(field.serialize(new Date(1990, 3, 5, 0, 6)), '1990-04-05');
    });
    it('throws on invalid Date objects', () => {
      const validationError = new ValidationException('invalidDate', 'Invalid date value');
      throws(() => field.serialize(new Date('asdf')), validationError);
    });
    it('throws on non-Date values', () => {
      const validationError = new ValidationException('invalidDate', 'Invalid date value');
      throws(() => field.serialize(0 as any), validationError);
      throws(() => field.serialize('' as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes ISO strings as Date objects', () => {
      deepEqual(field.deserialize('2021-11-07'), new Date(2021, 10, 7));
      deepEqual(field.deserialize('1990-04-05'), new Date(1990, 3, 5));
    });
    it('deserializes Date objects as truncated Date objects', () => {
      deepEqual(field.deserialize(new Date(2021, 10, 7, 3, 30, 5, 123)), new Date(2021, 10, 7));
      deepEqual(field.deserialize(new Date(1990, 3, 5, 0, 6)), new Date(1990, 3, 5));
    });
    it('throws on invalid ISO date strings', () => {
      const validationError = new ValidationException('invalidDateFormat', 'Invalid date format');
      throws(() => field.deserialize(''), validationError);
      throws(() => field.deserialize('2021-11-5'), validationError);
      throws(() => field.deserialize('2021-12-07T12:03:39.171Z'), validationError);
    });
    it('throws on non-string/Date values', () => {
      const validationError = new ValidationException('invalidString', 'Date must be a string');
      throws(() => field.deserialize(0), validationError);
      throws(() => field.deserialize(true), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes Date object as ISO date string', () => {
      deepEqual(field.encode(new Date(2021, 10, 7)), '2021-11-07');
      deepEqual(field.encode(new Date(1990, 3, 5)), '1990-04-05');
    });
    it('truncates Date precision to the date', () => {
      deepEqual(field.encode(new Date(2021, 10, 7, 3, 30, 5, 123)), '2021-11-07');
      deepEqual(field.encode(new Date(1990, 3, 5, 0, 6)), '1990-04-05');
    });
    it('throws on invalid Date objects', () => {
      const validationError = new ValidationException('invalidDate', 'Invalid date value');
      throws(() => field.encode(new Date('asdf')), validationError);
    });
    it('throws on non-Date values', () => {
      const validationError = new ValidationException('invalidDate', 'Invalid date value');
      throws(() => field.encode(0 as any), validationError);
      throws(() => field.encode('' as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes ISO strings as Date objects', () => {
      deepEqual(field.decode('2021-11-07'), new Date(2021, 10, 7));
      deepEqual(field.decode('1990-04-05'), new Date(1990, 3, 5));
    });
    it('throws on invalid ISO date strings', () => {
      const validationError = new ValidationException('invalidDateFormat', 'Invalid date format');
      throws(() => field.decode(''), validationError);
      throws(() => field.decode('2021-11-5'), validationError);
      throws(() => field.decode('2021-12-07T12:03:39.171Z'), validationError);
    });
  });
});
