import APIClient from "../client.js";
import { Trelica } from "../models/app.js";
interface ListAppsParams {
    q?: string;
    limit?: number;
    filter?: string;
    since?: string;
}
interface ListAppUsersParams {
    limit?: number;
    filter?: string;
    since?: string;
}
export declare class AppsAPI {
    private client;
    constructor(client: APIClient);
    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionAppCustomField.
     */
    static isOptionAppCustomField(field: Trelica.IBaseAppCustomField): field is Trelica.IOptionAppCustomField;
    /**
      * Fetch a single app.
      *
      * @param appId - App ID
      */
    getApp(appId: string): Promise<Trelica.IApp>;
    /**
      * Update an app.
      *
      * @param appId - App ID
      */
    updateApp(appId: string, updates: Trelica.IPatchApp): Promise<Trelica.IApp>;
    /**
      * Create a new app.
      *
      * @param app - An app object
      */
    createApp(app: Trelica.IPutApp): Promise<Trelica.IApp>;
    /**
      * Fetch a single paginated list of apps.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    listApps(params?: Record<string, string>): Promise<{
        next?: string;
        results: Trelica.IApp[];
    }>;
    /**
     * Fetch all apps across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IApp` objects.
     */
    listAllApps(params?: ListAppsParams): Promise<Trelica.IApp[]>;
    /**
     * Fetch all custom fields across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`).
     */
    listAllCustomFields(params: {
        limit?: number;
    }): Promise<Trelica.IAppCustomField[]>;
    /**
      * Fetch a single paginated list of app users.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    listAppUsers(appId: string, params?: Record<string, string>): Promise<{
        next?: string;
        results: Trelica.IAppUser[];
    }>;
    /**
     * Fetch all app users across all pages.
     *
     * @param appId - App ID
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     */
    listAllAppUsers(appId: string, params?: ListAppUsersParams): Promise<Trelica.IAppUser[]>;
}
export {};
