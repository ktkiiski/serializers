import ValidationException from '../errors/ValidationException';
import type Field from './Field';
import TextField from './TextField';

export default class ChoiceField<K extends string> extends TextField implements Field<K> {
  constructor(private options: K[]) {
    super();
  }

  public validate(value: string): K {
    const v = super.validate(value) as K;
    if (this.options.indexOf(v) >= 0) {
      return v;
    }
    throw new ValidationException('invalidOption', `Value is not one of the valid options`);
  }

  public serialize(value: K): K {
    return this.validate(value);
  }

  public deserialize(value: string): K {
    return this.validate(value);
  }

  public encode(value: K): K {
    return this.serialize(value);
  }

  public decode(value: string): K {
    return this.deserialize(value);
  }

  public encodeSortable(value: K): K {
    return this.encode(value);
  }

  public decodeSortable(value: string): K {
    return this.decode(value);
  }
}
