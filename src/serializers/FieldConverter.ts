import type Field from '../fields/Field.js';

type FieldConverter<Value> = (field: Field<unknown>, value: Value, key: unknown) => unknown;

export default FieldConverter;
