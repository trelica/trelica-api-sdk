import APIClient from "../client";
import { ITrelicaApp } from "../models/app";

export class AppsAPI {
    constructor(private client: APIClient) { }

    /**
      * Fetch a single paginated list of apps.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      * @returns A promise that resolves to an object containing:
      *   - `results`: An array of `ITrelicaApp`.
      *   - `next`: The URL for the next page of results, if available.
      */
    public async listApps(
        params: Record<string, any> = {}
    ): Promise<{ next?: string; results: ITrelicaApp[]; }> {
        return this.client.get('/api/apps/v1', params);
    }

    /**
     * Fetch all apps across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `ITrelicaApp` objects.
     */
    public async listAllApps(params: Record<string, any> = {}): Promise<ITrelicaApp[]> {
        const results: ITrelicaApp[] = [];
        let next: string | undefined = '/api/apps/v1';

        while (next) {
            const response: { next?: string; results: ITrelicaApp[]; } = await this.client.get(next, params);
            results.push(...response.results);
            next = response.next;
            params = {}; // clear down for page 2
        }

        return results;
    }

    public async updateApp(appId: string, updates: Partial<ITrelicaApp>): Promise<ITrelicaApp> {
        return this.client.patch(`/api/apps/v1/${appId}`, updates);
    }

    public async listAppUsers(appId: string, params: Record<string, any> = {}): Promise<{ next?: string, results: any[]; }> {
        return this.client.get(`/api/apps/v1/${appId}/users`, params);
    }
}