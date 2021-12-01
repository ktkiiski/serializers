import { keys } from 'immuton';
import type Field from '../fields/Field';
import BaseSerializer from './BaseSerializer';
import type { ExtendableSerializer } from './ExtendableSerializer';
import type FieldConverter from './FieldConverter';
import type Fields from './Fields';
import type OptionalInput from './OptionalInput';
import type { OptionalOptions } from './OptionalOptions';
import type OptionalOutput from './OptionalOutput';

export default class OptionalSerializer<S, R extends keyof S, O extends keyof S, D extends keyof S>
  extends BaseSerializer<OptionalInput<S, R, O, D>, OptionalOutput<S, R, O, D>>
  implements ExtendableSerializer<OptionalInput<S, R, O, D>, OptionalOutput<S, R, O, D>>
{
  private readonly requiredFields: R[];

  private readonly optionalFields: (O | D)[];

  private readonly defaults: { [P in D]: S[P] };

  constructor(private readonly options: OptionalOptions<S, R, O, D>, protected fields: Fields<S>) {
    super();
    const { required, optional, defaults } = options;
    this.requiredFields = required;
    this.optionalFields = [...optional, ...keys(defaults)];
    this.defaults = defaults;
  }

  public extend<E>(fields: Fields<E>): OptionalSerializer<S & E, R | keyof E, O, D> {
    const additionalKeys = keys(fields) as (keyof E)[];
    const { options } = this;
    return new OptionalSerializer<S & E, R | keyof E, O, D>(
      {
        required: [...options.required, ...additionalKeys] as (R | keyof E)[],
        optional: options.optional,
        defaults: options.defaults as { [P in D]: (S & E)[P] },
      },
      { ...this.fields, ...fields } as Fields<S & E>,
    );
  }

  protected transformFieldWith<Value>(field: Field<any>, value: any, key: any, callback: FieldConverter<Value>): any {
    const { requiredFields, optionalFields, defaults } = this;
    if (typeof value === 'undefined') {
      // Value is missing
      const defaultValue = defaults[key as D];
      if (typeof defaultValue !== 'undefined') {
        // Return the default value
        return defaultValue;
      }
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
