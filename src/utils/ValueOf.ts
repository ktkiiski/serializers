import type Field from '../fields/Field';

type ValueOf<F extends Field<unknown>> = F extends Field<infer R, unknown> ? R : unknown;

export default ValueOf;