import type Field from '../fields/Field.js';
import type Encoding from './Encoding.js';
import type Serialization from './Serialization.js';

export default interface Serializer<Data> extends Field<Data, Serialization> {
  validate(input: Data): Data;
  serialize(input: Data): Serialization;
  deserialize(input: unknown): Data;
  encodeFields(input: Data): Encoding;
  decodeFields(input: Encoding): Data;
}
