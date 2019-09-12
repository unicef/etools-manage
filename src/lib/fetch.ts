import fetch from 'isomorphic-fetch';
import { useEffect } from 'react';
import { useSafeSetState } from 'utils';

const BASE_URL = window.location.origin;

export async function checkStatus(response: Response, raw: boolean): Promise<Response> {
    if (raw) {
        return response;
    }

    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    let message = response.statusText;

    if (response.status === 400) {
        message = await response.json();
    }

    const error = new Error(
        JSON.stringify({
            message,
            code: response.status,
            ...response
        })
    );

    throw error;
}

type FetchOpts = RequestInit & { json: boolean; raw: boolean };

const getCsrfToken = () => {
    let csrfCookieName = 'csrftoken';
          let csrfToken = null;
          if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, csrfCookieName.length + 1) === (csrfCookieName + '=')) {
                csrfToken = decodeURIComponent(cookie.substring(csrfCookieName.length + 1));
                break;
              }
            }
          }
          return csrfToken || '';
}

const wrappedFetch = (
    url: string,
    {
        json = true,
        raw = false,
        // For test environment Dependency Injection
        ...opts
    } = {}
) =>
    fetch(`${BASE_URL}/${url}`, {
        credentials: 'same-origin', // send cookies for etools auth
        headers: {
            'X-CSRFToken': getCsrfToken() // Django requires token in this header
        },
        ...opts
    })
        .then((response: Response) => checkStatus(response, raw))
        .then(
            // eslint-disable-next-line
            async (response): Promise<Response | any> => {
                if (raw) {
                    return response;
                }

                return json ? response.json() : response.text();
            }
        )
        .catch(err => {
            throw err;
        });

export interface FetchState {
    loaded: boolean;
    fetching: boolean;
    // eslint-disable-next-line
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
                    fetching: false
                });
            }
        };

        fetchData();
    }, []);

    return state;
}

export default wrappedFetch;
