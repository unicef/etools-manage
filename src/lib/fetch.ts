import fetch from 'isomorphic-fetch';
import { useEffect } from 'react';
import { useSafeSetState } from 'utils/helpers';

const BASE_URL = window.location.origin;


export function checkStatus(response: Response, raw: boolean): Response {
    if (raw) {
        return response;
    }

    if (response.status >= 200 && response.status < 300) {
        return response;
    }


    const error = new Error(JSON.stringify({
        message: response.statusText,
        code: response.status,
        ...response
    }));

    throw error;
}

type FetchOpts = RequestInit & {json: boolean; raw: boolean}

const wrappedFetch = (url: string, {
    json = true,
    raw = false,
    // For test environment Dependency Injection
    ...opts
} = {}) => fetch(`${BASE_URL}/${url}`, {
    credentials: 'same-origin', // send cookies for etools auth
    ...opts })
    .then((response: Response) => checkStatus(response, raw))
    .then(async (response): Promise<Response |any> => {
        if (raw) {
            return response;
        }


        return json ? response.json() : response.text();
    })
    .catch(err => {
        throw err;
    });

export interface FetchState {
    loaded: boolean;
    fetching: boolean;
    data: any;
    error: Error | null;
}

export function useFetch(url: string, opts?: FetchOpts): FetchState {
    const [state, setState] = useSafeSetState<FetchState>({
        loaded: false,
        fetching: false,
        data: null,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({ fetching: true });

            try {
                const res = await wrappedFetch(url, opts);
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

