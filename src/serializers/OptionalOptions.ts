export interface OptionalOptions<S, R extends keyof S, O extends keyof S, D extends keyof S> {
  required: R[];
  optional: O[];
  defaults: { [P in D]: S[P] };
}
