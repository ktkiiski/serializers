import { empty, isEmpty } from 'immuton';
import type IndexValidationError from '../errors/IndexValidationError';
import ValidationException from '../errors/ValidationException';
import isValidationError from '../errors/isValidationError';
import serializeValidationError from '../errors/serializeValidationError';
import type Field from './Field';

export default class ListField<I, O> implements Field<I[], O[]> {
  public readonly type: string;

  constructor(public readonly field: Field<I, O>) {
    this.type = field.type === 'jsonb' ? 'jsonb' : `${field.type}[]`;
  }

  public validate(items: I[]): I[] {
    return this.mapWith(items, (item) => this.field.validate(item));
  }

  public serialize(items: I[]): O[] {
    return this.mapWith(items, (item) => this.field.serialize(item));
  }

  public deserialize(items: unknown): I[] {
    if (items && Array.isArray(items)) {
      return this.mapWith(items, (item) => this.field.deserialize(item));
    }
    throw new ValidationException('invalidArray', `Value is not an array`);
  }

  public encode(value: I[]): string {
    return this.mapWith(value, (item) => encodeURIComponent(this.field.encode(item))).join('&');
  }

  public decode(value: string): I[] {
    // TODO: Should differentiate an empty array vs. an array with a blank value!
    const items = value ? value.split('&') : [];
    return this.mapWith(items, (item) => this.field.decode(decodeURIComponent(item)));
  }

  private mapWith<X, Y>(items: X[], iteratee: (item: X, index: number) => Y): Y[] {
    // NOTE: Even though this only supports arrays, let it also accept an empty OBJECT
    // and consider it as an empty array! This is to work around an issue in postgres-node
    // that may return an empty object instead of an empty array.
    const array = isEmpty(items) ? empty : items;
    const errors: IndexValidationError[] = [];
    const results = array.map((item, key) => {
      try {
        return iteratee(item, key);
      } catch (error) {
        // Collect nested validation errors
        if (isValidationError(error)) {
          errors.push({ ...serializeValidationError(error), key });
          return undefined;
        }
        // Pass through the error
        throw error;
      }
    });
    if (errors.length) {
      throw new ValidationException('invalidItems', `Invalid list items`, errors);
    }
    return results as Y[];
  }
}
