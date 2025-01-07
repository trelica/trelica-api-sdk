import APIClient from "../client.js";
import { Trelica } from "../models/person.js";

interface ListPeopleParams {
    q?: string; // Optional search query
    limit?: number; // Optional limit on the number of results
    filter?: string; // Optional filter string
    since?: string; // Optional UTC date
}

interface ListPersonAppsParams {
    //    q?: string; // Optional search query
    limit?: number; // Optional limit on the number of results
    filter?: string; // Optional filter string
    since?: string; // Optional UTC date
}

export class PeopleAPI {
    constructor(private client: APIClient) { }

    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionPersonCustomField.
     */
    // public static isOptionPersonCustomField(field: Trelica.IBasePersonCustomField): field is Trelica.IOptionPersonCustomField {
    //     return field.type === "Option" && "options" in field;
    // }

    /**
      * Fetch a single person.
      *
      * @param personId - Person ID
      */
    public async getPerson(personId: string): Promise<Trelica.IPerson> {
        return this.client.get(`/api/people/v1/${encodeURIComponent(personId)}`);
    }

    /**
      * Update an person.
      *
      * @param personId - Person ID
      */
    public async createOrUpdatePerson(personId: string, updates: Trelica.IPutPerson): Promise<Trelica.IPerson> {
        return this.client.patch(`/api/people/v1/${encodeURIComponent(personId)}`, updates);
    }

    /**
      * Fetch a single paginated list of People.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    public async listPeople(params: Record<string, string> = {}): Promise<{ next?: string; results: Trelica.IPerson[]; }> {
        return this.client.get('/api/people/v1', params);
    }

    /**
     * Fetch all People across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IPerson` objects.
     */
    public async listAllPeople(params: ListPeopleParams = {}): Promise<Trelica.IPerson[]> {
        return this.client.fetchAll<Trelica.IPerson>('/api/people/v1', params as Record<string, unknown>);
    }

    /**
      * Fetch a single paginated list of person users.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    public async listPersonApps(personId: string, params: Record<string, string> = {}): Promise<{ next?: string, results: Trelica.IPersonApp[]; }> {
        return this.client.get(`/api/people/v1/${encodeURIComponent(personId)}/apps`, params);
    }

    /**
     * Fetch all person users across all pages.
     *
     * @param personId - Person ID
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     */
    public async listAllPersonApps(personId: string, params: ListPersonAppsParams = {}): Promise<Trelica.IPersonApp[]> {
        return this.client.fetchAll<Trelica.IPersonApp>(`/api/people/v1/${encodeURIComponent(personId)}/apps`, params as Record<string, unknown>);
    }

}