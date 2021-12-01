import type Field from '../fields/Field';

type Fields<T = any> = {
  [P in keyof T]: Field<T[P], any>;
};

export default Fields;
