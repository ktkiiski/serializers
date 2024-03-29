import { deepEqual } from 'assert';
import * as fields from '../fields.js';
import FieldSerializer from '../serializers/FieldSerializer.js';

describe('serializer', () => {
  const serializer = new FieldSerializer({
    'name': fields.string(1, 100, true),
    'age': fields.number(),
    'nested object': new FieldSerializer({
      foo: fields.string(0, 100, true),
      bar: fields.string(0, 100, true),
    }),
  });
  it('can encode objects', () => {
    const input = {
      'name': 'Hello world!',
      'age': 123,
      'nested object': {
        foo: 'FOO',
        bar: 'BAR',
      },
    };
    deepEqual(serializer.encode(input), 'name=Hello%20world!&age=123&nested%20object=foo%3DFOO%26bar%3DBAR');
  });
  it('can decode objects', () => {
    deepEqual(serializer.decode('name=Hello%20world!&age=123&nested%20object=foo%3DFOO%26bar%3DBAR'), {
      'name': 'Hello world!',
      'age': 123,
      'nested object': {
        foo: 'FOO',
        bar: 'BAR',
      },
    });
  });
});
