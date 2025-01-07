import type { RequestInfo, RequestInit, Response } from 'node-fetch';
import { SDKError, SDKServerError } from "./errors/SDKError.js";
import { safeConvertToString } from "./utils/converters.js";

interface ITokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}

function isVoid<T>(): boolean {
    return (undefined as unknown as T) === undefined;
}
export default class APIClient {
    private fetch: ((url: RequestInfo, init?: RequestInit) => Promise<Response>) | null = null;
    private token: string | null = null;
    private tokenExpiry: number | null = null;

    constructor(private baseURL: string, private clientId: string, private clientSecret: string) { }

    private async getFetch(): Promise<(url: RequestInfo, init?: RequestInit) => Promise<Response>> {
        if (!this.fetch) {
            const { default: nodeFetch } = await import('node-fetch'); // Dynamic import
            this.fetch = nodeFetch;
        }
        return this.fetch;
    }

    private async authenticate(): Promise<void> {
        const fetch = await this.getFetch();
        const url = `${this.baseURL}/connect/token`;
        const body = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: this.clientId,
            client_secret: this.clientSecret,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
        });

        if (!response.ok) {
            throw new SDKError(`Failed to authenticate: ${response.statusText}`, { clientId: this.clientId });
        }

        const data = (await response.json()) as ITokenResponse;
        this.token = data.access_token;
        this.tokenExpiry = Date.now() + data.expires_in * 1000;
    }

    private async request<T = unknown>(method: string, endpoint: string, options: { params?: Record<string, unknown>, body?: unknown; } = {}): Promise<T> {
        if (!this.token || (this.tokenExpiry && Date.now() >= this.tokenExpiry)) {
            await this.authenticate();
        }

        const fetch = await this.getFetch();
        const url = new URL(endpoint, this.baseURL);

        if (options.params) {
            for (const key in options.params) {
                let value = options.params[key];
                let convertedValue: string;
                try {
                    convertedValue = safeConvertToString(value);
                } catch (error) {
                    if (error instanceof Error) {
                        throw new SDKError(`Invalid parameter "${key}": ${error.message}`, { key, value });
                    }
                    throw new SDKError('An unknown error occurred during conversion.', { value });
                }
                url.searchParams.append(key, convertedValue);
            }
        }

        const response = await fetch(url.toString(), {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: options.body ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
            throw new SDKServerError(`Request failed: ${response.statusText}`, url, response.status, await response.text());
        }

        if (response.status === 204 || response.headers.get('Content-Length') === '0') {
            // If T is explicitly `void`, return undefined
            if (isVoid<T>()) {
                return undefined as T;
            }
            throw new SDKError('Expected a response body but received none.', { status: response.status, url });
        }

        try {
            return await response.json() as T;
        } catch (error) {
            throw new SDKError('Failed to parse response JSON.', { status: response.status, url });
        }
    }

    /**
   * Fetch all items from a paginated endpoint.
   * @param endpoint - The API endpoint to fetch data from.
   * @param params - Query parameters for the request.
   * @returns A promise that resolves to an array of all results.
   */
    public async fetchAll<T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T[]> {
        const results: T[] = [];
        let next: string | undefined = endpoint;

        while (next) {
            const response: { next?: string; results: T[]; } = await this.get(next, params);
            results.push(...response.results);

            // Update `next` for the next page
            next = response.next;

            // Clear query parameters for subsequent pages
            params = {};
        }
        return results;
    }

    public get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
        return this.request<T>('GET', endpoint, { params });
    }

    public patch<T>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>('PATCH', endpoint, { body });
    }

    public put<T>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>('PUT', endpoint, { body });
    }

    public post<T>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>('POST', endpoint, { body });
    }

    public delete<T>(endpoint: string): Promise<void> {
        return this.request<void>('DELETE', endpoint);
    }
}