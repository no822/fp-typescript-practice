type Some<A> = {
    _type: 'Some'
    value: A
};

type None = {
    _type: 'None'
};

type Option<A> = Some<A> | None;

const some = <A>(value: A): Option<A> => ({ _type: "Some", value });
const none = (): Option<never> => ({ _type: "None" });

const isSome = <A>(arg: Option<A>): arg is Some<A> => arg._type === "Some";
const isNone = <A>(arg: Option<A>): arg is None => arg._type === "None";