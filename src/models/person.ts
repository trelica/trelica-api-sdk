import * as App from "./app.js";
import * as Common from "./common.js";

export namespace Trelica {
    export import IObject = Common.Trelica.IObject;
    export import ICompactUser = Common.Trelica.ICompactUser;
    export import IAppStatus = App.Trelica.IAppStatus;
    export import IAppUser = App.Trelica.IAppUser;

    export type IPersonType = "Employee" | "Contractor" | "External" | "ServiceAccount";

    export interface IPersonApp {
        id: string;
        name: string;
        status: IAppStatus;
        appUser: IAppUser;
    }

    export interface IPerson extends IObject {
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
            personType: "Contact"; // TODO: this looks like an API bug to me
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

    export type IPutPerson = Pick<IPerson, "aliases">;
}