import type Field from '../fields/Field.js';

type Fields<T = any> = {
  [P in keyof T]: Field<T[P], any>;
};

export default Fields;
