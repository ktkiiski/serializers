import { deepEqual, throws } from 'assert';
import type ValidationError from '../errors/ValidationError';
import NumberField from '../fields/FloatField';
import StringField from '../fields/StringField';
import FieldSerializer from '../serializers/FieldSerializer';

describe('partial serializer', () => {
  describe('allows omitting optional properties', () => {
    const serializer = new FieldSerializer({
      requiredProp1: new StringField(),
      requiredProp2: new NumberField(),
      optionalProp1: new StringField(),
      optionalProp2: new NumberField(),
    }).partial(['requiredProp1', 'requiredProp2']);
    const input = {
      requiredProp1: 'test1',
      requiredProp2: 123,
    };
    it('in validate()', () => {
      deepEqual(serializer.validate(input), input);
    });
    it('in serialize()', () => {
      deepEqual(serializer.serialize(input), input);
    });
    it('in deserialize()', () => {
      deepEqual(serializer.serialize(input), input);
    });
  });
  describe('preserves optional properties', () => {
    const serializer = new FieldSerializer({
      requiredProp1: new StringField(),
      requiredProp2: new NumberField(),
      optionalProp1: new StringField(),
      optionalProp2: new NumberField(),
    }).partial(['requiredProp1', 'requiredProp2']);
    const input = {
      requiredProp1: 'test1',
      requiredProp2: 123,
      optionalProp1: 'test2',
      optionalProp2: 321,
    };
    it('in validate()', () => {
      deepEqual(serializer.validate(input), input);
    });
    it('in serialize()', () => {
      deepEqual(serializer.serialize(input), input);
    });
    it('in deserialize()', () => {
      deepEqual(serializer.serialize(input), input);
    });
  });
  describe('disallow omitting required properties', () => {
    const serializer = new FieldSerializer({
      requiredProp1: new StringField(),
      requiredProp2: new NumberField(),
      optionalProp1: new StringField(),
      optionalProp2: new NumberField(),
    }).partial(['requiredProp1', 'requiredProp2']);
    const input: any = {
      optionalProp1: 'test2',
      optionalProp2: 321,
    };
    const expectedError: ValidationError = {
      code: 'invalidProperties',
      message: 'Invalid fields',
      errors: [
        {
          code: 'missingProperty',
          key: 'requiredProp1',
          message: 'Missing required property',
          errors: [],
        },
        {
          code: 'missingProperty',
          key: 'requiredProp2',
          message: 'Missing required property',
          errors: [],
        },
      ],
    };
    it('in validate()', () => {
      throws(() => serializer.validate(input), expectedError);
    });
    it('in serialize()', () => {
      throws(() => serializer.serialize(input), expectedError);
    });
    it('in deserialize()', () => {
      throws(() => serializer.serialize(input), expectedError);
    });
  });
});
