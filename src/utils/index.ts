// import { useReducer, useEffect, useRef } from 'react';
import { StateSetter } from 'global-types';
import { values, head, compose, keys, flip, prop, replace, toUpper, isEmpty } from 'ramda';
import {
    PRODUCTION_DOMAIN,
    ENV_PRODUCTION,
    STAGING_DOMAIN,
    ENV_STAGING,
    ENV_DEV
} from 'global-constants';
import { HEADER_BACKGROUND_PRODUCTION, HEADER_BACKGROUND_DEV } from 'lib/theme';

// export function useSetState<T>(initialState: T) {
//     return useReducer((state, newState) => ({ ...state, ...newState }), initialState);
// }

// export function useSafeSetState<T>(initialState: T) {
//     const [state, setState] = useSetState(initialState);

//     const mountedRef = useRef(false);
//     useEffect((): (() => void) => {
//         mountedRef.current = true;
//         return () => (mountedRef.current = false);
//     }, []);
//     // @ts-ignore

//     const safeSetState = (...args) => mountedRef.current && setState(...args);

//     return [state, safeSetState];
// }

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

export const getEnvironment = () => {
    const location = window.location.href;

    if (location.includes(PRODUCTION_DOMAIN)) {
        return ENV_PRODUCTION;
    }

    if (location.includes(STAGING_DOMAIN)) {
        return ENV_STAGING;
    } else return ENV_DEV;
};

export const getHeaderBackground = () => {
    const location = window.location.href;
    return location.includes(PRODUCTION_DOMAIN)
        ? HEADER_BACKGROUND_PRODUCTION
        : HEADER_BACKGROUND_DEV;
};

export const getHeaderTitle = () => {
    let title = process.env.REACT_APP_PAGE_TITLE;
    const env = getEnvironment();
    let envStr = `${env} Environment`;
    return env === ENV_PRODUCTION ? title : `${title} - ${envStr}`;
};

export const getEnvironmentLoginPath = () => {
    let url = window.location.origin;

    if (url.includes('localhost')) {
        return `${url}/admin/login/`;
    }

    return `${url}/login/`;
};

export const setValueFromEvent: (
    setter: StateSetter
) => (event: React.ChangeEvent<HTMLInputElement>) => void = setter => ({ target: { value } }) =>
    setter(value);

export const firstValue = compose(
    head,
    values
);

export const firstKey = compose(
    head,
    keys
);

export const lookup = flip(prop);

export const capitalize = replace(/^./, toUpper);
