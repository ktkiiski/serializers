import type Field from './Field.js';
import TextField from './TextField.js';

export default class TrimmedTextField extends TextField implements Field<string> {
  public validate(value: string): string {
    return super.validate(value).trim();
  }
}
