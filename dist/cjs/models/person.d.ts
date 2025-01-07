import * as App from "./app.js";
import * as Common from "./common.js";
export declare namespace Trelica {
    export import IObject = Common.Trelica.IObject;
    export import ICompactUser = Common.Trelica.ICompactUser;
    export import IAppStatus = App.Trelica.IAppStatus;
    export import IAppUser = App.Trelica.IAppUser;
    type IPersonType = "Employee" | "Contractor" | "External" | "ServiceAccount";
    interface IPersonApp {
        id: string;
        name: string;
        status: IAppStatus;
        appUser: IAppUser;
    }
    interface IPerson extends IObject {
        id: string;
        employeeType?: string;
        personType: IPersonType;
        aliases: string[];
        firstName: string;
        lastName: string;
        email: string;
        jobTitle?: string;
        locationId?: string;
        location?: string;
        locationTimezone?: string;
        costCenterId?: string;
        costCenter?: string;
        status: "Active" | "Terminated" | "Unknown";
        organizationalUnit?: string;
        employeeId?: string;
        phoneNumber?: string;
        timezone?: string;
        personalAddress?: {
            streetAddress1?: string;
            streetAddress2?: string;
            city?: string;
            stateOrProvince?: string;
            zipOrPostalCode?: string;
            countryCode?: string;
        };
        lineManager?: {
            id: string;
            personType: "Contact";
            name: string;
            email: string;
        };
        teams: Array<{
            id: string;
            name: string;
        }>;
        customFields?: Record<string, unknown>;
        startDate?: string;
        leavingDate?: string;
        lastModifiedBy: ICompactUser;
    }
    type IPutPerson = Pick<IPerson, "aliases">;
}
