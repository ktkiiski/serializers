import { difference, empty, Key, keys, omit, Optional, pick, Require } from 'immuton';
import BaseSerializer from './BaseSerializer.js';
import type { ExtendableSerializer } from './ExtendableSerializer.js';
import type Fields from './Fields.js';
import OptionalSerializer from './OptionalSerializer.js';

export default class FieldSerializer<T> extends BaseSerializer<T> implements ExtendableSerializer<T> {
  constructor(public readonly fields: Fields<T>) {
    super();
  }

  public pick<K extends Key<T> & Key<Fields<T>>>(attrs: K[]): FieldSerializer<Pick<T, K>> {
    return new FieldSerializer(pick(this.fields, attrs) as Fields<Pick<T, K>>);
  }

  public omit<K extends Key<T>>(attrs: K[]): FieldSerializer<Omit<T, K>> {
    return new FieldSerializer(omit(this.fields, attrs) as Fields<Omit<T, K>>);
  }

  public require<K extends Key<T>>(required: K[]): ExtendableSerializer<Require<T, K>> {
    return new OptionalSerializer(required, this.fields);
  }

  public optional<K extends Key<T>>(optional: K[]): ExtendableSerializer<Optional<T, K>> {
    return new OptionalSerializer<T, Exclude<keyof T, K>>(difference(keys(this.fields), optional), this.fields);
  }

  public partial(): ExtendableSerializer<Partial<T>> {
    return this.require(empty);
  }

  public extend<E>(fields: Fields<E>): FieldSerializer<T & E> {
    return new FieldSerializer({ ...this.fields, ...fields } as Fields<T & E>);
  }
}
