import type Encoding from './Encoding';
import type Serialization from './Serialization';

export default interface Serializer<I = any, O = I> {
  validate(input: I): O;
  serialize(input: I): Serialization;
  deserialize(input: unknown): O;
  encode(input: I): Encoding;
  decode(input: Encoding): O;
  encodeSortable(input: I): Encoding;
  decodeSortable(input: Encoding): O;
}
