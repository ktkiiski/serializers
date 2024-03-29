import { hasOwnProperty, keys } from 'immuton';
import type PropertyValidationError from '../errors/PropertyValidationError.js';
import ValidationException from '../errors/ValidationException.js';
import isValidationError from '../errors/isValidationError.js';
import serializeValidationError from '../errors/serializeValidationError.js';
import type Field from '../fields/Field.js';
import decodeObject from '../utils/decodeObject.js';
import encodeObject from '../utils/encodeObject.js';
import type Encoding from './Encoding.js';
import type FieldConverter from './FieldConverter.js';
import type Fields from './Fields.js';
import type Serialization from './Serialization.js';
import type Serializer from './Serializer.js';

abstract class BaseSerializer<T> implements Serializer<T> {
  readonly type: string = 'jsonb';

  protected abstract readonly fields: Fields<T>;

  public serialize(input: T): Serialization {
    return this.transformWith(input, (field, value) => field.serialize(value));
  }

  public encodeFields(input: T): Encoding {
    return this.transformWith(input, (field, value) => field.encode(value));
  }

  public validate(input: T): T {
    return this.transformWith(input, (field, value) => field.validate(value));
  }

  public deserialize(input: unknown): T {
    return this.transformWith(input, (field, value) => field.deserialize(value));
  }

  public decodeFields(input: Encoding): T {
    return this.transformWith(input, (field, value) => field.decode(value));
  }

  public encode(value: T): string {
    const encodedFields = this.encodeFields(value);
    return encodeObject(encodedFields);
  }

  public decode(value: string): T {
    const encodedFields = decodeObject(value);
    return this.decodeFields(encodedFields);
  }

  protected transformFieldWith<Value>(field: Field<any>, value: any, key: any, callback: FieldConverter<Value>): any {
    if (typeof value === 'undefined') {
      throw new ValidationException('missingProperty', `Missing required property`);
    }
    return callback(field, value, key);
  }

  private transformWith<Input>(input: Input, callback: FieldConverter<Input[keyof Input]>): any {
    if (typeof input !== 'object' || !input) {
      throw new ValidationException('invalidObject', `Invalid object`);
    }
    const { fields } = this;
    const output: { [key: string]: any } = {};
    const errors: PropertyValidationError[] = [];
    // Deserialize each field
    keys(fields).forEach((key) => {
      const field = fields[key];
      const rawValue = hasOwnProperty(input, key) ? input[key] : undefined;
      try {
        const value = this.transformFieldWith<Input[keyof Input]>(field, rawValue, key, callback);
        if (typeof value !== 'undefined') {
          output[key] = value;
        }
      } catch (error) {
        // Collect nested validation errors
        if (isValidationError(error)) {
          errors.push({ ...serializeValidationError(error), key });
        } else {
          // Pass this error through
          throw error;
        }
      }
    });
    if (errors.length) {
      // Invalid data -> throw validation error that contains nested errors
      throw new ValidationException('invalidProperties', `Invalid fields`, errors);
    }
    return output;
  }
}

export default BaseSerializer;
