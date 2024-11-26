var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AppsAPI {
    constructor(client) {
        this.client = client;
    }
    /**
      * Fetch a single paginated list of apps.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      * @returns A promise that resolves to an object containing:
      *   - `results`: An array of `ITrelicaApp`.
      *   - `next`: The URL for the next page of results, if available.
      */
    listApps() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            return this.client.get('/api/apps/v1', params);
        });
    }
    /**
     * Fetch all apps across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `ITrelicaApp` objects.
     */
    listAllApps() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            const results = [];
            let next = '/api/apps/v1';
            while (next) {
                const response = yield this.client.get(next, params);
                results.push(...response.results);
                next = response.next;
                params = {}; // clear down for page 2
            }
            return results;
        });
    }
    updateApp(appId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.patch(`/api/apps/v1/${appId}`, updates);
        });
    }
    listAppUsers(appId_1) {
        return __awaiter(this, arguments, void 0, function* (appId, params = {}) {
            return this.client.get(`/api/apps/v1/${appId}/users`, params);
        });
    }
}
