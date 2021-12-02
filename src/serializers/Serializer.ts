import type Encoding from './Encoding';
import type Serialization from './Serialization';

export default interface Serializer<Data> {
  validate(input: Data): Data;
  serialize(input: Data): Serialization;
  deserialize(input: unknown): Data;
  encodeFields(input: Data): Encoding;
  decodeFields(input: Encoding): Data;
}
