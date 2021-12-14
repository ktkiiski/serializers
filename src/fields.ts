import isEmpty from 'immuton/isEmpty';
import BooleanField from './fields/BooleanField';
import ChoiceField from './fields/ChoiceField';
import ConstantField from './fields/ConstantField';
import DateField from './fields/DateField';
import DateTimeField from './fields/DateTimeField';
import DecimalField from './fields/DecimalField';
import EmailField from './fields/EmailField';
import type Field from './fields/Field';
import type { NumberFieldOptions } from './fields/NumberField';
import NumberField from './fields/NumberField';
import IntegerField from './fields/IntegerField';
import ListField from './fields/ListField';
import NullableField from './fields/NullableField';
import RegexpField from './fields/RegexpField';
import StringField from './fields/StringField';
import TextField from './fields/TextField';
import TimestampField from './fields/TimestampField';
import TrimmedTextField from './fields/TrimmedTextField';
import URLField from './fields/URLField';
import UUIDField from './fields/UUIDField';

const stringField = new StringField();
const trimmedTextField = new TrimmedTextField();
const textField = new TextField();
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

export function string(): Field<string> {
  return stringField;
}

export function trimmed(): Field<string> {
  return trimmedTextField;
}

export function text(): Field<string> {
  return textField;
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
