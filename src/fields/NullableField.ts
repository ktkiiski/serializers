import type Field from './Field.js';

function isNullable(value: unknown): value is null | '' {
  return value === null || value === '';
}

/**
 * Makes the given field nullable, allowing null values for it.
 * It also means that any blank value, e.g. an empty string, will
 * always be converted to null.
 *
 * Useful to be used with string(), datetime() and integer() fields.
 */
export default class NullableField<I, O> implements Field<I | null, O | null> {
  public readonly type: string;

  constructor(public readonly field: Field<I, O>) {
    this.type = field.type;
  }

  public validate(value: I | null): I | null {
    return (!isNullable(value) && this.field.validate(value)) || null;
  }

  public serialize(value: I | null): O | null {
    return (!isNullable(value) && this.field.serialize(value)) || null;
  }

  public deserialize(value: unknown): I | null {
    return value === null || value === '' ? null : this.field.deserialize(value);
  }

  public encode(value: I | null): string {
    return (!isNullable(value) && this.field.encode(value)) || '';
  }

  public decode(value: string): I | null {
    return (!isNullable(value) && this.field.decode(value)) || null;
  }
}
