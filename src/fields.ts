import isEmpty from 'immuton/isEmpty';
import BooleanField from './fields/BooleanField.js';
import ChoiceField from './fields/ChoiceField.js';
import ConstantField from './fields/ConstantField.js';
import DateField from './fields/DateField.js';
import DateTimeField from './fields/DateTimeField.js';
import DecimalField from './fields/DecimalField.js';
import EmailField from './fields/EmailField.js';
import type Field from './fields/Field.js';
import IntegerField from './fields/IntegerField.js';
import ListField from './fields/ListField.js';
import NullableField from './fields/NullableField.js';
import NumberField from './fields/NumberField.js';
import type { NumberFieldOptions } from './fields/NumberField.js';
import RegexpField from './fields/RegexpField.js';
import StringField, { StringFieldOptions } from './fields/StringField.js';
import TimestampField from './fields/TimestampField.js';
import URLField from './fields/URLField.js';
import UUIDField from './fields/UUIDField.js';

const integerField = new IntegerField();
const numberField = new NumberField();
const booleanField = new BooleanField();
const dateTimeField = new DateTimeField();
const dateField = new DateField();
const timestampField = new TimestampField();
const emailField = new EmailField();
const urlField = new URLField();
const uuid1Field = new UUIDField(1);
const uuid4Field = new UUIDField(4);
const uuid5Field = new UUIDField(5);

export function string(minLength: number, maxLength: number | null, trim: boolean): Field<string>;
export function string(options: StringFieldOptions): Field<string>;
export function string(...args: (number | boolean | null | StringFieldOptions)[]): Field<string> {
  const options: StringFieldOptions = {};
  args.forEach((arg) => {
    if (typeof arg === 'number') {
      if (options.minLength == null) {
        options.minLength = arg;
      } else {
        options.maxLength = arg;
      }
    } else if (typeof arg === 'boolean') {
      options.trim = arg;
    } else if (arg != null) {
      Object.assign(options, arg);
    }
  });
  return new StringField(options);
}

export function choice<K extends string>(options: K[]): Field<K> {
  return new ChoiceField(options);
}

export function constant<K extends number>(options: K[]): Field<K> {
  return new ConstantField<K>(options);
}

export function integer(options?: NumberFieldOptions): Field<number> {
  return !options || isEmpty(options) ? integerField : new IntegerField(options);
}

export function number(options?: NumberFieldOptions): Field<number> {
  return !options || isEmpty(options) ? numberField : new NumberField(options);
}

export function decimal(decimals = 2): Field<string> {
  return new DecimalField(decimals);
}

export function boolean(): Field<boolean> {
  return booleanField;
}

export function matching(regexp: RegExp, errorMessage?: string): Field<string> {
  return new RegexpField(regexp, errorMessage);
}

export function datetime(): Field<Date, string> {
  return dateTimeField;
}

export function date(): Field<Date, string> {
  return dateField;
}

export function timestamp(): Field<Date, number> {
  return timestampField;
}

export function uuid(version?: 1 | 4 | 5): Field<string> {
  switch (version) {
    case 1:
      return uuid1Field;
    case 4:
      return uuid4Field;
    case 5:
      return uuid5Field;
    default:
      return new UUIDField(version);
  }
}

export function email(): Field<string> {
  return emailField;
}

export function url(): Field<string> {
  return urlField;
}

export function nullable<I, O>(field: Field<I, O>): Field<I | null, O | null> {
  return new NullableField(field);
}

export function list<I, O>(field: Field<I, O>): Field<I[], O[]> {
  return new ListField(field);
}
