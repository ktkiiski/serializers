import { deepEqual, strictEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException.js';
import DateTimeField from './DateTimeField.js';
import NullableField from './NullableField.js';
import NumberField from './NumberField.js';
import TextField from './TextField.js';

describe('NullableField', () => {
  describe('validate()', () => {
    it('allows null value with number field', () => {
      const field = new NullableField(new NumberField());
      strictEqual(field.validate(null), null);
      strictEqual(field.validate(123), 123);
    });
    it('allows null value with text field', () => {
      const field = new NullableField(new TextField());
      strictEqual(field.validate(null), null);
      strictEqual(field.validate('foobar'), 'foobar');
      strictEqual(field.validate(''), '');
    });
    it('validates invalid blank string as null with non-empty text field', () => {
      const field = new NullableField(new TextField({ minLength: 1 }));
      strictEqual(field.validate(''), null);
    });
    it('throws on string value not accepted by the base text field', () => {
      const field = new NullableField(new TextField({ minLength: 2 }));
      throws(
        () => field.validate('x'),
        new ValidationException('tooShort', 'Value may not be shorter than 2 characters'),
      );
    });
    it('throws on value not accepted by the base field', () => {
      const field = new NullableField(new NumberField());
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.validate(false as any), validationError);
      throws(() => field.validate('' as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes null value with number field', () => {
      const field = new NullableField(new NumberField());
      strictEqual(field.serialize(null), null);
      strictEqual(field.serialize(123), 123);
    });
    it('serializes null value with text field', () => {
      const field = new NullableField(new TextField());
      strictEqual(field.serialize(null), null);
      strictEqual(field.serialize('foobar'), 'foobar');
      strictEqual(field.serialize(''), '');
    });
    it('serializes invalid blank string as null with non-empty text field', () => {
      const field = new NullableField(new TextField({ minLength: 1 }));
      strictEqual(field.serialize(''), null);
    });
    it('throws on string value not accepted by the base text field', () => {
      const field = new NullableField(new TextField({ minLength: 2 }));
      throws(
        () => field.serialize('x'),
        new ValidationException('tooShort', 'Value may not be shorter than 2 characters'),
      );
    });
    it('throws on value not accepted by the base field', () => {
      const field = new NullableField(new NumberField());
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.serialize(false as any), validationError);
      throws(() => field.serialize('' as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes null value with number field', () => {
      const field = new NullableField(new NumberField());
      strictEqual(field.deserialize(null), null);
      strictEqual(field.deserialize(123), 123);
    });
    it('deserializes null value with text field', () => {
      const field = new NullableField(new TextField());
      strictEqual(field.deserialize(null), null);
      strictEqual(field.deserialize('foobar'), 'foobar');
      strictEqual(field.deserialize(''), '');
    });
    it('deserializes invalid blank string as null with non-empty text field', () => {
      const field = new NullableField(new TextField({ minLength: 1 }));
      strictEqual(field.deserialize(''), null);
    });
    it('throws on string value not accepted by the base text field', () => {
      const field = new NullableField(new TextField({ minLength: 2 }));
      throws(
        () => field.deserialize('x'),
        new ValidationException('tooShort', 'Value may not be shorter than 2 characters'),
      );
    });
    it('deserializes null value with date-time field', () => {
      const field = new NullableField(new DateTimeField());
      strictEqual(field.deserialize(null), null);
      deepEqual(field.deserialize('2021-11-07T11:21:05.012Z'), new Date(Date.UTC(2021, 10, 7, 11, 21, 5, 12)));
    });
    it('throws on value not accepted by the base field', () => {
      const field = new NullableField(new NumberField());
      const validationError = new ValidationException('invalidNumeric', 'Invalid numeric value');
      throws(() => field.deserialize(false as any), validationError);
      throws(() => field.deserialize('' as any), validationError);
      throws(() => field.deserialize({} as any), validationError);
      throws(() => field.deserialize([] as any), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes null value as blank string with number field', () => {
      const field = new NullableField(new NumberField());
      strictEqual(field.encode(null), '');
      strictEqual(field.encode(123), '123');
    });
    it('encodes null value as blank string with text field', () => {
      const field = new NullableField(new TextField());
      strictEqual(field.encode(null), '');
      strictEqual(field.encode(''), '');
    });
    it('encodes invalid blank string with non-empty text field', () => {
      const field = new NullableField(new TextField({ minLength: 1 }));
      strictEqual(field.encode(''), '');
    });
    it('throws on string value not accepted by the base text field', () => {
      const field = new NullableField(new TextField({ minLength: 2 }));
      throws(
        () => field.encode('x'),
        new ValidationException('tooShort', 'Value may not be shorter than 2 characters'),
      );
    });
    it('throws on value not accepted by the base field', () => {
      const field = new NullableField(new NumberField());
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.encode(false as any), validationError);
      throws(() => field.encode('' as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes blank string as null value with number field', () => {
      const field = new NullableField(new NumberField());
      strictEqual(field.decode(''), null);
      strictEqual(field.decode('123'), 123);
    });
    it('decodes blank string as null value with text field', () => {
      const field = new NullableField(new TextField());
      strictEqual(field.decode(''), null);
      strictEqual(field.decode('x'), 'x');
    });
    it('decodes invalid blank string as null with non-empty text field', () => {
      const field = new NullableField(new TextField({ minLength: 1 }));
      strictEqual(field.decode(''), null);
    });
    it('throws on string value not accepted by the base text field', () => {
      const field = new NullableField(new TextField({ minLength: 2 }));
      throws(
        () => field.decode('x'),
        new ValidationException('tooShort', 'Value may not be shorter than 2 characters'),
      );
    });
  });
});
