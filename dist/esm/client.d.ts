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
    /**
   * Fetch all items from a paginated endpoint.
   * @param endpoint - The API endpoint to fetch data from.
   * @param params - Query parameters for the request.
   * @returns A promise that resolves to an array of all results.
   */
    fetchAll<T>(endpoint: string, params?: Record<string, unknown>): Promise<T[]>;
    get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
    patch<T>(endpoint: string, body: unknown): Promise<T>;
    put<T>(endpoint: string, body: unknown): Promise<T>;
    post<T>(endpoint: string, body: unknown): Promise<T>;
    delete<T>(endpoint: string): Promise<void>;
}
