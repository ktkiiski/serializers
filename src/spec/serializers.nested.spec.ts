import { deepEqual, throws } from 'assert';
import type ValidationError from '../errors/ValidationError';
import * as fields from '../fields';
import FieldSerializer from '../serializers/FieldSerializer';
import type Serializer from '../serializers/Serializer';

describe('nested serializer', () => {
  describe('can be used as a field', () => {
    const serializer = new FieldSerializer({
      name: fields.string(),
      nestedObject: new FieldSerializer({
        foo: fields.string(),
        bar: fields.string(),
      }),
    });
    const input = {
      name: 'Hello!',
      nestedObject: {
        foo: 'FOO',
        bar: 'BAR',
      },
    };
    it('with validate()', () => {
      deepEqual(serializer.validate(input), input);
    });
    it('with serialize()', () => {
      deepEqual(serializer.serialize(input), input);
    });
    it('with deserialize()', () => {
      deepEqual(serializer.serialize(input), input);
    });
  });
  describe('gathers nested validation errors', () => {
    interface TestInput {
      name: string;
      index: number;
      tags: string[];
      nested: {
        id: string;
        foo: number;
        bar: number;
      };
    }

    const serializer: Serializer<TestInput> = new FieldSerializer({
      name: fields.string(),
      index: fields.number(),
      tags: fields.list(fields.string()),
      nested: new FieldSerializer({
        id: fields.string(),
        foo: fields.number({ min: 0 }),
        bar: fields.number({ max: 10 }),
      }),
    });
    const input: TestInput = {
      name: '',
      index: 0,
      tags: [''],
      nested: {
        id: '',
        foo: -1,
        bar: 11,
      },
    };
    const expectedError: ValidationError = {
      code: 'invalidProperties',
      message: `Invalid fields`,
      errors: [
        {
          code: 'blank',
          message: `Value may not be blank`,
          key: 'name',
          errors: [],
        },
        {
          code: 'invalidItems',
          message: `Invalid list items`,
          key: 'tags',
          errors: [
            {
              code: 'blank',
              message: `Value may not be blank`,
              key: 0,
              errors: [],
            },
          ],
        },
        {
          code: 'invalidProperties',
          message: `Invalid fields`,
          key: 'nested',
          errors: [
            {
              code: 'blank',
              message: `Value may not be blank`,
              key: 'id',
              errors: [],
            },
            {
              code: 'lessThanMin',
              errors: [],
              key: 'foo',
              message: 'Value cannot be less than 0',
            },
            {
              code: 'moreThanMax',
              errors: [],
              key: 'bar',
              message: 'Value cannot be greater than 10',
            },
          ],
        },
      ],
    };
    it('from validate()', () => {
      throws(() => serializer.validate(input), expectedError);
    });
    it('from serialize()', () => {
      throws(() => serializer.serialize(input), expectedError);
    });
    it('from deserialize()', () => {
      throws(() => serializer.serialize(input), expectedError);
    });
  });
});
