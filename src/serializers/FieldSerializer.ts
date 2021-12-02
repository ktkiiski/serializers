import { empty, Key, omit, pick, Require } from 'immuton';
import BaseSerializer from './BaseSerializer';
import type { ExtendableSerializer } from './ExtendableSerializer';
import type Fields from './Fields';
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

  public partial<K extends Key<T>>(required: K[]): ExtendableSerializer<Require<T, K>> {
    return new OptionalSerializer(required, this.fields);
  }

  public fullPartial(): ExtendableSerializer<Partial<T>> {
    return this.partial(empty);
  }

  public extend<E>(fields: Fields<E>): FieldSerializer<T & E> {
    return new FieldSerializer({ ...this.fields, ...fields } as Fields<T & E>);
  }
}
