import ValidationException from '../errors/ValidationException';
import IntegerField from './IntegerField';

export default class ConstantField<K extends number> extends IntegerField {
  constructor(private choices: K[]) {
    super({});
  }

  public validate(value: number): K {
    const v = super.validate(value) as K;
    if (this.choices.indexOf(v) >= 0) {
      return v;
    }
    throw new ValidationException('invalidOption', `Value is not one of the valid options`);
  }

  public serialize(value: K): K {
    return this.validate(value);
  }

  public deserialize(value: unknown): K {
    return super.deserialize(value) as K;
  }

  public encode(value: K): string {
    return super.encode(value);
  }

  public decode(value: string): K {
    return this.deserialize(value);
  }

  public encodeSortable(value: K): string {
    return super.encodeSortable(value);
  }

  public decodeSortable(value: string): K {
    return super.decodeSortable(value) as K;
  }
}
