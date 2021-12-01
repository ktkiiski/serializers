import RegexpField from './RegexpField';

export default class UrlField extends RegexpField {
  constructor() {
    super(
      /^https?:\/\/[\w.-]+(?:\.[\w.-]+)*[\w\-._~:%/?#[\]@!$&'()*+,;=.]+$/i,
      'invalidUrl',
      `Value is not a valid URL`,
    );
  }
}
