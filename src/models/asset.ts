import * as Common from "./common.js";

export namespace Trelica {
    export import IObject = Common.Trelica.IObject;
    export import ICompactUser = Common.Trelica.ICompactUser;

    export type IBaseAssetCustomField = {
        id: string;
        providerId?: string; // Optional as some entries don't include it
        name: string;
        lookupKey: string;
        type: "Text" | "Link" | "Currency" | "Date" | "Number" | "Option";
    };

    export type IOptionAssetCustomField = IBaseAssetCustomField & {
        type: "Option"; // Override the type to be specifically "Option"
        options: {
            id: string;
            label: string;
        }[];
    };

    export type IAssetCustomField = IBaseAssetCustomField | IOptionAssetCustomField;

    interface IMoneyAssetCustomFieldValue {
        value: number,
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

    type IAssetCustomFieldValue = string
        & IMoneyAssetCustomFieldValue
        & ILinkAssetCustomFieldValue
        & INumberAssetCustomFieldValue;


    type IAssetPlatform = "iOS" | "Mac" | "Windows" | "Android" | "Linux" | "ChromeOS" | "Unknown";
    // type IAssetType =
    //     | "Laptop"
    //     | "Desktop computer"
    //     | "Furniture"
    //     | "Keyboard"
    //     | "Mobile phone"
    //     | "Monitor"
    //     | "Mouse"
    //     | "Network equipment"
    //     | "Peripherals"
    //     | "Printer"
    //     | "Projector"
    //     | "Server"
    //     | "Tablet"
    //     | "Telephone & VoIP"
    //     | "TV"
    //     | "Virtual machine"
    //     | "Other";

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
        isEncrypted?: boolean; // not sure how consistently this is set - check integrations
        customFields?: Record<string, IAssetCustomFieldValue>;
        locationName: string;
    }

    export type IAsset = Trelica.IObject & IAssetBase & {
        assignedTo?: Trelica.ICompactUser;
        // type: IAssetType; // TODO: we should add this 
        lastModifiedBy: Trelica.ICompactUser;
        location: {
            id: string;
            name: string;
        };
    };

    export type IPutAsset = IAssetBase;
    export type IPatchAsset = IAssetBase;
}