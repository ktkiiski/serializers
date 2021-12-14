import { deepEqual, throws } from 'assert';
import { describe, it } from 'mocha';
import ValidationException from '../errors/ValidationException';
import EmailField from './EmailField';

describe('EmailField', () => {
  const field = new EmailField();
  describe('validate()', () => {
    it('allows valid email addresses', () => {
      deepEqual(field.validate('email@example.com'), 'email@example.com');
      deepEqual(field.validate('firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.validate('email@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.validate('firstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.validate('email@123.123.123.123'), 'email@123.123.123.123');
      deepEqual(field.validate('email@[123.123.123.123]'), 'email@[123.123.123.123]');
      deepEqual(field.validate('"email"@example.com'), '"email"@example.com');
      deepEqual(field.validate('1234567890@example.com'), '1234567890@example.com');
      deepEqual(field.validate('email@example-one.com'), 'email@example-one.com');
      deepEqual(field.validate('_______@example.com'), '_______@example.com');
      deepEqual(field.validate('email@example.name'), 'email@example.name');
      deepEqual(field.validate('email@example.museum'), 'email@example.museum');
      deepEqual(field.validate('email@example.co.jp'), 'email@example.co.jp');
      deepEqual(field.validate('firstname-lastname@example.com'), 'firstname-lastname@example.com');
      deepEqual(field.validate('much."more\\ unusual"@example.com'), 'much."more\\ unusual"@example.com');
      deepEqual(field.validate('" "@example.org'), '" "@example.org');
      deepEqual(field.validate('mailhost!username@example.org'), 'mailhost!username@example.org');
      deepEqual(field.validate('user%example.com@example.org'), 'user%example.com@example.org');
      deepEqual(field.validate('user-@example.org'), 'user-@example.org');
      deepEqual(field.validate('very.unusual."@".unusual.com@example.com'), 'very.unusual."@".unusual.com@example.com');
      deepEqual(field.validate('postmaster@[123.123.123.123]'), 'postmaster@[123.123.123.123]');
      deepEqual(
        field.validate('postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]'),
        'postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
      );
      deepEqual(
        field.validate('very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com'),
        'very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com',
      );
    });
    it('trims leading whitespaces', () => {
      deepEqual(field.validate(' email@example.com'), 'email@example.com');
      deepEqual(field.validate('  firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.validate('\temail@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.validate('\nfirstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.validate('\n \t\nemail@123.123.123.123'), 'email@123.123.123.123');
    });
    it('trims trailing whitespaces', () => {
      deepEqual(field.validate('email@example.com '), 'email@example.com');
      deepEqual(field.validate('firstname.lastname@example.com  '), 'firstname.lastname@example.com');
      deepEqual(field.validate('email@subdomain.example.com\t'), 'email@subdomain.example.com');
      deepEqual(field.validate('firstname+lastname@example.com\n'), 'firstname+lastname@example.com');
      deepEqual(field.validate('email@123.123.123.123\n \t\n'), 'email@123.123.123.123');
    });
    it('throws on a blank string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.validate(''), error);
    });
    it('throws on a whitespace-only string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.validate(' '), error);
      throws(() => field.validate('\n'), error);
      throws(() => field.validate('\t'), error);
    });
    it('throws on a string missing a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.validate('email.example.com'), error);
      throws(() => field.validate('firstname.lastname.example.com'), error);
      throws(() => field.validate('email.subdomain.example.com'), error);
      throws(() => field.validate('firstname+lastname.example.com'), error);
      throws(() => field.validate('email.123.123.123.123'), error);
      throws(() => field.validate('email.[123.123.123.123]'), error);
      throws(() => field.validate('"email".example.com'), error);
      throws(() => field.validate('1234567890.example.com'), error);
      throws(() => field.validate('email.example-one.com'), error);
      throws(() => field.validate('_______.example.com'), error);
      throws(() => field.validate('email.example.name'), error);
      throws(() => field.validate('email.example.museum'), error);
      throws(() => field.validate('email.example.co.jp'), error);
      throws(() => field.validate('firstname-lastname.example.com'), error);
      throws(() => field.validate('much."more\\ unusual".example.com'), error);
      throws(() => field.validate('very.unusual.".".unusual.com.example.com'), error);
      throws(() => field.validate('very."(),:;<>[]".VERY."very.\\ "very".unusual.strange.example.com'), error);
    });
    it('throws on a string starting with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.validate('@example.com'), error);
      throws(() => field.validate('@example-one.com'), error);
      throws(() => field.validate('@subdomain.example.com'), error);
      throws(() => field.validate('@[123.123.123.123]'), error);
      throws(() => field.validate('@123.123.123.123'), error);
    });
    it('throws on a string starting with a whitespace and @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.validate(' @example.com'), error);
      throws(() => field.validate('\t@example-one.com'), error);
      throws(() => field.validate('\n@subdomain.example.com'), error);
      throws(() => field.validate('  @[123.123.123.123]'), error);
      throws(() => field.validate(' \n@123.123.123.123'), error);
    });
    it('throws on a string ending with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.validate('firstname-lastname@'), error);
      throws(() => field.validate('firstname.lastname@'), error);
      throws(() => field.validate('firstname+lastname@'), error);
      throws(() => field.validate('email@'), error);
      throws(() => field.validate('1234567890@'), error);
      throws(() => field.validate('_______@'), error);
      throws(() => field.validate('"email"@'), error);
      throws(() => field.validate('much."more\\ unusual"@'), error);
      throws(() => field.validate('very."(),:;<>[]".VERY."very@'), error);
      throws(() => field.validate('very.unusual."@'), error);
    });
    it('throws on a string ending with a @ character and whitespace', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.validate('firstname-lastname@ '), error);
      throws(() => field.validate('firstname.lastname@  '), error);
      throws(() => field.validate('firstname+lastname@\t'), error);
      throws(() => field.validate('email@\n'), error);
      throws(() => field.validate('1234567890@\n '), error);
      throws(() => field.validate('_______@ \n'), error);
      throws(() => field.validate('"email"@\t\n'), error);
      throws(() => field.validate('much."more\\ unusual"@  '), error);
      throws(() => field.validate('very."(),:;<>[]".VERY."very@  '), error);
      throws(() => field.validate('very.unusual."@  '), error);
    });
    it('throws on non-string values', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.validate(0 as any), validationError);
      throws(() => field.validate(false as any), validationError);
      throws(() => field.validate({} as any), validationError);
      throws(() => field.validate([] as any), validationError);
      throws(() => field.validate(null as any), validationError);
      throws(() => field.validate(undefined as any), validationError);
    });
  });
  describe('serialize()', () => {
    it('allows valid email addresses', () => {
      deepEqual(field.serialize('email@example.com'), 'email@example.com');
      deepEqual(field.serialize('firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.serialize('email@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.serialize('firstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.serialize('email@123.123.123.123'), 'email@123.123.123.123');
      deepEqual(field.serialize('email@[123.123.123.123]'), 'email@[123.123.123.123]');
      deepEqual(field.serialize('"email"@example.com'), '"email"@example.com');
      deepEqual(field.serialize('1234567890@example.com'), '1234567890@example.com');
      deepEqual(field.serialize('email@example-one.com'), 'email@example-one.com');
      deepEqual(field.serialize('_______@example.com'), '_______@example.com');
      deepEqual(field.serialize('email@example.name'), 'email@example.name');
      deepEqual(field.serialize('email@example.museum'), 'email@example.museum');
      deepEqual(field.serialize('email@example.co.jp'), 'email@example.co.jp');
      deepEqual(field.serialize('firstname-lastname@example.com'), 'firstname-lastname@example.com');
      deepEqual(field.serialize('much."more\\ unusual"@example.com'), 'much."more\\ unusual"@example.com');
      deepEqual(field.serialize('" "@example.org'), '" "@example.org');
      deepEqual(field.serialize('mailhost!username@example.org'), 'mailhost!username@example.org');
      deepEqual(field.serialize('user%example.com@example.org'), 'user%example.com@example.org');
      deepEqual(field.serialize('user-@example.org'), 'user-@example.org');
      deepEqual(
        field.serialize('very.unusual."@".unusual.com@example.com'),
        'very.unusual."@".unusual.com@example.com',
      );
      deepEqual(field.serialize('postmaster@[123.123.123.123]'), 'postmaster@[123.123.123.123]');
      deepEqual(
        field.serialize('postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]'),
        'postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
      );
      deepEqual(
        field.serialize('very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com'),
        'very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com',
      );
    });
    it('trims leading whitespaces', () => {
      deepEqual(field.serialize(' email@example.com'), 'email@example.com');
      deepEqual(field.serialize('  firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.serialize('\temail@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.serialize('\nfirstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.serialize('\n \t\nemail@123.123.123.123'), 'email@123.123.123.123');
    });
    it('trims trailing whitespaces', () => {
      deepEqual(field.serialize('email@example.com '), 'email@example.com');
      deepEqual(field.serialize('firstname.lastname@example.com  '), 'firstname.lastname@example.com');
      deepEqual(field.serialize('email@subdomain.example.com\t'), 'email@subdomain.example.com');
      deepEqual(field.serialize('firstname+lastname@example.com\n'), 'firstname+lastname@example.com');
      deepEqual(field.serialize('email@123.123.123.123\n \t\n'), 'email@123.123.123.123');
    });
    it('throws on a blank string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.serialize(''), error);
    });
    it('throws on a whitespace-only string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.serialize(' '), error);
      throws(() => field.serialize('\n'), error);
      throws(() => field.serialize('\t'), error);
    });
    it('throws on a string missing a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.serialize('email.example.com'), error);
      throws(() => field.serialize('firstname.lastname.example.com'), error);
      throws(() => field.serialize('email.subdomain.example.com'), error);
      throws(() => field.serialize('firstname+lastname.example.com'), error);
      throws(() => field.serialize('email.123.123.123.123'), error);
      throws(() => field.serialize('email.[123.123.123.123]'), error);
      throws(() => field.serialize('"email".example.com'), error);
      throws(() => field.serialize('1234567890.example.com'), error);
      throws(() => field.serialize('email.example-one.com'), error);
      throws(() => field.serialize('_______.example.com'), error);
      throws(() => field.serialize('email.example.name'), error);
      throws(() => field.serialize('email.example.museum'), error);
      throws(() => field.serialize('email.example.co.jp'), error);
      throws(() => field.serialize('firstname-lastname.example.com'), error);
      throws(() => field.serialize('much."more\\ unusual".example.com'), error);
      throws(() => field.serialize('very.unusual.".".unusual.com.example.com'), error);
      throws(() => field.serialize('very."(),:;<>[]".VERY."very.\\ "very".unusual.strange.example.com'), error);
    });
    it('throws on a string starting with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.serialize('@example.com'), error);
      throws(() => field.serialize('@example-one.com'), error);
      throws(() => field.serialize('@subdomain.example.com'), error);
      throws(() => field.serialize('@[123.123.123.123]'), error);
      throws(() => field.serialize('@123.123.123.123'), error);
    });
    it('throws on a string starting with a whitespace and @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.serialize(' @example.com'), error);
      throws(() => field.serialize('\t@example-one.com'), error);
      throws(() => field.serialize('\n@subdomain.example.com'), error);
      throws(() => field.serialize('  @[123.123.123.123]'), error);
      throws(() => field.serialize(' \n@123.123.123.123'), error);
    });
    it('throws on a string ending with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.serialize('firstname-lastname@'), error);
      throws(() => field.serialize('firstname.lastname@'), error);
      throws(() => field.serialize('firstname+lastname@'), error);
      throws(() => field.serialize('email@'), error);
      throws(() => field.serialize('1234567890@'), error);
      throws(() => field.serialize('_______@'), error);
      throws(() => field.serialize('"email"@'), error);
      throws(() => field.serialize('much."more\\ unusual"@'), error);
      throws(() => field.serialize('very."(),:;<>[]".VERY."very@'), error);
      throws(() => field.serialize('very.unusual."@'), error);
    });
    it('throws on a string ending with a @ character and whitespace', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.serialize('firstname-lastname@ '), error);
      throws(() => field.serialize('firstname.lastname@  '), error);
      throws(() => field.serialize('firstname+lastname@\t'), error);
      throws(() => field.serialize('email@\n'), error);
      throws(() => field.serialize('1234567890@\n '), error);
      throws(() => field.serialize('_______@ \n'), error);
      throws(() => field.serialize('"email"@\t\n'), error);
      throws(() => field.serialize('much."more\\ unusual"@  '), error);
      throws(() => field.serialize('very."(),:;<>[]".VERY."very@  '), error);
      throws(() => field.serialize('very.unusual."@  '), error);
    });
    it('throws on non-string values', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.serialize(0 as any), validationError);
      throws(() => field.serialize(false as any), validationError);
      throws(() => field.serialize({} as any), validationError);
      throws(() => field.serialize([] as any), validationError);
      throws(() => field.serialize(null as any), validationError);
      throws(() => field.serialize(undefined as any), validationError);
    });
  });
  describe('deserialize()', () => {
    it('allows valid email addresses', () => {
      deepEqual(field.deserialize('email@example.com'), 'email@example.com');
      deepEqual(field.deserialize('firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.deserialize('email@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.deserialize('firstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.deserialize('email@123.123.123.123'), 'email@123.123.123.123');
      deepEqual(field.deserialize('email@[123.123.123.123]'), 'email@[123.123.123.123]');
      deepEqual(field.deserialize('"email"@example.com'), '"email"@example.com');
      deepEqual(field.deserialize('1234567890@example.com'), '1234567890@example.com');
      deepEqual(field.deserialize('email@example-one.com'), 'email@example-one.com');
      deepEqual(field.deserialize('_______@example.com'), '_______@example.com');
      deepEqual(field.deserialize('email@example.name'), 'email@example.name');
      deepEqual(field.deserialize('email@example.museum'), 'email@example.museum');
      deepEqual(field.deserialize('email@example.co.jp'), 'email@example.co.jp');
      deepEqual(field.deserialize('firstname-lastname@example.com'), 'firstname-lastname@example.com');
      deepEqual(field.deserialize('much."more\\ unusual"@example.com'), 'much."more\\ unusual"@example.com');
      deepEqual(field.deserialize('" "@example.org'), '" "@example.org');
      deepEqual(field.deserialize('mailhost!username@example.org'), 'mailhost!username@example.org');
      deepEqual(field.deserialize('user%example.com@example.org'), 'user%example.com@example.org');
      deepEqual(field.deserialize('user-@example.org'), 'user-@example.org');
      deepEqual(
        field.deserialize('very.unusual."@".unusual.com@example.com'),
        'very.unusual."@".unusual.com@example.com',
      );
      deepEqual(field.deserialize('postmaster@[123.123.123.123]'), 'postmaster@[123.123.123.123]');
      deepEqual(
        field.deserialize('postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]'),
        'postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
      );
      deepEqual(
        field.deserialize('very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com'),
        'very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com',
      );
    });
    it('trims leading whitespaces', () => {
      deepEqual(field.deserialize(' email@example.com'), 'email@example.com');
      deepEqual(field.deserialize('  firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.deserialize('\temail@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.deserialize('\nfirstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.deserialize('\n \t\nemail@123.123.123.123'), 'email@123.123.123.123');
    });
    it('trims trailing whitespaces', () => {
      deepEqual(field.deserialize('email@example.com '), 'email@example.com');
      deepEqual(field.deserialize('firstname.lastname@example.com  '), 'firstname.lastname@example.com');
      deepEqual(field.deserialize('email@subdomain.example.com\t'), 'email@subdomain.example.com');
      deepEqual(field.deserialize('firstname+lastname@example.com\n'), 'firstname+lastname@example.com');
      deepEqual(field.deserialize('email@123.123.123.123\n \t\n'), 'email@123.123.123.123');
    });
    it('throws on a blank string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.deserialize(''), error);
    });
    it('throws on a whitespace-only string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.deserialize(' '), error);
      throws(() => field.deserialize('\n'), error);
      throws(() => field.deserialize('\t'), error);
    });
    it('throws on a string missing a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.deserialize('email.example.com'), error);
      throws(() => field.deserialize('firstname.lastname.example.com'), error);
      throws(() => field.deserialize('email.subdomain.example.com'), error);
      throws(() => field.deserialize('firstname+lastname.example.com'), error);
      throws(() => field.deserialize('email.123.123.123.123'), error);
      throws(() => field.deserialize('email.[123.123.123.123]'), error);
      throws(() => field.deserialize('"email".example.com'), error);
      throws(() => field.deserialize('1234567890.example.com'), error);
      throws(() => field.deserialize('email.example-one.com'), error);
      throws(() => field.deserialize('_______.example.com'), error);
      throws(() => field.deserialize('email.example.name'), error);
      throws(() => field.deserialize('email.example.museum'), error);
      throws(() => field.deserialize('email.example.co.jp'), error);
      throws(() => field.deserialize('firstname-lastname.example.com'), error);
      throws(() => field.deserialize('much."more\\ unusual".example.com'), error);
      throws(() => field.deserialize('very.unusual.".".unusual.com.example.com'), error);
      throws(() => field.deserialize('very."(),:;<>[]".VERY."very.\\ "very".unusual.strange.example.com'), error);
    });
    it('throws on a string starting with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.deserialize('@example.com'), error);
      throws(() => field.deserialize('@example-one.com'), error);
      throws(() => field.deserialize('@subdomain.example.com'), error);
      throws(() => field.deserialize('@[123.123.123.123]'), error);
      throws(() => field.deserialize('@123.123.123.123'), error);
    });
    it('throws on a string starting with a whitespace and @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.deserialize(' @example.com'), error);
      throws(() => field.deserialize('\t@example-one.com'), error);
      throws(() => field.deserialize('\n@subdomain.example.com'), error);
      throws(() => field.deserialize('  @[123.123.123.123]'), error);
      throws(() => field.deserialize(' \n@123.123.123.123'), error);
    });
    it('throws on a string ending with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.deserialize('firstname-lastname@'), error);
      throws(() => field.deserialize('firstname.lastname@'), error);
      throws(() => field.deserialize('firstname+lastname@'), error);
      throws(() => field.deserialize('email@'), error);
      throws(() => field.deserialize('1234567890@'), error);
      throws(() => field.deserialize('_______@'), error);
      throws(() => field.deserialize('"email"@'), error);
      throws(() => field.deserialize('much."more\\ unusual"@'), error);
      throws(() => field.deserialize('very."(),:;<>[]".VERY."very@'), error);
      throws(() => field.deserialize('very.unusual."@'), error);
    });
    it('throws on a string ending with a @ character and whitespace', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.deserialize('firstname-lastname@ '), error);
      throws(() => field.deserialize('firstname.lastname@  '), error);
      throws(() => field.deserialize('firstname+lastname@\t'), error);
      throws(() => field.deserialize('email@\n'), error);
      throws(() => field.deserialize('1234567890@\n '), error);
      throws(() => field.deserialize('_______@ \n'), error);
      throws(() => field.deserialize('"email"@\t\n'), error);
      throws(() => field.deserialize('much."more\\ unusual"@  '), error);
      throws(() => field.deserialize('very."(),:;<>[]".VERY."very@  '), error);
      throws(() => field.deserialize('very.unusual."@  '), error);
    });
    it('throws on non-string values', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.deserialize(false), validationError);
      throws(() => field.deserialize({}), validationError);
      throws(() => field.deserialize([]), validationError);
      throws(() => field.deserialize(null), validationError);
      throws(() => field.deserialize(undefined), validationError);
    });
  });
  describe('encode()', () => {
    it('allows valid email addresses', () => {
      deepEqual(field.encode('email@example.com'), 'email@example.com');
      deepEqual(field.encode('firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.encode('email@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.encode('firstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.encode('email@123.123.123.123'), 'email@123.123.123.123');
      deepEqual(field.encode('email@[123.123.123.123]'), 'email@[123.123.123.123]');
      deepEqual(field.encode('"email"@example.com'), '"email"@example.com');
      deepEqual(field.encode('1234567890@example.com'), '1234567890@example.com');
      deepEqual(field.encode('email@example-one.com'), 'email@example-one.com');
      deepEqual(field.encode('_______@example.com'), '_______@example.com');
      deepEqual(field.encode('email@example.name'), 'email@example.name');
      deepEqual(field.encode('email@example.museum'), 'email@example.museum');
      deepEqual(field.encode('email@example.co.jp'), 'email@example.co.jp');
      deepEqual(field.encode('firstname-lastname@example.com'), 'firstname-lastname@example.com');
      deepEqual(field.encode('much."more\\ unusual"@example.com'), 'much."more\\ unusual"@example.com');
      deepEqual(field.encode('" "@example.org'), '" "@example.org');
      deepEqual(field.encode('mailhost!username@example.org'), 'mailhost!username@example.org');
      deepEqual(field.encode('user%example.com@example.org'), 'user%example.com@example.org');
      deepEqual(field.encode('user-@example.org'), 'user-@example.org');
      deepEqual(field.encode('very.unusual."@".unusual.com@example.com'), 'very.unusual."@".unusual.com@example.com');
      deepEqual(field.encode('postmaster@[123.123.123.123]'), 'postmaster@[123.123.123.123]');
      deepEqual(
        field.encode('postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]'),
        'postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
      );
      deepEqual(
        field.encode('very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com'),
        'very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com',
      );
    });
    it('trims leading whitespaces', () => {
      deepEqual(field.encode(' email@example.com'), 'email@example.com');
      deepEqual(field.encode('  firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.encode('\temail@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.encode('\nfirstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.encode('\n \t\nemail@123.123.123.123'), 'email@123.123.123.123');
    });
    it('trims trailing whitespaces', () => {
      deepEqual(field.encode('email@example.com '), 'email@example.com');
      deepEqual(field.encode('firstname.lastname@example.com  '), 'firstname.lastname@example.com');
      deepEqual(field.encode('email@subdomain.example.com\t'), 'email@subdomain.example.com');
      deepEqual(field.encode('firstname+lastname@example.com\n'), 'firstname+lastname@example.com');
      deepEqual(field.encode('email@123.123.123.123\n \t\n'), 'email@123.123.123.123');
    });
    it('throws on a blank string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.encode(''), error);
    });
    it('throws on a whitespace-only string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.encode(' '), error);
      throws(() => field.encode('\n'), error);
      throws(() => field.encode('\t'), error);
    });
    it('throws on a string missing a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.encode('email.example.com'), error);
      throws(() => field.encode('firstname.lastname.example.com'), error);
      throws(() => field.encode('email.subdomain.example.com'), error);
      throws(() => field.encode('firstname+lastname.example.com'), error);
      throws(() => field.encode('email.123.123.123.123'), error);
      throws(() => field.encode('email.[123.123.123.123]'), error);
      throws(() => field.encode('"email".example.com'), error);
      throws(() => field.encode('1234567890.example.com'), error);
      throws(() => field.encode('email.example-one.com'), error);
      throws(() => field.encode('_______.example.com'), error);
      throws(() => field.encode('email.example.name'), error);
      throws(() => field.encode('email.example.museum'), error);
      throws(() => field.encode('email.example.co.jp'), error);
      throws(() => field.encode('firstname-lastname.example.com'), error);
      throws(() => field.encode('much."more\\ unusual".example.com'), error);
      throws(() => field.encode('very.unusual.".".unusual.com.example.com'), error);
      throws(() => field.encode('very."(),:;<>[]".VERY."very.\\ "very".unusual.strange.example.com'), error);
    });
    it('throws on a string starting with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.encode('@example.com'), error);
      throws(() => field.encode('@example-one.com'), error);
      throws(() => field.encode('@subdomain.example.com'), error);
      throws(() => field.encode('@[123.123.123.123]'), error);
      throws(() => field.encode('@123.123.123.123'), error);
    });
    it('throws on a string starting with a whitespace and @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.encode(' @example.com'), error);
      throws(() => field.encode('\t@example-one.com'), error);
      throws(() => field.encode('\n@subdomain.example.com'), error);
      throws(() => field.encode('  @[123.123.123.123]'), error);
      throws(() => field.encode(' \n@123.123.123.123'), error);
    });
    it('throws on a string ending with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.encode('firstname-lastname@'), error);
      throws(() => field.encode('firstname.lastname@'), error);
      throws(() => field.encode('firstname+lastname@'), error);
      throws(() => field.encode('email@'), error);
      throws(() => field.encode('1234567890@'), error);
      throws(() => field.encode('_______@'), error);
      throws(() => field.encode('"email"@'), error);
      throws(() => field.encode('much."more\\ unusual"@'), error);
      throws(() => field.encode('very."(),:;<>[]".VERY."very@'), error);
      throws(() => field.encode('very.unusual."@'), error);
    });
    it('throws on a string ending with a @ character and whitespace', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.encode('firstname-lastname@ '), error);
      throws(() => field.encode('firstname.lastname@  '), error);
      throws(() => field.encode('firstname+lastname@\t'), error);
      throws(() => field.encode('email@\n'), error);
      throws(() => field.encode('1234567890@\n '), error);
      throws(() => field.encode('_______@ \n'), error);
      throws(() => field.encode('"email"@\t\n'), error);
      throws(() => field.encode('much."more\\ unusual"@  '), error);
      throws(() => field.encode('very."(),:;<>[]".VERY."very@  '), error);
      throws(() => field.encode('very.unusual."@  '), error);
    });
    it('throws on non-string values', () => {
      const validationError = new ValidationException('invalidString', 'Invalid string value');
      throws(() => field.encode(0 as any), validationError);
      throws(() => field.encode(false as any), validationError);
      throws(() => field.encode({} as any), validationError);
      throws(() => field.encode([] as any), validationError);
      throws(() => field.encode(null as any), validationError);
      throws(() => field.encode(undefined as any), validationError);
    });
  });
  describe('decode()', () => {
    it('allows valid email addresses', () => {
      deepEqual(field.decode('email@example.com'), 'email@example.com');
      deepEqual(field.decode('firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.decode('email@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.decode('firstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.decode('email@123.123.123.123'), 'email@123.123.123.123');
      deepEqual(field.decode('email@[123.123.123.123]'), 'email@[123.123.123.123]');
      deepEqual(field.decode('"email"@example.com'), '"email"@example.com');
      deepEqual(field.decode('1234567890@example.com'), '1234567890@example.com');
      deepEqual(field.decode('email@example-one.com'), 'email@example-one.com');
      deepEqual(field.decode('_______@example.com'), '_______@example.com');
      deepEqual(field.decode('email@example.name'), 'email@example.name');
      deepEqual(field.decode('email@example.museum'), 'email@example.museum');
      deepEqual(field.decode('email@example.co.jp'), 'email@example.co.jp');
      deepEqual(field.decode('firstname-lastname@example.com'), 'firstname-lastname@example.com');
      deepEqual(field.decode('much."more\\ unusual"@example.com'), 'much."more\\ unusual"@example.com');
      deepEqual(field.decode('" "@example.org'), '" "@example.org');
      deepEqual(field.decode('mailhost!username@example.org'), 'mailhost!username@example.org');
      deepEqual(field.decode('user%example.com@example.org'), 'user%example.com@example.org');
      deepEqual(field.decode('user-@example.org'), 'user-@example.org');
      deepEqual(field.decode('very.unusual."@".unusual.com@example.com'), 'very.unusual."@".unusual.com@example.com');
      deepEqual(field.decode('postmaster@[123.123.123.123]'), 'postmaster@[123.123.123.123]');
      deepEqual(
        field.decode('postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]'),
        'postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
      );
      deepEqual(
        field.decode('very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com'),
        'very."(),:;<>[]".VERY."very@\\ "very".unusual@strange.example.com',
      );
    });
    it('trims leading whitespaces', () => {
      deepEqual(field.decode(' email@example.com'), 'email@example.com');
      deepEqual(field.decode('  firstname.lastname@example.com'), 'firstname.lastname@example.com');
      deepEqual(field.decode('\temail@subdomain.example.com'), 'email@subdomain.example.com');
      deepEqual(field.decode('\nfirstname+lastname@example.com'), 'firstname+lastname@example.com');
      deepEqual(field.decode('\n \t\nemail@123.123.123.123'), 'email@123.123.123.123');
    });
    it('trims trailing whitespaces', () => {
      deepEqual(field.decode('email@example.com '), 'email@example.com');
      deepEqual(field.decode('firstname.lastname@example.com  '), 'firstname.lastname@example.com');
      deepEqual(field.decode('email@subdomain.example.com\t'), 'email@subdomain.example.com');
      deepEqual(field.decode('firstname+lastname@example.com\n'), 'firstname+lastname@example.com');
      deepEqual(field.decode('email@123.123.123.123\n \t\n'), 'email@123.123.123.123');
    });
    it('throws on a blank string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.decode(''), error);
    });
    it('throws on a whitespace-only string', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.decode(' '), error);
      throws(() => field.decode('\n'), error);
      throws(() => field.decode('\t'), error);
    });
    it('throws on a string missing a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.decode('email.example.com'), error);
      throws(() => field.decode('firstname.lastname.example.com'), error);
      throws(() => field.decode('email.subdomain.example.com'), error);
      throws(() => field.decode('firstname+lastname.example.com'), error);
      throws(() => field.decode('email.123.123.123.123'), error);
      throws(() => field.decode('email.[123.123.123.123]'), error);
      throws(() => field.decode('"email".example.com'), error);
      throws(() => field.decode('1234567890.example.com'), error);
      throws(() => field.decode('email.example-one.com'), error);
      throws(() => field.decode('_______.example.com'), error);
      throws(() => field.decode('email.example.name'), error);
      throws(() => field.decode('email.example.museum'), error);
      throws(() => field.decode('email.example.co.jp'), error);
      throws(() => field.decode('firstname-lastname.example.com'), error);
      throws(() => field.decode('much."more\\ unusual".example.com'), error);
      throws(() => field.decode('very.unusual.".".unusual.com.example.com'), error);
      throws(() => field.decode('very."(),:;<>[]".VERY."very.\\ "very".unusual.strange.example.com'), error);
    });
    it('throws on a string starting with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.decode('@example.com'), error);
      throws(() => field.decode('@example-one.com'), error);
      throws(() => field.decode('@subdomain.example.com'), error);
      throws(() => field.decode('@[123.123.123.123]'), error);
      throws(() => field.decode('@123.123.123.123'), error);
    });
    it('throws on a string starting with a whitespace and @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.decode(' @example.com'), error);
      throws(() => field.decode('\t@example-one.com'), error);
      throws(() => field.decode('\n@subdomain.example.com'), error);
      throws(() => field.decode('  @[123.123.123.123]'), error);
      throws(() => field.decode(' \n@123.123.123.123'), error);
    });
    it('throws on a string ending with a @ character', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.decode('firstname-lastname@'), error);
      throws(() => field.decode('firstname.lastname@'), error);
      throws(() => field.decode('firstname+lastname@'), error);
      throws(() => field.decode('email@'), error);
      throws(() => field.decode('1234567890@'), error);
      throws(() => field.decode('_______@'), error);
      throws(() => field.decode('"email"@'), error);
      throws(() => field.decode('much."more\\ unusual"@'), error);
      throws(() => field.decode('very."(),:;<>[]".VERY."very@'), error);
      throws(() => field.decode('very.unusual."@'), error);
    });
    it('throws on a string ending with a @ character and whitespace', () => {
      const error = new ValidationException('invalidEmail', 'Value is an invalid email address');
      throws(() => field.decode('firstname-lastname@ '), error);
      throws(() => field.decode('firstname.lastname@  '), error);
      throws(() => field.decode('firstname+lastname@\t'), error);
      throws(() => field.decode('email@\n'), error);
      throws(() => field.decode('1234567890@\n '), error);
      throws(() => field.decode('_______@ \n'), error);
      throws(() => field.decode('"email"@\t\n'), error);
      throws(() => field.decode('much."more\\ unusual"@  '), error);
      throws(() => field.decode('very."(),:;<>[]".VERY."very@  '), error);
      throws(() => field.decode('very.unusual."@  '), error);
    });
  });
});
