import ValidationException from '../errors/ValidationException.js';
import type Field from './Field.js';
import TextField from './TextField.js';

export default class ChoiceField<Option extends string> extends TextField<Option> implements Field<Option> {
  constructor(private options: Option[]) {
    super();
  }

  protected validateString(value: string): Option {
    const options = this.options as string[];
    if (options.indexOf(value) >= 0) {
      return value as Option;
    }
    throw new ValidationException('invalidOption', `Value is not one of the valid options`);
  }
}
