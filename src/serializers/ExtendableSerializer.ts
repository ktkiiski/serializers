import type Fields from './Fields.js';
import type Serializer from './Serializer.js';

export interface ExtendableSerializer<Data> extends Serializer<Data> {
  extend<Extra>(fields: Fields<Extra>): ExtendableSerializer<Data & Extra>;
}
