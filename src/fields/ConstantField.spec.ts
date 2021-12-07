import { deepEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException';
import ConstantField from './ConstantField';

describe('ConstantField', () => {
  const field = new ConstantField([111, 222, 333, -444]);
  describe('validate()', () => {
    it('allows defined options', () => {
      deepEqual(field.validate(111), 111);
      deepEqual(field.validate(222), 222);
      deepEqual(field.validate(333), 333);
      deepEqual(field.validate(-444), -444);
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.validate(1 as any), validationError);
      throws(() => field.validate(0 as any), validationError);
    });
    it('throws on non-number value', () => {
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.validate('foo' as any), validationError);
      throws(() => field.validate(true as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('serializes defined options', () => {
      deepEqual(field.serialize(111), 111);
      deepEqual(field.serialize(222), 222);
      deepEqual(field.serialize(333), 333);
      deepEqual(field.serialize(-444), -444);
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.serialize(1 as any), validationError);
      throws(() => field.serialize(-111 as any), validationError);
    });
    it('throws on non-number value', () => {
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.serialize('foo' as any), validationError);
      throws(() => field.serialize(true as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('deserializes defined options', () => {
      deepEqual(field.deserialize(111), 111);
      deepEqual(field.deserialize(222), 222);
      deepEqual(field.deserialize(333), 333);
      deepEqual(field.deserialize(-444), -444);
    });
    it('deserializes stringified defined options', () => {
      deepEqual(field.deserialize('111'), 111);
      deepEqual(field.deserialize('222'), 222);
      deepEqual(field.deserialize('333'), 333);
      deepEqual(field.deserialize('-444'), -444);
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.deserialize(0), validationError);
      throws(() => field.deserialize(1), validationError);
      throws(() => field.deserialize(-111), validationError);
    });
    it('throws on stringified non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.deserialize('0'), validationError);
      throws(() => field.deserialize('1'), validationError);
      throws(() => field.deserialize('-111'), validationError);
    });
    it('throws on non-number value', () => {
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.deserialize('foo' as any), validationError);
      throws(() => field.deserialize(true), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('encodes defined options', () => {
      deepEqual(field.encode(111), 111);
      deepEqual(field.encode(222), 222);
      deepEqual(field.encode(333), 333);
      deepEqual(field.encode(-444), -444);
    });
    it('throws on non-defined option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.encode(1 as any), validationError);
      throws(() => field.encode(-111 as any), validationError);
    });
    it('throws on non-number value', () => {
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.encode('foo' as any), validationError);
      throws(() => field.encode(true as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('decodes defined options', () => {
      deepEqual(field.decode('111'), 111);
      deepEqual(field.decode('222'), 222);
      deepEqual(field.decode('333'), 333);
      deepEqual(field.decode('-444'), -444);
    });
    it('throws on non-defined encoded option', () => {
      const validationError = new ValidationException('invalidOption', 'Value is not one of the valid options');
      throws(() => field.decode('1'), validationError);
      throws(() => field.decode('2'), validationError);
      throws(() => field.decode('-111'), validationError);
    });
    it('throws on encoded non-number', () => {
      const validationError = new ValidationException('invalidNumber', 'Invalid number value');
      throws(() => field.decode(''), validationError);
      throws(() => field.decode('foo'), validationError);
    });
  });
});
