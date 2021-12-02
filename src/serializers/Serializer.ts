import type Field from '../fields/Field';
import type Encoding from './Encoding';
import type Serialization from './Serialization';

export default interface Serializer<Data> extends Field<Data, Serialization> {
  validate(input: Data): Data;
  serialize(input: Data): Serialization;
  deserialize(input: unknown): Data;
  encodeFields(input: Data): Encoding;
  decodeFields(input: Encoding): Data;
}
