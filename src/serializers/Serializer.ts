import type Encoding from './Encoding';
import type Serialization from './Serialization';

export default interface Serializer<I = any, O = I> {
  validate(input: I): O;
  serialize(input: I): Serialization;
  deserialize(input: unknown): O;
  encodeFields(input: I): Encoding;
  decodeFields(input: Encoding): O;
}