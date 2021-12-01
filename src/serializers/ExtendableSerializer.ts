import type Fields from './Fields';
import type Serializer from './Serializer';

export interface ExtendableSerializer<I, O = I> extends Serializer<I, O> {
  extend<E>(fields: Fields<E>): ExtendableSerializer<I & E, O & E>;
}
