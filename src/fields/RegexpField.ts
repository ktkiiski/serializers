import ValidationException from '../errors/ValidationException';
import TextField from './TextField';

export default class RegexpField extends TextField {
  constructor(
    private readonly regexp: RegExp,
    private readonly errorCode = 'patternMismatch',
    private readonly errorMessage = `String not matching regular expression ${regexp}`,
  ) {
    super();
  }

  public validate(value: string): string {
    const strValue = super.validate(value);
    if (this.regexp.test(strValue)) {
      return strValue;
    }
    throw new ValidationException(this.errorCode, this.errorMessage);
  }
}
