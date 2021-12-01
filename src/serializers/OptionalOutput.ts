type OptionalOutput<S, R extends keyof S, O extends keyof S, D extends keyof S> = Pick<S, R | D> & Partial<Pick<S, O>>;

export default OptionalOutput;
