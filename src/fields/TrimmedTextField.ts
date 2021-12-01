import type Field from './Field';
import TextField from './TextField';

export default class TrimmedTextField extends TextField implements Field<string> {
  public validate(value: string): string {
    return super.validate(value).trim();
  }
}
