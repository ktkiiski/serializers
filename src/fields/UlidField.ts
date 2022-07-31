import RegexpField from './RegexpField.js';

export default class ULIDField extends RegexpField {
  constructor() {
    super(/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/, 'invalidUlid', `Value is not a valid ULID`);
  }
}
