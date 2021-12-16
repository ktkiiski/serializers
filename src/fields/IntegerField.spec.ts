import { strictEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException';
import IntegerField from './IntegerField';

describe('IntegerField', () => {
  describe('validate()', () => {
    it('allows integer value', () => {
      const field = new IntegerField();
      strictEqual(field.validate(0), 0);
      strictEqual(field.validate(123), 123);
      strictEqual(field.validate(-1), -1);
      strictEqual(field.validate(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER);
      strictEqual(field.validate(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER);
    });
    it('rounds non-integer value', () => {
      const field = new IntegerField();
      strictEqual(field.validate(45.678), 46);
      strictEqual(field.validate(0.123), 0);
      strictEqual(field.validate(-34423.0002), -34423);
    });
    it('allows number value in defined range', () => {
      const field = new IntegerField({ min: -10, max: 10 });
      strictEqual(field.validate(0), 0);
      strictEqual(field.validate(-10), -10);
      strictEqual(field.validate(10), 10);
    });
    it('throws on number greater than allowed value', () => {
      const field = new IntegerField({ max: 10 });
      const validationError = new ValidationException('moreThanMax', 'Value cannot be greater than 10');
      throws(() => field.validate(10.001), validationError);
    });
    it('throws on number less than allowed value', () => {
      const field = new IntegerField({ min: -10 });
      const validationError = new ValidationException('lessThanMin', 'Value cannot be less than -10');
      throws(() => field.validate(-10.001), validationError);
    });
    it('throws on NaN value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.validate(NaN), validationError);
    });
    it('throws on infinite number value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidInfinite', 'Number value cannot be infinite');
      throws(() => field.validate(Infinity), validationError);
      throws(() => field.validate(-Infinity), validationError);
    });
    it('throws on greater than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'greaterThanSafe',
        `Integer value cannot be greater than ${Number.MAX_SAFE_INTEGER}`,
      );
      throws(() => field.validate(1e100), validationError);
    });
    it('throws on less than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'lessThanSafe',
        `Integer value cannot be less than ${Number.MIN_SAFE_INTEGER}`,
      );
      throws(() => field.validate(-1e100), validationError);
    });
    it('throws on non-number values', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.validate(false as any), validationError);
      throws(() => field.validate('' as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes integer value', () => {
      const field = new IntegerField();
      strictEqual(field.serialize(0), 0);
      strictEqual(field.serialize(123), 123);
      strictEqual(field.serialize(-1), -1);
      strictEqual(field.serialize(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER);
      strictEqual(field.serialize(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER);
    });
    it('rounds non-integer value', () => {
      const field = new IntegerField();
      strictEqual(field.serialize(45.678), 46);
      strictEqual(field.serialize(0.123), 0);
      strictEqual(field.serialize(-34423.0002), -34423);
    });
    it('serializes number value in defined range', () => {
      const field = new IntegerField({ min: -10, max: 10 });
      strictEqual(field.serialize(0), 0);
      strictEqual(field.serialize(-10), -10);
      strictEqual(field.serialize(10), 10);
    });
    it('throws on number greater than allowed value', () => {
      const field = new IntegerField({ max: 10 });
      const validationError = new ValidationException('moreThanMax', 'Value cannot be greater than 10');
      throws(() => field.serialize(10.001), validationError);
    });
    it('throws on number less than allowed value', () => {
      const field = new IntegerField({ min: -10 });
      const validationError = new ValidationException('lessThanMin', 'Value cannot be less than -10');
      throws(() => field.serialize(-10.001), validationError);
    });
    it('throws on NaN value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.serialize(NaN), validationError);
    });
    it('throws on infinite number value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidInfinite', 'Number value cannot be infinite');
      throws(() => field.serialize(Infinity), validationError);
      throws(() => field.serialize(-Infinity), validationError);
    });
    it('throws on greater than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'greaterThanSafe',
        `Integer value cannot be greater than ${Number.MAX_SAFE_INTEGER}`,
      );
      throws(() => field.serialize(1e100), validationError);
    });
    it('throws on less than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'lessThanSafe',
        `Integer value cannot be less than ${Number.MIN_SAFE_INTEGER}`,
      );
      throws(() => field.serialize(-1e100), validationError);
    });
    it('throws on non-number values', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.serialize(false as any), validationError);
      throws(() => field.serialize('' as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes integer value', () => {
      const field = new IntegerField();
      strictEqual(field.deserialize(0), 0);
      strictEqual(field.deserialize(123), 123);
      strictEqual(field.deserialize(-1), -1);
      strictEqual(field.deserialize(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER);
      strictEqual(field.deserialize(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER);
    });
    it('rounds non-integer value', () => {
      const field = new IntegerField();
      strictEqual(field.deserialize(45.678), 46);
      strictEqual(field.deserialize(0.123), 0);
      strictEqual(field.deserialize(-34423.0002), -34423);
    });
    it('deserializes numeric string values', () => {
      const field = new IntegerField();
      strictEqual(field.deserialize('0'), 0);
      strictEqual(field.deserialize('123'), 123);
      strictEqual(field.deserialize('-1'), -1);
      strictEqual(field.deserialize('0.123'), 0);
      strictEqual(field.deserialize('45.678'), 46);
      strictEqual(field.deserialize('-34423.0002'), -34423);
      strictEqual(field.deserialize('+123'), 123);
      strictEqual(field.deserialize('  123  '), 123);
      strictEqual(field.deserialize('1e3'), 1000);
    });
    it('deserializes number value in defined range', () => {
      const field = new IntegerField({ min: -10, max: 10 });
      strictEqual(field.deserialize(0), 0);
      strictEqual(field.deserialize(-10), -10);
      strictEqual(field.deserialize(10), 10);
    });
    it('throws on number greater than allowed value', () => {
      const field = new IntegerField({ max: 10 });
      const validationError = new ValidationException('moreThanMax', 'Value cannot be greater than 10');
      throws(() => field.deserialize(10.001), validationError);
    });
    it('throws on number less than allowed value', () => {
      const field = new IntegerField({ min: -10 });
      const validationError = new ValidationException('lessThanMin', 'Value cannot be less than -10');
      throws(() => field.deserialize(-10.001), validationError);
    });
    it('throws on NaN value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumeric', 'Invalid numeric value');
      throws(() => field.deserialize(NaN), validationError);
    });
    it('throws on infinite number value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidInfinite', 'Number value cannot be infinite');
      throws(() => field.deserialize(Infinity), validationError);
      throws(() => field.deserialize(-Infinity), validationError);
    });
    it('throws on greater than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'greaterThanSafe',
        `Integer value cannot be greater than ${Number.MAX_SAFE_INTEGER}`,
      );
      throws(() => field.deserialize(1e100), validationError);
    });
    it('throws on less than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'lessThanSafe',
        `Integer value cannot be less than ${Number.MIN_SAFE_INTEGER}`,
      );
      throws(() => field.deserialize(-1e100), validationError);
    });
    it('throws on non-numeric string values', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumeric', 'Invalid numeric value');
      throws(() => field.deserialize(''), validationError);
      throws(() => field.deserialize('a1234'), validationError);
      throws(() => field.deserialize('123aaaahhh'), validationError);
    });
    it('throws on non-number values', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumeric', 'Invalid numeric value');
      throws(() => field.deserialize(false), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes integer value', () => {
      const field = new IntegerField();
      strictEqual(field.encode(0), '0');
      strictEqual(field.encode(123), '123');
      strictEqual(field.encode(-1), '-1');
      strictEqual(field.encode(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER.toString());
      strictEqual(field.encode(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER.toString());
    });
    it('rounds non-integer value', () => {
      const field = new IntegerField();
      strictEqual(field.encode(45.678), '46');
      strictEqual(field.encode(0.123), '0');
      strictEqual(field.encode(-34423.0002), '-34423');
    });
    it('encodes number value in defined range', () => {
      const field = new IntegerField({ min: -10, max: 10 });
      strictEqual(field.encode(0), '0');
      strictEqual(field.encode(-10), '-10');
      strictEqual(field.encode(10), '10');
    });
    it('throws on number greater than allowed value', () => {
      const field = new IntegerField({ max: 10 });
      const validationError = new ValidationException('moreThanMax', 'Value cannot be greater than 10');
      throws(() => field.encode(10.001), validationError);
    });
    it('throws on number less than allowed value', () => {
      const field = new IntegerField({ min: -10 });
      const validationError = new ValidationException('lessThanMin', 'Value cannot be less than -10');
      throws(() => field.encode(-10.001), validationError);
    });
    it('throws on NaN value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.encode(NaN), validationError);
    });
    it('throws on infinite number value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidInfinite', 'Number value cannot be infinite');
      throws(() => field.encode(Infinity), validationError);
      throws(() => field.encode(-Infinity), validationError);
    });
    it('throws on greater than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'greaterThanSafe',
        `Integer value cannot be greater than ${Number.MAX_SAFE_INTEGER}`,
      );
      throws(() => field.encode(1e100), validationError);
    });
    it('throws on less than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'lessThanSafe',
        `Integer value cannot be less than ${Number.MIN_SAFE_INTEGER}`,
      );
      throws(() => field.encode(-1e100), validationError);
    });
    it('throws on non-number values', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.encode(false as any), validationError);
      throws(() => field.encode('' as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes numeric integer value', () => {
      const field = new IntegerField();
      strictEqual(field.decode('0'), 0);
      strictEqual(field.decode('123'), 123);
      strictEqual(field.decode('-1'), -1);
      strictEqual(field.decode('+123'), 123);
      strictEqual(field.decode('  123  '), 123);
      strictEqual(field.decode('1e3'), 1000);
    });
    it('rounds non-integer value', () => {
      const field = new IntegerField();
      strictEqual(field.decode('45.678'), 46);
      strictEqual(field.decode('0.123'), 0);
      strictEqual(field.decode('-34423.0002'), -34423);
    });
    it('decodes numeric string value in defined range', () => {
      const field = new IntegerField({ min: -10, max: 10 });
      strictEqual(field.decode('0'), 0);
      strictEqual(field.decode('-10'), -10);
      strictEqual(field.decode('10'), 10);
    });
    it('throws on number greater than allowed value', () => {
      const field = new IntegerField({ max: 10 });
      const validationError = new ValidationException('moreThanMax', 'Value cannot be greater than 10');
      throws(() => field.decode('10.001'), validationError);
    });
    it('throws on number less than allowed value', () => {
      const field = new IntegerField({ min: -10 });
      const validationError = new ValidationException('lessThanMin', 'Value cannot be less than -10');
      throws(() => field.decode('-10.001'), validationError);
    });
    it('throws on encoded NaN string value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumeric', 'Invalid numeric value');
      throws(() => field.decode('NaN'), validationError);
    });
    it('throws on infinite numeric string value', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidInfinite', 'Number value cannot be infinite');
      throws(() => field.decode('Infinity'), validationError);
      throws(() => field.decode('-Infinity'), validationError);
    });
    it('throws on greater than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'greaterThanSafe',
        `Integer value cannot be greater than ${Number.MAX_SAFE_INTEGER}`,
      );
      throws(() => field.decode('1e100'), validationError);
    });
    it('throws on less than safe integers', () => {
      const field = new IntegerField();
      const validationError = new ValidationException(
        'lessThanSafe',
        `Integer value cannot be less than ${Number.MIN_SAFE_INTEGER}`,
      );
      throws(() => field.decode('-1e100'), validationError);
    });
    it('throws on non-numeric string values', () => {
      const field = new IntegerField();
      const validationError = new ValidationException('invalidNumeric', 'Invalid numeric value');
      throws(() => field.decode(''), validationError);
      throws(() => field.decode('a1234'), validationError);
      throws(() => field.decode('123aaaahhh'), validationError);
    });
  });
});
