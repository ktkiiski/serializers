import FieldSerializer from './serializers/FieldSerializer.js';
import type Fields from './serializers/Fields.js';
import type ValueOf from './utils/ValueOf.js';

export * as fields from './fields.js';

export { ValueOf };

export function serializer<T>(fields: Fields<T>): FieldSerializer<T> {
  return new FieldSerializer<T>(fields);
}
