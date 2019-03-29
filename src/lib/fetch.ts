import fetch from 'isomorphic-fetch';

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

export default (url, {
    json = true,
    raw = false,
    // For test environment Dependency Injection
    ...opts
} = {}) => {
    return fetch(url, {
        credentials: 'same-origin',
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
