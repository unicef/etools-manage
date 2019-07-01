import wrappedFetch from './fetch';

// TODO: create type for config when tests are made
export interface HttpClient {
    get: <T>(url: string, config?: any) => Promise<T>;
    post: <T>(url: string, data?: any, config?: any) => Promise<T>;
    patch: <T>(url: string, data?: any, config?: any) => Promise<T>;
}

export class ApiClient implements HttpClient {

    public async get<T>(url: string, config: any): Promise<T> {
        const response = await wrappedFetch(url, config);
        return response;
    }

    public async post<T>(url: string, config: any): Promise<T> {
        const response = await wrappedFetch(url, {
            ...config,
            method: 'POST'
        });
        return response;
    }

    public async patch<T>(url: string, config: any): Promise<T> {
        const response = await wrappedFetch(url, {
            ...config,
            method: 'PATCH'
        });

        return response;
    }
}
