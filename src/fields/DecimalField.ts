/* eslint-disable no-param-reassign */
import NumberField from './FloatField';
import RegexpField from './RegexpField';

export default class DecimalField extends RegexpField {
  public readonly type: string = 'numeric';

  private numberField = new NumberField({});

  constructor(private decimals: number) {
    super(/^[+-]?\d+(\.\d+)$/, 'invalidDecimal', `Value is not a valid decimal string`);
  }

  public validate(value: string | number): string {
    const { decimals } = this;
    if (typeof value === 'number') {
      // Just convert the numeric value to a string
      return this.numberField.validate(value).toFixed(decimals);
    }
    value = super.validate(value);
    if (value[0] === '+') {
      value = value.slice(1);
    }
    const [numStr, decStr] = value.split('.');
    if (!decimals) {
      return numStr;
    }
    return `${numStr}.${(decStr || '').slice(0, decimals).padEnd(decimals, '0')}`;
  }

  public deserialize(value: unknown): string {
    if (typeof value === 'number') {
      return this.validate(value);
    }
    return super.deserialize(value);
  }
}
