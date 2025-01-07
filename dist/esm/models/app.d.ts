import * as Common from "./common.js";
export declare namespace Trelica {
    export import IObject = Common.Trelica.IObject;
    export import ICompactUser = Common.Trelica.ICompactUser;
    export import IPatchCompactUser = Common.Trelica.IPatchCompactUser;
    interface ICompactLicense {
        name: string;
        startDate: string;
        lastModifiedDtm: string;
    }
    interface IBaseAppCustomField {
        id: string;
        name: string;
        type: "Text" | "Number" | "Date" | "Option";
        showInAppHub: boolean;
    }
    interface IOptionAppCustomField extends IBaseAppCustomField {
        type: "Option";
        options: Array<{
            id: string;
            label: string;
        }>;
    }
    type IAppCustomField = IBaseAppCustomField | IOptionAppCustomField;
    interface IAppRole {
        name: string;
        members: ICompactUser[];
    }
    type IAppStatus = "Managed" | "Accepted" | "Closed" | "New" | "InReview" | "PlanToClose";
    interface IApp extends IObject {
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
        customFieldValues: Record<string, unknown>;
        deleted: boolean;
        lastModifiedDtm: string;
    }
    type IPatchApp = Partial<Pick<IApp, "status" | "instanceName" | "customFieldValues">> & {
        roles?: Array<{
            name: string;
            members: IPatchCompactUser[];
        }>;
    };
    type IPutApp = (IPatchApp & {
        globalAppId: string;
        globalAppName?: string;
    }) | (IPatchApp & {
        globalAppName: string;
        globalAppId?: string;
    }) | (IPatchApp & {
        globalAppId: string;
        globalAppName: string;
    });
    interface ICompactLicense {
        name: string;
        startDate: string;
        lastModifiedDtm: string;
    }
    interface IAppUser {
        id: string;
        name: string;
        email: string;
        status: "Active" | "Inactive";
        lastLoginDtm?: string;
        deleted: boolean;
        lastModifiedDtm: string;
    }
}
