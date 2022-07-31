import { deepEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException.js';
import DateTimeField from './DateTimeField.js';

describe('DateTimeField', () => {
  const field = new DateTimeField();
  describe('validate()', () => {
    it('allows Date object', () => {
      deepEqual(field.validate(new Date(2021, 10, 7, 11, 21, 5, 12)), new Date(2021, 10, 7, 11, 21, 5, 12));
      deepEqual(field.validate(new Date(1990, 3, 5, 0, 50, 30)), new Date(1990, 3, 5, 0, 50, 30));
    });
    it('throws on invalid Date objects', () => {
      const validationError = new ValidationException('invalidDateTime', 'Invalid date/time value');
      throws(() => field.validate(new Date('asdf')), validationError);
    });
    it('throws on non-Date values', () => {
      const validationError = new ValidationException('invalidDateTime', 'Invalid date/time value');
      throws(() => field.validate(0 as any), validationError);
      throws(() => field.validate('' as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes Date object as ISO date/time string', () => {
      deepEqual(field.serialize(new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 12))), '2021-11-07T11:21:05.012Z');
      deepEqual(field.serialize(new Date(Date.UTC(1990, 3, 5, 0, 50, 30))), '1990-04-05T00:50:30.000Z');
    });
    it('throws on invalid Date objects', () => {
      const validationError = new ValidationException('invalidDateTime', 'Invalid date/time value');
      throws(() => field.serialize(new Date('asdf')), validationError);
    });
    it('throws on non-Date values', () => {
      const validationError = new ValidationException('invalidDateTime', 'Invalid date/time value');
      throws(() => field.serialize(0 as any), validationError);
      throws(() => field.serialize('' as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes full precision ISO strings as Date objects', () => {
      deepEqual(field.deserialize('2021-11-07T11:21:05.012Z'), new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 12)));
      deepEqual(field.deserialize('1990-04-05T00:50:30.000Z'), new Date(Date.UTC(1990, 3, 5, 0, 50, 30)));
    });
    it('deserializes ISO strings with timezone offsets as Date objects', () => {
      deepEqual(field.deserialize('2021-11-07T11:21:05.012+03:00'), new Date(Date.UTC(2021, 10, 7, 8, 21, 5, 12)));
      deepEqual(field.deserialize('1990-04-05T00:50:30.000-12:30'), new Date(Date.UTC(1990, 3, 5, 13, 20, 30)));
    });
    it('deserializes partial precision ISO strings as Date objects', () => {
      deepEqual(field.deserialize('2021-11-07T11:21:05.12Z'), new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 120)));
      deepEqual(field.deserialize('1990-04-05T00:50:30.0Z'), new Date(Date.UTC(1990, 3, 5, 0, 50, 30)));
    });
    it('deserializes second-precision ISO strings as Date objects', () => {
      deepEqual(field.deserialize('2021-11-07T11:21:05Z'), new Date(Date.UTC(2021, 10, 7, 11, 21, 5)));
    });
    it('deserializes number timestamps as Date objects', () => {
      deepEqual(field.deserialize(1636284065012), new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 12)));
      deepEqual(field.deserialize(639276630000), new Date(Date.UTC(1990, 3, 5, 0, 50, 30)));
      deepEqual(field.deserialize(0), new Date(0));
    });
    it('deserializes Date objects as truncated Date objects', () => {
      deepEqual(field.deserialize(new Date(2021, 10, 7, 11, 21, 5, 12)), new Date(2021, 10, 7, 11, 21, 5, 12));
      deepEqual(field.deserialize(new Date(1990, 3, 5, 0, 50, 30)), new Date(1990, 3, 5, 0, 50, 30));
    });
    it('throws on invalid ISO date/time strings', () => {
      const validationError = new ValidationException('invalidDateTimeFormat', 'Invalid date/time format');
      throws(() => field.deserialize(''), validationError);
      throws(() => field.deserialize('2021-12-07'), validationError);
      throws(() => field.deserialize('2021-11-07T11:21:05.123'), validationError);
      throws(() => field.deserialize('2021-11-07T11:21:05.Z'), validationError);
      throws(() => field.deserialize('2021-11-07T11.21.05.123Z'), validationError);
      throws(() => field.deserialize('2021-11-07 11:21:05:123Z'), validationError);
    });
    it('throws on non-finite numbers', () => {
      const validationError = new ValidationException('invalidDateTimeFormat', 'Invalid date/time format');
      throws(() => field.deserialize(NaN), validationError);
      throws(() => field.deserialize(Infinity), validationError);
      throws(() => field.deserialize(-Infinity), validationError);
    });
    it('throws on non-string/Date values', () => {
      const validationError = new ValidationException('invalidValue', 'Invalid string or number type');
      throws(() => field.deserialize(true), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes Date object as ISO date/time string', () => {
      deepEqual(field.encode(new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 12))), '2021-11-07T11:21:05.012Z');
      deepEqual(field.encode(new Date(Date.UTC(1990, 3, 5, 0, 50, 30))), '1990-04-05T00:50:30.000Z');
    });
    it('throws on invalid Date objects', () => {
      const validationError = new ValidationException('invalidDateTime', 'Invalid date/time value');
      throws(() => field.encode(new Date('asdf')), validationError);
    });
    it('throws on non-Date values', () => {
      const validationError = new ValidationException('invalidDateTime', 'Invalid date/time value');
      throws(() => field.encode(0 as any), validationError);
      throws(() => field.encode('' as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes full precision ISO strings as Date objects', () => {
      deepEqual(field.decode('2021-11-07T11:21:05.012Z'), new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 12)));
      deepEqual(field.decode('1990-04-05T00:50:30.000Z'), new Date(Date.UTC(1990, 3, 5, 0, 50, 30)));
    });
    it('decodes ISO strings with timezone offsets as Date objects', () => {
      deepEqual(field.decode('2021-11-07T11:21:05.012+03:00'), new Date(Date.UTC(2021, 10, 7, 8, 21, 5, 12)));
      deepEqual(field.decode('1990-04-05T00:50:30.000-12:30'), new Date(Date.UTC(1990, 3, 5, 13, 20, 30)));
    });
    it('decodes partial precision ISO strings as Date objects', () => {
      deepEqual(field.decode('2021-11-07T11:21:05.12Z'), new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 120)));
      deepEqual(field.decode('1990-04-05T00:50:30.0Z'), new Date(Date.UTC(1990, 3, 5, 0, 50, 30)));
    });
    it('decodes second-precision ISO strings as Date objects', () => {
      deepEqual(field.decode('2021-11-07T11:21:05Z'), new Date(Date.UTC(2021, 10, 7, 11, 21, 5)));
    });
    it('throws on invalid ISO date/time strings', () => {
      const validationError = new ValidationException('invalidDateTimeFormat', 'Invalid date/time format');
      throws(() => field.decode(''), validationError);
      throws(() => field.decode('2021-12-07'), validationError);
      throws(() => field.decode('2021-11-07T11:21:05.123'), validationError);
      throws(() => field.decode('2021-11-07T11:21:05.Z'), validationError);
      throws(() => field.decode('2021-11-07T11.21.05.123Z'), validationError);
      throws(() => field.decode('2021-11-07 11:21:05:123Z'), validationError);
    });
  });
});
