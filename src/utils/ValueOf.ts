import type Field from '../fields/Field.js';

type ValueOf<F extends Field<unknown>> = F extends Field<infer R, unknown> ? R : unknown;

export default ValueOf;
