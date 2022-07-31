import { deepEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException.js';
import ChoiceField from './ChoiceField.js';

describe('ChoiceField', () => {
  const field = new ChoiceField(['one', 'two', 'three']);
  describe('validate()', () => {
    it('allows defined options', () => {
      deepEqual(field.validate('one'), 'one');
      deepEqual(field.validate('two'), 'two');
      deepEqual(field.validate('three'), 'three');
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.validate('four' as any), validationError);
      throws(() => field.validate('' as any), validationError);
    });
    it('throws on non-string value', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.validate(0 as any), validationError);
      throws(() => field.validate(true as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes defined options', () => {
      deepEqual(field.serialize('one'), 'one');
      deepEqual(field.serialize('two'), 'two');
      deepEqual(field.serialize('three'), 'three');
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.serialize('four' as any), validationError);
      throws(() => field.serialize('' as any), validationError);
    });
    it('throws on non-string value', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.serialize(0 as any), validationError);
      throws(() => field.serialize(true as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes defined options', () => {
      deepEqual(field.deserialize('one'), 'one');
      deepEqual(field.deserialize('two'), 'two');
      deepEqual(field.deserialize('three'), 'three');
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.deserialize('four'), validationError);
      throws(() => field.deserialize(''), validationError);
    });
    it('throws on non-string value', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.deserialize(true), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes defined options', () => {
      deepEqual(field.encode('one'), 'one');
      deepEqual(field.encode('two'), 'two');
      deepEqual(field.encode('three'), 'three');
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.encode('four' as any), validationError);
      throws(() => field.encode('' as any), validationError);
    });
    it('throws on non-string value', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.encode(0 as any), validationError);
      throws(() => field.encode(true as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes defined options', () => {
      deepEqual(field.decode('one'), 'one');
      deepEqual(field.decode('two'), 'two');
      deepEqual(field.decode('three'), 'three');
    });
    it('throws on non-defined encoded option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.decode('four'), validationError);
      throws(() => field.decode(''), validationError);
    });
  });
});
