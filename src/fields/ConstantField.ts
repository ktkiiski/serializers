import { propertyless } from 'immuton';
import ValidationException from '../errors/ValidationException';
import IntegerField from './IntegerField';

export default class ConstantField<Option extends number> extends IntegerField<Option> {
  constructor(private options: Option[]) {
    super(propertyless);
  }

  protected validateNumber(value: number) {
    const options = this.options as number[];
    if (options.indexOf(value) >= 0) {
      return value as Option;
    }
    throw new ValidationException('invalidOption', `Value is not one of the valid options`);
  }
}
