import { strictEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException';
import TextField from './TextField';

describe('TextField', () => {
  describe('validate()', () => {
    it('allows string value', () => {
      const field = new TextField();
      strictEqual(field.validate(''), '');
      strictEqual(field.validate('Hello, world!'), 'Hello, world!');
      strictEqual(field.validate('😄👍✅'), '😄👍✅');
    });
    it('allows string with length in defined range', () => {
      const field = new TextField({ minLength: 3, maxLength: 10 });
      strictEqual(field.validate('abc'), 'abc');
      strictEqual(field.validate('abba abba!'), 'abba abba!');
      strictEqual(field.validate('✅✅✅✅✅✅✅✅✅✅'), '✅✅✅✅✅✅✅✅✅✅');
    });
    it('throws on string with length greater than allowed value', () => {
      const field = new TextField({ maxLength: 10 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 10 characters');
      throws(() => field.validate('1234567890!'), validationError);
    });
    it('throws on string with length greater than allowed value 1', () => {
      const field = new TextField({ maxLength: 1 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 1 character');
      throws(() => field.validate('12'), validationError);
    });
    it('throws on string with length less than allowed value', () => {
      const field = new TextField({ minLength: 3 });
      const validationError = new ValidationException('tooShort', 'String cannot be shorter than 3 characters');
      throws(() => field.validate('aa'), validationError);
    });
    it('throws on blank string with length less than allowed value 1', () => {
      const field = new TextField({ minLength: 1 });
      const validationError = new ValidationException('tooShort', 'String cannot be blank');
      throws(() => field.validate(''), validationError);
    });
    it('throws on non-string values', () => {
      const field = new TextField();
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.validate(false as any), validationError);
      throws(() => field.validate(0 as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes string value', () => {
      const field = new TextField();
      strictEqual(field.serialize(''), '');
      strictEqual(field.serialize('Hello, world!'), 'Hello, world!');
      strictEqual(field.serialize('😄👍✅'), '😄👍✅');
    });
    it('serializes string with length in defined range', () => {
      const field = new TextField({ minLength: 3, maxLength: 10 });
      strictEqual(field.serialize('abc'), 'abc');
      strictEqual(field.serialize('abba abba!'), 'abba abba!');
      strictEqual(field.serialize('✅✅✅✅✅✅✅✅✅✅'), '✅✅✅✅✅✅✅✅✅✅');
    });
    it('throws on string with length greater than allowed value', () => {
      const field = new TextField({ maxLength: 10 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 10 characters');
      throws(() => field.serialize('1234567890!'), validationError);
    });
    it('throws on string with length greater than allowed value 1', () => {
      const field = new TextField({ maxLength: 1 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 1 character');
      throws(() => field.serialize('12'), validationError);
    });
    it('throws on string with length less than allowed value', () => {
      const field = new TextField({ minLength: 3 });
      const validationError = new ValidationException('tooShort', 'String cannot be shorter than 3 characters');
      throws(() => field.serialize('aa'), validationError);
    });
    it('throws on blank string with length less than allowed value 1', () => {
      const field = new TextField({ minLength: 1 });
      const validationError = new ValidationException('tooShort', 'String cannot be blank');
      throws(() => field.serialize(''), validationError);
    });
    it('throws on non-string values', () => {
      const field = new TextField();
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.serialize(false as any), validationError);
      throws(() => field.serialize(0 as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes string value', () => {
      const field = new TextField();
      strictEqual(field.deserialize(''), '');
      strictEqual(field.deserialize('Hello, world!'), 'Hello, world!');
      strictEqual(field.deserialize('😄👍✅'), '😄👍✅');
    });
    it('deserializes string with length in defined range', () => {
      const field = new TextField({ minLength: 3, maxLength: 10 });
      strictEqual(field.deserialize('abc'), 'abc');
      strictEqual(field.deserialize('abba abba!'), 'abba abba!');
      strictEqual(field.deserialize('✅✅✅✅✅✅✅✅✅✅'), '✅✅✅✅✅✅✅✅✅✅');
    });
    it('deserializes a number value as string', () => {
      const field = new TextField();
      strictEqual(field.deserialize(0), '0');
      strictEqual(field.deserialize(-123), '-123');
      strictEqual(field.deserialize(0.02), '0.02');
    });
    it('throws on string with length greater than allowed value', () => {
      const field = new TextField({ maxLength: 10 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 10 characters');
      throws(() => field.deserialize('1234567890!'), validationError);
    });
    it('throws on string with length greater than allowed value 1', () => {
      const field = new TextField({ maxLength: 1 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 1 character');
      throws(() => field.deserialize('12'), validationError);
    });
    it('throws on string with length less than allowed value', () => {
      const field = new TextField({ minLength: 3 });
      const validationError = new ValidationException('tooShort', 'String cannot be shorter than 3 characters');
      throws(() => field.deserialize('aa'), validationError);
    });
    it('throws on blank string with length less than allowed value 1', () => {
      const field = new TextField({ minLength: 1 });
      const validationError = new ValidationException('tooShort', 'String cannot be blank');
      throws(() => field.deserialize(''), validationError);
    });
    it('throws on invalid number values', () => {
      const field = new TextField();
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.deserialize(NaN), validationError);
      throws(() => field.deserialize(Infinity), validationError);
      throws(() => field.deserialize(-Infinity), validationError);
    });
    it('throws on non-string values', () => {
      const field = new TextField();
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.deserialize(false), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes string value', () => {
      const field = new TextField();
      strictEqual(field.encode(''), '');
      strictEqual(field.encode('Hello, world!'), 'Hello, world!');
      strictEqual(field.encode('😄👍✅'), '😄👍✅');
    });
    it('encodes string with length in defined range', () => {
      const field = new TextField({ minLength: 3, maxLength: 10 });
      strictEqual(field.encode('abc'), 'abc');
      strictEqual(field.encode('abba abba!'), 'abba abba!');
      strictEqual(field.encode('✅✅✅✅✅✅✅✅✅✅'), '✅✅✅✅✅✅✅✅✅✅');
    });
    it('throws on string with length greater than allowed value', () => {
      const field = new TextField({ maxLength: 10 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 10 characters');
      throws(() => field.encode('1234567890!'), validationError);
    });
    it('throws on string with length greater than allowed value 1', () => {
      const field = new TextField({ maxLength: 1 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 1 character');
      throws(() => field.encode('12'), validationError);
    });
    it('throws on string with length less than allowed value', () => {
      const field = new TextField({ minLength: 3 });
      const validationError = new ValidationException('tooShort', 'String cannot be shorter than 3 characters');
      throws(() => field.encode('aa'), validationError);
    });
    it('throws on blank string with length less than allowed value 1', () => {
      const field = new TextField({ minLength: 1 });
      const validationError = new ValidationException('tooShort', 'String cannot be blank');
      throws(() => field.encode(''), validationError);
    });
    it('throws on non-string values', () => {
      const field = new TextField();
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.encode(false as any), validationError);
      throws(() => field.encode(0 as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes string value', () => {
      const field = new TextField();
      strictEqual(field.decode(''), '');
      strictEqual(field.decode('Hello, world!'), 'Hello, world!');
      strictEqual(field.decode('😄👍✅'), '😄👍✅');
    });
    it('decodes numeric string with length in defined range', () => {
      const field = new TextField({ minLength: 3, maxLength: 10 });
      strictEqual(field.decode('abc'), 'abc');
      strictEqual(field.decode('abba abba!'), 'abba abba!');
      strictEqual(field.decode('✅✅✅✅✅✅✅✅✅✅'), '✅✅✅✅✅✅✅✅✅✅');
    });
    it('throws on string with length greater than allowed value', () => {
      const field = new TextField({ maxLength: 10 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 10 characters');
      throws(() => field.decode('1234567890!'), validationError);
    });
    it('throws on string with length greater than allowed value 1', () => {
      const field = new TextField({ maxLength: 1 });
      const validationError = new ValidationException('tooLong', 'String cannot be longer than 1 character');
      throws(() => field.decode('12'), validationError);
    });
    it('throws on string with length less than allowed value', () => {
      const field = new TextField({ minLength: 3 });
      const validationError = new ValidationException('tooShort', 'String cannot be shorter than 3 characters');
      throws(() => field.decode('aa'), validationError);
    });
    it('throws on blank string with length less than allowed value 1', () => {
      const field = new TextField({ minLength: 1 });
      const validationError = new ValidationException('tooShort', 'String cannot be blank');
      throws(() => field.decode(''), validationError);
    });
  });
});
