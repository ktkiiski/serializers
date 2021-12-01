import type Field from '../fields/Field';
import BaseSerializer from './BaseSerializer';
import type FieldConverter from './FieldConverter';
import type Fields from './Fields';

export default class DefaultsSerializer<S, D extends keyof S> extends BaseSerializer<
  Pick<S, Exclude<keyof S, D> & Partial<Pick<S, D>>>,
  S
> {
  constructor(private readonly defaults: { [P in D]: S[P] }, protected fields: Fields<S>) {
    super();
  }

  protected transformFieldWith<Value>(field: Field<any>, value: any, key: any, callback: FieldConverter<Value>): any {
    if (typeof value === 'undefined') {
      // Value is missing
      const defaultValue = this.defaults[key as D];
      if (typeof defaultValue !== 'undefined') {
        // Return the default value
        return defaultValue;
      }
    }
    // Otherwise deserialize normally
    return super.transformFieldWith(field, value, key, callback);
  }
}
