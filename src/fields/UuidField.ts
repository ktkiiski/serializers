import RegexpField from './RegexpField';

export default class UUIDField extends RegexpField {
  public readonly type: string = 'uuid';

  constructor(version?: 1 | 4 | 5) {
    super(
      new RegExp(`^[0-9a-f]{8}-[0-9a-f]{4}-[${version || '145'}][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`, 'i'),
      'invalidUuid',
      version ? `Value is not a valid UUID version ${version}` : `Value is not a valid UUID`,
    );
  }
}
