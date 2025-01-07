var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AssetsAPI {
    constructor(client) {
        this.client = client;
    }
    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionAssetCustomField.
     */
    static isOptionAssetCustomField(field) {
        return field.type === "Option" && "options" in field && Array.isArray(field.options);
    }
    ;
    /**
        * Fetch a single asset.
        *
        * @param assetId - Asset ID
        */
    getAsset(assetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.get(`/api/assets/v1/${encodeURIComponent(assetId)}`);
        });
    }
    ;
    /**
        * Update an asset.
        *
        * @param assetId - Asset ID
        */
    updateAsset(assetId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.patch(`/api/assets/v1/${encodeURIComponent(assetId)}`, updates);
        });
    }
    ;
    /**
        * Create a new asset.
        *
        * @param asset - An asset object
        */
    createAsset(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.put(`/api/assets/v1`, asset);
        });
    }
    ;
    /**
        * Delete a new asset.
        *
        * @param asset - An asset id
        */
    deleteAsset(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.delete(`/api/assets/v1/${encodeURIComponent(id)}`);
        });
    }
    ;
    /**
        * Fetch a single paginated list of assets.
        *
        * @param params - Query parameters for the request (e.g., `limit`, `filter`).
        */
    listAssets() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            return this.client.get('/api/assets/v1', params);
        });
    }
    ;
    /**
     * Fetch all assets across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IAsset` objects.
     */
    listAllAssets() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            return this.client.fetchAll('/api/assets/v1', params);
        });
    }
    ;
    /**
     * Fetch all custom fields across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`).
     */
    listAllCustomFields(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.fetchAll('/api/assets/v1/customfields', params);
        });
    }
}
