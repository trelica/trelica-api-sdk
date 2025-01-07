import APIClient from "../client.js";
import { Trelica } from "../models/person.js";
interface ListPeopleParams {
    q?: string;
    limit?: number;
    filter?: string;
    since?: string;
}
interface ListPersonAppsParams {
    limit?: number;
    filter?: string;
    since?: string;
}
export declare class PeopleAPI {
    private client;
    constructor(client: APIClient);
    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionPersonCustomField.
     */
    /**
      * Fetch a single person.
      *
      * @param personId - Person ID
      */
    getPerson(personId: string): Promise<Trelica.IPerson>;
    /**
      * Update an person.
      *
      * @param personId - Person ID
      */
    createOrUpdatePerson(personId: string, updates: Trelica.IPutPerson): Promise<Trelica.IPerson>;
    /**
      * Fetch a single paginated list of People.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    listPeople(params?: Record<string, string>): Promise<{
        next?: string;
        results: Trelica.IPerson[];
    }>;
    /**
     * Fetch all People across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IPerson` objects.
     */
    listAllPeople(params?: ListPeopleParams): Promise<Trelica.IPerson[]>;
    /**
      * Fetch a single paginated list of person users.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    listPersonApps(personId: string, params?: Record<string, string>): Promise<{
        next?: string;
        results: Trelica.IPersonApp[];
    }>;
    /**
     * Fetch all person users across all pages.
     *
     * @param personId - Person ID
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     */
    listAllPersonApps(personId: string, params?: ListPersonAppsParams): Promise<Trelica.IPersonApp[]>;
}
export {};
