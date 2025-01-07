import * as Common from "./common.js";

export namespace Trelica {
    export import IObject = Common.Trelica.IObject;
    export import ICompactUser = Common.Trelica.ICompactUser;
    export import IPatchCompactUser = Common.Trelica.IPatchCompactUser;

    export interface ICompactLicense {
        name: string;
        startDate: string;
        lastModifiedDtm: string;
    }

    export interface IBaseAppCustomField {
        id: string;
        name: string;
        type: "Text" | "Number" | "Date" | "Option";
        showInAppHub: boolean;
    }

    export interface IOptionAppCustomField extends IBaseAppCustomField {
        type: "Option";
        options: Array<{ id: string; label: string; }>;
    }

    export type IAppCustomField = IBaseAppCustomField | IOptionAppCustomField;

    export interface IAppRole {
        name: string;
        members: ICompactUser[];
    }

    export type IAppStatus = "Managed" | "Accepted" | "Closed" | "New" | "InReview" | "PlanToClose";

    export interface IApp extends IObject {
        id: string;
        name: string;
        instanceName?: string;
        status: IAppStatus;
        riskLevel: "Low" | "Medium" | "High";
        vendor: {
            id: string;
            name: string;
        };
        roles: IAppRole[];
        licences: ICompactLicense[];
        customFieldValues: Record<string, unknown>; // TODO: fix when Mark has fixed #6201
        deleted: boolean;
        lastModifiedDtm: string;
    }


    export type IPatchApp = Partial<Pick<IApp,
        | "status"
        | "instanceName"
        | "customFieldValues"
    >> & {
        roles?: Array<{
            name: string;
            members: IPatchCompactUser[];
        }>;
    };

    export type IPutApp =
        | (IPatchApp & { globalAppId: string; globalAppName?: string; }) // Case 1: globalAppId is required
        | (IPatchApp & { globalAppName: string; globalAppId?: string; }) // Case 2: globalAppName is required
        | (IPatchApp & { globalAppId: string; globalAppName: string; }); // Case 3: Both are provided
    export interface ICompactLicense {
        name: string;
        startDate: string;
        lastModifiedDtm: string;
    }

    export interface IAppUser {
        id: string;
        name: string;
        email: string;
        status: "Active" | "Inactive";
        lastLoginDtm?: string,
        deleted: boolean;
        lastModifiedDtm: string;
    }

    export interface ICreatedApp extends IApp {
        isGlobal: boolean;
    }
}
