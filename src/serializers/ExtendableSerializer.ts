import type Fields from './Fields';
import type Serializer from './Serializer';

export interface ExtendableSerializer<Data> extends Serializer<Data> {
  extend<Extra>(fields: Fields<Extra>): ExtendableSerializer<Data & Extra>;
}
