import ValidationException from '../errors/ValidationException';
import TrimmedTextField from './TrimmedTextField';

export default class StringField extends TrimmedTextField {
  public validateString(value: string): string {
    const validatedValue = super.validateString(value);
    if (!validatedValue) {
      throw new ValidationException('blank', `Value may not be blank`);
    }
    return validatedValue;
  }
}
