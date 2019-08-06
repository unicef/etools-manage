import { JSXElementConstructor } from 'react';

// gets the internal props of a component
// used like Props<typeof MyComponent>
// or Props<'button'> for intrinsic HTML attributes
export type Props<C> = C extends JSXElementConstructor<infer P>
    ? P
    : C extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[C]
        : {}

// goes one step further and resolves with propTypes and defaultProps properties
export type ApparentComponentProps<C> = C extends JSXElementConstructor<infer P> ? JSX.LibraryManagedAttributes<C, P> : Props<C>;

/**
 * Subtract keys from one interface from the other.
 *
 * @example
 * interface One { one: string }
 * interface Three { one: string, two: string }
 *
 * type Two = Omit<Three, keyof One>;
 *
 * // The type of Two will be
 * interface Two { two: string }
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


/**
 * Remove from T the keys that are in common with K
 */
type Optionalize<T extends K, K> = Omit<T, keyof K>;

/**
 * Make a Type into a Maybe Type
 */
type Nullable<T> = T | null
type Maybe<T> = T | undefined

/**
 * Dictionary of string, value pairs
 */
interface Dictionary<T> { [key: string]: T }
export type PublicPart<T> = {[K in keyof T]: T[K]}
export type PropertyNames<T> = { [K in keyof T]: K }[keyof T];

export type WrapTypeWith<T, K> = T extends T ? K<T> : never;


export enum MaybeType {
    JUST,
    NOTHING
}

interface Just<T> {
    type: MaybeType.JUST;
    value: T;

}interface Nothing {
    type: MaybeType.NOTHING;
}// Type constructors

function Just<T>(val: T): Just<T> {
    return {
        type: MaybeType.JUST,
        value: val
    };
}

function Nothing(): Nothing {
    return {
        type: MaybeType.NOTHING
    };
}

type Maybe<T> =
  Just<T> |
  Nothing;
