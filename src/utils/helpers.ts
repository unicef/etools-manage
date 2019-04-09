import { useReducer, useEffect, useRef } from 'react';
import { AppStore, NamespaceKey, StoreShape } from 'global-types';

// TODO: type these
export function useSetState(initialState) {
    return useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState,
    );
}

export function useSafeSetState(initialState) {
    const [state, setState] = useSetState(initialState);

    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => (mountedRef.current = false);
    }, []);
    //@ts-ignore

    const safeSetState = (...args) => mountedRef.current && setState(...args);

    return [state, safeSetState];
}


export const getStateAtNamespaceKey = <T extends NamespaceKey>(namespace: T) => (state: StoreShape): Partial<AppStore>[T] => {
    const namespaceState = state[namespace];
    if (!namespaceState) {
        throw new Error(
            `Attempted to access state for an unregistered namespace at key ${namespace}`
        );
    }

    return namespaceState;
};

// export function getStateAtNamespaceKey<T extends NamespaceKey>(
//     namespace: T
// ): (StoreShape) => AppStore[T] {

//     return (state: StoreShape): AppStore[T] => {
//         const namespaceState = state[namespace];
//         if (!namespaceState) {
//             throw new Error(
//                 `Attempted to access state for an unregistered namespace at key ${namespace}`
//             );
//         }

//         return namespaceState;
//     };
// }
