
interface HttpClient {
    get: <T>(url: string, config?: Request) => Promise<T>;
    post: <T>(url: string, data?: any, config?: Request) => Promise<T>;
    patch: <T>(url: string, data?: any, config?: Request) => Promise<T>;
}

 class ApiClient implements HttpClient {
     public get(url,config) {

     }
 }
