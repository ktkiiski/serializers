import ValidationException from '../errors/ValidationException';
import TrimmedTextField from './TrimmedTextField';

export default class StringField extends TrimmedTextField {
  public validate(value: string): string {
    // eslint-disable-next-line no-param-reassign
    value = super.validate(value);
    if (!value) {
      throw new ValidationException('blank', `Value may not be blank`);
    }
    return value;
  }
}
