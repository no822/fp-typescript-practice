export type Some<A> = {
    _tag: 'Some'
    value: A
};

export type None = {
    _tag: 'None'
};

export type Option<A> = Some<A> | None;

export const some = <A>(value: A): Option<A> => ({ _tag: 'Some', value });
export const none = (): Option<never> => ({ _tag: 'None' });

export const isSome = <A>(oa: Option<A>) => oa._tag === 'Some';
export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === 'None';

export const fromUndefined = <A>(value: A | undefined): Option<A> => {
   if (value === undefined) {
       return none();
   }
   return some(value);
};

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
    if (isNone(oa)) {
        return defaultValue;
    }
    return oa.value;
};

export const map = <A, B>(oa: Option<A>, f:(a: A) => B): Option<B> => {
   if (isNone(oa)) return oa;
   return some(f(oa.value));
};
