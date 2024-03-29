export default interface Field<I, E = I> {
  readonly type: string;
  validate(value: I): I;
  serialize(value: I): E;
  deserialize(value: unknown): I;
  encode(value: I): string;
  decode(value: string): I;
}
