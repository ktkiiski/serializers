import { difference, Key, keys, omit, pick, Require } from 'immuton';
import BaseSerializer from './BaseSerializer';
import type { ExtendableSerializer } from './ExtendableSerializer';
import type Fields from './Fields';
import type OptionalInput from './OptionalInput';
import type { OptionalOptions } from './OptionalOptions';
import OptionalSerializer from './OptionalSerializer';

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

  public partial<K extends Key<T>>(attrs: K[]): ExtendableSerializer<Require<T, K>> {
    return this.optional({
      required: attrs,
      optional: difference(keys(this.fields), attrs),
    }) as ExtendableSerializer<Require<T, K>>;
  }

  public fullPartial(): ExtendableSerializer<Partial<T>> {
    return this.optional({
      required: [],
      optional: keys(this.fields),
    });
  }

  public optional<R extends Key<T>, O extends Key<T>>(
    options: OptionalOptions<T, R, O>,
  ): ExtendableSerializer<OptionalInput<T, R, O>> {
    return new OptionalSerializer(options, this.fields);
  }

  public extend<E>(fields: Fields<E>): FieldSerializer<T & E> {
    return new FieldSerializer({ ...this.fields, ...fields } as Fields<T & E>);
  }
}
