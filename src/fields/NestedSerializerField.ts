import type Serialization from '../serializers/Serialization';
import type Serializer from '../serializers/Serializer';
import type Field from './Field';

export default class NestedSerializerField<I> implements Field<I, Serialization> {
  public readonly type: string = 'jsonb';

  constructor(private serializer: Serializer<I, any>) {}

  public validate(value: I): I {
    return this.serializer.validate(value);
  }

  public serialize(value: I): Serialization {
    return this.serializer.serialize(value);
  }

  public deserialize(value: unknown): I {
    return this.serializer.deserialize(value);
  }

  public encode(): never {
    throw new Error('Nested resource field does not support encoding.');
  }

  public decode(): never {
    throw new Error('Nested resource field does not support decoding.');
  }
}
