var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PeopleAPI {
    constructor(client) {
        this.client = client;
    }
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
    getPerson(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.get(`/api/people/v1/${encodeURIComponent(personId)}`);
        });
    }
    /**
      * Update an person.
      *
      * @param personId - Person ID
      */
    createOrUpdatePerson(personId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.patch(`/api/people/v1/${encodeURIComponent(personId)}`, updates);
        });
    }
    /**
      * Fetch a single paginated list of People.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    listPeople() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            return this.client.get('/api/people/v1', params);
        });
    }
    /**
     * Fetch all People across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IPerson` objects.
     */
    listAllPeople() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            return this.client.fetchAll('/api/people/v1', params);
        });
    }
    /**
      * Fetch a single paginated list of person users.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    listPersonApps(personId_1) {
        return __awaiter(this, arguments, void 0, function* (personId, params = {}) {
            return this.client.get(`/api/people/v1/${encodeURIComponent(personId)}/apps`, params);
        });
    }
    /**
     * Fetch all person users across all pages.
     *
     * @param personId - Person ID
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     */
    listAllPersonApps(personId_1) {
        return __awaiter(this, arguments, void 0, function* (personId, params = {}) {
            return this.client.fetchAll(`/api/people/v1/${encodeURIComponent(personId)}/apps`, params);
        });
    }
}
