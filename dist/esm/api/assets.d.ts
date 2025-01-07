import APIClient from "../client.js";
import { Trelica } from "../models/asset.js";
interface ListAssetsParams {
    q?: string;
    limit?: number;
    filter?: string;
    since?: string;
}
export declare class AssetsAPI {
    private client;
    constructor(client: APIClient);
    /**
     * Type guard to check if a custom field is of type "Option".
     * @param field - The field to check.
     * @returns True if the field is an IOptionAssetCustomField.
     */
    static isOptionAssetCustomField(field: Trelica.IBaseAssetCustomField): field is Trelica.IOptionAssetCustomField;
    /**
        * Fetch a single asset.
        *
        * @param assetId - Asset ID
        */
    getAsset(assetId: string): Promise<Trelica.IAsset>;
    /**
        * Update an asset.
        *
        * @param assetId - Asset ID
        */
    updateAsset(assetId: string, updates: Trelica.IPatchAsset): Promise<Trelica.IAsset>;
    /**
        * Create a new asset.
        *
        * @param asset - An asset object
        */
    createAsset(asset: Trelica.IPutAsset): Promise<Trelica.IAsset>;
    /**
        * Delete a new asset.
        *
        * @param asset - An asset id
        */
    deleteAsset(id: string): Promise<void>;
    /**
        * Fetch a single paginated list of assets.
        *
        * @param params - Query parameters for the request (e.g., `limit`, `filter`).
        */
    listAssets(params?: Record<string, string>): Promise<{
        next?: string;
        results: Trelica.IAsset[];
    }>;
    /**
     * Fetch all assets across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`, `filter`).
     * @returns A promise that resolves to an array of all `IAsset` objects.
     */
    listAllAssets(params?: ListAssetsParams): Promise<Trelica.IAsset[]>;
    /**
     * Fetch all custom fields across all pages.
     *
     * @param params - Query parameters for the request (e.g., `limit`).
     */
    listAllCustomFields(params: {
        limit?: number;
    }): Promise<Trelica.IAssetCustomField[]>;
}
export {};
