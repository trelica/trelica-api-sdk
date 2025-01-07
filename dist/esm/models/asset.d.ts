import * as Common from "./common.js";
export declare namespace Trelica {
    export import IObject = Common.Trelica.IObject;
    export import ICompactUser = Common.Trelica.ICompactUser;
    export type IBaseAssetCustomField = {
        id: string;
        providerId?: string;
        name: string;
        lookupKey: string;
        type: "Text" | "Link" | "Currency" | "Date" | "Number" | "Option";
    };
    export type IOptionAssetCustomField = IBaseAssetCustomField & {
        type: "Option";
        options: {
            id: string;
            label: string;
        }[];
    };
    export type IAssetCustomField = IBaseAssetCustomField | IOptionAssetCustomField;
    interface IMoneyAssetCustomFieldValue {
        value: number;
        currency: string;
    }
    interface ILinkAssetCustomFieldValue {
        linkValue: {
            href: string;
            description?: string;
        };
    }
    interface INumberAssetCustomFieldValue {
        numberValue: number;
    }
    type IAssetCustomFieldValue = string & IMoneyAssetCustomFieldValue & ILinkAssetCustomFieldValue & INumberAssetCustomFieldValue;
    type IAssetPlatform = "iOS" | "Mac" | "Windows" | "Android" | "Linux" | "ChromeOS" | "Unknown";
    interface IAssetBase {
        id: string;
        status: "New" | "ReadyToDeploy" | "Deployed" | "OutForRepair" | "Retired";
        hardwareVendor: string;
        modelName?: string;
        deviceName?: string;
        serialNumber: string;
        assetTag: string;
        assignedToEmail?: string;
        enrolledDtm: null | string;
        lastSyncDtm?: null | string;
        osVersion?: string;
        platform?: IAssetPlatform;
        isEncrypted?: boolean;
        customFields?: Record<string, IAssetCustomFieldValue>;
        locationName: string;
    }
    export type IAsset = Trelica.IObject & IAssetBase & {
        assignedTo?: Trelica.ICompactUser;
        lastModifiedBy: Trelica.ICompactUser;
        location: {
            id: string;
            name: string;
        };
    };
    export type IPutAsset = IAssetBase;
    export type IPatchAsset = IAssetBase;
    export {};
}
