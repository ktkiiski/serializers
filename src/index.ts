import FieldSerializer from './serializers/FieldSerializer';
import type Fields from './serializers/Fields';
import type ValueOf from './utils/ValueOf';

export * as fields from './fields';

export { ValueOf };

export function serializer<T>(fields: Fields<T>): FieldSerializer<T> {
  return new FieldSerializer<T>(fields);
}
