type OptionalInput<S, R extends keyof S, O extends keyof S, D extends keyof S> = Pick<S, R> & Partial<Pick<S, O | D>>;

export default OptionalInput;
