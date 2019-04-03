import fetch from 'isomorphic-fetch';
import { useEffect, useRef, useReducer } from 'react';

function useSetState(initialState) {
    return useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState,
    );
}

function useSafeSetState(initialState) {
    const [state, setState] = useSetState(initialState);

    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => (mountedRef.current = false);
    }, []);
    const safeSetState = (...args) => mountedRef.current && setState(...args);

    return [state, safeSetState];
}


export function checkStatus(response, raw): void {
    if (raw) {
        return response;
    }

    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(JSON.stringify({
        message: response.statusText,
        code: response.status
    }));

    response.error = error;
    throw error;
}

const wrappedFetch = (url, {
    json = true,
    raw = false,
    // For test environment Dependency Injection
    ...opts
} = {}) => {
    return fetch(url, {
        // credentials: 'same-origin',
        ...opts })
        .then(response => checkStatus(response, raw))
        .then(response => {
            if (raw) {
                return response;
            }

            return json ? response.json() : response.text();
        })
        .catch(err => {
            throw err;
        });
};

export function useFetch(url) {
    const [state, setState] = useSetState({
        loaded: false,
        fetching: false,
        data: null,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({ fetching: true });

            try {
                const res = await wrappedFetch(url);
                setState({
                    data: res,
                    fetching: false,
                    loaded: true
                });
            } catch (error) {
                setState({
                    error,
                    loaded: false,
                    fetching: false });
            }
        };

        fetchData();

    }, []);

    return state;
}

export default wrappedFetch;

