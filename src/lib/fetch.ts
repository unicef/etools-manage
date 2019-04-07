import fetch from 'isomorphic-fetch';
import { useEffect } from 'react';
import { useSafeSetState, useSetState } from 'utils/helpers';


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
        credentials: 'same-origin', // send cookies for etools auth
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
    const [state, setState] = useSafeSetState({
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

