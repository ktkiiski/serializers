import { deepEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException.js';
import DecimalField from './DecimalField.js';

describe('DecimalField', () => {
  describe('constructor', () => {
    it('throws on too large decimal precision', () => {
      throws(() => new DecimalField(21), new Error('Decimal precision cannot be greater than 20'));
      throws(() => new DecimalField(Infinity), new Error('Decimal precision cannot be greater than 20'));
    });
    it('throws on too small decimal precision', () => {
      throws(() => new DecimalField(-21), new Error('Decimal precision cannot be less than -20'));
      throws(() => new DecimalField(-Infinity), new Error('Decimal precision cannot be less than -20'));
    });
    it('throws on non-numeric decimal precision', () => {
      throws(() => new DecimalField(null as any), new Error('Decimal precision must be a finite number'));
      throws(() => new DecimalField(undefined as any), new Error('Decimal precision must be a finite number'));
      throws(() => new DecimalField(NaN), new Error('Decimal precision must be a finite number'));
      throws(() => new DecimalField('0' as any), new Error('Decimal precision must be a finite number'));
      throws(() => new DecimalField({} as any), new Error('Decimal precision must be a finite number'));
      throws(() => new DecimalField([] as any), new Error('Decimal precision must be a finite number'));
    });
  });
  describe('validate()', () => {
    it('accepts a number without decimals', () => {
      deepEqual(new DecimalField(2).validate('234'), '234.00');
      deepEqual(new DecimalField(1).validate('234'), '234.0');
      deepEqual(new DecimalField(0).validate('234'), '234');
      deepEqual(new DecimalField(-1).validate('234'), '230');
      deepEqual(new DecimalField(-2).validate('234'), '200');
      deepEqual(new DecimalField(-3).validate('234'), '0');
    });
    it('rounds decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).validate('234.560'), '234.5600');
      deepEqual(new DecimalField(3).validate('234.560'), '234.560');
      deepEqual(new DecimalField(2).validate('234.560'), '234.56');
      deepEqual(new DecimalField(1).validate('234.560'), '234.6');
      deepEqual(new DecimalField(0).validate('234.560'), '235');
      deepEqual(new DecimalField(-1).validate('234.560'), '230');
      deepEqual(new DecimalField(-2).validate('234.560'), '200');
      deepEqual(new DecimalField(-3).validate('234.560'), '0');
    });
    it('rounds explicitly positive decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).validate('+234.560'), '234.5600');
      deepEqual(new DecimalField(3).validate('+234.560'), '234.560');
      deepEqual(new DecimalField(2).validate('+234.560'), '234.56');
      deepEqual(new DecimalField(1).validate('+234.560'), '234.6');
      deepEqual(new DecimalField(0).validate('+234.560'), '235');
      deepEqual(new DecimalField(-1).validate('+234.560'), '230');
      deepEqual(new DecimalField(-2).validate('+234.560'), '200');
      deepEqual(new DecimalField(-3).validate('+234.560'), '0');
    });
    it('rounds negative decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).validate('-234.560'), '-234.5600');
      deepEqual(new DecimalField(3).validate('-234.560'), '-234.560');
      deepEqual(new DecimalField(2).validate('-234.560'), '-234.56');
      deepEqual(new DecimalField(1).validate('-234.560'), '-234.6');
      deepEqual(new DecimalField(0).validate('-234.560'), '-235');
      deepEqual(new DecimalField(-1).validate('-234.560'), '-230');
      deepEqual(new DecimalField(-2).validate('-234.560'), '-200');
      deepEqual(new DecimalField(-3).validate('-234.560'), '0');
    });
    it('throws on invalid decimal string format', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidDecimal', 'Invalid decimal string');
      throws(() => field.validate('123.'), validationError);
      throws(() => field.validate('a123'), validationError);
      throws(() => field.validate('NaN'), validationError);
      throws(() => field.validate('Infinity'), validationError);
      throws(() => field.validate('-Infinity'), validationError);
    });
    it('throws on non-string values', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.validate(123 as any), validationError);
      throws(() => field.validate(0 as any), validationError);
      throws(() => field.validate(true as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('accepts a number without decimals', () => {
      deepEqual(new DecimalField(2).serialize('234'), '234.00');
      deepEqual(new DecimalField(1).serialize('234'), '234.0');
      deepEqual(new DecimalField(0).serialize('234'), '234');
      deepEqual(new DecimalField(-1).serialize('234'), '230');
      deepEqual(new DecimalField(-2).serialize('234'), '200');
      deepEqual(new DecimalField(-3).serialize('234'), '0');
    });
    it('rounds decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).serialize('234.560'), '234.5600');
      deepEqual(new DecimalField(3).serialize('234.560'), '234.560');
      deepEqual(new DecimalField(2).serialize('234.560'), '234.56');
      deepEqual(new DecimalField(1).serialize('234.560'), '234.6');
      deepEqual(new DecimalField(0).serialize('234.560'), '235');
      deepEqual(new DecimalField(-1).serialize('234.560'), '230');
      deepEqual(new DecimalField(-2).serialize('234.560'), '200');
      deepEqual(new DecimalField(-3).serialize('234.560'), '0');
    });
    it('rounds explicitly positive decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).serialize('+234.560'), '234.5600');
      deepEqual(new DecimalField(3).serialize('+234.560'), '234.560');
      deepEqual(new DecimalField(2).serialize('+234.560'), '234.56');
      deepEqual(new DecimalField(1).serialize('+234.560'), '234.6');
      deepEqual(new DecimalField(0).serialize('+234.560'), '235');
      deepEqual(new DecimalField(-1).serialize('+234.560'), '230');
      deepEqual(new DecimalField(-2).serialize('+234.560'), '200');
      deepEqual(new DecimalField(-3).serialize('+234.560'), '0');
    });
    it('rounds negative decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).serialize('-234.560'), '-234.5600');
      deepEqual(new DecimalField(3).serialize('-234.560'), '-234.560');
      deepEqual(new DecimalField(2).serialize('-234.560'), '-234.56');
      deepEqual(new DecimalField(1).serialize('-234.560'), '-234.6');
      deepEqual(new DecimalField(0).serialize('-234.560'), '-235');
      deepEqual(new DecimalField(-1).serialize('-234.560'), '-230');
      deepEqual(new DecimalField(-2).serialize('-234.560'), '-200');
      deepEqual(new DecimalField(-3).serialize('-234.560'), '0');
    });
    it('throws on invalid decimal string format', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidDecimal', 'Invalid decimal string');
      throws(() => field.serialize('123.'), validationError);
      throws(() => field.serialize('a123'), validationError);
      throws(() => field.serialize('NaN'), validationError);
      throws(() => field.serialize('Infinity'), validationError);
      throws(() => field.serialize('-Infinity'), validationError);
    });
    it('throws on non-string values', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.serialize(123 as any), validationError);
      throws(() => field.serialize(0 as any), validationError);
      throws(() => field.serialize(NaN as any), validationError);
      throws(() => field.serialize(true as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('accepts a number without decimals', () => {
      deepEqual(new DecimalField(2).deserialize('234'), '234.00');
      deepEqual(new DecimalField(1).deserialize('234'), '234.0');
      deepEqual(new DecimalField(0).deserialize('234'), '234');
      deepEqual(new DecimalField(-1).deserialize('234'), '230');
      deepEqual(new DecimalField(-2).deserialize('234'), '200');
      deepEqual(new DecimalField(-3).deserialize('234'), '0');
    });
    it('rounds decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).deserialize('234.560'), '234.5600');
      deepEqual(new DecimalField(3).deserialize('234.560'), '234.560');
      deepEqual(new DecimalField(2).deserialize('234.560'), '234.56');
      deepEqual(new DecimalField(1).deserialize('234.560'), '234.6');
      deepEqual(new DecimalField(0).deserialize('234.560'), '235');
      deepEqual(new DecimalField(-1).deserialize('234.560'), '230');
      deepEqual(new DecimalField(-2).deserialize('234.560'), '200');
      deepEqual(new DecimalField(-3).deserialize('234.560'), '0');
    });
    it('rounds explicitly positive decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).deserialize('+234.560'), '234.5600');
      deepEqual(new DecimalField(3).deserialize('+234.560'), '234.560');
      deepEqual(new DecimalField(2).deserialize('+234.560'), '234.56');
      deepEqual(new DecimalField(1).deserialize('+234.560'), '234.6');
      deepEqual(new DecimalField(0).deserialize('+234.560'), '235');
      deepEqual(new DecimalField(-1).deserialize('+234.560'), '230');
      deepEqual(new DecimalField(-2).deserialize('+234.560'), '200');
      deepEqual(new DecimalField(-3).deserialize('+234.560'), '0');
    });
    it('rounds negative decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).deserialize('-234.560'), '-234.5600');
      deepEqual(new DecimalField(3).deserialize('-234.560'), '-234.560');
      deepEqual(new DecimalField(2).deserialize('-234.560'), '-234.56');
      deepEqual(new DecimalField(1).deserialize('-234.560'), '-234.6');
      deepEqual(new DecimalField(0).deserialize('-234.560'), '-235');
      deepEqual(new DecimalField(-1).deserialize('-234.560'), '-230');
      deepEqual(new DecimalField(-2).deserialize('-234.560'), '-200');
      deepEqual(new DecimalField(-3).deserialize('-234.560'), '0');
    });
    it('rounds number to the given precision', () => {
      deepEqual(new DecimalField(3).deserialize(234.56), '234.560');
      deepEqual(new DecimalField(2).deserialize(234.56), '234.56');
      deepEqual(new DecimalField(1).deserialize(234.56), '234.6');
      deepEqual(new DecimalField(0).deserialize(234.56), '235');
      deepEqual(new DecimalField(-1).deserialize(234.56), '230');
      deepEqual(new DecimalField(-2).deserialize(234.56), '200');
      deepEqual(new DecimalField(-3).deserialize(234.56), '0');
    });
    it('throws on invalid decimal string format', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidDecimal', 'Invalid decimal string');
      throws(() => field.deserialize('123.'), validationError);
      throws(() => field.deserialize('a123'), validationError);
      throws(() => field.deserialize('NaN'), validationError);
      throws(() => field.deserialize('Infinity'), validationError);
      throws(() => field.deserialize('-Infinity'), validationError);
    });
    it('throws on non-finite number', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidNumber', 'Number value must be finite');
      throws(() => field.deserialize(NaN), validationError);
      throws(() => field.deserialize(Infinity), validationError);
      throws(() => field.deserialize(-Infinity), validationError);
    });
    it('throws on non-numeric or decimal string values', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidValue', 'Invalid string or number value');
      throws(() => field.deserialize(true), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('accepts a number without decimals', () => {
      deepEqual(new DecimalField(2).encode('234'), '234.00');
      deepEqual(new DecimalField(1).encode('234'), '234.0');
      deepEqual(new DecimalField(0).encode('234'), '234');
      deepEqual(new DecimalField(-1).encode('234'), '230');
      deepEqual(new DecimalField(-2).encode('234'), '200');
      deepEqual(new DecimalField(-3).encode('234'), '0');
    });
    it('rounds decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).encode('234.560'), '234.5600');
      deepEqual(new DecimalField(3).encode('234.560'), '234.560');
      deepEqual(new DecimalField(2).encode('234.560'), '234.56');
      deepEqual(new DecimalField(1).encode('234.560'), '234.6');
      deepEqual(new DecimalField(0).encode('234.560'), '235');
      deepEqual(new DecimalField(-1).encode('234.560'), '230');
      deepEqual(new DecimalField(-2).encode('234.560'), '200');
      deepEqual(new DecimalField(-3).encode('234.560'), '0');
    });
    it('rounds explicitly positive decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).encode('+234.560'), '234.5600');
      deepEqual(new DecimalField(3).encode('+234.560'), '234.560');
      deepEqual(new DecimalField(2).encode('+234.560'), '234.56');
      deepEqual(new DecimalField(1).encode('+234.560'), '234.6');
      deepEqual(new DecimalField(0).encode('+234.560'), '235');
      deepEqual(new DecimalField(-1).encode('+234.560'), '230');
      deepEqual(new DecimalField(-2).encode('+234.560'), '200');
      deepEqual(new DecimalField(-3).encode('+234.560'), '0');
    });
    it('rounds negative decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).encode('-234.560'), '-234.5600');
      deepEqual(new DecimalField(3).encode('-234.560'), '-234.560');
      deepEqual(new DecimalField(2).encode('-234.560'), '-234.56');
      deepEqual(new DecimalField(1).encode('-234.560'), '-234.6');
      deepEqual(new DecimalField(0).encode('-234.560'), '-235');
      deepEqual(new DecimalField(-1).encode('-234.560'), '-230');
      deepEqual(new DecimalField(-2).encode('-234.560'), '-200');
      deepEqual(new DecimalField(-3).encode('-234.560'), '0');
    });
    it('throws on invalid decimal string format', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidDecimal', 'Invalid decimal string');
      throws(() => field.encode('123.'), validationError);
      throws(() => field.encode('a123'), validationError);
      throws(() => field.encode('NaN'), validationError);
      throws(() => field.encode('Infinity'), validationError);
      throws(() => field.encode('-Infinity'), validationError);
    });
    it('throws on non-string values', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.encode(123 as any), validationError);
      throws(() => field.encode(0 as any), validationError);
      throws(() => field.encode(NaN as any), validationError);
      throws(() => field.encode(true as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('accepts a number without decimals', () => {
      deepEqual(new DecimalField(2).decode('234'), '234.00');
      deepEqual(new DecimalField(1).decode('234'), '234.0');
      deepEqual(new DecimalField(0).decode('234'), '234');
      deepEqual(new DecimalField(-1).decode('234'), '230');
      deepEqual(new DecimalField(-2).decode('234'), '200');
      deepEqual(new DecimalField(-3).decode('234'), '0');
    });
    it('rounds decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).decode('234.560'), '234.5600');
      deepEqual(new DecimalField(3).decode('234.560'), '234.560');
      deepEqual(new DecimalField(2).decode('234.560'), '234.56');
      deepEqual(new DecimalField(1).decode('234.560'), '234.6');
      deepEqual(new DecimalField(0).decode('234.560'), '235');
      deepEqual(new DecimalField(-1).decode('234.560'), '230');
      deepEqual(new DecimalField(-2).decode('234.560'), '200');
      deepEqual(new DecimalField(-3).decode('234.560'), '0');
    });
    it('rounds explicitly positive decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).decode('+234.560'), '234.5600');
      deepEqual(new DecimalField(3).decode('+234.560'), '234.560');
      deepEqual(new DecimalField(2).decode('+234.560'), '234.56');
      deepEqual(new DecimalField(1).decode('+234.560'), '234.6');
      deepEqual(new DecimalField(0).decode('+234.560'), '235');
      deepEqual(new DecimalField(-1).decode('+234.560'), '230');
      deepEqual(new DecimalField(-2).decode('+234.560'), '200');
      deepEqual(new DecimalField(-3).decode('+234.560'), '0');
    });
    it('rounds negative decimal string to the given precision', () => {
      deepEqual(new DecimalField(4).decode('-234.560'), '-234.5600');
      deepEqual(new DecimalField(3).decode('-234.560'), '-234.560');
      deepEqual(new DecimalField(2).decode('-234.560'), '-234.56');
      deepEqual(new DecimalField(1).decode('-234.560'), '-234.6');
      deepEqual(new DecimalField(0).decode('-234.560'), '-235');
      deepEqual(new DecimalField(-1).decode('-234.560'), '-230');
      deepEqual(new DecimalField(-2).decode('-234.560'), '-200');
      deepEqual(new DecimalField(-3).decode('-234.560'), '0');
    });
    it('throws on invalid decimal string format', () => {
      const field = new DecimalField(2);
      const validationError = new ValidationException('invalidDecimal', 'Invalid decimal string');
      throws(() => field.decode('123.'), validationError);
      throws(() => field.decode('a123'), validationError);
      throws(() => field.decode('NaN'), validationError);
      throws(() => field.decode('Infinity'), validationError);
      throws(() => field.decode('-Infinity'), validationError);
    });
  });
});
