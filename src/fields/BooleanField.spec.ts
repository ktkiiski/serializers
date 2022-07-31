import { deepEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException.js';
import BooleanField from './BooleanField.js';

describe('BooleanField', () => {
  const field = new BooleanField();
  describe('validate()', () => {
    it('allows boolean value', () => {
      deepEqual(field.validate(true), true);
      deepEqual(field.validate(false), false);
    });
    it('throws on non-boolean values', () => {
      const validationError = new ValidationException('invalidBoolean', 'Invalid boolean value');
      throws(() => field.validate(0 as any), validationError);
      throws(() => field.validate('' as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes boolean value', () => {
      deepEqual(field.serialize(true), true);
      deepEqual(field.serialize(false), false);
    });
    it('throws on non-boolean values', () => {
      const validationError = new ValidationException('invalidBoolean', 'Invalid boolean value');
      throws(() => field.serialize(0 as any), validationError);
      throws(() => field.serialize('' as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes boolean value', () => {
      deepEqual(field.deserialize(true), true);
      deepEqual(field.deserialize(false), false);
    });
    it('throws on non-boolean values', () => {
      const validationError = new ValidationException('invalidBoolean', 'Invalid boolean value');
      throws(() => field.deserialize(0), validationError);
      throws(() => field.deserialize(''), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes boolean value', () => {
      deepEqual(field.encode(true), 'true');
      deepEqual(field.encode(false), 'false');
    });
    it('throws on non-boolean values', () => {
      const validationError = new ValidationException('invalidBoolean', 'Invalid boolean value');
      throws(() => field.encode(0 as any), validationError);
      throws(() => field.encode('' as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes encoded boolean value', () => {
      deepEqual(field.decode('true'), true);
      deepEqual(field.decode('false'), false);
    });
    it('throws on invalid encoded boolean value', () => {
      const decodingError = new ValidationException('invalidBoolean', 'Invalid encoded boolean value');
      throws(() => field.decode(''), decodingError);
      throws(() => field.decode('yes'), decodingError);
      throws(() => field.decode('no'), decodingError);
      throws(() => field.decode('ture'), decodingError);
      throws(() => field.decode('True'), decodingError);
      throws(() => field.decode('False'), decodingError);
    });
  });
});
