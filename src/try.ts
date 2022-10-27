
export type Success<R> = {
    _tag: 'success';
    result: R
};

export type Failed<E> = {
    _tag: 'failed';
    error: E
};

export type Try<E, R> = Failed<E> | Success<R>;

export const success = <R>(result: R): Try<never, R> => ({
    _tag: "success",
    result
});

export const failed = <E>(error: E): Try<E, never> => ({
    _tag: "failed",
    error
});

export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> =>
    ta._tag === 'success'

export const isFailed = <E>(ta: Try<E, unknown>): ta is Failed<E> =>
    ta._tag === 'failed'

export const getOrElse = <E, R>(ta: Try<E, R>, defaultValue: (e: E) => R): R => {
    if (isFailed(ta)) return defaultValue(ta.error)
    return ta.result
};

export const map = <E, A, B>(ta: Try<E, A>, f: (value: A) => B): Try<E, B> => {
    if (isFailed(ta)) return ta;
    return success(f(ta.result));
};
