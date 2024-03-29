import RegexpField from './RegexpField.js';

/**
 * Field for email addresses. This just ensures that
 * - leading and trailing whitespace is trimmed
 * - the string contains a "@" character
 * - there is a non-empty part on both sides of "@"
 *
 * This is NOT an email validation library. There is no one method
 * to check 100% of cases if the email is "valid", as there are many special
 * cases that would allow e.g. special characters, internationalizations or whitespaces.
 * In general, your backend should "validate" the email by sending
 * a verification email there. This field is only for providing the minimum
 * sanity check.
 *
 * If you do want more strict email format validation, you can make your
 * custom field, e.g. by inheriting RegexpField and providing your favorite
 * email validation regular expression.
 */
export default class EmailField extends RegexpField {
  constructor() {
    super(/.@./, 'invalidEmail', `Value is an invalid email address`);
  }

  protected validateString(value: string): string {
    return super.validateString(value.trim());
  }
}
