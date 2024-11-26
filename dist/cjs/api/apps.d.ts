import APIClient from "../client";
import { ITrelicaApp } from "../models/app";
export declare class AppsAPI {
    private client;
    constructor(client: APIClient);
    /**
      * Fetch a single paginated list of apps.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      * @returns A promise that resolves to an object containing:
      *   - `results`: An array of `ITrelicaApp`.
      *   - `next`: The URL for the next page of results, if available.
      */
    listApps(params?: Record<string, any>): Promise<{
        next?: string;
        results: ITrelicaApp[];
    }>;
    /**
     * Fetch all apps across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `ITrelicaApp` objects.
     */
    listAllApps(params?: Record<string, any>): Promise<ITrelicaApp[]>;
    updateApp(appId: string, updates: Partial<ITrelicaApp>): Promise<ITrelicaApp>;
    listAppUsers(appId: string, params?: Record<string, any>): Promise<{
        next?: string;
        results: any[];
    }>;
}
