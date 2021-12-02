export interface OptionalOptions<S, R extends keyof S, O extends keyof S> {
  required: R[];
  optional: O[];
}
