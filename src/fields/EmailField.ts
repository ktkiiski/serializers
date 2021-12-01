import RegexpField from './RegexpField';

export default class EmailField extends RegexpField {
  constructor() {
    super(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      'invalidEmail',
      `Value is not a valid email`,
    );
  }
}
