export default class APIClient {
    private baseURL;
    private clientId;
    private clientSecret;
    private fetch;
    private token;
    private tokenExpiry;
    constructor(baseURL: string, clientId: string, clientSecret: string);
    private getFetch;
    private authenticate;
    private request;
    get<T>(endpoint: string, params?: Record<string, any>): Promise<T>;
    patch<T>(endpoint: string, body: any): Promise<T>;
}
