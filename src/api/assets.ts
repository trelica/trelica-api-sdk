import APIClient from "../client.js";
import { Trelica } from "../models/asset.js";

interface ListAssetsParams {
    q?: string; // Optional search query
    limit?: number; // Optional limit on the number of results
    filter?: string; // Optional filter string
    since?: string; // Optional UTC date
}

export class AssetsAPI {
    constructor(private client: APIClient) { }

    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionAssetCustomField.
     */
    public static isOptionAssetCustomField(field: Trelica.IBaseAssetCustomField): field is Trelica.IOptionAssetCustomField {
        return field.type === "Option" && "options" in field && Array.isArray(field.options);
    };

    /**
        * Fetch a single asset.
        *
        * @param assetId - Asset ID
        */
    public async getAsset(assetId: string): Promise<Trelica.IAsset> {
        return this.client.get(`/api/assets/v1/${encodeURIComponent(assetId)}`);
    };

    /**
        * Update an asset.
        *
        * @param assetId - Asset ID
        */
    public async updateAsset(assetId: string, updates: Trelica.IPatchAsset): Promise<Trelica.IAsset> {
        return this.client.patch(`/api/assets/v1/${encodeURIComponent(assetId)}`, updates);
    };

    /**
        * Create a new asset.
        *
        * @param asset - An asset object
        */
    public async createAsset(asset: Trelica.IPutAsset): Promise<Trelica.IAsset> {
        return this.client.put(`/api/assets/v1`, asset);
    };

    /**
        * Delete a new asset.
        *
        * @param asset - An asset id
        */
    public async deleteAsset(id: string): Promise<void> {
        return this.client.delete(`/api/assets/v1/${encodeURIComponent(id)}`);
    };

    /**
        * Fetch a single paginated list of assets.
        *
        * @param params - Query parameters for the request (e.g., `limit`, `filter`).
        */
    public async listAssets(params: Record<string, string> = {}): Promise<{ next?: string; results: Trelica.IAsset[]; }> {
        return this.client.get('/api/assets/v1', params);
    };

    /**
     * Fetch all assets across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IAsset` objects.
     */
    public async listAllAssets(params: ListAssetsParams = {}): Promise<Trelica.IAsset[]> {
        return this.client.fetchAll<Trelica.IAsset>('/api/assets/v1', params as Record<string, unknown>);
    };

    /**
     * Fetch all custom fields across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`).
     */
    public async listAllCustomFields(params: { limit?: number; }): Promise<Trelica.IAssetCustomField[]> {
        return this.client.fetchAll<Trelica.IAssetCustomField>('/api/assets/v1/customfields', params);
    }

}