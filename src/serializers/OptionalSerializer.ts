import { keys, Require } from 'immuton';
import type Field from '../fields/Field.js';
import BaseSerializer from './BaseSerializer.js';
import type { ExtendableSerializer } from './ExtendableSerializer.js';
import type FieldConverter from './FieldConverter.js';
import type Fields from './Fields.js';

export default class OptionalSerializer<Data, Required extends keyof Data>
  extends BaseSerializer<Require<Data, Required>>
  implements ExtendableSerializer<Require<Data, Required>>
{
  constructor(private readonly requiredFields: Required[], protected fields: Fields<Data>) {
    super();
  }

  public extend<Extra>(fields: Fields<Extra>): OptionalSerializer<Data & Extra, Required | keyof Extra> {
    const { requiredFields } = this;
    const additionalKeys = keys(fields);
    return new OptionalSerializer<Data & Extra, Required | keyof Extra>([...requiredFields, ...additionalKeys], {
      ...this.fields,
      ...fields,
    } as Fields<Data & Extra>);
  }

  protected transformFieldWith<Value>(field: Field<any>, value: any, key: any, callback: FieldConverter<Value>): any {
    const { requiredFields } = this;
    // Optional undefined field value is omitted
    if (!requiredFields.includes(key) && typeof value === 'undefined') {
      return undefined;
    }
    // Otherwise (de)serialize normally
    return super.transformFieldWith(field, value, key, callback);
  }
}
