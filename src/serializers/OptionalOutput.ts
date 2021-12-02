type OptionalOutput<S, R extends keyof S, O extends keyof S> = Pick<S, R> & Partial<Pick<S, O>>;

export default OptionalOutput;
