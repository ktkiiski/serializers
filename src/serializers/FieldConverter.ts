import type Field from '../fields/Field';

type FieldConverter<Value> = (field: Field<unknown>, value: Value, key: unknown) => unknown;

export default FieldConverter;
