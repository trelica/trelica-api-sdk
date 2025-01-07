"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsAPI = void 0;
class AppsAPI {
    constructor(client) {
        this.client = client;
    }
    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionAppCustomField.
     */
    static isOptionAppCustomField(field) {
        return field.type === "Option" && "options" in field;
    }
    /**
      * Fetch a single app.
      *
      * @param appId - App ID
      */
    getApp(appId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.get(`/api/apps/v1/${encodeURIComponent(appId)}`);
        });
    }
    /**
      * Update an app.
      *
      * @param appId - App ID
      */
    updateApp(appId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.patch(`/api/apps/v1/${encodeURIComponent(appId)}`, updates);
        });
    }
    /**
      * Create a new app.
      *
      * @param app - An app object
      */
    createApp(app) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.post(`/api/apps/v1`, app);
        });
    }
    /**
      * Fetch a single paginated list of apps.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
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
     * @returns A promise that resolves to an array of all `IApp` objects.
     */
    listAllApps() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            return this.client.fetchAll('/api/apps/v1', params);
        });
    }
    /**
     * Fetch all custom fields across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`).
     */
    listAllCustomFields(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.fetchAll('/api/apps/v1/customfields', params);
        });
    }
    /**
      * Fetch a single paginated list of app users.
      *
      * @param params - Query parameters for the request (e.g., `limit`, `filter`).
      */
    listAppUsers(appId_1) {
        return __awaiter(this, arguments, void 0, function* (appId, params = {}) {
            return this.client.get(`/api/apps/v1/${encodeURIComponent(appId)}/users`, params);
        });
    }
    /**
     * Fetch all app users across all pages.
     *
     * @param appId - App ID
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     */
    listAllAppUsers(appId_1) {
        return __awaiter(this, arguments, void 0, function* (appId, params = {}) {
            return this.client.fetchAll(`/api/apps/v1/${encodeURIComponent(appId)}/users`, params);
        });
    }
}
exports.AppsAPI = AppsAPI;
