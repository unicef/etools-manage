import wrappedFetch from './fetch';
/* eslint-disable */

const getCsrfToken = () => {
    let csrfCookieName = 'csrftoken';
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, csrfCookieName.length + 1) === csrfCookieName + '=') {
                csrfToken = decodeURIComponent(cookie.substring(csrfCookieName.length + 1));
                break;
            }
        }
    }
    return csrfToken || '';
};

// TODO: create type for config when tests are made
export interface HttpClient {
    get: <T>(url: string, config?: any) => Promise<T>;
    post: <T>(url: string, data?: any, config?: any) => Promise<T>;
    patch: <T>(url: string, data?: any, config?: any) => Promise<T>;
}

const requestHeaders = new Headers({
    'X-CSRFToken': getCsrfToken(),
    'content-type': 'application/json' // Django requires token in this header
});

export class ApiClient implements HttpClient {
    public async get<T>(url: string, config: any): Promise<T> {
        const response = await wrappedFetch(url, config);
        return response;
    }

    public async post<T>(url: string, config: any): Promise<T> {
        const response = await wrappedFetch(url, {
            ...config,
            method: 'POST',
            headers: requestHeaders
        });

        return response;
    }

    public async patch<T>(url: string, config: any): Promise<T> {
        const response = await wrappedFetch(url, {
            ...config,
            method: 'PATCH',
            headers: requestHeaders
        });

        return response;
    }
}

/* eslint-enable */
