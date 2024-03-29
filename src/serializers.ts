import FieldSerializer from './serializers/FieldSerializer.js';
import type Fields from './serializers/Fields.js';

export type { default as Fields } from './serializers/Fields.js';
export type { default as Serialization } from './serializers/Serialization.js';
export type { default as Encoding } from './serializers/Encoding.js';
export type { default as Serializer } from './serializers/Serializer.js';
export type { default as ExtendableSerializer } from './serializers/ExtendableSerializer.js';
export { default as FieldSerializer } from './serializers/FieldSerializer.js';

export function serializer<T>(fields: Fields<T>): FieldSerializer<T> {
  return new FieldSerializer<T>(fields);
}
