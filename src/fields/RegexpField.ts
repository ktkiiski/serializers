import ValidationException from '../errors/ValidationException.js';
import TextField from './TextField.js';

export default class RegexpField extends TextField {
  constructor(
    private readonly regexp: RegExp,
    private readonly errorCode = 'patternMismatch',
    private readonly errorMessage = `String not matching regular expression ${regexp}`,
  ) {
    super();
  }

  protected validateString(value: string): string {
    const strValue = super.validateString(value);
    if (this.regexp.test(strValue)) {
      return strValue;
    }
    throw new ValidationException(this.errorCode, this.errorMessage);
  }
}
