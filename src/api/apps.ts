import APIClient from "../client.js";
import { Trelica } from "../models/app.js";

interface ListAppsParams {
    q?: string; // Optional search query
    limit?: number; // Optional limit on the number of results
    filter?: string; // Optional filter string
    since?: string; // Optional UTC date
}

interface ListAppUsersParams {
    //    q?: string; // Optional search query
    limit?: number; // Optional limit on the number of results
    filter?: string; // Optional filter string
    since?: string; // Optional UTC date
}

export class AppsAPI {
    constructor(private client: APIClient) { }

    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionAppCustomField.
     */
    public static isOptionAppCustomField(field: Trelica.IBaseAppCustomField): field is Trelica.IOptionAppCustomField {
        return field.type === "Option" && "options" in field;
    }

    /**
      * Fetch a single app.
      *
      * @param appId - App ID
      */
    public async getApp(appId: string): Promise<Trelica.IApp> {
        return this.client.get(`/api/apps/v1/${encodeURIComponent(appId)}`);
    }

    /**
      * Update an app.
      *
      * @param appId - App ID
      */
    public async updateApp(appId: string, updates: Trelica.IPatchApp): Promise<Trelica.IApp> {
        return this.client.patch(`/api/apps/v1/${encodeURIComponent(appId)}`, updates);
    }
    /**
      * Create a new app.
      *
      * @param app - An app object
      */
    public async createApp(app: Trelica.IPutApp): Promise<Trelica.ICreatedApp> {
        return this.client.post(`/api/apps/v1`, app);
    }

    /**
      * Fetch a single paginated list of apps.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    public async listApps(params: Record<string, string> = {}): Promise<{ next?: string; results: Trelica.IApp[]; }> {
        return this.client.get('/api/apps/v1', params);
    }

    /**
     * Fetch all apps across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IApp` objects.
     */
    public async listAllApps(params: ListAppsParams = {}): Promise<Trelica.IApp[]> {
        return this.client.fetchAll<Trelica.IApp>('/api/apps/v1', params as Record<string, unknown>);
    }

    /**
     * Fetch all custom fields across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`).
     */
    public async listAllCustomFields(params: { limit?: number; }): Promise<Trelica.IAppCustomField[]> {
        return this.client.fetchAll<Trelica.IAppCustomField>('/api/apps/v1/customfields', params);
    }

    /**
      * Fetch a single paginated list of app users.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    public async listAppUsers(appId: string, params: Record<string, string> = {}): Promise<{ next?: string, results: Trelica.IAppUser[]; }> {
        return this.client.get(`/api/apps/v1/${encodeURIComponent(appId)}/users`, params);
    }

    /**
     * Fetch all app users across all pages.
     *
     * @param appId - App ID
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     */
    public async listAllAppUsers(appId: string, params: ListAppUsersParams = {}): Promise<Trelica.IAppUser[]> {
        return this.client.fetchAll<Trelica.IAppUser>(`/api/apps/v1/${encodeURIComponent(appId)}/users`, params as Record<string, unknown>);
    }

}