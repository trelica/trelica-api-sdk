import type { RequestInfo, RequestInit, Response } from 'node-fetch';

interface ITokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
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
            throw new Error(`Failed to authenticate: ${response.statusText}`);
        }

        const data = (await response.json()) as ITokenResponse;
        this.token = data.access_token;
        this.tokenExpiry = Date.now() + data.expires_in * 1000;
    }

    private async request<T>(method: string, endpoint: string, options: { params?: Record<string, any>, body?: any; } = {}): Promise<T> {
        if (!this.token || (this.tokenExpiry && Date.now() >= this.tokenExpiry)) {
            await this.authenticate();
        }

        const fetch = await this.getFetch();

        const url = new URL(endpoint, this.baseURL);
        if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => url.searchParams.append(key, value));
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
            throw new Error(`Request failed: ${response.statusText}`);
        }

        return response.json() as T;
    }

    public get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        return this.request('GET', endpoint, { params });
    }

    public patch<T>(endpoint: string, body: any): Promise<T> {
        return this.request('PATCH', endpoint, { body });
    }
}