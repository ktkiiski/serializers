import { throws } from 'assert';
import type ValidationError from '../errors/ValidationError';
import NumberField from '../fields/FloatField';
import ListField from '../fields/ListField';
import NestedSerializerField from '../fields/NestedSerializerField';
import StringField from '../fields/StringField';
import FieldSerializer from '../serializers/FieldSerializer';
import type Serializer from '../serializers/Serializer';

interface TestInput {
  name: string;
  index: number;
  tags: string[];
  nested: {
    id: string;
  };
}

describe('serializer', () => {
  describe('gathers nested validation errors', () => {
    const serializer: Serializer<TestInput> = new FieldSerializer({
      name: new StringField(),
      index: new NumberField(),
      tags: new ListField(new StringField()),
      nested: new NestedSerializerField(
        new FieldSerializer({
          id: new StringField(),
        }),
      ),
    });
    const input: TestInput = {
      name: '',
      index: 0,
      tags: [''],
      nested: {
        id: '',
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
