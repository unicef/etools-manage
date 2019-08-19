import { useReducer, useEffect, useRef } from 'react';
import { isEmpty } from 'ramda';
import { SectionEntity } from 'entities/types';

export function useSetState<T>(initialState: T) {
    return useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState,
    );
}

export function useSafeSetState<T>(initialState: T) {
    const [state, setState] = useSetState(initialState);

    const mountedRef = useRef(false);
    useEffect((): () => void => {
        mountedRef.current = true;
        return () => (mountedRef.current = false);
    }, []);
    // @ts-ignore

    const safeSetState = (...args) => mountedRef.current && setState(...args);

    return [state, safeSetState];
}

export function sectionWithNumberId(section: SectionEntity): SectionEntity {
    return ({
        ...section,
        id: Number(section.id)
    });
}

export function notEmpty(xs: unknown) {
    return !isEmpty(xs) && xs !== undefined;
}

export function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name];
}
// eslint-disable-next-line
export function isArrayOfObjects(xs: any[]) {
    return typeof xs[0] === 'object';
}
