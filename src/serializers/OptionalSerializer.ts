import { keys } from 'immuton';
import type Field from '../fields/Field';
import BaseSerializer from './BaseSerializer';
import type { ExtendableSerializer } from './ExtendableSerializer';
import type FieldConverter from './FieldConverter';
import type Fields from './Fields';
import type OptionalInput from './OptionalInput';
import type { OptionalOptions } from './OptionalOptions';

export default class OptionalSerializer<S, R extends keyof S, O extends keyof S>
  extends BaseSerializer<OptionalInput<S, R, O>>
  implements ExtendableSerializer<OptionalInput<S, R, O>>
{
  private readonly requiredFields: R[];

  private readonly optionalFields: O[];

  constructor(private readonly options: OptionalOptions<S, R, O>, protected fields: Fields<S>) {
    super();
    const { required, optional } = options;
    this.requiredFields = required;
    this.optionalFields = optional;
  }

  public extend<E>(fields: Fields<E>): OptionalSerializer<S & E, R | keyof E, O> {
    const additionalKeys = keys(fields) as (keyof E)[];
    const { options } = this;
    return new OptionalSerializer<S & E, R | keyof E, O>(
      {
        required: [...options.required, ...additionalKeys] as (R | keyof E)[],
        optional: options.optional,
      },
      { ...this.fields, ...fields } as Fields<S & E>,
    );
  }

  protected transformFieldWith<Value>(field: Field<any>, value: any, key: any, callback: FieldConverter<Value>): any {
    const { requiredFields, optionalFields } = this;
    if (typeof value === 'undefined') {
      if (optionalFields.indexOf(key) >= 0) {
        // Allow this value to be undefined
        return value;
      }
    }
    // Otherwise deserialize normally if one of the allowed fields
    if (requiredFields.indexOf(key) >= 0 || optionalFields.indexOf(key) >= 0) {
      return super.transformFieldWith(field, value, key, callback);
    }
    // Otherwise this should be omitted
    return undefined;
  }
}
